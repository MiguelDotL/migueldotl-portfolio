import { useEffect, useRef, useState } from 'react';
import '../assets/styles/FeaturedImageSlider.css';

export type FeaturedImageSlide = {
    src: string;
    alt: string;
};

export type SliderIndicator =
    | 'frosted-dots'
    | 'counter'
    | 'segmented-progress'
    | 'outlined-dots';

export type SliderControl = 'arrows' | 'click-image' | 'keyboard' | 'swipe';

type Props = {
    images: FeaturedImageSlide[];
    intervalMs?: number;
    indicator?: SliderIndicator;
    controls?: SliderControl[];
};

const SWIPE_THRESHOLD_PX = 40;

const FeaturedImageSlider = ({
    images,
    intervalMs = 3690,
    indicator = 'frosted-dots',
    controls = []
}: Props) => {
    const [index, setIndex] = useState(0);
    const [paused, setPaused] = useState(false);
    const [progress, setProgress] = useState(0);
    const swipeStartX = useRef<number | null>(null);

    const useArrows = controls.includes('arrows');
    const useClickImage = controls.includes('click-image');
    const useKeyboard = controls.includes('keyboard');
    const useSwipe = controls.includes('swipe');

    const next = () => setIndex((i) => (i + 1) % images.length);
    const prev = () => setIndex((i) => (i - 1 + images.length) % images.length);

    useEffect(() => {
        // Reset progress when the active slide changes so the segmented-progress
        // bar restarts from 0 for the new slide.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setProgress(0);
    }, [index]);

    useEffect(() => {
        if (paused || images.length <= 1) return;
        let raf = 0;
        const start = performance.now() - progress * intervalMs;
        const tick = (now: number) => {
            const p = Math.min((now - start) / intervalMs, 1);
            setProgress(p);
            if (p < 1) {
                raf = requestAnimationFrame(tick);
            } else {
                next();
            }
        };
        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [paused, intervalMs, images.length, index]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (!useKeyboard) return;
        if (e.key === 'ArrowLeft') {
            e.preventDefault();
            prev();
        } else if (e.key === 'ArrowRight') {
            e.preventDefault();
            next();
        }
    };

    const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
        if (!useSwipe) return;
        swipeStartX.current = e.clientX;
    };

    const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
        if (!useSwipe || swipeStartX.current === null) return;
        const dx = e.clientX - swipeStartX.current;
        swipeStartX.current = null;
        if (Math.abs(dx) > SWIPE_THRESHOLD_PX) {
            if (dx < 0) next();
            else prev();
        }
    };

    const handleSlideClick = () => {
        if (useClickImage) next();
    };

    const dotIndicator = (variant: 'frosted' | 'outlined') => (
        <div
            className={`featured-image-slider__dots featured-image-slider__dots--${variant}`}
            role="tablist"
        >
            {images.map((img, i) => (
                <button
                    key={img.src}
                    type="button"
                    role="tab"
                    aria-label={`Show image ${i + 1}`}
                    aria-selected={i === index}
                    className={`featured-image-slider__dot ${
                        i === index ? 'is-active' : ''
                    }`}
                    onClick={(e) => {
                        e.stopPropagation();
                        setIndex(i);
                    }}
                />
            ))}
        </div>
    );

    return (
        <div
            className="featured-image-slider"
            tabIndex={useKeyboard ? 0 : -1}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocus={() => setPaused(true)}
            onBlur={() => setPaused(false)}
            onKeyDown={handleKeyDown}
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
        >
            {images.map((img, i) => (
                <img
                    key={img.src}
                    src={img.src}
                    alt={img.alt}
                    className={`featured-image-slider__slide ${
                        i === index ? 'is-active' : ''
                    } ${useClickImage ? 'is-clickable' : ''}`}
                    aria-hidden={i !== index}
                    onClick={i === index ? handleSlideClick : undefined}
                />
            ))}

            {useArrows && images.length > 1 && (
                <>
                    <button
                        type="button"
                        aria-label="Previous image"
                        className="featured-image-slider__arrow featured-image-slider__arrow--prev"
                        onClick={(e) => {
                            e.stopPropagation();
                            prev();
                        }}
                    >
                        <span aria-hidden>‹</span>
                    </button>
                    <button
                        type="button"
                        aria-label="Next image"
                        className="featured-image-slider__arrow featured-image-slider__arrow--next"
                        onClick={(e) => {
                            e.stopPropagation();
                            next();
                        }}
                    >
                        <span aria-hidden>›</span>
                    </button>
                </>
            )}

            {indicator === 'segmented-progress' && images.length > 1 && (
                <div className="featured-image-slider__segments" role="tablist">
                    {images.map((img, i) => {
                        const fill =
                            i < index ? 1 : i === index ? progress : 0;
                        return (
                            <button
                                key={img.src}
                                type="button"
                                role="tab"
                                aria-label={`Show image ${i + 1}`}
                                aria-selected={i === index}
                                className="featured-image-slider__segment"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setIndex(i);
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
            )}

            {indicator === 'counter' && images.length > 1 && (
                <div
                    className="featured-image-slider__counter"
                    aria-live="polite"
                >
                    {index + 1} / {images.length}
                </div>
            )}

            {indicator === 'frosted-dots' && images.length > 1 && dotIndicator('frosted')}
            {indicator === 'outlined-dots' && images.length > 1 && dotIndicator('outlined')}
        </div>
    );
};

export default FeaturedImageSlider;
