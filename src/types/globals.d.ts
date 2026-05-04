// Global Window augmentations.
//
// Note: `requestIdleCallback` and `cancelIdleCallback` are already declared
// in lib.dom.d.ts (non-optional). NavBar uses them via a runtime guard
// (`if (ric)`) which handles Safari's historical lack of support without
// needing a cast. No augmentation is required for those.
//
// Add future global augmentations here rather than sprinkling `declare global`
// blocks across component files.

export {};
