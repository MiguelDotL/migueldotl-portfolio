import Carousel from "react-multi-carousel";
import claudeIcon from "../assets/images/icons/claude.svg";
import pythonIcon from "../assets/images/icons/python.svg";
import fastapiIcon from "../assets/images/icons/fastapi.svg";
import html5Icon from "../assets/images/icons/html5.svg";
import css3Icon from "../assets/images/icons/css3.svg";

const SkillsCarousel = () => {
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

    const skills = [
        { name: "Bash", class: "bash-plain", color: "#44B04F" },
        { name: "HTML", class: "html5-plain", iconPath: html5Icon },
        { name: "CSS", class: "css3-plain", iconPath: css3Icon },
        { name: "JavaScript", class: "javascript-plain" },
        { name: "TypeScript", class: "typescript-plain" },
        { name: "jQuery", class: "jquery-plain" },
        { name: "React", class: "react-original" },
        { name: "Angular", class: "angularjs-plain" },
        { name: "Node.js", class: "nodejs-plain" },
        { name: "mongoDB", class: "mongodb-plain" },
        { name: "PHP", class: "php-plain" },
        { name: "MySQL", class: "mysql-plain" },
        { name: "Ruby", class: "ruby-plain", color: "#940c00" },
        { name: "Ruby on Rails", class: "rails-plain", color: "#940c00" },
        { name: "Python", iconPath: pythonIcon },
        { name: "FastAPI", class: "fastapi-plain", iconPath: fastapiIcon },
        { name: "PostgreSQL", class: "postgresql-plain" },
        { name: "AWS", class: "amazonwebservices-original" },
        { name: "Linux", class: "linux-plain", color: "#EBC205" },
        { name: "GitHub", class: "github-original", color: "#9355AD" },
        { name: "Git", class: "git-plain" },
        { name: "Claude", iconPath: claudeIcon, color: "#D97757" }
    ];

    return (
        <Carousel
            className="skills-slider"
            responsive={responsive}
            infinite={true}
            swipeable={true}
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
                            />
                        )}
                        <h5>{skill.name}</h5>
                    </div>
                );
            })}
        </Carousel>
    );
};
export default SkillsCarousel;
