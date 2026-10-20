import test from "node:test";
import assert from "node:assert/strict";
import { createOnlineClient } from "../src/online.js";

test("rejects missing Supabase configuration", () => {
  assert.throws(() => createOnlineClient({ supabaseUrl: "", anonKey: "" }), /not configured/i);
});

test("calls the online-game Edge Function with the public anon key", async () => {
  const calls = [];
  const client = createOnlineClient({
    supabaseUrl: "https://example.supabase.co",
    anonKey: "public-anon-key",
    fetchImpl: async (url, options) => {
      calls.push({ url, options });
      return { ok: true, json: async () => ({ roomCode: "A1B2C3" }) };
    },
  });
  const result = await client.createRoom([{ id: "a", n: "Ada", t: ["hat"] }]);
  assert.equal(result.roomCode, "A1B2C3");
  assert.equal(calls[0].url, "https://example.supabase.co/functions/v1/online-game");
  assert.equal(calls[0].options.method, "POST");
  assert.equal(calls[0].options.headers.apikey, "public-anon-key");
  assert.equal(calls[0].options.headers.Authorization, "Bearer public-anon-key");
  assert.deepEqual(JSON.parse(calls[0].options.body), {
    action: "create",
    characters: [{ id: "a", n: "Ada", t: ["hat"] }],
  });
});

test("surfaces Edge Function errors", async () => {
  const client = createOnlineClient({
    supabaseUrl: "https://example.supabase.co",
    anonKey: "public-anon-key",
    fetchImpl: async () => ({
      ok: false,
      json: async () => ({ error: "Invalid player token." }),
    }),
  });
  await assert.rejects(client.getState("A1B2C3", "bad-token"), /Invalid player token/);
});
