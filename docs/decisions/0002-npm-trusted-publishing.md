# 0002 — Publication npm en Trusted Publishing (OIDC)

## Statut

Acceptée (2026-07-06).

## Contexte

Le package `option-d-design-system` est publié sur npm depuis GitHub Actions
(`.github/workflows/release.yml`). Le compte npm applique une politique 2FA qui refuse
la publication par OTP interactif et par token classique non-bypass. Le workflow initial
reposait sur un secret `NPM_TOKEN`, ce qui a soulevé deux problèmes :

1. **Sécurité** : un token npm long-lived stocké en secret CI est un risque d'exfiltration
   (une revue a signalé un élargissement de scope quand le token était exposé au niveau job,
   donc à `npm ci`/`npm run build`).
2. **Friction** : seul un Granular Access Token avec « Bypass Two-Factor Authentication »
   permettait la publication — option que npm déconseille explicitement pour la CI.

npm recommande le **Trusted Publishing (OIDC)** : GitHub Actions présente un token OIDC
court-lived que npm échange contre un droit de publication, sans secret stocké.

## Décisions

1. **Trusted Publishing (OIDC) comme mécanisme de publication.** Le workflow déclare
   `permissions: id-token: write` ; `npm` (≥ 11.5.1, forcé via `npm install -g npm@latest`
   sur Node 22) détecte le contexte GitHub Actions autorisé et obtient un token court-lived.
   Un Trusted Publisher est configuré côté npm (repo `Kaynshin/optiond-design-system`,
   workflow `release.yml`).
2. **Suppression du secret `NPM_TOKEN`.** Plus aucun token long-lived n'est stocké dans le
   repo. Le secret a été supprimé après bascule.
3. **Premier publish par token bypass temporaire.** Contrainte npm documentée : le premier
   publish d'un package inexistant ne peut pas utiliser l'OIDC (la configuration d'un Trusted
   Publisher exige que le package existe déjà — chicken-and-egg, cf. npm/cli #8544). La v0.1.0
   a donc été publiée avec un Granular Access Token bypass 2FA, **révoqué immédiatement après**.
   Toutes les versions suivantes passent par l'OIDC.
4. **`repository.url` en `git+https://…`** dans `package.json` : requis pour que npm relie le
   package au repo GitHub attendu par le Trusted Publisher.

## Conséquences

- Aucune rotation de token à gérer, aucun secret à fuiter.
- Toute release future : `npx changeset` → bump → push `main` → publish OIDC automatique.
- Un futur package neuf du même type héritera de la même contrainte de premier publish
  (token bypass temporaire puis bascule OIDC).

## Références

- npm/cli #8544 — publier la version initiale avec OIDC (limitation)
- GitHub Changelog — npm trusted publishing with OIDC is generally available (2025-07-31)
