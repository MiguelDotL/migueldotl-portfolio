import type { Meta, StoryObj } from '@storybook/react-vite';
import NpmPlainIcon from './NpmPlainIcon';
import '../assets/styles/Projects.css';

type StoryArgs = {
    size: number;
    color: string;
};

const meta: Meta<StoryArgs> = {
    title: 'Components/NpmPlainIcon',
    component: NpmPlainIcon,
    decorators: [
        (Story) => (
            <div
                style={{
                    background: 'var(--almost-black)',
                    padding: '3rem',
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '160px'
                }}
            >
                <Story />
            </div>
        )
    ],
    parameters: { layout: 'fullscreen' },
    argTypes: {
        size: {
            control: { type: 'range', min: 8, max: 128, step: 1 },
            description: 'Icon width/height in pixels'
        },
        color: {
            control: { type: 'color' },
            description: 'Renders via fill=currentColor — sets the wrapper color'
        }
    },
    args: {
        size: 16,
        color: '#ffffff'
    },
    render: (args) => (
        <span style={{ color: args.color, display: 'inline-flex' }}>
            <NpmPlainIcon size={args.size} />
        </span>
    )
};

export default meta;

type Story = StoryObj<StoryArgs>;

// Default size + color matches how Projects.tsx uses it inside Branch
// Beacon's npm action chips (16px, white text on a dark button).
export const Default: Story = {};

// Renders inside a mocked button chip the same way Projects.tsx places
// it inside `.featured-project-action-icon` next to the action label.
export const InActionChip: Story = {
    render: () => (
        <a
            href="#"
            className="btn btn-outline-secondary"
            onClick={(e) => e.preventDefault()}
            style={{ pointerEvents: 'none' }}
        >
            <span className="featured-project-action-icon">
                <NpmPlainIcon />
            </span>
            React
        </a>
    )
};

// Larger size for situations like a detail page or hero callout.
export const Large: Story = {
    args: { size: 96 }
};

// Inherits accent color via currentColor.
export const Accent: Story = {
    args: { color: '#AA367C' }
};
