import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, act } from '@testing-library/react';
import React from 'react';
import useHeightTransition from './useHeightTransition';

// ── ResizeObserver test double ────────────────────────────────────────────────
// setupTests.ts provides a no-op ResizeObserverMock for rendering tests. These
// unit tests need a controllable version that fires the callback and lets us
// inspect observe/disconnect calls.

type ResizeCallback = (entries: ResizeObserverEntry[]) => void;

let lastCallback: ResizeCallback | null = null;
let observeSpy: ReturnType<typeof vi.fn>;
let disconnectSpy: ReturnType<typeof vi.fn>;

function fireResize() {
    lastCallback?.([]);
}

beforeEach(() => {
    lastCallback = null;
    observeSpy = vi.fn();
    disconnectSpy = vi.fn();

    global.ResizeObserver = class {
        constructor(cb: ResizeCallback) {
            lastCallback = cb;
        }
        observe = observeSpy;
        unobserve = vi.fn();
        disconnect = disconnectSpy;
    } as unknown as typeof ResizeObserver;
});

afterEach(() => {
    vi.restoreAllMocks();
});

// ── Helper: simple consumer component ────────────────────────────────────────

interface HarnessProps {
    deps: ReadonlyArray<unknown>;
    onHeight: (h: number | null) => void;
}

function Harness({ deps, onHeight }: HarnessProps) {
    const { ref, height } = useHeightTransition<HTMLDivElement>(deps);
    onHeight(height);
    return React.createElement('div', { ref, style: { scrollHeight: 300 } }, 'content');
}

// ── Tests ─────────────────────────────────────────────────────────────────────

describe('useHeightTransition — initial state', () => {
    test('height starts null before any resize event fires', () => {
        const heights: (number | null)[] = [];
        render(React.createElement(Harness, { deps: [], onHeight: (h) => heights.push(h) }));
        // First render: height is null
        expect(heights[0]).toBeNull();
    });
});

describe('useHeightTransition — resize updates height', () => {
    test('height updates when ResizeObserver fires', () => {
        const heights: (number | null)[] = [];
        render(React.createElement(Harness, { deps: [], onHeight: (h) => heights.push(h) }));

        // Simulate ResizeObserver firing — ref.current.scrollHeight will be 0
        // in jsdom (it doesn't do layout), but we verify the state update path runs
        act(() => {
            fireResize();
        });

        // Last recorded height should be a number (0 from jsdom, not null)
        const lastHeight = heights[heights.length - 1];
        expect(typeof lastHeight).toBe('number');
    });

    test('height is a number (not null) after the first resize event', () => {
        let capturedHeight: number | null = null;
        const { rerender } = render(
            React.createElement(Harness, { deps: [], onHeight: (h) => { capturedHeight = h; } })
        );

        act(() => { fireResize(); });
        rerender(React.createElement(Harness, { deps: [], onHeight: (h) => { capturedHeight = h; } }));

        expect(capturedHeight).not.toBeNull();
    });
});

describe('useHeightTransition — deps change re-attaches observer', () => {
    test('disconnects and re-creates observer when deps change', () => {
        // Render with dep = 'Featured'
        const { rerender } = render(
            React.createElement(Harness, { deps: ['Featured'], onHeight: () => {} })
        );

        // The initial observe is called once on mount
        expect(observeSpy).toHaveBeenCalledTimes(1);

        // Change dep → effect cleanup + re-run
        rerender(React.createElement(Harness, { deps: ['Client'], onHeight: () => {} }));

        // disconnect called once (cleanup of previous effect), observe called again
        expect(disconnectSpy).toHaveBeenCalledTimes(1);
        expect(observeSpy).toHaveBeenCalledTimes(2);
    });

    test('does NOT reconnect when same deps are passed', () => {
        const { rerender } = render(
            React.createElement(Harness, { deps: ['Featured'], onHeight: () => {} })
        );

        expect(observeSpy).toHaveBeenCalledTimes(1);

        // Same dep value — effect should not re-run
        rerender(React.createElement(Harness, { deps: ['Featured'], onHeight: () => {} }));

        expect(disconnectSpy).toHaveBeenCalledTimes(0);
        expect(observeSpy).toHaveBeenCalledTimes(1);
    });
});

describe('useHeightTransition — cleanup on unmount', () => {
    test('disconnects ResizeObserver on unmount', () => {
        const { unmount } = render(
            React.createElement(Harness, { deps: [], onHeight: () => {} })
        );

        unmount();
        expect(disconnectSpy).toHaveBeenCalledTimes(1);
    });
});
