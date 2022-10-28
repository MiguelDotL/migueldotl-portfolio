import { Col } from "react-bootstrap";

const ProjectCard = (props) => {
    return (
        <Col sm={6} md={4}>
            <a className="project-card" href={props.url} rel="noreferrer" target="_blank">
                <div className="project-image">
                    <img src={props.imageURL} alt={props.title} />
                    <div className="project-content">
                        <h4>{props.title}</h4>
                        <span>{props.description}</span>
                    </div>
                </div>
            </a>
        </Col>
    );
};
export default ProjectCard;
