import type { Meta, StoryObj } from '@storybook/react-vite';
import { Container, Row } from 'react-bootstrap';
import FeaturedProjectCard from './FeaturedProjectCard';
import NpmPlainIcon from './NpmPlainIcon';
import '../assets/styles/Projects.css';

import branchBeaconImg from '../assets/images/projects/branch-beacon.png';
import bcbsMain from '../assets/images/projects/bcbs-main.png';

const placeholderBranchBeacon = branchBeaconImg;
const placeholderBcbs = bcbsMain;

const meta: Meta<typeof FeaturedProjectCard> = {
    title: 'Components/Composites/FeaturedProjectCard',
    component: FeaturedProjectCard,
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
        title: {
            control: { type: 'text' },
            description: 'Project name shown as heading'
        },
        subtitle: {
            control: { type: 'text' },
            description: 'Optional eyebrow above title'
        },
        description: {
            control: { type: 'text' },
            description: 'Project body copy'
        },
        techStack: {
            control: { type: 'object' },
            description: 'Tech tags listed under description'
        },
        imageURL: {
            control: { type: 'text' },
            description: 'Image src; ignored when imageSlot is provided'
        },
        imageSlot: {
            control: false,
            description: 'Custom image node; takes precedence over imageURL'
        },
        actions: {
            control: { type: 'object' },
            description: 'Link/action buttons rendered below body'
        }
    }
};

export default meta;

type Story = StoryObj<typeof FeaturedProjectCard>;

export const BranchBeacon: Story = {
    args: {
        title: 'branch-beacon',
        subtitle: 'First npm package',
        description:
            "Open-source library for surfacing git branch state inside browser-based dev workflows — where Claude-driven coding happens without terminal visibility. Born from a duplication signal: built inline in Pattern Archive, re-implemented in Voicepool, then extracted as a reusable package.",
        techStack: ['TypeScript', 'React', 'Vite', 'npm'],
        imageURL: placeholderBranchBeacon,
        actions: [
            {
                label: 'React',
                url: 'https://www.npmjs.com/package/branch-beacon',
                icon: <NpmPlainIcon />
            },
            {
                label: 'Web Component',
                url: 'https://www.npmjs.com/package/branch-beacon-element',
                icon: <NpmPlainIcon />
            },
            {
                label: 'Repo',
                url: 'https://github.com/MiguelDotL/branch-beacon',
                icon: <i className="devicon-github-original" aria-hidden />
            }
        ]
    }
};

export const BcbsNc: Story = {
    name: 'BCBS NC',
    args: {
        title: 'BCBS NC — LiteHouse',
        subtitle: 'Enterprise client',
        description:
            '[Placeholder copy] Enterprise health insurance platform for Blue Cross Blue Shield of North Carolina. Role, scope, and contribution to be filled in once Miguel provides details.',
        techStack: ['React', 'TypeScript', 'Enterprise'],
        imageURL: placeholderBcbs,
        actions: [
            { label: 'See Library in Use', url: '#' }
        ]
    }
};

export const BothFeatured: Story = {
    render: () => (
        <>
            <FeaturedProjectCard
                title="branch-beacon"
                subtitle="First npm package"
                description="Open-source library for surfacing git branch state inside browser-based dev workflows — where Claude-driven coding happens without terminal visibility. Born from a duplication signal: built inline in Pattern Archive, re-implemented in Voicepool, then extracted as a reusable package."
                techStack={['TypeScript', 'React', 'Vite', 'npm']}
                imageURL={placeholderBranchBeacon}
                actions={[
                    {
                        label: 'React',
                        url: 'https://www.npmjs.com/package/branch-beacon',
                        icon: <NpmPlainIcon />
                    },
                    {
                        label: 'Web Component',
                        url: 'https://www.npmjs.com/package/branch-beacon-element',
                        icon: <NpmPlainIcon />
                    },
                    {
                        label: 'Repo',
                        url: 'https://github.com/MiguelDotL/branch-beacon',
                        icon: <i className="devicon-github-original" aria-hidden />
                    }
                ]}
            />
            <FeaturedProjectCard
                title="BCBS NC — LiteHouse"
                subtitle="Enterprise client"
                description="[Placeholder copy] Enterprise health insurance platform for Blue Cross Blue Shield of North Carolina. Role, scope, and contribution to be filled in once Miguel provides details."
                techStack={['React', 'TypeScript', 'Enterprise']}
                imageURL={placeholderBcbs}
                actions={[{ label: 'See Library in Use', url: '#' }]}
            />
        </>
    )
};

export const Playground: Story = {
    args: {
        title: 'Sample Project',
        subtitle: 'Playground',
        description: 'Edit any control to preview the card layout.',
        techStack: ['React', 'TypeScript'],
        imageURL: placeholderBranchBeacon,
        actions: [{ label: 'View', url: '#' }]
    }
};
