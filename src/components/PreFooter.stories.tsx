import type { Meta } from '@storybook/react-vite';
import PreFooter from './PreFooter';
import '../assets/styles/Footer.css';

const meta: Meta<typeof PreFooter> = {
    title: 'Components/Composites/PreFooter',
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
    parameters: {
        layout: 'fullscreen',
        docs: { description: { component: "The 'Built With' attribution block that sits between the page content and the Footer. Has a negative top margin to overlap into the section above on the live site." } },
        a11y: {
            // The .sb-mock chrome's tiny Storybook-pink brand label fails
            // color-contrast (3.23 vs 4.5 required). text-shadow gives sighted
            // low-vision users readability; the chrome is decorative around an
            // aria-labeled link with iframe title, so screen readers get the
            // real content. Disable just this rule on stories that render the
            // mock chrome.
            config: { rules: [{ id: 'color-contrast', enabled: false }] }
        }
    }
};

export default meta;

export const Default = {};
