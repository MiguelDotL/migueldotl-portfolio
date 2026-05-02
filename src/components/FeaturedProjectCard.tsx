import { ReactNode } from "react";
import { Col } from "react-bootstrap";

export type FeaturedAction = {
    label: string;
    url: string;
    icon?: ReactNode;
    /** When true, render as a non-clickable disabled chip (e.g. private repo). */
    disabled?: boolean;
    /** Tooltip text shown on hover for disabled actions. Defaults to "Private". */
    disabledReason?: string;
};

export type FeaturedProject = {
    title: string;
    subtitle?: string;
    description: ReactNode;
    techStack?: string[];
    imageURL?: string;
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
                        props.imageURL && <img src={props.imageURL} alt={props.title} loading="lazy" />
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
                    {props.techStack && props.techStack.length > 0 && (
                        <ul className="featured-project-stack">
                            {props.techStack.map((tech) => (
                                <li key={tech}>{tech}</li>
                            ))}
                        </ul>
                    )}
                    {props.actions && props.actions.length > 0 && (
                        <div className="featured-project-actions">
                            {props.actions.map((action) =>
                                action.disabled ? (
                                    <span
                                        key={action.url}
                                        className="btn btn-outline-secondary featured-project-action--disabled"
                                        title={action.disabledReason ?? 'Private'}
                                        aria-disabled="true"
                                    >
                                        {action.icon && (
                                            <span className="featured-project-action-icon">
                                                {action.icon}
                                            </span>
                                        )}
                                        {action.label}
                                        <span className="featured-project-action-lock" aria-hidden>
                                            🔒
                                        </span>
                                    </span>
                                ) : (
                                    <a
                                        key={action.url}
                                        href={action.url}
                                        rel="noreferrer"
                                        target="_blank"
                                        className="btn btn-outline-secondary"
                                    >
                                        {action.icon && (
                                            <span className="featured-project-action-icon">
                                                {action.icon}
                                            </span>
                                        )}
                                        {action.label}
                                    </a>
                                )
                            )}
                        </div>
                    )}
                </div>
            </div>
        </Col>
    );
};

export default FeaturedProjectCard;
