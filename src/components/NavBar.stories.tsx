import type { Meta, StoryObj } from '@storybook/react-vite';
import { userEvent } from 'storybook/test';
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

// Drives the mobile collapse toggle (handleToggle) — the Bootstrap
// Navbar.Toggle is hidden via CSS at desktop widths but the button
// element is still present in the DOM, so we can click it directly.
export const ToggleCollapsed: Story = {
    play: async ({ canvasElement }) => {
        const toggle = canvasElement.querySelector(
            'button.navbar-toggler'
        ) as HTMLElement | null;
        if (!toggle) return;
        await userEvent.click(toggle);
        await userEvent.click(toggle);
    }
};
