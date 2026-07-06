# Spec — Storybook Option/D

Date : 2026-07-06
Branche : `feature/storybook`

## Objectif

Un Storybook donnant une vue globale de chaque composant du design system Option/D,
et servant de lieu où ajouter chaque nouveau composant. Base : atomes/molécules issus
de `dist/option-d.css`, plus les organismes bannières / signatures email / avatars.

## Stack

- `@storybook/html-vite` : stories en HTML pur (aucun framework JS runtime).
- Addons : `@storybook/addon-essentials` (controls/args), `@storybook/addon-a11y`.
- Tout en devDependencies. Le package publié reste inchangé (`files:["dist"]`).
- Les stories consomment `dist/option-d.css` (importé dans `.storybook/preview.js`).
- Décorateur global : toggle de thème light/dark appliquant `data-theme` sur le canvas
  de preview.
- `npm run build` du package doit tourner avant Storybook (les stories dépendent de
  `dist/`). Le script Storybook build lance le build package en amont.

## Scripts (package.json)

- `storybook` : `storybook dev -p 6006` (précédé de `npm run build`).
- `build-storybook` : `npm run build && storybook build -o storybook-static`.

`storybook-static/` gitignore.

## Sources de vérité (composants JS-générés)

Les 3 bundles dans `init/` génèrent leur markup en JavaScript (template strings). Le HTML
rendu a été extrait via navigateur et sauvegardé pour référence :

- `.../scratchpad/spec2/banners.rendered.html` + `banners.png`
- `.../scratchpad/spec2/signatures.rendered.html` + `signatures.png`
- `.../scratchpad/spec2/avatars.rendered.html` + `avatars.png`

(chemins absolus fournis au sous-agent ; source brute : `init/*.html`.)

## Arborescence des stories (Atomic Design)

### Foundations (docs pages)
- Intro & usage (install, CDN, thèmes)
- Colors (tokens `--od-color-*` + hex + rôle)
- Typography (échelle `.t-*`, familles Geist / Geist Mono, pangramme)
- Radii, Hairlines

### Atoms
- **Button** — controls : `variant` (primary | secondary-dark | secondary-light | icon | link),
  `state` (default | hover | disabled), `theme` (light | dark), `label`.
- **Input** (+ focus), **Badge** (pill | magenta | dot), **Wordmark** (`/` et `D` magenta ;
  control couleur du texte), **Signature** (`— DAVID · DIGITAL —`, deux termes).

### Molecules
- Input + Label, Button group, Card / Surface (soft | card | elevated).

### Organisms
- **Hero** — canvas noir + halo magenta ; control `theme`.
- **Bannières** — controls : `concept` (Halo | Monogramme | Slash), `format`
  (LinkedIn perso 1584×396 | LinkedIn entreprise 4200×700 | X 1500×500 | Générique 1104×480 |
  Cover 1920×640), `repere` (bool, overlay zone photo).
- **Signatures email** — controls : `variante` (Halo | Slash | Ligne | Cream),
  `contenu` (avec nom | sans nom), `fond` (sombre | clair). Rendu HTML table.
- **Avatars** — controls : `famille` (Signature | App icon | Photo), `variante`
  (parmi les 15), `forme`. Familles : Signature (rond, 8), App icon (carré arrondi, 7),
  Photo (2).

## Invariants de marque à préserver dans les stories

- Accent unique magenta `#FF006E`, pas de bichromie.
- Wordmark : `/` et `D` toujours magenta ; « Option » en couleur de texte.
- Signature : deux termes `DAVID · DIGITAL`.
- Halo réservé au hero / bannières hero.
- Avatars : une seule couleur d'accent, D centré dans sa zone de sécurité.

## Déploiement

- `.github/workflows/storybook.yml` : sur push `main` (paths storybook/stories/dist),
  `npm ci` → `npm run build-storybook` → déploie `storybook-static/` sur **GitHub Pages**
  (`actions/deploy-pages`). Permissions `pages: write`, `id-token: write`.
- Pages à activer côté repo : Settings → Pages → Source = GitHub Actions.
- URL cible : `https://kaynshin.github.io/optiond-design-system/`.

## Hors scope (v1)

- Pas de Web Components / composants JS runtime.
- Pas de génération d'assets exportables (SVG/PNG) — les boutons d'export des bundles
  d'origine ne sont pas reproduits ; les stories montrent le rendu, pas l'export.
- Pas de Chromatic (déploiement statique GitHub Pages suffit).

## Découpage d'implémentation

1. Scaffold Storybook (`.storybook/`, scripts, devDeps, preview.js + import CSS + décorateur thème).
2. Foundations + Atoms + Molecules (depuis `option-d.css`).
3. Organisms Hero.
4. Organisms Bannières (3 concepts × formats × repère) depuis `banners.rendered.html`.
5. Organisms Signatures (4 variantes) depuis `signatures.rendered.html`.
6. Organisms Avatars (15 variantes) depuis `avatars.rendered.html`.
7. Workflow GitHub Pages + doc (README section Storybook, CHANGELOG).

## Tests d'acceptation

1. `npm run build-storybook` produit `storybook-static/` sans erreur.
2. `npm run storybook` sert les stories ; chaque composant listé apparaît dans la sidebar.
3. Les controls de Button changent réellement variant/état/thème.
4. Bannières / signatures / avatars affichent toutes les variantes annoncées.
5. Toggle thème global fonctionne (light/dark).
6. Package publié inchangé : `npm pack --dry-run` = mêmes 19 fichiers `dist/` (Storybook exclu).
