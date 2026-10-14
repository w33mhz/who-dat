# Who Dat? — Game Design Specification (condensed)

A family-friendly browser game inspired by *Guess Who?*, expanded into a customizable platform: character packs, uploaded photos, original characters, custom boards, and play against friends or the computer.
**Signature feature:** characters react when a question describes them (a bespectacled character winks at "glasses", a dragon flaps at "wings", a pizza gives two thumbs up at "cheese").

## 1. Principles
1. Fast to play — a match starts in a few clicks.
2. Personality over static portraits.
3. Creativity without complexity — ready-made packs for casual players, full customization for creative ones.
4. Fair gameplay — attributes and answers follow consistent rules.
5. Family-friendly by default — privacy, accessibility, appropriate content.

## 2. Game loop
Choose a pack → start a match (friend, online room, or computer) → ask a yes/no question (suggested or typed) → matching characters react → eliminate candidates and make a final guess.

## 3. Interface (mobile-first, scales to tablet/desktop)
- **Home:** Quick Play, Play with Friends, Character Studio, My Collections.
- **Board:** responsive card grid, question composer with suggestions, visible Yes/No indicator, question history, remaining count, hint, final-guess action, turn indicator, optional timer, sound/animation toggles. Compact/large grids; search, filters, virtualization and zoom for large sets.
- **Cards:** portrait or photo, name (mode-dependent), clear active/eliminated state, reaction animation, optional attribute panel. Eliminated cards fold/dim (touch) or flip (desktop).

## 4. Reactive characters
Each reaction = trigger + animation + optional sound. Categories: positive (wink, thumbs up), surprise, personality (idle/victory), elimination, final guess. Characters may override defaults per trait.
**Rule:** reactions never disclose the secret or change the truth of an answer; they are presentation only. In online play the authoritative game state decides the answer and eligible reactions.
Use lightweight assets (sprite sheets, Lottie, small WebP); provide static fallback, reduced-motion support, and overlays for uploaded photos. Launch with a curated reusable reaction library.

## 5. Packs and collections
Six core packs: **Funny Faces, Fantasy & Creatures, Animals & Pets, Food Fight, Seasonal Specials, Our People** (custom family/friends). Packs can be mixed (e.g. 12 animals + 12 creatures; 16 family photos + 16 illustrated). Before publishing, check duplicates, missing attributes, incompatible question categories and unbalanced traits.
Collections have title, description, cover, count, creator, version, visibility. Support private collections, read-only share links, import/export files, copy-to-studio, and later community browsing/remixing. Sharing never exposes private photos unless the creator explicitly chooses to.

## 6. Character Studio
Workflow: choose a start (template, generated, blank, or photo) → customize appearance → define traits → assign reactions → preview and test every trait → save to a collection.
Photo characters: crop, background replacement, name, manually assigned traits, expressive overlays. **Never infer sensitive attributes from family photos**; users define traits explicitly.
Traits are game data; reactions are presentation data. Example:
```json
{"id":"professor-pickles","name":"Professor Pickles","packId":"funny-faces",
 "portrait":{"type":"illustration","assetId":"portrait-professor-pickles"},
 "traits":{"wearsGlasses":true,"hasMustache":true,"wearsHat":true,"hasWings":false},
 "reactions":{"wearsGlasses":"wink-adjust-glasses","hasMustache":"twirl-mustache","wearsHat":"tip-hat","default":"idle-smile","eliminated":"dramatic-fold"}}
```

## 7. Question engine and hints
Questions come from a validated attribute catalog (appearance; type/identity; special features). A collection without usable questions is not playable.
**Smart hints** rank questions by how evenly they split remaining candidates and explain simply ("likely to eliminate about half"). Advanced hints may weigh the opponent's strategy and question restrictions.
**AI** may propose questions, packs, traits and descriptions but is never the authority on a live answer. Pipeline: AI proposes → map to a supported trait → validate → server computes the true answer → display + reactions. Unmappable questions get a rephrase prompt.

## 8. Modes
Core: **Local two-player** (privacy screen), **Online multiplayer** (private rooms, link/code, synchronized turns), **Computer opponents** (beginner → strategic).
Variants: Classic (default), Speed Round, Twenty Questions, Big Board, Mystery Mix, Silly Reactions, Custom Rules. Variants are chosen before the match with a clear explanation.

## 9. Voice, sound, accessibility
Optional narration (browser TTS first), character sound effects, separate speech/effects volume, mute. Requirements: keyboard navigation and focus states, screen-reader labels, large text/high contrast, reduced motion, sound-off play, color-independent card states. Fully playable without animation or audio.

## 10. Architecture
Responsive web app (later PWA). Recommended stack: React + TypeScript UI, CSS/SVG/Lottie, TypeScript API with WebSockets for rooms and server-authoritative answers, PostgreSQL, object storage + CDN.
```
whodat/ apps/{web,api}  packages/{game-engine,character-schema,ai-services,ui}
        assets/{reactions,audio}  infrastructure/deployment  tests/{engine,integration,e2e}
```
**Engine API** (deterministic, independent of React/animation/AI): createGame, selectSecretCharacter, validateQuestion, resolveAnswer, filterCandidates, suggestQuestions, validateGuess, applyTurn, getReactionEvents.
Online: server stores secrets privately, validates turns, resolves answers; the opponent never receives the secret ID or hidden state. Local games use the engine in-browser.

## 11. AI character generation (optional, in the Studio)
Prompt/theme → generate structured definitions → create or select artwork → validate (trait consistency, solvability, duplicates, reactions, assets) → preview, edit, publish. Generate definitions first, art second; server-side provider abstraction; keys never in the browser; AI output always editable before publishing.

## 12. Privacy, security, family use
Guest local play; private-by-default collections; secure uploads (type/size validation, access-controlled storage); child-friendly accounts (no public profiles or open messaging; honor child-privacy rules); AI content filtering and limits; clear sharing controls; deletion of photos/assets/collections. Online rooms: unguessable codes, server-side permission checks, rate limits, expiry.

## 13. Roadmap
1. **Foundation** — core playable game with built-in packs.
2. **Multiplayer** — online rooms, reconnection, secret protection, pass-and-play.
3. **Creativity** — Character Studio, photo uploads, mixed packs, import/export.
4. **Intelligence** — AI packs, smarter opponents, hints, large boards, custom modes.
5. **Polish** — voice, sharing, richer animation, accessibility, community collections.

## 14. First-release definition of done
Full match vs computer; local two-player; consistent traits and enough questions to solve; reactions for Yes and No; eliminate/undo/final guess; useful non-revealing hints; works on desktop/tablet/mobile; built-in collections mixable, saved and selectable; independently tested rules (duplicate traits, remaining candidates); no private info in online messages; animation/sound/AI can be disabled.

## 15. Initial scope: "Who Dat? Core"
Six themed collections, reusable character/trait schema, reactive animations, classic gameplay with a beginner computer opponent, smart hints, a simple Character Studio, collection mixing and saving, responsive browser support — with architecture ready for online play, AI packs, voice and advanced rules.
