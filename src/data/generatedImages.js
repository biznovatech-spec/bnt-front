/**
 * Registry of generated editorial images that actually exist on disk.
 * Images that are pending generation live in pendingImages.js instead.
 */
export const generatedImages = [{
        id: "services-editorial",
        filename: "/images/generated/services-editorial.webp",
        route: "/servicios",
        section: "hero",
        alt: "Composición isométrica 3D de análisis, diseño y desarrollo conectados",
        generated: true,
        purpose: "Apoyo visual principal"
    },
    {
        id: "solutions-editorial",
        filename: "/images/generated/solutions-editorial.webp",
        route: "/soluciones",
        section: "hero",
        alt: "Mapa visual de conexiones ordenando procesos dispersos",
        generated: true,
        purpose: "Apoyo visual principal"
    },
    {
        id: "about-editorial",
        filename: "/images/generated/about-editorial.webp",
        route: "/nosotros",
        section: "hero",
        alt: "Concepto abstracto de equipo multidisciplinario unificado",
        generated: true,
        purpose: "Apoyo visual principal"
    },
    {
        id: "contact-editorial",
        filename: "/images/generated/contact-editorial.webp",
        route: "/contacto",
        section: "hero",
        alt: "Concepto abstracto de equipo multidisciplinario unificado",
        generated: true,
        purpose: "Apoyo visual contact page"
    },
    {
        id: "resources-editorial",
        filename: "/images/generated/resources-editorial.webp",
        route: "/recursos",
        section: "hero",
        alt: "Concepto abstracto de equipo multidisciplinario unificado",
        generated: true,
        purpose: "Apoyo visual resources page"
    }
];

export function getGeneratedImage(id) {
    return generatedImages.find(img => img.id === id) || null;
}