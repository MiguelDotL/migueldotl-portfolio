// PurgeCSS strips unused selectors from the production CSS bundle.
// Only runs on prod builds; dev keeps full CSS so all classes work.
//
// Safelist covers dynamic classes that PurgeCSS can't see in the source:
// - animate__* applied conditionally via inView
// - devicon-* per-skill icon classes built from data
// - is-active / is-* / has-* state modifiers toggled by handlers
// - react-multi-carousel internals
// - aria-invalid="true" attribute selector targets

import purgeCssPkg from '@fullhuman/postcss-purgecss';
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
                              /^col-/,
                              /^row/,
                              /^container/,
                              /^navbar/,
                              /^nav-/,
                              /^show$/,
                              /^collapsing$/,
                              /^collapse$/
                          ],
                          deep: [/^modal/, /^dropdown/, /^tooltip/, /^popover/],
                          greedy: [/aria-/, /data-/]
                      }
                  })
              ]
            : []
};
