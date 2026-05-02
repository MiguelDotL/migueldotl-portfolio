import type { Meta, StoryObj } from '@storybook/react-vite';
import '../assets/styles/NavBar.css';

/* Story-only catalogue of the nav-link primitive used inside the
   navbar. Selector chain is `nav.navbar .navbar-nav .nav-link.navbar-link`,
   so each story wraps in `<nav class="navbar"><div class="navbar-nav">`
   for the styles to apply. Backlog issue #106 tracks promoting this
   into a reusable component. */

const meta: Meta = {
    title: 'Components/Primitives/NavLink',
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component:
                    "Top-level nav link rendered in the NavBar. Three meaningful states: idle (60% opacity), hover (100% opacity), active (100% opacity, identical visual to hover)."
            }
        }
    },
    decorators: [
        (Story) => (
            <nav
                className="navbar"
                style={{
                    background: 'var(--almost-black)',
                    padding: '1.5rem 2rem',
                    position: 'static'
                }}
            >
                <div className="navbar-nav" style={{ flexDirection: 'row' }}>
                    <Story />
                </div>
            </nav>
        )
    ]
};
export default meta;

type Story = StoryObj;

export const Idle: Story = {
    render: () => (
        <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="nav-link navbar-link"
        >
            Home
        </a>
    ),
    parameters: {
        docs: {
            description: {
                story:
                    "Inactive link. White text at 60% opacity."
            }
        }
    }
};

export const Active: Story = {
    render: () => (
        <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="nav-link navbar-link active"
        >
            Projects
        </a>
    ),
    parameters: {
        docs: {
            description: {
                story:
                    "Active link — applied by the section-tracker on the link whose section is currently in viewport. Opacity goes to 100%."
            }
        }
    }
};

export const FullRow: Story = {
    render: () => (
        <>
            <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="nav-link navbar-link active"
            >
                Home
            </a>
            <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="nav-link navbar-link"
            >
                Skills
            </a>
            <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="nav-link navbar-link"
            >
                Projects
            </a>
            <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="nav-link navbar-link"
            >
                Contact
            </a>
        </>
    ),
    parameters: {
        docs: {
            description: {
                story:
                    "All four nav links side-by-side. Live navbar shows them at 18px on desktop and 3em on the mobile collapsed menu."
            }
        }
    }
};
