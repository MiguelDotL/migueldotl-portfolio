import { useEffect, useRef, useState } from 'react';
import type { RefObject } from 'react';

export type UseCarouselAutoplayOptions = {
    /** Total number of slides — autoplay is a no-op when this is ≤ 1. */
    totalSlides: number;
    /** The currently active slide index. The hook restarts its timer on every
     *  index change so the interval always measures from the moment a slide
     *  becomes active (whether via autoplay or manual navigation). */
    activeIndex: number;
    /** Autoplay interval in milliseconds. */
    intervalMs: number;
    /** Which indicator variant is rendered. Determines rAF vs setTimeout strategy:
     *  'segmented-progress' drives a 60Hz rAF loop so the fill bar can animate;
     *  all other variants use a single setTimeout (saves ~60 re-renders/second). */
    indicator: string;
    /** When true, autoplay is suspended (e.g. hover-pause or lightbox open). */
    paused?: boolean;
    /** Called once per autoplay tick — consumer should advance the slide index. */
    onAdvance: () => void;
};

export type UseCarouselAutoplayReturn = {
    /** Attach to the carousel root element for off-screen IO toggling. */
    ref: RefObject<HTMLDivElement | null>;
    /** Autoplay fill progress for the current slide (0–1).
     *  Only meaningful when indicator === 'segmented-progress'; always 0 otherwise. */
    progress: number;
};

/**
 * Drives carousel autoplay with two complementary strategies:
 *
 * - **setTimeout path** — used for all indicators except 'segmented-progress'.
 *   One timer per interval; zero re-renders between advances.
 * - **rAF path** — used for 'segmented-progress'. Fires at 60 Hz so the fill
 *   bar can animate; calls `onAdvance` when progress reaches 1.
 *
 * Autoplay pauses automatically when the carousel scrolls off-screen
 * (IntersectionObserver with `rootMargin: '100px'`) so multiple sliders
 * don't keep ticking when the section is not visible.
 *
 * The `offScreen` default is `true` so autoplay is held until the first
 * intersection event, avoiding a brief tick before the observer fires.
 */
function useCarouselAutoplay({
    totalSlides,
    activeIndex,
    intervalMs,
    indicator,
    paused = false,
    onAdvance
}: UseCarouselAutoplayOptions): UseCarouselAutoplayReturn {
    // Defaults to true so autoplay is held until the first intersection event.
    const [offScreen, setOffScreen] = useState(true);
    const [progress, setProgress] = useState(0);
    const ref = useRef<HTMLDivElement | null>(null);

    // Keep a stable ref to onAdvance to avoid restarting the autoplay loop
    // on every render of the parent component.
    const onAdvanceRef = useRef(onAdvance);
    useEffect(() => { onAdvanceRef.current = onAdvance; }, [onAdvance]);

    // Set up the IntersectionObserver on the carousel root for offScreen toggling.
    // Uses rootMargin: '100px' (not triggerOnce) — intentional toggle semantic.
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        // Skip when IntersectionObserver isn't available (e.g. older test envs).
        if (typeof IntersectionObserver === 'undefined') {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setOffScreen(false);
            return;
        }
        const io = new IntersectionObserver(
            ([entry]) => {
                // entry is always present — IO fires at least one per observed element.
                if (entry) setOffScreen(!entry.isIntersecting);
            },
            { rootMargin: '100px' }
        );
        io.observe(el);
        return () => io.disconnect();
    }, []);

    // Reset progress when the active slide changes so the segmented-progress
    // bar restarts from 0 for the new slide.
    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setProgress(0);
    }, [activeIndex]);

    const effectivelyPaused = paused || offScreen;

    useEffect(() => {
        if (effectivelyPaused || totalSlides <= 1) return;

        if (indicator !== 'segmented-progress') {
            // One-shot setTimeout — no re-renders until the slide advances.
            const t = window.setTimeout(() => onAdvanceRef.current(), intervalMs);
            return () => window.clearTimeout(t);
        }

        // rAF path for the segmented-progress fill animation.
        let raf = 0;
        // Capture progress at effect-start time so a pause/resume resumes from
        // the same fill position rather than restarting from 0.
        // When a new slide starts, the reset effect above has already set
        // progress to 0, so `progress * intervalMs` = 0 in that case.
        const start = performance.now() - progress * intervalMs;
        const tick = (now: number) => {
            const p = Math.min((now - start) / intervalMs, 1);
            setProgress(p);
            if (p < 1) {
                raf = requestAnimationFrame(tick);
            } else {
                onAdvanceRef.current();
            }
        };
        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
        // `progress` is intentionally omitted from deps: we capture it as a
        // snapshot at effect-start time (resume-from position). Including it
        // would cause an infinite rAF → setProgress → effect-rerun loop.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [effectivelyPaused, intervalMs, totalSlides, activeIndex, indicator]);

    return { ref, progress };
}

export default useCarouselAutoplay;
