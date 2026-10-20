// Thin browser client for the Supabase online-game Edge Function.
// Configure with the Supabase project URL and anon key; never use the service-role key here.
export function createOnlineClient({ supabaseUrl, anonKey, fetchImpl = fetch }) {
  if (!supabaseUrl || !anonKey) throw new Error("Online play is not configured yet.");
  const endpoint = new URL("/functions/v1/online-game", supabaseUrl).toString();

  async function action(payload) {
    const response = await fetchImpl(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: anonKey,
        Authorization: `Bearer ${anonKey}`,
      },
      body: JSON.stringify(payload),
    });
    const result = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(result.error || "Online game request failed.");
    return result;
  }

  return Object.freeze({
    createRoom: (characters) => action({ action: "create", characters }),
    joinRoom: (roomCode) => action({ action: "join", roomCode }),
    getState: (roomCode, playerToken) => action({ action: "state", roomCode, playerToken }),
    ask: (roomCode, playerToken, questionKey) => action({ action: "ask", roomCode, playerToken, questionKey }),
    eliminate: (roomCode, playerToken, characterIndex) => action({ action: "eliminate", roomCode, playerToken, characterIndex }),
    guess: (roomCode, playerToken, characterIndex) => action({ action: "guess", roomCode, playerToken, characterIndex }),
  });
}
