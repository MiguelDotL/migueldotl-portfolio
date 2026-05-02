import type { Meta, StoryObj } from '@storybook/react-vite';
import { Container, Row } from 'react-bootstrap';
import ProjectCardSkeleton from './ProjectCardSkeleton';
import '../assets/styles/Projects.css';

const meta: Meta<typeof ProjectCardSkeleton> = {
    title: 'Components/Skeletons/ProjectCardSkeleton',
    component: ProjectCardSkeleton,
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
    parameters: { layout: 'fullscreen' },
    argTypes: {
        md: {
            control: { type: 'number', min: 2, max: 12, step: 1 },
            description:
                'Bootstrap column width at md breakpoint. 4 = 3-up grid (Client tab default).'
        }
    }
};

export default meta;

type Story = StoryObj<typeof ProjectCardSkeleton>;

export const Default: Story = {};

// Matches the live Client-tab grid: 6 placeholder cards in a 3-up md layout.
export const ClientGrid: Story = {
    render: () => (
        <>
            {Array.from({ length: 6 }).map((_, i) => (
                <ProjectCardSkeleton key={i} />
            ))}
        </>
    )
};

// Two-up variant for narrower contexts.
export const HalfWidth: Story = {
    args: { md: 6 }
};
