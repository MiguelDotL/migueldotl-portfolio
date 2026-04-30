import '@testing-library/jest-dom';

class IntersectionObserverMock {
    constructor(callback) {
        this.callback = callback;
    }
    observe = (target) => {
        this.callback([{ isIntersecting: true, target }], this);
    };
    unobserve = () => {};
    disconnect = () => {};
    takeRecords = () => [];
    root = null;
    rootMargin = '';
    thresholds = [];
}

class ResizeObserverMock {
    observe = () => {};
    unobserve = () => {};
    disconnect = () => {};
}

global.IntersectionObserver = IntersectionObserverMock;
global.ResizeObserver = ResizeObserverMock;

window.matchMedia =
    window.matchMedia ||
    ((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addEventListener: () => {},
        removeEventListener: () => {},
        addListener: () => {},
        removeListener: () => {},
        dispatchEvent: () => false
    }));

Element.prototype.scrollIntoView = Element.prototype.scrollIntoView || (() => {});
