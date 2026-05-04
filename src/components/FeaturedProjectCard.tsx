import { ReactNode } from "react";
import { Col } from "react-bootstrap";
import TechStackList from "./TechStackList";
import ProjectActionLink, { type ProjectAction } from "./ProjectActionLink";

export type FeaturedAction = ProjectAction;

export type FeaturedProject = {
    title: string;
    subtitle?: string;
    description: ReactNode;
    techStack?: string[];
    imageURL?: string;
    /** Optional WebP source for the imageURL fallback path. */
    imageURLWebp?: string;
    imageSlot?: ReactNode;
    actions?: FeaturedAction[];
};

const FeaturedProjectCard = (props: FeaturedProject) => {
    const primaryUrl = props.actions?.[0]?.url;
    const titleNode = primaryUrl ? (
        <a
            href={primaryUrl}
            rel="noreferrer"
            target="_blank"
            className="featured-project-title-link"
        >
            {props.title}
        </a>
    ) : (
        props.title
    );

    return (
        <Col lg={6} className="featured-project-col">
            <div className="featured-project-card">
                <div className="featured-project-image">
                    {props.imageSlot ?? (
                        props.imageURL && (
                            <picture>
                                {props.imageURLWebp && (
                                    <source srcSet={props.imageURLWebp} type="image/webp" />
                                )}
                                <img src={props.imageURL} alt={props.title} loading="lazy" />
                            </picture>
                        )
                    )}
                </div>
                <div className="featured-project-body">
                    {props.subtitle && (
                        <span className="featured-project-subtitle">
                            {props.subtitle}
                        </span>
                    )}
                    <h3 className="featured-project-title">{titleNode}</h3>
                    <p className="featured-project-description">{props.description}</p>
                    {props.techStack && <TechStackList stack={props.techStack} />}
                    {props.actions && props.actions.length > 0 && (
                        <div className="featured-project-actions">
                            {props.actions.map((action) => (
                                <ProjectActionLink key={action.url} action={action} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </Col>
    );
};

export default FeaturedProjectCard;
