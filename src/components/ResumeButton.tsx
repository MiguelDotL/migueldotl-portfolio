import { FileEarmarkText } from 'react-bootstrap-icons';

export type ResumeButtonProps = {
    /** Resume URL relative to the site root (e.g. "/resources/resume.pdf"). */
    resumePath: string;
};

// "My Resume" button rendered on the right side of the NavBar. Opens the
// PDF in a new tab. Styling lives in NavBar.css under `.resume-button`.
const ResumeButton = ({ resumePath }: ResumeButtonProps) => (
    <button
        className="resume-button"
        onClick={() =>
            window.open(`${import.meta.env.BASE_URL}${resumePath.replace(/^\//, '')}`)
        }
    >
        <FileEarmarkText size={20} className="me-2" />
        <span>My Resume</span>
    </button>
);

export default ResumeButton;
