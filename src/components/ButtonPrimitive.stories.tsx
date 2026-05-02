import type { Meta, StoryObj } from '@storybook/react-vite';
import { Col, Row } from 'react-bootstrap';
import { ArrowRightCircle, FileEarmarkText } from 'react-bootstrap-icons';
import '../assets/styles/Projects.css';
import '../assets/styles/Contact.css';
import '../assets/styles/NavBar.css';

/* Story-only catalogue of the button-shaped primitives the live site
   uses. Each story renders the same markup the consuming component
   ships (matching className + parent selector chain) so the visual
   matches production. Backlog issue #106 tracks promoting these into
   reusable React components. */

const meta: Meta = {
    title: 'Components/Primitives/Button',
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component:
                    "Catalogue of every button-shaped primitive used in the live portfolio. Variants live under different parent selectors (`.contact form button`, `.btn-outline-secondary`, `.navbar-text .resume-button`), so each story wraps in the appropriate ancestor."
            }
        }
    }
};
export default meta;

type Story = StoryObj;

const DarkBg = ({ children }: { children: React.ReactNode }) => (
    <div style={{ background: 'var(--almost-black)', padding: '3rem' }}>
        {children}
    </div>
);

// --- 1. Outline secondary (project card action) --------------------
export const OutlineSecondary: Story = {
    render: () => (
        <DarkBg>
            <section
                className="projects"
                style={{ padding: 0, background: 'transparent' }}
            >
                <Row>
                    <Col xs="auto">
                        <div className="project-card">
                            <a
                                href="#"
                                onClick={(e) => e.preventDefault()}
                                className="btn btn-outline-secondary"
                            >
                                View Site
                            </a>
                        </div>
                    </Col>
                </Row>
            </section>
        </DarkBg>
    ),
    parameters: {
        docs: {
            description: {
                story:
                    "ProjectCard / FeaturedProjectCard action link. Markup is `<a className=\"btn btn-outline-secondary\">`, scoped under `.project-card`."
            }
        }
    }
};

// --- 2. Outline secondary, disabled (locked private project) -------
export const OutlineSecondaryDisabled: Story = {
    render: () => (
        <DarkBg>
            <section
                className="projects"
                style={{ padding: 0, background: 'transparent' }}
            >
                <Row>
                    <Col xs="auto">
                        <div className="project-card">
                            <span
                                className="btn btn-outline-secondary featured-project-action--disabled"
                                title="Private repository"
                                aria-disabled="true"
                            >
                                Source Code
                                <span
                                    className="featured-project-action-lock"
                                    aria-hidden
                                >
                                    🔒
                                </span>
                            </span>
                        </div>
                    </Col>
                </Row>
            </section>
        </DarkBg>
    ),
    parameters: {
        docs: {
            description: {
                story:
                    "Disabled variant rendered as a `<span aria-disabled>`. Used when a featured project's repo is private."
            }
        }
    }
};

// --- 3. Hero CTA ("Let's Chat" with arrow) -------------------------
// `.hero button` styles are replicated inline because the `.hero`
// section adds a full-viewport cosmic background + overlay we don't
// want here. The visual matches `.hero button` from Hero.css exactly.
export const HeroCTA: Story = {
    render: () => (
        <DarkBg>
            <button
                onClick={(e) => e.preventDefault()}
                style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--font-color)',
                    fontWeight: 700,
                    fontSize: 20,
                    letterSpacing: '0.8px',
                    display: 'flex',
                    alignItems: 'center',
                    transition: 'all 0.3s ease-in-out',
                    cursor: 'pointer'
                }}
            >
                Let&apos;s Chat
                <ArrowRightCircle size={25} style={{ marginLeft: 10 }} />
            </button>
        </DarkBg>
    ),
    parameters: {
        docs: {
            description: {
                story:
                    "Hero section call-to-action. Transparent button, bold white text, ArrowRightCircle icon. The arrow rotates 90° on hover in the live `.hero button:hover svg` rule."
            }
        }
    }
};

// --- 4. Submit button (contact form) -------------------------------
export const ContactSubmit: Story = {
    render: () => (
        <section
            className="contact"
            style={{
                background:
                    'linear-gradient(90deg, #5b2a86 0%, #4a6fc7 100%)',
                padding: '3rem'
            }}
        >
            <form onSubmit={(e) => e.preventDefault()}>
                <div className="submit-container">
                    <button type="submit">
                        <span>Send</span>
                    </button>
                </div>
            </form>
        </section>
    ),
    parameters: {
        docs: {
            description: {
                story:
                    "Contact-form submit button. Hover swaps to a dark fill via a `::before` pseudo-element."
            }
        }
    }
};

// --- 5. Resume button (nav bar) ------------------------------------
// The `position: relative; zIndex: 0` on the wrapping span establishes
// a local stacking context so the button's `::before` (z-index: -1)
// stays behind the button content but in front of the page bg —
// matching how the live `nav.navbar` (z-index: 9999) provides this
// in production.
export const ResumeNavButton: Story = {
    render: () => (
        <DarkBg>
            <span
                className="navbar-text"
                style={{ position: 'relative', zIndex: 0 }}
            >
                <button
                    className="resume-button"
                    onClick={(e) => e.preventDefault()}
                >
                    <FileEarmarkText size={20} className="me-2" />
                    <span>My Resume</span>
                </button>
            </span>
        </DarkBg>
    ),
    parameters: {
        docs: {
            description: {
                story:
                    "Resume-download button on the right side of the nav bar. White outline, gradient fill animates in from the left on hover via a `::before` pseudo-element."
            }
        }
    }
};
