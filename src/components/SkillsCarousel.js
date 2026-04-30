import Carousel from "react-multi-carousel";
import claudeIcon from "../assets/images/icons/claude.svg";

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
        { name: "HTML", class: "html5-plain" },
        { name: "CSS", class: "css3-plain" },
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
        { name: "Python", class: "python-original" },
        { name: "FastAPI", class: "fastapi-plain" },
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
                return (
                    <div key={skill.name} className="item">
                        {skill.iconPath ? (
                            <img
                                src={skill.iconPath}
                                alt={`${skill.name} logo`}
                                className="custom-skill-icon"
                            />
                        ) : (
                            <i
                                className={`devicon devicon-${skill.class} colored`}
                                style={{ color: skill.color }}
                            ></i>
                        )}
                        <h5>{skill.name}</h5>
                    </div>
                );
            })}
        </Carousel>
    );
};
export default SkillsCarousel;
