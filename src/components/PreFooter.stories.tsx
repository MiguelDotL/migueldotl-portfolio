import type { Meta } from '@storybook/react-vite';
import PreFooter from './PreFooter';
import '../assets/styles/Footer.css';

const meta: Meta<typeof PreFooter> = {
    title: 'Components/PreFooter',
    component: PreFooter,
    decorators: [
        (Story) => (
            <footer
                className="footer"
                style={{
                    background: 'linear-gradient(90deg, #5b2a86 0%, #4a6fc7 100%)',
                    /* PreFooter has margin-top: -122px to overlap the section
                       above it on the live site — give the decorator enough
                       headroom so the heading isn't clipped in the story. */
                    padding: '180px 0 2rem'
                }}
            >
                <Story />
            </footer>
        )
    ],
    parameters: { layout: 'fullscreen' }
};

export default meta;

export const Default = {};
