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
      test: "error"
    },

    options: {
      // Welcome → Showcase (portfolio narrative) → Components (building blocks)
      // → Foundations (CSS utilities under the components) → Design Iterations
      // (design-process artifacts). Within Foundations, Overview docs first
      // then sub-categories in reading order. Other levels sort alphabetically.
      storySort: {
        order: [
          'Welcome',
          'Showcase', ['Sections'],
          'Components', ['Composites', 'Primitives', 'Skeletons'],
          'Foundations', ['Overview', 'Motion', 'Hover', 'Material'],
          'Design Iterations'
        ]
      }
    }
  },
};

export default preview;