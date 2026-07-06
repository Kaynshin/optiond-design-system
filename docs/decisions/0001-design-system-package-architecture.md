# 0001 — Architecture du package option-d-design-system

## Statut

Acceptée (2026-07-06).

## Contexte

Le bundle `Design System Option D (standalone).html` doit devenir un package npm distribuable,
agnostique de framework, sans dépendance runtime, réutilisable via CSS brut, variables CSS,
JS/TS typé ou preset Tailwind.

## Décisions

1. **Style Dictionary v4** (`^4.4.0`, pas v5) comme unique moteur de génération des tokens
   (`tokens/*.tokens.json` DTCG → `dist/option-d.css` + `dist/tokens.js` + `dist/tokens.d.ts`),
   via des formats custom (`od/css`, `od/js`, `od/ts`) plutôt que les formats intégrés, pour
   contrôler précisément le nommage `--od-*` et la forme des exports JS attendus.
2. **Lecture de `token.original.$value`** plutôt que `token.value`/`token.$value` transformé,
   pour préserver la casse hex exacte des tokens sources (`#FF006E`) au lieu de la normalisation
   en minuscules appliquée par les transforms `color/css` intégrés de Style Dictionary.
3. **Primitives non générées** : les composants (`.od-hero`, `.od-btn-*`, `.od-badge-*`, etc.)
   sont hand-authored dans `build/primitives.css` et concaténés à `dist/option-d.css` par
   `build/copy-assets.mjs`, car ce sont des règles composites (pas un mapping 1:1 token→variable).
4. **Alias sémantiques de thème** (`--od-color-canvas`, `--od-color-surface`, `--od-color-text`,
   `--od-color-hairline`, ...) générés en plus des tokens littéraux, avec valeurs light par
   défaut sur `:root` et override dans un bloc `[data-theme="dark"], .od-dark`. Les tokens
   littéraux (primary, radius, fontSize, space, halo) ne changent jamais entre thèmes.
5. **Fonts commitées sous `assets/fonts/`** (pas seulement dans `dist/`, qui est généré et
   gitignore) pour que `npm run build` soit reproductible sans dépendre d'un répertoire
   scratchpad temporaire. `build/copy-assets.mjs` les recopie vers `dist/fonts/` à chaque build.
6. **Tailwind preset en ESM** (`export default`), pas CommonJS, parce que `package.json` déclare
   `"type": "module"` (exigé par la spec). Un fichier `.js` sous ce package est donc toujours
   parsé comme ESM par Node, y compris via le champ `exports`. Conséquence : le README documente
   `import odPreset from 'option-d-design-system/tailwind'`, pas `require(...)`.
7. **`.changeset` config `access: "public"`** (pas `restricted`, la valeur par défaut) car le
   paquet est non scopé et public sur npm.

## Tension notée : signature vs narratif

Le bundle source contient un narratif « David / Design / Digital » (storytelling, trois termes).
La signature de marque `.od-signature` demandée est `— DAVID · DIGITAL —`, deux termes
exactement. Les deux coexistent volontairement : le narratif reste du contenu éditorial, la
signature est un composant de marque figé. Aucune règle CSS `.signature` n'existait dans
`primitives-raw.css` fourni : le style de `.od-signature` (Geist Mono, capitales, letter-spacing
large, opacité réduite) est une interprétation raisonnable de la spec, à valider par l'équipe
design si un rendu de référence existe.
