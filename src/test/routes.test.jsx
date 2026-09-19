import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { routes } from "../router";
import { ThemeProvider } from "../context/ThemeContext";
import { services } from "../data/services";
import { solutions } from "../data/solutions";
import { projects } from "../data/projects";
import { articles } from "../data/resources";

// El hero 3D necesita WebGL; en jsdom se reemplaza por un contenedor vacío
vi.mock("../components/hero-scene", () => ({ default: () => <div data-testid="hero-scene" /> }));

const PAGES = [
    "/",
    "/servicios",
    "/soluciones",
    "/casos-de-exito",
    "/nosotros",
    "/recursos",
    "/recursos/tecnologias",
    "/contacto",
    "/privacidad",
    "/terminos-y-condiciones",
    "/libro-de-reclamaciones",
    ...services.map((s) => `/servicios/${s.slug}`),
    ...solutions.map((s) => `/soluciones/${s.slug}`),
    ...projects.map((p) => `/casos-de-exito/${p.slug}`),
    ...articles.map((a) => `/recursos/${a.slug}`),
];

function renderAt(path) {
    const router = createMemoryRouter(routes, { initialEntries: [path] });
    render(
        <ThemeProvider>
            <RouterProvider router={router} />
        </ThemeProvider>
    );
}

describe("todas las vistas renderizan", () => {
    it.each(PAGES)("%s muestra su título y no cae en 404", async (path) => {
        renderAt(path);
        const heading = await screen.findByRole("heading", { level: 1 }, { timeout: 4000 });
        expect(heading).toBeInTheDocument();
        expect(screen.queryByText(/página no encontrada/i)).not.toBeInTheDocument();
    });

    it("una ruta inexistente muestra la página 404", async () => {
        renderAt("/no-existe");
        expect(await screen.findByText(/página no encontrada/i)).toBeInTheDocument();
    });

    it("las páginas legales muestran contenido propio", async () => {
        renderAt("/privacidad");
        expect(await screen.findByText(/Ley N.° 29733/, { selector: "p" })).toBeInTheDocument();
        const phoneLinks = screen.getAllByRole("link", { name: /\+51 953/ });
        expect(phoneLinks.some((a) => a.getAttribute("href") === "tel:+51953337437")).toBe(true);
    });
});
