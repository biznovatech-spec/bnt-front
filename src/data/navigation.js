export const navigationData = [
    {
        label: "Inicio",
        href: "/",
        type: "route"
    },
    {
        label: "Servicios",
        href: "/servicios",
        type: "route",
        submenu: [
            { label: "Ver todos los servicios", href: "/servicios", type: "route" },
            { label: "Consultoría tecnológica", href: "/servicios/consultoria-tecnologica", type: "route" },
            { label: "Desarrollo de software", href: "/servicios/desarrollo-software", type: "route" },
            { label: "Desarrollo web", href: "/servicios/desarrollo-web", type: "route" },
            { label: "Aplicaciones móviles", href: "/servicios/aplicaciones-moviles", type: "route" },
            { label: "Inteligencia artificial", href: "/servicios/inteligencia-artificial", type: "route" },
            { label: "Diseño UX/UI", href: "/servicios/diseno-ux-ui", type: "route" },
            { label: "Cloud y DevOps", href: "/servicios/cloud-devops", type: "route" },
            { label: "Mantenimiento y soporte", href: "/servicios/mantenimiento-soporte", type: "route" }
        ]
    },
    {
        label: "Soluciones",
        href: "/soluciones",
        type: "route",
        submenu: [
            { label: "Ver todas las soluciones", href: "/soluciones", type: "route" },
            { label: "Automatización", href: "/soluciones/automatizacion-procesos", type: "route" },
            { label: "Sistemas de gestión", href: "/soluciones/sistemas-gestion", type: "route" },
            { label: "Plataformas", href: "/soluciones/plataformas-digitales", type: "route" },
            { label: "Integraciones", href: "/soluciones/integracion-sistemas", type: "route" },
            { label: "Comercio electrónico", href: "/soluciones/comercio-electronico", type: "route" },
            { label: "Modernización", href: "/soluciones/modernizacion-software", type: "route" }
        ]
    },
    {
        label: "Casos de éxito",
        href: "/casos-de-exito",
        type: "route",
        submenu: [
            { label: "Ver todos los casos", href: "/casos-de-exito", type: "route" },
            { label: "HYCON", href: "/casos-de-exito/hycon", type: "route" },
            { label: "TIKTUY", href: "/casos-de-exito/tiktuy", type: "route" },
            { label: "Presusoft", href: "/casos-de-exito/presusoft", type: "route" },
            { label: "Tiktuy Design", href: "/casos-de-exito/tiktuy-design", type: "route" }
        ]
    },
    {
        label: "Nosotros",
        href: "/nosotros",
        type: "route",
        submenu: [
            { label: "Conoce Biznovatech", href: "/nosotros", type: "route" },
            { label: "Quiénes somos", href: "/nosotros#quienes-somos", type: "hash" },
            { label: "Propósito y valores", href: "/nosotros#proposito-valores", type: "hash" },
            { label: "Nuestro equipo", href: "/nosotros#equipo", type: "hash" },
            { label: "Metodología", href: "/nosotros#metodologia", type: "hash" }
        ]
    },
    {
        label: "Recursos",
        href: "/recursos",
        type: "route",
        submenu: [
            { label: "Centro de recursos", href: "/recursos", type: "route" },
            { label: "Atlas tecnológico", href: "/recursos/tecnologias", type: "route" },
            { label: "Artículos", href: "/recursos#articulos", type: "hash" },
            { label: "Preguntas frecuentes", href: "/recursos#preguntas-frecuentes", type: "hash" }
        ]
    }
];
