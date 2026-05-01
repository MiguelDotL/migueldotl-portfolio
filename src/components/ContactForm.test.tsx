import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import axios from 'axios';
import ContactForm from './ContactForm';

vi.mock('axios');

describe('ContactForm', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    test('renders all form fields and submit button', () => {
        render(<ContactForm />);
        expect(screen.getByPlaceholderText(/First Name/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Last Name/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Email Address/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Phone Number/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Message/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /send/i })).toBeInTheDocument();
    });

    test('updates input values when user types', async () => {
        const user = userEvent.setup();
        render(<ContactForm />);

        const firstName = screen.getByPlaceholderText(/First Name/i);
        await user.type(firstName, 'Miguel');
        expect(firstName).toHaveValue('Miguel');

        const email = screen.getByPlaceholderText(/Email Address/i);
        await user.type(email, 'test@example.com');
        expect(email).toHaveValue('test@example.com');
    });

    const fillAllRequiredFields = async (user: ReturnType<typeof userEvent.setup>) => {
        await user.type(screen.getByPlaceholderText(/First Name/i), 'Miguel');
        await user.type(screen.getByPlaceholderText(/Last Name/i), 'Lozano');
        await user.type(screen.getByPlaceholderText(/Email Address/i), 'a@b.com');
        await user.type(screen.getByPlaceholderText(/Phone Number/i), '5555550100');
        await user.type(screen.getByPlaceholderText(/Message/i), 'Hello!');
    };

    test('submits Web3Forms payload and shows success message', async () => {
        vi.mocked(axios.post).mockResolvedValueOnce({
            status: 200,
            data: { success: true, message: 'Email sent' }
        });

        const user = userEvent.setup();
        render(<ContactForm />);

        await fillAllRequiredFields(user);
        await user.click(screen.getByRole('button', { name: /send/i }));

        await waitFor(() => {
            expect(vi.mocked(axios.post)).toHaveBeenCalledTimes(1);
        });

        const [, payload] = vi.mocked(axios.post).mock.calls[0] as [string, Record<string, string>];
        expect(payload.access_key).toBeDefined();
        expect(payload.firstName).toBe('Miguel');
        expect(payload.email).toBe('a@b.com');
        expect(payload.message).toBe('Hello!');
        expect(payload.botcheck).toBe('');

        await waitFor(() => {
            expect(screen.getByText(/Thanks for reaching out/i)).toBeInTheDocument();
        });
    });

    test('shows error message when submission fails', async () => {
        vi.mocked(axios.post).mockRejectedValueOnce(new Error('Network down'));

        const user = userEvent.setup();
        render(<ContactForm />);

        await fillAllRequiredFields(user);
        await user.click(screen.getByRole('button', { name: /send/i }));

        await waitFor(() => {
            expect(screen.getByText(/Oops! Request Failed/i)).toBeInTheDocument();
        });
    });

    test('shows error when Web3Forms returns success: false', async () => {
        vi.mocked(axios.post).mockResolvedValueOnce({
            status: 200,
            data: { success: false, message: 'Spam detected' }
        });

        const user = userEvent.setup();
        render(<ContactForm />);

        await fillAllRequiredFields(user);
        await user.click(screen.getByRole('button', { name: /send/i }));

        await waitFor(() => {
            expect(screen.getByText(/Oops! Request Failed/i)).toBeInTheDocument();
        });
    });

    test('blocks submit when required fields are empty', async () => {
        const user = userEvent.setup();
        render(<ContactForm />);

        await user.click(screen.getByRole('button', { name: /send/i }));

        expect(vi.mocked(axios.post)).not.toHaveBeenCalled();
    });
});
