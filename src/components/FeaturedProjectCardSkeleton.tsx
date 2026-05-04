import { Col } from "react-bootstrap";

const FeaturedProjectCardSkeleton = () => {
    return (
        <Col md={6} className="featured-project-col">
            <div className="featured-project-card featured-project-card--skeleton">
                <div className="featured-project-image skeleton-shimmer" />
                <div className="featured-project-body">
                    <div className="skeleton-shimmer skeleton-text skeleton-text--label" />
                    <div className="skeleton-shimmer skeleton-text skeleton-text--title" />
                    <div className="skeleton-shimmer skeleton-text" />
                    <div className="skeleton-shimmer skeleton-text" />
                    <div className="skeleton-shimmer skeleton-text skeleton-text--short" />
                    <div className="skeleton-chips">
                        <div className="skeleton-shimmer skeleton-chip" />
                        <div className="skeleton-shimmer skeleton-chip" />
                        <div className="skeleton-shimmer skeleton-chip" />
                    </div>
                    <div className="skeleton-shimmer skeleton-button" />
                </div>
            </div>
        </Col>
    );
};

export default FeaturedProjectCardSkeleton;
