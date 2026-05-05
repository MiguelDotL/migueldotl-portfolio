import { useState, useRef, useEffect, type RefObject } from 'react';

/**
 * Tracks the scrollHeight of an element via ResizeObserver and returns it as
 * `height`. The shell container uses `height` as its inline style combined with
 * `overflow: hidden` + a CSS `transition: height` so that tab-content swaps grow
 * or shrink the section fluidly instead of snapping.
 *
 * `deps` — when any value changes, the ResizeObserver is torn down and
 * re-attached. Pass values that indicate content has changed (e.g.
 * `[displayedTab]`) so the height re-measures after a tab swap.
 *
 * Usage:
 *   const { ref, height } = useHeightTransition<HTMLDivElement>([displayedTab]);
 *   return (
 *     <div className="shell" style={height !== null ? { height } : undefined}>
 *       <div ref={ref}>…content…</div>
 *     </div>
 *   );
 */
function useHeightTransition<T extends HTMLElement>(
    deps: ReadonlyArray<unknown>
): { ref: RefObject<T | null>; height: number | null } {
    const ref = useRef<T>(null);
    const [height, setHeight] = useState<number | null>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const ro = new ResizeObserver(() => {
            if (ref.current) {
                setHeight(ref.current.scrollHeight);
            }
        });

        ro.observe(el);

        return () => ro.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps);

    return { ref, height };
}

export default useHeightTransition;
