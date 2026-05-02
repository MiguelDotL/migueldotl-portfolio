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
    parameters: { layout: 'fullscreen', docs: { description: { component: "Fixed navigation bar that scroll-spies the active section. Collapses to a hamburger on smaller viewports." } } }
};

export default meta;

export const Default = {};
