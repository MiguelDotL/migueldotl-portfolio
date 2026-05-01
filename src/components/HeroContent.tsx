import { useEffect, useState } from 'react';
import { ArrowRightCircle } from 'react-bootstrap-icons';
import { useInView } from 'react-intersection-observer';

const HeroContent = () => {
    const { ref, inView } = useInView({ triggerOnce: true });
    const [isTyping, setIsTyping] = useState(true);
    const [jobTitle, setJobTitle] = useState('');
    const [roleCount, setRoleCount] = useState(0);
    const [typingDelay, setTypingDelay] = useState(() => 200 - Math.random() * 50);
    const roles = ['Front-End', 'Back-End', 'Full-Stack Developer   '];
    const pauseTime = 3456; // time between typing and deleting
    const yearsOfExp = new Date().getFullYear() - 2016;

    const doTyping = () => {
        const currentRole = roleCount % roles.length;
        const fullText = roles[currentRole];
        const currentText = isTyping
            ? fullText.substring(0, jobTitle.length + 1)
            : fullText.substring(0, jobTitle.length - 1);

        setJobTitle(currentText);

        if (!isTyping) {
            // set how fast we delete characters
            setTypingDelay(100);
        }

        if (isTyping && currentText === fullText) {
            setIsTyping(false);
            setTypingDelay(pauseTime);
        } else if (!isTyping && currentText === '') {
            setIsTyping(true);
            setRoleCount(roleCount + 1);
            setTypingDelay(321);
        }
    };

    useEffect(() => {
        const typingTicker = setInterval(() => {
            doTyping();
        }, typingDelay);

        return () => {
            clearInterval(typingTicker);
        };
    });
    // }, [jobTitle]);

    return (
        <div
            ref={ref}
            className={`content ${
                inView && 'animate__animated animate__fadeIn animate__slower'
            }`}
        >
            <span className="tagline">Thanks for dropping by</span>
            <h1 className="intro-header">Hi, I'm Miguel!</h1>
            <h1>
                I'm a <span className="typing-text">{jobTitle}</span>
            </h1>
            <p className="copy">
                My journey into programming began in 2005. I now have over{' '}
                <a
                    className="accent nowrap"
                    href="https://www.linkedin.com/in/migueldot/"
                    rel="noreferrer"
                    target="_blank"
                >
                    {yearsOfExp} years
                </a>{' '}
                of professional experience. I place equal importance on form and
                function, always considering the client's objective, the
                end-user's experience, and parsability for others who may work on
                the project. When I'm not writing code, I enjoy making music and
                learning{' '}
                <a
                    className="accent nowrap"
                    href="//www.duolingo.com/profile/MiguelDotL"
                    rel="noreferrer"
                    target="_blank"
                >
                    new languages
                </a>
                .
            </p>
            <button
                className="hero-contact-button"
                onClick={() => document.getElementById('contact')?.scrollIntoView()}
            >
                Let's Chat
                <ArrowRightCircle size={25} />
            </button>
        </div>
    );
};

export default HeroContent;
