import "../assets/styles/Skills.css";
import { Container, Row } from "react-bootstrap";
import TrackVisibility from "react-on-screen";
import "react-multi-carousel/lib/styles.css";
import colorPop from "../assets/images/backgrounds/color-pop.png";
import SkillsCarousel from "./SkillsCarousel";

const Skills = () => {
    return (
        <section id="skills" className="skills">
            <img
                src={colorPop}
                alt="decorative background"
                className="background-image-left"
            />
            <Container>
                <Row>
                    <div className="skills-content">
                        <TrackVisibility partialVisibility once>
                            {({ isVisible }) => (
                                <div
                                    className={`animate__opacity-0 ${
                                        isVisible &&
                                        "animate__animated animate__fadeIn animate__slower"
                                    }`}
                                >
                                    <h2>Skills</h2>
                                    <p className="copy">
                                        I love trying out new technologies, but I am well
                                        versed in building projects with standard HTML,
                                        CSS, Vanilla JS, and PHP. My professional
                                        experience, and a never-ending quest for
                                        knowledge, has led me to work in several libraries
                                        and frameworks, like Ruby on Rails, React,
                                        Angular, and jQuery.
                                    </p>
                                </div>
                            )}
                        </TrackVisibility>
                        <SkillsCarousel />
                    </div>
                </Row>
            </Container>
        </section>
    );
};

export default Skills;
