import { describe, test, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import axios from 'axios';
import useFormSubmit from './useFormSubmit';

vi.mock('axios');

const payload = { access_key: 'test-key', firstName: 'Miguel', email: 'a@b.com', message: 'Hello there' };

describe('useFormSubmit — initial state', () => {
    test('starts idle with empty message', () => {
        const { result } = renderHook(() => useFormSubmit());
        expect(result.current.status).toBe('idle');
        expect(result.current.message).toBe('');
        expect(result.current.errorMessage).toBeNull();
    });
});

describe('useFormSubmit — happy path', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    test('transitions idle → submitting → success on a resolved axios call', async () => {
        vi.mocked(axios.post).mockResolvedValueOnce({
            status: 200,
            data: { success: true, message: 'Email sent' }
        });

        const { result } = renderHook(() => useFormSubmit());

        let submitResult: boolean | undefined;
        await act(async () => {
            submitResult = await result.current.submit(payload);
        });

        expect(submitResult).toBe(true);
        expect(result.current.status).toBe('success');
        expect(result.current.message).toMatch(/Thanks for reaching out/i);
        expect(result.current.errorMessage).toBeNull();
    });

    test('calls axios.post with the supplied payload', async () => {
        vi.mocked(axios.post).mockResolvedValueOnce({
            status: 200,
            data: { success: true, message: 'Email sent' }
        });

        const { result } = renderHook(() => useFormSubmit());
        await act(async () => {
            await result.current.submit(payload);
        });

        expect(vi.mocked(axios.post)).toHaveBeenCalledTimes(1);
        const [, calledPayload] = vi.mocked(axios.post).mock.calls[0] as [string, Record<string, string>];
        expect(calledPayload).toMatchObject(payload);
    });
});

describe('useFormSubmit — network error', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    test('transitions to error and captures the error message when axios rejects', async () => {
        vi.mocked(axios.post).mockRejectedValueOnce(new Error('Network down'));

        const { result } = renderHook(() => useFormSubmit());

        let submitResult: boolean | undefined;
        await act(async () => {
            submitResult = await result.current.submit(payload);
        });

        expect(submitResult).toBe(false);
        expect(result.current.status).toBe('error');
        expect(result.current.message).toMatch(/Oops! Request Failed/i);
        expect(result.current.errorMessage).toBe('Network down');
    });
});

describe('useFormSubmit — Web3Forms success:false', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    test('transitions to error when response.data.success is false', async () => {
        vi.mocked(axios.post).mockResolvedValueOnce({
            status: 200,
            data: { success: false, message: 'Spam detected' }
        });

        const { result } = renderHook(() => useFormSubmit());

        let submitResult: boolean | undefined;
        await act(async () => {
            submitResult = await result.current.submit(payload);
        });

        expect(submitResult).toBe(false);
        expect(result.current.status).toBe('error');
        expect(result.current.message).toMatch(/Oops! Request Failed/i);
        expect(result.current.errorMessage).toBe('Spam detected');
    });

    test('falls back to "Submission failed" when API error message is null/undefined', async () => {
        // The ?? operator only catches null/undefined, not empty string.
        // An explicit null from the API triggers the fallback.
        vi.mocked(axios.post).mockResolvedValueOnce({
            status: 200,
            data: { success: false, message: null as unknown as string }
        });

        const { result } = renderHook(() => useFormSubmit());
        await act(async () => {
            await result.current.submit(payload);
        });

        expect(result.current.errorMessage).toBe('Submission failed');
    });
});

describe('useFormSubmit — guard: no double-submit', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    test('ignores a second submit call while already submitting', async () => {
        let resolvePost!: (v: unknown) => void;
        vi.mocked(axios.post).mockReturnValueOnce(
            new Promise((res) => { resolvePost = res; })
        );

        const { result } = renderHook(() => useFormSubmit());

        // Fire first submit without awaiting (leaves it in-flight)
        act(() => { void result.current.submit(payload); });

        // Fire second submit synchronously — should be a no-op
        let secondResult: boolean | undefined;
        await act(async () => {
            secondResult = await result.current.submit(payload);
        });

        // Second call returns false and axios was called exactly once
        expect(secondResult).toBe(false);
        expect(vi.mocked(axios.post)).toHaveBeenCalledTimes(1);

        // Resolve the in-flight post so the hook doesn't leak
        resolvePost({ status: 200, data: { success: true, message: 'ok' } });
    });
});

