# Changelog

Toutes les modifications notables de ce projet sont documentées ici.

Format basé sur [Keep a Changelog](https://keepachangelog.com/), versioning [SemVer](https://semver.org/).

## [Non publié]

## [0.1.0] - 2026-07-06

Première version publiée sur npm : https://www.npmjs.com/package/option-d-design-system
CDN : https://cdn.jsdelivr.net/npm/option-d-design-system/dist/option-d.css

### Ajouté
- Package `option-d-design-system@0.1.0` complet : tokens DTCG, build Style Dictionary v4,
  `dist/option-d.css` + `tokens.js`/`tokens.d.ts` + preset Tailwind, fonts Geist self-hosted,
  primitives de marque, catalog statique, changesets + workflow de release npm.
  Voir `docs/decisions/0001-design-system-package-architecture.md`.

### CI / publication
- Publication npm en **Trusted Publishing (OIDC)**, sans secret long-lived. La v0.1.0 initiale
  a été publiée avec un token bypass 2FA temporaire (contrainte npm : le premier publish ne peut
  pas utiliser l'OIDC), puis le workflow a basculé en OIDC et le token a été révoqué.
  Voir `docs/decisions/0002-npm-trusted-publishing.md`.
