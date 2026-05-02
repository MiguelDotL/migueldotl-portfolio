import type { Meta } from '@storybook/react-vite';
import SkillsCarousel from './SkillsCarousel';
import '../assets/styles/Skills.css';
import 'react-multi-carousel/lib/styles.css';

const meta: Meta<typeof SkillsCarousel> = {
    title: 'Components/Composites/SkillsCarousel',
    component: SkillsCarousel,
    decorators: [
        // id="skills" is required by SkillsCarousel's keyboard-nav IntersectionObserver.
        // We deliberately skip the .skills class — it has margin-top: -15em meant for Hero overlap.
        (Story) => (
            <section
                id="skills"
                style={{
                    background: '#0c0c0c',
                    padding: '6rem 1rem 3rem' // top padding offsets .skills-content's margin-top: -60px
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
