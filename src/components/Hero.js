import "../assets/styles/Hero.css";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { ArrowRightCircle } from "react-bootstrap-icons";
import TrackVisibility from "react-on-screen";
import bitmojiSpacePlanet from "../assets/images/bitmoji/bitmoji-space-planet-2.png";

const Hero = () => {
    const [isTyping, setIsTyping] = useState(true);
    const [jobTitle, setJobTitle] = useState("");
    const [roleCount, setRoleCount] = useState(0);
    const [typingDelay, setTypingDelay] = useState(200 - Math.random() * 50);
    // const [typingDelay, setTypingDelay] = useState(100);
    const roles = ["Front-End", "Back-End", "Full-Stack Developer   "];
    const pauseTime = 3456; // time between typing and deleting
    const yearsOfExp = new Date().getFullYear() - 2016;

    useEffect(() => {
        let typingTicker = setInterval(() => {
            doTyping();
        }, typingDelay);

        return () => {
            clearInterval(typingTicker);
        };
    });
    // }, [jobTitle]);

    const doTyping = () => {
        let currentRole = roleCount % roles.length;
        let fullText = roles[currentRole];
        let currentText = isTyping
            ? fullText.substring(0, jobTitle.length + 1)
            : fullText.substring(0, jobTitle.length - 1);

        setJobTitle(currentText);

        if (!isTyping) {
            // setTypingDelay((prevTState => {
            //     console.log("typingDelay: " + prevTypingDelay);
            //     console.log("typingDelay / 2: " + prevTypingDelay / 2);
            //     console.log("currentText: ", currentText);

            //     return prevState / 2;
            // });
            setTypingDelay(100);
        }

        if (isTyping && currentText === fullText) {
            setIsTyping(false);
            setTypingDelay(pauseTime);
        } else if (!isTyping && currentText === "") {
            setIsTyping(true);
            setRoleCount(roleCount + 1);
            setTypingDelay(321);
        }
    };

    return (
        <section id="home" className="hero about-me">
            <Container>
                <Row className="align-items-center">
                    <Col xs={12} md={7} xl={7}>
                        <TrackVisibility once>
                            {({ isVisible }) => (
                                <div
                                    className={`content ${
                                        isVisible &&
                                        "animate__animated animate__fadeIn animate__slower"
                                    }`}
                                >
                                    <span className="tagline">
                                        Thanks for dropping by
                                    </span>
                                    <h1 className="intro-header">Hi, I'm Miguel!</h1>
                                    <h1>
                                        I'm a{" "}
                                        <span className="typing-text">{jobTitle}</span>
                                    </h1>
                                    <p className="copy">
                                        My journey into programming began in 2005. I now
                                        have over{" "}
                                        <a
                                            className="accent nowrap"
                                            href="//www.linkedin.com/in/migueldotl/"
                                            rel="noreferrer"
                                            target="_blank"
                                        >
                                            {yearsOfExp} years
                                        </a>{" "}
                                        of professional experience. I place equal
                                        importantce on form and function, always
                                        considering the client's objective, the end-user's
                                        experience, and parsability for others who may
                                        work on the project. When I'm not writing code, I
                                        enjoy making music and learning{" "}
                                        <a
                                            className="accent nowrap"
                                            href="//www.duolingo.com/profile/MiguelDotL"
                                            rel="noreferrer"
                                            target="_blank"
                                        >
                                            new languages
                                        </a>
                                        .
                                    </p>
                                    <button
                                        className="hero-contact-button"
                                        onClick={() =>
                                            document
                                                .getElementById("contact")
                                                .scrollIntoView()
                                        }
                                    >
                                        Let's Chat
                                        <ArrowRightCircle size={25} />
                                    </button>
                                </div>
                            )}
                        </TrackVisibility>
                    </Col>
                    <Col className="image-col" xs={12} md={5} xl={5}>
                        <img
                            className="floating-image"
                            src={bitmojiSpacePlanet}
                            alt="Floating Caricature"
                        />
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default Hero;
