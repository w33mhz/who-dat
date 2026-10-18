// Supabase Edge Function for Who Dat? remote rooms.
// Deploy with: supabase functions deploy online-game
// Configure SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY as function secrets.
// The service-role key must never be sent to the browser.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};
const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { ...cors, "Content-Type": "application/json" } });
const fail = (message: string, status = 400) => json({ error: message }, status);
const db = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!, {
  auth: { persistSession: false, autoRefreshToken: false },
});
const randomHex = (n: number) => {
  const b = crypto.getRandomValues(new Uint8Array(n));
  return [...b].map(x => x.toString(16).padStart(2, "0")).join("");
};
const hash = async (s: string) => {
  const b = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(s));
  return [...new Uint8Array(b)].map(x => x.toString(16).padStart(2, "0")).join("");
};
const cleanPack = (raw: unknown) => {
  if (!Array.isArray(raw) || raw.length < 4 || raw.length > 200) throw new Error("Choose between 4 and 200 characters.");
  const seen = new Set<string>();
  return raw.map((c: any) => {
    if (!c || typeof c.id !== "string" || typeof c.n !== "string" || !Array.isArray(c.t)) throw new Error("Invalid character pack.");
    if (c.id.length > 100 || c.n.length > 80 || c.t.length > 100) throw new Error("Character data is too large.");
    if (seen.has(c.id)) throw new Error("Character IDs must be unique.");
    seen.add(c.id);
    return { id: c.id, n: c.n, e: typeof c.e === "string" ? c.e.slice(0, 12) : "", t: [...new Set(c.t.filter((x: unknown) => typeof x === "string" && x.length <= 100))] };
  });
};
function view(row: any, player: 0 | 1) {
  const secret = player === 0 ? row.host_secret_index : row.guest_secret_index;
  return {
    roomCode: row.room_code,
    status: row.status,
    player,
    opponentConnected: player === 0 ? Boolean(row.guest_token_hash) : Boolean(row.host_token_hash),
    characters: row.character_pack,
    yourSecretIndex: secret,
    turn: row.active_player,
    yourState: row.player_state[String(player)],
    opponentState: row.player_state[String(1 - player)],
    winner: row.winner,
    expiresAt: row.expires_at,
  };
}
async function findRoom(code: string) {
  const roomCodeHash = await hash(code.trim().toUpperCase());
  const { data, error } = await db.from("game_rooms").select("*").eq("room_code_hash", roomCodeHash).maybeSingle();
  if (error) throw error;
  return data;
}
async function authenticate(row: any, token: string) {
  if (!token || token.length > 200) return null;
  const tokenHash = await hash(token);
  if (tokenHash === row.host_token_hash) return 0 as const;
  if (row.guest_token_hash && tokenHash === row.guest_token_hash) return 1 as const;
  return null;
}
Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  if (req.method !== "POST") return fail("Use POST.", 405);
  try {
    const body = await req.json();
    const action = body?.action;
    if (action === "create") {
      const characters = cleanPack(body.characters);
      const roomCode = randomHex(3).toUpperCase().replace(/[0-9A-F]/g, (x) => "0123456789ABCDEF"[parseInt(x, 16)]);
      const hostToken = randomHex(32);
      const hostSecret = Math.floor(Math.random() * characters.length);
      const { data, error } = await db.from("game_rooms").insert({
        room_code_hash: await hash(roomCode),
        host_token_hash: await hash(hostToken),
        host_secret_index: hostSecret,
        board_size: characters.length,
        character_pack: characters,
      }).select("*").single();
      if (error) throw error;
      return json({ roomCode, playerToken: hostToken, game: view({ ...data, room_code: roomCode }, 0) });
    }
    if (action === "join") {
      const code = String(body.roomCode || "").trim().toUpperCase();
      if (!/^[0-9A-F]{6}$/.test(code)) return fail("Enter the six-character room code.");
      const row = await findRoom(code);
      if (!row || row.status !== "waiting" || new Date(row.expires_at) < new Date()) return fail("That room is unavailable or already full.", 404);
      const guestToken = randomHex(32);
      const guestSecret = Math.floor(Math.random() * row.board_size);
      const { data, error } = await db.from("game_rooms").update({
        guest_token_hash: await hash(guestToken),
        guest_secret_index: guestSecret,
        status: "active",
        updated_at: new Date().toISOString(),
      }).eq("id", row.id).eq("status", "waiting").is("guest_token_hash", null).select("*").maybeSingle();
      if (error) throw error;
      if (!data) return fail("Someone has already joined that room. Ask for another code.", 409);
      return json({ roomCode: code, playerToken: guestToken, game: view({ ...data, room_code: code }, 1) });
    }
    const code = String(body.roomCode || "").trim().toUpperCase();
    const token = String(body.playerToken || "");
    const row = await findRoom(code);
    if (!row || new Date(row.expires_at) < new Date()) return fail("Room not found or expired.", 404);
    const player = await authenticate(row, token);
    if (player === null) return fail("Invalid player token.", 401);
    if (action === "state") return json({ game: view({ ...row, room_code: code }, player) });
    if (row.status !== "active") return fail("This game is not active.");
    if (action === "ask") {
      if (row.active_player !== player) return fail("It is not your turn.", 409);
      const key = String(body.questionKey || "");
      const secretIndex = player === 0 ? row.guest_secret_index : row.host_secret_index;
      const secret = row.character_pack[secretIndex];
      if (!secret || !/^[a-zA-Z0-9_-]{1,100}$/.test(key)) return fail("Invalid question.");
      const ps = structuredClone(row.player_state);
      if (ps[String(player)].asked.includes(key)) return fail("You already asked that question.");
      const answer = Array.isArray(secret.t) && secret.t.includes(key);
      ps[String(player)].asked.push(key);
      ps[String(player)].log.unshift({ questionKey: key, answer });
      const { data, error } = await db.from("game_rooms").update({
        player_state: ps,
        active_player: 1 - player,
        updated_at: new Date().toISOString(),
      }).eq("id", row.id).eq("active_player", player).eq("status", "active").select("*").maybeSingle();
      if (error) throw error;
      if (!data) return fail("The turn changed. Refresh the game state.", 409);
      return json({ game: view({ ...data, room_code: code }, player), answer });
    }
    if (action === "eliminate") {
      const idx = Number(body.characterIndex);
      if (!Number.isInteger(idx) || idx < 0 || idx >= row.board_size) return fail("Invalid character.");
      const ps = structuredClone(row.player_state);
      const eliminated: number[] = ps[String(player)].eliminated;
      ps[String(player)].eliminated = eliminated.includes(idx) ? eliminated.filter(i => i !== idx) : [...eliminated, idx];
      const { data, error } = await db.from("game_rooms").update({ player_state: ps, updated_at: new Date().toISOString() }).eq("id", row.id).eq("status", "active").select("*").single();
      if (error) throw error;
      return json({ game: view({ ...data, room_code: code }, player) });
    }
    if (action === "guess") {
      if (row.active_player !== player) return fail("It is not your turn.", 409);
      const idx = Number(body.characterIndex);
      if (!Number.isInteger(idx) || idx < 0 || idx >= row.board_size) return fail("Invalid character.");
      const opponentSecret = player === 0 ? row.guest_secret_index : row.host_secret_index;
      const won = idx === opponentSecret;
      const { data, error } = await db.from("game_rooms").update({
        status: "finished",
        winner: won ? player : 1 - player,
        updated_at: new Date().toISOString(),
      }).eq("id", row.id).eq("active_player", player).eq("status", "active").select("*").single();
      if (error) throw error;
      return json({ game: view({ ...data, room_code: code }, player), correct: won, answerIndex: opponentSecret });
    }
    return fail("Unknown action.");
  } catch (e) {
    console.error("online-game error", e);
    return fail(e instanceof Error ? e.message : "Unexpected server error.", 500);
  }
});
