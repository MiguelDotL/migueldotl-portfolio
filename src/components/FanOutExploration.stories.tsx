import type { Meta, StoryObj } from '@storybook/react-vite';
import { useEffect, useState } from 'react';
import SocialIcons from './SocialIcons';
import { NAV_SOCIALS } from '../data/socials';
import '../assets/styles/Socials.css';
import '../assets/styles/effects.css';

/**
 * Documents the `.fan-out` reusable class — extracted from the navbar
 * mobile-menu happy accident where social icons spring from a stacked
 * cluster to a spread row when the menu opens.
 *
 * The mechanic: each child has `margin-right: var(--fan-out-stacked,
 * -2.6em)` while closed, then flips to `var(--fan-out-spread, 1.5em)`
 * under `.is-open`. The 0.3s margin transition handles the animation.
 *
 * Override `--fan-out-stacked` / `--fan-out-spread` per-instance to tune
 * the cluster-density and final spread. The last child stays at margin-right: 0
 * so the cluster grows from the right as it expands.
 */
const FanOut = ({
    className = '',
    style
}: {
    className?: string;
    style?: React.CSSProperties;
}) => {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const id = window.setInterval(() => setOpen((v) => !v), 1500);
        return () => window.clearInterval(id);
    }, []);

    return (
        <div
            style={{
                background: '#1f1f1f',
                padding: '3em 2em',
                display: 'flex',
                justifyContent: 'center',
                ...style
            }}
        >
            <div className={`fan-out ${open ? 'is-open' : ''} ${className}`.trim()}>
                <SocialIcons config={NAV_SOCIALS} />
            </div>
        </div>
    );
};

const meta: Meta<typeof FanOut> = {
    title: 'Design Iterations/FanOut',
    component: FanOut,
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component:
                    'Reusable cluster-to-spread animation. Apply `.fan-out` to a horizontal container and toggle `.is-open` (on the same element or any ancestor) to animate. Customize via `--fan-out-stacked` and `--fan-out-spread` CSS variables. Origin: navbar mobile-menu happy accident, see NavBar.css `nav.has-bg .social-icons a.social-icon`.'
            }
        }
    }
};

export default meta;

type Story = StoryObj<typeof FanOut>;

/** Default: -2.6em stacked → 1.5em spread, 0.3s ease-in-out. Auto-loops. */
export const Default: Story = {};

/** Tighter cluster, wider spread. */
export const WiderSpread: Story = {
    render: () => (
        <FanOut
            style={
                {
                    ['--fan-out-stacked' as string]: '-2em',
                    ['--fan-out-spread' as string]: '3em'
                } as React.CSSProperties
            }
        />
    )
};

/** Subtle: barely-overlapping cluster, modest spread. */
export const Subtle: Story = {
    render: () => (
        <FanOut
            style={
                {
                    ['--fan-out-stacked' as string]: '-1em',
                    ['--fan-out-spread' as string]: '0.8em'
                } as React.CSSProperties
            }
        />
    )
};
