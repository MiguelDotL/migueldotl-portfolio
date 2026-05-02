import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Container, Row } from 'react-bootstrap';
import MomentumTabs from './MomentumTabs';
import '../assets/styles/Projects.css';
import '../assets/styles/MomentumTabs.css';

type StoryArgs = {
    tabs: readonly string[];
    active: string;
    enabled: boolean;
};

const meta: Meta<StoryArgs> = {
    title: 'Components/MomentumTabs',
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
    parameters: { layout: 'fullscreen' },
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
