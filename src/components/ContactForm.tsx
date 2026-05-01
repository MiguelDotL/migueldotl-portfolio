import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { Col, Row } from "react-bootstrap";

type FormStatus = {
    status: number | null;
    success: boolean | null;
    error: string | null;
    message: string;
};

type SubmitResponse = { status: number; data: { success: boolean; message: string } };

const submitForm = async (
    payload: Record<string, string>
): Promise<SubmitResponse> => {
    const mock = import.meta.env.VITE_MOCK_FORM;
    const isMockable = import.meta.env.DEV && import.meta.env.MODE !== "test";
    if (isMockable && mock) {
        await new Promise((resolve) => setTimeout(resolve, 500));
        if (mock === "error") {
            return { status: 200, data: { success: false, message: "[MOCK] Spam detected" } };
        }
        if (mock === "throw") {
            throw new Error("[MOCK] Request failed with status code 429");
        }
        return { status: 200, data: { success: true, message: "[MOCK] Email sent" } };
    }
    return axios.post(import.meta.env.VITE_FORM_ENDPOINT, payload);
};

const ContactForm = () => {
    const initialValues = {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        message: "",
        botcheck: ""
    };
    const [formValues, setFormValues] = useState(initialValues);
    const [buttonText, setButtonText] = useState("Send");
    const [loading, setLoading] = useState(false);
    const [formStatus, setFormStatus] = useState<FormStatus>({
        status: null,
        success: null,
        error: null,
        message: ""
    });

    const isSent = formStatus.success === true;

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
        if (loading || isSent) return;
        setButtonText("Sending...");
        setLoading(true);

        const payload = {
            access_key: import.meta.env.VITE_FORM_ACCESS_KEY,
            subject: `Portfolio contact from ${formValues.firstName} ${formValues.lastName}`.trim(),
            ...formValues
        };

        submitForm(payload)
            .then((response) => {
                if (response.data.success) {
                    setFormStatus({
                        success: true,
                        status: response.status,
                        error: null,
                        message: "Thanks for reaching out, I'll be in touch!"
                    });
                    setFormValues(initialValues);
                    setButtonText("Sent ✓");
                } else {
                    setFormStatus({
                        success: false,
                        status: response.status,
                        error: response.data.message ?? "Submission failed",
                        message: "Oops! Request Failed. Please try again soon"
                    });
                    setButtonText("Send");
                }
                setLoading(false);
            })
            .catch((error: Error) => {
                setFormStatus({
                    ...formStatus,
                    error: error.message,
                    message: "Oops! Request Failed. Please try again soon"
                });
                setLoading(false);
                setButtonText("Send");
            });
    };

    const containerClasses = [
        "submit-container",
        "px-1",
        isSent ? "is-sent" : ""
    ]
        .filter(Boolean)
        .join(" ");

    const statusClass =
        formStatus.success === true
            ? "success"
            : formStatus.success === false
            ? "danger"
            : "";

    return (
        <form onSubmit={onFormSubmit}>
            <input
                type="text"
                name="botcheck"
                value={formValues.botcheck}
                onChange={onFormChange()}
                style={{ display: "none" }}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
            />
            <Row>
                <Col className="px-1" sm={6}>
                    <input
                        type="text"
                        name="firstName"
                        value={formValues.firstName}
                        placeholder="First Name *"
                        aria-label="First Name (required)"
                        autoComplete="given-name"
                        onChange={onFormChange()}
                        required
                    />
                </Col>
                <Col className="px-1" sm={6}>
                    <input
                        type="text"
                        name="lastName"
                        value={formValues.lastName}
                        placeholder="Last Name *"
                        aria-label="Last Name (required)"
                        autoComplete="family-name"
                        onChange={onFormChange()}
                        required
                    />
                </Col>
            </Row>
            <Row>
                <Col className="px-1" sm={6}>
                    <input
                        type="email"
                        name="email"
                        value={formValues.email}
                        placeholder="Email Address *"
                        aria-label="Email Address (required)"
                        autoComplete="email"
                        onChange={onFormChange()}
                        required
                    />
                </Col>
                <Col className="px-1" sm={6}>
                    <input
                        type="tel"
                        name="phone"
                        value={formValues.phone}
                        placeholder="Phone Number"
                        aria-label="Phone Number"
                        autoComplete="tel"
                        onChange={onFormChange()}
                    />
                </Col>

                <Col className="px-1" sm={12}>
                    <textarea
                        name="message"
                        rows={6}
                        value={formValues.message}
                        placeholder="Message *"
                        aria-label="Message (required)"
                        autoComplete="off"
                        onChange={onFormChange()}
                        required
                    />
                </Col>
                <div className={containerClasses}>
                    <button
                        type="submit"
                        disabled={loading || isSent}
                    >
                        <span>{buttonText}</span>
                    </button>
                    <div
                        className={`form-status-message ${statusClass}`}
                        role="status"
                        aria-live="polite"
                    >
                        {isSent && (
                            <span className="envelope-icon" aria-hidden="true">
                                {"\u{1F4E8}"}
                            </span>
                        )}
                        {formStatus.success === false && (
                            <span className="error-icon" aria-hidden="true">
                                {"\u{1F605}"}
                            </span>
                        )}
                        <p>{formStatus.message}</p>
                    </div>
                </div>
            </Row>
        </form>
    );
};
export default ContactForm;
