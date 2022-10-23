import { Col } from "react-bootstrap";

const ProjectCard = ({ title, description, imageURL }) => {
    return (
        <Col sm={6} md={4}>
            <div className="project-image">
                <img src={imageURL} alt={title} />
                <div className="project-content">
                    <h4>{title}</h4>
                    <span>{description}</span>
                </div>
            </div>
        </Col>
    );
};
export default ProjectCard;
