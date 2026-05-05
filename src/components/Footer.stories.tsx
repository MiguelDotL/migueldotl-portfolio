import type { Meta } from '@storybook/react-vite';
import Footer from './Footer';

const meta: Meta<typeof Footer> = {
    title: 'Showcase/Sections/Footer',
    component: Footer,
    decorators: [
        (Story) => (
            <div
                style={{
                    background: 'linear-gradient(90deg, #5b2a86 0%, #4a6fc7 100%)',
                    paddingTop: 180
                }}
            >
                <Story />
            </div>
        )
    ],
    parameters: {
        layout: 'fullscreen',
        docs: { description: { component: "Page footer — built-with attribution + social icons + copyright. Sits below PreFooter on the live site. PreFooter has margin-top: -122px to overlap the section above; the decorator adds headroom so the story isn't clipped." } },
        // PreFooter's .sb-mock chrome contains a tiny Storybook-pink brand
        // label that fails color-contrast. See PreFooter.stories.tsx for the
        // full rationale.
        a11y: { config: { rules: [{ id: 'color-contrast', enabled: false }] } }
    }
};

export default meta;

export const Default = {};
