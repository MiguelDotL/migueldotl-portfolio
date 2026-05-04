import type { ReactNode } from 'react';

type Props = {
    children: ReactNode;
};

// Gradient-tinted pill above the hero headline ("Welcome to my Portfolio").
// Styling lives in Hero.css under `.hero .content .tagline`.
const TaglineBadge = ({ children }: Props) => (
    <span className="tagline">{children}</span>
);

export default TaglineBadge;
