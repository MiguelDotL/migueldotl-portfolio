import { useRef, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { Col, Row } from "react-bootstrap";
import FormStatusMessage from "./FormStatusMessage";
import useFormSubmit, { type SubmitStatus } from "../hooks/useFormSubmit";
import { FORM } from "../config/env";

const BUTTON_LABELS: Record<SubmitStatus, string> = {
    idle: "Send",
    submitting: "Sending...",
    success: "Sent ✓",
    error: "Send"
};

const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
    botcheck: ""
};

type FormValues = typeof initialValues;
type FieldName = "firstName" | "lastName" | "email" | "message";
type FieldErrors = Partial<Record<FieldName, string>>;

const MESSAGE_MIN_LENGTH = 20;
const FIELD_ORDER: FieldName[] = ["firstName", "lastName", "email", "message"];

const validate = (values: FormValues): FieldErrors => {
    const errs: FieldErrors = {};
    if (!values.firstName.trim()) {
        errs.firstName = "First name is required.";
    }
    if (!values.lastName.trim()) {
        errs.lastName = "Last name is required.";
    }
    if (!values.email.trim()) {
        errs.email = "Email is required.";
    } else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(values.email.trim())) {
        errs.email = "Enter a valid email address.";
    }
    if (!values.message.trim()) {
        errs.message = "Message is required.";
    } else if (values.message.trim().length < MESSAGE_MIN_LENGTH) {
        errs.message = `Please write at least ${MESSAGE_MIN_LENGTH} characters.`;
    }
    return errs;
};

const ContactForm = () => {
    const [formValues, setFormValues] = useState<FormValues>(initialValues);
    const [submitAttempted, setSubmitAttempted] = useState(false);
    const formRef = useRef<HTMLFormElement>(null);

    const { status, message, submit } = useFormSubmit();

    const buttonLabel = BUTTON_LABELS[status];
    const isSent = status === 'success';

    // Errors render only after the user attempts submit. Derived from
    // formValues each render, so messages clear themselves as fields are
    // fixed without needing a separate effect/state.
    const errors: FieldErrors = submitAttempted ? validate(formValues) : {};

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

    const onFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (status === 'submitting' || isSent) return;

        const errs = validate(formValues);
        setSubmitAttempted(true);
        if (Object.keys(errs).length > 0) {
            const firstInvalid = FIELD_ORDER.find((f) => errs[f]);
            if (firstInvalid) {
                formRef.current
                    ?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)
                    ?.focus();
            }
            return;
        }

        const payload = {
            access_key: FORM.accessKey,
            subject: `Portfolio contact from ${formValues.firstName} ${formValues.lastName}`.trim(),
            ...formValues
        };

        const succeeded = await submit(payload);

        if (succeeded) {
            setFormValues(initialValues);
            setSubmitAttempted(false);
        }
    };

    const containerClasses = [
        "submit-container",
        "px-1",
        isSent ? "is-sent" : ""
    ]
        .filter(Boolean)
        .join(" ");

    const statusVariant: 'success' | 'danger' | null =
        status === 'success'
            ? 'success'
            : status === 'error'
            ? 'danger'
            : null;

    const fieldError = (name: FieldName) => {
        const err = errors[name];
        if (!err) return null;
        return (
            <span
                id={`${name}-error`}
                role="alert"
                aria-live="polite"
                className="field-error"
            >
                {err}
            </span>
        );
    };

    const ariaProps = (name: FieldName) => ({
        "aria-invalid": !!errors[name],
        "aria-describedby": errors[name] ? `${name}-error` : undefined
    });

    return (
        <form
            ref={formRef}
            onSubmit={onFormSubmit}
            noValidate
        >
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
                        {...ariaProps("firstName")}
                    />
                    {fieldError("firstName")}
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
                        {...ariaProps("lastName")}
                    />
                    {fieldError("lastName")}
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
                        {...ariaProps("email")}
                    />
                    {fieldError("email")}
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
                        minLength={MESSAGE_MIN_LENGTH}
                        onChange={onFormChange()}
                        required
                        {...ariaProps("message")}
                    />
                    {fieldError("message")}
                </Col>
                <div className={containerClasses}>
                    <button
                        type="submit"
                        disabled={status === 'submitting' || isSent}
                    >
                        <span>{buttonLabel}</span>
                    </button>
                    <FormStatusMessage
                        variant={statusVariant}
                        message={message}
                    />
                </div>
            </Row>
        </form>
    );
};
export default ContactForm;
