import { Col, Row } from "react-bootstrap";

const PreFooter = () => {
    return (
        <Col lg={12}>
            <Row className="justify-content-center">
                <div id="built-with" className="built-with">
                    <h3>
                        This Site Was Built With <span>♥️</span> Using:
                    </h3>
                    <span>React</span>
                    <span>+</span>
                    <span>Bootstrap</span>
                </div>
            </Row>
        </Col>
    );
};

export default PreFooter;
