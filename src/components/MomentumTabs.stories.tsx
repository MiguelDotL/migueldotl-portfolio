import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Container, Row } from 'react-bootstrap';
import { userEvent, within } from 'storybook/test';
import MomentumTabs from './MomentumTabs';
import '../assets/styles/Projects.css';
import '../assets/styles/MomentumTabs.css';

type StoryArgs = {
    tabs: readonly string[];
    active: string;
    enabled: boolean;
};

const meta: Meta<StoryArgs> = {
    title: 'Components/Composites/MomentumTabs',
    decorators: [
        (Story) => (
            <section
                className="projects"
                style={{ background: 'var(--almost-black)', padding: '4rem 1rem' }}
            >
                <Container>
                    <Row>
                        <Story />
                    </Row>
                </Container>
            </section>
        )
    ],
    parameters: { layout: 'fullscreen', docs: { description: { component: "Animated tab indicator that wraps the active tab with a perimeter trace. Initial wrap animation gates on `enabled` (parent's IntersectionObserver) so it reveals as the user scrolls into view." } } },
    argTypes: {
        tabs: {
            control: { type: 'object' },
            description: 'Tab labels (rendered as `<label> Projects`)'
        },
        active: {
            control: { type: 'text' },
            description: 'Currently active tab — must match one of `tabs`'
        },
        enabled: {
            control: { type: 'boolean' },
            description:
                'When false, holds the initial wrap animation. The live site flips this on intersection-observer.'
        }
    },
    args: {
        tabs: ['Client', 'Featured', 'Personal'],
        active: 'Featured',
        enabled: true
    },
    render: (args) => <StatefulMomentumTabs {...args} />
};

// Wrap in a stateful shell so the active tab updates on click — the
// component requires an `onChange` to re-trigger animations, and a
// pure-args story would re-mount on every interaction.
const StatefulMomentumTabs = ({ tabs, active, enabled }: StoryArgs) => {
    const [current, setCurrent] = useState(active);
    return (
        <MomentumTabs
            tabs={tabs}
            active={current}
            enabled={enabled}
            onChange={(tab) => setCurrent(tab)}
        />
    );
};

export default meta;

type Story = StoryObj<StoryArgs>;

export const Default: Story = {};

export const Playground: Story = {};

export const LongLabels: Story = {
    args: {
        tabs: [
            'Enterprise Engagements',
            'Open Source Contributions',
            'Personal Side Projects'
        ],
        active: 'Open Source Contributions'
    }
};

export const TwoTabs: Story = {
    args: {
        tabs: ['Featured', 'Archive'],
        active: 'Featured'
    }
};

// Drives the full click animation pipeline (retract → slide → expand → wrap)
// in both directions so handleClick covers the cw and ccw branches.
export const ClickedThroughTabs: Story = {
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        // Featured (default) → Personal (cw) → Client (ccw) → Featured (cw)
        await userEvent.click(canvas.getByRole('tab', { name: /Personal/ }));
        await new Promise((r) => setTimeout(r, 850));
        await userEvent.click(canvas.getByRole('tab', { name: /Client/ }));
        await new Promise((r) => setTimeout(r, 850));
        await userEvent.click(canvas.getByRole('tab', { name: /Featured/ }));
        await new Promise((r) => setTimeout(r, 850));
    }
};

// Exercises the keyboard navigation handlers (Arrow keys, Home, End).
export const KeyboardNavigated: Story = {
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const featuredTab = canvas.getByRole('tab', { name: /Featured/ });
        featuredTab.focus();
        await userEvent.keyboard('{ArrowRight}');
        await new Promise((r) => setTimeout(r, 850));
        await userEvent.keyboard('{ArrowLeft}');
        await new Promise((r) => setTimeout(r, 850));
        await userEvent.keyboard('{End}');
        await new Promise((r) => setTimeout(r, 850));
        await userEvent.keyboard('{Home}');
        await new Promise((r) => setTimeout(r, 850));
    }
};
