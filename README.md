# option-d-design-system

Design system Option/D distribuable, agnostique de framework, sans dépendance runtime.

## Installation

```bash
npm i option-d-design-system
```

## Usage

### CDN (CSS seul)

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/option-d-design-system/dist/option-d.css">
```

### Tailwind CSS

```js
// tailwind.config.js (ESM) ou tailwind.config.mjs
import odPreset from 'option-d-design-system/tailwind';

export default {
  presets: [odPreset],
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
};
```

Le paquet déclare `"type": "module"`. Le preset s'importe donc avec `import`, pas `require`.

### JS / TS (tokens bruts)

```ts
import { color, font, fontSize, space, radius, effect } from 'option-d-design-system';

color.primary; // #FF006E
font.sans;     // "'Geist','Inter',system-ui,-apple-system,BlinkMacSystemFont,sans-serif"
```

### Variables CSS

Après import de `option-d.css`, les variables suivantes sont disponibles sur `:root` (préfixe `--od-`) :

- Marque : `--od-color-primary`, `--od-color-primary-active`, `--od-color-primary-disabled`, `--od-color-on-primary`
- Canvas : `--od-color-canvas-light`, `--od-color-canvas-dark`, `--od-color-canvas-pure-black`, `--od-color-cream`, `--od-color-ink`
- Surfaces : `--od-color-surface-soft`, `--od-color-surface-card`, `--od-color-surface-elevated`
- Texte : `--od-color-on-dark`, `--od-color-body-on-dark`, `--od-color-body-strong`, `--od-color-muted-on-dark`, `--od-color-muted-soft-on-dark`, `--od-color-body-on-light`, `--od-color-body-soft-on-light`, `--od-color-muted-on-light`
- Hairlines : `--od-color-hairline-light`, `--od-color-hairline-strong-light`, `--od-color-hairline-dark`, `--od-color-hairline-strong-dark`
- Sémantiques : `--od-color-success`, `--od-color-warning`, `--od-color-error`
- Halo (réservé au hero) : `--od-effect-halo-soft`, `--od-effect-halo-medium`, `--od-effect-halo-strong`
- Typo : `--od-font-sans`, `--od-font-mono`, `--od-font-weight-*`, `--od-font-size-*`
- Espacement : `--od-space-*` (base 4px, `--od-space-section` = 96px)
- Rayons : `--od-radius-*`, `--od-radius-pill`, `--od-radius-circle`

Alias sémantiques qui basculent entre thèmes (`--od-color-canvas`, `--od-color-surface`, `--od-color-surface-elevated`, `--od-color-text`, `--od-color-text-muted`, `--od-color-hairline`, `--od-color-hairline-strong`) : valeurs light par défaut sur `:root`, remplacées en dark via `.od-dark` ou `[data-theme="dark"]` sur un ancêtre (`<html data-theme="dark">` ou `document.documentElement.classList.add('od-dark')`).

## Règles de marque

- Un seul accent : magenta `#FF006E`. Pas de bichromie. `primary-active` et `primary-disabled` sont des états, jamais un second accent.
- Wordmark « Option/D » : le `/` et le `D` sont toujours magenta (`.od-wordmark__accent`), jamais dans la couleur du texte. « Option » suit la couleur du texte environnant.
- Signature `— DAVID · DIGITAL —` (`.od-signature`) : deux termes exactement. À ne pas confondre avec le narratif « David / Design / Digital » du bundle source, qui relève du storytelling.
- Le halo magenta (`--od-effect-halo-*`) est réservé à `.od-hero`.

## Faire évoluer le design system

1. Éditer les fichiers sous `tokens/` (format DTCG, `$value`/`$type`). C'est la seule source de vérité ; tout `dist/` est généré.
2. `npm run build` régénère `dist/`.
3. Ouvrir un changeset (`npm run changeset`) décrivant le changement.
4. Publier (`npm run release`, ou via la CI sur tag / merge de changesets).

`tokens/` doit rester synchronisé avec le bundle Claude Design (`Design System Option D (standalone).html`) : toute valeur modifiée côté bundle doit être reportée ici avant publication.

## Catalog

Vitrine statique des tokens et primitives : [`catalog/index.html`](./catalog/index.html) (ouvrir directement dans un navigateur, importe `../dist/option-d.css`).

## Storybook

Vue d'ensemble interactive de chaque composant (Atomic Design : foundations, atoms,
molecules, organisms — Hero, Bannières, Signatures email, Avatars), avec toggle de
thème light/dark et controls par composant.

```bash
npm run storybook
```

Ouvre `http://localhost:6006`. Le script build d'abord `dist/` (les stories en dépendent).

Déployé automatiquement sur GitHub Pages à chaque push sur `main` touchant
`stories/`, `.storybook/`, `dist/`, `tokens/` ou `build/` :
**https://kaynshin.github.io/optiond-design-system/**

`npm run build-storybook` génère `storybook-static/` (gitignored, exclu du package publié).

## Tests

Tests unitaires des composants (render/builders des stories) avec Vitest + happy-dom.

```bash
npm test          # une passe
npm run test:watch
```

Chaque composant a un fichier sous `test/` (atoms, molecules, organisms) plus
`test/invariants.test.js` qui verrouille les invariants de marque (accent magenta unique,
wordmark `/` et `D` magenta, signature à deux termes). Les tests tournent en CI sur chaque
push / PR (`.github/workflows/test.yml`). Les dépendances de test sont en devDependencies et
n'entrent pas dans le package publié.

## Ajouter un composant

1. Créer la story `stories/<foundations|atoms|molecules|organisms>/<Composant>.stories.js`
   (HTML pur, consomme les classes `.od-*` / variables `--od-*`).
2. Ajouter le test `test/<niveau>/<composant>.test.js` couvrant ses variantes et les
   invariants de marque concernés.
3. `npm run storybook` (rendu local) et `npm test` (vert).
4. PR `feature/*` → `dev` → `main`. Le merge sur `main` redéploie le Storybook sur Pages.
