import { createPortal } from 'react-dom';
import SliderArrowButton from './SliderArrowButton';
import ResponsiveImage from './ResponsiveImage';
import type { FeaturedImageSlide } from './FeaturedImageSlider';

export type LightboxOverlayProps = {
    /** All slides — used to show prev/next arrows when there is more than one image. */
    images: FeaturedImageSlide[];
    /** The slide currently displayed in the lightbox. */
    activeSlide: FeaturedImageSlide;
    onClose: () => void;
    onPrev: () => void;
    onNext: () => void;
};

const LightboxOverlay = ({ images, activeSlide, onClose, onPrev, onNext }: LightboxOverlayProps) =>
    createPortal(
        <div
            className="featured-image-slider__lightbox"
            role="dialog"
            aria-modal="true"
            aria-label={activeSlide.alt}
            onClick={onClose}
        >
            <ResponsiveImage
                src={activeSlide.src}
                srcWebp={activeSlide.srcWebp}
                alt={activeSlide.alt}
                className="featured-image-slider__lightbox-img"
                onClick={(e) => e.stopPropagation()}
            />
            <button
                type="button"
                aria-label="Close"
                className="featured-image-slider__lightbox-close"
                onClick={(e) => {
                    e.stopPropagation();
                    onClose();
                }}
            >
                ×
            </button>
            {images.length > 1 && (
                <>
                    <SliderArrowButton
                        direction="prev"
                        classScope="featured-image-slider__lightbox-arrow"
                        onClick={onPrev}
                    />
                    <SliderArrowButton
                        direction="next"
                        classScope="featured-image-slider__lightbox-arrow"
                        onClick={onNext}
                    />
                </>
            )}
        </div>,
        document.body
    );

export default LightboxOverlay;
