import type { Meta, StoryObj } from '@storybook/react-vite';
import { useEffect, useState } from 'react';
import { NAV_SOCIALS } from '../data/socials';
import './fan-out.css';

/**
 * Documents the `.fan-out` reusable class — extracted from the navbar
 * mobile-menu happy accident where social icons spring from a stacked
 * cluster to a spread row when the menu opens.
 *
 * The mechanic: each direct child of `.fan-out` has
 * `margin-right: var(--fan-out-stacked, -2.6em)` while closed, then flips
 * to `var(--fan-out-spread, 1.5em)` under `.is-open`. The 0.3s margin
 * transition handles the animation. The last child stays at 0 so the
 * cluster grows from the right.
 *
 * **Important:** `.fan-out` targets direct children. Don't combine it
 * with a wrapper class whose own rules set `margin-right` on the same
 * children (e.g. the project's `.social-icons` does this). Either rename
 * the wrapper or use `.fan-out` on a plain container, as in this story.
 */
const Circle = ({ icon, label }: { icon: string; label: string }) => (
    <span
        aria-label={label}
        style={{
            width: 42,
            height: 42,
            borderRadius: '50%',
            background: 'rgba(217, 217, 217, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.5)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}
    >
        <img src={icon} alt="" width={18} height={18} />
    </span>
);

const FanOut = ({ style }: { style?: React.CSSProperties }) => {
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
                justifyContent: 'center'
            }}
        >
            <div
                className={`fan-out ${open ? 'is-open' : ''}`}
                style={{ display: 'flex', ...style }}
            >
                {NAV_SOCIALS.map((s) => (
                    <Circle key={s.className} icon={s.icon} label={s.label} />
                ))}
            </div>
        </div>
    );
};

const meta: Meta<typeof FanOut> = {
    title: 'Foundations/Motion/FanOut',
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
