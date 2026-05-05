/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import { playwright } from '@vitest/browser-playwright';
const dirname = typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

// Inject a <link rel="preload"> for the Hero's LCP image into the built
// HTML so the browser can fetch it in parallel with the JS bundle instead
// of waiting for React to discover it. The asset filename is hashed by
// Vite at build time, so we look it up in the bundle map.
const preloadLcpImage = () => {
  let base = '/';
  return {
    name: 'preload-lcp-image',
    apply: 'build',
    configResolved(resolved) {
      base = resolved.base || '/';
    },
    transformIndexHtml: {
      order: 'post',
      handler(_html, ctx) {
        if (!ctx.bundle) return;
        const key = Object.keys(ctx.bundle).find(
          (k) => k.includes('bitmoji-space-planet-2') && k.endsWith('.webp')
        );
        if (!key) return;
        return [
          {
            tag: 'link',
            attrs: {
              rel: 'preload',
              as: 'image',
              type: 'image/webp',
              href: `${base}${key}`,
              fetchpriority: 'high'
            },
            injectTo: 'head'
          }
        ];
      }
    }
  };
};

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  plugins: [react(), preloadLcpImage()],
  base: "/",
  server: {
    port: 3000,
    open: false
  },
  build: {
    outDir: "dist",
    sourcemap: true
  },
  test: {
    projects: [{
      extends: true,
      test: {
        name: 'unit',
        globals: true,
        environment: "jsdom",
        setupFiles: "./src/setupTests.ts",
        css: false,
        include: ['src/**/*.{test,spec}.{ts,tsx,js,jsx}']
      }
    }, {
      extends: true,
      plugins: [
      // The plugin will run tests for the stories defined in your Storybook config
      // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
      storybookTest({
        configDir: path.join(dirname, '.storybook')
      })],
      test: {
        name: 'storybook',
        browser: {
          enabled: true,
          headless: true,
          provider: playwright({}),
          instances: [{
            browser: 'chromium'
          }]
        }
      }
    }]
  }
});