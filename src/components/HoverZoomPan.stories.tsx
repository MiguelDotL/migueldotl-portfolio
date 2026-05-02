import type { Meta, StoryObj } from '@storybook/react-vite';
import { Container, Row } from 'react-bootstrap';
import HoverZoomPan from './HoverZoomPan';
import '../assets/styles/Projects.css';

import branchBeaconImg from '../assets/images/projects/branch-beacon.png';

type StoryArgs = {
    src: string;
    alt: string;
    zoomScale: number;
    transitionMs: number;
};

const meta: Meta<StoryArgs> = {
    title: 'Components/Composites/HoverZoomPan',
    decorators: [
        (Story) => (
            <section
                className="projects"
                style={{ background: 'var(--almost-black)', padding: '3rem 1rem' }}
            >
                <Container>
                    <Row>
                        <div
                            className="featured-project-image"
                            style={{ aspectRatio: '16 / 9', maxWidth: '720px' }}
                        >
                            <Story />
                        </div>
                    </Row>
                </Container>
            </section>
        )
    ],
    parameters: { layout: 'fullscreen' },
    argTypes: {
        src: { table: { disable: true } },
        alt: { control: { type: 'text' } },
        zoomScale: {
            control: { type: 'range', min: 1, max: 2.5, step: 0.05 },
            description:
                'Hover zoom multiplier. 1 = no zoom; 2.5 = 250% scale.'
        },
        transitionMs: {
            control: { type: 'range', min: 100, max: 1500, step: 10 },
            description: 'Zoom-in / zoom-out transition duration in ms'
        }
    },
    args: {
        src: branchBeaconImg,
        alt: 'Branch Beacon screenshot',
        zoomScale: 1.63,
        transitionMs: 963
    },
    render: (args) => (
        <HoverZoomPan
            src={args.src}
            alt={args.alt}
            zoomScale={args.zoomScale}
            transitionMs={args.transitionMs}
        />
    )
};

export default meta;

type Story = StoryObj<StoryArgs>;

export const Default: Story = {};

export const Playground: Story = {};

export const SubtleZoom: Story = {
    args: { zoomScale: 1.06 }
};

export const StrongerZoom: Story = {
    args: { zoomScale: 2.25 }
};
