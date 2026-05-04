import '../assets/styles/Projects.css';
import { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import useInViewOnce from '../hooks/useInViewOnce';
import MomentumTabs from './MomentumTabs';
import FeaturedTabContent from './FeaturedTabContent';
import ClientTabContent from './ClientTabContent';
import PersonalTabContent from './PersonalTabContent';
import useHeightTransition from '../hooks/useHeightTransition';

import { TAB_ANIMATION } from './projectsTabAnimation';

import colorPop from '../assets/images/backgrounds/color-pop-2.png';
import colorPopWebp from '../assets/images/backgrounds/color-pop-2.webp';
import ResponsiveImage from './ResponsiveImage';
import { FADE_IN_SLOWER } from '../constants/animationClasses';

const TABS = ['Client', 'Featured', 'Personal'] as const;
type Tab = (typeof TABS)[number];

const TAB_FADE_MS = TAB_ANIMATION.fadeMs;

export type ProjectsProps = {
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

    // Smooth height transition as tab content changes. The hook attaches a
    // ResizeObserver to the inner div; the shell wraps it with `overflow: hidden`
    // and a CSS transition on `height` so the section grows/shrinks fluidly.
    const { ref: innerRef, height: shellHeight } = useHeightTransition<HTMLDivElement>([]);

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
            <ResponsiveImage
                src={colorPop}
                srcWebp={colorPopWebp}
                alt=""
                aria-hidden="true"
                className="background-image-right"
                width={667}
                height={1064}
                loading="lazy"
            />
            <Container>
                <Row>
                    <Col>
                        <div
                            ref={ref}
                            className={`content animate__opacity-0 ${
                                inView &&
                                FADE_IN_SLOWER
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
                                    {displayedTab === 'Featured' && <FeaturedTabContent />}
                                    {displayedTab === 'Client' && <ClientTabContent />}
                                    {displayedTab === 'Personal' && <PersonalTabContent />}
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
