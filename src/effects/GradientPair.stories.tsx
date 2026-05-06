import type { Meta, StoryObj } from '@storybook/react-vite';
import './gradient-pair.css';

/**
 * `.gradient-pair` — two adjacent buttons that share a continuous gradient.
 *
 * Hover the secondary button: it fills L→R with the gradient, and the
 * primary's gradient angle rotates 180° so the visual gradient appears
 * to flow continuously across both buttons (purple → pink → pink → purple).
 *
 * Origin: PreFooter "The Repo" + "Storybook" CTAs.
 *
 * Browser support: requires @property and :has() (modern browsers only).
 */
const Pair = ({
    primaryLabel = 'Primary',
    secondaryLabel = 'Secondary',
    style
}: {
    primaryLabel?: string;
    secondaryLabel?: string;
    style?: React.CSSProperties;
}) => (
    <div
        className="gradient-pair"
        style={{
            display: 'inline-flex',
            gap: '0.6em',
            ...style
        }}
    >
        <a
            className="gradient-pair__primary"
            href="#"
            onClick={(e) => e.preventDefault()}
            style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '0.7em 1.4em',
                borderRadius: 999,
                fontWeight: 600,
                textDecoration: 'none',
                lineHeight: 1.2
            }}
        >
            {primaryLabel}
        </a>
        <a
            className="gradient-pair__secondary"
            href="#"
            onClick={(e) => e.preventDefault()}
            style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: 'calc(0.7em - 2px) calc(1.4em - 2px)',
                borderRadius: 999,
                fontWeight: 600,
                textDecoration: 'none',
                lineHeight: 1.2
            }}
        >
            {secondaryLabel}
        </a>
    </div>
);

const Stage = ({ children }: { children: React.ReactNode }) => (
    <div
        style={{
            background: '#fff',
            padding: '6em 3em',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '60vh'
        }}
    >
        {children}
    </div>
);

const meta: Meta = {
    title: 'Foundations/Hover/GradientPair',
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component:
                    'Coordinated hover on a button pair. Hover the secondary to see the primary rotate its gradient 180° while the secondary fills.'
            }
        }
    }
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
    render: () => (
        <Stage>
            <Pair primaryLabel="The Repo" secondaryLabel="Storybook" />
        </Stage>
    )
};

export const CyanMagenta: Story = {
    render: () => (
        <Stage>
            <Pair
                primaryLabel="Primary"
                secondaryLabel="Secondary"
                style={
                    {
                        ['--gp-color-1' as string]: '#06b6d4',
                        ['--gp-color-2' as string]: '#ec4899'
                    } as React.CSSProperties
                }
            />
        </Stage>
    )
};

export const FlatRectangle: Story = {
    render: () => (
        <Stage>
            <div
                className="gradient-pair"
                style={{ display: 'inline-flex' }}
            >
                <a
                    className="gradient-pair__primary"
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        padding: '0.9em 2em',
                        fontWeight: 600,
                        textDecoration: 'none'
                    }}
                >
                    Primary
                </a>
                <a
                    className="gradient-pair__secondary"
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        padding: 'calc(0.9em - 2px) calc(2em - 2px)',
                        fontWeight: 600,
                        textDecoration: 'none'
                    }}
                >
                    Secondary
                </a>
            </div>
        </Stage>
    )
};
