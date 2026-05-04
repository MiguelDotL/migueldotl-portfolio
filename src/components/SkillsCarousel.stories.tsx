import type { Meta, StoryObj } from '@storybook/react-vite';
import { userEvent } from 'storybook/test';
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
    parameters: { layout: 'fullscreen', docs: { description: { component: "Skills horizontal carousel. Custom-handles the TypeScript icon's white-square pseudo-element backdrop and pauses autoplay when off-screen." } } }
};

export default meta;

type Story = StoryObj<typeof SkillsCarousel>;

export const Default: Story = {};

// Drives the keyboard-nav useEffect (ArrowLeft/Right while section is in
// view) and the carousel's beforeChange/afterChange handlers via
// react-multi-carousel's chevron buttons.
export const KeyboardAndArrowNav: Story = {
    play: async ({ canvasElement }) => {
        // Wait for IntersectionObserver to flip isInView=true (threshold 0.5)
        // and for centeredIndex to initialize (the 100ms setTimeout in the
        // mount effect).
        await new Promise((r) => setTimeout(r, 250));

        await userEvent.keyboard('{ArrowRight}');
        await new Promise((r) => setTimeout(r, 200));
        await userEvent.keyboard('{ArrowRight}');
        await new Promise((r) => setTimeout(r, 200));
        await userEvent.keyboard('{ArrowLeft}');
        await new Promise((r) => setTimeout(r, 200));

        // Direct clicks on react-multi-carousel's chevron buttons exercise
        // afterChange's snap detection branch — keep going forward enough to
        // potentially hit the end-clone region.
        const next = canvasElement.querySelector(
            '.react-multiple-carousel__arrow--right'
        ) as HTMLElement | null;
        if (next) {
            for (let i = 0; i < 3; i++) {
                await userEvent.click(next);
                await new Promise((r) => setTimeout(r, 200));
            }
        }
    }
};
