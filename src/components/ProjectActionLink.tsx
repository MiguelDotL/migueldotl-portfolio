import type { ReactNode } from 'react';

export type ProjectAction = {
    label: string;
    url: string;
    icon?: ReactNode;
    /** When true, render as a non-clickable disabled chip (e.g. private repo). */
    disabled?: boolean;
    /** Tooltip text shown on hover for disabled actions. Defaults to "Private". */
    disabledReason?: string;
};

type Props = { action: ProjectAction };

// Action chip used under FeaturedProjectCard. Renders as <a> when active
// or <span aria-disabled> when locked (e.g. private repo). Both share the
// `.btn .btn-outline-secondary` base — the disabled variant adds a lock
// glyph + dimmed style via `.featured-project-action--disabled`.
const ProjectActionLink = ({ action }: Props) => {
    if (action.disabled) {
        return (
            <span
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
        );
    }
    return (
        <a
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
    );
};

export default ProjectActionLink;
