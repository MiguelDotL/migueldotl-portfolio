import '../assets/styles/NavBar.css';

import { useState, useEffect } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import SocialIcons from './SocialIcons';
import NavLink from './NavLink';
import ResumeButton from './ResumeButton';

import logo from '../assets/images/logo.svg';
import { NAV_LINKS, RESUME_PATH } from '../data/site';
import { NAV_SOCIALS } from '../data/socials';

const NavBar = () => {
    const [expanded, setExpanded] = useState(false);
    const [activeLink, setActiveLink] = useState('home');
    const [hasScrolled, setHasScrolled] = useState(false);
    const [bgTransparent, setBgTransparent] = useState(false);

    useEffect(() => {
        const onScroll = () => {
            if (window.scrollY > 50) {
                setHasScrolled(true);
            } else {
                setHasScrolled(false);
            }
        };

        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // Scroll spy: active link = last section whose top edge is at or above the trigger line.
    // Monotonic — won't oscillate as sections enter/exit the viewport.
    // Listener attaches via requestIdleCallback so it doesn't compete with LCP.
    useEffect(() => {
        const sectionIds = NAV_LINKS.map(({ name }) => name);

        const onScroll = () => {
            const triggerY = 100;
            const sections = sectionIds
                .map((id) => document.getElementById(id))
                .filter((el): el is HTMLElement => el !== null);

            let current: string = sectionIds[0];
            for (const section of sections) {
                if (section.getBoundingClientRect().top <= triggerY) {
                    current = section.id;
                }
            }
            setActiveLink(current);
        };

        onScroll();
        // requestIdleCallback/cancelIdleCallback are in lib.dom but absent in
        // Safari pre-2022. The runtime guard below (`if (ric)`) handles that
        // case — no cast needed since lib.dom types them on Window.
        const ric = window.requestIdleCallback;
        const cic = window.cancelIdleCallback;
        let idleHandle: number | undefined;
        let timeoutHandle: number | undefined;
        const attach = () => {
            window.addEventListener('scroll', onScroll, { passive: true });
        };
        if (ric) {
            idleHandle = ric(attach, { timeout: 2000 });
        } else {
            timeoutHandle = window.setTimeout(attach, 1);
        }
        return () => {
            if (idleHandle !== undefined && cic) cic(idleHandle);
            if (timeoutHandle !== undefined) window.clearTimeout(timeoutHandle);
            window.removeEventListener('scroll', onScroll);
        };
    }, []);

    const handleToggle = () => {
        setExpanded(!expanded);
        setBgTransparent(!bgTransparent);
    };

    const onLinkClick = (linkName: string) => {
        setActiveLink(linkName);
        setBgTransparent(false);
        setExpanded(false);
    };

    return (
        <Navbar
            className={`${bgTransparent && 'has-bg'} ${hasScrolled && 'has-scrolled'} `}
            expand="lg"
            expanded={expanded}
        >
            <Container>
                <Navbar.Brand href="#home">
                    <div className="logo-bg">
                        <img src={logo} className="logo" alt="logo" />
                    </div>
                    <div className="brand-text">
                        <strong>MIGUEL</strong> LOZANO
                    </div>
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={handleToggle}>
                    <span className="navbar-toggler-icon"></span>
                </Navbar.Toggle>

                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        {NAV_LINKS.map(({ name, text }) => (
                            <NavLink
                                key={name}
                                name={name}
                                text={text}
                                isActive={activeLink === name}
                                onClick={() => onLinkClick(name)}
                            />
                        ))}
                    </Nav>
                    <span className="navbar-text">
                        <SocialIcons config={NAV_SOCIALS} />
                        <ResumeButton resumePath={RESUME_PATH} />
                    </span>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavBar;
