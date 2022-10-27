import "../assets/styles/NavBar.css";

import { useState, useEffect } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
// import NavDropdown from "react-bootstrap/NavDropdown";
import SocialIcons from "./SocialIcons";

import logo from "../assets/images/logo.svg";
import linkedInIcon from "../assets/images/icons/linked-in.svg";
import twitterIcon from "../assets/images/icons/twitter.svg";
import githubIcon from "../assets/images/icons/github-2.svg";

const NavBar = () => {
    const [activeLink, setActiveLink] = useState("about-me");
    const [hasScrolled, setHasScrolled] = useState(false);

    const socialsConfig = [
        {
            className: "linked-in",
            icon: linkedInIcon,
            url: "https://www.linkedin.com/in/migueldotl/"
        },
        {
            className: "twitter",
            icon: twitterIcon,
            url: "https://twitter.com/MiguelDotL"
        },
        {
            className: "github",
            icon: githubIcon,
            url: "https://github.com/MiguelDotL"
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

    const linkIsActive = (linkName) => {
        if (activeLink === linkName) return "active";
    };

    // const updateActiveLink = (linkName) => {
    //     setActiveLink(linkName);
    // };

    return (
        <Navbar className={hasScrolled && "has-scrolled"} bg="" expand="lg">
            <Container>
                <Navbar.Brand onClick={() => window.scrollTo(0, 0)}>
                    <div className="logo-bg">
                        <img src={logo} className="logo" alt="logo" />
                    </div>
                    <div className="brand-text">
                        <strong>MIGUEL</strong> LOZANO
                    </div>
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="basic-navbar-nav">
                    <span className="navbar-toggler-icon"></span>
                </Navbar.Toggle>

                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link
                            href="#about-me"
                            className={`${linkIsActive("about-me")} navbar-link`}
                            onClick={() => setActiveLink("about-me")}
                        >
                            About Me
                        </Nav.Link>
                        <Nav.Link
                            href="#skills"
                            className={`${linkIsActive("skills")} navbar-link`}
                            onClick={() => setActiveLink("skills")}
                        >
                            Skills
                        </Nav.Link>
                        <Nav.Link
                            href="#projects"
                            className={`${linkIsActive("projects")} navbar-link`}
                            onClick={() => setActiveLink("projects")}
                        >
                            Projects
                        </Nav.Link>
                    </Nav>
                    <span className="navbar-text">
                        <SocialIcons config={socialsConfig} />
                        <button
                            className="contact-button"
                            onClick={() => console.log("letsConnect")}
                        >
                            <span>Let's Connect</span>
                        </button>
                    </span>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavBar;
