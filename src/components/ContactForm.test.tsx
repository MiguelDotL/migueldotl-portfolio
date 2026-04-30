import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import ContactForm from './ContactForm';
import getForm from '../apis/getForm';

vi.mock('../apis/getForm', () => ({
    default: { post: vi.fn() }
}));

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

    test('submits form with values and shows success message', async () => {
        vi.mocked(getForm.post).mockResolvedValueOnce({ status: 200, data: { success: true } });

        const user = userEvent.setup();
        render(<ContactForm />);

        await user.type(screen.getByPlaceholderText(/First Name/i), 'Miguel');
        await user.type(screen.getByPlaceholderText(/Email Address/i), 'a@b.com');
        await user.type(screen.getByPlaceholderText(/Message/i), 'Hello!');
        await user.click(screen.getByRole('button', { name: /send/i }));

        await waitFor(() => {
            expect(vi.mocked(getForm.post)).toHaveBeenCalledTimes(1);
        });

        const [, payload] = vi.mocked(getForm.post).mock.calls[0] as [string, Record<string, string>];
        expect(payload.firstName).toBe('Miguel');
        expect(payload.email).toBe('a@b.com');
        expect(payload.message).toBe('Hello!');

        await waitFor(() => {
            expect(screen.getByText(/Thanks for reaching out/i)).toBeInTheDocument();
        });
    });

    test('shows error message when submission fails', async () => {
        vi.mocked(getForm.post).mockRejectedValueOnce(new Error('Network down'));

        const user = userEvent.setup();
        render(<ContactForm />);

        await user.type(screen.getByPlaceholderText(/First Name/i), 'Miguel');
        await user.click(screen.getByRole('button', { name: /send/i }));

        await waitFor(() => {
            expect(screen.getByText(/Oops! Network down/i)).toBeInTheDocument();
        });
    });
});
