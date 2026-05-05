// PurgeCSS strips unused selectors from the production CSS bundle.
// Only runs on prod builds; dev keeps full CSS so all classes work.
//
// Safelist covers dynamic classes that PurgeCSS can't see in the source:
// - animate__* applied conditionally via inView
// - devicon-* per-skill icon classes built from data
// - is-active / is-* / has-* state modifiers toggled by handlers
// - react-multi-carousel internals
// - [aria-*] attribute selectors (aria-invalid in ContactForm, aria-hidden in
//   Skills carousel). NOT data-* — those over-pull bootstrap's
//   [data-bs-popper] etc. that we don't use.

import purgeCssPkg from '@fullhuman/postcss-purgecss';
import postcssFontDisplay from 'postcss-font-display';
const purgeCSSPlugin = purgeCssPkg.purgeCSSPlugin || purgeCssPkg.default || purgeCssPkg;

export default {
    plugins:
        process.env.NODE_ENV === 'production'
            ? [
                  purgeCSSPlugin({
                      content: [
                          './index.html',
                          './src/**/*.{ts,tsx,js,jsx}'
                      ],
                      safelist: {
                          standard: [
                              /^animate_/,
                              /^devicon-/,
                              /^is-/,
                              /^has-/,
                              /^react-multi-carousel/,
                              // Note inconsistent library naming: most classes
                              // are `react-multi-carousel-*` (singular) but the
                              // arrows are `react-multiple-carousel__arrow*`
                              // (plural). Both prefixes need to be safelisted.
                              /^react-multiple-carousel/,
                              /^col-/,
                              /^row/,
                              /^container/,
                              /^navbar/,
                              /^nav-/,
                              /^show$/,
                              /^collapsing$/,
                              /^collapse$/
                          ],
                          greedy: [/\[aria-/]
                      },
                      // Bootstrap classes whose names match unrelated prose
                      // substrings ("segmented-progress" pulls .progress,
                      // descriptions like "carousel of devicons" pull .carousel).
                      // None of these components are used in the app.
                  }),
                  // Force font-display: swap on every @font-face — overrides
                  // devicon's font-display: block to eliminate FOIT in the
                  // Skills section. replace: true rewrites existing values.
                  postcssFontDisplay({ display: 'swap', replace: true })
              ]
            : []
};
