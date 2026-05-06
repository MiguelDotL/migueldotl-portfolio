import type { Meta, StoryObj } from '@storybook/react-vite';
import './frosted.css';

/**
 * Documents the `.frosted` reusable class — the portfolio's signature
 * glass material. Translucent white tint over a backdrop blur+saturate.
 * Currently duplicated across MomentumTabs, FeaturedImageSlider dots/arrows,
 * and project cards.
 *
 * Tune via CSS variables on the element:
 *   --frosted-bg       (rgba tint)
 *   --frosted-blur     (blur radius)
 *   --frosted-saturate (saturation multiplier)
 *
 * Stories render against a text-wall + diagonal-stripe backdrop. Blur is
 * most visible against high-frequency content; a flat gradient blurs into
 * itself and you can barely tell the effect is there.
 */
const TEXT_WALL = Array.from(
    { length: 200 },
    () => 'frosted • backdrop-filter • blur • saturate '
).join('');

const Stage = ({ children }: { children: React.ReactNode }) => (
    <div
        style={{
            position: 'relative',
            background:
                'linear-gradient(131deg, #AA367C 0%, #4A2FBD 50%, #1d1d3f 100%)',
            padding: '4em 2em',
            display: 'flex',
            gap: '2em',
            justifyContent: 'center',
            alignItems: 'center',
            flexWrap: 'wrap',
            minHeight: '60vh',
            overflow: 'hidden'
        }}
    >
        <div
            aria-hidden
            style={{
                position: 'absolute',
                inset: 0,
                padding: '1em',
                fontFamily: 'monospace',
                fontSize: 10,
                lineHeight: 1.4,
                color: 'rgba(255,255,255,0.35)',
                wordBreak: 'break-all',
                userSelect: 'none',
                pointerEvents: 'none'
            }}
        >
            {TEXT_WALL}
        </div>
        <div
            style={{
                position: 'relative',
                display: 'flex',
                gap: '2em',
                flexWrap: 'wrap',
                justifyContent: 'center'
            }}
        >
            {children}
        </div>
    </div>
);

const Tile = ({
    label,
    style
}: {
    label: string;
    style?: React.CSSProperties;
}) => (
    <div
        className="frosted"
        style={{
            color: '#fff',
            padding: '2em 3em',
            borderRadius: 12,
            border: '1px solid rgba(255,255,255,0.15)',
            fontWeight: 600,
            ...style
        }}
    >
        {label}
    </div>
);

const meta: Meta = {
    title: 'Foundations/Material/Frosted',
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component:
                    'Glass material — `.frosted`. Tune `--frosted-bg`, `--frosted-blur`, `--frosted-saturate`.'
            }
        }
    }
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
    render: () => (
        <Stage>
            <Tile label="default (10px blur, 1.3 saturate)" />
        </Stage>
    )
};

export const TuneBlur: Story = {
    render: () => (
        <Stage>
            <Tile
                label="4px blur"
                style={{ ['--frosted-blur' as string]: '4px' } as React.CSSProperties}
            />
            <Tile
                label="10px blur"
                style={{ ['--frosted-blur' as string]: '10px' } as React.CSSProperties}
            />
            <Tile
                label="20px blur"
                style={{ ['--frosted-blur' as string]: '20px' } as React.CSSProperties}
            />
        </Stage>
    )
};

export const TuneTint: Story = {
    render: () => (
        <Stage>
            <Tile
                label="cool tint"
                style={
                    {
                        ['--frosted-bg' as string]: 'rgba(140, 180, 255, 0.08)'
                    } as React.CSSProperties
                }
            />
            <Tile
                label="warm tint"
                style={
                    {
                        ['--frosted-bg' as string]: 'rgba(255, 200, 140, 0.08)'
                    } as React.CSSProperties
                }
            />
            <Tile
                label="dark tint"
                style={
                    {
                        ['--frosted-bg' as string]: 'rgba(0, 0, 0, 0.25)'
                    } as React.CSSProperties
                }
            />
        </Stage>
    )
};
