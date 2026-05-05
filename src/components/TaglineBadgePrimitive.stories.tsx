import type { Meta, StoryObj } from '@storybook/react-vite';
import TaglineBadge from './TaglineBadge';
import '../assets/styles/Hero.css';

/* The gradient-tinted pill above the hero headline. Live selector chain
   is `.hero .content .tagline` so each story wraps in that ancestor
   chain to pull the production styling. */

const meta: Meta<typeof TaglineBadge> = {
    title: 'Components/Primitives/TaglineBadge',
    component: TaglineBadge,
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
            <section
                className="hero"
                style={{
                    background: 'var(--almost-black)',
                    padding: '3rem',
                    minWidth: 360
                }}
            >
                <div className="content">
                    <Story />
                </div>
            </section>
        )
    ]
};
export default meta;

type Story = StoryObj<typeof TaglineBadge>;

export const Default: Story = {
    args: { children: 'Welcome to my Portfolio' }
};

export const ShortLabel: Story = {
    args: { children: 'Senior Frontend' }
};

export const LongLabel: Story = {
    args: { children: 'Senior Frontend Engineer · Open to remote roles' }
};
