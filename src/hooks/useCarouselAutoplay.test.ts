import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, act } from '@testing-library/react';
import React from 'react';
import useCarouselAutoplay, { type UseCarouselAutoplayOptions, type UseCarouselAutoplayReturn } from './useCarouselAutoplay';

// ── IntersectionObserver test double ─────────────────────────────────────────
// setupTests.ts provides a no-op mock that fires isIntersecting: true on observe.
// These unit tests need a controllable version that lets us fire arbitrary
// entries and inspect disconnect calls.

type IOCallback = (entries: IntersectionObserverEntry[]) => void;

let lastIOCallback: IOCallback | null = null;
let observeSpy: ReturnType<typeof vi.fn>;
let disconnectSpy: ReturnType<typeof vi.fn>;

function makeEntry(isIntersecting: boolean): IntersectionObserverEntry {
    return { isIntersecting } as IntersectionObserverEntry;
}

function fireIO(isIntersecting: boolean) {
    lastIOCallback?.([makeEntry(isIntersecting)]);
}

beforeEach(() => {
    lastIOCallback = null;
    observeSpy = vi.fn();
    disconnectSpy = vi.fn();

    global.IntersectionObserver = class {
        constructor(cb: IOCallback) {
            lastIOCallback = cb;
        }
        observe = observeSpy;
        unobserve = vi.fn();
        disconnect = disconnectSpy;
        takeRecords = () => [];
        root = null;
        rootMargin = '';
        thresholds = [];
        scrollMargin = '';
    } as unknown as typeof IntersectionObserver;

    vi.useFakeTimers();
});

afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
});

// ── Harness component ─────────────────────────────────────────────────────────
// Renders a real div so the hook's `ref.current` is a DOM element — needed
// for the IO effect to run (it guards on `if (!el) return`).

type HarnessProps = UseCarouselAutoplayOptions & {
    onResult: (r: UseCarouselAutoplayReturn) => void;
};

function Harness({ onResult, ...opts }: HarnessProps) {
    const result = useCarouselAutoplay(opts);
    onResult(result);
    return React.createElement('div', { ref: result.ref });
}

// ── Default options factory ───────────────────────────────────────────────────

function makeOptions(overrides: Partial<UseCarouselAutoplayOptions> = {}): UseCarouselAutoplayOptions {
    return {
        totalSlides: 3,
        activeIndex: 0,
        intervalMs: 1000,
        indicator: 'frosted-dots',
        paused: false,
        onAdvance: vi.fn(),
        ...overrides
    };
}

// ── Initial state ─────────────────────────────────────────────────────────────

describe('useCarouselAutoplay — initial state', () => {
    test('progress starts at 0', () => {
        const results: UseCarouselAutoplayReturn[] = [];
        render(React.createElement(Harness, { ...makeOptions(), onResult: (r) => results.push(r) }));
        expect(results[0]!.progress).toBe(0);
    });

    test('ref is returned as a ref object', () => {
        const results: UseCarouselAutoplayReturn[] = [];
        render(React.createElement(Harness, { ...makeOptions(), onResult: (r) => results.push(r) }));
        expect(results[0]!.ref).toBeDefined();
        expect(typeof results[0]!.ref).toBe('object');
    });
});

// ── setTimeout path: advances at configured interval ─────────────────────────

describe('useCarouselAutoplay — setTimeout path (non-segmented-progress indicators)', () => {
    test('calls onAdvance after intervalMs when on-screen and unpaused', () => {
        const onAdvance = vi.fn();
        render(React.createElement(Harness, { ...makeOptions({ onAdvance }), onResult: () => {} }));

        // IO fires as soon as observe() is called in the effect.
        // Simulate the element being visible.
        act(() => { fireIO(true); });
        expect(onAdvance).not.toHaveBeenCalled();

        act(() => { vi.advanceTimersByTime(1000); });
        expect(onAdvance).toHaveBeenCalledTimes(1);
    });

    test('does NOT advance while explicitly paused', () => {
        const onAdvance = vi.fn();
        render(React.createElement(Harness, { ...makeOptions({ onAdvance, paused: true }), onResult: () => {} }));

        act(() => { fireIO(true); });
        act(() => { vi.advanceTimersByTime(2000); });

        expect(onAdvance).not.toHaveBeenCalled();
    });

    test('does NOT advance while offScreen (no IO fired yet)', () => {
        const onAdvance = vi.fn();
        render(React.createElement(Harness, { ...makeOptions({ onAdvance }), onResult: () => {} }));

        // IO has been set up but hasn't fired — offScreen defaults to true.
        act(() => { vi.advanceTimersByTime(2000); });
        expect(onAdvance).not.toHaveBeenCalled();
    });

    test('does NOT advance when offScreen fires with isIntersecting: false', () => {
        const onAdvance = vi.fn();
        render(React.createElement(Harness, { ...makeOptions({ onAdvance }), onResult: () => {} }));

        act(() => { fireIO(false); });
        act(() => { vi.advanceTimersByTime(2000); });

        expect(onAdvance).not.toHaveBeenCalled();
    });

    test('resumes advancing after coming back on-screen', () => {
        const onAdvance = vi.fn();
        render(React.createElement(Harness, { ...makeOptions({ onAdvance }), onResult: () => {} }));

        // Go off-screen then come back on
        act(() => { fireIO(false); });
        act(() => { vi.advanceTimersByTime(1000); });
        expect(onAdvance).not.toHaveBeenCalled();

        act(() => { fireIO(true); });
        act(() => { vi.advanceTimersByTime(1000); });
        expect(onAdvance).toHaveBeenCalledTimes(1);
    });

    test('does NOT advance when totalSlides <= 1', () => {
        const onAdvance = vi.fn();
        render(React.createElement(Harness, { ...makeOptions({ onAdvance, totalSlides: 1 }), onResult: () => {} }));

        act(() => { fireIO(true); });
        act(() => { vi.advanceTimersByTime(2000); });
        expect(onAdvance).not.toHaveBeenCalled();
    });

    test('resumes after unpausing', () => {
        const onAdvance = vi.fn();
        const opts = makeOptions({ onAdvance, paused: true });
        const { rerender } = render(React.createElement(Harness, { ...opts, onResult: () => {} }));

        act(() => { fireIO(true); });
        act(() => { vi.advanceTimersByTime(1000); });
        expect(onAdvance).not.toHaveBeenCalled();

        const opts2 = makeOptions({ onAdvance, paused: false });
        rerender(React.createElement(Harness, { ...opts2, onResult: () => {} }));
        act(() => { vi.advanceTimersByTime(1000); });
        expect(onAdvance).toHaveBeenCalledTimes(1);
    });
});

// ── Cleanup on unmount ────────────────────────────────────────────────────────

describe('useCarouselAutoplay — cleanup on unmount', () => {
    test('clears the pending setTimeout on unmount', () => {
        const clearTimeoutSpy = vi.spyOn(window, 'clearTimeout');
        const { unmount } = render(React.createElement(Harness, { ...makeOptions(), onResult: () => {} }));

        act(() => { fireIO(true); });
        act(() => { unmount(); });

        expect(clearTimeoutSpy).toHaveBeenCalled();
    });

    test('disconnects IntersectionObserver on unmount', () => {
        const { unmount } = render(React.createElement(Harness, { ...makeOptions(), onResult: () => {} }));

        act(() => { unmount(); });

        expect(disconnectSpy).toHaveBeenCalledTimes(1);
    });

    test('timer does not fire after unmount', () => {
        const onAdvance = vi.fn();
        const { unmount } = render(React.createElement(Harness, { ...makeOptions({ onAdvance }), onResult: () => {} }));

        act(() => { fireIO(true); });
        act(() => { unmount(); });
        act(() => { vi.advanceTimersByTime(2000); });

        expect(onAdvance).not.toHaveBeenCalled();
    });
});

// ── activeIndex change resets progress ───────────────────────────────────────

describe('useCarouselAutoplay — activeIndex change', () => {
    test('progress resets to 0 when activeIndex changes', () => {
        const results: UseCarouselAutoplayReturn[] = [];
        const opts = makeOptions({ activeIndex: 0, indicator: 'segmented-progress' });
        const { rerender } = render(React.createElement(Harness, { ...opts, onResult: (r) => results.push(r) }));

        rerender(React.createElement(Harness, {
            ...makeOptions({ activeIndex: 1, indicator: 'segmented-progress' }),
            onResult: (r) => results.push(r)
        }));

        // Last recorded progress after the index change should be 0
        const last = results[results.length - 1];
        expect(last!.progress).toBe(0);
    });
});

// ── offScreen toggle preserves state ─────────────────────────────────────────

describe('useCarouselAutoplay — offScreen / onScreen toggle', () => {
    test('going off-screen stops advancing', () => {
        const onAdvance = vi.fn();
        render(React.createElement(Harness, { ...makeOptions({ onAdvance }), onResult: () => {} }));

        act(() => { fireIO(true); });
        act(() => { vi.advanceTimersByTime(500); }); // halfway through
        act(() => { fireIO(false); });               // go off-screen
        act(() => { vi.advanceTimersByTime(2000); });

        // At most 1 advance (the 500ms timer may have already been set but
        // won't re-queue after going off-screen).
        expect(onAdvance.mock.calls.length).toBeLessThanOrEqual(1);
    });
});
