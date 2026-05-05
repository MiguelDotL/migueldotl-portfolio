type Variant = 'success' | 'danger' | null;

export type FormStatusMessageProps = {
    /** Visual variant. `null` renders nothing — useful for the pre-submit state. */
    variant: Variant;
    message: string;
};

const ICON: Record<Exclude<Variant, null>, { className: string; glyph: string }> = {
    success: { className: 'envelope-icon', glyph: '\u{1F4E8}' },
    danger: { className: 'error-icon', glyph: '\u{1F605}' }
};

// Inline status banner shown after a contact-form submit attempt.
// Styling lives in Contact.css under `.contact form .form-status-message`.
// Renders the role=status + aria-live wiring so consumers don't have to.
const FormStatusMessage = ({ variant, message }: FormStatusMessageProps) => {
    const icon = variant ? ICON[variant] : null;
    return (
        <div
            className={`form-status-message ${variant ?? ''}`}
            role="status"
            aria-live="polite"
        >
            {icon && (
                <span className={icon.className} aria-hidden="true">
                    {icon.glyph}
                </span>
            )}
            <p>{message}</p>
        </div>
    );
};

export default FormStatusMessage;
