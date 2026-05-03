import { useEffect } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import axios from 'axios';
import ContactForm from './ContactForm';
import '../assets/styles/Contact.css';

const meta: Meta<typeof ContactForm> = {
    title: 'Components/Composites/ContactForm',
    component: ContactForm,
    decorators: [
        (Story) => (
            <section
                className="contact"
                style={{
                    background: 'linear-gradient(90deg, #5b2a86 0%, #4a6fc7 100%)',
                    padding: '3rem',
                    minHeight: '600px'
                }}
            >
                <div style={{ maxWidth: '600px', margin: '0 auto' }}>
                    <Story />
                </div>
            </section>
        )
    ],
    parameters: { layout: 'fullscreen', docs: { description: { component: "The contact form proper — five fields, honeypot spam protection, staged success / error animations, and a `VITE_MOCK_FORM` dev mock." } } }
};

export default meta;

type Story = StoryObj<typeof ContactForm>;

// Untouched form. Matches the live state on first paint.
export const Empty: Story = {};

// Helper: fill every required field via userEvent so the snapshot
// captures the form mid-flow with realistic content. Used as the
// shared first step for Submitting / Success / Error too.
const fillFields = async (canvas: ReturnType<typeof within>) => {
    await userEvent.type(
        canvas.getByPlaceholderText(/First Name/i),
        'Alex'
    );
    await userEvent.type(
        canvas.getByPlaceholderText(/Last Name/i),
        'Smith'
    );
    await userEvent.type(
        canvas.getByPlaceholderText(/Email Address/i),
        'alex.smith@example.com'
    );
    await userEvent.type(
        canvas.getByPlaceholderText(/Phone Number/i),
        '5555550100'
    );
    await userEvent.type(
        canvas.getByPlaceholderText(/Message/i),
        "Loved your portfolio — would like to chat about a senior frontend role."
    );
};

// All required fields filled, no submit yet. Stable visual snapshot.
export const Filled: Story = {
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        await fillFields(canvas);
        await expect(canvas.getByPlaceholderText(/First Name/i)).toHaveValue(
            'Alex'
        );
    }
};

// Per-story axios.post mock decorator. Patches the module on mount,
// restores on unmount. Each story can pick the response shape it needs
// without depending on VITE_MOCK_FORM env state at build time.
type MockResponse =
    | { kind: 'success' }
    | { kind: 'spam-rejected' }
    | { kind: 'network-error' }
    | { kind: 'never-resolves' };

const useAxiosPostMock = (response: MockResponse, delayMs = 800) => {
    useEffect(() => {
        const original = axios.post;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (axios as any).post = () =>
            new Promise((resolve, reject) => {
                if (response.kind === 'never-resolves') return; // intentional
                setTimeout(() => {
                    if (response.kind === 'success') {
                        resolve({
                            status: 200,
                            data: { success: true, message: '[MOCK] Email sent' }
                        });
                    } else if (response.kind === 'spam-rejected') {
                        resolve({
                            status: 200,
                            data: {
                                success: false,
                                message: '[MOCK] Spam detected'
                            }
                        });
                    } else if (response.kind === 'network-error') {
                        reject(new globalThis.Error('[MOCK] Network request failed'));
                    }
                }, delayMs);
            });
        return () => {
            axios.post = original;
        };
    }, [response, delayMs]);
};

const MockedContactForm = ({
    response,
    delayMs
}: {
    response: MockResponse;
    delayMs?: number;
}) => {
    useAxiosPostMock(response, delayMs);
    return <ContactForm />;
};

// Mid-submit state. The mock never resolves so the "Sending..." button
// label stays pinned, useful for capturing the in-flight visual.
export const Submitting: Story = {
    render: () => <MockedContactForm response={{ kind: 'never-resolves' }} />,
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        await fillFields(canvas);
        await userEvent.click(canvas.getByRole('button', { name: /send/i }));
        await expect(
            canvas.getByRole('button', { name: /sending/i })
        ).toBeDisabled();
    }
};

// Happy path. Mock resolves with success: true after a short delay so
// the play function can wait for the post-submit UI to render.
export const Success: Story = {
    render: () => (
        <MockedContactForm response={{ kind: 'success' }} delayMs={50} />
    ),
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        await fillFields(canvas);
        await userEvent.click(canvas.getByRole('button', { name: /send/i }));
        await expect(
            await canvas.findByText(/Thanks for reaching out/i)
        ).toBeInTheDocument();
    }
};

// Failure path. Mock rejects with a network error so the form surfaces
// the "Oops! Request Failed" message.
export const Failed: Story = {
    render: () => (
        <MockedContactForm response={{ kind: 'network-error' }} delayMs={50} />
    ),
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        await fillFields(canvas);
        await userEvent.click(canvas.getByRole('button', { name: /send/i }));
        await expect(
            await canvas.findByText(/Oops! Request Failed/i)
        ).toBeInTheDocument();
    }
};

// Client-side validation error. Every required field is filled except
// Last Name; clicking Send triggers the browser's HTML5 validation,
// blocks submit, and flips :user-invalid on the empty Last Name field.
export const Error: Story = {
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        await userEvent.type(
            canvas.getByPlaceholderText(/First Name/i),
            'Alex'
        );
        await userEvent.type(
            canvas.getByPlaceholderText(/Email Address/i),
            'alex.smith@example.com'
        );
        await userEvent.type(
            canvas.getByPlaceholderText(/Phone Number/i),
            '5555550100'
        );
        await userEvent.type(
            canvas.getByPlaceholderText(/Message/i),
            "Loved your portfolio — would like to chat about a senior frontend role."
        );
        await userEvent.click(canvas.getByRole('button', { name: /send/i }));
    }
};
