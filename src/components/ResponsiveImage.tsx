import { forwardRef } from 'react';
import type { ImgHTMLAttributes } from 'react';

type ResponsiveImageProps = ImgHTMLAttributes<HTMLImageElement> & {
    src: string;
    /** Optional WebP source. When provided, a <picture> wrapper is rendered
        so browsers that support WebP use the smaller file; `src` (PNG/JPG)
        stays as the universal fallback. When absent, renders a bare <img>. */
    srcWebp?: string;
    alt: string;
};

/**
 * Renders `<picture><source type="image/webp" /><img /></picture>` when
 * `srcWebp` is supplied, or a plain `<img>` when it is not. All extra props
 * are forwarded to the `<img>` element.
 */
const ResponsiveImage = forwardRef<HTMLImageElement, ResponsiveImageProps>(
    ({ src, srcWebp, alt, ...rest }, ref) => {
        if (srcWebp) {
            return (
                <picture>
                    <source srcSet={srcWebp} type="image/webp" />
                    <img ref={ref} src={src} alt={alt} {...rest} />
                </picture>
            );
        }
        return <img ref={ref} src={src} alt={alt} {...rest} />;
    }
);

ResponsiveImage.displayName = 'ResponsiveImage';

export default ResponsiveImage;
