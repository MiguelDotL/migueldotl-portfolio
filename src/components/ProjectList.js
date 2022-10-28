// import React from "react";
import { Tab, Row } from "react-bootstrap";
import ProjectCard from "./ProjectCard";

const ProjectList = ({ projects, eventKey }) => {
    return (
        <Tab.Pane eventKey={eventKey}>
            <Row>
                {projects.map((project, index) => {
                    return <ProjectCard key={index} {...project} />;
                })}
            </Row>
        </Tab.Pane>
    );
};

export default ProjectList;
