import PreFooter from './PreFooter';
import '../assets/styles/Footer.css';

const meta = {
    title: 'Components/PreFooter',
    component: PreFooter,
    decorators: [
        (Story) => (
            <footer
                className="footer"
                style={{
                    background: 'linear-gradient(90deg, #5b2a86 0%, #4a6fc7 100%)',
                    padding: '2rem 0'
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
