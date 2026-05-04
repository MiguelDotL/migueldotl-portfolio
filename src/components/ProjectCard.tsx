import { Col } from "react-bootstrap";
import ResponsiveImage from "./ResponsiveImage";

export type Project = {
    title: string;
    description: string;
    imageURL: string;
    /** Optional WebP source. When provided, browsers that support WebP
        get the smaller file via <picture>; PNG stays as the universal
        fallback. */
    imageURLWebp?: string;
    url: string;
};

const ProjectCard = (props: Project) => {
    return (
        <Col sm={6} md={4}>
            <div className="project-card">
                <div className="project-image">
                    <ResponsiveImage
                        src={props.imageURL}
                        srcWebp={props.imageURLWebp}
                        alt={props.title}
                        loading="lazy"
                    />
                    <div className="project-content">
                        <h3>{props.title}</h3>
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
