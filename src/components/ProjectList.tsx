import { Tab, Row } from "react-bootstrap";
import ProjectCard, { type Project } from "./ProjectCard";

type ProjectListProps = {
    projects: Project[];
    eventKey: string;
};

const ProjectList = ({ projects, eventKey }: ProjectListProps) => {
    return (
        <Tab.Pane eventKey={eventKey}>
            <Row>
                {projects.map((project) => {
                    return <ProjectCard key={project.url} {...project} />;
                })}
            </Row>
        </Tab.Pane>
    );
};

export default ProjectList;
