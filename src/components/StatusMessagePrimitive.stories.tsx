import type { Meta, StoryObj } from '@storybook/react-vite';
import FormStatusMessage from './FormStatusMessage';
import '../assets/styles/Contact.css';

/* Inline status banner shown after a contact-form submit attempt.
   Markup lives at `.contact form .form-status-message.{success,danger}`. */

const meta: Meta<typeof FormStatusMessage> = {
    title: 'Components/Primitives/ContactFormStatus',
    component: FormStatusMessage,
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component:
                    "Inline status banner shown after a **contact-form** submit attempt. Styling is contact-form-specific, not a generic status badge."
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

type Story = StoryObj<typeof FormStatusMessage>;

export const Success: Story = {
    args: {
        variant: 'success',
        message: "Thanks for reaching out — I'll get back to you shortly."
    }
};

export const Error: Story = {
    args: {
        variant: 'danger',
        message: 'Oops! Request failed — please try again.'
    }
};
