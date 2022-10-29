import "../assets/styles/NavBar.css";

import { useState, useEffect } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { FileEarmarkText } from "react-bootstrap-icons";
// import NavDropdown from "react-bootstrap/NavDropdown";
import SocialIcons from "./SocialIcons";

import logo from "../assets/images/logo.svg";
import linkedInIcon from "../assets/images/icons/linked-in.svg";
import twitterIcon from "../assets/images/icons/twitter.svg";
import githubIcon from "../assets/images/icons/github-2.svg";

const NavBar = () => {
    const [expanded, setExpanded] = useState(false);
    const [activeLink, setActiveLink] = useState("home");
    const [hasScrolled, setHasScrolled] = useState(false);
    const [bgTransparent, setBgTransparent] = useState(false);

    const socialsConfig = [
        {
            className: "linked-in",
            icon: linkedInIcon,
            url: "//www.linkedin.com/in/migueldotl/"
        },
        {
            className: "twitter",
            icon: twitterIcon,
            url: "//twitter.com/MiguelDotL"
        },
        {
            className: "github",
            icon: githubIcon,
            url: "//github.com/MiguelDotL"
        }
    ];

    useEffect(() => {
        const onScroll = () => {
            if (window.scrollY > 50) {
                setHasScrolled(true);
            } else {
                setHasScrolled(false);
            }
        };

        window.addEventListener("scroll", onScroll);
    }, []);

    const handleToggle = () => {
        console.log("toggleing");
        setExpanded(expanded ? false : "expanded");
        setBgTransparent(!bgTransparent);
    };

    const linkIsActive = () => {
        const hash = window.location.hash;
        if (activeLink === hash) return "active";
    };

    const onLinkClick = (linkName) => {
        setBgTransparent(false);
        setActiveLink(linkName);
        setExpanded(false);
    };

    return (
        <Navbar
            className={`${bgTransparent && "has-bg"} ${hasScrolled && "has-scrolled"} `}
            bg=""
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
                        <Nav.Link
                            href="#home"
                            className={`${linkIsActive()} navbar-link`}
                            onClick={() => onLinkClick("home")}
                        >
                            Home
                        </Nav.Link>
                        <Nav.Link
                            href="#skills"
                            className={`${linkIsActive()} navbar-link`}
                            onClick={() => onLinkClick("skills")}
                        >
                            Skills
                        </Nav.Link>
                        <Nav.Link
                            href="#projects"
                            className={`${linkIsActive()} navbar-link`}
                            onClick={() => onLinkClick("projects")}
                        >
                            Projects
                        </Nav.Link>
                        <Nav.Link
                            href="#contact"
                            className={`${linkIsActive()} navbar-link`}
                            onClick={() => onLinkClick("contact")}
                        >
                            Contact
                        </Nav.Link>
                    </Nav>
                    <span className="navbar-text">
                        <SocialIcons config={socialsConfig} />
                        <button
                            className="resume-button"
                            onClick={() => console.log("do resume things here")}
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
