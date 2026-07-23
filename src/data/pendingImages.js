export const pendingImages = [
    {
        id: "resources-editorial",
        route: "/recursos",
        section: "hero",
        title: "Recursos — Editorial",
        concept: "Conocimiento, documentación, exploración y aprendizaje tecnológico. Módulos editoriales, páginas, capas de información y conexiones organizadas.",
        expectedFilename: "/images/generated/resources-editorial.webp",
        recommendedRatio: "16:9",
        recommendedWidth: 1200,
        recommendedHeight: 675,
        format: "webp",
        status: "pending"
    },
    {
        id: "contact-editorial",
        route: "/contacto",
        section: "hero",
        title: "Contacto — Editorial",
        concept: "Conversación profesional conectando una idea con un equipo. Nodos, mensajes abstractos, dos puntos que convergen.",
        expectedFilename: "/images/generated/contact-editorial.webp",
        recommendedRatio: "16:9",
        recommendedWidth: 1200,
        recommendedHeight: 675,
        format: "webp",
        status: "pending"
    },
    {
        id: "notfound-editorial",
        route: "/404",
        section: "hero",
        title: "404 — Ilustración",
        concept: "Ruta, conexión o módulo que no encuentra su destino. Limpia y amigable, no infantil.",
        expectedFilename: "/images/generated/notfound-editorial.webp",
        recommendedRatio: "1:1",
        recommendedWidth: 400,
        recommendedHeight: 400,
        format: "webp",
        status: "pending"
    },
    {
        id: "article-cost",
        route: "/recursos/cuanto-cuesta-desarrollar-software",
        section: "cover",
        title: "Artículo: Cuánto cuesta desarrollar software",
        concept: "Alcance, módulos, tiempo, recursos y planificación. Sin monedas ni cifras.",
        expectedFilename: "/images/generated/article-cost.webp",
        recommendedRatio: "16:9",
        recommendedWidth: 1200,
        recommendedHeight: 675,
        format: "webp",
        status: "pending"
    },
    {
        id: "article-web",
        route: "/recursos/web-corporativa-o-plataforma",
        section: "cover",
        title: "Artículo: Web corporativa o plataforma",
        concept: "Dos caminos digitales: vitrina informativa vs sistema interactivo con módulos.",
        expectedFilename: "/images/generated/article-web.webp",
        recommendedRatio: "16:9",
        recommendedWidth: 1200,
        recommendedHeight: 675,
        format: "webp",
        status: "pending"
    },
    {
        id: "article-process",
        route: "/recursos/como-digitalizar-un-proceso",
        section: "cover",
        title: "Artículo: Cómo digitalizar un proceso",
        concept: "Flujo manual desordenado convirtiéndose en una secuencia digital organizada.",
        expectedFilename: "/images/generated/article-process.webp",
        recommendedRatio: "16:9",
        recommendedWidth: 1200,
        recommendedHeight: 675,
        format: "webp",
        status: "pending"
    },
    {
        id: "article-custom",
        route: "/recursos/cuando-necesitas-software-a-medida",
        section: "cover",
        title: "Artículo: Cuándo necesitas software a medida",
        concept: "Piezas o módulos encajando alrededor de una necesidad específica, sin rompecabezas infantil.",
        expectedFilename: "/images/generated/article-custom.webp",
        recommendedRatio: "16:9",
        recommendedWidth: 1200,
        recommendedHeight: 675,
        format: "webp",
        status: "pending"
    }
];

export function getPendingImage(id) {
    return pendingImages.find(img => img.id === id) || null;
}
