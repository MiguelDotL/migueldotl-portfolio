import type { Meta, StoryObj } from '@storybook/react-vite';
import '../assets/styles/FeaturedImageSlider.css';

/* Story-only catalogue of the slider control primitives — arrows and
   the three indicator-dot variants — used inside FeaturedImageSlider.
   Selectors are tightly coupled (`.featured-image-slider__dots--frosted
   .featured-image-slider__dot`), so each story renders the matching
   parent + child markup with `is-active` baked in for one item.
   Backlog issue #106 tracks promoting these into reusable components. */

const meta: Meta = {
    title: 'Components/Primitives/SliderControls',
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component:
                    "Controls used by FeaturedImageSlider: previous/next arrows and the three dot-indicator variants (frosted, outlined, segmented progress)."
            }
        }
    },
    decorators: [
        (Story) => (
            <div
                style={{
                    background: 'var(--almost-black)',
                    padding: '3rem'
                }}
            >
                <Story />
            </div>
        )
    ]
};
export default meta;

type Story = StoryObj;

// Carrier mimics the actual slide area so dots/arrows have a parent of
// known size to anchor against. Width is fixed in px so the centered
// layout stays predictable.
const SliderShell = ({ children }: { children: React.ReactNode }) => (
    <div
        className="featured-image-slider"
        style={{
            position: 'relative',
            width: 360,
            height: 202,
            background:
                'linear-gradient(131deg, #AA367C 28%, #4A2FBD 71%)',
            borderRadius: '0.6em',
            overflow: 'hidden'
        }}
    >
        {children}
    </div>
);

export const Arrows: Story = {
    render: () => (
        <SliderShell>
            {/* Force opacity: 1 — live arrows hide until the slider is
                hovered, but the story should always show them. */}
            <button
                type="button"
                aria-label="Previous image"
                className="featured-image-slider__arrow featured-image-slider__arrow--prev"
                style={{ opacity: 1 }}
                onClick={(e) => e.preventDefault()}
            >
                <span aria-hidden>‹</span>
            </button>
            <button
                type="button"
                aria-label="Next image"
                className="featured-image-slider__arrow featured-image-slider__arrow--next"
                style={{ opacity: 1 }}
                onClick={(e) => e.preventDefault()}
            >
                <span aria-hidden>›</span>
            </button>
        </SliderShell>
    ),
    parameters: {
        docs: {
            description: {
                story:
                    "Prev / next arrow buttons. Live behavior fades them in on `:hover` of the slider; this story forces `opacity: 1` so they render standalone."
            }
        }
    }
};

const Dots = ({
    variant,
    activeIndex = 1,
    count = 3
}: {
    variant: 'frosted' | 'outlined';
    activeIndex?: number;
    count?: number;
}) => (
    <SliderShell>
        <div
            className={`featured-image-slider__dots featured-image-slider__dots--${variant}`}
            role="tablist"
        >
            {Array.from({ length: count }).map((_, i) => (
                <button
                    key={i}
                    type="button"
                    role="tab"
                    aria-label={`Show image ${i + 1}`}
                    aria-selected={i === activeIndex}
                    className={`featured-image-slider__dot ${
                        i === activeIndex ? 'is-active' : ''
                    }`}
                    onClick={(e) => e.preventDefault()}
                />
            ))}
        </div>
    </SliderShell>
);

export const FrostedDots: Story = {
    render: () => <Dots variant="frosted" />,
    parameters: {
        docs: {
            description: {
                story:
                    "Default indicator. Semi-transparent white circles with a backdrop-blur; active dot is fully opaque."
            }
        }
    }
};

export const OutlinedDots: Story = {
    render: () => <Dots variant="outlined" />,
    parameters: {
        docs: {
            description: {
                story:
                    "Outlined variant. White-bg dots with a dark ring; active dot gets a colored fill."
            }
        }
    }
};

export const SegmentedProgress: Story = {
    render: () => (
        <SliderShell>
            <div
                className="featured-image-slider__segments"
                role="tablist"
            >
                {[1, 0.6, 0].map((fill, i) => (
                    <button
                        key={i}
                        type="button"
                        role="tab"
                        aria-label={`Show image ${i + 1}`}
                        aria-selected={i === 1}
                        className="featured-image-slider__segment"
                        onClick={(e) => e.preventDefault()}
                    >
                        <span
                            className="featured-image-slider__segment-fill"
                            style={{ width: `${fill * 100}%` }}
                        />
                    </button>
                ))}
            </div>
        </SliderShell>
    ),
    parameters: {
        docs: {
            description: {
                story:
                    "Horizontal segmented bars that fill left-to-right as autoplay progresses. Frozen here at: completed, mid-fill, empty."
            }
        }
    }
};
