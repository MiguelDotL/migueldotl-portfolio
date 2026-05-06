import type { Meta, StoryObj } from '@storybook/react-vite';
import './shimmer.css';

/**
 * `.shimmer` — skeleton placeholder sweep. Originally on Projects.css
 * `.skeleton-shimmer`. Tune `--shimmer-base`, `--shimmer-highlight`,
 * `--shimmer-duration`.
 */
const Bar = ({
    width = '100%',
    height = 16,
    style
}: {
    width?: string;
    height?: number;
    style?: React.CSSProperties;
}) => (
    <div
        className="shimmer"
        style={{ width, height, marginBottom: 12, ...style }}
    />
);

const Stage = ({ children }: { children: React.ReactNode }) => (
    <div
        style={{
            background: '#1f1f1f',
            padding: '4em 3em',
            minHeight: '60vh'
        }}
    >
        {children}
    </div>
);

const meta: Meta = {
    title: 'Foundations/Effects/Shimmer',
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component:
                    'Skeleton-loading sweep. `.shimmer` on any block element with a fixed size.'
            }
        }
    }
};

export default meta;

type Story = StoryObj;

export const SkeletonCard: Story = {
    render: () => (
        <Stage>
            <div style={{ maxWidth: 480 }}>
                <Bar height={24} width="60%" style={{ marginBottom: 24 }} />
                <Bar height={140} style={{ marginBottom: 24, borderRadius: 8 }} />
                <Bar height={14} />
                <Bar height={14} />
                <Bar height={14} width="80%" />
            </div>
        </Stage>
    )
};

export const SpeedKnob: Story = {
    render: () => (
        <Stage>
            <p style={{ color: '#fff', marginBottom: 12 }}>fast (0.6s)</p>
            <Bar
                height={20}
                style={
                    { ['--shimmer-duration' as string]: '0.6s' } as React.CSSProperties
                }
            />
            <p style={{ color: '#fff', margin: '20px 0 12px' }}>default (1.6s)</p>
            <Bar height={20} />
            <p style={{ color: '#fff', margin: '20px 0 12px' }}>slow (3s)</p>
            <Bar
                height={20}
                style={
                    { ['--shimmer-duration' as string]: '3s' } as React.CSSProperties
                }
            />
        </Stage>
    )
};
