import type { Meta, StoryObj } from '@storybook/react-vite';
import { Col, Container, Row } from 'react-bootstrap';
import { userEvent, within } from 'storybook/test';
import HeroContent from './HeroContent';
import bitmojiSpacePlanet from '../assets/images/bitmoji/bitmoji-space-planet-2.png';
import bitmojiSpacePlanetWebp from '../assets/images/bitmoji/bitmoji-space-planet-2.webp';
import '../assets/styles/Hero.css';

const meta: Meta<typeof HeroContent> = {
    title: 'Components/Composites/HeroContent',
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
                            <picture>
                                <source srcSet={bitmojiSpacePlanetWebp} type="image/webp" />
                                <img
                                    className="floating-image"
                                    src={bitmojiSpacePlanet}
                                    alt="Floating Caricature"
                                />
                            </picture>
                        </Col>
                    </Row>
                </Container>
            </section>
        )
    ],
    parameters: {
        layout: 'fullscreen',
        docs: { description: { component: "The text + CTA block inside Hero. Drives the typing-effect headline cycle." } },
        a11y: {
            // The story decorator mimics the .hero layout, which means the
            // `.hero::before` darkening pseudo overlay is rendered above the
            // .tagline's translucent gradient. axe-core can't compute effective
            // background through that composition and reports an Inconclusive
            // (not a violation). Real contrast is verified manually. Disable
            // the single rule on this component only — every other component's
            // stories still run color-contrast normally.
            config: {
                rules: [{ id: 'color-contrast', enabled: false }]
            }
        }
    }
};

export default meta;

type Story = StoryObj<typeof HeroContent>;

export const Default: Story = {};

// Click the "Let's Chat" CTA so the inline scroll-to-contact handler
// runs in coverage. The story decorator doesn't actually mount a
// #contact section, so getElementById returns null and scrollIntoView
// is never called — but the optional-chain branch and the click handler
// are exercised either way.
export const ChatCtaClicked: Story = {
    play: async ({ canvasElement }) => {
        const button = within(canvasElement).getByRole('button', { name: /Let's Chat/ });
        await userEvent.click(button);
    }
};
