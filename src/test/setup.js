import "@testing-library/jest-dom/vitest";
import { afterEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";

// jsdom no implementa estas APIs del navegador; se simulan para poder montar las vistas
class IntersectionObserverStub {
    observe() {}
    unobserve() {}
    disconnect() {}
}
globalThis.IntersectionObserver = IntersectionObserverStub;
window.scrollTo = vi.fn();
Element.prototype.scrollIntoView = vi.fn();
window.matchMedia = window.matchMedia || ((query) => ({
    matches: false,
    media: query,
    addEventListener() {},
    removeEventListener() {},
    addListener() {},
    removeListener() {},
}));

afterEach(() => {
    cleanup();
    vi.clearAllMocks();
});
