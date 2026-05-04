import { useEffect, useRef, useState } from 'react';
import { ArrowRightCircle } from 'react-bootstrap-icons';
import TaglineBadge from './TaglineBadge';

const HeroContent = () => {
    const ref = useRef<HTMLDivElement | null>(null);
    const [inView, setInView] = useState(false);
    const [isTyping, setIsTyping] = useState(true);
    const [jobTitle, setJobTitle] = useState('');
    const [roleCount, setRoleCount] = useState(0);
    const [typingDelay, setTypingDelay] = useState(() => 200 - Math.random() * 50);
    const roles = ['Front-End', 'Back-End', 'Full-Stack Developer   '];
    const pauseTime = 3456; // time between typing and deleting
    const yearsOfExp = new Date().getFullYear() - 2016;

    // Native IntersectionObserver replaces react-intersection-observer to keep
    // the lib out of the main bundle (Skills/Projects/ContactMe lazy chunks
    // still use it). triggerOnce: disconnect after first hit.
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        if (typeof IntersectionObserver === 'undefined') {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setInView(true);
            return;
        }
        const io = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setInView(true);
                io.disconnect();
            }
        });
        io.observe(el);
        return () => io.disconnect();
    }, []);

    // doTyping reads four state values via closure. Stash the latest closure
    // in a ref and have the interval call ref.current() so the interval only
    // recreates when typingDelay changes (3 times per cycle: type→pause→delete),
    // not on every keystroke.
    const doTypingRef = useRef<() => void>(() => {});
    useEffect(() => {
        doTypingRef.current = () => {
            const currentRole = roleCount % roles.length;
            const fullText = roles[currentRole];
            const currentText = isTyping
                ? fullText.substring(0, jobTitle.length + 1)
                : fullText.substring(0, jobTitle.length - 1);

            setJobTitle(currentText);

            if (!isTyping) {
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
    });

    useEffect(() => {
        const typingTicker = setInterval(() => doTypingRef.current(), typingDelay);
        return () => clearInterval(typingTicker);
    }, [typingDelay]);

    return (
        <div
            ref={ref}
            className={`content ${
                inView && 'animate__animated animate__fadeIn animate__slower'
            }`}
        >
            <TaglineBadge>Thanks for dropping by</TaglineBadge>
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
