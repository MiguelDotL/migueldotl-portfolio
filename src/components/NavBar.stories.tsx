import type { Meta } from '@storybook/react-vite';
import NavBar from './NavBar';

const meta: Meta<typeof NavBar> = {
    title: 'Showcase/Sections/NavBar',
    component: NavBar,
    decorators: [
        (Story) => (
            <div style={{ minHeight: '120px' }}>
                <Story />
            </div>
        )
    ],
    parameters: { layout: 'fullscreen' }
};

export default meta;

export const Default = {};
