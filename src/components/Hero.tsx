import "../assets/styles/Hero.css";
import { Col, Container, Row } from "react-bootstrap";
import HeroContent from "./HeroContent";
import bitmojiSpacePlanet from "../assets/images/bitmoji/bitmoji-space-planet-2.png";
import bitmojiSpacePlanetWebp from "../assets/images/bitmoji/bitmoji-space-planet-2.webp";

const Hero = () => {
    return (
        <section id="home" className="hero about-me">
            <Container>
                <Row className="align-items-center">
                    <Col xs={12} md={7} xl={7}>
                        <HeroContent />
                    </Col>
                    <Col className="image-col" xs={12} md={5} xl={5}>
                        <picture>
                            <source srcSet={bitmojiSpacePlanetWebp} type="image/webp" />
                            <img
                                className="floating-image"
                                src={bitmojiSpacePlanet}
                                alt="Floating Caricature"
                                width={1592}
                                height={1592}
                                fetchPriority="high"
                            />
                        </picture>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default Hero;
