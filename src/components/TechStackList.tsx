export type TechStackListProps = {
    /** Tech labels to render as chips. */
    stack: readonly string[];
};

// Pill-chip list used to label a project's tech stack on FeaturedProjectCard.
// Styling lives in Projects.css under `.featured-project-stack li`.
const TechStackList = ({ stack }: TechStackListProps) => {
    if (stack.length === 0) return null;
    return (
        <ul className="featured-project-stack">
            {stack.map((tech) => (
                <li key={tech}>{tech}</li>
            ))}
        </ul>
    );
};

export default TechStackList;
