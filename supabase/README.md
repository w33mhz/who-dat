# Online multiplayer backend (Supabase)

This folder contains the first backend foundation for remote games. The current game remains a static GitHub Pages app; remote play requires a Supabase project.

## Planned architecture

- GitHub Pages serves the browser client.
- Supabase Postgres stores room membership and authoritative match state.
- Realtime broadcasts room updates to connected players.
- Edge Functions validate room codes, membership, turns, questions, and guesses. The browser must never receive the opponent's secret character.
- Room codes are join credentials, not authorization to read the full match state.

## Setup status

This is an implementation scaffold, not a deploy-ready multiplayer release. Do not expose the Supabase service-role key in the browser. Before enabling public play, finish the server-authoritative actions and per-player state responses, then run the multiplayer integration tests.

1. Create a Supabase project.
2. Apply the SQL migration in `migrations/`.
3. Deploy the Edge Functions when implemented.
4. Configure only the project URL and anon key in the public frontend.
5. Verify RLS policies and secret-character isolation using two separate browser sessions before publishing.
