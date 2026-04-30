import SkillsCarousel from './SkillsCarousel';
import '../assets/styles/Skills.css';
import 'react-multi-carousel/lib/styles.css';

const meta = {
    title: 'Components/SkillsCarousel',
    component: SkillsCarousel,
    decorators: [
        (Story) => (
            <section
                id="skills"
                className="skills"
                style={{
                    background: 'var(--almost-black, #1a1a1a)',
                    padding: '3rem 1rem'
                }}
            >
                <div className="skills-content">
                    <Story />
                </div>
            </section>
        )
    ],
    parameters: { layout: 'fullscreen' }
};

export default meta;

export const Default = {};
