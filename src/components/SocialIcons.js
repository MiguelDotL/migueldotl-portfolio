import "../assets/styles/Socials.css";

const SocialIcons = ({ config }) => {
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
                    >
                        <img src={social.icon} alt={social.label} />
                    </a>
                );
            })}
        </div>
    );
};

export default SocialIcons;
