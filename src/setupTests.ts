import '@testing-library/jest-dom';

class IntersectionObserverMock implements IntersectionObserver {
    private callback: IntersectionObserverCallback;
    readonly root: Element | Document | null = null;
    readonly rootMargin: string = '';
    readonly thresholds: ReadonlyArray<number> = [];
    readonly scrollMargin: string = '';

    constructor(callback: IntersectionObserverCallback) {
        this.callback = callback;
    }
    observe = (target: Element) => {
        this.callback([{ isIntersecting: true, target } as IntersectionObserverEntry], this);
    };
    unobserve = () => {};
    disconnect = () => {};
    takeRecords = (): IntersectionObserverEntry[] => [];
}

class ResizeObserverMock implements ResizeObserver {
    observe = () => {};
    unobserve = () => {};
    disconnect = () => {};
}

global.IntersectionObserver = IntersectionObserverMock;
global.ResizeObserver = ResizeObserverMock;

window.matchMedia =
    window.matchMedia ||
    ((query: string) => ({
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
