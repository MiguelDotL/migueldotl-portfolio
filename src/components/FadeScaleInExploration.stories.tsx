import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import '../assets/styles/effects.css';

/**
 * `.fade-scale-in` — modal/lightbox open transition. Originally on
 * FeaturedImageSlider's lightbox overlay. Tune `--fade-scale-from`
 * and `--fade-scale-duration`.
 *
 * Stories include a "Replay" toggle so you can see the animation
 * fire repeatedly without reloading the canvas.
 */
const Modal = ({ style }: { style?: React.CSSProperties }) => (
    <div
        className="fade-scale-in"
        style={{
            background: '#fff',
            color: '#222',
            padding: '2em 3em',
            borderRadius: 12,
            boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
            maxWidth: 360,
            ...style
        }}
    >
        <h3 style={{ marginTop: 0 }}>Modal</h3>
        <p>Drops in with `.fade-scale-in`.</p>
    </div>
);

const Stage = ({ children, onReplay }: { children?: React.ReactNode; onReplay: () => void }) => (
    <div
        style={{
            background:
                'linear-gradient(131deg, #1d1d3f 0%, #4A2FBD 100%)',
            padding: '4em 2em',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '60vh',
            position: 'relative'
        }}
    >
        <button
            onClick={onReplay}
            style={{
                position: 'absolute',
                top: 16,
                right: 16,
                padding: '8px 16px',
                borderRadius: 8,
                border: '1px solid rgba(255,255,255,0.3)',
                background: 'rgba(0,0,0,0.4)',
                color: '#fff',
                cursor: 'pointer'
            }}
        >
            ↻ Replay
        </button>
        {children}
    </div>
);

const Replay = ({ children }: { children: (key: number) => React.ReactNode }) => {
    const [key, setKey] = useState(0);
    return <Stage onReplay={() => setKey((k) => k + 1)}>{children(key)}</Stage>;
};

const meta: Meta = {
    title: 'Design Iterations/FadeScaleIn',
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component:
                    'Modal open animation — `.fade-scale-in`. Tune `--fade-scale-from` and `--fade-scale-duration`.'
            }
        }
    }
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
    render: () => <Replay>{(key) => <Modal key={key} />}</Replay>
};

export const SlowAndStrong: Story = {
    render: () => (
        <Replay>
            {(key) => (
                <Modal
                    key={key}
                    style={
                        {
                            ['--fade-scale-from' as string]: '0.8',
                            ['--fade-scale-duration' as string]: '500ms'
                        } as React.CSSProperties
                    }
                />
            )}
        </Replay>
    )
};
