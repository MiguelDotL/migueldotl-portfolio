import "../assets/styles/Skills.css";
import { Container, Row } from "react-bootstrap";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import devicon from "devicon";
import meter from "../assets/images/meter1.svg";
import colorPop from "../assets/images/backgrounds/color-pop.png";

const Skills = () => {
    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3
        },
        tablet: {
            breakpoint: { max: 1024, min: 768 },
            items: 3
        },
        mobile: {
            breakpoint: { max: 768, min: 0 },
            items: 1,
            centerMode: true
        }
    };

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
                        <Carousel
                            className="skills-slider"
                            responsive={responsive}
                            infinite={true}
                            swipeable={true}
                        >
                            <div className="item">
                                {/* <img src={meter} alt="" /> */}
                                <i className="devicon devicon-html5-plain"></i>
                                <h5>HTML5</h5>
                            </div>
                            <div className="item">
                                <img src={meter} alt="" />
                                {/* <i className="devicon devicon-css3-plain"></i> */}
                                <h5>CSS</h5>
                            </div>
                            <div className="item">
                                <img src={meter} alt="" />
                                {/* <i className="devicon devicon-javascript-plain"></i> */}
                                <h5>Javascript</h5>
                            </div>
                            <div className="item">
                                {/* <i className="devicon devicon-javascript-plain"></i> */}
                                <img src={meter} alt="" />
                                <h5>Ruby on Rails</h5>
                            </div>
                        </Carousel>
                    </div>
                </Row>
            </Container>
        </section>
    );
};

export default Skills;
