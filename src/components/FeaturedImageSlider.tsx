import { useEffect, useRef, useState } from 'react';
import SliderArrowButton from './SliderArrowButton';
import ResponsiveImage from './ResponsiveImage';
import SliderFrostedDots from './SliderFrostedDots';
import SliderOutlinedDots from './SliderOutlinedDots';
import SliderSegmentedProgress from './SliderSegmentedProgress';
import SliderCounterIndicator from './SliderCounterIndicator';
import LightboxOverlay from './LightboxOverlay';
import useCarouselAutoplay from '../hooks/useCarouselAutoplay';
import { SLIDER_AUTOPLAY_INTERVAL } from '../config/timings';
import '../assets/styles/FeaturedImageSlider.css';

export type FeaturedImageSlide = {
    src: string;
    /** Optional WebP source served via <picture> when supported. */
    srcWebp?: string;
    alt: string;
};

export type SliderIndicator =
    | 'frosted-dots'
    | 'counter'
    | 'segmented-progress'
    | 'outlined-dots';

export type SliderControl = 'arrows' | 'click-image' | 'keyboard' | 'swipe';

export type FeaturedImageSliderProps = {
    images: FeaturedImageSlide[];
    intervalMs?: number;
    indicator?: SliderIndicator;
    controls?: SliderControl[];
    /** CSS object-position for the slide images. Defaults to "center". */
    imagePosition?: string;
};

const SWIPE_THRESHOLD_PX = 40;

const FeaturedImageSlider = ({
    images,
    intervalMs = SLIDER_AUTOPLAY_INTERVAL,
    indicator = 'frosted-dots',
    controls = [],
    imagePosition = 'center'
}: FeaturedImageSliderProps) => {
    const [index, setIndex] = useState(0);
    const [paused, setPaused] = useState(false);
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const swipeStartX = useRef<number | null>(null);

    const useArrows = controls.includes('arrows');
    const useClickImage = controls.includes('click-image');
    const useKeyboard = controls.includes('keyboard');
    const useSwipe = controls.includes('swipe');

    const next = () => setIndex((i) => (i + 1) % images.length);
    const prev = () => setIndex((i) => (i - 1 + images.length) % images.length);

    const { ref: rootRef, progress } = useCarouselAutoplay({
        totalSlides: images.length,
        activeIndex: index,
        intervalMs,
        indicator,
        paused: paused || lightboxOpen,
        onAdvance: next
    });

    // Lightbox keyboard nav: Esc closes, arrows navigate.
    useEffect(() => {
        if (!lightboxOpen) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setLightboxOpen(false);
            else if (e.key === 'ArrowLeft') prev();
            else if (e.key === 'ArrowRight') next();
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [lightboxOpen]);

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
        else setLightboxOpen(true);
    };

    // index is always valid — it's clamped to [0, images.length-1] by setIndex.
    const activeSlide = images[index]!;

    return (
        <div
            ref={rootRef}
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
                <ResponsiveImage
                    key={img.src}
                    src={img.src}
                    srcWebp={img.srcWebp}
                    alt={img.alt}
                    loading="lazy"
                    className={`featured-image-slider__slide ${
                        i === index ? 'is-active' : ''
                    } is-clickable`}
                    aria-hidden={i !== index}
                    onClick={i === index ? handleSlideClick : undefined}
                    style={{ objectPosition: imagePosition }}
                />
            ))}

            {useArrows && images.length > 1 && (
                <>
                    <SliderArrowButton
                        direction="prev"
                        classScope="featured-image-slider__arrow"
                        onClick={prev}
                    />
                    <SliderArrowButton
                        direction="next"
                        classScope="featured-image-slider__arrow"
                        onClick={next}
                    />
                </>
            )}

            {indicator === 'segmented-progress' && images.length > 1 && (
                <SliderSegmentedProgress
                    images={images}
                    currentIndex={index}
                    progress={progress}
                    onSelect={setIndex}
                />
            )}

            {indicator === 'counter' && images.length > 1 && (
                <SliderCounterIndicator
                    currentIndex={index}
                    totalSlides={images.length}
                />
            )}

            {indicator === 'frosted-dots' && images.length > 1 && (
                <SliderFrostedDots
                    images={images}
                    currentIndex={index}
                    onSelect={setIndex}
                />
            )}

            {indicator === 'outlined-dots' && images.length > 1 && (
                <SliderOutlinedDots
                    images={images}
                    currentIndex={index}
                    onSelect={setIndex}
                />
            )}

            {lightboxOpen && (
                <LightboxOverlay
                    images={images}
                    activeSlide={activeSlide}
                    onClose={() => setLightboxOpen(false)}
                    onPrev={prev}
                    onNext={next}
                />
            )}
        </div>
    );
};

export default FeaturedImageSlider;
