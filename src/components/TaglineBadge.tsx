import type { ReactNode } from 'react';

export type TaglineBadgeProps = {
    children: ReactNode;
};

// Gradient-tinted pill above the hero headline ("Welcome to my Portfolio").
// Styling lives in Hero.css under `.hero .content .tagline`.
const TaglineBadge = ({ children }: TaglineBadgeProps) => (
    <span className="tagline">{children}</span>
);

export default TaglineBadge;
