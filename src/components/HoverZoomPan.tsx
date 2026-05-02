import { useState, type MouseEvent } from 'react';

type Props = {
    src: string;
    alt: string;
    /** Multiplier on hover (1.06 = 106%). Defaults to 1.06. */
    zoomScale?: number;
    /** Transition duration in ms for zoom in/out. Defaults to 693. */
    transitionMs?: number;
};

const HoverZoomPan = ({ src, alt, zoomScale = 1.06, transitionMs = 693 }: Props) => {
    const [origin, setOrigin] = useState({ x: 50, y: 50 });
    const [hovered, setHovered] = useState(false);

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        setOrigin({ x, y });
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
            onMouseLeave={() => setHovered(false)}
            onMouseMove={handleMouseMove}
        >
            <img
                src={src}
                alt={alt}
                style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transformOrigin: `${origin.x}% ${origin.y}%`,
                    transform: hovered ? `scale(${zoomScale})` : 'scale(1)',
                    transition: `transform ${transitionMs}ms cubic-bezier(0.4, 0, 0.2, 1)`
                }}
            />
        </div>
    );
};

export default HoverZoomPan;
