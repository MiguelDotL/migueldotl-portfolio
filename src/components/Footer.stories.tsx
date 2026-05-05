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
    parameters: { layout: 'fullscreen', docs: { description: { component: "Page footer — built-with attribution + social icons + copyright. Sits below PreFooter on the live site. PreFooter has margin-top: -122px to overlap the section above; the decorator adds headroom so the story isn't clipped." } } }
};

export default meta;

export const Default = {};
