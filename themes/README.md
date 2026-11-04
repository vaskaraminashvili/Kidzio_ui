# Kidzio themes

Each world is two files in its own folder. The games, questions and layout are shared and live in the
root `index.html`, `styles.css` and `app.js`.

| Theme | Folder | Look | Mascot | Progress bar |
| --- | --- | --- | --- | --- |
| Space | `space/` | Dark night sky | Zip the astronaut | Rocket flies Earth → Moon |
| Autumn forest | `autumn/` | Dark chestnut dusk | Hazel the hedgehog | Acorn rolls to the acorn basket |
| Race cars | `cars/` | Bright sunny day | Vroomy the car | Car drives to the chequered flag |
| Under the sea | `ocean/` | Bright turquoise reef | Finn the fish | Submarine dives to the treasure chest |

## How a theme is chosen

The loader at the top of `index.html` picks, in order:

1. `?theme=<id>` in the address, e.g. `index.html?theme=cars`
2. the saved profile setting, `localStorage["kidzio-theme"]`
3. `space`

The future profile settings page only needs to write `localStorage.setItem('kidzio-theme', id)`.
`themes.html` already does this with its "Make it mine" button.

## What goes in a theme

### `theme.css`

- The colour tokens on `:root`. Copy the block from `space/theme.css` and change the values.
  - `--bg*` and `--on-bg*` are the scene and the text on it.
  - `--a1`…`--a4` are the four card accents, each with a `-deep` partner for its solid shadow.
  - `--good` (correct), `--miss` (gentle "not quite") and `--hi` (chips and sparkles).
  - On bright themes, also set a dark `--focus` and a dark `--hi-text`.
- The mascot's pivot points: `.mascot .m-arm-l`, `.m-arm-r` and `.m-head` `transform-origin`.
- Animations for the scenery (mark moving pieces with the class `ambient`, so reduced motion stops them).
- Animations for the celebration markup.

### `theme.js`

It sets `window.KIDZIO_THEME` with:

| Key | What it is |
| --- | --- |
| `id`, `name`, `themeColor`, `preview` | Identity, browser bar colour, and the swatches shown on `themes.html` |
| `words` | Every themed word: tagline, buttons, mission names, result titles |
| `sprite` | SVG `<defs>` with `t-spark` (a path centred on 0,0) and the symbols `t-start`, `t-end` and `t-traveller` (viewBox 0 0 64 64) |
| `scenery` | Background markup, drawn behind everything |
| `mascot` | An SVG (viewBox 0 0 120 150) with groups `.m-arm-l`, `.m-arm-r` and `.m-head`, so the wave, cheer and shrug moods work |
| `badge(accent)` | Letter badge for answer cards, an SVG with viewBox 58×46. Fill with `style="fill: var(--${accent})"` |
| `tile(accent, icon)` | Subject tile art, an SVG with viewBox 76×62, holding `<use href="#${icon}">` |
| `celebration` | Markup played over the screen for 1.5 seconds after a correct answer |

Keep the shared rules in every world:
- Reading happens on cream cards.
- Wrong answers stay gentle, never red flashing.
- The main button keeps the flame gradient.
