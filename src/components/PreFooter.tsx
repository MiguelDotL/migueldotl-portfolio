import { Container, Row, Col } from 'react-bootstrap';
import githubIcon from '../assets/images/icons/github.svg';

const REPO_URL = 'https://github.com/MiguelDotL/migueldotl-portfolio';
const SB_URL = 'https://migueldotl.github.io/storybook';
const SB_ITERATION_URL = 'https://migueldotl.github.io/storybook/?path=/story/design-iterations-projecttabs--pill-fill-sliding';
const SB_IFRAME_URL = 'https://migueldotl.github.io/storybook/iframe.html?id=design-iterations-projecttabs--pill-fill-sliding&viewMode=story';

const TECH = ['React', 'TypeScript', 'Bootstrap', 'Chromatic', 'Vite', 'Vitest'];

const StorybookIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 256 319"
        width="15"
        height="18"
        aria-hidden
    >
        <path
            d="M9.022 314.567L.395 16.84A16.819 16.819 0 0 1 16-1.337L237.057.012a16.818 16.818 0 0 1 17.59 16.812v285.44a16.818 16.818 0 0 1-16.142 16.804l-67.2 2.59a8.41 8.41 0 0 1-8.728-8.4v-23.323a4.205 4.205 0 0 0-5.06-4.118c-13.97 3.013-32.137 4.652-50.92 4.652-18.785 0-36.95-1.64-50.922-4.652a4.205 4.205 0 0 0-5.06 4.118v23.864a8.41 8.41 0 0 1-8.671 8.4l-7.052-.232.013-.232c-13.61-.49-25.347-9.84-25.883-23.158z"
            fill="currentColor"
        />
        <path
            className="sb-icon__inner"
            d="M170.692 14.86l1.18-29.034 24.298-2.05 1.04 30.953a2.066 2.066 0 0 1-3.328 1.7l-9.382-7.405-11.105 8.428a2.066 2.066 0 0 1-3.31-1.737zm-37.92 102.26c0 6.566 44.236 3.43 50.18-1.182 0-44.776-24.013-68.295-67.95-68.295-43.937 0-68.582 23.886-68.582 59.715 0 62.4 84.214 63.6 84.214 97.685 0 9.572-4.69 15.27-15.013 15.27-13.45 0-18.768-6.87-18.142-30.224 0-5.066-51.376-6.642-52.94 0-3.985 56.578 31.193 72.92 71.708 72.92 39.262 0 70.082-20.916 70.082-58.776 0-66.851-85.467-65.012-85.467-98.171 0-13.484 10.012-15.272 15.952-15.272 6.252 0 17.515 1.103 16.95 26.33z"
        />
    </svg>
);

const PreFooter = () => (
    <Container>
        <Row>
            <Col lg={12}>
                <div id="built-with" className="built-with v-screenshot">
                    <Row className="align-items-center g-4">
                        <Col md={7}>
                            <a
                                className="sb-frame"
                                href={SB_ITERATION_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Open Storybook iteration"
                            >
                                <div className="sb-mock">
                                    <div className="sb-mock__topbar">
                                        <span className="sb-mock__brand">Storybook</span>
                                        <span className="sb-mock__dots" aria-hidden>
                                            <i /><i /><i />
                                        </span>
                                    </div>
                                    <div className="sb-mock__body">
                                        <div className="sb-mock__sidebar" aria-hidden>
                                            <div className="sb-mock__sidebar-group">
                                                <div className="sb-mock__sidebar-line w70" />
                                                <div className="sb-mock__sidebar-line w50" />
                                                <div className="sb-mock__sidebar-line w60 active" />
                                                <div className="sb-mock__sidebar-line w55" />
                                            </div>
                                            <div className="sb-mock__sidebar-group">
                                                <div className="sb-mock__sidebar-line w65" />
                                                <div className="sb-mock__sidebar-line w45" />
                                                <div className="sb-mock__sidebar-line w55" />
                                            </div>
                                        </div>
                                        <div className="sb-mock__canvas">
                                            <div className="sb-mock__card">
                                                <iframe
                                                    className="sb-mock__iframe"
                                                    src={SB_IFRAME_URL}
                                                    title="Storybook iteration: ProjectTabs"
                                                    loading="lazy"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <span className="sb-frame__overlay">View in Storybook →</span>
                            </a>
                        </Col>
                        <Col md={5}>
                            <h3 className="v-screenshot__h">
                                Peek <span>under the hood</span>.
                            </h3>
                            <p className="lead-copy">
                                Take a look at{' '}
                                <a href={REPO_URL} target="_blank" rel="noopener noreferrer">
                                    the code
                                </a>
                                , or learn about my{' '}
                                <a href={SB_ITERATION_URL} target="_blank" rel="noopener noreferrer">
                                    iterative design process
                                </a>{' '}
                                in Storybook. Tabs, buttons, hover states — each piece went through several ideations before shipping.
                            </p>
                            <div className="cta-row cta-row--start cta-row--rect">
                                <a className="cta-btn" href={REPO_URL} target="_blank" rel="noopener noreferrer">
                                    <img src={githubIcon} alt="" width={18} height={18} /> The Repo
                                </a>
                                <a className="cta-btn cta-btn--alt" href={SB_URL} target="_blank" rel="noopener noreferrer">
                                    <StorybookIcon /> Storybook
                                </a>
                            </div>
                            <p className="tech-label">Built with</p>
                            <ul className="tech-badges">
                                {TECH.map((t) => (
                                    <li key={t}>{t}</li>
                                ))}
                            </ul>
                        </Col>
                    </Row>
                </div>
            </Col>
        </Row>
    </Container>
);

export default PreFooter;
