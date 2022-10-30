import ProjectList from "./ProjectList";
import "../assets/styles/Projects.css";
import { Col, Container, Row, Nav, Tab } from "react-bootstrap";
import trimAgency from "../assets/images/projects/trim-agency.png";
import cSolutions from "../assets/images/projects/c-solutions.png";
import generalProvision from "../assets/images/projects/general-provision.png";
import filthyFood from "../assets/images/projects/filthy-food.png";
import orbyTV from "../assets/images/projects/orby-tv-2.png";
import federated from "../assets/images/projects/federated.png";

import colorPop from "../assets/images/backgrounds/color-pop-2.png";

const clientProjects = [
    {
        title: "T R I M Agency",
        description: "Web Development",
        imageURL: trimAgency,
        url: "//www.trimagency.com/"
    },
    {
        title: "C Solutions",
        description: "Web Development",
        imageURL: cSolutions,
        url: "//csolutions-us.com/"
    },
    {
        title: "Orby TV",
        description: "Web Development",
        imageURL: orbyTV,
        url: "//orbytv.com/"
    },
    {
        title: "Federated Insurance",
        description: "Web Development",
        imageURL: federated,
        url: "//www.federated.ca/"
    },
    {
        title: "Filthy Food",
        description: "Web Development",
        imageURL: filthyFood,
        url: "//filthyfood.com/"
    },
    {
        title: "General Provision",
        description: "Web Development",
        imageURL: generalProvision,
        url: "//generalprovision.com/"
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
                        <p className="copy">
                            Over the course of my career, I have had the opportunity to
                            work with some amazing clients, like{" "}
                            <a
                                href="//www.foreyes.com/"
                                className="accent nowrap"
                                rel="noreferrer"
                                target="_blank"
                            >
                                ForEyes
                            </a>
                            ,{" "}
                            <a
                                href="//www.royalcaribbean.com/"
                                className="accent nowrap"
                                rel="noreferrer"
                                target="_blank"
                            >
                                Royal Caribbean International
                            </a>
                            , and{" "}
                            <a
                                href="//www.iberostar.com/"
                                className="accent nowrap"
                                rel="noreferrer"
                                target="_blank"
                            >
                                Iberostar Group
                            </a>
                            .
                        </p>
                        {/* <p className="copy">

                            Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            Delectus aperiam aliquam debitis at repudiandae quibusdam iure
                            magni temporibus odio maiores ab fuga corporis, dolorem
                            quisquam porro vel, nesciunt ex ullam.
                        </p> */}
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
                                <ProjectList
                                    projects={clientProjects}
                                    eventKey={"client"}
                                />

                                <Tab.Pane eventKey="personal">
                                    <Row>
                                        <p>Personal Projects</p>
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
