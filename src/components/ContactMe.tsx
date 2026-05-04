import "../assets/styles/Contact.css";
import { Col, Container, Row } from "react-bootstrap";
import ContactForm from "./ContactForm";
import useInViewOnce from "../hooks/useInViewOnce";
import ResponsiveImage from "./ResponsiveImage";

import contactImage from "../assets/images/bitmoji/bitmoji-laptop-2.png";
import contactImageWebp from "../assets/images/bitmoji/bitmoji-laptop-2.webp";

const ContactMe = () => {
    const { ref, inView } = useInViewOnce<HTMLDivElement>();

    return (
        <section id="contact" className="contact">
            <Container>
                <Row className="align-items-center">
                    <Col md={6} className="contact-image-container">
                        <div
                            ref={ref}
                            className={`content animate__opacity-0 ${
                                inView && "animate__animated animate__fadeIn"
                            }`}
                        >
                            <h2 className="hire-me nowrap">Wanna Hire Me?</h2>
                            <ResponsiveImage
                                src={contactImage}
                                srcWebp={contactImageWebp}
                                alt="Caricature of Miguel working at a laptop"
                            />
                        </div>
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
