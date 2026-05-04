/**
 * Single import boundary for environment-validated config.
 * vite-env.d.ts types the raw variables; this module reads + validates them
 * at startup so missing vars surface at boot, not at first form submit.
 *
 * Validation is gated on MODE !== 'test' so the jsdom test environment
 * (which doesn't define the VITE_ vars) doesn't blow up on import.
 * The existing dispatchForm guard in useFormSubmit already short-circuits
 * all real network calls in test mode, so the empty strings are never used.
 */

const isTest = import.meta.env.MODE === 'test';

/**
 * Assert that an env var is present and non-empty.
 * Returns an empty string in test mode so test imports don't throw.
 */
const required = (key: string): string => {
    if (isTest) return '';
    const value = (import.meta.env as Record<string, string | undefined>)[key];
    if (typeof value !== 'string' || value === '') {
        throw new Error(`Missing required env var: ${key}`);
    }
    return value;
};

export type MockMode = '' | 'success' | 'error' | 'throw';

export type FormConfig = {
    endpoint: string;
    accessKey: string;
    mockMode: MockMode;
};

export const FORM: FormConfig = {
    endpoint: required('VITE_FORM_ENDPOINT'),
    accessKey: required('VITE_FORM_ACCESS_KEY'),
    mockMode: ((import.meta.env.VITE_MOCK_FORM as MockMode | undefined) ?? '') as MockMode,
};
