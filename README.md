# 🕵️ Who Dat?

A family-friendly, Guess Who-style browser game. Ask yes/no questions, watch the characters react, and narrow down the computer's secret character before it finds yours.

**Play:** once GitHub Pages is enabled, the game is served from the repo root (see below).

## Run locally

The game uses ES modules, so serve the folder rather than opening the file directly:

```bash
npm start          # python3 -m http.server 8000, then open http://localhost:8000
npm test           # rules tests (Node 20+)
```

## What's in this version

- 5 mixable packs (30 characters): Funny Faces, Fantasy & Creatures, Animals & Pets, Food Fight, Seasonal Specials
- Play the computer (Beginner or Clever) or a second player on one device (pass-and-play with a privacy screen)
- Reaction animations on every question, for Yes and No
- Smart hints that suggest the best-splitting question without revealing the secret
- **Character Studio:** make your own "Our People" characters (avatar or photo, your own traits and custom yes/no questions), then mix them into any board; import/export collections as JSON
- Auto-eliminate, calm-motion mode, optional spoken answers, keyboard and screen-reader labels

## Project layout

```
index.html        UI (setup screen, board, pass-and-play)
src/data.js       packs, characters, questions, reactions
src/engine.js     pure rules: resolve, filter, rank, validate (no DOM)
src/collections.js  sanitizes custom/imported collections
test/             node:test rule tests
docs/DESIGN.md    game design specification
docs/ROADMAP.md   milestones and status
.github/workflows/pages.yml  deploys to GitHub Pages on push to main
```

Traits are rules; reactions are presentation. Keeping them separate means animations can never change an answer.

## Docs

- [Design specification](docs/DESIGN.md)
- [Roadmap](docs/ROADMAP.md)
