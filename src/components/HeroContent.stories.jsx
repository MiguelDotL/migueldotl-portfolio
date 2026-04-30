import HeroContent from './HeroContent';
import '../assets/styles/Hero.css';

const meta = {
    title: 'Components/HeroContent',
    component: HeroContent,
    decorators: [
        (Story) => (
            <section
                className="hero about-me"
                style={{
                    background: '#1a0033',
                    minHeight: '500px',
                    padding: '3rem'
                }}
            >
                <Story />
            </section>
        )
    ],
    parameters: { layout: 'fullscreen' }
};

export default meta;

export const Default = {};
