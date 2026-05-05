import type { Meta, StoryObj } from '@storybook/react-vite';
import { userEvent, within } from 'storybook/test';
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

// Drives the mobile collapse toggle (handleToggle) at mobile viewport
// width where Bootstrap renders the hamburger. Both clicks so we exercise
// expanded=true and expanded=false paths through handleToggle.
export const ToggleCollapsed: Story = {
    parameters: { viewport: { defaultViewport: 'mobile1' } },
    play: async ({ canvasElement }) => {
        const toggle = canvasElement.querySelector(
            'button.navbar-toggler'
        ) as HTMLElement | null;
        if (!toggle) return;
        await userEvent.click(toggle);
        await userEvent.click(toggle);
    }
};

// Stubs window.open and clicks the resume button to exercise its onClick
// handler without actually opening a new browser tab in the test runner.
export const ResumeButtonClicked: Story = {
    play: async ({ canvasElement, step }) => {
        await step('stub window.open', () => {
            // Replace window.open with a no-op so the click doesn't try to
            // navigate the test browser to an external URL.
            window.open = (() => null) as unknown as typeof window.open;
        });
        const canvas = within(canvasElement);
        const resumeBtn = canvas.getByRole('button', { name: /My Resume/i });
        await userEvent.click(resumeBtn);
    }
};
