import { Col, Container, Row } from 'react-bootstrap';
import HeroContent from './HeroContent';
import bitmojiSpacePlanet from '../assets/images/bitmoji/bitmoji-space-planet-2.png';
import '../assets/styles/Hero.css';

const meta = {
    title: 'Components/HeroContent',
    component: HeroContent,
    decorators: [
        // Decorator mimics the parent Hero layout so HeroContent renders next to
        // the bitmoji visual context. The image is provided by the decorator, not
        // by the HeroContent component itself.
        (Story) => (
            <section
                className="hero about-me"
                style={{
                    backgroundImage: 'none',
                    background: '#1a0033',
                    minHeight: '500px'
                }}
            >
                <Container>
                    <Row className="align-items-center">
                        <Col xs={12} md={7} xl={7}>
                            <Story />
                        </Col>
                        <Col className="image-col" xs={12} md={5} xl={5}>
                            <img
                                className="floating-image"
                                src={bitmojiSpacePlanet}
                                alt="Floating Caricature"
                            />
                        </Col>
                    </Row>
                </Container>
            </section>
        )
    ],
    parameters: { layout: 'fullscreen' }
};

export default meta;

export const Default = {};
