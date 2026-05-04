import type { Meta, StoryObj } from '@storybook/react-vite';
import TechStackList from './TechStackList';
import '../assets/styles/Projects.css';

/* Pill-chip list rendered under each FeaturedProjectCard. Live selector
   chain is `.featured-project-stack li`. */

const meta: Meta<typeof TechStackList> = {
    title: 'Components/Primitives/TechStackChip',
    component: TechStackList,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component:
                    "Pill chips labelling a project's tech stack on FeaturedProjectCard. Plain text inside `<li>` — no link, no interaction."
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

type Story = StoryObj<typeof TechStackList>;

export const SingleChip: Story = {
    args: { stack: ['React'] }
};

export const MultipleChips: Story = {
    args: { stack: ['React', 'TypeScript', 'Vite', 'Storybook', 'Bootstrap'] }
};

export const LongLabels: Story = {
    args: {
        stack: [
            'React 19',
            'react-bootstrap 2.x',
            'Vite + Rolldown',
            'Storybook 10',
            'Chromatic',
            'Playwright',
            'vitest',
            'ESLint flat config'
        ]
    },
    decorators: [(Story) => <div style={{ maxWidth: 360 }}><Story /></div>]
};
