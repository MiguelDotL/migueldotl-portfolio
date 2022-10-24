import { Col } from "react-bootstrap";
import reactIcon from "../assets/images/icons/react-original.svg";
import bootstrapIcon from "../assets/images/icons/bootstrap-original.svg";

const PreFooter = () => {
    return (
        <Col lg={12}>
            <div id="built-with" className="built-with">
                <h3>
                    This Site Was <br />
                    Built With <span>♥️</span> Using:
                </h3>
                <div className="tooling-icons">
                    <div className="tooling-icon react-icon">
                        <img src={reactIcon} alt="react-icon" />
                        <span>React</span>
                    </div>
                    <span className="plus-sign">+</span>
                    <div className="tooling-icon bootstrap-icon">
                        <img src={bootstrapIcon} alt="bootstrap-icon" />
                        <span>Bootstrap</span>
                    </div>
                </div>
            </div>
        </Col>
    );
};

export default PreFooter;
