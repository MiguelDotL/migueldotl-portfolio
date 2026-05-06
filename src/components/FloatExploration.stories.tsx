import type { Meta, StoryObj } from '@storybook/react-vite';
import '../assets/styles/effects.css';

/**
 * Documents the `.float` reusable class — gentle vertical bob. Originally
 * the Hero bitmoji's signature animation (`@keyframes updown` + `animation:
 * updown 6s linear infinite`). Generic enough for any decorative floating
 * element.
 *
 * Customize via CSS variables:
 *   --float-distance  (default 1em) — peak displacement
 *   --float-duration  (default 6s)  — full cycle
 */
const Orb = ({ style }: { style?: React.CSSProperties }) => (
    <div
        className="float"
        style={{
            width: 96,
            height: 96,
            borderRadius: '50%',
            background:
                'radial-gradient(circle at 30% 30%, #fff 0%, #AA367C 40%, #4A2FBD 100%)',
            boxShadow: '0 12px 40px rgba(74, 47, 189, 0.5)',
            ...style
        }}
    />
);

const Stage = ({ children }: { children: React.ReactNode }) => (
    <div
        style={{
            background: '#1f1f1f',
            padding: '6em 2em',
            display: 'flex',
            gap: '4em',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '60vh'
        }}
    >
        {children}
    </div>
);

const meta: Meta = {
    title: 'Design Iterations/Float',
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component:
                    'Vertical bob — `.float`. Tune `--float-distance` and `--float-duration`.'
            }
        }
    }
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
    render: () => (
        <Stage>
            <Orb />
        </Stage>
    )
};

export const Variants: Story = {
    render: () => (
        <Stage>
            <Orb
                style={
                    {
                        ['--float-distance' as string]: '0.4em',
                        ['--float-duration' as string]: '3s'
                    } as React.CSSProperties
                }
            />
            <Orb />
            <Orb
                style={
                    {
                        ['--float-distance' as string]: '2em',
                        ['--float-duration' as string]: '10s'
                    } as React.CSSProperties
                }
            />
        </Stage>
    )
};
