import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import React from 'react';
import useTabAnimation, { type UseTabAnimationOptions, type IndicatorBox } from './useTabAnimation';
import { TAB_ANIMATION } from '../components/projectsTabAnimation';

const SHRINK_MS = TAB_ANIMATION.indicatorShrinkMs;
const SLIDE_STRETCH_MS = TAB_ANIMATION.indicatorSlideStretchMs;
const SLIDE_CONTRACT_MS = TAB_ANIMATION.indicatorSlideContractMs;
const EXPAND_MS = TAB_ANIMATION.indicatorExpandMs;

const TABS = ['Client', 'Featured', 'Personal'] as const;

// Box geometry helpers
const makeBox = (left: number): IndicatorBox => ({ left, top: 0, width: 100, height: 40 });

// Create a DOM button stub that reports offsetLeft etc. (jsdom doesn't do layout,
// so we manually assign the properties to simulate measured DOM elements).
function makeButtonEl(left: number, width = 100): HTMLButtonElement {
    const el = document.createElement('button');
    Object.defineProperty(el, 'offsetLeft', { value: left, configurable: true });
    Object.defineProperty(el, 'offsetTop', { value: 0, configurable: true });
    Object.defineProperty(el, 'offsetWidth', { value: width, configurable: true });
    Object.defineProperty(el, 'offsetHeight', { value: 40, configurable: true });
    return el;
}

function makeButtonRefs(): React.MutableRefObject<Record<string, HTMLButtonElement | null>> {
    return {
        current: {
            Client: makeButtonEl(0),
            Featured: makeButtonEl(110),
            Personal: makeButtonEl(220)
        }
    };
}

function makeOptions(
    overrides: Partial<UseTabAnimationOptions> = {}
): UseTabAnimationOptions {
    const onChange = vi.fn();
    const onIndicatorChange = vi.fn();
    return {
        enabled: true,
        indicator: makeBox(110),
        tabs: TABS,
        buttonRefs: makeButtonRefs(),
        onChange,
        onIndicatorChange,
        ...overrides
    };
}

beforeEach(() => {
    vi.useFakeTimers();
});

afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
});

// ── Initial state ─────────────────────────────────────────────────────────────

describe('useTabAnimation — initial state', () => {
    test('svgTab matches the initial activeTab', () => {
        const { result } = renderHook(() =>
            useTabAnimation('Featured', makeOptions())
        );
        expect(result.current.animState.svgTab).toBe('Featured');
    });

    test('expanded is false before the initial-wrap timers fire', () => {
        const { result } = renderHook(() =>
            useTabAnimation('Featured', makeOptions())
        );
        // 80ms initial wrap timer has not fired yet
        expect(result.current.animState.expanded).toBe(false);
    });

    test('wrapComplete is false before the initial-wrap completes', () => {
        const { result } = renderHook(() =>
            useTabAnimation('Featured', makeOptions())
        );
        expect(result.current.animState.wrapComplete).toBe(false);
    });

    test('isAnimatingRef is true immediately after mount (initial wrap in flight)', () => {
        const { result } = renderHook(() =>
            useTabAnimation('Featured', makeOptions())
        );
        expect(result.current.isAnimatingRef.current).toBe(true);
    });
});

// ── Initial wrap animation ────────────────────────────────────────────────────

describe('useTabAnimation — initial wrap animation', () => {
    test('expanded becomes true after 80ms', () => {
        const { result } = renderHook(() =>
            useTabAnimation('Featured', makeOptions())
        );
        act(() => { vi.advanceTimersByTime(80); });
        expect(result.current.animState.expanded).toBe(true);
    });

    test('wrapComplete becomes true after 80 + EXPAND_MS', () => {
        const { result } = renderHook(() =>
            useTabAnimation('Featured', makeOptions())
        );
        act(() => { vi.advanceTimersByTime(80 + EXPAND_MS); });
        expect(result.current.animState.wrapComplete).toBe(true);
    });

    test('isAnimatingRef resets to false after wrap completes', () => {
        const { result } = renderHook(() =>
            useTabAnimation('Featured', makeOptions())
        );
        act(() => { vi.advanceTimersByTime(80 + EXPAND_MS); });
        expect(result.current.isAnimatingRef.current).toBe(false);
    });

    test('initial wrap does NOT fire when enabled is false', () => {
        const { result } = renderHook(() =>
            useTabAnimation('Featured', makeOptions({ enabled: false }))
        );
        act(() => { vi.advanceTimersByTime(80 + EXPAND_MS + 100); });
        expect(result.current.animState.expanded).toBe(false);
        expect(result.current.animState.wrapComplete).toBe(false);
    });

    test('initial wrap does NOT fire when indicator is null', () => {
        const { result } = renderHook(() =>
            useTabAnimation('Featured', makeOptions({ indicator: null }))
        );
        act(() => { vi.advanceTimersByTime(80 + EXPAND_MS + 100); });
        expect(result.current.animState.expanded).toBe(false);
    });
});

// ── Tab switch: direction ─────────────────────────────────────────────────────

describe('useTabAnimation — direction inference', () => {
    test('clicking a later-indexed tab sets direction cw', () => {
        const opts = makeOptions();
        const { result } = renderHook(() =>
            useTabAnimation('Featured', opts)
        );
        // Let initial wrap complete first
        act(() => { vi.advanceTimersByTime(80 + EXPAND_MS); });

        act(() => { result.current.handleClick('Personal', 'Featured'); });
        // direction flips in t2 (after SHRINK + SLIDE_STRETCH)
        act(() => { vi.advanceTimersByTime(SHRINK_MS + SLIDE_STRETCH_MS); });
        expect(result.current.animState.direction).toBe('cw');
    });

    test('clicking an earlier-indexed tab sets direction ccw', () => {
        const opts = makeOptions();
        const { result } = renderHook(() =>
            useTabAnimation('Featured', opts)
        );
        act(() => { vi.advanceTimersByTime(80 + EXPAND_MS); });

        act(() => { result.current.handleClick('Client', 'Featured'); });
        act(() => { vi.advanceTimersByTime(SHRINK_MS + SLIDE_STRETCH_MS); });
        expect(result.current.animState.direction).toBe('ccw');
    });
});

// ── Tab switch: phase transitions ─────────────────────────────────────────────

describe('useTabAnimation — tab switch phase sequence', () => {
    test('handleClick immediately sets retracting=true and wrapComplete=false', () => {
        const opts = makeOptions();
        const { result } = renderHook(() =>
            useTabAnimation('Featured', opts)
        );
        act(() => { vi.advanceTimersByTime(80 + EXPAND_MS); }); // let wrap complete

        act(() => { result.current.handleClick('Personal', 'Featured'); });
        expect(result.current.animState.retracting).toBe(true);
        expect(result.current.animState.wrapComplete).toBe(false);
        expect(result.current.animState.expanded).toBe(false);
    });

    test('after SHRINK_MS: onIndicatorChange called with stretched box', () => {
        const opts = makeOptions();
        const { result } = renderHook(() =>
            useTabAnimation('Featured', opts)
        );
        act(() => { vi.advanceTimersByTime(80 + EXPAND_MS); });

        act(() => { result.current.handleClick('Personal', 'Featured'); });
        act(() => { vi.advanceTimersByTime(SHRINK_MS); });

        // Featured is at left=110, Personal is at left=220. stretchLeft=110, stretchRight=320 → width=210
        expect(opts.onIndicatorChange).toHaveBeenLastCalledWith(
            expect.objectContaining({ left: 110, width: 210 })
        );
    });

    test('after SHRINK + SLIDE_STRETCH: svgTab updates to target tab', () => {
        const opts = makeOptions();
        const { result } = renderHook(() =>
            useTabAnimation('Featured', opts)
        );
        act(() => { vi.advanceTimersByTime(80 + EXPAND_MS); });

        act(() => { result.current.handleClick('Personal', 'Featured'); });
        act(() => { vi.advanceTimersByTime(SHRINK_MS + SLIDE_STRETCH_MS); });

        expect(result.current.animState.svgTab).toBe('Personal');
        expect(result.current.animState.retracting).toBe(false);
    });

    test('after SHRINK + SLIDE_STRETCH + SLIDE_CONTRACT: expanded becomes true', () => {
        const opts = makeOptions();
        const { result } = renderHook(() =>
            useTabAnimation('Featured', opts)
        );
        act(() => { vi.advanceTimersByTime(80 + EXPAND_MS); });

        act(() => { result.current.handleClick('Personal', 'Featured'); });
        act(() => { vi.advanceTimersByTime(SHRINK_MS + SLIDE_STRETCH_MS + SLIDE_CONTRACT_MS); });

        expect(result.current.animState.expanded).toBe(true);
    });

    test('after full animation sequence: wrapComplete=true and isAnimating=false', () => {
        const opts = makeOptions();
        const { result } = renderHook(() =>
            useTabAnimation('Featured', opts)
        );
        act(() => { vi.advanceTimersByTime(80 + EXPAND_MS); });

        act(() => { result.current.handleClick('Personal', 'Featured'); });
        const totalMs = SHRINK_MS + SLIDE_STRETCH_MS + SLIDE_CONTRACT_MS + EXPAND_MS;
        act(() => { vi.advanceTimersByTime(totalMs); });

        expect(result.current.animState.wrapComplete).toBe(true);
        expect(result.current.isAnimatingRef.current).toBe(false);
    });

    test('onChange is called immediately with the new tab', () => {
        const opts = makeOptions();
        const { result } = renderHook(() =>
            useTabAnimation('Featured', opts)
        );
        act(() => { vi.advanceTimersByTime(80 + EXPAND_MS); });

        act(() => { result.current.handleClick('Personal', 'Featured'); });
        expect(opts.onChange).toHaveBeenCalledWith('Personal');
    });
});

// ── Rapid clicks — interrupt safety ──────────────────────────────────────────

describe('useTabAnimation — rapid click interrupt', () => {
    test('second click before first completes does not leak timers (no setState after cleared)', () => {
        const clearTimeoutSpy = vi.spyOn(window, 'clearTimeout');
        const opts = makeOptions();
        const { result } = renderHook(() =>
            useTabAnimation('Featured', opts)
        );
        act(() => { vi.advanceTimersByTime(80 + EXPAND_MS); });

        // First click
        act(() => { result.current.handleClick('Personal', 'Featured'); });
        // Interrupt before any phase completes
        act(() => { vi.advanceTimersByTime(SHRINK_MS - 10); });
        // Second click interrupts the first
        act(() => { result.current.handleClick('Client', 'Personal'); });

        // clearTimeout should have been called (at least once for the interrupt)
        expect(clearTimeoutSpy).toHaveBeenCalled();

        // Advance to well past first click's completion — should not throw or cause unexpected state
        act(() => { vi.advanceTimersByTime(SHRINK_MS + SLIDE_STRETCH_MS + SLIDE_CONTRACT_MS + EXPAND_MS + 500); });
        // svgTab should reflect the second click's target at handoff time
        expect(result.current.animState.svgTab).toBe('Client');
    });

    test('handleClick is a no-op when next === active', () => {
        const opts = makeOptions();
        const { result } = renderHook(() =>
            useTabAnimation('Featured', opts)
        );
        act(() => { vi.advanceTimersByTime(80 + EXPAND_MS); });

        act(() => { result.current.handleClick('Featured', 'Featured'); });
        expect(opts.onChange).not.toHaveBeenCalled();
        expect(result.current.animState.retracting).toBe(false);
    });
});

// ── Cleanup on unmount ────────────────────────────────────────────────────────

describe('useTabAnimation — unmount cleanup', () => {
    test('pending timers are cleared on unmount (no setState after unmount)', () => {
        const clearTimeoutSpy = vi.spyOn(window, 'clearTimeout');
        const opts = makeOptions();
        const { result, unmount } = renderHook(() =>
            useTabAnimation('Featured', opts)
        );
        act(() => { vi.advanceTimersByTime(80 + EXPAND_MS); });

        // Start a transition
        act(() => { result.current.handleClick('Personal', 'Featured'); });

        // Unmount mid-transition — should clear all pending timers
        act(() => { unmount(); });

        expect(clearTimeoutSpy).toHaveBeenCalled();

        // Advance past where timers would have fired — no React warning expected
        act(() => { vi.advanceTimersByTime(SHRINK_MS + SLIDE_STRETCH_MS + SLIDE_CONTRACT_MS + EXPAND_MS + 500); });
    });
});

// ── retractMode ───────────────────────────────────────────────────────────────

describe('useTabAnimation — retractMode', () => {
    test('same-direction click uses forward retract mode', () => {
        // Default direction is 'cw'; clicking forward (cw) should stay 'forward'
        const opts = makeOptions();
        const { result } = renderHook(() =>
            useTabAnimation('Client', opts)
        );
        act(() => { vi.advanceTimersByTime(80 + EXPAND_MS); });

        // Client → Featured is cw (index 0 → 1). Default direction is 'cw' → no shift.
        act(() => { result.current.handleClick('Featured', 'Client'); });
        expect(result.current.animState.retractMode).toBe('forward');
    });

    test('direction-shift click uses reverse retract mode', () => {
        const opts = makeOptions();
        const { result } = renderHook(() =>
            useTabAnimation('Client', opts)
        );
        act(() => { vi.advanceTimersByTime(80 + EXPAND_MS); });

        // Client → Featured is cw (sets direction to cw).
        act(() => { result.current.handleClick('Featured', 'Client'); });
        act(() => { vi.advanceTimersByTime(SHRINK_MS + SLIDE_STRETCH_MS + SLIDE_CONTRACT_MS + EXPAND_MS); });

        // Now going Featured → Client is ccw — shifts direction → reverse mode.
        act(() => { result.current.handleClick('Client', 'Featured'); });
        expect(result.current.animState.retractMode).toBe('reverse');
    });
});
