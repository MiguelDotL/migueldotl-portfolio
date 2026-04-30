import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ContactForm from './ContactForm';
import getForm from '../apis/getForm';

jest.mock('../apis/getForm');

describe('ContactForm', () => {
    beforeEach(() => {
        jest.clearAllMocks();
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

    test('updates input values when user types', () => {
        render(<ContactForm />);

        const firstName = screen.getByPlaceholderText(/First Name/i);
        userEvent.type(firstName, 'Miguel');
        expect(firstName).toHaveValue('Miguel');

        const email = screen.getByPlaceholderText(/Email Address/i);
        userEvent.type(email, 'test@example.com');
        expect(email).toHaveValue('test@example.com');
    });

    test('submits form with values and shows success message', async () => {
        getForm.post.mockResolvedValueOnce({ status: 200, data: { success: true } });

        render(<ContactForm />);

        userEvent.type(screen.getByPlaceholderText(/First Name/i), 'Miguel');
        userEvent.type(screen.getByPlaceholderText(/Email Address/i), 'a@b.com');
        userEvent.type(screen.getByPlaceholderText(/Message/i), 'Hello!');
        userEvent.click(screen.getByRole('button', { name: /send/i }));

        await waitFor(() => {
            expect(getForm.post).toHaveBeenCalledTimes(1);
        });

        const [, payload] = getForm.post.mock.calls[0];
        expect(payload.firstName).toBe('Miguel');
        expect(payload.email).toBe('a@b.com');
        expect(payload.message).toBe('Hello!');

        await waitFor(() => {
            expect(screen.getByText(/Thanks for reaching out/i)).toBeInTheDocument();
        });
    });

    test('shows error message when submission fails', async () => {
        getForm.post.mockRejectedValueOnce(new Error('Network down'));

        render(<ContactForm />);

        userEvent.type(screen.getByPlaceholderText(/First Name/i), 'Miguel');
        userEvent.click(screen.getByRole('button', { name: /send/i }));

        await waitFor(() => {
            expect(screen.getByText(/Oops! Network down/i)).toBeInTheDocument();
        });
    });
});
