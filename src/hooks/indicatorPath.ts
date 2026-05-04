// Pure-function SVG path math for the MomentumTabs perimeter indicator.
// No state, no effects — computes geometry from the current animation state.
//
// The perimeter trace draws along the top and two sides of the indicator box.
// The path starts at the bottom edge and traces up-and-over, so the
// stroke-dasharray trick can animate it growing from nothing to the full
// perimeter.
//
// `direction` controls which corner the trace starts at:
//   'cw'  — starts bottom-right, traces: right-side up → top → left-side down
//   'ccw' — starts bottom-left,  traces: left-side up  → top → right-side down

export type IndicatorDirection = 'cw' | 'ccw';

export type IndicatorPathInput = {
    width: number;
    height: number;
    direction: IndicatorDirection;
    expanded: boolean;
    retracting: boolean;
    retractMode: 'forward' | 'reverse';
};

export type IndicatorPathOutput = {
    /** SVG `d` attribute for the perimeter path. */
    pathD: string;
    /** Value for `stroke-dasharray` CSS property (e.g. `"740 0"` or `"0 741"`). */
    dashArray: string;
    /** Value for `stroke-dashoffset` CSS property. */
    dashOffset: number;
};

/**
 * Compute the SVG path geometry for the MomentumTabs perimeter indicator.
 *
 * The path traces three sides of the indicator box (top + two vertical sides).
 * `sideLength = 2 * height + width` is the total perimeter of those three sides.
 *
 * - `expanded = true`  → dashArray = `"${sideLength} 0"`  (fully drawn)
 * - `expanded = false` → dashArray = `"0 ${sideLength}"`  (hidden)
 * - `retracting + forward` mode → dashOffset = `-sideLength` (retracts away)
 */
export function computeIndicatorPath(input: IndicatorPathInput): IndicatorPathOutput {
    const { width, height, direction, expanded, retracting, retractMode } = input;

    const sideLength = 2 * height + width;

    const pathD =
        direction === 'cw'
            ? `M ${width} ${height} L ${width} 0 L 0 0 L 0 ${height}`
            : `M 0 ${height} L 0 0 L ${width} 0 L ${width} ${height}`;

    const dashArray = expanded
        ? `${sideLength} 0`
        : `0 ${Math.max(sideLength, 1)}`;

    const dashOffset = retracting && retractMode === 'forward' ? -sideLength : 0;

    return { pathD, dashArray, dashOffset };
}
