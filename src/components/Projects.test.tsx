import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Projects from './Projects';

describe('Projects', () => {
    test('renders Projects heading and intro copy', () => {
        render(<Projects />);
        expect(screen.getByRole('heading', { name: /^Projects$/i })).toBeInTheDocument();
        expect(screen.getByText(/Royal Caribbean International/i)).toBeInTheDocument();
    });

    test('renders all six client projects after switching to Client tab', async () => {
        const user = userEvent.setup();
        render(<Projects />);

        const clientTab = screen.getByRole('tab', { name: /Client Projects/i });
        await user.click(clientTab);

        const clientProjectTitles = [
            'T R I M Agency',
            'C Solutions',
            'Orby TV',
            'Federated Insurance',
            'Filthy Food',
            'General Provision'
        ];

        // Tab content fades out → swaps → fades in (~200ms). findByRole retries
        // until the heading appears, accommodating the transition delay.
        for (const title of clientProjectTitles) {
            expect(
                await screen.findByRole('heading', { name: title })
            ).toBeInTheDocument();
        }
    });

    test('Featured/Client/Personal tabs render and update aria-selected on click', async () => {
        const user = userEvent.setup();
        render(<Projects />);

        const featuredTab = screen.getByRole('tab', { name: /Featured Projects/i });
        const clientTab = screen.getByRole('tab', { name: /Client Projects/i });
        const personalTab = screen.getByRole('tab', { name: /Personal Projects/i });

        expect(featuredTab).toHaveAttribute('aria-selected', 'true');
        expect(clientTab).toHaveAttribute('aria-selected', 'false');
        expect(personalTab).toHaveAttribute('aria-selected', 'false');

        await user.click(personalTab);
        expect(personalTab).toHaveAttribute('aria-selected', 'true');
        expect(featuredTab).toHaveAttribute('aria-selected', 'false');

        await user.click(clientTab);
        expect(clientTab).toHaveAttribute('aria-selected', 'true');
        expect(personalTab).toHaveAttribute('aria-selected', 'false');
    });
});
