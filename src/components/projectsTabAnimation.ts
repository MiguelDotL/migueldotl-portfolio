// Single source of truth for the Projects-section tab animation timings.
// Both Projects.tsx (content slide+fade) and MomentumTabs.tsx (perimeter
// trace timeline) import from here so a preset swap is a one-line change.
//
// CSS-side values (consumed only by Projects.css, not JS) are documented
// here for reference; tweak them in CSS until we wire CSS variables.

export type TabAnimationPreset = {
    /** Length of the exit fade+slide AND the enter fade+slide on tab content. */
    fadeMs: number;
    /** Perimeter trace shrinks off the old tab. */
    indicatorShrinkMs: number;
    /** Perimeter trace stretches as it slides toward the new tab. */
    indicatorSlideStretchMs: number;
    /** Perimeter trace contracts over the new tab before expanding. */
    indicatorSlideContractMs: number;
    /** Perimeter trace expands around the new tab (longest phase). */
    indicatorExpandMs: number;
};

/* Snapshot taken 2026-05-02 — first version where slide+fade replaced
   fade-only on tab content. Indicator timeline unchanged from the original
   MomentumTabs landing.

   CSS values (Projects.css):
     - slide distance:  32px
     - slide easing:    cubic-bezier(0.4, 0, 0.2, 1)
     - shell height:    cubic-bezier(0.4, 0, 0.2, 1) over 320ms

   Total round-trip cost (perceived):
     - content: fadeMs * 2 = 738ms (exit then enter, sequential)
     - indicator: shrink + stretch + contract + expand = 1340ms
     - tabs trail content by ~600ms — source of the "sluggish" feel */
export const TAB_ANIMATION_2026_05_02: TabAnimationPreset = {
    fadeMs: 369,
    indicatorShrinkMs: 280,
    indicatorSlideStretchMs: 140,
    indicatorSlideContractMs: 220,
    indicatorExpandMs: 700
};

/* Preset B — proportional 0.55× scaling on every indicator phase.
   Preserves the timeline's character (same phase ratios as 2026-05-02)
   but cuts total indicator duration to 737ms — synced exactly with the
   content slide+fade round-trip (369ms × 2 = 738ms). */
export const TAB_ANIMATION_SNAPPIER_PROPORTIONAL: TabAnimationPreset = {
    fadeMs: 369,
    indicatorShrinkMs: 154,
    indicatorSlideStretchMs: 77,
    indicatorSlideContractMs: 121,
    indicatorExpandMs: 385
};

/** Active preset. Swap this to A/B test different timings. */
export const TAB_ANIMATION = TAB_ANIMATION_SNAPPIER_PROPORTIONAL;
