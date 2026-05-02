import type { Meta, StoryObj } from '@storybook/react-vite';
import '../assets/styles/Contact.css';

/* Story-only catalogue of the inline form status message used by
   ContactForm post-submit. Two states: success (envelope icon) and
   danger (sweaty-smile error icon). The 0.7s entrance animation only
   plays on first render, so refresh the story in Storybook to replay.
   Backlog issue #106 tracks promoting this into a reusable component. */

const meta: Meta = {
    title: 'Components/Primitives/ContactFormStatus',
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component:
                    "Inline status banner shown after a **contact-form** submit attempt. Markup lives at `.contact form .form-status-message.{success,danger}` — the styling is contact-form-specific, not a generic status badge."
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
                >
                    <div className="submit-container">
                        <Story />
                    </div>
                </form>
            </section>
        )
    ]
};
export default meta;

type Story = StoryObj;

export const Success: Story = {
    render: () => (
        <div
            className="form-status-message success"
            role="status"
            aria-live="polite"
        >
            <span className="envelope-icon" aria-hidden="true">
                {'\u{1F4E8}'}
            </span>
            <p>Thanks for reaching out — I&apos;ll get back to you shortly.</p>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story:
                    "Happy-path confirmation. Envelope emoji slides in, message fades up. Reduced-motion users get the static state."
            }
        }
    }
};

export const Error: Story = {
    render: () => (
        <div
            className="form-status-message danger"
            role="status"
            aria-live="polite"
        >
            <span className="error-icon" aria-hidden="true">
                {'\u{1F605}'}
            </span>
            <p>Oops! Request failed — please try again.</p>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story:
                    "Failure path. Same animation timeline as Success, swapped icon and palette."
            }
        }
    }
};
