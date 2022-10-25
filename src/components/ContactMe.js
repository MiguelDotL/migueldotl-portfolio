import "../assets/styles/Contact.css";
import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import contactImage from "../assets/images/bitmoji/bitmoji-laptop-2.png";

const ContactMe = () => {
    const initialFormData = {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        message: ""
    };
    const [formData, setFormData] = useState(initialFormData);
    const [buttonText, setButtonText] = useState("send");
    const [formStatus, setFormStatus] = useState({});

    const onFormChange = () => {
        return (e) => {
            const fieldName = e.target.name;
            const fieldValue = e.target.value;
            setFormData({
                ...formData,
                [fieldName]: fieldValue
            });
        };
    };

    return (
        <section id="contact-me" className="contact">
            <Container>
                <Row className="align-items-center">
                    <Col md={6}>
                        <img src={contactImage} alt="" />
                    </Col>
                    <Col md={6}>
                        <h2>Let's Chat!</h2>
                        {/* TODO: Refactor forn to ContactForm component once working with GetForm API */}
                        <form
                            action="https://getform.io/f/fc61ece9-9e62-44b7-8e77-a71d19cb1697"
                            method="POST"
                        >
                            <Row>
                                <Col className="px-1" sm={6}>
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={formData.firstName}
                                        placeholder="First Name"
                                        onChange={(e) => onFormChange()}
                                    />
                                </Col>
                                <Col className="px-1" sm={6}>
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={formData.lastName}
                                        placeholder="Last Name"
                                        onChange={(e) => onFormChange()}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col className="px-1" sm={6}>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        placeholder="Email Address"
                                        onChange={(e) => onFormChange()}
                                    />
                                </Col>
                                <Col className="px-1" sm={6}>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        placeholder="Phone Number"
                                        onChange={(e) => onFormChange()}
                                    />
                                </Col>

                                <Col className="px-1">
                                    <textarea
                                        name="message"
                                        rows="6"
                                        value={formData.message}
                                        placeholder="Message"
                                        onChange={(e) => onFormChange()}
                                    />
                                    <button type="submit">
                                        <span>{buttonText}</span>
                                    </button>
                                </Col>
                                {formStatus.message && (
                                    <Col>
                                        <p
                                            className={`formStatus-message ${
                                                formStatus.success ? "success" : "danger"
                                            }`}
                                        >
                                            {formStatus.messsage}
                                        </p>
                                    </Col>
                                )}
                            </Row>
                        </form>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};
export default ContactMe;
