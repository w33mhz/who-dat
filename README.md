# 🕵️ Who Dat?

A family-friendly, Guess Who-style browser game. Ask yes/no questions, watch the characters react, and narrow down the computer's secret character before it finds yours.

**Play:** once GitHub Pages is enabled, the game is served from the repo root (see below).

## Run locally

It's a single static file, so no build step is needed:

```bash
open index.html            # or just double-click it
# or serve it:
python3 -m http.server 8000
```

## What's in this version ("Core")

- 24 emoji characters across people, fantasy, animals and food
- 15 yes/no traits driving the question list
- Computer opponent (Beginner or Clever)
- Reaction animations on matching characters (presentation only)
- Smart hints that suggest the best-splitting question
- Auto-eliminate, calm-motion mode, keyboard and screen-reader labels

## Project layout

```
index.html                 the whole game (HTML + CSS + JS)
docs/ROADMAP.md            milestones from the design spec
.github/workflows/pages.yml  deploys to GitHub Pages on push to main
```

Character and trait data (`C`, `Q`, `R` in `index.html`) are kept separate from rendering and reactions, so character packs can be split out later.

## Roadmap

See [docs/ROADMAP.md](docs/ROADMAP.md).
