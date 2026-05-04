import { ArrowRightCircle } from 'react-bootstrap-icons';

export type HeroChatCtaProps = {
    /** Element id to scroll into view on click. Defaults to "contact". */
    targetId?: string;
};

// Hero "Let's Chat" CTA. Plain text + ArrowRightCircle icon. Styling
// lives in Hero.css under `.hero .hero-contact-button`.
const HeroChatCta = ({ targetId = 'contact' }: HeroChatCtaProps) => (
    <button
        className="hero-contact-button"
        onClick={() => document.getElementById(targetId)?.scrollIntoView()}
    >
        Let&apos;s Chat
        <ArrowRightCircle size={25} />
    </button>
);

export default HeroChatCta;
