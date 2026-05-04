/**
 * Centralized timing constants. All durations in milliseconds.
 * Values were chosen empirically by Miguel — do not "round" without testing.
 *
 * Pattern follows src/components/projectsTabAnimation.ts.
 */

/** FeaturedImageSlider autoplay interval between slides. */
export const SLIDER_AUTOPLAY_INTERVAL = 3690;

/** HoverZoomPan zoom-in/out transition duration. */
export const HOVER_ZOOM_PAN_TRANSITION = 963;

/** MomentumTabs: how long after the last resize event before re-measuring indicator coords. */
export const TABS_RESIZE_SETTLE = 450;

/** MomentumTabs / useTabAnimation: initial-wrap expand delay (leading pause before trace starts). */
export const TABS_INITIAL_WRAP_DELAY = 80;

/** SkillsCarousel: how long to suppress filter transitions while the carousel snaps clone→original. */
export const SKILLS_SNAP_RESET = 100;

/** useFormSubmit: simulated network latency when VITE_MOCK_FORM is active in dev. */
export const FORM_MOCK_DELAY = 500;
