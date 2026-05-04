import ProjectList from './ProjectList';
import { CLIENT_PROJECTS } from '../data/projects';

/** Tab content for the "Client" tab in the Projects section. */
const ClientTabContent = () => <ProjectList projects={CLIENT_PROJECTS} />;

export default ClientTabContent;
