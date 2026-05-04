import { useRef, useState, type MouseEvent } from 'react';
import ResponsiveImage from './ResponsiveImage';

export type HoverZoomPanProps = {
    src: string;
    /** Optional WebP source served via <picture> when supported. */
    srcWebp?: string;
    alt: string;
    /** Multiplier on hover (1.63 = 163%). Defaults to 1.63. */
    zoomScale?: number;
    /** Transition duration in ms for zoom in/out. Defaults to 693. */
    transitionMs?: number;
};

const HoverZoomPan = ({
    src,
    srcWebp,
    alt,
    zoomScale = 1.63,
    transitionMs = 963
}: HoverZoomPanProps) => {
    // transformOrigin is purely visual state — write it to the DOM directly via
    // ref instead of going through React state. setState on every mousemove
    // would force a full component rerender 60+ times per second.
    const imgRef = useRef<HTMLImageElement>(null);
    const [hovered, setHovered] = useState(false);

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        if (!imgRef.current) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        imgRef.current.style.transformOrigin = `${x}% ${y}%`;
    };

    const handleMouseLeave = () => {
        setHovered(false);
        if (imgRef.current) {
            imgRef.current.style.transformOrigin = '50% 50%';
        }
    };

    const imgStyle: React.CSSProperties = {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        transform: hovered ? `scale(${zoomScale})` : 'scale(1)',
        transition: `transform ${transitionMs}ms cubic-bezier(0.4, 0, 0.2, 1)`
    };

    return (
        <div
            style={{
                width: '100%',
                height: '100%',
                overflow: 'hidden',
                cursor: hovered ? 'zoom-in' : 'default'
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={handleMouseLeave}
            onMouseMove={handleMouseMove}
        >
            <ResponsiveImage
                ref={imgRef}
                src={src}
                srcWebp={srcWebp}
                alt={alt}
                loading="lazy"
                style={imgStyle}
            />
        </div>
    );
};

export default HoverZoomPan;
