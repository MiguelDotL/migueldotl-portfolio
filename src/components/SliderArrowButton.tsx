type Direction = 'prev' | 'next';

type Props = {
    direction: Direction;
    /** CSS class scope. The slider chrome uses `featured-image-slider__arrow`,
        the lightbox chrome uses `featured-image-slider__lightbox-arrow`. */
    classScope: 'featured-image-slider__arrow' | 'featured-image-slider__lightbox-arrow';
    onClick: () => void;
};

const LABEL: Record<Direction, string> = {
    prev: 'Previous image',
    next: 'Next image'
};

const GLYPH: Record<Direction, string> = {
    prev: '‹',
    next: '›'
};

// Prev/next chevron button used by FeaturedImageSlider in two places:
// the slider chrome and the open lightbox. Same markup, different CSS
// class scopes — keep classScope explicit so callers control which
// chrome the button belongs to.
const SliderArrowButton = ({ direction, classScope, onClick }: Props) => (
    <button
        type="button"
        aria-label={LABEL[direction]}
        className={`${classScope} ${classScope}--${direction}`}
        onClick={(e) => {
            e.stopPropagation();
            onClick();
        }}
    >
        <span aria-hidden>{GLYPH[direction]}</span>
    </button>
);

export default SliderArrowButton;
