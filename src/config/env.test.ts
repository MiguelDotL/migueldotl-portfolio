import { describe, it, expect } from 'vitest';
import { FORM, type MockMode } from './env';

describe('src/config/env', () => {
    it('FORM.endpoint is a string (empty in test mode)', () => {
        // In test mode validation is suppressed so required() returns ''.
        expect(typeof FORM.endpoint).toBe('string');
    });

    it('FORM.accessKey is a string (empty in test mode)', () => {
        expect(typeof FORM.accessKey).toBe('string');
    });

    it('FORM.mockMode is one of the allowed values', () => {
        const allowed: MockMode[] = ['', 'success', 'error', 'throw'];
        expect(allowed).toContain(FORM.mockMode);
    });
});
