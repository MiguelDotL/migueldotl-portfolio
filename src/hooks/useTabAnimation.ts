import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { TAB_ANIMATION } from '../components/projectsTabAnimation';

const SHRINK_MS = TAB_ANIMATION.indicatorShrinkMs;
const SLIDE_STRETCH_MS = TAB_ANIMATION.indicatorSlideStretchMs;
const SLIDE_CONTRACT_MS = TAB_ANIMATION.indicatorSlideContractMs;
const EXPAND_MS = TAB_ANIMATION.indicatorExpandMs;

export type TabAnimationState = {
    /** Which tab the SVG is currently positioned on. Lags `activeTab` during
     *  a transition — the SVG only remounts at handoff time (after retract). */
    svgTab: string;
    /** Direction the perimeter trace draws. 'cw' = clockwise (forward/right). */
    direction: 'cw' | 'ccw';
    /** True while the perimeter trace is fully expanded around the active tab. */
    expanded: boolean;
    /** True while the perimeter trace is retracting (shrinking off old tab). */
    retracting: boolean;
    /** Controls whether the retract moves forward (offset trick) or reverse (dashArray). */
    retractMode: 'forward' | 'reverse';
    /** True only when the perimeter has fully wrapped. Drives the frosted-glass bg. */
    wrapComplete: boolean;
};

export type IndicatorBox = {
    left: number;
    top: number;
    width: number;
    height: number;
};

export type UseTabAnimationOptions = {
    /** When false, the initial wrap animation is held until this becomes true. */
    enabled?: boolean;
    /** The initial indicator box (measured by the consumer on mount). */
    indicator: IndicatorBox | null;
    /** The tab labels in order — used to compute direction (forward / backward). */
    tabs: readonly string[];
    /** DOM button refs keyed by tab label, for snapshotting layout at click time. */
    buttonRefs: React.MutableRefObject<Record<string, HTMLButtonElement | null>>;
    /** Called when a tab switch should be committed to the parent. */
    onChange: (tab: string) => void;
    /** Called by the hook when indicator coords should be updated. */
    onIndicatorChange: (box: IndicatorBox) => void;
};

export type UseTabAnimationReturn = {
    animState: TabAnimationState;
    /** True while a tab-switch or initial-wrap animation is in flight.
     *  Used by the resize handler to avoid overwriting mid-animation coords. */
    isAnimatingRef: React.MutableRefObject<boolean>;
    handleClick: (next: string, active: string) => void;
};

/**
 * Manages the chained-setTimeout choreography that drives the MomentumTabs
 * perimeter trace animation:
 *
 *   click → retract (shrink off old tab) →
 *   slide-stretch (indicator expands to span both tabs) →
 *   slide-contract (indicator snaps to new tab) →
 *   expand (perimeter traces around new tab) →
 *   idle
 *
 * Timer cleanup is guaranteed on unmount and on rapid re-clicks (interrupt safety).
 */
function useTabAnimation(
    activeTab: string,
    options: UseTabAnimationOptions
): UseTabAnimationReturn {
    const { enabled = true, indicator, tabs, buttonRefs, onChange, onIndicatorChange } = options;

    const [svgTab, setSvgTab] = useState<string>(activeTab);
    const [direction, setDirection] = useState<'cw' | 'ccw'>('cw');
    const [expanded, setExpanded] = useState(false);
    const [retracting, setRetracting] = useState(false);
    const [retractMode, setRetractMode] = useState<'forward' | 'reverse'>('forward');
    const [wrapComplete, setWrapComplete] = useState(false);

    const expandKickedRef = useRef(false);
    const transitionTimers = useRef<number[]>([]);
    const isAnimatingRef = useRef(false);

    const clearTimers = () => {
        transitionTimers.current.forEach((id) => window.clearTimeout(id));
        transitionTimers.current = [];
    };

    // Drain pending timers on unmount so they can't fire setState on an
    // unmounted component.
    useEffect(() => {
        return () => clearTimers();
    }, []);

    // Initial wrap animation. Held until `enabled` flips true and the
    // indicator box is measured. Fires exactly once.
    useLayoutEffect(() => {
        if (expandKickedRef.current || !enabled || !indicator) return;
        expandKickedRef.current = true;
        isAnimatingRef.current = true;
        const t = window.setTimeout(() => setExpanded(true), 80);
        const tFrost = window.setTimeout(() => {
            setWrapComplete(true);
            isAnimatingRef.current = false;
        }, 80 + EXPAND_MS);
        transitionTimers.current.push(t, tFrost);
    }, [enabled, indicator]);

    const handleClick = (next: string, active: string) => {
        if (next === active) return;
        clearTimers();
        isAnimatingRef.current = true;

        const sourceEl = buttonRefs.current[active];
        const targetEl = buttonRefs.current[next];
        if (!sourceEl || !targetEl) return;

        // Snapshot layout at click time — measurements are unaffected by the
        // immediate `active` prop change that follows.
        const sourceBox: IndicatorBox = {
            left: sourceEl.offsetLeft,
            top: sourceEl.offsetTop,
            width: sourceEl.offsetWidth,
            height: sourceEl.offsetHeight
        };
        const targetBox: IndicatorBox = {
            left: targetEl.offsetLeft,
            top: targetEl.offsetTop,
            width: targetEl.offsetWidth,
            height: targetEl.offsetHeight
        };

        const sourceIdx = tabs.indexOf(active);
        const targetIdx = tabs.indexOf(next);
        const dir: 'cw' | 'ccw' = targetIdx > sourceIdx ? 'cw' : 'ccw';
        const isShift = dir !== direction;

        // Notify parent immediately — ARIA + visual color update without delay.
        onChange(next);
        setWrapComplete(false);
        setRetractMode(isShift ? 'reverse' : 'forward');
        setRetracting(true);
        setExpanded(false);

        // Phase 1: indicator shrinks off the old tab (SHRINK_MS)
        const t1 = window.setTimeout(() => {
            const stretchLeft = Math.min(sourceBox.left, targetBox.left);
            const stretchRight = Math.max(
                sourceBox.left + sourceBox.width,
                targetBox.left + targetBox.width
            );
            onIndicatorChange({
                left: stretchLeft,
                top: sourceBox.top,
                width: stretchRight - stretchLeft,
                height: sourceBox.height
            });
        }, SHRINK_MS);

        // Phase 2: indicator slides + contracts (SHRINK_MS + SLIDE_STRETCH_MS)
        const t2 = window.setTimeout(() => {
            setSvgTab(next);
            setDirection(dir);
            setRetracting(false);
            onIndicatorChange(targetBox);
        }, SHRINK_MS + SLIDE_STRETCH_MS);

        // Phase 3: perimeter starts expanding around new tab
        const t3 = window.setTimeout(() => {
            setExpanded(true);
        }, SHRINK_MS + SLIDE_STRETCH_MS + SLIDE_CONTRACT_MS);

        // Phase 4: expansion complete → wrap done, animation idle
        const t4 = window.setTimeout(() => {
            setWrapComplete(true);
            isAnimatingRef.current = false;
        }, SHRINK_MS + SLIDE_STRETCH_MS + SLIDE_CONTRACT_MS + EXPAND_MS);

        transitionTimers.current.push(t1, t2, t3, t4);
    };

    return {
        animState: { svgTab, direction, expanded, retracting, retractMode, wrapComplete },
        isAnimatingRef,
        handleClick
    };
}

export default useTabAnimation;
