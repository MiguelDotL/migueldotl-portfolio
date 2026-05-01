import "../assets/styles/Socials.css";

export type SocialIconConfig = {
    className: string;
    icon: string;
    url: string;
    label: string;
};

type SocialIconsProps = {
    config: SocialIconConfig[];
    onHover?: (label: string | null) => void;
};

const SocialIcons = ({ config, onHover }: SocialIconsProps) => {
    return (
        <div className="social-icons">
            {config.map((social) => {
                return (
                    <a
                        key={social.className}
                        className={`social-icon ${social.className}`}
                        href={social.url}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={social.label}
                        onMouseEnter={() => onHover?.(social.label)}
                        onMouseLeave={() => onHover?.(null)}
                    >
                        <img src={social.icon} alt={social.label} />
                    </a>
                );
            })}
        </div>
    );
};

export default SocialIcons;
