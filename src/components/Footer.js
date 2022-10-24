import "../assets/styles/Footer.css";
import { Container, Row, Col } from "react-bootstrap";
import PreFooter from "./PreFooter";

const Footer = () => {
    return (
        <footer className="footer">
            <Container>
                <Row className="align-items-center">
                    <PreFooter />
                    <Col sm={6}>
                        <img src="" alt="" />
                    </Col>
                    <Col sm={6}>SOCIALS</Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;
