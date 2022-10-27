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
                            Animi amet voluptas, asperiores nesciunt adipisci explicabo
                            itaque magnam saepe a dolores, tenetur delectus consectetur
                            unde doloremque, aliquid eius ratione minus ut!
                        </p>

                        <SkillsCarousel />
                    </div>
                </Row>
            </Container>
        </section>
    );
};

export default Skills;
