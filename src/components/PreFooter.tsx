import { Container, Row, Col } from "react-bootstrap";
import reactIcon from "../assets/images/icons/react-original.svg";
import bootstrapIcon from "../assets/images/icons/bootstrap-original.svg";

const PreFooter = () => {
    return (
        <Container>
            <Row className="align-items-center">
                <Col lg={12}>
                    <div id="built-with" className="built-with">
                        <h3>
                            This Site Was <br />
                            Built With <span>♥️</span> Using:
                        </h3>
                        <div className="tooling-icons">
                            <div className="tooling-icon react-icon">
                                <img
                                    src={reactIcon}
                                    alt="react-icon"
                                    width={80}
                                    height={80}
                                    loading="lazy"
                                />
                                <span>React</span>
                            </div>
                            <span className="plus-sign">+</span>
                            <div className="tooling-icon bootstrap-icon">
                                <img
                                    src={bootstrapIcon}
                                    alt="bootstrap-icon"
                                    width={80}
                                    height={80}
                                    loading="lazy"
                                />
                                <span>Bootstrap</span>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default PreFooter;
