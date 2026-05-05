import 'bootstrap/dist/css/bootstrap.min.css';
import '../src/index.css';

/** @type { import('@storybook/react-vite').Preview } */
const preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: "error",
      // Hide axe-core "Inconclusive" results from the panel. They surface
      // when axe can't determine an outcome (e.g., color-contrast through
      // layered alpha + ancestor pseudo overlays in the hero) — by
      // definition non-actionable. Real Violations still surface normally.
      options: {
        resultTypes: ["violations"]
      }
    },

    options: {
      // Showcase first (the portfolio narrative), Components second (the
      // building blocks), Design Iterations last (the design-process artifacts).
      // Within each top-level bucket, sub-buckets and stories sort alphabetically.
      storySort: {
        order: [
          'Showcase', ['Sections'],
          'Components', ['Composites', 'Primitives', 'Skeletons'],
          'Design Iterations'
        ]
      }
    }
  },
};

export default preview;