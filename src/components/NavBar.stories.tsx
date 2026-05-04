import type { Meta, StoryObj } from '@storybook/react-vite';
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

type Story = StoryObj<typeof NavBar>;

export const Default: Story = {};

// Drives the scroll-spy + hasScrolled effect bodies so the scroll
// listeners run in coverage. Avoids clicking anchor links — those
// trigger iframe navigation and crash the browser test session.
export const Scrolled: Story = {
    play: async () => {
        Object.defineProperty(window, 'scrollY', { value: 200, configurable: true });
        window.dispatchEvent(new Event('scroll'));
        Object.defineProperty(window, 'scrollY', { value: 0, configurable: true });
        window.dispatchEvent(new Event('scroll'));
    }
};
