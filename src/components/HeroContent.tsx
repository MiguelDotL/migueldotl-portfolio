import { useEffect, useState } from 'react';
import TaglineBadge from './TaglineBadge';
import HeroChatCta from './HeroChatCta';
import { advanceTyping, initialTypingState, type TypingState } from './heroTyping';
import { LINKEDIN_URL, DUOLINGO_URL } from '../data/site';
import useInViewOnce from '../hooks/useInViewOnce';
import { FADE_IN_SLOWER } from '../constants/animationClasses';

const HeroContent = () => {
    const { ref, inView } = useInViewOnce<HTMLDivElement>();
    const [typing, setTyping] = useState<TypingState>(() =>
        initialTypingState(200 - Math.random() * 50)
    );
    const yearsOfExp = new Date().getFullYear() - 2016;

    // Drive the typing state machine on a setTimeout cadence — each tick
    // schedules the next based on the new state's typingDelay. Self-
    // resubscribing setTimeout is cleaner than setInterval here because
    // the cadence changes every tick (type / pause / delete / handoff).
    useEffect(() => {
        const t = window.setTimeout(() => {
            setTyping((prev) => advanceTyping(prev));
        }, typing.typingDelay);
        return () => window.clearTimeout(t);
    }, [typing]);

    return (
        <div
            ref={ref}
            className={`content ${
                inView && FADE_IN_SLOWER
            }`}
        >
            <TaglineBadge>Thanks for dropping by</TaglineBadge>
            <h1 className="intro-header">Hi, I'm Miguel!</h1>
            <h1>
                I'm a <span className="typing-text">{typing.jobTitle}</span>
            </h1>
            <p className="copy">
                My journey into programming began in 2005. I now have over{' '}
                <a
                    className="accent nowrap"
                    href={LINKEDIN_URL}
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
                    href={DUOLINGO_URL}
                    rel="noreferrer"
                    target="_blank"
                >
                    new languages
                </a>
                .
            </p>
            <HeroChatCta />
        </div>
    );
};

export default HeroContent;
