import '../assets/styles/Projects.css';
import { useEffect, useRef, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Globe } from 'react-bootstrap-icons';
import useInViewOnce from '../hooks/useInViewOnce';
import ProjectList from './ProjectList';
import MomentumTabs from './MomentumTabs';
import FeaturedProjectCard from './FeaturedProjectCard';
import FeaturedImageSlider from './FeaturedImageSlider';
import HoverZoomPan from './HoverZoomPan';
import NpmPlainIcon from './NpmPlainIcon';

import { TAB_ANIMATION } from './projectsTabAnimation';

import {
    CLIENT_PROJECTS,
    bcbsMain,
    bcbsMainWebp,
    bcbsLitehouse,
    bcbsLitehouseWebp,
    bcbsProviders,
    bcbsProvidersWebp,
    voicepoolImg,
    voicepoolImgWebp,
    branchBeaconImg,
    branchBeaconImgWebp,
    patternArchiveDashboard,
    patternArchiveDashboardWebp,
    patternArchiveWizard,
    patternArchiveWizardWebp,
    patternArchiveLibrary,
    patternArchiveLibraryWebp
} from '../data/projects';

import colorPop from '../assets/images/backgrounds/color-pop-2.png';
import colorPopWebp from '../assets/images/backgrounds/color-pop-2.webp';

const TABS = ['Client', 'Featured', 'Personal'] as const;
type Tab = (typeof TABS)[number];

const TAB_FADE_MS = TAB_ANIMATION.fadeMs;

type ProjectsProps = {
    /** Force the in-view state to start true. Used by Storybook stories
        where the IntersectionObserver doesn't fire reliably in the
        canvas iframe. Production callers should leave this false (default)
        so the MomentumTabs wrap animation reveals on scroll. */
    initialInView?: boolean;
};

const Projects = ({ initialInView = false }: ProjectsProps = {}) => {
    const { ref: ioRef, inView: ioInView } = useInViewOnce<HTMLDivElement>();
    // initialInView is a Storybook escape hatch — when true, skip the IO
    // and treat the section as already visible so MomentumTabs draws its
    // perimeter immediately in the canvas iframe.
    const inView = initialInView || ioInView;
    const ref = initialInView ? undefined : ioRef;
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
            <picture>
                <source srcSet={colorPopWebp} type="image/webp" />
                <img
                    src={colorPop}
                    alt=""
                    aria-hidden="true"
                    className="background-image-right"
                    width={667}
                    height={1064}
                    loading="lazy"
                />
            </picture>
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
                                                                srcWebp: bcbsMainWebp,
                                                                alt: 'BCBS NC homepage'
                                                            },
                                                            {
                                                                src: bcbsLitehouse,
                                                                srcWebp: bcbsLitehouseWebp,
                                                                alt: 'BCBS NC vision plan page'
                                                            },
                                                            {
                                                                src: bcbsProviders,
                                                                srcWebp: bcbsProvidersWebp,
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
                                                        srcWebp={branchBeaconImgWebp}
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
                                        <ProjectList projects={CLIENT_PROJECTS} />
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
                                                                srcWebp: voicepoolImgWebp,
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
                                                                srcWebp: patternArchiveDashboardWebp,
                                                                alt: 'Pattern Archive dashboard with active build queue'
                                                            },
                                                            {
                                                                src: patternArchiveLibrary,
                                                                srcWebp: patternArchiveLibraryWebp,
                                                                alt: 'Pattern Archive library with ready-to-publish queue and uploaded videos'
                                                            },
                                                            {
                                                                src: patternArchiveWizard,
                                                                srcWebp: patternArchiveWizardWebp,
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
