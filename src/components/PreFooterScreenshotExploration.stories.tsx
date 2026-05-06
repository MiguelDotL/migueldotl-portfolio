import type { Meta } from '@storybook/react-vite';
import '../assets/styles/Footer.css';
import './PreFooterExploration.stories.css';
import {
    ComparisonLabel,
    HEADLINES,
    PICKED_HEADING,
    ScreenshotFeatureBody
} from './PreFooterExploration.stories';

const meta: Meta = {
    title: 'Design Iterations/PreFooter/Screenshot Feature',
    decorators: [
        (Story) => (
            <footer
                className="footer"
                style={{
                    background: 'linear-gradient(90deg, #5b2a86 0%, #4a6fc7 100%)',
                    padding: '180px 0 2rem'
                }}
            >
                <Story />
            </footer>
        )
    ],
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component:
                    'Iterations on top of the Screenshot Feature variant — the layout that shipped. Each story stacks variants of one decision (headline copy, tech-badge count, SB button background, button shape) so they can be eyeballed against each other.'
            }
        },
        // Same a11y exemption as the parent — see PreFooter.stories.tsx for the
        // full rationale on the .sb-mock brand label.
        a11y: { config: { rules: [{ id: 'color-contrast', enabled: false }] } }
    }
};

export default meta;

// === Headline copy iteration ===

export const Headlines = () => (
    <>
        {HEADLINES.map(({ label, heading }) => (
            <div key={label}>
                <ComparisonLabel>{label}</ComparisonLabel>
                <ScreenshotFeatureBody heading={heading} compact />
            </div>
        ))}
    </>
);

// === Tech-stack count iteration ===

const TECH_STACKS: Array<{ label: string; items: readonly string[] }> = [
    {
        label: '8 — full story (default)',
        items: ['React', 'TypeScript', 'Vite', 'React Bootstrap', 'Storybook', 'Vitest', 'Testing Library', 'Chromatic']
    },
    {
        label: '6 — lean',
        items: ['React', 'TypeScript', 'Vite', 'React Bootstrap', 'Storybook', 'Vitest']
    },
    {
        label: '5 — most curated',
        items: ['React', 'TypeScript', 'Vite', 'Storybook', 'Vitest']
    },
    {
        label: '10 — verbose',
        items: ['React', 'TypeScript', 'Vite', 'React Bootstrap', 'Storybook', 'Vitest', 'Testing Library', 'Chromatic', 'ESLint', 'PurgeCSS']
    }
];

export const TechStacks = () => (
    <>
        {TECH_STACKS.map(({ label, items }) => (
            <div key={label}>
                <ComparisonLabel>{label}</ComparisonLabel>
                <ScreenshotFeatureBody heading={PICKED_HEADING} tech={items} compact />
            </div>
        ))}
    </>
);

// === Storybook button background iteration ===

const SB_BUTTON_BG_VARIANTS: Array<{ label: string; className: string }> = [
    { label: 'Current — transparent', className: 'cta-btn cta-btn--alt' },
    { label: 'Chip-tinted purple', className: 'cta-btn cta-btn--alt cta-btn--alt-tint-purple' },
    { label: 'Pink tint', className: 'cta-btn cta-btn--alt cta-btn--alt-tint-pink' },
    { label: 'White card with shadow', className: 'cta-btn cta-btn--alt cta-btn--alt-card' }
];

export const SbButtonBg = () => (
    <>
        {SB_BUTTON_BG_VARIANTS.map(({ label, className }) => (
            <div key={label}>
                <ComparisonLabel>{label}</ComparisonLabel>
                <ScreenshotFeatureBody heading={PICKED_HEADING} sbButtonClass={className} compact />
            </div>
        ))}
    </>
);

// === Button shape iteration — pill vs rectangular ===

const BTN_SHAPES: Array<{ label: string; className: string }> = [
    { label: 'Pill — current (999px)', className: 'cta-row cta-row--start' },
    { label: 'Sharp rectangle — matches Contact form (0)', className: 'cta-row cta-row--start cta-row--rect' },
    { label: 'Soft rectangle (4px)', className: 'cta-row cta-row--start cta-row--rect-soft' }
];

export const BtnShape = () => (
    <>
        {BTN_SHAPES.map(({ label, className }) => (
            <div key={label}>
                <ComparisonLabel>{label}</ComparisonLabel>
                <ScreenshotFeatureBody heading={PICKED_HEADING} ctaRowClass={className} compact />
            </div>
        ))}
    </>
);
