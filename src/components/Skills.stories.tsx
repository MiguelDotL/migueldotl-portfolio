import type { Meta } from '@storybook/react-vite';
import Skills from './Skills';

const meta: Meta<typeof Skills> = {
    title: 'Sections/Skills',
    component: Skills,
    decorators: [
        (Story) => (
            // Skills has margin-top: -15em to overlap Hero on the live site;
            // wrap with extra top spacing so the section is fully visible standalone.
            <div style={{ paddingTop: '15em', background: '#0c0c0c' }}>
                <Story />
            </div>
        )
    ],
    parameters: { layout: 'fullscreen' }
};

export default meta;

export const Default = {};
