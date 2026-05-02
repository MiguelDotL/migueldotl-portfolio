import type { Meta, StoryObj } from '@storybook/react-vite';
import '../assets/styles/Projects.css';

/* Story-only catalogue of the tech-stack chip used in
   FeaturedProjectCard. Selector chain is `.featured-project-stack li`,
   so each story renders a `<ul class="featured-project-stack">` parent
   with one or more `<li>` items. Backlog issue #106 tracks promoting
   this into a reusable component. */

const meta: Meta = {
    title: 'Components/Primitives/TechStackChip',
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component:
                    "Pill chip used to label tech stack items on FeaturedProjectCard (e.g. \"React\", \"TypeScript\", \"Vite\"). Plain text inside an `<li>` — no link, no interaction."
            }
        }
    },
    decorators: [
        (Story) => (
            <div
                style={{
                    background: 'var(--almost-black)',
                    padding: '3rem',
                    minWidth: 360
                }}
            >
                <Story />
            </div>
        )
    ]
};
export default meta;

type Story = StoryObj;

export const SingleChip: Story = {
    render: () => (
        <ul className="featured-project-stack">
            <li>React</li>
        </ul>
    ),
    parameters: {
        docs: {
            description: {
                story:
                    "One chip in isolation. Light-grey text, semi-transparent rim, fully-rounded corners."
            }
        }
    }
};

export const MultipleChips: Story = {
    render: () => (
        <ul className="featured-project-stack">
            <li>React</li>
            <li>TypeScript</li>
            <li>Vite</li>
            <li>Storybook</li>
            <li>Bootstrap</li>
        </ul>
    ),
    parameters: {
        docs: {
            description: {
                story:
                    "How the chips look in production — flex-wrap row with `0.5em` gap. Mirrors the layout on FeaturedProjectCard."
            }
        }
    }
};

export const LongLabels: Story = {
    render: () => (
        <ul
            className="featured-project-stack"
            style={{ maxWidth: 360 }}
        >
            <li>React 19</li>
            <li>react-bootstrap 2.x</li>
            <li>Vite + Rolldown</li>
            <li>Storybook 10</li>
            <li>Chromatic</li>
            <li>Playwright</li>
            <li>vitest</li>
            <li>ESLint flat config</li>
        </ul>
    ),
    parameters: {
        docs: {
            description: {
                story:
                    "Wrap behavior — when there are too many chips for one row they break to the next without disrupting alignment."
            }
        }
    }
};
