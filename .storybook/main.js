

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
  viteFinal: async (config) => {
    config.define = {
      ...config.define,
      'import.meta.env.VITE_MOCK_FORM': JSON.stringify('')
    };
    return config;
  }
};
export default config;
