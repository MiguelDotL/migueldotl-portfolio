import type { Meta, StoryObj } from '@storybook/react-vite';
import './lift.css';

/**
 * Documents the `.lift` reusable class — the portfolio's standard
 * "interactive surface" hover feedback. Mirrors what's currently
 * duplicated on `.cta-btn`, `.sb-frame`, and `.featured-project-card`.
 *
 * Three sizes: default (-2px), `.lift--md` (-4px), `.lift--lg` (-6px).
 * Customize the shadow per-instance via the `--lift-shadow` CSS var.
 *
 * Hover the cards to see the lift.
 */
const Sample = ({
    label,
    extraClass = ''
}: {
    label: string;
    extraClass?: string;
}) => (
    <div
        className={`lift ${extraClass}`.trim()}
        style={{
            background: '#2a2a2a',
            color: '#fff',
            padding: '2em 3em',
            borderRadius: 12,
            fontWeight: 600,
            cursor: 'pointer',
            userSelect: 'none'
        }}
    >
        {label}
    </div>
);

const Stage = ({ children }: { children: React.ReactNode }) => (
    <div
        style={{
            background: '#1f1f1f',
            padding: '4em 2em',
            display: 'flex',
            gap: '2em',
            justifyContent: 'center',
            flexWrap: 'wrap'
        }}
    >
        {children}
    </div>
);

const meta: Meta = {
    title: 'Foundations/Hover/Lift',
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component:
                    'Hover lift utility — `.lift`, `.lift--md`, `.lift--lg`. Translates -2/-4/-6px and boosts box-shadow. 0.2s ease. Override shadow with `--lift-shadow`.'
            }
        }
    }
};

export default meta;

type Story = StoryObj;

export const AllSizes: Story = {
    render: () => (
        <Stage>
            <Sample label="default (-2px)" />
            <Sample label="lift--md (-4px)" extraClass="lift--md" />
            <Sample label="lift--lg (-6px)" extraClass="lift--lg" />
        </Stage>
    )
};

export const CustomShadow: Story = {
    render: () => (
        <Stage>
            <div
                className="lift lift--md"
                style={
                    {
                        background: '#2a2a2a',
                        color: '#fff',
                        padding: '2em 3em',
                        borderRadius: 12,
                        fontWeight: 600,
                        cursor: 'pointer',
                        ['--lift-shadow' as string]:
                            '0 12px 32px rgba(170, 54, 124, 0.45)'
                    } as React.CSSProperties
                }
            >
                pink-glow lift
            </div>
        </Stage>
    )
};
