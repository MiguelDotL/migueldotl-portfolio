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
                    >
                        <img src={social.icon} alt="" />
                    </a>
                );
            })}
        </div>
    );
};

export default SocialIcons;
