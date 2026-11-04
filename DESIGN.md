# Kidzio design system

The reference for fitting new UI into Kidzio. Values live in the code: token values in `themes/*/theme.css`,
shared sizes and motion in the `:root` of `styles.css`. This file explains what they mean and how to use them.

## 1. Principles

1. **Picture book, not sci-fi.** Every world is a friendly illustrated place: flat colours, round shapes,
   ink outlines about 2.5–3px thick, small hand-drawn details. One gradient exists in the whole app,
   the flame on the main button.
2. **Scene and paper.** The scene is the world's background and decoration. Paper is the cream card where
   reading and answering happen. Content goes on paper, while the scene sets the mood.
3. **Chunky.** Interactive things look like toys. They have a solid offset shadow, no blur, and press down into it.
4. **Kind.** A right answer gets a celebration. A wrong answer gets a wobble, a hint and the mascot's shrug.
   The *miss* colour is a soft pink or rose in every world.
5. **One world at a time.** A component is finished when it looks native in all four worlds.

## 2. Layout and type

- **Frame:** designed for widths of 360–430px. On wider screens the app sits in a 400px phone frame.
  Each screen is a `.screen` with a scrolling `.screen-body` and a `.screen-foot` pinned to the bottom.
- **Spacing:** a 20px side gutter. Gaps between blocks are 12–20px; use `gap` on grid or flex containers.
- **Thumb zone:** primary actions go in `.screen-foot`. The main button is full width; the secondary button sits above it.
- **Targets:** at least 56px tall. Answer cards are 120–165px.
- **Type:**
  - Headings and anything tappable use Baloo 2 (`--font-head`). Body text uses Nunito (`--font-body`).
  - Sizes: screen titles 36–44px, question prompts 28px, answers 22px, body 18px (never smaller).
    Small meta text is 16px and is used sparingly.
  - Weights: headings 800, body 600–700.
- **Radii:** cards 28px (`--r-card`), buttons 22px (`--r-btn`), chips and tiles 14–20px, pills `--r-pill`.
  A bigger element gets a bigger radius.
- **Shadows** are solid offsets, sized to how raised a thing is:
  - Buttons sit 4px up (`--press-depth`) and cards 6px up (`--bg-deep`).
  - A selected card lifts to 9–14px, in its accent's deep colour.

## 3. Tokens

Every world defines the same names. Pick tokens by **meaning**, never by how they look in one world.

| Token | Meaning | Use it for |
| --- | --- | --- |
| `--bg`, `--bg-raised`, `--bg-deep`, `--bg-line` | Scene, a panel on the scene, the solid shadow under cards, drawn lines | Screen backgrounds, feedback strips, card shadows, dashed outlines |
| `--on-bg`, `--on-bg-soft` | Text on the scene | Headings, meta lines, captions outside cards |
| `--cream`, `--cream-deep`, `--ink`, `--ink-soft` | Paper and its text (the same in every world) | Everything people read or answer |
| `--a1`…`--a4` (+ `-deep`) | Four friendly accents | Telling sibling items apart: answer badges, subject tiles. Use at most two per screen outside those sets |
| `--good` (+ `-deep`) | Correct, matched, done | Right answers, matched pairs, completed states |
| `--miss` (+ `-deep`) | A gentle "not quite" | The wrong pick. Never use it for errors or warnings in UI chrome |
| `--hi`, `--hi-deep`, `--hi-text` | Highlight | Chips, sparkles, streaks. `--hi-text` is the readable version for text on the scene |
| `--focus` | Keyboard focus ring | Applied automatically by `:focus-visible` |
| `--flame`, `--flame-deep` | The main button | `.btn-flame` only |
| `--track`, `--trail`, `--traveller-turn` | Progress journey | The progress bar |

On bright worlds, `--on-bg`, `--hi-text` and `--focus` are dark. Check text against `--bg` in both a dark world
and a bright world.

## 4. Components

Reuse these before you build anything new. They all live in `styles.css`, in the numbered section shown.

| Component | Class | Section | Use |
| --- | --- | --- | --- |
| Main button | `.btn.btn-flame` | 5 | The one primary action per screen, at the bottom |
| Paper button | `.btn.btn-paper` | 5 | Secondary actions, and square icon buttons (56×56) |
| Answer card | `.answer-card` (+ `.card-inner`, `.card-front`, `.card-back`) | 6, 11 | Any pick-one choice. States: `is-selected`, `is-flipped`, `is-dimmed`, `is-wobbling` |
| Letter badge | `.planet-badge` with `t.badge(accent)` | 6 | Lettered marker on a choice |
| Subject tile | `.subject-tile` with `t.tile(accent, icon)` | 8 | A chunky entry point into content |
| Streak panel | `.streak` | 8 | A summary strip on the scene |
| Progress journey | `.flight` | 9 | Progress through a sequence: start → traveller → end |
| Feedback strip | `.feedback` with `.mascot` | 9 | The mascot talking to the child. One per screen, in the foot |
| Mascot | `.mascot.is-idle|is-wave|is-happy|is-shrug` with `t.mascot` | 10 | Emotional reactions. Add new moods as CSS on the `.m-arm-l`, `.m-arm-r` and `.m-head` hooks |
| Statement / sentence | `.statement`, `.sentence` | 11, 12 | Large text to read on paper |
| Picture frame | `.picture-frame` (+ `.is-shadow`) | 11 | One large illustration |
| Word tile / gap chip | `.word-tile`, `.gap-chip` | 12 | Small pieces that move into place |
| Match item | `.match-item` (+ `.is-sel`, `.is-matched`, `.is-wrong`) | 13 | Two-column pairing |
| Result card | `.result-card` | 15 | A summary on paper, with the mascot overlapping its top edge |
| Celebration layer | `.blast` with `t.celebration` | 14 | A full-screen reward moment of about 1.5 seconds |

The state language is the same everywhere. Match it in anything new:
- **Idle:** cream, with a 6px `--bg-deep` shadow.
- **Selected:** ink border, lifted, with a ✓ badge or deeper shadow. Selection never relies on colour alone.
- **Correct:** `--good` fill.
- **Miss:** `--miss` fill plus a wobble.
- **Not relevant now:** fades into the scene, with `--bg-raised` fill, `--bg-line` border and `--on-bg` text.
- **Disabled main button:** `--cream-deep`, with no gradient.

## 5. Motion

Motion answers what the child did. Ambient motion is slow and stays in the scene.

| Moment | How | Timing |
| --- | --- | --- |
| Press | `translateY(--press-depth)`, shadow to 0 | `--t-press` (120ms) |
| Select | Lift with a small arc (`orbit-up`), badge art turns | about 420ms, `--ease-bounce` |
| Reveal | Card flip (`rotateY`); reduced motion swaps faces instead | `--t-flip` (520ms), `--ease-soft` |
| Miss | `wobble` after the reveal lands | 620ms |
| Correct | Card star burst, then the world's `t.celebration` | 700ms / 1.5s |
| Screen change | Slide and fade (`screen-anim`) | `--t-screen` (250ms) |
| New question | `.q-in` slide | 250ms |
| Ambient | Twinkle, drift, sway or rise; give the element the class `ambient` | 5–80s loops |

Every new animation needs a matching rule under `prefers-reduced-motion: reduce`. Elements with the class `ambient`
are stopped there already. Keep ambient pieces away from text and paper, at the edges, low or high on the screen.

## 6. Words

- **Voice:** a warm older sibling. Short sentences, plain verbs, sentence case, spoken to the child as "you".
- **Labels name the action:** "Check", "Next question", "Try again". The same action keeps the same name throughout.
- **Feedback:** praise names what was right ("Yes! Mercury whizzes round the Sun…"). A hint gives the answer and the reason.
  Neither ever blames the child.
- **World flavour** comes from `t.words`: a mission, adventure, race or dive; a planet, trail, track or reef.
  Neutral words such as question, answer, stars and streak stay in the markup.
  A new themed word means a new key in all four `words` objects.

## 7. Worlds

When a new component needs world-specific art, draw from that world's motifs.

| World | Mood | Scene | Mascot | Motifs for new art | Words |
| --- | --- | --- | --- | --- | --- |
| `space` | Dark, calm night | Navy sky, twinkling stars, quiet planets | Zip the astronaut | Planets with rings, rockets, stars, moons | mission, planet, fly, pilot |
| `autumn` | Dark, cosy dusk | Chestnut woods, a harvest moon, drifting leaves | Hazel the hedgehog | Leaves, acorns, baskets, mushrooms, berries | adventure, trail, explore, explorer |
| `cars` | Bright, energetic | Sunny sky, clouds, hills, a road | Vroomy the car | Road signs, traffic lights, flags, tyres, trophies | race, track, drive, champion |
| `ocean` | Bright, playful | A turquoise reef, light rays, bubbles, seaweed | Finn the fish | Shells, bubbles, starfish, treasure, submarines | dive, reef, swim, diver |

Art rules for every world:
- **Coordinates:** draw on simple grids (64×64 icons, 58×46 badges, 76×62 tiles, 120×150 mascots).
- **Outlines:** use ink outlines.
- **Accent fills:** fill with `style="fill: var(--aN)"`, so the art follows the palette.
- **Text on art:** keep a calm cream or accent area behind any letter.

## 8. Recipe: a world-aware component

The example is a "hint" button that shows a different picture in each world.

1. In the markup, the shared component uses the slot:
   `<button class="btn btn-paper" :aria-label="t.words.hint"><span x-html="t.hintIcon"></span></button>`
2. In all four `themes/*/theme.js` files:
   - add `hintIcon`: a 64×64 SVG built from that world's motifs;
   - add `words.hint`, for example "Ask Zip for a clue", "Ask Hazel for a clue", and so on.
3. In `styles.css`, add the shared sizing and states, using tokens only.
   Add CSS to a world's `theme.css` only if that world needs its own animation.
4. Check `?theme=space`, `autumn`, `cars` and `ocean`, and one run with reduced motion turned on.
