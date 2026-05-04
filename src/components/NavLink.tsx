import { Nav } from 'react-bootstrap';

type Props = {
    /** Section id this link points to (also used as the URL hash). */
    name: string;
    text: string;
    isActive: boolean;
    onClick: () => void;
};

// Top-level nav link rendered inside NavBar's Nav.Link map. Wraps
// react-bootstrap's Nav.Link with the active-class logic so the host
// component doesn't have to build the className string ad-hoc.
const NavLink = ({ name, text, isActive, onClick }: Props) => (
    <Nav.Link
        href={`#${name}`}
        className={`${isActive ? 'active' : ''} navbar-link`}
        onClick={onClick}
    >
        {text}
    </Nav.Link>
);

export default NavLink;
