import type { ReactNode } from 'react';
import type { Meta } from '@storybook/react-vite';
import { Col, Container, Row } from 'react-bootstrap';
import Projects from './Projects';
import FeaturedProjectCard from './FeaturedProjectCard';
import FeaturedImageSlider from './FeaturedImageSlider';
import ProjectList from './ProjectList';
import '../assets/styles/Projects.css';

import generalProvision from '../assets/images/projects/general-provision-512.png';
import trimAgency from '../assets/images/projects/trim-agency-512.png';
import cSolutions from '../assets/images/projects/c-solutions-512.png';
import filthyFood from '../assets/images/projects/filthy-food-512.png';
import federated from '../assets/images/projects/federated-512.png';
import voicepoolImg from '../assets/images/projects/voicepool.png';
import patternArchiveDashboard from '../assets/images/projects/pattern-archive-dashboard.png';
import patternArchiveWizard from '../assets/images/projects/pattern-archive-wizard-editor.png';
import patternArchiveLibrary from '../assets/images/projects/pattern-archive-library.png';

const meta: Meta<typeof Projects> = {
    title: 'Sections/Projects',
    component: Projects,
    parameters: { layout: 'fullscreen' }
};

export default meta;

// Default renders the full Projects section (Featured tab is the default).
// `initialInView` forces the in-view state true so the MomentumTabs
// perimeter draws around the active tab — IO doesn't fire reliably in
// Storybook's iframe canvas.
export const Default = {
    args: { initialInView: true }
};

// `ClientTab` and `PersonalTab` render the inner per-tab content (the same
// `<Row>` Projects.tsx renders for those tabs) wrapped in the section
// chrome. This skips MomentumTabs entirely so the snapshots are stable —
// MomentumTabs gets its own dedicated story.
const tabSectionDecorator = (children: ReactNode) => (
    <section
        className="projects"
        style={{ background: 'var(--almost-black)', padding: '3rem 1rem' }}
    >
        <Container>
            <Row>
                <Col>
                    <div className="content">
                        <h2>Projects</h2>
                        {children}
                    </div>
                </Col>
            </Row>
        </Container>
    </section>
);

const clientProjects = [
    {
        title: 'T R I M Agency',
        description: 'Web Development',
        imageURL: trimAgency,
        url: '//www.trimagency.com/'
    },
    {
        title: 'C Solutions',
        description: 'Web Development',
        imageURL: cSolutions,
        url: '//csolutions-us.com/'
    },
    {
        title: 'Federated Insurance',
        description: 'Web Development',
        imageURL: federated,
        url: '//www.federated.ca/'
    },
    {
        title: 'Filthy Food',
        description: 'Ecommerce',
        imageURL: filthyFood,
        url: '//filthyfood.com/'
    },
    {
        title: 'General Provision',
        description: 'Web Development',
        imageURL: generalProvision,
        url: '//generalprovision.com/'
    }
];

export const ClientTab = {
    render: () =>
        tabSectionDecorator(<ProjectList projects={clientProjects} />)
};

export const PersonalTab = {
    render: () =>
        tabSectionDecorator(
            <Row>
                <FeaturedProjectCard
                    title="Voicepool"
                    subtitle="Custom dashboard"
                    description="Open-source dashboard for managing a fleet of ElevenLabs accounts. Tracks account usage, routes TTS calls to whichever account has the most capacity, and provisions new accounts end-to-end with one click."
                    techStack={[
                        'TypeScript',
                        'React',
                        'Vite',
                        'Express',
                        'Playwright',
                        'ElevenLabs API'
                    ]}
                    imageSlot={
                        <FeaturedImageSlider
                            images={[
                                {
                                    src: voicepoolImg,
                                    alt: 'Voicepool fleet dashboard'
                                }
                            ]}
                        />
                    }
                    actions={[
                        {
                            label: 'Repo',
                            url: 'https://github.com/MiguelDotL/voicepool',
                            icon: (
                                <i
                                    className="devicon-github-original"
                                    aria-hidden
                                />
                            )
                        }
                    ]}
                />
                <FeaturedProjectCard
                    title="Pattern Archive"
                    subtitle="Automated video pipeline"
                    description="Video production pipeline with a Storybook-driven React UI, AI-assisted script generation driven by a structured prompt guide, and end-to-end automation from script to publish. Each iteration informed by real use."
                    techStack={[
                        'React',
                        'FastAPI',
                        'Whisper',
                        'FFmpeg',
                        'YouTube Data API'
                    ]}
                    imageSlot={
                        <FeaturedImageSlider
                            images={[
                                {
                                    src: patternArchiveDashboard,
                                    alt: 'Pattern Archive dashboard with active build queue'
                                },
                                {
                                    src: patternArchiveLibrary,
                                    alt: 'Pattern Archive library with ready-to-publish queue and uploaded videos'
                                },
                                {
                                    src: patternArchiveWizard,
                                    alt: 'Pattern Archive wizard editor with timeline and clip pool'
                                }
                            ]}
                            controls={['arrows', 'keyboard', 'swipe']}
                            imagePosition="top"
                        />
                    }
                    actions={[
                        {
                            label: 'Repo',
                            url: 'https://github.com/MiguelDotL/PatternArchive',
                            icon: (
                                <i
                                    className="devicon-github-original"
                                    aria-hidden
                                />
                            ),
                            disabled: true,
                            disabledReason: 'Private repo'
                        }
                    ]}
                />
            </Row>
        )
};

