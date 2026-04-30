import ContactForm from './ContactForm';
import '../assets/styles/Contact.css';

const meta = {
    title: 'Components/ContactForm',
    component: ContactForm,
    decorators: [
        (Story) => (
            <section
                className="contact"
                style={{
                    background: 'linear-gradient(90deg, #5b2a86 0%, #4a6fc7 100%)',
                    padding: '3rem',
                    minHeight: '600px'
                }}
            >
                <div style={{ maxWidth: '600px', margin: '0 auto' }}>
                    <Story />
                </div>
            </section>
        )
    ],
    parameters: { layout: 'fullscreen' }
};

export default meta;

export const Empty = {};
