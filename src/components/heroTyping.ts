// Pure-function typing-effect state machine driving HeroContent's
// rotating job-title headline. Lives outside the component so the state
// transitions can be unit-tested without timers or React renders.
//
// Cycle: type chars in → pause at full word → delete chars out → advance
// roleCount → repeat. typingDelay swaps between the per-state cadences:
//   - per-character ramp (~150-200 ms) while typing forward
//   - PAUSE_TIME (3.456 s) once the word is fully typed
//   - 100 ms per char while deleting
//   - 321 ms hand-off after a word is fully deleted, before the next
//     word starts typing

export const ROLES = [
    'Front-End',
    'Back-End',
    'Full-Stack Developer   '
] as const;

export const PAUSE_TIME = 3456;
export const DELETE_DELAY = 100;
export const ROLE_HANDOFF_DELAY = 321;

export type TypingState = {
    isTyping: boolean;
    jobTitle: string;
    roleCount: number;
    typingDelay: number;
};

export const initialTypingState = (typingDelay: number): TypingState => ({
    isTyping: true,
    jobTitle: '',
    roleCount: 0,
    typingDelay
});

/**
 * Advance the typing state by one tick. Pure: same input → same output.
 *
 * Reads the current role from `roleCount % ROLES.length`, then either
 * extends or shrinks `jobTitle` by one character depending on whether
 * we're typing forward or deleting. Special transitions:
 *   - just finished typing the word → flip to deleting, schedule pause
 *   - just finished deleting the word → flip to typing, advance roleCount
 */
export const advanceTyping = (state: TypingState): TypingState => {
    const currentRole = state.roleCount % ROLES.length;
    const fullText = ROLES[currentRole];
    const currentText = state.isTyping
        ? fullText.substring(0, state.jobTitle.length + 1)
        : fullText.substring(0, state.jobTitle.length - 1);

    // Deleting cadence is fixed at 100ms per char; typing cadence carries
    // through unchanged (the component sets the random initial value).
    let nextDelay = state.typingDelay;
    if (!state.isTyping) {
        nextDelay = DELETE_DELAY;
    }

    // Word fully typed: flip to deleting, hold for the pause window.
    if (state.isTyping && currentText === fullText) {
        return {
            isTyping: false,
            jobTitle: currentText,
            roleCount: state.roleCount,
            typingDelay: PAUSE_TIME
        };
    }

    // Word fully deleted: flip to typing, advance to the next role.
    if (!state.isTyping && currentText === '') {
        return {
            isTyping: true,
            jobTitle: currentText,
            roleCount: state.roleCount + 1,
            typingDelay: ROLE_HANDOFF_DELAY
        };
    }

    return {
        ...state,
        jobTitle: currentText,
        typingDelay: nextDelay
    };
};
