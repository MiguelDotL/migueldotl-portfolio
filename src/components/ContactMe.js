import "../assets/styles/Contact.css";
import axios from "axios";
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
    const [formStatus, setFormStatus] = useState(false);
    // const [formStatus, setFormStatus] = useState({});
    const [loading, setLoading] = useState(false);

    const onFormChange = () => {
        return (e) => {
            const name = e.target.name;
            const value = e.target.value;
            setFormValues((prevState) => ({
                ...formValues,
                [name]: value
            }));
        };
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (loading) return;
        setLoading(true);
        const formData = new FormData();
        Object.entries(formValues).forEach(([key, value]) => {
            formData.append(key, value);
        });

        axios
            .post("https://getform.io/f/fc61ece9-9e62-44b7-8e77-a71d19cb1697", formData, {
                headers: { Accept: "application/json" }
            })
            .then(function (response) {
                setFormStatus(true);
                setFormValues({
                    firstName: "",
                    lastName: "",
                    email: "",
                    phone: "",
                    message: ""
                });
                setLoading(false);
            })
            .catch(function (error) {
                console.log(error);
                setLoading(false);
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
                        <form encype="multipart/form-data" onSubmit={handleSubmit}>
                            <Row>
                                <Col className="px-1" sm={6}>
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={formValues.firstName}
                                        placeholder="First Name"
                                        onChange={onFormChange()}
                                    />
                                </Col>
                                <Col className="px-1" sm={6}>
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={formValues.lastName}
                                        placeholder="Last Name"
                                        onChange={onFormChange()}
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
                                        onChange={onFormChange()}
                                    />
                                </Col>
                                <Col className="px-1" sm={6}>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formValues.phone}
                                        placeholder="Phone Number"
                                        onChange={onFormChange()}
                                    />
                                </Col>

                                <Col className="px-1">
                                    <textarea
                                        name="message"
                                        rows="6"
                                        value={formValues.message}
                                        placeholder="Message"
                                        onChange={onFormChange()}
                                    />
                                    <button type="submit">
                                        <span>{buttonText}</span>
                                    </button>
                                </Col>
                                {formStatus && <p>Message sent.</p>}
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
