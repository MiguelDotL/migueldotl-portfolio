# migueldotl-portfolio — Claude context

## HARD RULE: NO GITHUB ACTIONS — EVER

Miguel's GitHub account is billing-locked. Actions jobs fail at startup. Do not create `.github/workflows/`, do not propose Actions, do not propose any hosted CI. The local build pipeline is the deliberate, permanent replacement.

## Two-repo deploy model

| Repo | Branch | Purpose |
|------|--------|---------|
| `MiguelDotL/migueldotl-portfolio` | `main` | Source code (this repo) |
| `MiguelDotL/migueldotl.github.io` | `main` | Built output — GitHub Pages serves it at https://migueldotl.github.io |

Pages is configured to deploy from branch `main` on the deploy repo. No custom domain.

## Deploy flow

### Manual deploy
```
npm run deploy
```
`predeploy` runs automatically first:
1. `vite build` → `dist/`
2. `npm run build-storybook:public` — builds Storybook with `base=/storybook/` (set in `.storybook/main.js` via `STORYBOOK_PUBLIC_DEPLOY=1`)
3. Copies `storybook-static/` → `dist/storybook/`
4. `touch dist/.nojekyll`

Then `deploy` runs `gh-pages -d dist --dotfiles -b main -r git@github.com:MiguelDotL/migueldotl.github.io.git` (`gh-pages ^6.3.0` is a devDependency).

### Auto-deploy on `git push` to `main`
The `.husky/pre-push` hook runs on every push:
- **Always:** quality gate — `npm run lint && npx tsc --noEmit && npx vitest run --project unit`. Push is aborted if any step fails.
- **Only when pushing `main`:** runs `npm run deploy` after the gate passes.
- Feature-branch pushes trigger the gate only — no deploy.
- `git push --no-verify` skips the hook entirely (gate + deploy both skipped).

## Environment variables

Contact form uses Web3Forms. Keys are inlined by Vite at build time from `.env` (gitignored):
- `VITE_FORM_ENDPOINT`
- `VITE_FORM_ACCESS_KEY`

Anyone setting up the repo locally needs these to make the contact form functional.

## Node version

Pinned to Node 24 via `.nvmrc`. Run `nvm use` before installing or building.

## Key scripts

| Script | What it does |
|--------|-------------|
| `npm run dev` | Local dev server (Vite) |
| `npm run build` | Vite build only → `dist/` |
| `npm run deploy` | Full build (site + Storybook) + publish to deploy repo |
| `npm run lint` | ESLint |
| `npm run test` | Vitest (all projects) |
| `npm run storybook` | Local Storybook dev server on :6006 |
| `npm run e2e` | Playwright end-to-end (currently paused — don't add new tests unprompted) |

## Architecture notes

- No single-repo consolidation — keeping source and deploy repos separate is deliberate (no payoff without Actions available).
- Storybook is published to `https://migueldotl.github.io/storybook/` as part of every deploy.
- Playwright config exists but is paused (cost/noise). Leave existing config alone; don't add new Playwright tests unprompted.
