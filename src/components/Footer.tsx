import "../assets/styles/Footer.css";
import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import PreFooter from "./PreFooter";
import SocialIcons from "./SocialIcons";

import logo from "../assets/images/logo.svg";
import codepenIcon from "../assets/images/icons/codepen-icon.svg";
import npmIcon from "devicon/icons/npm/npm-original-wordmark.svg";
import codewarsIcon from "../assets/images/icons/codewars-icon.svg";
import codecademyIcon from "../assets/images/icons/codecademy-icon.svg";
import duolingoIcon from "../assets/images/icons/duolingo-icon.svg";

const socialsConfig = [
    {
        className: "codepen",
        icon: codepenIcon,
        url: "//codepen.io/MiguelDotL",
        label: "CodePen"
    },
    {
        className: "npm",
        icon: npmIcon,
        url: "//www.npmjs.com/~migueldotl",
        label: "npm"
    },
    {
        className: "codewars",
        icon: codewarsIcon,
        url: "//www.codewars.com/users/MiguelDotL",
        label: "Codewars"
    },
    {
        className: "codecademy",
        icon: codecademyIcon,
        url: "//www.codecademy.com/profiles/MiguelDotL",
        label: "Codecademy"
    },
    {
        className: "duolingo",
        icon: duolingoIcon,
        url: "//www.duolingo.com/profile/MiguelDotL",
        label: "Duolingo"
    }
];

const Footer = () => {
    const [hoveredLabel, setHoveredLabel] = useState<string | null>(null);

    return (
        <footer className="footer">
            <section>
                <PreFooter />
            </section>
            <section className="footer-bg">
                <Container>
                    <Row className="align-items-center">
                        <Col sm={6}>
                            <div className="see-what-else">
                                <span>
                                    See what else I'm up to:{' '}
                                    <span className="hovered-label">{hoveredLabel}</span>
                                </span>
                                <SocialIcons
                                    config={socialsConfig}
                                    onHover={setHoveredLabel}
                                />
                            </div>
                        </Col>
                        <Col sm={6}>
                            <div className="footer-right">
                                <div className="copyright">
                                    <span>
                                        Created by{" "}
                                        <span className="migueldotl">MiguelDotL</span>
                                    </span>
                                    <span>
                                        ©{new Date().getFullYear()} | Florida, USA
                                    </span>
                                </div>
                                <img
                                    className="logo"
                                    src={logo}
                                    alt="Miguel Lozano Logo"
                                    width={42}
                                    height={42}
                                    loading="lazy"
                                />
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </footer>
    );
};

export default Footer;
