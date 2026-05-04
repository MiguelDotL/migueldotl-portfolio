import type { FeaturedImageSlide } from './FeaturedImageSlider';

export type SliderSegmentedProgressProps = {
    images: FeaturedImageSlide[];
    currentIndex: number;
    /** Autoplay progress for the current slide (0–1). */
    progress: number;
    onSelect: (index: number) => void;
};

const SliderSegmentedProgress = ({
    images,
    currentIndex,
    progress,
    onSelect
}: SliderSegmentedProgressProps) => (
    <div className="featured-image-slider__segments" role="tablist">
        {images.map((img, i) => {
            const fill = i < currentIndex ? 1 : i === currentIndex ? progress : 0;
            return (
                <button
                    key={img.src}
                    type="button"
                    role="tab"
                    aria-label={`Show image ${i + 1}`}
                    aria-selected={i === currentIndex}
                    className="featured-image-slider__segment"
                    onClick={(e) => {
                        e.stopPropagation();
                        onSelect(i);
                    }}
                >
                    <span
                        className="featured-image-slider__segment-fill"
                        style={{ width: `${fill * 100}%` }}
                    />
                </button>
            );
        })}
    </div>
);

export default SliderSegmentedProgress;
