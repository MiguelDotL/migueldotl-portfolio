import type { Meta, StoryObj } from '@storybook/react-vite';
import { Container, Row } from 'react-bootstrap';
import FeaturedProjectCardSkeleton from './FeaturedProjectCardSkeleton';
import '../assets/styles/Projects.css';

const meta: Meta<typeof FeaturedProjectCardSkeleton> = {
    title: 'Components/Skeletons/FeaturedProjectCardSkeleton',
    component: FeaturedProjectCardSkeleton,
    decorators: [
        (Story) => (
            <section
                className="projects"
                style={{ background: 'var(--almost-black)', padding: '3rem 1rem' }}
            >
                <Container>
                    <Row>
                        <Story />
                    </Row>
                </Container>
            </section>
        )
    ],
    parameters: { layout: 'fullscreen' }
};

export default meta;

type Story = StoryObj<typeof FeaturedProjectCardSkeleton>;

export const Default: Story = {};

// Matches the live two-up Featured grid so the shimmer placeholders
// render at the same width they would during a real load.
export const Pair: Story = {
    render: () => (
        <>
            <FeaturedProjectCardSkeleton />
            <FeaturedProjectCardSkeleton />
        </>
    )
};
