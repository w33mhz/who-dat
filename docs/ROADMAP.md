# Roadmap

Status against [DESIGN.md](DESIGN.md). Checked items work in `index.html` today.

## 1. Foundation (Core)
- [x] Responsive board, trait engine, elimination, final guess
- [x] Computer opponent (Beginner / Clever), smart hints
- [x] Restrained trait-match reactions (only characters with the asked-about trait react)
- [x] Engine split from UI (`src/engine.js`) with tests
- [x] Five built-in packs, mixable, selection saved in the browser
- [x] Custom "Our People" category (via the Studio)
- [x] Distinct realistic storybook portraits for all 60 built-in characters
- [ ] Undo accidental elimination, large-board search/filters

## 2. Multiplayer
- [x] Local pass-and-play with privacy screen
- [ ] Online rooms, room codes, server-authoritative answers, reconnection
  - [x] Supabase schema foundation with direct client table access denied
  - [x] Edge Function foundation for create/join/state/ask/eliminate/guess actions
  - [x] Browser API helper for the Edge Function
  - [x] Integrate online lobby and remote game state into `index.html`
  - [x] Add polling-based state synchronization while the game is open
  - [ ] Add resilient reconnect/resume behavior and realtime subscriptions
  - [ ] Add automated tests for authorization, turn validation, and secret isolation
  - [ ] Configure a Supabase project and deploy; verify with two separate browsers

**Important:** Online multiplayer is not yet available in the live game. The branch contains an integrated online UI and backend foundation, but online play is not deploy-ready until a Supabase project is configured and security/integration testing is completed. See [Supabase setup notes](../supabase/README.md).

## 3. Character Studio and collections
- [x] Character editor with explicit traits and custom yes/no questions
- [x] Photo characters (square crop), saved locally; private by default
- [x] Collection validation, import/export (sanitized)
- [ ] Per-trait reaction overrides and photo overlays (wink, thumbs up)
- [ ] Photo crop/zoom, multiple saved collections, versioning, share links

## 4. Intelligence
- [ ] AI-generated packs with validation
- [ ] Rule variants: Speed Round, Twenty Questions, Big Board, Mystery Mix

## 5. Polish
- [x] Optional spoken answers (browser text-to-speech)
- [ ] Sound effects, richer animations, community collections
