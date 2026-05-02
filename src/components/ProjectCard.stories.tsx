import type { Meta, StoryObj } from '@storybook/react-vite';
import { Row } from 'react-bootstrap';
import { userEvent, within } from 'storybook/test';
import ProjectCard from './ProjectCard';
import '../assets/styles/Projects.css';

import trimAgency from '../assets/images/projects/trim-agency-512.png';
import cSolutions from '../assets/images/projects/c-solutions-512.png';
import filthyFood from '../assets/images/projects/filthy-food-512.png';

const meta: Meta<typeof ProjectCard> = {
    title: 'Components/ProjectCard',
    component: ProjectCard,
    decorators: [
        (Story) => (
            <section
                className="projects"
                style={{ background: 'var(--almost-black)', padding: '2rem' }}
            >
                <Row>
                    <Story />
                </Row>
            </section>
        )
    ],
    parameters: {
        layout: 'fullscreen'
    },
    argTypes: {
        title: { control: { type: 'text' }, description: 'Project name' },
        description: { control: { type: 'text' }, description: 'Short tagline' },
        imageURL: { control: { type: 'text' }, description: 'Image src' },
        url: { control: { type: 'text' }, description: 'Click-through URL' }
    }
};

export default meta;

type Story = StoryObj<typeof ProjectCard>;

export const Default: Story = {
    args: {
        title: 'T R I M Agency',
        description: 'Web Development',
        imageURL: trimAgency,
        url: '//www.trimagency.com/'
    }
};

export const LongTitle: Story = {
    args: {
        title: 'A Project With An Unusually Long Title',
        description: 'Web Development',
        imageURL: cSolutions,
        url: '#'
    }
};

export const LongDescription: Story = {
    args: {
        title: 'Filthy Food',
        description:
            'A multi-paragraph description that wraps to multiple lines to verify hover overlay layout',
        imageURL: filthyFood,
        url: '#'
    }
};

export const Playground: Story = {
    args: {
        title: 'Sample Project',
        description: 'Edit any control to preview',
        imageURL: orbyTv,
        url: '#'
    }
};

// Drives the hover overlay state for snapshot coverage of the hovered look.
export const Hovered: Story = {
    args: {
        title: 'Orby TV',
        description: 'Web Development',
        imageURL: orbyTv,
        url: 'https://orby.tv'
    },
    play: async ({ canvasElement }) => {
        const card = within(canvasElement).getAllByRole('img')[0]
            .closest('.project-card');
        if (card) await userEvent.hover(card);
    }
};
