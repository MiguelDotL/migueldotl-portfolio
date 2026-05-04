import type { Meta, StoryObj } from '@storybook/react-vite';

/* Story-only catalogue of the tagline badge — the gradient-bg pill that
   appears above the headline in the hero ("Welcome to my Portfolio").
   `.hero .content .tagline` is the live selector chain, but the styles
   are inlined here to avoid pulling in the `.hero` cosmic background.
   Backlog issue #106 tracks promoting this into a reusable component. */

const meta: Meta = {
    title: 'Components/Primitives/TaglineBadge',
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component:
                    "The gradient-tinted pill above the hero headline. Uses the brand pink→purple gradient at 50% alpha with a subtle white border."
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

const taglineStyle: React.CSSProperties = {
    display: 'inline-block',
    background:
        'linear-gradient(90.21deg, rgba(170, 54, 124, 0.5) -5.91%, rgba(74, 47, 189, 0.5) 111.58%)',
    border: '1px solid rgba(255, 255, 255, 0.5)',
    fontSize: 16,
    fontWeight: 700,
    letterSpacing: '0.8px',
    padding: '8px 10px',
    color: 'var(--font-color)',
    transition: 'all 0.3s ease-in-out'
};

export const Default: Story = {
    render: () => <span style={taglineStyle}>Welcome to my Portfolio</span>,
    parameters: {
        docs: {
            description: {
                story:
                    "Live tagline string. Inline-block with brand-gradient bg at 50% alpha, white-50 border, bold uppercase-feeling type."
            }
        }
    }
};

export const ShortLabel: Story = {
    render: () => <span style={taglineStyle}>Senior Frontend</span>,
    parameters: {
        docs: {
            description: {
                story:
                    "Shorter copy — confirms the badge sizes to its content rather than stretching."
            }
        }
    }
};

export const LongLabel: Story = {
    render: () => (
        <span style={taglineStyle}>
            Senior Frontend Engineer · Open to remote roles
        </span>
    ),
    parameters: {
        docs: {
            description: {
                story:
                    "Longer copy — single-line by default; would wrap if forced inside a constrained column."
            }
        }
    }
};
