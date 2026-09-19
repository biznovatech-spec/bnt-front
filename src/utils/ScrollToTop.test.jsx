import { describe, expect, it } from "vitest";
import { act, render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ScrollToTop from "./ScrollToTop";

describe("ScrollToTop", () => {
    it("sube al inicio cuando la ruta no tiene ancla", () => {
        render(
            <MemoryRouter initialEntries={["/servicios"]}>
                <ScrollToTop />
            </MemoryRouter>
        );
        expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, left: 0, behavior: "instant" });
    });

    it("baja a la sección del ancla aunque aparezca después (página diferida)", async () => {
        render(
            <MemoryRouter initialEntries={["/nosotros#equipo"]}>
                <ScrollToTop />
            </MemoryRouter>
        );
        expect(window.scrollTo).not.toHaveBeenCalled();

        const section = document.createElement("section");
        section.id = "equipo";
        document.body.appendChild(section);
        await act(() => new Promise((resolve) => setTimeout(resolve, 50)));

        expect(section.scrollIntoView).toHaveBeenCalledWith({ behavior: "smooth", block: "start" });
        section.remove();
    });
});
