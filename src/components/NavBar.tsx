import '../assets/styles/NavBar.css';

import { useState, useEffect } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { FileEarmarkText } from 'react-bootstrap-icons';
import SocialIcons from './SocialIcons';

import logo from '../assets/images/logo.svg';
import linkedInIcon from '../assets/images/icons/linked-in.svg';
import twitterXIcon from '../assets/images/icons/twitter-x.svg';
import githubIcon from '../assets/images/icons/github-2.svg';

const NavBar = () => {
    const [expanded, setExpanded] = useState(false);
    const [activeLink, setActiveLink] = useState('home');
    const [hasScrolled, setHasScrolled] = useState(false);
    const [bgTransparent, setBgTransparent] = useState(false);

    const navLinks = [
        { name: 'home', text: 'Home' },
        { name: 'skills', text: 'Skills' },
        { name: 'projects', text: 'Projects' },
        { name: 'contact', text: 'Contact' }
    ];

    const socialsConfig = [
        {
            className: 'linked-in',
            icon: linkedInIcon,
            url: 'https://www.linkedin.com/in/migueldot/',
            label: 'LinkedIn'
        },
        {
            className: 'twitter',
            icon: twitterXIcon,
            // icon: twitterIcon,
            url: '//twitter.com/MiguelDotL',
            label: 'X (Twitter)'
        },
        {
            className: 'github',
            icon: githubIcon,
            url: '//github.com/MiguelDotL',
            label: 'GitHub'
        }
    ];

    const resumePath = '/resources/miguel_lozano_resume_2024.pdf';

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
    useEffect(() => {
        const sectionIds = navLinks.map(({ name }) => name);

        const onScroll = () => {
            const triggerY = 100;
            const sections = sectionIds
                .map((id) => document.getElementById(id))
                .filter((el): el is HTMLElement => el !== null);

            let current = sectionIds[0];
            for (const section of sections) {
                if (section.getBoundingClientRect().top <= triggerY) {
                    current = section.id;
                }
            }
            setActiveLink(current);
        };

        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const handleToggle = () => {
        setExpanded(!expanded);
        setBgTransparent(!bgTransparent);
    };

    const handleActiveLink = (link: string) => {
        if (activeLink === link) return 'active';
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
                        {navLinks.map(({ name, text }) => (
                            <Nav.Link
                                href={`#${name}`}
                                key={name}
                                className={`${handleActiveLink(name)} navbar-link`}
                                onClick={() => onLinkClick(name)}
                            >
                                {text}
                            </Nav.Link>
                        ))}
                    </Nav>
                    <span className="navbar-text">
                        <SocialIcons config={socialsConfig} />
                        <button
                            className="resume-button"
                            onClick={() =>
                                window.open(`${import.meta.env.BASE_URL}${resumePath.replace(/^\//, '')}`)
                            }
                        >
                            <FileEarmarkText size={20} className="me-2" />
                            <span>My Resume</span>
                        </button>
                    </span>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavBar;
