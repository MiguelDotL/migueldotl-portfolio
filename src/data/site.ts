// ── Navigation ────────────────────────────────────────────────────────────────

export const NAV_LINKS = [
    { name: 'home', text: 'Home' },
    { name: 'skills', text: 'Skills' },
    { name: 'projects', text: 'Projects' },
    { name: 'contact', text: 'Contact' }
] as const;

export type NavLink = (typeof NAV_LINKS)[number];

// ── Resume ────────────────────────────────────────────────────────────────────

export const RESUME_PATH = '/resources/miguel_lozano_resume_2026.pdf';

// ── Key external URLs ─────────────────────────────────────────────────────────

export const LINKEDIN_URL = 'https://www.linkedin.com/in/migueldot/';
export const GITHUB_URL = '//github.com/MiguelDotL';
export const DUOLINGO_URL = '//www.duolingo.com/profile/MiguelDotL';
