# Kidzio

A static, mobile-only quiz app for kids aged 7–12, built with plain HTML, Tailwind (CDN) and Alpine.js (CDN).
There's no build step: open `index.html`. It deploys to GitHub Pages from `main`.

One shared app runs in four **worlds** (themes): Space, Autumn forest, Race cars and Under the sea.
Each world is a folder, `themes/<id>/theme.css` + `theme.js`. Pick one with `index.html?theme=<id>`.

Before you add or change any UI (a screen, component, button, card, animation or wording),
read `DESIGN.md`. It is the design system every new piece has to fit.
To add a fifth world, read `themes/README.md`.

## Rules for every UI change

- **Tokens only.** Shared files (`styles.css`, `index.html`) colour things with tokens such as `var(--bg)`, `var(--a1)`
  and `var(--good)`. The only literal colours allowed in UI chrome are ink (`#1E2346`) and cream (`#FFF8EC`),
  which every world shares. Question pictures in the shared `i-*` sprite keep their own fixed colours.
- **Reading happens on paper.** Any text longer than a label sits on a cream card in ink.
  The scene (the background) only carries headings and short lines.
- **Theme slots.** Anything that should look different per world (art, icons, mascot poses, celebrations, words)
  is a slot on `window.KIDZIO_THEME`, used as `t.<slot>` in templates. A slot is finished when all four worlds define it.
- **Chunky and kind.** Buttons press down onto a solid shadow. Wrong answers get a gentle wobble and a hint.
  Every animation respects `prefers-reduced-motion`.
- **Thumb zone.** Tap targets are at least 56px. The main action sits in the bottom third.

## Adding a component: steps

1. **Reuse.** Look for an existing component in the `DESIGN.md` component list and extend it.
   Done when you've either reused one or can name why none fits.
2. **Style.** Put shared CSS in the matching numbered section of `styles.css`, using tokens.
   Done when your new rules contain no hex colours other than ink and cream.
3. **Slot the world-specific parts.** Add the slot to all four `themes/*/theme.js` files, plus any
   world-specific CSS to each `theme.css`. Done when `?theme=space|autumn|cars|ocean` each show the piece in that world's style.
4. **Words.** Put world-flavoured wording in each theme's `words` and neutral wording in the markup. The tone is described in `DESIGN.md`.
5. **Access.** Give it a real `<button>` or a role, an `aria-label` where the visible text isn't enough, and a visible focus ring.
   Make sure state changes reach a live region or move focus.
6. **Verify.** Render all four worlds at 390×844, plus one with reduced motion turned on.
   Done when every world looks native, there are no console errors, and text keeps WCAG AA contrast.
   The dark worlds are Space and Autumn forest; the bright ones are Race cars and Under the sea.
