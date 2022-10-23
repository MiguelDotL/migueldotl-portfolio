import ProjectCard from "./ProjectCard";
import "../assets/styles/Projects.css";
import { Col, Container, Row, Nav, Tab } from "react-bootstrap";
import projImg1 from "../assets/images/backgrounds/background-1.jpg";
import projImg2 from "../assets/images/backgrounds/background-2.jpg";
import projImg3 from "../assets/images/backgrounds/hero-bg.png";
import colorPop from "../assets/images/backgrounds/color-pop-2.png";

const projects = [
    {
        title: "Business Startup",
        description: "Design & Development",
        imageURL: projImg1
    },
    {
        title: "Business Startup",
        description: "Design & Development",
        imageURL: projImg2
    },
    {
        title: "Business Startup",
        description: "Design & Development",
        imageURL: projImg3
    },
    {
        title: "Business Startup",
        description: "Design & Development",
        imageURL: projImg1
    },
    {
        title: "Business Startup",
        description: "Design & Development",
        imageURL: projImg2
    },
    {
        title: "Business Startup",
        description: "Design & Development",
        imageURL: projImg3
    }
];

const Projects = () => {
    return (
        <section id="projects" className="projects">
            <img
                src={colorPop}
                alt="decorative background"
                className="background-image-right"
            />
            <Container>
                <Row>
                    <Col>
                        <h2>Projects</h2>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            Delectus aperiam aliquam debitis at repudiandae quibusdam iure
                            magni temporibus odio maiores ab fuga corporis, dolorem
                            quisquam porro vel, nesciunt ex ullam.
                        </p>
                        <Tab.Container id="project-tabs" defaultActiveKey="client">
                            <Nav variant="pills" id="pill-tabs" className="">
                                <Nav.Item>
                                    <Nav.Link eventKey="client">Client Projects</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link
                                        id="personal-projects-tab"
                                        eventKey="personal"
                                    >
                                        Personal Projects
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link id="misc-projects-tab" eventKey="misc">
                                        Misc. Projects
                                    </Nav.Link>
                                </Nav.Item>
                            </Nav>
                            <Tab.Content>
                                <Tab.Pane eventKey="client">
                                    <Row>
                                        {projects.map((project, index) => {
                                            return (
                                                <ProjectCard key={index} {...project} />
                                            );
                                        })}
                                    </Row>
                                </Tab.Pane>
                                <Tab.Pane eventKey="personal">
                                    <Row>
                                        <p>Client Projects</p>
                                    </Row>
                                </Tab.Pane>
                                <Tab.Pane eventKey="misc">
                                    <Row>
                                        <p>Other Projects</p>
                                    </Row>
                                </Tab.Pane>
                            </Tab.Content>
                        </Tab.Container>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default Projects;
