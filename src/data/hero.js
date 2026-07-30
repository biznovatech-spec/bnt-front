export const whyValues = [{
        step: "01",
        icon: "solar:chat-round-dots-linear",
        title: "Entendemos el contexto",
        text: "Escuchamos tu situación antes de proponer tecnología. Cada decisión técnica responde a una necesidad real, no a una plantilla."
    },
    {
        step: "02",
        icon: "solar:ruler-angular-linear",
        title: "Diseñamos a medida",
        text: "No forzamos herramientas genéricas. Construimos la solución alrededor de la manera en que tu proyecto realmente funciona."
    },
    {
        step: "03",
        icon: "solar:users-group-two-rounded-linear",
        title: "Equipo integral",
        text: "Análisis, diseño y desarrollo en un mismo equipo. Tu idea no se pierde ni se desconecta al pasar entre distintas personas."
    },
    {
        step: "04",
        icon: "solar:chart-square-linear",
        title: "Preparado para crecer",
        text: "Construimos bases técnicas sólidas. La primera versión de tu producto estará lista para evolucionar cuando lo necesites."
    }
];

export const audienceCards = [
    {
        number: "01",
        title: "Tengo una idea",
        stage: "Etapa inicial",
        text: "Te ayudamos a ordenar el concepto, evaluar su viabilidad y convertirlo en un primer alcance funcional.",
        icon: "lucide:lightbulb",
        action: "Cuéntanos qué imaginas",
        to: "/contacto",
        related: [
            { label: "Consultoría tecnológica", href: "/servicios/consultoria-tecnologica" },
            { label: "Diseño UI/UX", href: "/servicios/diseno-ux-ui" },
            { label: "Desarrollo de software", href: "/servicios/desarrollo-software" }
        ]
    },
    {
        number: "02",
        title: "Necesito digitalizar",
        stage: "Procesos y organización",
        text: "Analizamos cómo trabajas actualmente e identificamos qué tareas, registros o flujos pueden organizarse mediante tecnología.",
        icon: "lucide:workflow",
        action: "Explorar la digitalización",
        to: "/soluciones/automatizacion-procesos",
        related: [
            { label: "Automatización de procesos", href: "/soluciones/automatizacion-procesos" },
            { label: "Sistemas de gestión", href: "/soluciones/sistemas-gestion" },
            { label: "Consultoría tecnológica", href: "/servicios/consultoria-tecnologica" }
        ]
    },
    {
        number: "03",
        title: "Quiero lanzar un producto",
        stage: "Producto digital",
        text: "Definimos la experiencia, las funciones esenciales y la base técnica necesaria para construir una primera versión preparada para evolucionar.",
        icon: "lucide:rocket",
        action: "Diseñar mi producto",
        to: "/soluciones/plataformas-digitales",
        related: [
            { label: "Plataformas digitales", href: "/soluciones/plataformas-digitales" },
            { label: "Aplicaciones móviles", href: "/servicios/aplicaciones-moviles" },
            { label: "Diseño UI/UX", href: "/servicios/diseno-ux-ui" }
        ]
    },
    {
        number: "04",
        title: "Mi sistema debe mejorar",
        stage: "Evolución tecnológica",
        text: "Revisamos sus problemas actuales, priorizamos los cambios y planteamos una modernización gradual sin reemplazar todo innecesariamente.",
        icon: "lucide:refresh-cw",
        action: "Modernizar mi sistema",
        to: "/soluciones/modernizacion-software",
        related: [
            { label: "Modernización de software", href: "/soluciones/modernizacion-software" },
            { label: "Mantenimiento y soporte", href: "/servicios/mantenimiento-soporte" },
            { label: "Cloud y DevOps", href: "/servicios/cloud-devops" }
        ]
    },
    {
        number: "05",
        title: "Busco orientación",
        stage: "Definición del camino",
        text: "Evaluamos tu contexto y te ayudamos a elegir una solución, alcance y ruta tecnológica antes de comenzar a desarrollar.",
        icon: "lucide:compass",
        action: "Solicitar orientación",
        to: "/servicios/consultoria-tecnologica",
        related: [
            { label: "Consultoría tecnológica", href: "/servicios/consultoria-tecnologica" },
            { label: "Soluciones", href: "/soluciones" },
            { label: "Contacto", href: "/contacto" }
        ]
    }
];