export type SliderCounterIndicatorProps = {
    currentIndex: number;
    totalSlides: number;
};

const SliderCounterIndicator = ({ currentIndex, totalSlides }: SliderCounterIndicatorProps) => (
    <div className="featured-image-slider__counter" aria-live="polite">
        {currentIndex + 1} / {totalSlides}
    </div>
);

export default SliderCounterIndicator;
