import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
    // Skills, Projects, and ContactMe are code-split via React.lazy + Suspense
    // (App.tsx). Use findByRole so the assertions wait for each chunk to
    // resolve before querying.
    test('renders without crashing and mounts every section', async () => {
        render(<App />);
        // Hero (eager)
        expect(screen.getByRole('heading', { name: /Hi, I'm Miguel!/i })).toBeInTheDocument();
        // Three lazy chunks resolve in parallel; default 1s findBy timeout
        // is flaky on slower CI. 5s is plenty.
        const opts = { timeout: 5000 };
        expect(await screen.findByRole('heading', { name: /^Skills$/i }, opts)).toBeInTheDocument();
        expect(await screen.findByRole('heading', { name: /^Projects$/i }, opts)).toBeInTheDocument();
        expect((await screen.findAllByRole('heading', { name: /Wanna Hire Me/i }, opts)).length).toBeGreaterThan(0);
    });
});
