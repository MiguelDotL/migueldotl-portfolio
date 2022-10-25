import "../assets/styles/Contact.css";
import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import contactImage from "../assets/images/bitmoji/bitmoji-laptop-2.png";

const ContactMe = () => {
    const initialValues = {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        message: ""
    };
    const [formValues, setFormValues] = useState(initialValues);
    const [buttonText, setButtonText] = useState("send");
    const [status, setStatus] = useState({});

    const onFormChange = (field, value) => {
        setFormValues({
            ...formValues,
            [field]: value
        });
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
                                        value={formValues.firstName}
                                        placeholder="First Name"
                                        onChange={(e) =>
                                            onFormChange("firstName", e.target.value)
                                        }
                                    />
                                </Col>
                                <Col className="px-1" sm={6}>
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={formValues.lastName}
                                        placeholder="Last Name"
                                        onChange={(e) =>
                                            onFormChange("lastName", e.target.value)
                                        }
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col className="px-1" sm={6}>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formValues.email}
                                        placeholder="Email Address"
                                        onChange={(e) =>
                                            onFormChange("email", e.target.value)
                                        }
                                    />
                                </Col>
                                <Col className="px-1" sm={6}>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formValues.phone}
                                        placeholder="Phone Number"
                                        onChange={(e) =>
                                            onFormChange("phone", e.target.value)
                                        }
                                    />
                                </Col>

                                <Col className="px-1">
                                    <textarea
                                        name="message"
                                        rows="6"
                                        value={formValues.message}
                                        placeholder="Message"
                                        onChange={(e) =>
                                            onFormChange("message", e.target.value)
                                        }
                                    />
                                    <button type="submit">
                                        <span>{buttonText}</span>
                                    </button>
                                </Col>
                                {status.message && (
                                    <Col>
                                        <p
                                            className={`status-message ${
                                                status.success ? "success" : "danger"
                                            }`}
                                        >
                                            {status.messsage}
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
