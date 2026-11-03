# Kidzio

A static, mobile-only prototype of a friendly space quiz app for kids aged 7–12.
Plain HTML, Tailwind CSS (CDN) and Alpine.js (CDN). There's no build step and no backend.

## Run locally

Open `index.html` in a browser. On a wide screen the app sits in a phone-sized frame.

## What's inside

| File | What it holds |
| --- | --- |
| `index.html` | All three screens (home, quiz, results), the icon sprite and the sky |
| `styles.css` | Design tokens, components, keyframes and the reduced-motion rules |
| `app.js` | Quiz logic, the mascot drawing and the sample questions |

### Game types

Every question in `QUESTIONS` (in `app.js`) has a `type`:

- `multiple`: four planet cards in a 2×2 grid. Tap one, then press Check.
- `gap`: a sentence with a dashed blank. Tap a word tile to drop it in.
- `picture`: a large picture with four answer cards. `shadow: true` shows the picture as a silhouette until Check.
- `truefalse`: a statement with thumbs-up and thumbs-down cards.
- `match`: tap a left card, then its partner on the right. Matched pairs join with a line.

Today's mission (`DAILY`) runs 10 questions, and the first five show all five game types.
Each subject planet runs that subject's three questions.

## Deploy on GitHub Pages

1. Go to **Settings → Pages** in this repository.
2. Set **Source** to **Deploy from a branch**.
3. Choose branch **`main`** and folder **`/ (root)`**, then click **Save**.
4. After 1–3 minutes the site is live at `https://vaskaraminashvili.github.io/Kidzio_ui/`.

Every push to `main` redeploys the site.
