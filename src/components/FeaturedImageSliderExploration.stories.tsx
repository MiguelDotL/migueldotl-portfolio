import type { Meta, StoryObj } from '@storybook/react-vite';
import { Container, Row } from 'react-bootstrap';
import FeaturedProjectCard from './FeaturedProjectCard';
import FeaturedImageSlider from './FeaturedImageSlider';
import '../assets/styles/Projects.css';

import bcbsMain from '../assets/images/projects/bcbs-main.png';
import bcbsLitehouse from '../assets/images/projects/bcbs-litehouse.png';
import bcbsProviders from '../assets/images/projects/bcbs-providers.png';

const slides = [
    { src: bcbsMain, alt: 'BCBS NC homepage' },
    { src: bcbsLitehouse, alt: 'BCBS NC vision plan page' },
    { src: bcbsProviders, alt: 'BCBS NC providers page' }
];

type StoryArgs = {
    indicator: 'frosted-dots' | 'counter' | 'segmented-progress' | 'outlined-dots';
    controls: ('arrows' | 'click-image' | 'keyboard' | 'swipe')[];
    intervalMs: number;
};

const meta: Meta<StoryArgs> = {
    title: 'Process/FeaturedImageSlider',
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
        indicator: {
            control: { type: 'radio' },
            options: [
                'frosted-dots',
                'counter',
                'segmented-progress',
                'outlined-dots'
            ],
            description: 'Visual variant for the active-slide indicator'
        },
        controls: {
            control: { type: 'check' },
            options: ['arrows', 'click-image', 'keyboard', 'swipe'],
            description:
                'Interaction methods (multiselect). Auto-advance + hover-pause are always on.'
        },
        intervalMs: {
            control: { type: 'number', min: 1500, max: 12000, step: 500 },
            description: 'Auto-advance interval'
        }
    },
    args: {
        indicator: 'frosted-dots',
        controls: [],
        intervalMs: 3690
    },
    render: (args) => (
        <FeaturedProjectCard
            title="BCBS NC — LiteHouse"
            subtitle="Component library"
            description="Reusable component library standardizing UI and expediting development across internal products in Blue Cross Blue Shield of North Carolina's ecosystem."
            techStack={['Lit', 'Web Components', 'TypeScript', 'Storybook']}
            imageSlot={
                <FeaturedImageSlider
                    images={slides}
                    indicator={args.indicator}
                    controls={args.controls}
                    intervalMs={args.intervalMs}
                />
            }
            actions={[
                {
                    label: 'See Library in Use',
                    url: 'https://www.bluecrossnc.com/members/vision'
                }
            ]}
        />
    )
};

export default meta;

type Story = StoryObj<StoryArgs>;

export const Playground: Story = {};

export const FrostedDots: Story = {
    args: { indicator: 'frosted-dots' }
};

export const SegmentedProgress: Story = {
    args: { indicator: 'segmented-progress' }
};

export const NumericCounter: Story = {
    args: { indicator: 'counter' }
};

export const OutlinedDots: Story = {
    args: { indicator: 'outlined-dots' }
};

export const AllControlsOn: Story = {
    args: {
        indicator: 'frosted-dots',
        controls: ['arrows', 'click-image', 'keyboard', 'swipe']
    }
};
