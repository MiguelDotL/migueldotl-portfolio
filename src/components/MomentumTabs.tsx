import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import '../assets/styles/MomentumTabs.css';
import { TAB_ANIMATION } from './projectsTabAnimation';
import useTabAnimation, { type IndicatorBox } from '../hooks/useTabAnimation';
import { computeIndicatorPath } from '../hooks/indicatorPath';
import { TABS_RESIZE_SETTLE } from '../config/timings';

const SHRINK_MS = TAB_ANIMATION.indicatorShrinkMs;
const EXPAND_MS = TAB_ANIMATION.indicatorExpandMs;

export type MomentumTabsProps<T extends string> = {
    tabs: readonly T[];
    active: T;
    onChange: (tab: T) => void;
    /** When false, the initial wrap animation is held until this becomes true.
     *  Used to defer the animation until the section scrolls into view. */
    enabled?: boolean;
};

const MomentumTabs = <T extends string>({
    tabs,
    active,
    onChange,
    enabled = true
}: MomentumTabsProps<T>) => {
    const [indicator, setIndicator] = useState<IndicatorBox | null>(null);
    const buttonRefs = useRef<Record<string, HTMLButtonElement | null>>({});
    const initializedRef = useRef(false);
    // Set while a tab-switch or initial-wrap animation is in flight so the
    // resize listener doesn't overwrite mid-animation indicator coords.
    // Fade the perimeter/underline out during resize and back in once resize
    // settles, hiding the brief jump when indicator coords snap to new layout.
    const [isResizing, setIsResizing] = useState(false);
    // Mirror of `isResizing` accessible synchronously inside the resize handler
    // so we only fire setState once per resize session, not on every tick.
    const isResizingRef = useRef(false);
    // Mirror of `active` for the resize handler — lets us attach the listener
    // once on mount instead of re-attaching it every time `active` changes.
    const activeRef = useRef(active);
    useEffect(() => {
        activeRef.current = active;
    }, [active]);

    const { animState, isAnimatingRef, handleClick: animHandleClick } = useTabAnimation(active, {
        enabled,
        indicator,
        tabs,
        buttonRefs: buttonRefs as React.MutableRefObject<Record<string, HTMLButtonElement | null>>,
        onChange: (tab) => onChange(tab as T),
        onIndicatorChange: setIndicator
    });

    // Gated on `enabled` so we only measure once the parent signals the
    // section is in view. Important when the parent has `content-visibility: auto`
    // — without `enabled`, this effect would fire on first mount with a layout
    // that's been skipped, yielding zero-width measurements that then get
    // frozen by the initializedRef guard.
    useLayoutEffect(() => {
        if (initializedRef.current || !enabled) return;
        initializedRef.current = true;
        const el = buttonRefs.current[active];
        if (el) {
            setIndicator({
                left: el.offsetLeft,
                top: el.offsetTop,
                width: el.offsetWidth,
                height: el.offsetHeight
            });
        }
    }, [enabled, active]);

    // Keep the indicator pinned to the active tab when the viewport resizes.
    // Fade out on first resize tick (gated by ref so setState fires once per
    // session, not per tick), re-measure + fade back in once resize idles.
    // Listener is attached once on mount; the handler reads the latest
    // `active` via activeRef to avoid re-attaching on every tab change.
    useEffect(() => {
        let settleTimer: number | undefined;
        const handleResize = () => {
            if (!isResizingRef.current) {
                isResizingRef.current = true;
                setIsResizing(true);
            }
            if (settleTimer !== undefined) window.clearTimeout(settleTimer);
            settleTimer = window.setTimeout(() => {
                if (!isAnimatingRef.current) {
                    const el = buttonRefs.current[activeRef.current];
                    if (el) {
                        setIndicator({
                            left: el.offsetLeft,
                            top: el.offsetTop,
                            width: el.offsetWidth,
                            height: el.offsetHeight
                        });
                    }
                }
                // Snap coords while still hidden, then fade back in next frame
                // so position transitions don't animate from old → new coords.
                requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                        isResizingRef.current = false;
                        setIsResizing(false);
                    });
                });
            }, TABS_RESIZE_SETTLE);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
            if (settleTimer !== undefined) window.clearTimeout(settleTimer);
        };
    }, [isAnimatingRef]);

    const handleClick = (next: T) => {
        animHandleClick(next, active);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
        const currentIdx = tabs.indexOf(active);
        let nextIdx: number | null = null;
        if (e.key === 'ArrowLeft') {
            nextIdx = currentIdx === 0 ? tabs.length - 1 : currentIdx - 1;
        } else if (e.key === 'ArrowRight') {
            nextIdx = currentIdx === tabs.length - 1 ? 0 : currentIdx + 1;
        } else if (e.key === 'Home') {
            nextIdx = 0;
        } else if (e.key === 'End') {
            nextIdx = tabs.length - 1;
        }
        if (nextIdx !== null && nextIdx !== currentIdx) {
            e.preventDefault();
            // nextIdx is always within [0, tabs.length-1] — clamped by the conditions above.
            const nextTab = tabs[nextIdx]!;
            handleClick(nextTab);
            buttonRefs.current[nextTab]?.focus();
        }
    };

    const width = indicator?.width ?? 0;
    const height = indicator?.height ?? 0;

    const { pathD, dashArray, dashOffset } = computeIndicatorPath({
        width,
        height,
        direction: animState.direction,
        expanded: animState.expanded,
        retracting: animState.retracting,
        retractMode: animState.retractMode
    });

    return (
        <div className="momentum-tabs" role="tablist">
            {tabs.map((tab) => (
                <button
                    key={tab}
                    role="tab"
                    aria-selected={active === tab}
                    tabIndex={active === tab ? 0 : -1}
                    ref={(el) => {
                        buttonRefs.current[tab] = el;
                    }}
                    onClick={() => handleClick(tab)}
                    onKeyDown={handleKeyDown}
                    className={`momentum-tab ${active === tab ? 'is-active' : ''} ${
                        active === tab && animState.wrapComplete ? 'is-frosted' : ''
                    }`}
                >
                    {tab} Projects
                </button>
            ))}
            {indicator && (
                <>
                    <span
                        aria-hidden
                        className={`momentum-tabs__underline ${isResizing ? 'is-resizing' : ''}`}
                        style={{
                            left: indicator.left,
                            top: indicator.top + height - 2,
                            width
                        }}
                    />
                    <svg
                        key={`${animState.svgTab}-${animState.direction}`}
                        aria-hidden
                        className={`momentum-tabs__perimeter ${isResizing ? 'is-resizing' : ''}`}
                        style={{
                            left: indicator.left,
                            top: indicator.top,
                            width,
                            height
                        }}
                        viewBox={`0 0 ${Math.max(width, 1)} ${Math.max(height, 1)}`}
                        preserveAspectRatio="none"
                    >
                        <defs>
                            <linearGradient id="momentumTabsGradient" x1="0" y1="0" x2="1" y2="1">
                                <stop offset="0%" stopColor="#AA367C" />
                                <stop offset="100%" stopColor="#4A2FBD" />
                            </linearGradient>
                        </defs>
                        <path
                            d={pathD}
                            fill="none"
                            stroke="url(#momentumTabsGradient)"
                            strokeWidth={2}
                            style={{
                                strokeDasharray: dashArray,
                                strokeDashoffset: dashOffset,
                                transition: `stroke-dasharray ${
                                    animState.expanded ? EXPAND_MS : SHRINK_MS
                                }ms cubic-bezier(0.4, 0, 0.2, 1), stroke-dashoffset ${
                                    animState.expanded ? EXPAND_MS : SHRINK_MS
                                }ms cubic-bezier(0.4, 0, 0.2, 1)`
                            }}
                        />
                    </svg>
                </>
            )}
        </div>
    );
};

export default MomentumTabs;
