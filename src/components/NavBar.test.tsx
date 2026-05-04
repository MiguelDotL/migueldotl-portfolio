import { act, fireEvent, render, screen } from '@testing-library/react';
import NavBar from './NavBar';

describe('NavBar', () => {
    test('renders brand and all nav links', () => {
        render(<NavBar />);
        expect(screen.getByText(/MIGUEL/i)).toBeInTheDocument();
        expect(screen.getByText(/LOZANO/i)).toBeInTheDocument();

        ['Home', 'Skills', 'Projects', 'Contact'].forEach((link) => {
            expect(screen.getByRole('link', { name: link })).toBeInTheDocument();
        });
    });

    test('renders resume button', () => {
        render(<NavBar />);
        expect(screen.getByRole('button', { name: /My Resume/i })).toBeInTheDocument();
    });

    test('toggles has-scrolled class when window scrolls past 50px', () => {
        const { container } = render(<NavBar />);
        const navbar = container.querySelector('.navbar')!;

        expect(navbar.className).not.toMatch(/has-scrolled/);

        act(() => {
            Object.defineProperty(window, 'scrollY', { value: 100, writable: true });
            fireEvent.scroll(window);
        });

        expect(navbar.className).toMatch(/has-scrolled/);
    });
});
