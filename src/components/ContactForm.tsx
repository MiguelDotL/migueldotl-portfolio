import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { Col, Row } from "react-bootstrap";
import getForm from "../apis/getForm";

type FormStatus = {
    status: number | null;
    success: boolean | null;
    error: string | null;
    message: string;
};

const ContactForm = () => {
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
    const [formStatus, setFormStatus] = useState<FormStatus>({
        status: null,
        success: null,
        error: null,
        message: ""
    });

    const onFormChange = () => {
        return (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            const name = e.target.name;
            const value = e.target.value;
            setFormValues(() => ({
                ...formValues,
                [name]: value
            }));
        };
    };

    const onFormSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setButtonText("Sending...");
        if (loading) return;
        setLoading(true);

        const formEndpoint = import.meta.env.VITE_FORM_ENDPOINT;

        getForm
            .post(formEndpoint, formValues)
            .then((response) => {
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
            .catch((error: Error) => {
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
        <form encType="multipart/form-data" onSubmit={onFormSubmit}>
            <Row>
                <Col className="px-1" sm={6}>
                    <input
                        type="text"
                        name="firstName"
                        value={formValues.firstName}
                        placeholder="First Name"
                        aria-label="First Name"
                        onChange={onFormChange()}
                    />
                </Col>
                <Col className="px-1" sm={6}>
                    <input
                        type="text"
                        name="lastName"
                        value={formValues.lastName}
                        placeholder="Last Name"
                        aria-label="Last Name"
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
                        aria-label="Email Address"
                        onChange={onFormChange()}
                    />
                </Col>
                <Col className="px-1" sm={6}>
                    <input
                        type="tel"
                        name="phone"
                        value={formValues.phone}
                        placeholder="Phone Number"
                        aria-label="Phone Number"
                        onChange={onFormChange()}
                    />
                </Col>

                <Col className="px-1" sm={12}>
                    <textarea
                        name="message"
                        rows={6}
                        value={formValues.message}
                        placeholder="Message"
                        aria-label="Message"
                        onChange={onFormChange()}
                    />
                </Col>
                <div className="submit-container px-1">
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
    );
};
export default ContactForm;
