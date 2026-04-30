import NavBar from './NavBar';

const meta = {
    title: 'Sections/NavBar',
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
