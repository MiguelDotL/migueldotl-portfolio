import { Row } from "react-bootstrap";
import ProjectCard, { type Project } from "./ProjectCard";

type ProjectListProps = {
    projects: Project[];
};

const ProjectList = ({ projects }: ProjectListProps) => {
    return (
        <Row>
            {projects.map((project) => {
                return <ProjectCard key={project.url} {...project} />;
            })}
        </Row>
    );
};

export default ProjectList;
