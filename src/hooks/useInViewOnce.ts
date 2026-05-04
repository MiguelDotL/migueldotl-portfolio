import { useState, useCallback } from 'react';
import type { RefCallback } from 'react';

/**
 * Fires once when the attached element enters the viewport, then disconnects.
 * Returns a callback ref (not a ref object) to avoid needing a useEffect to
 * observe: the callback fires on mount, letting the hook wire up the IO
 * immediately without a separate effect.
 *
 * Usage:
 *   const { ref, inView } = useInViewOnce<HTMLDivElement>();
 *   return <div ref={ref} className={inView ? 'visible' : ''} />;
 */
function useInViewOnce<T extends Element>(): { ref: RefCallback<T>; inView: boolean } {
    const [inView, setInView] = useState(false);

    const ref: RefCallback<T> = useCallback((el) => {
        if (!el) return;

        // SSR / old test envs without IO — immediately treat as in-view.
        if (typeof IntersectionObserver === 'undefined') {
            setInView(true);
            return;
        }

        const io = new IntersectionObserver(([entry]) => {
            // entry is always present — IO fires at least one per observed element.
            if (entry?.isIntersecting) {
                setInView(true);
                io.disconnect();
            }
        });

        io.observe(el);

        // No cleanup returned from a RefCallback — the IO is disconnected on
        // first intersection, so it self-cleans. If the element unmounts before
        // it enters the viewport the IO is GC'd with it.
    }, []);

    return { ref, inView };
}

export default useInViewOnce;
