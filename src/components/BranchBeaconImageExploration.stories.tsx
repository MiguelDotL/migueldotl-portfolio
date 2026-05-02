import type { Meta, StoryObj } from '@storybook/react-vite';
import { Container, Row } from 'react-bootstrap';
import FeaturedProjectCard from './FeaturedProjectCard';
import HoverZoomPan from './HoverZoomPan';
import '../assets/styles/Projects.css';

import branchBeaconImg from '../assets/images/projects/branch-beacon.png';

type StoryArgs = {
    /** Total scale percent on hover. 100 = no change, 163 = 63% bigger. */
    zoomPercent: number;
    transitionMs: number;
};

const meta: Meta<StoryArgs> = {
    title: 'Process/BranchBeaconImage',
    decorators: [
        (Story) => (
            <section
                className="projects"
                style={{ background: 'var(--almost-black)', padding: '3rem 1rem' }}
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
        zoomPercent: {
            control: { type: 'range', min: 100, max: 200, step: 1 },
            description: 'Total scale on hover, as a %. 100 = no change.'
        },
        transitionMs: {
            control: { type: 'number', min: 100, max: 1200, step: 1 },
            description: 'Transition duration for zoom in/out'
        }
    },
    args: {
        zoomPercent: 163,
        transitionMs: 693
    },
    render: (args) => (
        <FeaturedProjectCard
            title="Branch Beacon"
            subtitle="npm package"
            description="Open-source library for surfacing git branch state inside browser-based dev workflows. Built inline in Pattern Archive, re-implemented in Voicepool, then extracted as a reusable npm package — born from a duplication signal."
            techStack={['TypeScript', 'React', 'Vite', 'npm']}
            imageSlot={
                <HoverZoomPan
                    src={branchBeaconImg}
                    alt="Branch Beacon"
                    zoomScale={args.zoomPercent / 100}
                    transitionMs={args.transitionMs}
                />
            }
            actions={[
                {
                    label: 'React',
                    url: 'https://www.npmjs.com/package/branch-beacon'
                },
                {
                    label: 'Web Component',
                    url: 'https://www.npmjs.com/package/branch-beacon-element'
                },
                {
                    label: 'Repo',
                    url: 'https://github.com/MiguelDotL/branch-beacon'
                }
            ]}
        />
    )
};

export default meta;

type Story = StoryObj<StoryArgs>;

export const Playground: Story = {};

export const SubtleZoom: Story = {
    args: { zoomPercent: 103, transitionMs: 693 }
};

export const StrongerZoom: Story = {
    args: { zoomPercent: 200, transitionMs: 693 }
};

export const SlowTransition: Story = {
    args: { zoomPercent: 163, transitionMs: 1100 }
};
