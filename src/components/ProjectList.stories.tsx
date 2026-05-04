import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tab } from 'react-bootstrap';
import ProjectList from './ProjectList';
import '../assets/styles/Projects.css';

import trimAgency from '../assets/images/projects/trim-agency-512.png';
import cSolutions from '../assets/images/projects/c-solutions-512.png';
import filthyFood from '../assets/images/projects/filthy-food-512.png';
import federated from '../assets/images/projects/federated-512.png';
import generalProvision from '../assets/images/projects/general-provision-512.png';

const sampleProjects = [
    { title: 'T R I M Agency', description: 'Web Development', imageURL: trimAgency, url: '//www.trimagency.com/' },
    { title: 'C Solutions', description: 'Web Development', imageURL: cSolutions, url: '//csolutions-us.com/' },
    { title: 'Filthy Food', description: 'Web Development', imageURL: filthyFood, url: '//filthyfood.com/' }
];

const meta: Meta<typeof ProjectList> = {
    title: 'Components/Composites/ProjectList',
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
    parameters: { layout: 'fullscreen', docs: { description: { component: "Grid of basic project cards. Used in the Client Projects tab." } } },
    argTypes: {
        projects: {
            control: { type: 'object' },
            description: 'Array of projects to render as cards'
        }
    }
};

export default meta;

type Story = StoryObj<typeof ProjectList>;

export const ThreeProjects: Story = {
    args: {
        projects: sampleProjects
    }
};

export const OneProject: Story = {
    args: {
        projects: [sampleProjects[0]!]
    }
};

export const FiveProjects: Story = {
    args: {
        projects: [
            { title: 'T R I M Agency', description: 'Web Development', imageURL: trimAgency, url: '//www.trimagency.com/' },
            { title: 'C Solutions', description: 'Web Development', imageURL: cSolutions, url: '//csolutions-us.com/' },
            { title: 'Federated Insurance', description: 'Web Development', imageURL: federated, url: '//www.federated.ca/' },
            { title: 'Filthy Food', description: 'Ecommerce', imageURL: filthyFood, url: '//filthyfood.com/' },
            { title: 'General Provision', description: 'Web Development', imageURL: generalProvision, url: '//generalprovision.com/' }
        ]
    }
};

export const LongTitlesGrid: Story = {
    args: {
        projects: [
            { title: 'Some Project With An Unusually Long Title', description: 'Web Development', imageURL: trimAgency, url: '#' },
            { title: 'Another Long Project Title For Wrap Testing', description: 'Ecommerce + Backend Engineering', imageURL: cSolutions, url: '#' },
            { title: 'A Third One With A Lot Of Words', description: 'Web Development', imageURL: filthyFood, url: '#' }
        ]
    }
};
