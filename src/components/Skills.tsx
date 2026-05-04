import "../assets/styles/Skills.css";
import { Container, Row } from "react-bootstrap";
import "react-multi-carousel/lib/styles.css";
import colorPop from "../assets/images/backgrounds/color-pop.png";
import colorPopWebp from "../assets/images/backgrounds/color-pop.webp";
import SkillsCarousel from "./SkillsCarousel";
import useInViewOnce from "../hooks/useInViewOnce";
import ResponsiveImage from "./ResponsiveImage";
import { FADE_IN_SLOWER } from "../constants/animationClasses";

const Skills = () => {
    const { ref, inView } = useInViewOnce<HTMLDivElement>();

    return (
        <section id="skills" className="skills">
            <ResponsiveImage
                src={colorPop}
                srcWebp={colorPopWebp}
                alt=""
                aria-hidden="true"
                className="background-image-left"
                width={776}
                height={1064}
                loading="lazy"
            />
            <Container>
                <Row>
                    <div className="skills-content">
                        <div
                            ref={ref}
                            className={`animate__opacity-0 ${
                                inView &&
                                FADE_IN_SLOWER
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
