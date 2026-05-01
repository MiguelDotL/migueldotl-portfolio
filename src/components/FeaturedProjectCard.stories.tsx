import type { Meta } from '@storybook/react-vite';
import { Container, Row } from 'react-bootstrap';
import FeaturedProjectCard from './FeaturedProjectCard';
import NpmPlainIcon from './NpmPlainIcon';
import '../assets/styles/Projects.css';

import orbyTv from '../assets/images/projects/orby-tv-2.png';

const placeholderBranchBeacon = orbyTv;
const placeholderBcbs = orbyTv;

const meta: Meta<typeof FeaturedProjectCard> = {
    title: 'Components/FeaturedProjectCard',
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
    parameters: { layout: 'fullscreen' }
};

export default meta;

export const BranchBeacon = {
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

export const BcbsNc = {
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

export const BothFeatured = {
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
