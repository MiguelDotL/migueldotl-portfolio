import type { Meta } from '@storybook/react-vite';
import { Container, Row, Col } from 'react-bootstrap';
import '../assets/styles/Footer.css';
import './PreFooterExploration.stories.css';

import reactIcon from '../assets/images/icons/react-original.svg';
import bootstrapIcon from '../assets/images/icons/bootstrap-original.svg';
import githubIcon from '../assets/images/icons/github.svg';

export const REPO_URL = 'https://github.com/MiguelDotL/migueldotl-portfolio';
export const SB_URL = 'https://migueldotl.github.io/storybook';
export const SB_ITERATION_URL = 'https://migueldotl.github.io/storybook/?path=/story/design-iterations-projecttabs--pill-fill-sliding';
export const TECH = ['React', 'TypeScript', 'Bootstrap', 'Chromatic', 'Vite', 'Vitest'];

const meta: Meta = {
    title: 'Design Iterations/PreFooter',
    // Helpers re-used by PreFooterScreenshotExploration.stories.tsx are
    // exported but should not be treated as stories by Storybook.
    excludeStories: [
        'REPO_URL',
        'SB_URL',
        'SB_ITERATION_URL',
        'TECH',
        'TechBadges',
        'StorybookIcon',
        'SbMock',
        'DEFAULT_LEAD_COPY',
        'ScreenshotFeatureBody',
        'HEADLINES',
        'ComparisonLabel',
        'PICKED_HEADING'
    ],
    decorators: [
        (Story) => (
            <footer
                className="footer"
                style={{
                    background: 'linear-gradient(90deg, #5b2a86 0%, #4a6fc7 100%)',
                    padding: '180px 0 2rem'
                }}
            >
                <Story />
            </footer>
        )
    ],
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component:
                    "Design exploration for the PreFooter section. Five layout variants plus stacked headline-comparison stories for the variants where copy is being iterated. Mock Storybook screenshots are CSS placeholders — replace with a real PNG once a direction is picked."
            }
        },
        // .sb-mock chrome contains a tiny Storybook-pink brand label that
        // fails color-contrast. See PreFooter.stories.tsx for the full rationale.
        a11y: { config: { rules: [{ id: 'color-contrast', enabled: false }] } }
    }
};

export default meta;

export const TechBadges = ({ items = TECH }: { items?: readonly string[] }) => (
    <ul className="tech-badges">
        {items.map((t) => (
            <li key={t}>{t}</li>
        ))}
    </ul>
);

export const StorybookIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 256 319"
        width="15"
        height="18"
        aria-hidden
    >
        <path
            d="M9.022 314.567L.395 16.84A16.819 16.819 0 0 1 16-1.337L237.057.012a16.818 16.818 0 0 1 17.59 16.812v285.44a16.818 16.818 0 0 1-16.142 16.804l-67.2 2.59a8.41 8.41 0 0 1-8.728-8.4v-23.323a4.205 4.205 0 0 0-5.06-4.118c-13.97 3.013-32.137 4.652-50.92 4.652-18.785 0-36.95-1.64-50.922-4.652a4.205 4.205 0 0 0-5.06 4.118v23.864a8.41 8.41 0 0 1-8.671 8.4l-7.052-.232.013-.232c-13.61-.49-25.347-9.84-25.883-23.158z"
            fill="currentColor"
        />
        <path
            className="sb-icon__inner"
            d="M170.692 14.86l1.18-29.034 24.298-2.05 1.04 30.953a2.066 2.066 0 0 1-3.328 1.7l-9.382-7.405-11.105 8.428a2.066 2.066 0 0 1-3.31-1.737zm-37.92 102.26c0 6.566 44.236 3.43 50.18-1.182 0-44.776-24.013-68.295-67.95-68.295-43.937 0-68.582 23.886-68.582 59.715 0 62.4 84.214 63.6 84.214 97.685 0 9.572-4.69 15.27-15.013 15.27-13.45 0-18.768-6.87-18.142-30.224 0-5.066-51.376-6.642-52.94 0-3.985 56.578 31.193 72.92 71.708 72.92 39.262 0 70.082-20.916 70.082-58.776 0-66.851-85.467-65.012-85.467-98.171 0-13.484 10.012-15.272 15.952-15.272 6.252 0 17.515 1.103 16.95 26.33z"
        />
    </svg>
);

export const SbMock = () => (
    <div className="sb-mock" aria-hidden>
        <div className="sb-mock__topbar">
            <span className="sb-mock__brand">Storybook</span>
            <span className="sb-mock__dots">
                <i /><i /><i />
            </span>
        </div>
        <div className="sb-mock__body">
            <div className="sb-mock__sidebar">
                <div className="sb-mock__sidebar-group">
                    <div className="sb-mock__sidebar-line w70" />
                    <div className="sb-mock__sidebar-line w50" />
                    <div className="sb-mock__sidebar-line w60 active" />
                    <div className="sb-mock__sidebar-line w55" />
                </div>
                <div className="sb-mock__sidebar-group">
                    <div className="sb-mock__sidebar-line w65" />
                    <div className="sb-mock__sidebar-line w45" />
                    <div className="sb-mock__sidebar-line w55" />
                </div>
            </div>
            <div className="sb-mock__canvas">
                <div className="sb-mock__card" />
            </div>
        </div>
    </div>
);

// Original — the pre-redesign "Built With React + Bootstrap" layout, preserved as reference.
export const OriginalLayout = () => (
    <Container>
        <Row className="align-items-center">
            <Col lg={12}>
                <div className="built-with">
                    <h3>
                        This Site Was <br />
                        Built With <span>♥️</span> Using:
                    </h3>
                    <div className="tooling-icons">
                        <div className="tooling-icon react-icon">
                            <img src={reactIcon} alt="react-icon" width={80} height={80} loading="lazy" />
                            <span>React</span>
                        </div>
                        <span className="plus-sign">+</span>
                        <div className="tooling-icon bootstrap-icon">
                            <img src={bootstrapIcon} alt="bootstrap-icon" width={80} height={80} loading="lazy" />
                            <span>Bootstrap</span>
                        </div>
                    </div>
                </div>
            </Col>
        </Row>
    </Container>
);

// A. Twin Link Cards — two link cards replace the React/Bootstrap pair
export const TwinLinkCards = () => (
    <Container>
        <Row className="align-items-center">
            <Col lg={12}>
                <div className="built-with v-twin">
                    <h3>
                        Curious how it&rsquo;s <span>built</span>?
                    </h3>
                    <div className="twin-cards">
                        <a className="twin-card" href={REPO_URL} target="_blank" rel="noopener noreferrer">
                            <img src={githubIcon} alt="" width={48} height={48} loading="lazy" />
                            <div>
                                <strong>Source Code</strong>
                                <span>Browse the repo on GitHub</span>
                            </div>
                        </a>
                        <a className="twin-card" href={SB_URL} target="_blank" rel="noopener noreferrer">
                            <span className="twin-card__sb" aria-hidden>SB</span>
                            <div>
                                <strong>Component Library</strong>
                                <span>Explore in Storybook</span>
                            </div>
                        </a>
                    </div>
                    <TechBadges />
                </div>
            </Col>
        </Row>
    </Container>
);

// B. CTAs Below the existing tech stack — most conservative
export const CTAsBelowStack = () => (
    <Container>
        <Row className="align-items-center">
            <Col lg={12}>
                <div className="built-with v-ctas">
                    <h3>
                        This Site Was <br />
                        Built With <span>♥️</span> Using:
                    </h3>
                    <div className="tooling-icons">
                        <div className="tooling-icon">
                            <img src={reactIcon} alt="" width={80} height={80} loading="lazy" />
                            <span>React</span>
                        </div>
                        <span className="plus-sign">+</span>
                        <div className="tooling-icon">
                            <img src={bootstrapIcon} alt="" width={80} height={80} loading="lazy" />
                            <span>Bootstrap</span>
                        </div>
                    </div>
                    <div className="cta-row">
                        <a className="cta-btn" href={REPO_URL} target="_blank" rel="noopener noreferrer">
                            <img src={githubIcon} alt="" width={18} height={18} /> View Source
                        </a>
                        <a className="cta-btn cta-btn--alt" href={SB_URL} target="_blank" rel="noopener noreferrer">
                            Component Library
                        </a>
                    </div>
                </div>
            </Col>
        </Row>
    </Container>
);

// === C. Screenshot Feature — split layout, screenshot left, copy + CTA right ===

export type ScreenshotBodyProps = {
    heading?: React.ReactNode;
    leadCopy?: React.ReactNode;
    tech?: readonly string[];
    sbButtonClass?: string;
    ctaRowClass?: string;
    compact?: boolean;
};

export const DEFAULT_LEAD_COPY = (
    <>
        Take a look at{' '}
        <a href={REPO_URL} target="_blank" rel="noopener noreferrer">
            the code
        </a>
        , or learn about my{' '}
        <a href={SB_ITERATION_URL} target="_blank" rel="noopener noreferrer">
            iterative design process
        </a>{' '}
        in Storybook. Tabs, buttons, hover states — each piece went through several ideations before shipping.
    </>
);

export const ScreenshotFeatureBody = ({
    heading,
    leadCopy = DEFAULT_LEAD_COPY,
    tech,
    sbButtonClass = 'cta-btn cta-btn--alt',
    ctaRowClass = 'cta-row cta-row--start',
    compact
}: ScreenshotBodyProps) => (
    <Container>
        <Row>
            <Col lg={12}>
                <div
                    className="built-with v-screenshot"
                    style={compact ? { marginTop: 0, marginBottom: 0 } : undefined}
                >
                    <Row className="align-items-center g-4">
                        <Col md={7}>
                            <a className="sb-frame" href={SB_URL} target="_blank" rel="noopener noreferrer" aria-label="Open Storybook">
                                <SbMock />
                                <span className="sb-frame__overlay">View Storybook →</span>
                            </a>
                        </Col>
                        <Col md={5}>
                            {heading && <h3 className="v-screenshot__h">{heading}</h3>}
                            <p className="lead-copy">{leadCopy}</p>
                            <div className={ctaRowClass}>
                                <a className="cta-btn" href={REPO_URL} target="_blank" rel="noopener noreferrer">
                                    <img src={githubIcon} alt="" width={18} height={18} /> The Repo
                                </a>
                                <a className={sbButtonClass} href={SB_URL} target="_blank" rel="noopener noreferrer">
                                    <StorybookIcon /> Storybook
                                </a>
                            </div>
                            <p className="tech-label">Built with</p>
                            <TechBadges items={tech} />
                        </Col>
                    </Row>
                </div>
            </Col>
        </Row>
    </Container>
);

export const ScreenshotFeature = () => (
    <ScreenshotFeatureBody heading={<>Peek <span>under the hood</span>.</>} />
);

// D. Stacked Strip — tech, heading, pills
export const StackedStrip = () => (
    <Container>
        <Row>
            <Col lg={12}>
                <div className="built-with v-strip">
                    <TechBadges />
                    <h3>
                        This portfolio is <span>open source</span>.
                    </h3>
                    <div className="pill-row">
                        <a className="pill" href={REPO_URL} target="_blank" rel="noopener noreferrer">
                            <img src={githubIcon} alt="" width={20} height={20} /> Source on GitHub
                        </a>
                        <a className="pill pill--alt" href={SB_URL} target="_blank" rel="noopener noreferrer">
                            Component Library →
                        </a>
                    </div>
                </div>
            </Col>
        </Row>
    </Container>
);

// === E. Single Feature Card — SB screenshot is the hero ===

type SingleBodyProps = { heading?: React.ReactNode; compact?: boolean };

const SingleFeatureCardBody = ({ heading, compact }: SingleBodyProps) => (
    <Container>
        <Row>
            <Col lg={12}>
                <div
                    className="built-with v-single"
                    style={compact ? { marginTop: 0, marginBottom: 0 } : undefined}
                >
                    <div className="feature-grid">
                        <a className="feature-card" href={SB_URL} target="_blank" rel="noopener noreferrer">
                            <SbMock />
                            <div className="feature-card__body">
                                <strong>Component Library</strong>
                                <span>Open in Storybook →</span>
                            </div>
                        </a>
                        <div className="feature-side">
                            {heading && <h3 className="feature-side__h">{heading}</h3>}
                            <a className="cta-btn cta-btn--ghost" href={REPO_URL} target="_blank" rel="noopener noreferrer">
                                <img src={githubIcon} alt="" width={18} height={18} /> Source on GitHub
                            </a>
                            <TechBadges />
                        </div>
                    </div>
                </div>
            </Col>
        </Row>
    </Container>
);

export const SingleFeatureCard = () => (
    <SingleFeatureCardBody heading={<>How it&rsquo;s <span>built</span>.</>} />
);

// === Headline iteration: rendered comparisons for variants C and E ===

export const HEADLINES: Array<{ label: string; heading: React.ReactNode | undefined }> = [
    { label: 'Peek under the hood', heading: <>Peek <span>under the hood</span>.</> },
    { label: 'Behind the scenes', heading: <>Behind the <span>scenes</span>.</> },
    { label: "How it's built", heading: <>How it&rsquo;s <span>built</span>.</> },
    { label: 'See the components', heading: <>See the <span>components</span>.</> },
    { label: 'No heading', heading: undefined }
];

export const ComparisonLabel = ({ children }: { children: React.ReactNode }) => (
    <p
        style={{
            color: '#fff',
            textAlign: 'center',
            fontWeight: 600,
            fontSize: 12,
            letterSpacing: 1.5,
            textTransform: 'uppercase',
            margin: '2.5rem 0 1rem',
            opacity: 0.85
        }}
    >
        {children}
    </p>
);

export const SingleFeatureCardHeadlines = () => (
    <>
        {HEADLINES.map(({ label, heading }) => (
            <div key={label}>
                <ComparisonLabel>{label}</ComparisonLabel>
                <SingleFeatureCardBody heading={heading} compact />
            </div>
        ))}
    </>
);

export const PICKED_HEADING = <>Peek <span>under the hood</span>.</>;

// Iteration stories on top of the Screenshot Feature variant — copy
// alternatives, tech-stack count, button background, button shape — moved
// to PreFooterScreenshotExploration.stories.tsx (sub-folder
// `Design Iterations/PreFooter/Screenshot Feature`).
