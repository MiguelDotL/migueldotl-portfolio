import { Tab, Row } from "react-bootstrap";
import ProjectCard from "./ProjectCard";

const ProjectList = ({ projects, eventKey }) => {
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
