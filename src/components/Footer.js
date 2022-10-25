import "../assets/styles/Footer.css";
import { Container, Row, Col } from "react-bootstrap";
import PreFooter from "./PreFooter";
import SocialIcons from "./SocialIcons";

import codepenIcon from "../assets/images/icons/codepen-icon.svg";
import codewarsIcon from "../assets/images/icons/codewars-icon.svg";
import codecademyIcon from "../assets/images/icons/codecademy-icon.svg";
import udemyIcon from "../assets/images/icons/udemy-icon.svg";

const socialsConfig = [
    {
        className: "codepen",
        icon: codepenIcon,
        url: "https://codepen.io/MiguelDotL"
    },
    {
        className: "codewars",
        icon: codewarsIcon,
        url: "https://www.codewars.com/users/MiguelDotL"
    },
    {
        className: "codecademy",
        icon: codecademyIcon,
        url: "https://www.codecademy.com/profiles/MiguelDotL"
    },
    {
        className: "udemy",
        icon: udemyIcon,
        url: "https://www.udemy.com/user/miguel-lozano-4/"
    }
];

const Footer = () => {
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
                                <span>See what else I'm up to: </span>
                                <SocialIcons config={socialsConfig} />
                            </div>
                        </Col>
                        <Col sm={6}>
                            <img src="" alt="" />
                        </Col>
                    </Row>
                </Container>
            </section>
        </footer>
    );
};

export default Footer;
