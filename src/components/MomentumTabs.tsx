import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import '../assets/styles/MomentumTabs.css';

const SHRINK_MS = 280;
const SLIDE_STRETCH_MS = 140;
const SLIDE_CONTRACT_MS = 220;
const EXPAND_MS = 700;

type MomentumTabsProps<T extends string> = {
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
    const [indicator, setIndicator] = useState<{
        left: number;
        top: number;
        width: number;
        height: number;
    } | null>(null);
    const [direction, setDirection] = useState<'cw' | 'ccw'>('cw');
    const [expanded, setExpanded] = useState(false);
    const [retracting, setRetracting] = useState(false);
    const [retractMode, setRetractMode] = useState<'forward' | 'reverse'>('forward');
    // Tracks which tab the SVG is currently positioned on for animation purposes.
    // Decoupled from `active` so that active updates immediately on click (ARIA,
    // color), while the SVG only remounts at handoff time (after retract completes).
    const [svgTab, setSvgTab] = useState<T>(active);
    // True only when the perimeter trace has fully wrapped the active tab.
    // Drives the frosted-glass tab background — appears after wrap completes,
    // hides immediately on click while the line retracts/slides/re-wraps.
    const [wrapComplete, setWrapComplete] = useState(false);
    const buttonRefs = useRef<Record<string, HTMLButtonElement | null>>({});
    const initializedRef = useRef(false);
    const expandKickedRef = useRef(false);
    const transitionTimers = useRef<number[]>([]);
    // Set while a tab-switch or initial-wrap animation is in flight so the
    // resize listener doesn't overwrite mid-animation indicator coords.
    const isAnimatingRef = useRef(false);
    // Fade the perimeter/underline out during resize and back in once resize
    // settles, hiding the brief jump when indicator coords snap to new layout.
    const [isResizing, setIsResizing] = useState(false);
    // Mirror of `isResizing` accessible synchronously inside the resize handler
    // so we only fire setState once per resize session, not on every tick.
    const isResizingRef = useRef(false);

    const clearTimers = () => {
        transitionTimers.current.forEach((id) => window.clearTimeout(id));
        transitionTimers.current = [];
    };

    useLayoutEffect(() => {
        if (initializedRef.current) return;
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
    }, [active]);

    // Initial wrap animation. Held until `enabled` flips to true (so the section
    // can defer it until scrolled into view). Fires exactly once.
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

    // Keep the indicator pinned to the active tab when the viewport resizes.
    // Fade out on first resize tick (gated by ref so setState fires once per
    // session, not per tick), re-measure + fade back in once resize idles.
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
                    const el = buttonRefs.current[active];
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
            }, 450);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
            if (settleTimer !== undefined) window.clearTimeout(settleTimer);
        };
    }, [active]);

    const handleClick = (next: T) => {
        if (next === active) return;
        clearTimers();
        isAnimatingRef.current = true;
        const sourceEl = buttonRefs.current[active];
        const targetEl = buttonRefs.current[next];
        if (!sourceEl || !targetEl) return;

        // Snapshot source + target measurements at click time so the animation isn't
        // affected by the immediate `active` prop change.
        const sourceBox = {
            left: sourceEl.offsetLeft,
            top: sourceEl.offsetTop,
            width: sourceEl.offsetWidth,
            height: sourceEl.offsetHeight
        };
        const targetBox = {
            left: targetEl.offsetLeft,
            top: targetEl.offsetTop,
            width: targetEl.offsetWidth,
            height: targetEl.offsetHeight
        };

        const sourceIdx = tabs.indexOf(active);
        const targetIdx = tabs.indexOf(next);
        const dir = targetIdx > sourceIdx ? 'cw' : 'ccw';
        const isShift = dir !== direction;

        // Notify parent immediately so ARIA + visual color update without delay.
        onChange(next);
        setWrapComplete(false);
        setRetractMode(isShift ? 'reverse' : 'forward');
        setRetracting(true);
        setExpanded(false);

        const t1 = window.setTimeout(() => {
            const stretchLeft = Math.min(sourceBox.left, targetBox.left);
            const stretchRight = Math.max(
                sourceBox.left + sourceBox.width,
                targetBox.left + targetBox.width
            );
            setIndicator({
                left: stretchLeft,
                top: sourceBox.top,
                width: stretchRight - stretchLeft,
                height: sourceBox.height
            });
        }, SHRINK_MS);

        const t2 = window.setTimeout(() => {
            setSvgTab(next);
            setDirection(dir);
            setRetracting(false);
            setIndicator(targetBox);
        }, SHRINK_MS + SLIDE_STRETCH_MS);

        const t3 = window.setTimeout(() => {
            setExpanded(true);
        }, SHRINK_MS + SLIDE_STRETCH_MS + SLIDE_CONTRACT_MS);

        const t4 = window.setTimeout(() => {
            setWrapComplete(true);
            isAnimatingRef.current = false;
        }, SHRINK_MS + SLIDE_STRETCH_MS + SLIDE_CONTRACT_MS + EXPAND_MS);

        transitionTimers.current.push(t1, t2, t3, t4);
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
            const nextTab = tabs[nextIdx];
            handleClick(nextTab);
            buttonRefs.current[nextTab]?.focus();
        }
    };

    const width = indicator?.width ?? 0;
    const height = indicator?.height ?? 0;
    const sideLength = 2 * height + width;
    const pathD =
        direction === 'cw'
            ? `M ${width} ${height} L ${width} 0 L 0 0 L 0 ${height}`
            : `M 0 ${height} L 0 0 L ${width} 0 L ${width} ${height}`;
    const dashArray = expanded
        ? `${sideLength} 0`
        : `0 ${Math.max(sideLength, 1)}`;
    const dashOffset = retracting && retractMode === 'forward' ? -sideLength : 0;

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
                        active === tab && wrapComplete ? 'is-frosted' : ''
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
                        key={`${svgTab}-${direction}`}
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
                                    expanded ? EXPAND_MS : SHRINK_MS
                                }ms cubic-bezier(0.4, 0, 0.2, 1), stroke-dashoffset ${
                                    expanded ? EXPAND_MS : SHRINK_MS
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
