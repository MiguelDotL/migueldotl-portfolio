import "../assets/styles/Contact.css";
import { Col, Container, Row } from "react-bootstrap";
import TrackVisibility from "react-on-screen";
import ContactForm from "./ContactForm";

import contactImage from "../assets/images/bitmoji/bitmoji-laptop-2.png";

const ContactMe = () => {
    return (
        <section id="contact" className="contact">
            <Container>
                <Row className="align-items-center">
                    <Col md={6} className="contact-image-container">
                        <TrackVisibility partialVisibility once>
                            {({ isVisible }) => (
                                <div
                                    className={`content animate__opacity-0 ${
                                        isVisible && "animate__animated animate__fadeIn"
                                    }`}
                                >
                                    <h2 className="hire-me nowrap">Wanna Hire Me?</h2>
                                    <img className="" src={contactImage} alt="" />
                                </div> //
                            )}
                        </TrackVisibility>
                    </Col>
                    <Col md={6} className="contact-form-container">
                        <h3 className="hire-me">Wanna Hire Me?</h3>
                        <h2 className="lets-chat">Let's Chat!</h2>
                        <ContactForm />
                    </Col>
                </Row>
            </Container>
        </section>
    );
};
export default ContactMe;
