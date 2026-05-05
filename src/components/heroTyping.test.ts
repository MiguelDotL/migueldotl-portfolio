import { describe, expect, test } from 'vitest';
import {
    advanceTyping,
    initialTypingState,
    ROLES,
    PAUSE_TIME,
    DELETE_DELAY,
    ROLE_HANDOFF_DELAY,
    type TypingState
} from './heroTyping';

const seedDelay = 175;

describe('initialTypingState', () => {
    test('starts in typing mode with empty title and the supplied delay', () => {
        const s = initialTypingState(seedDelay);
        expect(s).toEqual({
            isTyping: true,
            jobTitle: '',
            roleCount: 0,
            typingDelay: seedDelay
        });
    });
});

describe('advanceTyping — typing forward', () => {
    test('appends one character on the first tick', () => {
        const s = initialTypingState(seedDelay);
        const next = advanceTyping(s);
        expect(next.jobTitle).toBe(ROLES[0][0]);
        expect(next.isTyping).toBe(true);
        expect(next.typingDelay).toBe(seedDelay);
    });

    test('walks through every character of the first role', () => {
        let state = initialTypingState(seedDelay);
        const target = ROLES[0];
        for (let i = 0; i < target.length; i++) {
            state = advanceTyping(state);
            expect(state.jobTitle).toBe(target.substring(0, i + 1));
        }
    });

    test('on the tick that completes the word, flips to !isTyping with PAUSE_TIME', () => {
        let state = initialTypingState(seedDelay);
        for (let i = 0; i < ROLES[0].length; i++) state = advanceTyping(state);
        expect(state.isTyping).toBe(false);
        expect(state.jobTitle).toBe(ROLES[0]);
        expect(state.typingDelay).toBe(PAUSE_TIME);
        expect(state.roleCount).toBe(0);
    });
});

describe('advanceTyping — deleting', () => {
    test('first delete tick removes the trailing character and sets DELETE_DELAY', () => {
        const state: TypingState = {
            isTyping: false,
            jobTitle: ROLES[0],
            roleCount: 0,
            typingDelay: PAUSE_TIME
        };
        const next = advanceTyping(state);
        expect(next.isTyping).toBe(false);
        expect(next.jobTitle).toBe(ROLES[0].slice(0, -1));
        expect(next.typingDelay).toBe(DELETE_DELAY);
    });

    test('walks back to empty across every delete tick', () => {
        let state: TypingState = {
            isTyping: false,
            jobTitle: ROLES[0],
            roleCount: 0,
            typingDelay: PAUSE_TIME
        };
        for (let i = ROLES[0].length - 1; i > 0; i--) {
            state = advanceTyping(state);
            expect(state.jobTitle.length).toBe(i);
        }
    });

    test('on the tick that empties the word, flips to isTyping with ROLE_HANDOFF_DELAY and advances roleCount', () => {
        const state: TypingState = {
            isTyping: false,
            jobTitle: 'a',
            roleCount: 0,
            typingDelay: DELETE_DELAY
        };
        const next = advanceTyping(state);
        expect(next.isTyping).toBe(true);
        expect(next.jobTitle).toBe('');
        expect(next.typingDelay).toBe(ROLE_HANDOFF_DELAY);
        expect(next.roleCount).toBe(1);
    });
});

describe('advanceTyping — role rotation', () => {
    test('roleCount wraps via modulo so only ROLES.length entries are exposed', () => {
        const state: TypingState = {
            isTyping: true,
            jobTitle: '',
            roleCount: ROLES.length, // would index out of range without modulo
            typingDelay: seedDelay
        };
        const next = advanceTyping(state);
        // Should start typing ROLES[0] again, not crash.
        expect(next.jobTitle).toBe(ROLES[0][0]);
    });

    test('cycles through all three roles end-to-end', () => {
        let state = initialTypingState(seedDelay);
        const seen: string[] = [];
        // Run enough ticks to fully cycle each role: type + complete + delete + handoff.
        // Each role is at most ~24 chars; 4 roles × (24 type + 24 delete + 2 transition)
        // is ~200 ticks — comfortably enough for 3 wraps.
        for (let i = 0; i < 400; i++) {
            state = advanceTyping(state);
            if (state.isTyping && state.jobTitle === '' && !seen.includes(`r${state.roleCount}`)) {
                seen.push(`r${state.roleCount}`);
            }
        }
        // Should have observed at least roles 1, 2, 3 (handoff to next role each time).
        expect(seen).toContain('r1');
        expect(seen).toContain('r2');
        expect(seen).toContain('r3');
    });
});
