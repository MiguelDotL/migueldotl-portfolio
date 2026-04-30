import type { Meta } from '@storybook/react-vite';
import { Row } from 'react-bootstrap';
import ProjectCard from './ProjectCard';
import '../assets/styles/Projects.css';

import orbyTv from '../assets/images/projects/orby-tv-2.png';
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
    }
};

export default meta;

export const Default = {
    args: {
        title: 'Orby TV',
        description: 'Web Development',
        imageURL: orbyTv,
        url: 'https://orby.tv'
    }
};

export const LongTitle = {
    args: {
        title: 'A Project With An Unusually Long Title',
        description: 'Web Development',
        imageURL: cSolutions,
        url: '#'
    }
};

export const LongDescription = {
    args: {
        title: 'Filthy Food',
        description:
            'A multi-paragraph description that wraps to multiple lines to verify hover overlay layout',
        imageURL: filthyFood,
        url: '#'
    }
};
