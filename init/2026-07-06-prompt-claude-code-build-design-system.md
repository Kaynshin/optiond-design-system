---
type: livrable
title: Prompt Claude Code — construire le Design System Option/D depuis le bundle standalone
domain: option-d
pole: shared
created: 2026-07-06
updated: 2026-07-06
auto_generated: true
related:
  - "[[2026-07-06-boucle-packaging-design-system|Boucle packaging]]"
  - "[[../../articles/Charte-Graphique|Charte graphique Option/D]]"
  - "[[_index|Design System — index]]"
tags: [option-d, design-system, prompt, claude-code, npm, tokens]
---

# Prompt Claude Code — construire le Design System Option/D

> Source de vérité : le fichier `Design System Option D (standalone).html`
> (bundle HTML autonome, fonts et styles inline). À déposer dans le dépôt avant
> de lancer. Charte vivante : https://claude.ai/design/p/019dd510-4c74-7518-8bab-ad1a3ad738a2?file=Design+System+Option+D.html
> Tokens ci-dessous extraits et vérifiés depuis ce bundle le 2026-07-06.
> Le prompt construit le package `option-d-design-system` selon l'architecture de
> la boucle du 2026-07-06, puis génère sa doc d'usage.

---

## Le prompt (copier tout ce qui suit)

```
Tu es un ingénieur design system. Construis, dans le dépôt courant, un package de
design system distribuable, agnostique de framework, maintenable par une seule
personne. Nom : `option-d-design-system` (si je te donne un scope npm que je
possède, utilise `@monscope/design-system`). Petits commits, une ligne de
justification par décision, tests d'acceptation à la fin.

## Source de vérité
Le fichier `Design System Option D (standalone).html` est à la racine du dépôt.
C'est un bundle HTML autonome (fonts Geist en base64 inline, styles inline).
Il FAIT FOI. Charte de référence vivante (Claude Design) :
https://claude.ai/design/p/019dd510-4c74-7518-8bab-ad1a3ad738a2?file=Design+System+Option+D.html
Parse le fichier local pour :
- confirmer les tokens listés plus bas (ils en sont extraits, vérifie-les) ;
- récupérer les fonts Geist / Geist Mono inline (base64) et les écrire en
  dist/fonts/*.woff2 self-host ;
- porter les primitives CSS présentes (wordmark, signature, boutons, sélection,
  inputs, surfaces, cartes) dans dist/option-d.css.
En cas d'écart entre le bundle et la liste ci-dessous, le bundle gagne, signale
l'écart.

## Principe directeur
Une source de vérité unique (tokens DTCG), plusieurs sorties générées, deux canaux
de distribution (npm + CDN). En v1 : tokens + primitives CSS, pas de composants
liés à un framework.

## Tokens à encoder (format DTCG, valeurs exactes)
Couleurs — marque :
  primary #FF006E · primary-active #E6005C · primary-disabled #3D0019 · on-primary #FFFFFF
Couleurs — canvas :
  canvas-light #FFFFFF · canvas-dark #0A0A0A · canvas-pure-black #000000 · cream #F5F1EA · ink #0A0A0A
Couleurs — surfaces (dark) :
  surface-soft #121212 · surface-card #1A1A1A · surface-elevated #242424
Couleurs — texte sur dark :
  on-dark #FFFFFF · body-on-dark #CCCCCC · body-strong #E6E6E6 · muted-on-dark #888888 · muted-soft-on-dark #5A5A5A
Couleurs — texte sur light :
  body-on-light #3A3A3A · body-soft-on-light #666666 · muted-on-light #75758A
Couleurs — hairlines :
  hairline-light #E5E5E5 · hairline-strong-light #D0D0D0 · hairline-dark #2A2A2A · hairline-strong-dark #3A3A3A
Couleurs — halo (réservé au hero) :
  halo-soft rgba(255,0,110,0.10) · halo-medium rgba(255,0,110,0.14) · halo-strong rgba(255,0,110,0.18)
Couleurs — sémantiques :
  success #22C55E · warning #F59E0B · error #EF4444
Typographie :
  sans : 'Geist','Inter',system-ui,-apple-system,BlinkMacSystemFont,sans-serif
  mono : 'Geist Mono','JetBrains Mono',ui-monospace,'SF Mono',monospace
  poids : 400, 500, 600, 700
  échelle (px) : 10 11 12 13 14 15 16 18 20 24 32 40 48 56 64 72 80 88 96 120
Espacement :
  grille de base 4px · rythme de section 96px
Rayons :
  2 · 3 · 4 · 6 · 8 · 12 · 16 · pill 9999 · circle 50%

## Invariants de marque (à respecter et vérifier)
- accent unique magenta #FF006E, pas de bichromie ; primary-active/disabled ne
  sont que des états, pas une seconde couleur dominante
- wordmark « Option/D » : slash « / » toujours présent ; le « / » ET le « D »
  toujours en magenta ; « Option » en couleur de texte ; le « D » n'est jamais
  de la couleur du texte
- signature headline : « — DAVID · DIGITAL — » en Geist Mono, capitales,
  letter-spacing large, opacité réduite (deux termes : David puis Digital)
- halo magenta réservé au hero
NB : le bundle contient aussi un bloc narratif « David / Design / Digital, trois
faces ». C'est du storytelling de marque, pas la signature. La signature affichée
reste « — DAVID · DIGITAL — ». Si tu vois cette tension, garde la signature à deux
termes et mentionne-le.

## Arborescence cible
tokens/            color.tokens.json, typography.tokens.json, space.tokens.json,
                   radius.tokens.json, effect.tokens.json  (DTCG / W3C)
build/             style-dictionary.config.mjs
dist/ (généré, publié) :
                     option-d.css        -> :root { --od-* } (light + dark) + @font-face + utilitaires + primitives
                     tokens.js + tokens.d.ts
                     tailwind-preset.js
                     fonts/              -> Geist + Geist Mono woff2 self-host + licence OFL
catalog/           index.html -> vitrine statique (couleur, type, canvas, halo, wordmark, signature, primitives)
package.json       exports map (voir plus bas)
.github/workflows/release.yml  -> publication via changesets
README.md · CHANGELOG.md

## Détails techniques
- Tokens DTCG ($value / $type). Source unique, tout le reste est généré.
- Style Dictionary v4 (DTCG) génère option-d.css, tokens.js/.d.ts, préfixe `--od-`.
- Deux thèmes : variables light par défaut sur :root, override dark via
  [data-theme="dark"] ou .od-dark (canvas-dark + surfaces + textes on-dark).
- option-d.css : @font-face Geist/Geist Mono vers ./fonts/*.woff2 ; :root
  variables ; `.od-wordmark` (slash + D magenta) ; `.od-signature` ; `.od-hero`
  (canvas dark + halo) ; primitives portées du bundle (bouton primaire avec états
  active/disabled, input, surfaces card/elevated/soft, hairlines).
- tailwind-preset.js : réexporte tokens en theme.extend (colors, fontFamily,
  fontSize, borderRadius, spacing base 4px).
- package.json exports :
    "." : "./dist/tokens.js" (types ./dist/tokens.d.ts)
    "./css" : "./dist/option-d.css"
    "./tailwind" : "./dist/tailwind-preset.js"
    "./fonts/*" : "./dist/fonts/*"
  + "sideEffects": ["*.css"], "files": ["dist"], "style", script "build".
- Fonts Geist : SIL Open Font License (Vercel), redistribuable. Extrais les woff2
  du base64 du bundle vers dist/fonts/ + fichier de licence. Si l'extraction
  échoue, laisse un README dans dist/fonts/ indiquant où les déposer, n'invente
  rien.
- Versioning : changesets + semver + GitHub Actions (build puis publish npm au
  tag). Version initiale 0.1.0.
- Zéro dépendance runtime ; Style Dictionary et changesets en devDependencies.

## Page catalogue (catalog/index.html)
Page statique important dist/option-d.css : accent + hex, fonts + pangramme,
échelle typo, canvas (light, dark, dark+halo), surfaces, wordmark, signature,
boutons et inputs. Sert de Storybook léger, se déploie sur le CDN à côté du CSS.

## README.md (ton sobre, sans tiret cadratin)
1. Description en une phrase.
2. Installation : npm i option-d-design-system (ou nom scopé).
3. Matrice d'usage, un bloc par cas :
   - HTML via CDN : <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/option-d-design-system/dist/option-d.css">
   - Tailwind : presets: [require('option-d-design-system/tailwind')]
   - JS / TS : import { color, font } from 'option-d-design-system'
   - CSS variables : liste des --od-* et le passage en dark (.od-dark / data-theme)
4. Règles de marque non négociables (slash, /D magenta, halo hero, signature
   David · Digital, pas de bichromie).
5. Faire évoluer : éditer tokens/, npm run build, changeset, publier. Rappelle que
   la charte de référence est le bundle Claude Design et que tokens/ doit rester
   synchronisé avec lui.
6. Lien vers catalog/index.html.

## Tests d'acceptation (lance-les, montre le résultat)
1. npm run build régénère dist/ sans erreur.
2. dist/option-d.css contient --od-color-primary: #FF006E et les @font-face Geist.
3. node -e "import('./dist/tokens.js').then(m=>console.log(m.color.primary))" affiche #FF006E.
4. Le mode dark applique canvas-dark + surfaces + textes on-dark.
5. Ouvrir catalog/index.html montre accent, fonts, canvas, wordmark, signature, primitives.
6. npm pack --dry-run ne contient que dist/ + package.json + README + licence.
7. Récap des écarts éventuels entre le bundle et les tokens listés.

Commence par : (1) un résumé de ce que tu as parsé dans le bundle (tokens + fonts
+ primitives), (2) un plan en 6 points. Puis exécute.
```

---

## Comment m'en servir

1. Déposer `Design System Option D (standalone).html` à la racine du dépôt vide,
   ouvrir dans Claude Code.
2. Coller le prompt. Valider d'abord le résumé de parsing (tokens + fonts +
   primitives), puis laisser construire et vérifier les tests.
3. Créer le compte / scope npm, `npm publish` (ou pousser un tag pour la CI).
4. Vérifier le lien CDN jsDelivr, importer le package dans un projet réel
   (ex. Goallive) comme signal de validation.

Charte de référence vault : [[../../articles/Charte-Graphique|Charte graphique Option/D]].
