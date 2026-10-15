# Who Dat? — Complete Game Design Specification

**Product:** Who Dat?  
**Category:** Family-friendly browser guessing game  
**Design status:** Product and technical direction  
**Primary platforms:** Desktop, tablet, and mobile browsers; PWA-ready  
**Audience:** Families and players of all ages  
**Core differentiator:** Characters react to questions with expressive, character-specific animations.

## 1. Product vision

Who Dat? is a modern, family-friendly browser game inspired by the classic yes/no character-guessing format. Players choose a character collection, ask questions, narrow down possible characters, and try to identify an opponent's secret character. Who Dat? expands the familiar format with reactive characters, customizable portraits and traits, themed packs, collection building, hints, computer opponents, and online play.

The game should be welcoming to casual players while offering a creative toolkit for people who want to build their own characters and boards. It should feel polished, playful, responsive, and easy to learn in minutes.

### Product principles

1. **Fast to play:** Start a match in a few clicks.
2. **Personality over static portraits:** Characters react to the questions that describe them.
3. **Creativity without complexity:** Ready-made packs for casual play; deeper customization for creators.
4. **Fair and understandable rules:** Answers come from structured traits, not unpredictable model output.
5. **Family-friendly by default:** Privacy, accessibility, and age-appropriate defaults are foundational.
6. **Graceful degradation:** The game remains playable without audio, animation, AI, or an account.
7. **Extensible by design:** Packs, traits, reactions, and game modes should be data-driven.

## 2. Core game loop

1. Choose a built-in collection or custom set.
2. Start a local match, online room, or game against a computer opponent.
3. Each player receives a secret character.
4. On a turn, ask a supported yes/no question.
5. The game resolves the answer from the secret character's structured traits.
6. Matching characters perform their configured reactions.
7. Players eliminate candidates that do not match the answer.
8. Make a final guess when ready.
9. Show the result, celebrate the winner, and offer a rematch or a different collection.

The standard mode should remain close to the classic game. Variants may add timers, question limits, scoring, or larger boards, but must clearly explain rule changes before a match begins.

## 3. Main screens and user experience

### Home screen

Primary actions:
- **Quick Play:** Start with sensible defaults.
- **Play with Friends:** Create or join an online room.
- **Play the Computer:** Choose an opponent difficulty.
- **Character Studio:** Create or edit characters and packs.
- **My Collections:** Browse, mix, import, export, and share saved sets.

Use a modern visual style with clear hierarchy, rounded character cards, accessible contrast, restrained transitions, and a playful but uncluttered layout.

### Match setup

Allow players to:
- Choose one or more collections and mix their characters.
- Select local, online, or computer play.
- Choose an opponent difficulty.
- Select a rule variant.
- Set question limits or turn timers when supported.
- Configure sound, speech, animation, and board density.
- Review the collection size and available question traits before starting.

### Gameplay board

The board includes:
- A responsive grid of character cards.
- A question composer and supported question suggestions.
- A visible Yes/No answer.
- Question history and remaining-candidate count.
- Smart hint action.
- Final-guess action.
- Turn and opponent status.
- Optional timer and score.
- Sound, narration, and animation controls.

On touch devices, eliminated cards can fold, dim, or slide down. Desktop can use subtle flip animations. Card state must remain clear without relying on color alone. For large sets, provide search, filters, compact/large card sizes, zoom, and list virtualization or pagination as needed.

### Character cards

A card can show a portrait or photo, name (depending on the mode), active/eliminated state, and reaction animation. An optional detail view may show public character attributes, but should not reveal hidden information in competitive modes.

## 4. Signature feature: reactive characters

Characters are not static portraits. They respond when questions match their traits, making the board feel alive and memorable.

Examples:
- A character wearing glasses winks and adjusts their glasses when asked about glasses.
- A dragon flaps its wings when asked whether it has wings.
- A pizza character gives two thumbs up when asked whether it has cheese.
- A character with a mustache twirls it when the mustache trait is queried.
- A character may tip a hat, gasp, dance, flex, or react dramatically when eliminated or when a final guess is made.

### Reaction model

Each reaction event has:
- A trigger (trait/question, idle, elimination, correct guess, incorrect guess, victory).
- An animation or visual effect.
- An optional sound effect.
- Optional timing and priority.
- A fallback when animation or audio is unavailable.

Reaction categories:
- **Trait match:** A character-specific response when a question describes it.
- **Trait mismatch:** Optional contrasting response, such as a shrug or head shake.
- **Idle/personality:** Subtle ambient behavior, used sparingly.
- **Elimination:** Fold, duck, slide, or dramatic exit.
- **Final guess:** Celebration or playful disappointment.
- **Victory:** A short win animation.

Characters may override the default reaction for any trait. Reusable reaction assets are preferred for the first release; unique animation assets can be added over time.

### Fairness rules

- Traits determine the truth of an answer; animations never do.
- Reactions must not reveal the secret character or hidden state.
- A reaction must not change the answer or game outcome.
- Online answers and eligible reaction events are determined by the authoritative game state.
- Provide static fallbacks and a reduced-motion option.

Use lightweight assets such as CSS/SVG animation, sprite sheets, Lottie, or small WebP animations. For photo-based characters, expressive overlays can provide reactions without generating a new video for every photo.

## 5. Built-in character packs and collections

The launch collection categories are:

1. **Funny Faces:** Quirky people, unusual hairstyles, silly expressions, glasses, hats, freckles, facial hair, and accessories.
2. **Fantasy & Creatures:** Dragons, wizards, fairies, monsters, aliens, knights, horns, wings, scales, and magical features.
3. **Animals & Pets:** Dogs, cats, rabbits, woodland and jungle animals, fur, feathers, tails, stripes, spots, and ears.
4. **Food Fight:** Pizza, tacos, burgers, fruit, desserts, sushi, cheese, toppings, frosting, sprinkles, and other food traits.
5. **Seasonal Specials:** Halloween, Christmas, birthdays, winter, summer, costumes, pumpkins, snow, gifts, and festive accessories.
6. **Our People (custom):** Family, friends, classmates, and other people represented by user-created avatars or uploaded photos. This is a customizable collection category, not a requirement for a built-in set of real people's photos.

Players can mix packs, such as 12 animals and 12 fantasy creatures, or combine illustrations and family photos. Large collections should support 24, 48, 100, or more characters when the question catalog and UI can handle them.

### Collection metadata and lifecycle

Each collection should support:
- Title, description, cover image, creator, version, and character count.
- Visibility: private by default, shareable link, or public/community if that feature is later introduced.
- Import/export and duplicate/copy-to-Studio.
- Editing and validation before publishing.
- Versioning or a clear update model for shared sets.

Before a set becomes playable, validate duplicate IDs, missing assets, invalid traits, unsupported reactions, usable question coverage, and trait distribution. Warn creators when questions are too weak to distinguish candidates.

## 6. Character Studio and customization

Character Studio is a dedicated creation experience, separate from the match screen.

### Creation workflow

1. Choose a starting point: template, blank avatar, AI-assisted concept, or uploaded photo.
2. Customize appearance: face, hair, colors, clothing, accessories, expression, and background where supported.
3. Define explicit game traits.
4. Assign default and trait-specific reactions.
5. Preview the character on a board and test each trait/question.
6. Save the character to a collection.

### Photo characters

Support cropping, fit/position adjustments, optional background treatment, display name, and manually assigned traits. Photo characters can use overlays or reusable animations such as a wink, thumbs up, or speech bubble.

Do not infer sensitive personal attributes from family photos. The creator explicitly assigns traits used in gameplay. Uploaded photos should remain private unless the user deliberately shares a collection containing them.

### Character data model

Example:

```json
{
  "id": "professor-pickles",
  "name": "Professor Pickles",
  "packId": "funny-faces",
  "portrait": {
    "type": "illustration",
    "assetId": "portrait-professor-pickles"
  },
  "traits": {
    "wearsGlasses": true,
    "hasMustache": true,
    "wearsHat": true,
    "hasWings": false
  },
  "reactions": {
    "wearsGlasses": "wink-adjust-glasses",
    "hasMustache": "twirl-mustache",
    "wearsHat": "tip-hat",
    "default": "idle-smile",
    "eliminated": "dramatic-fold"
  }
}
```

**Schema principle:** traits are game data; reactions are presentation data. Keep these separate so animation changes cannot affect gameplay correctness.

## 7. Question engine and smart hints

Questions should be based on a validated attribute catalog rather than unrestricted natural-language interpretation.

### Question categories

- **Appearance:** hair, eyes, clothing, accessories, colors, facial features.
- **Type/identity:** animal, food, fantasy creature, profession, character class.
- **Special features:** wings, horns, magic, patterns, toppings, or pack-specific properties.
- **Custom traits:** explicitly defined by the collection creator and mapped to clear yes/no questions.

Examples: “Does your character wear glasses?”, “Does your character have wings?”, “Is your character an animal?”, “Does your character have a tail?”, “Does your character have something red?”

A collection without enough valid questions should not be playable until fixed or configured to use a supported fallback question set.

### Smart hints

Hints rank valid questions against the remaining candidates. A good default is to favor questions that divide the candidate set as evenly as possible. For each suggestion, show a plain-language explanation, such as “This question is likely to eliminate about half the remaining characters.”

Hints should not reveal the secret character. More advanced hint strategies may account for question limits, prior questions, and opponent strategy.

### Free-form questions and AI

AI may suggest questions, traits, character descriptions, and pack ideas, but must never be the authority for a live answer.

Pipeline:
1. AI proposes a question.
2. The application maps it to a supported trait or rule.
3. The engine validates that the trait exists and is usable for this collection.
4. The game engine or authoritative server computes the answer from the secret character.
5. The UI displays the answer and triggers eligible reactions.

If the question cannot be mapped unambiguously, ask the player to rephrase or choose a supported question.

## 8. Game modes and variants

### Core modes

- **Local two-player:** Pass-and-play on one device. Use a privacy screen between turns so the next player cannot see the previous player's secret.
- **Online multiplayer:** Private rooms, invite links or codes, synchronized turns, reconnection, and server-authoritative answers.
- **Computer opponents:** Beginner and strategic difficulties. Beginner play prioritizes accessibility; stronger opponents select informative questions and track candidates consistently.

### Optional variants

- **Classic:** Standard yes/no questions and final guess.
- **Speed Round:** Turn timer.
- **Twenty Questions:** Limited question budget.
- **Big Board:** Large collections with search and filters.
- **Mystery Mix:** Random combination of selected collections.
- **Silly Reactions:** More prominent character animation and optional sounds.
- **Custom Rules:** Configure question limits, timers, scoring, and other supported rules.

Classic should be the default. Explain each variant before starting a match.

## 9. Voice, sound, and accessibility

Voice and audio are optional enhancements, never requirements.

Potential features:
- Browser text-to-speech for questions, answers, and turn changes.
- Character-specific sound effects.
- Separate speech/effects volume and a master mute.
- Victory and final-guess announcements.

Accessibility requirements:
- Keyboard navigation and visible focus.
- Screen-reader labels for cards, questions, turns, and elimination states.
- Large text and high-contrast options.
- Reduced-motion mode.
- Sound-off gameplay with visual answer indicators.
- Active/eliminated states that do not rely on color alone.
- Usability on desktop, tablet, and mobile.
- Full gameplay remains possible with animation and audio disabled.

## 10. Browser and service architecture

### Recommended target architecture

The long-term target is a responsive web app, optionally installable as a Progressive Web App (PWA).

- **Frontend:** React + TypeScript for UI, board, Character Studio, collection management, and client state.
- **Presentation:** CSS, SVG, and Lottie or sprite animations; responsive layout and reduced-motion support.
- **Backend:** TypeScript API for accounts, collections, room management, turn validation, and match persistence as needed.
- **Real-time multiplayer:** WebSockets for turns, answers, board updates, connection status, and reconnection.
- **Database:** PostgreSQL for accounts, collections, permissions, and persistent data.
- **Object storage/CDN:** Portraits, uploads, animation files, and audio.
- **AI provider abstraction:** Server-side integration for optional character/question generation; never expose API keys in the browser.

The current prototype may remain a lightweight static browser application while core gameplay is validated. The full stack is a recommended target architecture, not a claim that all services already exist.

### Suggested repository structure as the product grows

```text
whodat/
  apps/
    web/                 # Browser game and Character Studio
    api/                 # REST API and game-room services
  packages/
    game-engine/         # Rules, questions, guesses, scoring
    character-schema/    # Traits, portraits, reactions, packs
    ai-services/         # Character and question generation
    ui/                  # Reusable UI components
  assets/
    reactions/
    audio/
  infrastructure/
    deployment/
  tests/
    engine/
    integration/
    e2e/
```

### Game engine responsibilities

Keep the core engine deterministic and independent of React, animation libraries, and AI providers. Its conceptual API includes:
- `createGame()`
- `selectSecretCharacter()`
- `validateQuestion()`
- `resolveAnswer()`
- `filterCandidates()`
- `suggestQuestions()`
- `validateGuess()`
- `applyTurn()`
- `getReactionEvents()`

The existing repository's implementation and directory layout may differ from this future target. Migrate incrementally rather than replacing working code solely to match the proposed structure.

### Online state and security

The server stores each player's secret character privately, validates turns, computes answers, and emits only the information the other player is allowed to know. Never send the opponent's secret ID or hidden state in client messages or API responses. Local games may keep secrets in browser memory and use a privacy screen.

## 11. AI-assisted character generation

AI generation is an optional Character Studio capability.

Workflow:
1. Player provides theme, style, number of characters, and constraints.
2. Generate structured character definitions first: names, traits, descriptions, and reaction mappings.
3. Generate or select artwork after the definitions are validated.
4. Validate trait consistency, solvability, duplicates, reaction assignments, asset availability, and supported content.
5. Preview, edit, and approve before saving or publishing.

Generate structured definitions before artwork to reduce unnecessary regeneration when the player edits traits or names. Keep AI integrations behind a server-side provider abstraction. AI output must remain editable, and provider credentials must never be sent to the browser.

## 12. Privacy, security, and family use

- Allow local guest play without an account.
- Keep custom collections and uploaded photos private by default.
- Validate uploaded file types and sizes; process images safely and store them behind appropriate access controls.
- Make it clear when a share link exposes photos, names, or other identifying information.
- Provide deletion for uploaded photos, generated assets, and collections, following a documented retention policy.
- Avoid public child profiles, unrestricted messaging, and unnecessary personal data.
- Apply relevant child-privacy requirements if children can use accounts.
- Apply content filtering and usage limits to AI generation.
- Use unguessable room codes, server-side authorization, rate limits, and expiry for abandoned online rooms.

## 13. Roadmap

### Milestone 1 — Core playable game
- Responsive board and setup.
- Deterministic trait/question engine.
- Elimination and final guess.
- Beginner computer opponent.
- Reactive character presentation.
- Smart hints.
- Built-in packs and local pass-and-play.
- Automated rules tests.

### Milestone 2 — Multiplayer foundation
- Online rooms and invitation links/codes.
- Authoritative server-side answer resolution.
- Private secret state.
- Reconnection and room lifecycle.
- Multiplayer integration tests.

### Milestone 3 — Character Studio and collections
- Character editor and explicit trait management.
- Photo-based characters and reaction overlays.
- Save, mix, import, export, and share collections.
- Collection validation and versioning.

### Milestone 4 — Intelligence and variants
- AI-assisted pack generation with validation.
- Better computer strategies.
- Advanced hints.
- Speed Round, Twenty Questions, Big Board, Mystery Mix, and custom rules.

### Milestone 5 — Polish and community
- Voice and sound effects.
- Expanded reaction library.
- Accessibility refinement.
- Optional community collections and remixing.
- PWA refinements and performance tuning.

## 14. First-release acceptance criteria

The first release is ready when:
- A complete match can be played against a computer opponent.
- Two players can play locally on one device.
- Every playable collection has consistent traits and sufficient supported questions.
- Yes and No answers trigger correct reaction events without affecting truth.
- Players can eliminate candidates and make a final guess.
- Hints are useful and do not reveal the secret character.
- The UI works on desktop, tablet, and mobile browsers.
- Built-in collections can be selected and mixed where supported.
- Game rules are covered by tests, including duplicate traits and small candidate sets.
- Secret character data is not exposed in online messages when online play is implemented.
- Audio and motion can be disabled without preventing play.
- Private photos and custom collections are not shared without explicit user action.

## 15. Initial product scope: Who Dat? Core

Prioritize a coherent, playable game over implementing every long-term feature at once:
- Five ready-made illustrated packs: Funny Faces, Fantasy & Creatures, Animals & Pets, Food Fight, Seasonal Specials.
- A custom “Our People” category for user-created avatars and photos.
- Reusable character/trait/reaction schema.
- Classic gameplay, computer opponent, and local pass-and-play.
- Reaction animations and smart hints.
- Collection mixing and local saving.
- Responsive browser UI and accessible controls.

Online multiplayer, full Character Studio, AI generation, voice enhancements, and advanced rule variants can follow in later milestones. The architecture should leave room for them without implying they are already implemented.
