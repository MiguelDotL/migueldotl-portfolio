import claudeIcon from '../assets/images/icons/claude.svg';
import pythonIcon from '../assets/images/icons/python.svg';
import fastapiIcon from '../assets/images/icons/fastapi.svg';
import html5Icon from '../assets/images/icons/html5.svg';
import css3Icon from '../assets/images/icons/css3.svg';
import mysqlIcon from '../assets/images/icons/mysql.svg';
import postgresqlIcon from '../assets/images/icons/postgresql.svg';
import mongodbIcon from '../assets/images/icons/mongodb.svg';
import linuxIcon from '../assets/images/icons/linux.svg';

// ── Type ──────────────────────────────────────────────────────────────────────

export type Skill = {
    name: string;
    /** devicon class suffix (e.g. "javascript-plain"). When present, renders
        a <i className={`devicon devicon-${class} colored`} />. */
    class?: string;
    /** Override devicon's CSS color with an explicit hex/rgb value. */
    color?: string;
    /** Path to a custom SVG/PNG icon (active state). Renders as <img>. */
    iconPath?: string;
    /** Path to a grayscale/inactive icon used for cross-fade. */
    iconInactive?: string;
};

// ── Data ──────────────────────────────────────────────────────────────────────

export const SKILLS: Skill[] = [
    { name: 'Bash', class: 'bash-plain', color: '#44B04F' },
    { name: 'HTML', class: 'html5-plain', iconPath: html5Icon },
    { name: 'CSS', class: 'css3-plain', iconPath: css3Icon },
    { name: 'JavaScript', class: 'javascript-plain' },
    { name: 'TypeScript', class: 'typescript-plain' },
    { name: 'jQuery', class: 'jquery-plain' },
    { name: 'React', class: 'react-original' },
    { name: 'Angular', class: 'angularjs-plain' },
    { name: 'Node.js', class: 'nodejs-plain' },
    { name: 'mongoDB', class: 'mongodb-plain', iconPath: mongodbIcon },
    { name: 'PHP', class: 'php-plain' },
    { name: 'MySQL', iconPath: mysqlIcon },
    { name: 'Ruby', class: 'ruby-plain', color: '#940c00' },
    { name: 'Ruby on Rails', class: 'rails-plain', color: '#940c00' },
    { name: 'Python', iconPath: pythonIcon },
    { name: 'FastAPI', iconPath: fastapiIcon },
    { name: 'PostgreSQL', class: 'postgresql-plain', iconPath: postgresqlIcon },
    { name: 'AWS', class: 'amazonwebservices-original' },
    { name: 'Linux', class: 'linux-plain', color: '#EBC205', iconPath: linuxIcon },
    { name: 'GitHub', class: 'github-original', color: '#9355AD' },
    { name: 'Git', class: 'git-plain' },
    { name: 'Claude', iconPath: claudeIcon, color: '#D97757' }
];
