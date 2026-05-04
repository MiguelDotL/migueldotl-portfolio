import "../assets/styles/Footer.css";
import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import PreFooter from "./PreFooter";
import SocialIcons from "./SocialIcons";

import logo from "../assets/images/logo.svg";
import { FOOTER_SOCIALS } from "../data/socials";

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
                                    config={FOOTER_SOCIALS}
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
