import "../assets/styles/Skills.css";
import { Container, Row } from "react-bootstrap";
import "react-multi-carousel/lib/styles.css";
import colorPop from "../assets/images/backgrounds/color-pop.png";
import SkillsCarousel from "./SkillsCarousel";

const Skills = () => {
    return (
        <section id="skills" className="skills">
            <img
                src={colorPop}
                alt="decorative backround"
                className="background-image-left"
            />
            <Container>
                <Row>
                    <div className="skills-container">
                        <h2>Skills</h2>
                        <p>
                            I love trying out new technologies, but I am well versed in
                            building projects with standard HTML, CSS, Vanilla JS, and
                            PHP. My professional experience, and a never-ending quest for
                            knowledge, has led me to work in several libraries and
                            frameworks, like Ruby on Rails, React, Angular, and jQuery.
                        </p>
                        <SkillsCarousel />
                    </div>
                </Row>
            </Container>
        </section>
    );
};

export default Skills;
