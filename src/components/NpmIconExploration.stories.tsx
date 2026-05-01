import type { Meta, StoryObj } from '@storybook/react-vite';
import '../assets/styles/Projects.css';

import npmWordmarkSvg from 'devicon/icons/npm/npm-original-wordmark.svg';

/**
 * Inline copy of devicon's npm-plain.svg path (from devicon 2.17 — vendored
 * here so we can preview it without bumping the package and breaking the
 * skills carousel). Single path with even-odd fill: outer rounded square +
 * inner "n" cutout.
 */
const NPM_PLAIN_PATH =
    'm0 7.0624c0-3.8376 3.2248-7.0624 7.0624-7.0624h113.88c3.8376 0 7.0624 3.2248 7.0624 7.0624v113.88c0 3.8376-3.2248 7.0624-7.0624 7.0624h-113.88c-3.8376 0-7.0624-3.2248-7.0624-7.0624zm23.69 97.518h40.395l0.04975-58.532h19.494l-0.04975 58.581h19.543l0.0508-78.075-78.076-0.0995-0.0995 78.125z';

const NpmPlain = ({ fill, size = 28 }: { fill: string; size?: number }) => (
    <svg viewBox="0 0 128 128" width={size} height={size} aria-hidden>
        <path fill={fill} d={NPM_PLAIN_PATH} />
    </svg>
);

/**
 * Exploration of every NPM-icon option we can ship today, all rendered at the
 * same scale on a dark button-context background so the user can pick one.
 *
 * Pinned constraints from prior turns:
 *   - devicon stays at 2.15.1 (skills carousel breaks on 2.17 due to font glyph
 *     codepoint shifts), so `npm-plain` / `npm-original` (mark-only variants)
 *     are NOT available.
 *   - Only npm-original-wordmark exists in 2.15.1 — the red box with white
 *     "npm" text baked into the SVG.
 */

type Variant = {
    label: string;
    note: string;
    render: () => JSX.Element;
};

const variants: Variant[] = [
    {
        label: 'devicon font (currentColor)',
        note:
            '<i class="devicon-npm-original-wordmark"> — single-color font glyph. Inherits parent color. Currently shipped on the buttons.',
        render: () => (
            <i
                className="devicon-npm-original-wordmark"
                style={{ fontSize: 28, color: '#fff' }}
                aria-hidden
            />
        )
    },
    {
        label: 'devicon font + .colored',
        note:
            '<i class="devicon-npm-original-wordmark colored"> — multi-layered SVG with brand red box + white text.',
        render: () => (
            <i
                className="devicon-npm-original-wordmark colored"
                style={{ fontSize: 28 }}
                aria-hidden
            />
        )
    },
    {
        label: 'SVG file (raw, brand red)',
        note:
            'Imported npm-original-wordmark.svg as <img>. Red box + white text baked into the SVG. Currently shipped on the footer (before filter).',
        render: () => (
            <img
                src={npmWordmarkSvg}
                alt=""
                style={{ height: 28 }}
            />
        )
    },
    {
        label: 'SVG + brightness(0) invert(1)',
        note:
            'Same SVG, flattened to pure white via CSS filter. Currently shipped on the footer at rest.',
        render: () => (
            <img
                src={npmWordmarkSvg}
                alt=""
                style={{ height: 28, filter: 'brightness(0) invert(1)' }}
            />
        )
    },
    {
        label: 'SVG + brightness(0)',
        note:
            'Same SVG flattened to pure black. Used on the footer hover state (against the white circle background).',
        render: () => (
            <img
                src={npmWordmarkSvg}
                alt=""
                style={{
                    height: 28,
                    filter: 'brightness(0)',
                    background: '#fff',
                    padding: 4,
                    borderRadius: 4
                }}
            />
        )
    },
    {
        label: 'SVG + invert(100%)',
        note:
            'Same SVG with channel inversion: red box becomes cyan, white text becomes black. Off-brand.',
        render: () => (
            <img
                src={npmWordmarkSvg}
                alt=""
                style={{ height: 28, filter: 'invert(100%)' }}
            />
        )
    },
    {
        label: 'SVG + grayscale + invert',
        note:
            'grayscale(1) drops the red, invert(1) flips luminance so we get a near-white wordmark with a faint dark box outline.',
        render: () => (
            <img
                src={npmWordmarkSvg}
                alt=""
                style={{
                    height: 28,
                    filter: 'grayscale(1) invert(1)'
                }}
            />
        )
    },
    {
        label: 'devicon-npm-plain (brand red)',
        note:
            'Vendored from devicon 2.17. Red rounded square with an "n" silhouette cutout. Equivalent to <i class="devicon-npm-plain colored"> if we were on 2.17.',
        render: () => <NpmPlain fill="#cb3837" />
    },
    {
        label: 'devicon-npm-plain (currentColor)',
        note:
            'Same path with fill=currentColor → white rounded square with the "n" cutout showing dark background through. Equivalent to <i class="devicon-npm-plain"> on 2.17.',
        render: () => <NpmPlain fill="currentColor" />
    },
    {
        label: 'devicon-npm-plain (white on red)',
        note:
            'Same path drawn white, then placed on a red background — the visual you would get from <i class="devicon-npm-plain"> rendered against a red surface.',
        render: () => (
            <span
                style={{
                    display: 'inline-flex',
                    background: '#cb3837',
                    borderRadius: 4,
                    lineHeight: 0
                }}
            >
                <NpmPlain fill="#fff" />
            </span>
        )
    },
    {
        label: 'Inline SVG — letters only (white)',
        note:
            'Hand-rolled inline SVG of just the "npm" letterforms in currentColor — no box. Closest match to devicon-npm-plain that we lost on rollback.',
        render: () => (
            <svg
                viewBox="0 38 124 52"
                width={28 * (124 / 52)}
                height={28}
                fill="#fff"
                aria-hidden
            >
                {/* n */}
                <rect x="2" y="45" width="13.78" height="29.14" />
                <rect x="2" y="45" width="38.45" height="8" />
                <rect x="26.67" y="53" width="13.78" height="21.14" />
                {/* p */}
                <rect x="46.89" y="45" width="13.78" height="36.42" />
                <rect x="46.89" y="45" width="34.45" height="8" />
                <rect x="67.56" y="53" width="13.78" height="14" />
                {/* m */}
                <rect x="87.78" y="45" width="13.78" height="29.14" />
                <rect x="87.78" y="45" width="38.22" height="8" />
                <rect x="105.56" y="53" width="6.89" height="21.14" />
                <rect x="119.22" y="53" width="6.78" height="21.14" />
            </svg>
        )
    }
];

const meta: Meta = {
    title: 'Explorations/NpmIcon',
    parameters: { layout: 'fullscreen' },
    decorators: [
        (Story) => (
            <div
                style={{
                    background: 'var(--almost-black, #0a0a0a)',
                    minHeight: '100vh',
                    padding: '3rem 2rem',
                    fontFamily: 'inherit',
                    color: '#fff'
                }}
            >
                <Story />
            </div>
        )
    ]
};

export default meta;

type Story = StoryObj;

export const AllVariants: Story = {
    render: () => (
        <div style={{ display: 'grid', gap: '2rem', maxWidth: 760 }}>
            <h2 style={{ margin: 0, fontSize: 22 }}>NPM icon options</h2>
            <p style={{ margin: 0, opacity: 0.7, fontSize: 14, lineHeight: 1.5 }}>
                Every renderable npm icon given the current dependency state
                (devicon@2.15.1). Pick one for the buttons and one for the
                footer.
            </p>
            {variants.map((v) => (
                <div
                    key={v.label}
                    style={{
                        display: 'grid',
                        gridTemplateColumns: '160px 1fr',
                        gap: '1.5rem',
                        alignItems: 'center',
                        padding: '1rem',
                        background: 'rgba(255,255,255,0.03)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        borderRadius: 6
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            minHeight: 44,
                            background: 'rgba(255,255,255,0.04)',
                            border: '1px solid rgba(255,255,255,0.12)',
                            borderRadius: 4,
                            padding: '0.5rem'
                        }}
                    >
                        {v.render()}
                    </div>
                    <div>
                        <div style={{ fontWeight: 700, fontSize: 14 }}>
                            {v.label}
                        </div>
                        <div
                            style={{
                                marginTop: 4,
                                fontSize: 12,
                                opacity: 0.65,
                                lineHeight: 1.5
                            }}
                        >
                            {v.note}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
};

export const InsideButton: Story = {
    name: 'In a button (current production)',
    render: () => (
        <div className="featured-project-actions" style={{ gap: '0.6em' }}>
            {variants.map((v) => (
                <a
                    key={v.label}
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    className="btn btn-outline-secondary"
                    title={v.label}
                >
                    <span className="featured-project-action-icon">
                        {v.render()}
                    </span>
                    npm
                </a>
            ))}
        </div>
    )
};
