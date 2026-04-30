import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
    test('renders without crashing and mounts every section', () => {
        render(<App />);
        // Hero
        expect(screen.getByRole('heading', { name: /Hi, I'm Miguel!/i })).toBeInTheDocument();
        // Skills
        expect(screen.getByRole('heading', { name: /^Skills$/i })).toBeInTheDocument();
        // Projects
        expect(screen.getByRole('heading', { name: /^Projects$/i })).toBeInTheDocument();
        // Contact (rendered twice — h2 + h3 for responsive variants)
        expect(screen.getAllByRole('heading', { name: /Wanna Hire Me/i }).length).toBeGreaterThan(0);
    });
});
