import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Projects from './Projects';

describe('Projects', () => {
    test('renders Projects heading and intro copy', () => {
        render(<Projects />);
        expect(screen.getByRole('heading', { name: /^Projects$/i })).toBeInTheDocument();
        expect(screen.getByText(/Royal Caribbean International/i)).toBeInTheDocument();
    });

    test('renders all six client projects on default tab', () => {
        render(<Projects />);
        const clientProjectTitles = [
            'T R I M Agency',
            'C Solutions',
            'Orby TV',
            'Federated Insurance',
            'Filthy Food',
            'General Provision'
        ];

        clientProjectTitles.forEach((title) => {
            expect(screen.getByRole('heading', { name: title })).toBeInTheDocument();
        });
    });

    test('Personal and Misc tabs render and update aria-selected on click', async () => {
        const user = userEvent.setup();
        render(<Projects />);

        const clientTab = screen.getByRole('tab', { name: /Client Projects/i });
        const personalTab = screen.getByRole('tab', { name: /Personal Projects/i });
        const miscTab = screen.getByRole('tab', { name: /Misc\. Projects/i });

        expect(clientTab).toHaveAttribute('aria-selected', 'true');
        expect(personalTab).toHaveAttribute('aria-selected', 'false');
        expect(miscTab).toHaveAttribute('aria-selected', 'false');

        await user.click(personalTab);
        expect(personalTab).toHaveAttribute('aria-selected', 'true');
        expect(clientTab).toHaveAttribute('aria-selected', 'false');

        await user.click(miscTab);
        expect(miscTab).toHaveAttribute('aria-selected', 'true');
        expect(personalTab).toHaveAttribute('aria-selected', 'false');
    });
});
