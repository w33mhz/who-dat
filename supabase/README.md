# Who Dat? Supabase multiplayer

The browser game remains hosted on GitHub Pages. Supabase provides private room storage and the `online-game` Edge Function. Direct browser access to the room table is denied; player actions go through the function.

## One-time project setup

1. Create a Supabase project at https://supabase.com/dashboard and save its project reference and database password.
2. In GitHub repository Settings → Secrets and variables → Actions, add:
   - `SUPABASE_ACCESS_TOKEN`: personal access token created in the Supabase dashboard.
   - `SUPABASE_PROJECT_REF`: project reference from the project URL.
   - `SUPABASE_DB_PASSWORD`: database password selected when creating the project.
3. Run the **Deploy Supabase backend** workflow from Actions, or merge backend files into `main` to trigger deployment.
4. The GitHub Pages workflow reads the project's public `anon` key through the Supabase Management API and injects the browser configuration into the page during deployment. Players can choose **Online 2 Player** without entering project settings. The public key is safe to expose; the service-role key is never added to the page.
5. Create a room and share its code, invite link, or locally generated QR code. Opening the invite link pre-fills the room code for the other player.

The deployment workflow applies checked-in SQL migrations and deploys `online-game`. Supabase provides the function's `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` runtime secrets; do not add the service-role key to GitHub Pages or commit it to source control. The GitHub Actions token needs permission to read project API keys so the Pages workflow can retrieve the public `anon` key.

## Validation

Run the local browser-client tests with Node.js 20+:

```sh
npm test
```

These tests validate request construction and error handling; they do **not** prove that a live Supabase project is configured or that two browsers can complete a game.

After deployment, test in two separate browser profiles/devices:

1. Host creates a room; verify a six-character code appears.
2. Guest joins with that code; both players see the room become active.
3. Host asks a question; the turn switches and the guest receives the next turn.
4. Toggle eliminated characters independently on each board.
5. Make a correct and an incorrect final guess.
6. Try an invalid room code and an invalid player token; both should fail.
7. Confirm the public anon key is the only key in browser requests and no service-role key is present.
8. Verify anonymous direct reads/writes of `game_rooms` are denied.

Do not announce online play as production-ready until the live two-browser test passes. Room expiry, reconnect/resume, rate limiting, and deeper concurrency/security tests remain follow-up hardening work.
