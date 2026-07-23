export const projects = [
    {
        id: 1,
        slug: "hycon",
        name: "HYCON",
        category: "Desarrollo web",
        image: "/image/hycon.png",
        context: "HYCON es un proyecto digital vinculado a servicios logísticos y empresariales que necesitaba presentar su organización y sus servicios mediante una experiencia digital clara y profesional.",
        challenge: "La empresa contaba con información dispersa y sin un canal digital que comunicara de forma efectiva su propuesta de valor. Necesitaban un sitio que organizara su oferta de servicios, transmitiera confianza y facilitara el contacto con potenciales clientes.",
        solution: "Biznovatech organizó la información de HYCON, definió la estructura de navegación y construyó un sitio web desde cero que presenta los servicios de forma clara, con un diseño responsive y una experiencia de usuario coherente.",
        participation: [
            "Levantamiento y análisis de la información del negocio",
            "Definición de arquitectura de información y navegación",
            "Diseño de la interfaz y experiencia de usuario",
            "Desarrollo frontend completo",
            "Despliegue y puesta en producción"
        ],
        technologies: ["react", "tailwind", "vite", "javascript", "html5", "css3"],
        reflection: "Este proyecto reforzó la importancia de comprender el contexto del cliente antes de diseñar. La estructura de contenido nació de conversaciones, no de suposiciones, y eso se refleja en un sitio que comunica de forma auténtica.",
        relatedServices: ["desarrollo-web", "diseno-ux-ui", "consultoria-tecnologica"],
        relatedCases: ["tiktuy"]
    },
    {
        id: 2,
        slug: "tiktuy",
        name: "TIKTUY",
        category: "Software a medida",
        image: "/image/tiktuy.png",
        context: "TIKTUY es una plataforma orientada a la gestión y conexión de servicios profesionales. El proyecto nació a partir de la necesidad de organizar una experiencia digital que conectara usuarios, servicios e información de forma estructurada.",
        challenge: "Se requería construir una plataforma completa desde cero que permitiera gestionar diferentes tipos de usuarios, servicios y flujos de interacción. El desafío incluía diseñar una experiencia intuitiva para un producto con múltiples funcionalidades.",
        solution: "Biznovatech trabajó desde la conceptualización del producto. Se definieron flujos de usuario, estructura de datos, interfaz y arquitectura técnica. El equipo integró análisis funcional, diseño UI/UX, desarrollo frontend y desarrollo backend en un proceso coordinado.",
        participation: [
            "Análisis funcional y definición de requerimientos",
            "Diseño de flujos de usuario y arquitectura de información",
            "Diseño de interfaz y experiencia de usuario",
            "Desarrollo frontend",
            "Desarrollo backend y APIs",
            "Integración de módulos y pruebas"
        ],
        technologies: ["react", "nodejs", "express", "postgresql", "tailwind", "figma", "docker"],
        reflection: "TIKTUY demostró que los proyectos más sólidos nacen cuando análisis, diseño y desarrollo trabajan como un solo equipo. Las decisiones técnicas se tomaron con contexto de negocio, y las decisiones de diseño se validaron con viabilidad técnica.",
        relatedServices: ["desarrollo-software", "diseno-ux-ui", "consultoria-tecnologica", "desarrollo-web"],
        relatedCases: ["tiktuy-design"]
    },
    {
        id: 3,
        slug: "presusoft",
        name: "Presusoft",
        category: "Software a medida",
        image: "/image/presusoft.png",
        context: "Presusoft es una solución enfocada en facilitar la creación, organización y gestión de presupuestos. El proyecto respondía a la necesidad de estructurar un proceso que se realizaba de forma manual y dispersa.",
        challenge: "La gestión de presupuestos se hacía a través de documentos sueltos, hojas de cálculo y correos. Esto generaba inconsistencias, pérdida de información y dificultad para hacer seguimiento. Se necesitaba un sistema centralizado que organizara todo el proceso.",
        solution: "Biznovatech diseñó una estructura clara para registrar, organizar y consultar presupuestos. Se desarrolló una plataforma que permite crear presupuestos de forma guiada, consultar historiales y gestionar la información desde un solo lugar.",
        participation: [
            "Análisis funcional del proceso de presupuestos",
            "Definición de estructura de datos",
            "Diseño de interfaz y flujos de trabajo",
            "Desarrollo frontend y backend",
            "Implementación y pruebas"
        ],
        technologies: ["react", "nodejs", "postgresql", "tailwind", "figma"],
        reflection: "Este proyecto mostró que incluso un proceso aparentemente sencillo como gestionar presupuestos tiene matices que solo se descubren al analizar cómo se trabaja realmente. La solución no replicó un formato de hoja de cálculo: se diseñó pensando en cómo el usuario necesitaba interactuar con su información.",
        relatedServices: ["desarrollo-software", "diseno-ux-ui", "consultoria-tecnologica"],
        relatedCases: []
    },
    {
        id: 4,
        slug: "tiktuy-design",
        name: "Tiktuy Design",
        category: "Diseño UI/UX",
        image: "/image/tiktuy.png",
        context: "Tiktuy Design documenta el proceso UI/UX del ecosistema TIKTUY. No es un cliente diferente, sino un caso especializado de diseño que muestra cómo se construyó la experiencia visual del producto antes de su desarrollo.",
        challenge: "Diseñar la experiencia de un producto con múltiples tipos de usuario, funcionalidades cruzadas y flujos complejos requería un proceso de diseño riguroso. Cada pantalla debía resolver un problema concreto sin añadir complejidad innecesaria.",
        solution: "Se realizó un proceso completo de diseño UI/UX que incluyó exploración, arquitectura de información, wireframes, prototipos interactivos y un sistema de componentes coherente. Todo el diseño se preparó para facilitar una implementación fiel al producto final.",
        participation: [
            "Exploración y benchmark",
            "Arquitectura de información del producto",
            "Flujos de usuario por perfil",
            "Wireframes de baja y media fidelidad",
            "Diseño de interfaz en Figma",
            "Sistema de componentes y tokens visuales",
            "Prototipos interactivos para validación",
            "Diseño responsive completo",
            "Preparación de entregables para desarrollo"
        ],
        technologies: ["figma", "blender"],
        reflection: "Tiktuy Design demuestra que el diseño no es una etapa aislada: es un proceso continuo que necesita alimentarse de análisis funcional y devolver claridad al desarrollo. Los prototipos no solo sirvieron para validar la interfaz, sino para descubrir funcionalidades que no estaban contempladas inicialmente.",
        relatedServices: ["diseno-ux-ui", "consultoria-tecnologica"],
        relatedCases: ["tiktuy"]
    }
];

export function getProjectBySlug(slug) {
    return projects.find(p => p.slug === slug) || null;
}
