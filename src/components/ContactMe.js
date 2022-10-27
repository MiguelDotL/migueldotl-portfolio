import "../assets/styles/Contact.css";
import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import contactImage from "../assets/images/bitmoji/bitmoji-laptop-2.png";
import getForm from "../apis/getForm";

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
    const [loading, setLoading] = useState(false);
    // const [formStatus, setFormStatus] = useState(true);
    const [formStatus, setFormStatus] = useState({
        status: null,
        success: null,
        error: null,
        message: ""
    });

    const onFormChange = () => {
        return (e) => {
            const name = e.target.name;
            const value = e.target.value;
            setFormValues(() => ({
                ...formValues,
                [name]: value
            }));
        };
    };

    const onFormSubmit = (e) => {
        e.preventDefault();
        setButtonText("Sending...");
        if (loading) return;
        setLoading(true);

        const formEndpoint = "f/fc61ece9-9e62-44b7-8e77-a71d19cb1697";

        getForm
            .post(formEndpoint, formValues)
            .then(function (response) {
                console.log("response: ", response);
                setFormStatus({
                    success: response.data.success,
                    status: response.status,
                    error: null,
                    message: "Thanks for reaching out, I'll be in touch!"
                });
                setFormValues(initialValues);
                setLoading(false);
                setButtonText("Send");
            })
            .catch(function (error) {
                setFormStatus({
                    ...formStatus,
                    error: error.message,
                    message: `Oops! ${error.message} - Please try again later.`
                });
                setLoading(false);
                setButtonText("Send");
            });
    };

    return (
        <section id="contact" className="contact">
            <Container>
                <Row className="align-items-center">
                    <Col md={6}>
                        <img src={contactImage} alt="" />
                    </Col>
                    <Col md={6}>
                        <h2>Let's Chat!</h2>
                        {/* TODO: Refactor forn to ContactForm component once working with GetForm API */}
                        <form encype="multipart/form-data" onSubmit={onFormSubmit}>
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

                                <Col className="px-1" sm={12}>
                                    <textarea
                                        name="message"
                                        rows="6"
                                        value={formValues.message}
                                        placeholder="Message"
                                        onChange={onFormChange()}
                                    />
                                </Col>
                                <div className="submit-container">
                                    <button type="submit">
                                        <span>{buttonText}</span>
                                    </button>
                                    <div
                                        className={`form-status-message ${
                                            formStatus.success ? "success" : "danger"
                                        }`}
                                    >
                                        <p>{formStatus.message}</p>
                                    </div>
                                </div>
                            </Row>
                        </form>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};
export default ContactMe;
