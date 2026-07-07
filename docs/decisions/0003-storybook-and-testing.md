# 0003 — Storybook et tests unitaires des composants

## Statut

Acceptée (2026-07-06).

## Contexte

Le design system fournit tokens + primitives CSS mais aucun lieu pour visualiser chaque
composant, contrôler ses états, et servir de point d'ajout pour les nouveaux composants.
Besoin exprimé : un Storybook avec controls interactifs, incluant les organismes de marque
(bannières, signatures email, avatars). Le package doit rester agnostique de framework et
sans dépendance runtime.

## Décisions

1. **`@storybook/html-vite`** (Storybook 10) : stories en HTML pur, aucun framework JS
   runtime. Cohérent avec un design system CSS-first.
2. **Controls/docs via le core Storybook 10**, pas `@storybook/addon-essentials` : ce paquet
   est fusionné dans le core depuis Storybook 9 (dernière version 8.6.14, incompatible avec
   Storybook 10). Seul `@storybook/addon-a11y` est ajouté. L'esprit de la spec (controls +
   a11y) est préservé.
3. **Storybook et tests strictement en devDependencies** + dossiers `.storybook/`, `stories/`,
   `test/`. Le package publié reste inchangé (`files:["dist"]`, 19 fichiers, `exports`,
   `version`). Vérifié via `npm pack --dry-run`.
4. **Organismes recréés depuis le HTML rendu** des bundles source (`init/Bannieres|Signatures
   email|Avatars *.html`). Ces bundles génèrent leur markup en JavaScript ; le HTML réel a été
   extrait via navigateur puis reporté dans des builders (`stories/organisms/*.js`) réutilisant
   les variables `--od-*`.
5. **Famille Avatars « Photo » = placeholder silhouette** : aucun asset photo réel ne fait
   partie du design system (les sources référençaient des `blob:` éphémères). Le placeholder
   documente le crop / la forme / l'anneau magenta attendus ; l'implémenteur fournit la photo.
6. **Contrôle `theme` du Hero = no-op documenté** : l'invariant « halo réservé au hero noir »
   prime ; on ne fabrique pas un hero clair qui casserait l'invariant.
7. **Tests unitaires en Vitest + happy-dom** sur les fonctions de rendu / builders (les
   composants génèrent du HTML/SVG en string). Un fichier par composant + `invariants.test.js`.
   happy-dom ne fournit pas de contexte canvas 2D réel : `test/setup.js` installe un faux
   contexte déterministe (les avatars/bannières mesurent le texte au chargement pour centrer
   les glyphes). Les métriques ne sont pas pixel-perfect mais suffisent aux assertions
   structurelles (classes, couleurs, nombre de `<tspan>`, dimensions de viewBox).
8. **Déploiement GitHub Pages** (mode `workflow`, `actions/deploy-pages`), pas Chromatic : un
   site statique suffit et reste gratuit. `.github/workflows/storybook.yml` build et déploie
   sur push `main`.

## Conséquences

- Ajouter un composant = ajouter une story + un test ; la CI (`test.yml`) verrouille les
  invariants de marque à chaque PR.
- Le Storybook vit à côté du package sans jamais alourdir ce qui est publié sur npm.
- Un futur besoin de photos réelles pour les avatars nécessitera de remplacer le placeholder.

## Références

- Spec : `docs/superpowers/specs/2026-07-06-storybook-design.md`
- Storybook 9+ : addon-essentials fusionné dans le core.
