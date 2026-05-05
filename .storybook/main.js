

/** @type { import('@storybook/react-vite').StorybookConfig } */
const config = {
  "stories": [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    "@chromatic-com/storybook",
    "@storybook/addon-vitest",
    "@storybook/addon-a11y",
    "@storybook/addon-docs"
  ],
  "framework": "@storybook/react-vite",
  /* Force VITE_MOCK_FORM to empty inside Storybook builds. The app's
     ContactForm checks this env var BEFORE reaching axios.post, so any
     non-empty value (e.g. our local "throw" used for live-site error-UI
     testing) bypasses the per-story axios mocks and forces every state
     story into the error path. */
  viteFinal: async (config, { configType }) => {
    config.define = {
      ...config.define,
      'import.meta.env.VITE_MOCK_FORM': JSON.stringify('')
    };
    /* Set base path only when building for the public migueldotl.github.io/storybook
       subroute. Chromatic serves from its own URL prefix and the local dev server
       runs at root, so default stays "/". Opt in via STORYBOOK_PUBLIC_DEPLOY=1. */
    if (configType === 'PRODUCTION' && process.env.STORYBOOK_PUBLIC_DEPLOY === '1') {
      config.base = '/storybook/';
    }
    return config;
  }
};
export default config;
