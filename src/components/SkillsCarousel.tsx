import { useEffect, useRef, useState } from "react";
import CarouselDefault from "react-multi-carousel";
const Carousel = (CarouselDefault as { default?: typeof CarouselDefault }).default || CarouselDefault;
import claudeIcon from "../assets/images/icons/claude.svg";
import pythonIcon from "../assets/images/icons/python.svg";
import fastapiIcon from "../assets/images/icons/fastapi.svg";
import html5Icon from "../assets/images/icons/html5.svg";
import css3Icon from "../assets/images/icons/css3.svg";
import mysqlIcon from "../assets/images/icons/mysql.svg";
import postgresqlIcon from "../assets/images/icons/postgresql.svg";
import mongodbIcon from "../assets/images/icons/mongodb.svg";
import linuxIcon from "../assets/images/icons/linux.svg";

type Skill = {
    name: string;
    class?: string;
    color?: string;
    iconPath?: string;
    iconInactive?: string;
};

type CarouselState = {
    currentSlide: number;
    totalItems: number;
    slidesToShow: number;
};

const SkillsCarousel = () => {
    // react-multi-carousel doesn't export a clean public type for its instance ref;
    // the instance exposes next()/previous() at runtime which is all we use.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const carouselRef = useRef<any>(null);
    // True briefly while the carousel snaps clone→original at the loop boundary.
    // Disables filter transitions during the snap so the user doesn't see
    // the cross-fade dip that reads as a flash on the first icon (#51).
    const [isSnapping, setIsSnapping] = useState(false);
    const snapResetRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    // Tracks the currently centered slide so we can target a single rendered
    // <li> (not all visible ones) for highlight effects like the TS white BG.
    const [centeredIndex, setCenteredIndex] = useState<number | null>(null);

    // Keyboard nav: ArrowLeft/Right scroll the carousel when Skills is in view
    useEffect(() => {
        const skillsSection = document.getElementById("skills");
        if (!skillsSection) return;

        let isInView = false;

        const onKeyDown = (e: KeyboardEvent) => {
            if (!isInView || !carouselRef.current) return;
            if (e.key === "ArrowLeft") {
                e.preventDefault();
                carouselRef.current.previous();
            } else if (e.key === "ArrowRight") {
                e.preventDefault();
                carouselRef.current.next();
            }
        };

        const observer = new IntersectionObserver(
            ([entry]) => {
                isInView = entry.isIntersecting && entry.intersectionRatio >= 0.5;
            },
            { threshold: [0, 0.25, 0.5, 0.75, 1] }
        );

        observer.observe(skillsSection);
        window.addEventListener("keydown", onKeyDown);

        return () => {
            observer.disconnect();
            window.removeEventListener("keydown", onKeyDown);
        };
    }, []);

    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3
        },
        tablet: {
            breakpoint: { max: 1024, min: 768 },
            items: 3
        },
        mobile: {
            breakpoint: { max: 768, min: 0 },
            items: 1,
            centerMode: true
        }
    };

    const skills: Skill[] = [
        { name: "Bash", class: "bash-plain", color: "#44B04F" },
        { name: "HTML", class: "html5-plain", iconPath: html5Icon },
        { name: "CSS", class: "css3-plain", iconPath: css3Icon },
        { name: "JavaScript", class: "javascript-plain" },
        { name: "TypeScript", class: "typescript-plain" },
        { name: "jQuery", class: "jquery-plain" },
        { name: "React", class: "react-original" },
        { name: "Angular", class: "angularjs-plain" },
        { name: "Node.js", class: "nodejs-plain" },
        { name: "mongoDB", class: "mongodb-plain", iconPath: mongodbIcon },
        { name: "PHP", class: "php-plain" },
        { name: "MySQL", iconPath: mysqlIcon },
        { name: "Ruby", class: "ruby-plain", color: "#940c00" },
        { name: "Ruby on Rails", class: "rails-plain", color: "#940c00" },
        { name: "Python", iconPath: pythonIcon },
        { name: "FastAPI", iconPath: fastapiIcon },
        { name: "PostgreSQL", class: "postgresql-plain", iconPath: postgresqlIcon },
        { name: "AWS", class: "amazonwebservices-original" },
        { name: "Linux", class: "linux-plain", color: "#EBC205", iconPath: linuxIcon },
        { name: "GitHub", class: "github-original", color: "#9355AD" },
        { name: "Git", class: "git-plain" },
        { name: "Claude", iconPath: claudeIcon, color: "#D97757" }
    ];

    // Fires when a slide transition begins — we update centeredIndex here
    // (rather than only in afterChange) so the white BG fade starts as soon
    // as movement starts, not after the carousel lands.
    const handleBeforeChange = (nextSlide: number, state: CarouselState) => {
        setCenteredIndex(nextSlide + Math.floor(state.slidesToShow / 2));
    };

    const handleAfterChange = (_previousSlide: number, state: CarouselState) => {
        const { currentSlide, totalItems, slidesToShow } = state;
        setCenteredIndex(currentSlide + Math.floor(slidesToShow / 2));
        // react-multi-carousel renders [end-clones, originals, start-clones].
        // It snaps when currentSlide reaches a clone region: start (=== 0)
        // or end (>= 2*slidesToShow + originalLength).
        const originalLength = totalItems - 4 * slidesToShow;
        const atStart = currentSlide === 0;
        const atEnd = currentSlide >= 2 * slidesToShow + originalLength;
        if (!atStart && !atEnd) return;
        setIsSnapping(true);
        if (snapResetRef.current) clearTimeout(snapResetRef.current);
        // Cover the snap setState + render + paint.
        snapResetRef.current = setTimeout(() => setIsSnapping(false), 100);
    };

    // Toggle `is-current` on the centered <li> by data-index. Carousel wraps
    // children in <li> internally, so we sync via DOM rather than React props.
    useEffect(() => {
        if (centeredIndex === null) return;
        const items = document.querySelectorAll(
            ".skills-slider .react-multi-carousel-item"
        );
        items.forEach((el) => {
            const idx = parseInt(el.getAttribute("data-index") || "-1", 10);
            el.classList.toggle("is-current", idx === centeredIndex);
        });
    }, [centeredIndex]);

    // Initialize centeredIndex from the carousel's initial state — afterChange
    // doesn't fire until the user interacts.
    useEffect(() => {
        const t = window.setTimeout(() => {
            const state = carouselRef.current?.state;
            if (state) {
                setCenteredIndex(
                    state.currentSlide + Math.floor(state.slidesToShow / 2)
                );
            }
        }, 100);
        return () => window.clearTimeout(t);
    }, []);

    useEffect(() => {
        return () => {
            if (snapResetRef.current) clearTimeout(snapResetRef.current);
        };
    }, []);

    return (
        <Carousel
            ref={carouselRef}
            className={`skills-slider ${isSnapping ? "is-snapping" : ""}`}
            responsive={responsive}
            infinite={true}
            swipeable={true}
            beforeChange={handleBeforeChange}
            afterChange={handleAfterChange}
        >
            {skills.map((skill) => {
                const inactiveTag = skill.iconInactive || skill.class;
                const isCrossFade = inactiveTag && skill.iconPath;
                return (
                    <div key={skill.name} className="item">
                        {skill.iconInactive ? (
                            <img
                                src={skill.iconInactive}
                                alt={`${skill.name} logo`}
                                className={`custom-skill-icon ${
                                    isCrossFade ? "icon-inactive" : ""
                                }`}
                                loading="lazy"
                            />
                        ) : (
                            skill.class && (
                                <i
                                    className={`devicon devicon-${skill.class} colored ${
                                        isCrossFade ? "icon-inactive" : ""
                                    }`}
                                    style={{ color: skill.color }}
                                ></i>
                            )
                        )}
                        {skill.iconPath && (
                            <img
                                src={skill.iconPath}
                                alt={`${skill.name} logo`}
                                className={`custom-skill-icon ${
                                    isCrossFade ? "icon-active" : ""
                                }`}
                                loading="lazy"
                            />
                        )}
                        <span className="skill-name">{skill.name}</span>
                    </div>
                );
            })}
        </Carousel>
    );
};
export default SkillsCarousel;
