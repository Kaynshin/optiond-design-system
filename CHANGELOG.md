# option-d-design-system

## 0.1.0

Initial release.

- DTCG design tokens (`tokens/`): color, typography, space, radius, effect.
- Generated `dist/option-d.css` (`--od-` prefixed variables, light/dark themes via `.od-dark` / `[data-theme="dark"]`), `dist/tokens.js`, `dist/tokens.d.ts`.
- Self-hosted Geist / Geist Mono fonts (`dist/fonts/`, OFL licensed).
- Tailwind preset (`dist/tailwind-preset.js`).
- Brand primitives: hero (halo reserved), wordmark (`/` and `D` always magenta), signature, buttons, inputs, surfaces, badges.
- Static catalog (`catalog/index.html`).

This file is maintained going forward via [changesets](https://github.com/changesets/changesets) (`npm run changeset`).
