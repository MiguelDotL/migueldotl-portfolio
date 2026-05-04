import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import SliderArrowButton from './SliderArrowButton';
import ResponsiveImage from './ResponsiveImage';
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
    intervalMs = 3690,
    indicator = 'frosted-dots',
    controls = [],
    imagePosition = 'center'
}: FeaturedImageSliderProps) => {
    const [index, setIndex] = useState(0);
    const [paused, setPaused] = useState(false);
    const [progress, setProgress] = useState(0);
    const [lightboxOpen, setLightboxOpen] = useState(false);
    // Pause rAF when scrolled off-screen so multiple sliders don't keep ticking
    // when the section isn't visible. Defaults to true so we don't autoplay
    // until we've actually observed visibility (avoids a brief tick before the
    // observer fires).
    const [offScreen, setOffScreen] = useState(true);
    const rootRef = useRef<HTMLDivElement>(null);
    const swipeStartX = useRef<number | null>(null);

    const useArrows = controls.includes('arrows');
    const useClickImage = controls.includes('click-image');
    const useKeyboard = controls.includes('keyboard');
    const useSwipe = controls.includes('swipe');

    const next = () => setIndex((i) => (i + 1) % images.length);
    const prev = () => setIndex((i) => (i - 1 + images.length) % images.length);

    // Pause autoplay while the lightbox is open so the slide doesn't advance
    // out from under the user. Also pause when off-screen.
    const effectivelyPaused = paused || lightboxOpen || offScreen;

    useEffect(() => {
        const el = rootRef.current;
        if (!el) return;
        // Skip when IntersectionObserver isn't available (e.g. older test envs).
        if (typeof IntersectionObserver === 'undefined') {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setOffScreen(false);
            return;
        }
        const io = new IntersectionObserver(
            ([entry]) => {
                setOffScreen(!entry.isIntersecting);
            },
            { rootMargin: '100px' }
        );
        io.observe(el);
        return () => io.disconnect();
    }, []);

    useEffect(() => {
        // Reset progress when the active slide changes so the segmented-progress
        // bar restarts from 0 for the new slide.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setProgress(0);
    }, [index]);

    useEffect(() => {
        if (effectivelyPaused || images.length <= 1) return;
        // Only the segmented-progress indicator actually reads `progress`.
        // For other indicators, gate the autoplay loop on a single setTimeout
        // instead of a 60Hz rAF + setState — saves ~60 component rerenders
        // per second of autoplay.
        if (indicator !== 'segmented-progress') {
            const t = window.setTimeout(next, intervalMs);
            return () => window.clearTimeout(t);
        }
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
    }, [effectivelyPaused, intervalMs, images.length, index, indicator]);

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

            {lightboxOpen && createPortal(
                <div
                    className="featured-image-slider__lightbox"
                    role="dialog"
                    aria-modal="true"
                    aria-label={images[index].alt}
                    onClick={() => setLightboxOpen(false)}
                >
                    <ResponsiveImage
                        src={images[index].src}
                        srcWebp={images[index].srcWebp}
                        alt={images[index].alt}
                        className="featured-image-slider__lightbox-img"
                        onClick={(e) => e.stopPropagation()}
                    />
                    <button
                        type="button"
                        aria-label="Close"
                        className="featured-image-slider__lightbox-close"
                        onClick={(e) => {
                            e.stopPropagation();
                            setLightboxOpen(false);
                        }}
                    >
                        ×
                    </button>
                    {images.length > 1 && (
                        <>
                            <SliderArrowButton
                                direction="prev"
                                classScope="featured-image-slider__lightbox-arrow"
                                onClick={prev}
                            />
                            <SliderArrowButton
                                direction="next"
                                classScope="featured-image-slider__lightbox-arrow"
                                onClick={next}
                            />
                        </>
                    )}
                </div>,
                document.body
            )}
        </div>
    );
};

export default FeaturedImageSlider;
