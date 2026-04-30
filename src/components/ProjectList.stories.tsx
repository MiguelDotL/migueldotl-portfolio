import type { Meta } from '@storybook/react-vite';
import { Tab } from 'react-bootstrap';
import ProjectList from './ProjectList';
import '../assets/styles/Projects.css';

import orbyTV from '../assets/images/projects/orby-tv-2-512.png';
import cSolutions from '../assets/images/projects/c-solutions-512.png';
import filthyFood from '../assets/images/projects/filthy-food-512.png';

const sampleProjects = [
    { title: 'Orby TV', description: 'Web Development', imageURL: orbyTV, url: '//orbytv.com/' },
    { title: 'C Solutions', description: 'Web Development', imageURL: cSolutions, url: '//csolutions-us.com/' },
    { title: 'Filthy Food', description: 'Web Development', imageURL: filthyFood, url: '//filthyfood.com/' }
];

const meta: Meta<typeof ProjectList> = {
    title: 'Components/ProjectList',
    component: ProjectList,
    decorators: [
        (Story) => (
            <section
                className="projects"
                style={{ background: 'var(--almost-black, #0c0c0c)', padding: '3rem' }}
            >
                <Tab.Container id="story-tabs" defaultActiveKey="client">
                    <Tab.Content>
                        <Story />
                    </Tab.Content>
                </Tab.Container>
            </section>
        )
    ],
    parameters: { layout: 'fullscreen' }
};

export default meta;

export const ThreeProjects = {
    args: {
        projects: sampleProjects,
        eventKey: 'client'
    }
};
