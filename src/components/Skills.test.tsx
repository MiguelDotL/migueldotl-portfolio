import { render, screen } from '@testing-library/react';
import Skills from './Skills';

describe('Skills', () => {
    test('renders Skills heading and copy', () => {
        render(<Skills />);
        expect(screen.getByRole('heading', { name: /^Skills$/i })).toBeInTheDocument();
        expect(screen.getByText(/I love trying out new technologies/i)).toBeInTheDocument();
    });

    test('mounts the carousel without crashing', () => {
        const { container } = render(<Skills />);
        expect(container.querySelector('.skills-content')).toBeInTheDocument();
    });
});
