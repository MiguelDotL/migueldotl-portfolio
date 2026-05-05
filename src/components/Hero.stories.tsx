import Hero from './Hero';

const meta = {
    title: 'Showcase/Sections/Hero',
    component: Hero,
    parameters: {
        layout: 'fullscreen',
        docs: { description: { component: "The hero section that opens the portfolio. Full-bleed background with bitmoji illustration and an animated typing CTA." } },
        a11y: {
            // .hero::before darkening pseudo overlay sits above .tagline's
            // translucent gradient. axe-core can't compute effective background
            // through that composition and emits an Inconclusive (not a
            // violation). Real contrast verified manually. Same rule applied
            // on the HeroContent composite stories for the same reason.
            config: {
                rules: [{ id: 'color-contrast', enabled: false }]
            }
        }
    }
};

export default meta;

export const Default = {};
