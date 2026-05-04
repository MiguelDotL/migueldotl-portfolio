import { describe, expect, test } from 'vitest';
import { computeIndicatorPath, type IndicatorPathInput } from './indicatorPath';

const base: IndicatorPathInput = {
    width: 120,
    height: 40,
    direction: 'cw',
    expanded: false,
    retracting: false,
    retractMode: 'forward'
};

describe('computeIndicatorPath — pathD', () => {
    test('cw direction traces from bottom-right over the top', () => {
        const { pathD } = computeIndicatorPath(base);
        // cw: start bottom-right (width, height) → top-right → top-left → bottom-left
        expect(pathD).toBe('M 120 40 L 120 0 L 0 0 L 0 40');
    });

    test('ccw direction traces from bottom-left over the top', () => {
        const { pathD } = computeIndicatorPath({ ...base, direction: 'ccw' });
        expect(pathD).toBe('M 0 40 L 0 0 L 120 0 L 120 40');
    });

    test('pathD updates when dimensions change', () => {
        const { pathD } = computeIndicatorPath({ ...base, width: 80, height: 30 });
        expect(pathD).toBe('M 80 30 L 80 0 L 0 0 L 0 30');
    });
});

describe('computeIndicatorPath — dashArray', () => {
    test('collapsed: dashArray is "0 <sideLength>" (trace hidden)', () => {
        // sideLength = 2*40 + 120 = 200
        const { dashArray } = computeIndicatorPath({ ...base, expanded: false });
        expect(dashArray).toBe('0 200');
    });

    test('expanded: dashArray is "<sideLength> 0" (trace fully drawn)', () => {
        const { dashArray } = computeIndicatorPath({ ...base, expanded: true });
        expect(dashArray).toBe('200 0');
    });

    test('collapsed with near-zero dimensions uses at least 1 for the gap to avoid degenerate SVG', () => {
        const { dashArray } = computeIndicatorPath({ ...base, width: 0, height: 0 });
        // sideLength = 0, Math.max(0, 1) = 1
        expect(dashArray).toBe('0 1');
    });

    test('dashArray reflects computed sideLength: 2*height + width', () => {
        const { dashArray } = computeIndicatorPath({ ...base, width: 200, height: 50, expanded: true });
        // sideLength = 2*50 + 200 = 300
        expect(dashArray).toBe('300 0');
    });
});

describe('computeIndicatorPath — dashOffset', () => {
    test('not retracting: dashOffset is 0', () => {
        const { dashOffset } = computeIndicatorPath({ ...base, retracting: false });
        expect(dashOffset).toBe(0);
    });

    test('retracting in forward mode: dashOffset is -sideLength (trace retracts away)', () => {
        // sideLength = 2*40 + 120 = 200
        const { dashOffset } = computeIndicatorPath({
            ...base,
            retracting: true,
            retractMode: 'forward'
        });
        expect(dashOffset).toBe(-200);
    });

    test('retracting in reverse mode: dashOffset is 0 (reverse retract uses dashArray instead)', () => {
        const { dashOffset } = computeIndicatorPath({
            ...base,
            retracting: true,
            retractMode: 'reverse'
        });
        expect(dashOffset).toBe(0);
    });

    test('expanded + retracting (mid-interrupt): dashOffset still computed by retractMode', () => {
        const { dashOffset } = computeIndicatorPath({
            ...base,
            expanded: true,
            retracting: true,
            retractMode: 'forward'
        });
        expect(dashOffset).toBe(-200);
    });
});

describe('computeIndicatorPath — composite scenarios', () => {
    test('initial idle state: not expanded, not retracting, dashOffset 0', () => {
        const result = computeIndicatorPath(base);
        expect(result.dashOffset).toBe(0);
        expect(result.dashArray).toBe('0 200');
        expect(result.pathD).toBe('M 120 40 L 120 0 L 0 0 L 0 40');
    });

    test('fully wrapped state: expanded true, not retracting', () => {
        const result = computeIndicatorPath({ ...base, expanded: true });
        expect(result.dashArray).toBe('200 0');
        expect(result.dashOffset).toBe(0);
    });

    test('mid-retract: retracting forward, not expanded', () => {
        const result = computeIndicatorPath({
            ...base,
            retracting: true,
            retractMode: 'forward',
            expanded: false
        });
        // sideLength = 200; offset = -200; dashArray shows gap
        expect(result.dashOffset).toBe(-200);
        expect(result.dashArray).toBe('0 200');
    });
});
