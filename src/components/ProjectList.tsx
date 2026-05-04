import { Row } from "react-bootstrap";
import ProjectCard, { type Project } from "./ProjectCard";

export type ProjectListProps = {
    projects: Project[];
};

const ProjectList = ({ projects }: ProjectListProps) => {
    return (
        <Row>
            {projects.map((project) => {
                return <ProjectCard key={project.title} {...project} />;
            })}
        </Row>
    );
};

export default ProjectList;
