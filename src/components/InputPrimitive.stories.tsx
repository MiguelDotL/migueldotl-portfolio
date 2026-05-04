import type { Meta, StoryObj } from '@storybook/react-vite';
import { within } from 'storybook/test';
import { Col, Row } from 'react-bootstrap';
import '../assets/styles/Contact.css';

/* Story-only catalogue of the form-field primitives used in
   ContactForm. Selector chain `.contact form input` / `.contact form
   textarea` so each story wraps in `<section class="contact"><form>`.
   Backlog issue #106 tracks promoting these into reusable components. */

const meta: Meta = {
    title: 'Components/Primitives/Input',
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component:
                    "Frosted-glass form fields used in the contact section. Inputs and textarea share the same styling — white-on-blur focus state, semi-transparent background, salmon-tinted invalid border (`:user-invalid`)."
            }
        }
    },
    decorators: [
        (Story) => (
            <section
                className="contact"
                style={{
                    background:
                        'linear-gradient(90deg, #5b2a86 0%, #4a6fc7 100%)',
                    padding: '3rem',
                    minHeight: '300px'
                }}
            >
                <form
                    onSubmit={(e) => e.preventDefault()}
                    style={{ maxWidth: 600, margin: '0 auto' }}
                    noValidate={false}
                >
                    <Story />
                </form>
            </section>
        )
    ]
};
export default meta;

type Story = StoryObj;

export const Default: Story = {
    render: () => (
        <Row>
            <Col className="px-1" sm={12}>
                <input
                    type="text"
                    name="firstName"
                    placeholder="First Name *"
                    aria-label="First Name (required)"
                    autoComplete="given-name"
                    required
                />
            </Col>
        </Row>
    ),
    parameters: {
        docs: {
            description: {
                story:
                    "Idle input. Placeholder doubles as the visible label; semi-transparent white background; pale border."
            }
        }
    }
};

export const Filled: Story = {
    render: () => (
        <Row>
            <Col className="px-1" sm={6}>
                <input
                    type="text"
                    name="firstName"
                    defaultValue="Alex"
                    placeholder="First Name *"
                    aria-label="First Name (required)"
                    required
                />
            </Col>
            <Col className="px-1" sm={6}>
                <input
                    type="email"
                    name="email"
                    defaultValue="alex.smith@example.com"
                    placeholder="Email Address *"
                    aria-label="Email Address (required)"
                    required
                />
            </Col>
            <Col className="px-1" sm={12}>
                <textarea
                    name="message"
                    rows={4}
                    defaultValue="Loved your portfolio — let's chat about a senior frontend role."
                    placeholder="Message *"
                    aria-label="Message (required)"
                    required
                />
            </Col>
        </Row>
    ),
    parameters: {
        docs: {
            description: {
                story:
                    "Inputs with values. Side-by-side text + email + textarea so the typography and value rendering can be reviewed at a glance."
            }
        }
    }
};

// `:focus` styles only paint while the input is the active element, so
// the play function focuses it on mount.
export const Focused: Story = {
    render: () => (
        <Row>
            <Col className="px-1" sm={12}>
                <input
                    type="text"
                    name="firstName"
                    placeholder="First Name *"
                    aria-label="First Name (required)"
                    required
                />
            </Col>
        </Row>
    ),
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        canvas.getByPlaceholderText(/First Name/i).focus();
    },
    parameters: {
        docs: {
            description: {
                story:
                    "Focus state. Background flips to solid white, dark text, inset shadow rim; placeholder dims."
            }
        }
    }
};

// `aria-invalid="true"` drives the same red styling as `:user-invalid`
// (the CSS rule keys off both), but is deterministic in stories — it
// doesn't depend on synthetic blur events triggering the pseudo-class.
export const Invalid: Story = {
    render: () => (
        <Row>
            <Col className="px-1" sm={12}>
                <input
                    type="email"
                    name="email"
                    defaultValue="not-an-email"
                    placeholder="Email Address *"
                    aria-label="Email Address (required)"
                    aria-invalid="true"
                    required
                />
            </Col>
        </Row>
    ),
    parameters: {
        docs: {
            description: {
                story:
                    "Invalid state. Red border, faint red background fill, outer red ring. Driven by `aria-invalid=\"true\"` here; in production the same styling fires on `:user-invalid` after the user enters a bad value and blurs."
            }
        }
    }
};

export const InvalidFocused: Story = {
    render: () => (
        <Row>
            <Col className="px-1" sm={12}>
                <input
                    type="email"
                    name="email"
                    defaultValue="not-an-email"
                    placeholder="Email Address *"
                    aria-label="Email Address (required)"
                    aria-invalid="true"
                    required
                />
            </Col>
        </Row>
    ),
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        canvas.getByPlaceholderText(/Email Address/i).focus();
    },
    parameters: {
        docs: {
            description: {
                story:
                    "Invalid + focused. Background flips to solid white and text turns dark (focus styling), but the red border remains so the error stays visible while the user edits."
            }
        }
    }
};

export const Textarea: Story = {
    render: () => (
        <Row>
            <Col className="px-1" sm={12}>
                <textarea
                    name="message"
                    rows={6}
                    placeholder="Message *"
                    aria-label="Message (required)"
                    autoComplete="off"
                    required
                />
            </Col>
        </Row>
    ),
    parameters: {
        docs: {
            description: {
                story:
                    "Multiline message textarea. Inherits the same `.contact form input, .contact form textarea` ruleset — including focus and invalid states."
            }
        }
    }
};
