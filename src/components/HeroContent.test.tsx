import { act, render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import HeroContent from './HeroContent';

describe('HeroContent', () => {
    test('renders intro greeting', () => {
        render(<HeroContent />);
        expect(screen.getByRole('heading', { name: /Hi, I'm Miguel!/i })).toBeInTheDocument();
    });

    test('renders bio paragraph and Lets Chat CTA', () => {
        render(<HeroContent />);
        expect(screen.getByText(/journey into programming began in 2005/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Let's Chat/i })).toBeInTheDocument();
    });

    test('calculates years of experience from 2016', () => {
        render(<HeroContent />);
        const expectedYears = new Date().getFullYear() - 2016;
        expect(screen.getByText(`${expectedYears} years`)).toBeInTheDocument();
    });

    test('typing animation populates jobTitle over time', () => {
        vi.useFakeTimers();
        render(<HeroContent />);

        // typing-text starts empty
        const typingElement = document.querySelector('.typing-text')!;
        expect(typingElement.textContent).toBe('');

        // advance ~1.5s of typing — should have populated some characters from "Front-End"
        act(() => {
            vi.advanceTimersByTime(1500);
        });

        const text = typingElement.textContent ?? '';
        expect(text.length).toBeGreaterThan(0);
        expect('Front-End'.startsWith(text)).toBe(true);

        vi.useRealTimers();
    });
});
