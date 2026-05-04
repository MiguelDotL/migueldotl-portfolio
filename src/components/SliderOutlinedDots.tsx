import type { FeaturedImageSlide } from './FeaturedImageSlider';

export type SliderOutlinedDotsProps = {
    images: FeaturedImageSlide[];
    currentIndex: number;
    onSelect: (index: number) => void;
};

const SliderOutlinedDots = ({ images, currentIndex, onSelect }: SliderOutlinedDotsProps) => (
    <div
        className="featured-image-slider__dots featured-image-slider__dots--outlined"
        role="tablist"
    >
        {images.map((img, i) => (
            <button
                key={img.src}
                type="button"
                role="tab"
                aria-label={`Show image ${i + 1}`}
                aria-selected={i === currentIndex}
                className={`featured-image-slider__dot ${i === currentIndex ? 'is-active' : ''}`}
                onClick={(e) => {
                    e.stopPropagation();
                    onSelect(i);
                }}
            />
        ))}
    </div>
);

export default SliderOutlinedDots;
