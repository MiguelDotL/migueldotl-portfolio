import type { Meta } from '@storybook/react-vite';
import { Container, Row, Col } from 'react-bootstrap';
import '../assets/styles/Projects.css';
import './ProjectCardHoverExploration.stories.css';
import ProjectCard from './ProjectCard';

import trimAgency from '../assets/images/projects/trim-agency-512.png';

type SampleCard = {
    title: string;
    role: string;
    image: string;
};

const sample: SampleCard = {
    title: 'T R I M Agency',
    role: 'Web Development',
    image: trimAgency
};

const SectionWrap = ({
    label,
    children
}: {
    label: string;
    children: React.ReactNode;
}) => (
    <div style={{ marginBottom: '2.5em' }}>
        <h4
            style={{
                color: 'var(--light-grey)',
                fontWeight: 500,
                fontSize: 14,
                letterSpacing: 1,
                textTransform: 'uppercase',
                marginBottom: '0.8em'
            }}
        >
            {label}
        </h4>
        <Container>
            <Row>{children}</Row>
        </Container>
    </div>
);

const PageWrap = ({ children }: { children: React.ReactNode }) => (
    <section
        className="projects"
        style={{ background: 'var(--almost-black)', padding: '3rem 0' }}
    >
        {children}
    </section>
);

// 1. Current — uses the live ProjectCard component verbatim for true parity.
const CurrentHover = () => (
    <ProjectCard
        title={sample.title}
        description={sample.role}
        imageURL={sample.image}
        url="#"
    />
);

// All custom variants are wrapped in Col sm=6 md=4 to match live ProjectCard width.
const ZoomCaption = () => (
    <Col sm={6} md={4}>
        <a className="hv-card hv-card--zoom" href="#" onClick={(e) => e.preventDefault()}>
            <div className="hv-zoom__image-wrap">
                <img src={sample.image} alt={sample.title} />
            </div>
            <div className="hv-zoom__caption">
                <h4>{sample.title}</h4>
                <span>{sample.role}</span>
            </div>
        </a>
    </Col>
);

const LiftCaption = () => (
    <Col sm={6} md={4}>
        <a className="hv-card hv-card--lift" href="#" onClick={(e) => e.preventDefault()}>
            <img src={sample.image} alt={sample.title} />
            <div className="hv-lift__caption">
                <h4>{sample.title}</h4>
                <span>{sample.role}</span>
            </div>
        </a>
    </Col>
);

const GlassOverlay = () => (
    <Col sm={6} md={4}>
        <a className="hv-card hv-card--glass" href="#" onClick={(e) => e.preventDefault()}>
            <img src={sample.image} alt={sample.title} />
            <div className="hv-glass__overlay">
                <h4>{sample.title}</h4>
                <span>{sample.role}</span>
            </div>
        </a>
    </Col>
);

const BorderGlow = () => (
    <Col sm={6} md={4}>
        <a className="hv-card hv-card--border" href="#" onClick={(e) => e.preventDefault()}>
            <span className="hv-border__glow" />
            <div className="hv-border__inner">
                <img src={sample.image} alt={sample.title} />
                <div className="hv-border__caption">
                    <h4>{sample.title}</h4>
                    <span>{sample.role}</span>
                </div>
            </div>
        </a>
    </Col>
);

// 6. Grayscale → color — subtle, content-focused.
const GrayscaleToColor = () => (
    <Col sm={6} md={4}>
        <a className="hv-card hv-card--gs" href="#" onClick={(e) => e.preventDefault()}>
            <img src={sample.image} alt={sample.title} />
            <div className="hv-gs__caption">
                <h4>{sample.title}</h4>
                <span>{sample.role}</span>
            </div>
        </a>
    </Col>
);

// 7. Diagonal sweep — angled gradient band sweeps across, text fades in.
const DiagonalSweep = () => (
    <Col sm={6} md={4}>
        <a className="hv-card hv-card--sweep" href="#" onClick={(e) => e.preventDefault()}>
            <img src={sample.image} alt={sample.title} />
            <span className="hv-sweep__band" />
            <div className="hv-sweep__caption">
                <h4>{sample.title}</h4>
                <span>{sample.role}</span>
            </div>
        </a>
    </Col>
);

// 8. Ken Burns — continuous slow zoom/pan on hover, cinematic.
const KenBurns = () => (
    <Col sm={6} md={4}>
        <a className="hv-card hv-card--kb" href="#" onClick={(e) => e.preventDefault()}>
            <div className="hv-kb__image-wrap">
                <img src={sample.image} alt={sample.title} />
            </div>
            <div className="hv-kb__caption">
                <h4>{sample.title}</h4>
                <span>{sample.role}</span>
            </div>
        </a>
    </Col>
);

// 9. Tilt + scale — card lifts and tilts slightly toward cursor (CSS-only static tilt).
const Tilt = () => (
    <Col sm={6} md={4}>
        <a className="hv-card hv-card--tilt" href="#" onClick={(e) => e.preventDefault()}>
            <div className="hv-tilt__plane">
                <img src={sample.image} alt={sample.title} />
                <div className="hv-tilt__caption">
                    <h4>{sample.title}</h4>
                    <span>{sample.role}</span>
                </div>
            </div>
        </a>
    </Col>
);

const meta: Meta = {
    title: 'Process/ProjectCardHover',
    parameters: { layout: 'fullscreen', docs: { description: { component: "Side-by-side comparison of nine hover-reveal effects considered for the ProjectCard before the chosen approach landed." } } }
};
export default meta;

export const AllVariants = {
    render: () => (
        <PageWrap>
            <SectionWrap label="1. Current — gradient overlay slides up, text centered">
                <CurrentHover />
            </SectionWrap>
            <SectionWrap label="2. Zoom + caption band — image scales, bottom band slides in">
                <ZoomCaption />
            </SectionWrap>
            <SectionWrap label="3. Lift + always-visible caption below">
                <LiftCaption />
            </SectionWrap>
            <SectionWrap label="4. Glassmorphism — frosted blur slides up">
                <GlassOverlay />
            </SectionWrap>
            <SectionWrap label="5. Border glow — image stays clean, gradient outline reveals">
                <BorderGlow />
            </SectionWrap>
            <SectionWrap label="6. Grayscale → color — desaturated by default, full color on hover">
                <GrayscaleToColor />
            </SectionWrap>
            <SectionWrap label="7. Diagonal sweep — angled gradient band slides across, text fades in">
                <DiagonalSweep />
            </SectionWrap>
            <SectionWrap label="8. Ken Burns — continuous slow zoom/pan on hover, cinematic">
                <KenBurns />
            </SectionWrap>
            <SectionWrap label="9. Tilt — card lifts + skews slightly on hover">
                <Tilt />
            </SectionWrap>
        </PageWrap>
    )
};
