import type { Meta } from '@storybook/react-vite';
import { useLayoutEffect, useRef, useState } from 'react';
import '../assets/styles/Projects.css';

const TABS = ['Featured', 'Client', 'Personal'] as const;
type Tab = (typeof TABS)[number];

const SectionWrap = ({ children }: { children: React.ReactNode }) => (
    <section
        className="projects"
        style={{ background: 'var(--almost-black)', padding: '3rem 1rem', minHeight: '60vh' }}
    >
        <div style={{ maxWidth: 960, margin: '0 auto' }}>{children}</div>
    </section>
);

const Placeholder = ({ tab }: { tab: Tab }) => (
    <div
        style={{
            marginTop: '2.5em',
            padding: '3em 2em',
            border: '1px dashed rgba(255,255,255,0.15)',
            borderRadius: '0.6em',
            color: 'var(--light-grey)',
            textAlign: 'center'
        }}
    >
        {tab} project grid renders here
    </div>
);

const PillFillSlidingVariant = () => {
    const [active, setActive] = useState<Tab>('Featured');
    const [indicator, setIndicator] = useState<{ left: number; width: number } | null>(null);
    const buttonRefs = useRef<Record<string, HTMLButtonElement | null>>({});
    const initializedRef = useRef(false);

    useLayoutEffect(() => {
        if (initializedRef.current) return;
        let attempts = 0;
        const tryMeasure = () => {
            if (initializedRef.current) return;
            const el = buttonRefs.current[active];
            if (el && el.offsetWidth > 0) {
                initializedRef.current = true;
                setIndicator({ left: el.offsetLeft, width: el.offsetWidth });
                return;
            }
            if (attempts++ < 5) requestAnimationFrame(tryMeasure);
        };
        tryMeasure();
    }, [active]);

    const handleClick = (tab: Tab) => {
        if (tab === active) return;
        const currentEl = buttonRefs.current[active];
        const targetEl = buttonRefs.current[tab];
        if (!currentEl || !targetEl) return;

        const currentLeft = currentEl.offsetLeft;
        const currentRight = currentLeft + currentEl.offsetWidth;
        const targetLeft = targetEl.offsetLeft;
        const targetRight = targetLeft + targetEl.offsetWidth;

        // Phase 1 — stretch: pill expands to span source+target (rubber band).
        const stretchLeft = Math.min(currentLeft, targetLeft);
        const stretchRight = Math.max(currentRight, targetRight);
        setIndicator({ left: stretchLeft, width: stretchRight - stretchLeft });
        setActive(tab);

        // Phase 2 — contract: redirect mid-stretch so the CSS transition continues
        // smoothly into the contracted target shape.
        window.setTimeout(() => {
            setIndicator({ left: targetLeft, width: targetEl.offsetWidth });
        }, 140);
    };

    return (
        <SectionWrap>
            <h3 style={{ color: 'var(--light-grey)', marginBottom: '1em' }}>
                Pill-fill rubber — gradient pill stretches across source+target then contracts to target
            </h3>
            <div
                style={{
                    position: 'relative',
                    padding: '0.4em',
                    display: 'inline-flex',
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: 50
                }}
            >
                {indicator && (
                    <span
                        aria-hidden
                        style={{
                            position: 'absolute',
                            top: '0.4em',
                            bottom: '0.4em',
                            left: indicator.left,
                            width: indicator.width,
                            background: 'linear-gradient(131deg, #AA367C 28%, #4A2FBD 71%)',
                            borderRadius: 50,
                            transition: 'left 0.28s cubic-bezier(0.4, 0, 0.2, 1), width 0.28s cubic-bezier(0.4, 0, 0.2, 1)',
                            zIndex: 0
                        }}
                    />
                )}
                {TABS.map((tab) => (
                    <button
                        key={tab}
                        ref={(el) => {
                            buttonRefs.current[tab] = el;
                        }}
                        onClick={() => handleClick(tab)}
                        style={{
                            position: 'relative',
                            zIndex: 1,
                            border: 'none',
                            background: 'transparent',
                            cursor: 'pointer',
                            padding: '0.7em 2em',
                            fontWeight: 600,
                            fontSize: 14,
                            letterSpacing: 0.6,
                            color: '#fff'
                        }}
                    >
                        {tab} Projects
                    </button>
                ))}
            </div>
            <Placeholder tab={active} />
        </SectionWrap>
    );
};

const UnderlineVariant = () => {
    const [active, setActive] = useState<Tab>('Featured');
    const [indicator, setIndicator] = useState<{ left: number; width: number } | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const buttonRefs = useRef<Record<string, HTMLButtonElement | null>>({});
    const initializedRef = useRef(false);

    // Mount-only init via ref-guard. Subsequent transitions are driven imperatively
    // by handleClick (phased stretch → contract). Retry via rAF so we don't get
    // stuck with a 0-width measurement if layout isn't settled at the first run.
    useLayoutEffect(() => {
        if (initializedRef.current) return;
        let attempts = 0;
        const tryMeasure = () => {
            if (initializedRef.current) return;
            const el = buttonRefs.current[active];
            if (el && el.offsetWidth > 0) {
                initializedRef.current = true;
                setIndicator({ left: el.offsetLeft, width: el.offsetWidth });
                return;
            }
            if (attempts++ < 5) requestAnimationFrame(tryMeasure);
        };
        tryMeasure();
    }, [active]);

    const handleClick = (tab: Tab) => {
        if (tab === active) return;
        const currentEl = buttonRefs.current[active];
        const targetEl = buttonRefs.current[tab];
        if (!currentEl || !targetEl) return;

        const currentLeft = currentEl.offsetLeft;
        const currentRight = currentLeft + currentEl.offsetWidth;
        const targetLeft = targetEl.offsetLeft;
        const targetRight = targetLeft + targetEl.offsetWidth;

        // Phase 1 — stretch: bar spans from leftmost edge to rightmost edge
        const stretchLeft = Math.min(currentLeft, targetLeft);
        const stretchRight = Math.max(currentRight, targetRight);
        setIndicator({ left: stretchLeft, width: stretchRight - stretchLeft });
        setActive(tab);

        // Phase 2 — contract to target while phase 1 is still in flight, so the
        // CSS transition redirects mid-motion and the whole thing reads as one
        // continuous stretch-then-contract instead of two discrete steps.
        window.setTimeout(() => {
            setIndicator({ left: targetLeft, width: targetEl.offsetWidth });
        }, 140);
    };

    return (
        <SectionWrap>
            <h3 style={{ color: 'var(--light-grey)', marginBottom: '1em' }}>
                Underline — bold, grey/white, stretch-and-contract slide
            </h3>
            <div
                ref={containerRef}
                style={{
                    position: 'relative',
                    display: 'flex',
                    gap: '2.5em',
                    borderBottom: '1px solid rgba(255,255,255,0.08)'
                }}
            >
                {TABS.map((tab) => {
                    const isActive = active === tab;
                    return (
                        <button
                            key={tab}
                            ref={(el) => {
                                buttonRefs.current[tab] = el;
                            }}
                            onClick={() => handleClick(tab)}
                            style={{
                                background: 'transparent',
                                border: 'none',
                                padding: '0.8em 0.2em',
                                fontSize: 16,
                                fontWeight: 700,
                                color: isActive ? '#fff' : 'var(--light-grey)',
                                cursor: 'pointer',
                                letterSpacing: 0.4,
                                transition: 'color 0.25s ease'
                            }}
                        >
                            {tab} Projects
                        </button>
                    );
                })}
                {indicator && (
                    <span
                        aria-hidden
                        style={{
                            position: 'absolute',
                            bottom: -1,
                            left: indicator.left,
                            width: indicator.width,
                            height: 2,
                            background: 'linear-gradient(131deg, #AA367C 28%, #4A2FBD 71%)',
                            transition:
                                'left 0.22s cubic-bezier(0.4, 0, 0.2, 1), width 0.22s cubic-bezier(0.4, 0, 0.2, 1)'
                        }}
                    />
                )}
            </div>
            <Placeholder tab={active} />
        </SectionWrap>
    );
};

const SHRINK_MS = 280;
const SLIDE_STRETCH_MS = 140;
const SLIDE_CONTRACT_MS = 220;
const EXPAND_MS = 700;

const MomentumTraceVariant = () => {
    const [active, setActive] = useState<Tab>('Featured');
    const [indicator, setIndicator] = useState<{
        left: number;
        top: number;
        width: number;
        height: number;
    } | null>(null);
    const [direction, setDirection] = useState<'cw' | 'ccw'>('cw');
    const [expanded, setExpanded] = useState(false);
    // Tracks whether the line is mid-retract on the source tab (tail advancing forward)
    // vs idle/wrapping on the active tab (dashoffset at start). Reset at handoff.
    const [retracting, setRetracting] = useState(false);
    // 'forward' = tail advances along wrap direction (continuing momentum, default for
    // mid-row clicks). 'reverse' = head retreats backward (used at leftmost/rightmost
    // tabs where the click direction must oppose the wrap direction — directional shift).
    const [retractMode, setRetractMode] = useState<'forward' | 'reverse'>('forward');
    const containerRef = useRef<HTMLDivElement | null>(null);
    const buttonRefs = useRef<Record<string, HTMLButtonElement | null>>({});
    const initializedRef = useRef(false);
    const transitionTimers = useRef<number[]>([]);

    const clearTimers = () => {
        transitionTimers.current.forEach((id) => window.clearTimeout(id));
        transitionTimers.current = [];
    };

    const measure = (tab: Tab) => {
        const el = buttonRefs.current[tab];
        if (!el) return null;
        return {
            left: el.offsetLeft,
            top: el.offsetTop,
            width: el.offsetWidth,
            height: el.offsetHeight
        };
    };

    useLayoutEffect(() => {
        if (initializedRef.current) return;
        let attempts = 0;
        const tryMeasure = () => {
            if (initializedRef.current) return;
            const m = measure(active);
            if (m && m.width > 0) {
                initializedRef.current = true;
                 
                setIndicator(m);
                // Next frame so the SVG renders at 0-visible before the expand transition kicks in.
                const t = window.setTimeout(() => setExpanded(true), 50);
                transitionTimers.current.push(t);
                return;
            }
            if (attempts++ < 5) requestAnimationFrame(tryMeasure);
        };
        tryMeasure();
    }, [active]);

    const handleClick = (next: Tab) => {
        if (next === active) return;
        clearTimers();
        const sourceIdx = TABS.indexOf(active);
        const targetIdx = TABS.indexOf(next);
        const dir = targetIdx > sourceIdx ? 'cw' : 'ccw';

        // Phase 1 — perimeter retracts. If the new click direction differs from the
        // previous direction (`direction` state still holds the prior value here),
        // there's a directional shift — retract in reverse (head retreats backward,
        // line unwinds back to where it started). Otherwise the click continues prior
        // momentum — retract forward (tail advances).
        const isShift = dir !== direction;
        setRetractMode(isShift ? 'reverse' : 'forward');
        setRetracting(true);
        setExpanded(false);

        // Phase 2 — stretch: underline span expands to span source+target.
        const t1 = window.setTimeout(() => {
            const sourceEl = buttonRefs.current[active];
            const targetEl = buttonRefs.current[next];
            if (!sourceEl || !targetEl) return;
            const stretchLeft = Math.min(sourceEl.offsetLeft, targetEl.offsetLeft);
            const stretchRight = Math.max(
                sourceEl.offsetLeft + sourceEl.offsetWidth,
                targetEl.offsetLeft + targetEl.offsetWidth
            );
            setIndicator({
                left: stretchLeft,
                top: sourceEl.offsetTop,
                width: stretchRight - stretchLeft,
                height: sourceEl.offsetHeight
            });
        }, SHRINK_MS);

        // Phase 3 — contract: underline contracts to just target. Also handoff:
        // active+direction switch triggers SVG remount (key bump). Reset retracting
        // so the new SVG mounts with dashoffset=0 → wrap will extend forward from
        // the leading corner instead of growing from the path end.
        const t2 = window.setTimeout(() => {
            const targetEl = buttonRefs.current[next];
            if (!targetEl) return;
            setActive(next);
            setDirection(dir);
            setRetracting(false);
            setIndicator({
                left: targetEl.offsetLeft,
                top: targetEl.offsetTop,
                width: targetEl.offsetWidth,
                height: targetEl.offsetHeight
            });
        }, SHRINK_MS + SLIDE_STRETCH_MS);

        // Phase 4: 3-edge SVG wraps target in new direction.
        const t3 = window.setTimeout(() => {
            setExpanded(true);
        }, SHRINK_MS + SLIDE_STRETCH_MS + SLIDE_CONTRACT_MS);

        transitionTimers.current.push(t1, t2, t3);
    };

    const width = indicator?.width ?? 0;
    const height = indicator?.height ?? 0;
    // SVG path = right + top + left edges only (NO bottom — that's the underline span).
    // cw: bottom-right → top-right → top-left → bottom-left (continues clockwise after underline).
    // ccw: bottom-left → top-left → top-right → bottom-right (continues counter-clockwise after underline).
    const sideLength = 2 * height + width;
    const pathD =
        direction === 'cw'
            ? `M ${width} ${height} L ${width} 0 L 0 0 L 0 ${height}`
            : `M 0 ${height} L 0 0 L ${width} 0 L ${width} ${height}`;
    // Forward-momentum retract: when expanded=false, dashoffset = -sideLength shifts
    // the visible window forward past the path end (so tail "catches up" to head along
    // the wrap direction instead of head retreating backward).
    const dashArray = expanded
        ? `${sideLength} 0`
        : `0 ${Math.max(sideLength, 1)}`;
    // Dashoffset only shifts forward during a forward retract (tail advances). For
    // reverse retract (head retreats — used at edge tabs), dashoffset stays 0 and the
    // dasharray transition alone shrinks the visible window from the end. After handoff
    // (retracting=false), dashoffset resets to 0 so the next wrap extends from the
    // leading corner of the underline.
    const dashOffset = retracting && retractMode === 'forward' ? -sideLength : 0;

    return (
        <SectionWrap>
            <h3 style={{ color: 'var(--light-grey)', marginBottom: '1em' }}>
                Momentum trace — rubber underline slide + directional perimeter wrap; forward retract on continued momentum, reverse retract on directional shift
            </h3>
            <div
                ref={containerRef}
                style={{
                    position: 'relative',
                    display: 'flex',
                    gap: '2.5em',
                    borderBottom: '1px solid rgba(255,255,255,0.08)'
                }}
            >
                {TABS.map((tab) => (
                    <button
                        key={tab}
                        ref={(el) => {
                            buttonRefs.current[tab] = el;
                        }}
                        onClick={() => handleClick(tab)}
                        style={{
                            background: 'transparent',
                            border: 'none',
                            padding: '0.8em 1.4em',
                            fontSize: 16,
                            fontWeight: 700,
                            color: active === tab ? '#fff' : 'var(--light-grey)',
                            cursor: 'pointer',
                            letterSpacing: 0.4,
                            transition: 'color 0.25s ease'
                        }}
                    >
                        {tab} Projects
                    </button>
                ))}
                {indicator && (
                    <>
                        {/* Underline span — base-Underline behavior. Slides between tabs
                            via stretch+contract by following indicator. */}
                        <span
                            aria-hidden
                            style={{
                                position: 'absolute',
                                left: indicator.left,
                                top: indicator.top + height - 2,
                                width,
                                height: 2,
                                background: 'linear-gradient(131deg, #AA367C 28%, #4A2FBD 71%)',
                                transition: `left ${SLIDE_CONTRACT_MS}ms cubic-bezier(0.4, 0, 0.2, 1), top ${SLIDE_CONTRACT_MS}ms cubic-bezier(0.4, 0, 0.2, 1), width ${SLIDE_CONTRACT_MS}ms cubic-bezier(0.4, 0, 0.2, 1)`,
                                pointerEvents: 'none'
                            }}
                        />
                        {/* 3-edge SVG — right + top + left only. Keyed by direction so it
                            remounts cleanly on direction change, discarding any in-flight
                            transition and starting fresh in the new traversal. */}
                        <svg
                            key={`${active}-${direction}`}
                            aria-hidden
                            style={{
                                position: 'absolute',
                                left: indicator.left,
                                top: indicator.top,
                                width,
                                height,
                                overflow: 'visible',
                                pointerEvents: 'none',
                                transition: `left ${SLIDE_CONTRACT_MS}ms cubic-bezier(0.4, 0, 0.2, 1), top ${SLIDE_CONTRACT_MS}ms cubic-bezier(0.4, 0, 0.2, 1), width ${SLIDE_CONTRACT_MS}ms cubic-bezier(0.4, 0, 0.2, 1), height ${SLIDE_CONTRACT_MS}ms cubic-bezier(0.4, 0, 0.2, 1)`
                            }}
                            viewBox={`0 0 ${Math.max(width, 1)} ${Math.max(height, 1)}`}
                            preserveAspectRatio="none"
                        >
                            <defs>
                                <linearGradient id="ptGradient" x1="0" y1="0" x2="1" y2="1">
                                    <stop offset="0%" stopColor="#AA367C" />
                                    <stop offset="100%" stopColor="#4A2FBD" />
                                </linearGradient>
                            </defs>
                            <path
                                d={pathD}
                                fill="none"
                                stroke="url(#ptGradient)"
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
            <Placeholder tab={active} />
        </SectionWrap>
    );
};

const BIG_TEXT_TABS = ['Client', 'Featured', 'Personal'] as const;
type BigTextTab = (typeof BIG_TEXT_TABS)[number];

const BigTextVariant = () => {
    const [active, setActive] = useState<BigTextTab>('Featured');
    const cascadeTimers = useRef<number[]>([]);

    const handleClick = (target: BigTextTab) => {
        if (target === active) return;
        cascadeTimers.current.forEach((id) => window.clearTimeout(id));
        cascadeTimers.current = [];

        const sourceIdx = BIG_TEXT_TABS.indexOf(active);
        const targetIdx = BIG_TEXT_TABS.indexOf(target);
        const step = targetIdx > sourceIdx ? 1 : -1;
        const stepDelay = 180;

        let delay = 0;
        for (let i = sourceIdx + step; step > 0 ? i <= targetIdx : i >= targetIdx; i += step) {
            const tab = BIG_TEXT_TABS[i];
            const t = window.setTimeout(() => setActive(tab), delay);
            cascadeTimers.current.push(t);
            delay += stepDelay;
        }
    };

    return (
        <SectionWrap>
            <h3 style={{ color: 'var(--light-grey)', marginBottom: '1em' }}>
                Big-text — Featured centered, activation cascades through intermediate tabs
            </h3>
            <div
                style={{
                    display: 'flex',
                    gap: '1.5em',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: 48
                }}
            >
                {BIG_TEXT_TABS.map((tab) => {
                    const isActive = active === tab;
                    return (
                        <button
                            key={tab}
                            onClick={() => handleClick(tab)}
                            style={{
                                background: 'transparent',
                                border: 'none',
                                padding: 0,
                                lineHeight: '48px',
                                fontSize: isActive ? 32 : 28,
                                fontWeight: isActive ? 800 : 500,
                                color: isActive ? 'transparent' : 'rgba(255,255,255,0.35)',
                                backgroundImage: isActive
                                    ? 'linear-gradient(131deg, #AA367C 28%, #4A2FBD 71%)'
                                    : 'none',
                                WebkitBackgroundClip: isActive ? 'text' : 'unset',
                                backgroundClip: isActive ? 'text' : 'unset',
                                cursor: 'pointer',
                                transition: 'font-size 0.25s ease, font-weight 0.25s ease, color 0.25s ease'
                            }}
                        >
                            {tab}
                        </button>
                    );
                })}
            </div>
            <Placeholder tab={active} />
        </SectionWrap>
    );
};

const StackedSectionsVariant = () => (
    <SectionWrap>
        <h3 style={{ color: 'var(--light-grey)', marginBottom: '1em' }}>
            No tabs — stacked sections (everything visible, no clicking)
        </h3>
        {TABS.map((tab) => (
            <div key={tab} style={{ marginBottom: '3em' }}>
                <h2
                    style={{
                        fontSize: 22,
                        fontWeight: 700,
                        color: '#fff',
                        margin: '0 0 0.4em',
                        paddingBottom: '0.4em',
                        borderBottom: '1px solid rgba(255,255,255,0.08)'
                    }}
                >
                    {tab}
                </h2>
                <Placeholder tab={tab} />
            </div>
        ))}
    </SectionWrap>
);

const meta: Meta = {
    title: 'Design Iterations/ProjectTabs',
    parameters: { layout: 'fullscreen', docs: { description: { component: "Five tab-indicator approaches compared side by side before MomentumTabs (the perimeter-trace approach) won." } } },
    /* Each variant relies on useLayoutEffect to measure tab buttons and
       paint the active indicator. When Storybook switches between variants
       in this same file, React reuses the subtree and the measurement
       effect doesn't re-run, so the indicator is missing until a refresh.
       Keying the wrapper on the story id forces a fresh mount per story. */
    decorators: [
        (Story, ctx) => <div key={ctx.id}><Story /></div>
    ]
};
export default meta;

export const PillFillSliding = { render: () => <PillFillSlidingVariant /> };
export const Underline = { render: () => <UnderlineVariant /> };
export const MomentumTrace = { render: () => <MomentumTraceVariant /> };
export const BigTextMinimal = { render: () => <BigTextVariant /> };
export const NoTabsStackedSections = { render: () => <StackedSectionsVariant /> };
