import { useState, useCallback } from 'react';
import axios from 'axios';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type SubmitStatus = 'idle' | 'submitting' | 'success' | 'error';

export type UseFormSubmitReturn = {
    /** Current status of the submission lifecycle. */
    status: SubmitStatus;
    /** Human-readable status banner message (empty when idle). */
    message: string;
    /** Raw error string from the network or API (only set on 'error'). */
    errorMessage: string | null;
    /**
     * Fire the submission. Accepts any flat string map — ContactForm passes
     * the Web3Forms payload (access_key + subject + field values).
     * Returns true on success so the caller can clear its own field state.
     */
    submit: (payload: Record<string, string>) => Promise<boolean>;
};

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

type SubmitResponse = { status: number; data: { success: boolean; message: string } };

/**
 * Dispatch the payload. In dev with VITE_MOCK_FORM set, short-circuits
 * without hitting the real endpoint so the UI can be exercised offline.
 * In tests (MODE === 'test'), the mock path is suppressed so vitest/axios
 * mocks take full control.
 */
const dispatchForm = async (payload: Record<string, string>): Promise<SubmitResponse> => {
    const mock = import.meta.env.VITE_MOCK_FORM;
    const isMockable = import.meta.env.DEV && import.meta.env.MODE !== 'test';

    if (isMockable && mock) {
        await new Promise<void>((resolve) => setTimeout(resolve, 500));
        if (mock === 'error') {
            return { status: 200, data: { success: false, message: '[MOCK] Spam detected' } };
        }
        if (mock === 'throw') {
            throw new Error('[MOCK] Request failed with status code 429');
        }
        return { status: 200, data: { success: true, message: '[MOCK] Email sent' } };
    }

    return axios.post(import.meta.env.VITE_FORM_ENDPOINT, payload);
};

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

/**
 * Owns the submission state machine for ContactForm:
 *   idle → submitting → success | error
 *
 * The component retains all field state and validation; this hook manages
 * only the async dispatch lifecycle and the resulting status.
 */
function useFormSubmit(): UseFormSubmitReturn {
    const [status, setStatus] = useState<SubmitStatus>('idle');
    const [message, setMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const submit = useCallback(async (payload: Record<string, string>): Promise<boolean> => {
        if (status === 'submitting' || status === 'success') return false;

        setStatus('submitting');

        try {
            const response = await dispatchForm(payload);

            if (response.data.success) {
                setStatus('success');
                setMessage("Thanks for reaching out, I'll be in touch!");
                setErrorMessage(null);
                return true;
            } else {
                setStatus('error');
                setMessage('Oops! Request Failed. Please try again soon');
                setErrorMessage(response.data.message ?? 'Submission failed');
                return false;
            }
        } catch (err) {
            const msg = err instanceof Error ? err.message : 'Unknown error';
            setStatus('error');
            setMessage('Oops! Request Failed. Please try again soon');
            setErrorMessage(msg);
            return false;
        }
    }, [status]);

    return { status, message, errorMessage, submit };
}

export default useFormSubmit;
