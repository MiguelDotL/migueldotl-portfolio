import { Col } from "react-bootstrap";

const ProjectCard = (props) => {
    return (
        <Col sm={6} md={4}>
            <div className="project-card">
                <div className="project-image">
                    <img src={props.imageURL} alt={props.title} />
                    <div className="project-content">
                        <h4>{props.title}</h4>
                        <span>{props.description}</span>
                        <a
                            href={props.url}
                            rel="noreferrer"
                            target="_blank"
                            className="btn btn-outline-secondary"
                        >
                            View Site
                        </a>
                    </div>
                </div>
            </div>
        </Col>
    );
};
export default ProjectCard;
