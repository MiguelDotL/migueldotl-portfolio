import "../assets/styles/NavBar.css";

import { useState, useEffect } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
// import NavDropdown from "react-bootstrap/NavDropdown";

import logo from "../assets/images/logo.svg";
import linkedInIcon from "../assets/images/icons/linked-in.svg";
import twitterIcon from "../assets/images/icons/twitter.svg";
import githubIcon from "../assets/images/icons/github-2.svg";

const NavBar = () => {
    const [activeLink, setActiveLink] = useState("about-me");
    const [hasScrolled, setHasScrolled] = useState(false);
    const links = {
        linkedIin: "https://www.linkedin.com/in/migueldotl/",
        twitter: "https://www.linkedin.com/in/migueldotl/",
        github: "https://github.com/MiguelDotL",
        resume: ""
    };

    useEffect(() => {
        console.log("inside of useEffect");
        const onScroll = () => {
            if (window.scrollY > 50) {
                setHasScrolled(true);
            } else {
                setHasScrolled(false);
            }
        };

        window.addEventListener("scroll", onScroll);

        // return clean-up function
        return window.removeEventListener("scroll", onScroll);
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
                <Navbar.Brand href="#home">
                    <div className="logo-bg">
                        <img src={logo} className="logo" alt="logo" />
                    </div>
                    <div className="brand-text">
                        <strong>MIGUEL</strong> LOZANO
                    </div>
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="basic-navbar-nav">
                    <span className="navbar-toggle-icon"></span>
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
                        <div className="social-icons">
                            <a
                                className="social-icon linked-in"
                                href={links.linkedIn}
                                target="_blank"
                                rel="noreferrer"
                            >
                                <img src={linkedInIcon} alt="" />
                            </a>
                            <a
                                className="social-icon twitter"
                                href={links.twitter}
                                target="_blank"
                                rel="noreferrer"
                            >
                                <img src={twitterIcon} alt="" />
                            </a>
                            <a
                                className="social-icon github"
                                href={links.github}
                                target="_blank"
                                rel="noreferrer"
                            >
                                <img src={githubIcon} alt="" />
                            </a>
                        </div>
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
