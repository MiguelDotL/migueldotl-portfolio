import '../assets/styles/Projects.css';
import { useEffect, useRef, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useInView } from 'react-intersection-observer';
import { Globe } from 'react-bootstrap-icons';
import ProjectList from './ProjectList';
import MomentumTabs from './MomentumTabs';
import FeaturedProjectCard from './FeaturedProjectCard';
import FeaturedImageSlider from './FeaturedImageSlider';
import HoverZoomPan from './HoverZoomPan';
import NpmPlainIcon from './NpmPlainIcon';

import { TAB_ANIMATION } from './projectsTabAnimation';

import generalProvision from '../assets/images/projects/general-provision-512.png';
import trimAgency from '../assets/images/projects/trim-agency-512.png';
import cSolutions from '../assets/images/projects/c-solutions-512.png';
import filthyFood from '../assets/images/projects/filthy-food-512.png';
import federated from '../assets/images/projects/federated-512.png';
import exoticCarTrader from '../assets/images/projects/exotic-car-trader-512.png';
import bcbsMain from '../assets/images/projects/bcbs-main.png';
import bcbsLitehouse from '../assets/images/projects/bcbs-litehouse.png';
import bcbsProviders from '../assets/images/projects/bcbs-providers.png';
import voicepoolImg from '../assets/images/projects/voicepool.png';
import branchBeaconImg from '../assets/images/projects/branch-beacon.png';
import patternArchiveDashboard from '../assets/images/projects/pattern-archive-dashboard.png';
import patternArchiveWizard from '../assets/images/projects/pattern-archive-wizard-editor.png';
import patternArchiveLibrary from '../assets/images/projects/pattern-archive-library.png';

import colorPop from '../assets/images/backgrounds/color-pop-2.png';

const TABS = ['Client', 'Featured', 'Personal'] as const;
type Tab = (typeof TABS)[number];

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
        title: 'Exotic Car Trader',
        description: 'Web Development',
        imageURL: exoticCarTrader,
        url: '//www.exoticcartrader.com/'
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

const TAB_FADE_MS = TAB_ANIMATION.fadeMs;

type ProjectsProps = {
    /** Force the in-view state to start true. Used by Storybook stories
        where the IntersectionObserver doesn't fire reliably in the
        canvas iframe. Production callers should leave this false (default)
        so the MomentumTabs wrap animation reveals on scroll. */
    initialInView?: boolean;
};

const Projects = ({ initialInView = false }: ProjectsProps = {}) => {
    const { ref, inView } = useInView({ triggerOnce: true, initialInView });
    const [activeTab, setActiveTab] = useState<Tab>('Featured');
    // Tab content slides + fades out → swap → slides + fades in. `displayedTab`
    // lags `activeTab` during the exit window so the old content stays visible
    // until it's faded/translated out, then we swap and the new content runs
    // its enter animation.
    const [displayedTab, setDisplayedTab] = useState<Tab>('Featured');
    type Phase = 'idle' | 'exiting' | 'entering';
    type Direction = 'forward' | 'backward';
    const [phase, setPhase] = useState<Phase>('idle');
    const [direction, setDirection] = useState<Direction>('forward');

    const handleTabChange = (next: Tab) => {
        if (next === activeTab) return;
        const oldIdx = TABS.indexOf(activeTab);
        const newIdx = TABS.indexOf(next);
        setDirection(newIdx > oldIdx ? 'forward' : 'backward');
        setActiveTab(next);
    };
    // Smooth height transition as tab content changes. ResizeObserver tracks the
    // inner content's height; the shell wraps it with `overflow: hidden` and a
    // CSS transition on `height` so the section grows/shrinks fluidly instead of
    // snapping when content swaps.
    const innerRef = useRef<HTMLDivElement>(null);
    const [shellHeight, setShellHeight] = useState<number | null>(null);

    useEffect(() => {
        if (!innerRef.current) return;
        const ro = new ResizeObserver(() => {
            if (innerRef.current) {
                setShellHeight(innerRef.current.scrollHeight);
            }
        });
        ro.observe(innerRef.current);
        return () => ro.disconnect();
    }, []);

    useEffect(() => {
        if (activeTab === displayedTab) return;
        // Drive the exit → swap → enter sequence imperatively. setState inside
        // effect is required here.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setPhase('exiting');
        const t = window.setTimeout(() => {
            setDisplayedTab(activeTab);
            setPhase('entering');
        }, TAB_FADE_MS);
        return () => window.clearTimeout(t);
    }, [activeTab, displayedTab]);

    useEffect(() => {
        if (phase !== 'entering') return;
        const t = window.setTimeout(() => setPhase('idle'), TAB_FADE_MS);
        return () => window.clearTimeout(t);
    }, [phase, displayedTab]);

    return (
        <section id="projects" className="projects">
            <img
                src={colorPop}
                alt=""
                aria-hidden="true"
                className="background-image-right"
                loading="lazy"
            />
            <Container>
                <Row>
                    <Col>
                        <div
                            ref={ref}
                            className={`content animate__opacity-0 ${
                                inView &&
                                'animate__animated animate__fadeIn animate__slower'
                            }`}
                        >
                            <h2>Projects</h2>
                            <p className="copy">
                                Over the course of my career, I have had the opportunity
                                to work with some amazing clients, like{' '}
                                <a
                                    href="//www.foreyes.com/"
                                    className="accent nowrap"
                                    rel="noreferrer"
                                    target="_blank"
                                >
                                    ForEyes
                                </a>
                                ,{' '}
                                <a
                                    href="//www.royalcaribbean.com/"
                                    className="accent nowrap"
                                    rel="noreferrer"
                                    target="_blank"
                                >
                                    Royal Caribbean International
                                </a>
                                , and{' '}
                                <a
                                    href="//www.iberostar.com/"
                                    className="accent nowrap"
                                    rel="noreferrer"
                                    target="_blank"
                                >
                                    Iberostar Group
                                </a>
                                .
                            </p>
                            <MomentumTabs
                                tabs={TABS}
                                active={activeTab}
                                onChange={handleTabChange}
                                enabled={inView}
                            />
                            <div
                                className="tab-content-shell"
                                style={
                                    shellHeight !== null
                                        ? { height: shellHeight }
                                        : undefined
                                }
                            >
                                <div
                                    ref={innerRef}
                                    className={`tab-content-fade ${
                                        phase === 'exiting'
                                            ? `is-exiting is-exiting--${direction}`
                                            : phase === 'entering'
                                            ? `is-entering--${direction}`
                                            : ''
                                    }`}
                                >
                                    {displayedTab === 'Featured' && (
                                        <Row>
                                            <FeaturedProjectCard
                                                title="BCBS NC — LiteHouse"
                                                subtitle="Component library"
                                                description="Reusable component library standardizing UI and expediting development across internal products in Blue Cross Blue Shield of North Carolina's ecosystem."
                                                techStack={[
                                                    'Lit',
                                                    'Web Components',
                                                    'TypeScript',
                                                    'Storybook'
                                                ]}
                                                imageSlot={
                                                    <FeaturedImageSlider
                                                        images={[
                                                            {
                                                                src: bcbsMain,
                                                                alt: 'BCBS NC homepage'
                                                            },
                                                            {
                                                                src: bcbsLitehouse,
                                                                alt: 'BCBS NC vision plan page'
                                                            },
                                                            {
                                                                src: bcbsProviders,
                                                                alt: 'BCBS NC providers page'
                                                            }
                                                        ]}
                                                        controls={[
                                                            'arrows',
                                                            'keyboard',
                                                            'swipe'
                                                        ]}
                                                    />
                                                }
                                                actions={[
                                                    {
                                                        label: 'See Library in Use',
                                                        url: 'https://www.bluecrossnc.com/',
                                                        icon: <Globe />
                                                    }
                                                ]}
                                            />
                                            <FeaturedProjectCard
                                                title="Branch Beacon"
                                                subtitle="npm package"
                                                description={
                                                    <>
                                                        A lightweight{' '}
                                                        <a
                                                            href="https://www.npmjs.com/package/branch-beacon"
                                                            rel="noreferrer"
                                                            target="_blank"
                                                            className="accent"
                                                        >
                                                            React
                                                        </a>
                                                        {' / '}
                                                        <a
                                                            href="https://www.npmjs.com/package/branch-beacon-element"
                                                            rel="noreferrer"
                                                            target="_blank"
                                                            className="accent"
                                                        >
                                                            Web Component
                                                        </a>{' '}
                                                        that keeps your current git branch
                                                        visible in the browser as a sanity
                                                        check. Automatically styled to the
                                                        host project's design tokens, with
                                                        color-coding that alerts you to
                                                        protected branches. Published to
                                                        npm with Storybook docs and
                                                        backend references for Express,
                                                        FastAPI, Flask, and Go.
                                                    </>
                                                }
                                                techStack={[
                                                    'TypeScript',
                                                    'React',
                                                    'Vite',
                                                    'npm'
                                                ]}
                                                imageSlot={
                                                    <HoverZoomPan
                                                        src={branchBeaconImg}
                                                        alt="Branch Beacon"
                                                    />
                                                }
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
                                                        icon: (
                                                            <i
                                                                className="devicon-github-original"
                                                                aria-hidden
                                                            />
                                                        )
                                                    }
                                                ]}
                                            />
                                        </Row>
                                    )}
                                    {displayedTab === 'Client' && (
                                        <ProjectList projects={clientProjects} />
                                    )}
                                    {displayedTab === 'Personal' && (
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
                                                        controls={[
                                                            'arrows',
                                                            'keyboard',
                                                            'swipe'
                                                        ]}
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
                                    )}
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default Projects;
