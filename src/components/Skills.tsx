import "../assets/styles/Skills.css";
import { Container, Row } from "react-bootstrap";
import { useInView } from "react-intersection-observer";
import "react-multi-carousel/lib/styles.css";
import colorPop from "../assets/images/backgrounds/color-pop.png";
import SkillsCarousel from "./SkillsCarousel";

const Skills = () => {
    const { ref, inView } = useInView({ triggerOnce: true });

    return (
        <section id="skills" className="skills">
            <img
                src={colorPop}
                alt=""
                aria-hidden="true"
                className="background-image-left"
                loading="lazy"
            />
            <Container>
                <Row>
                    <div className="skills-content">
                        <div
                            ref={ref}
                            className={`animate__opacity-0 ${
                                inView &&
                                "animate__animated animate__fadeIn animate__slower"
                            }`}
                        >
                            <h2>Skills</h2>
                            <p className="copy">
                                I love trying out new technologies, but I am well
                                versed in building projects with standard HTML, CSS,
                                Vanilla JS, and PHP. My professional experience, and a
                                never-ending quest for knowledge, has led me to work
                                in several libraries and frameworks, like Ruby on
                                Rails, React, Angular, and jQuery.
                            </p>
                        </div>
                        <SkillsCarousel />
                    </div>
                </Row>
            </Container>
        </section>
    );
};

export default Skills;
