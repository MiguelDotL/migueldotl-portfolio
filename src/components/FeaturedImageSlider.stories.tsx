import type { Meta, StoryObj } from '@storybook/react-vite';
import { Container, Row } from 'react-bootstrap';
import { fireEvent, userEvent, within } from 'storybook/test';
import FeaturedImageSlider, {
    type SliderControl,
    type SliderIndicator
} from './FeaturedImageSlider';
import '../assets/styles/Projects.css';
import '../assets/styles/FeaturedImageSlider.css';

import bcbsMain from '../assets/images/projects/bcbs-main.png';
import bcbsLitehouse from '../assets/images/projects/bcbs-litehouse.png';
import bcbsProviders from '../assets/images/projects/bcbs-providers.png';
import voicepoolImg from '../assets/images/projects/voicepool.png';

const triptych = [
    { src: bcbsMain, alt: 'BCBS NC homepage' },
    { src: bcbsLitehouse, alt: 'BCBS NC vision plan page' },
    { src: bcbsProviders, alt: 'BCBS NC providers page' }
];

const single = [{ src: voicepoolImg, alt: 'Voicepool fleet dashboard' }];

type StoryArgs = {
    images: { src: string; alt: string }[];
    indicator: SliderIndicator;
    controls: SliderControl[];
    intervalMs: number;
    imagePosition: string;
};

const meta: Meta<StoryArgs> = {
    title: 'Components/Composites/FeaturedImageSlider',
    decorators: [
        (Story) => (
            <section
                className="projects"
                style={{ background: 'var(--almost-black)', padding: '3rem 1rem' }}
            >
                <Container>
                    <Row>
                        <div
                            className="featured-project-image"
                            style={{ aspectRatio: '16 / 9', maxWidth: '720px' }}
                        >
                            <Story />
                        </div>
                    </Row>
                </Container>
            </section>
        )
    ],
    parameters: { layout: 'fullscreen', docs: { description: { component: "Auto-advancing image slider with hover-pause, optional click-to-lightbox, arrow / keyboard / swipe controls, and four indicator variants." } } },
    argTypes: {
        images: {
            control: { type: 'object' },
            description: 'Slides to cycle through (src + alt)'
        },
        indicator: {
            control: { type: 'radio' },
            options: [
                'frosted-dots',
                'counter',
                'segmented-progress',
                'outlined-dots'
            ],
            description: 'Visual style for the active-slide indicator'
        },
        controls: {
            control: { type: 'check' },
            options: ['arrows', 'click-image', 'keyboard', 'swipe'],
            description:
                'Enabled input methods (multiselect); autoplay + hover-pause always on'
        },
        intervalMs: {
            control: { type: 'number', min: 1500, max: 12000, step: 500 },
            description: 'Autoplay interval in milliseconds'
        },
        imagePosition: {
            control: { type: 'text' },
            description: 'CSS object-position applied to each slide'
        }
    },
    args: {
        images: triptych,
        indicator: 'frosted-dots',
        controls: [],
        intervalMs: 3690,
        imagePosition: 'center'
    },
    render: (args) => (
        <FeaturedImageSlider
            images={args.images}
            indicator={args.indicator}
            controls={args.controls}
            intervalMs={args.intervalMs}
            imagePosition={args.imagePosition}
        />
    )
};

export default meta;

type Story = StoryObj<StoryArgs>;

export const SingleImage: Story = {
    args: { images: single }
};

export const Triptych: Story = {
    args: { images: triptych }
};

export const WithArrows: Story = {
    args: {
        images: triptych,
        controls: ['arrows']
    }
};

export const WithKeyboardAndSwipe: Story = {
    args: {
        images: triptych,
        controls: ['keyboard', 'swipe']
    }
};

export const SegmentedProgress: Story = {
    args: {
        images: triptych,
        indicator: 'segmented-progress'
    }
};

export const Counter: Story = {
    args: {
        images: triptych,
        indicator: 'counter'
    }
};

export const OutlinedDots: Story = {
    args: {
        images: triptych,
        indicator: 'outlined-dots'
    }
};

export const ClickToAdvance: Story = {
    args: {
        images: triptych,
        controls: ['click-image']
    }
};

// Drives the arrow buttons + dot picker so next/prev/setIndex paths
// are all hit, plus the click-to-open lightbox path.
export const Interacted: Story = {
    args: {
        images: triptych,
        controls: ['arrows']
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        await userEvent.click(canvas.getByRole('button', { name: /Next image/ }));
        await userEvent.click(canvas.getByRole('button', { name: /Next image/ }));
        await userEvent.click(canvas.getByRole('button', { name: /Previous image/ }));
        await userEvent.click(canvas.getByRole('tab', { name: /Show image 1/ }));
    }
};

// Exercises keyboard nav + swipe pointer handlers.
export const KeyboardAndSwipeInteracted: Story = {
    args: {
        images: triptych,
        controls: ['keyboard', 'swipe']
    },
    play: async ({ canvasElement }) => {
        const slider = canvasElement.querySelector(
            '.featured-image-slider'
        ) as HTMLElement | null;
        if (!slider) return;
        slider.focus();
        await userEvent.keyboard('{ArrowRight}');
        await userEvent.keyboard('{ArrowLeft}');
        // Swipe left → next
        fireEvent.pointerDown(slider, { clientX: 200 });
        fireEvent.pointerUp(slider, { clientX: 100 });
        // Swipe right → prev
        fireEvent.pointerDown(slider, { clientX: 100 });
        fireEvent.pointerUp(slider, { clientX: 250 });
        // Below threshold → no-op
        fireEvent.pointerDown(slider, { clientX: 100 });
        fireEvent.pointerUp(slider, { clientX: 110 });
    }
};

// Opens the lightbox by clicking the active slide, then exercises
// keyboard nav and the close button.
export const LightboxOpened: Story = {
    args: {
        images: triptych
    },
    play: async ({ canvasElement }) => {
        const activeSlide = canvasElement.querySelector(
            '.featured-image-slider__slide.is-active'
        ) as HTMLElement | null;
        if (!activeSlide) return;
        await userEvent.click(activeSlide);
        await userEvent.keyboard('{ArrowRight}');
        await userEvent.keyboard('{ArrowLeft}');
        await userEvent.keyboard('{Escape}');
    }
};
