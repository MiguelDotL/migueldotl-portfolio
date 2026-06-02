# Miguel Lozano — Portfolio

> _[TODO: Miguel — one-line tagline / personal voice. Example: "Front-end engineer building thoughtful, accessible web experiences."]_

**Live site:** [migueldotl.github.io](https://migueldotl.github.io)

---

## About

_[TODO: Miguel — short paragraph in your own voice: who you are, what you build, what you care about. This is the first thing recruiters read after the live site, so it should feel like you, not me.]_

## Tech stack

- **Framework:** React 18
- **Styling:** Bootstrap 5 + custom CSS
- **Build:** [Vite](https://vitejs.dev/) + `@vitejs/plugin-react`
- **Hosting:** GitHub Pages (built artifact pushed to [`migueldotl.github.io`](https://github.com/MiguelDotL/migueldotl.github.io))

## Local development

```bash
git clone https://github.com/MiguelDotL/migueldotl-portfolio.git
cd migueldotl-portfolio
npm install
npm run dev
```

App runs at [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
```

Outputs to `dist/`.

## Deploy

The site deploys to [migueldotl.github.io](https://migueldotl.github.io) from a separate repo (`MiguelDotL/migueldotl.github.io`). Builds run locally — there is no CI.

**Manual deploy:**

```bash
npm run deploy
```

This builds the site and Storybook, merges them under `dist/`, and pushes `dist/` to the deploy repo via `gh-pages`.

**Auto-deploy on push to `main`:** the Husky `pre-push` hook runs the quality gate (lint + type check + unit tests) on every push, then runs `npm run deploy` automatically when the pushed ref is `main`. Feature-branch pushes run the gate only. Use `git push --no-verify` to skip the hook entirely.

## Project structure

```
src/
├── components/    # React components (NavBar, Hero, Projects, Skills, ContactForm, ...)
├── apis/          # External API clients (form backend)
├── assets/
│   ├── images/    # Project screenshots, icons, backgrounds
│   ├── fonts/     # Custom fonts
│   └── styles/    # Component-specific CSS
└── index.jsx      # Entry point
```

## Credits

- Hero background image: [Freepik](https://www.freepik.com/free-vector/gradient-galaxy-background_14212522.htm)
- Skill and tooling icons: [DevIcons](https://devicon.dev/)
- Social and educational icons: [SVG Repo](https://www.svgrepo.com/)

## License

[MIT](./LICENSE) © 2026 Miguel Lozano
