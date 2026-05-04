import { Col } from "react-bootstrap";

type ProjectCardSkeletonProps = {
    /** Bootstrap column width at md breakpoint. Defaults to 4 (3-up grid like Client tab). */
    md?: number;
};

const ProjectCardSkeleton = ({ md = 4 }: ProjectCardSkeletonProps) => {
    return (
        <Col sm={6} md={md}>
            <div className="project-card project-card--skeleton">
                <div className="project-image skeleton-shimmer" />
            </div>
        </Col>
    );
};

export default ProjectCardSkeleton;
