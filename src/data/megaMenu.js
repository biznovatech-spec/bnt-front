export const megaMenus = {
    "Servicios": {
        title: "Soluciones tecnológicas para cada etapa de tu proyecto.",
        description: "Analizamos, diseñamos y desarrollamos soluciones digitales adaptadas a tus objetivos, desde la definición inicial hasta la evolución del producto.",
        viewAllLabel: "Ver todos los servicios",
        viewAllRoute: "/servicios",
        groups: [
            {
                title: "Servicios principales",
                type: "primary",
                colSpan: 4,
                items: [
                    { label: "Desarrollo de software", route: "/servicios/desarrollo-software", description: "Sistemas y plataformas construidos alrededor de las necesidades reales de tu proyecto.", icon: "lucide:code-2" },
                    { label: "Aplicaciones móviles", route: "/servicios/aplicaciones-moviles", description: "Aplicaciones útiles, escalables y diseñadas para dispositivos móviles.", icon: "lucide:smartphone" },
                    { label: "Consultoría tecnológica", route: "/servicios/consultoria-tecnologica", description: "Diagnóstico, estrategia y definición del camino tecnológico adecuado.", icon: "lucide:compass" }
                ]
            },
            {
                title: "Producto y experiencia",
                type: "secondary",
                colSpan: 3,
                items: [
                    { label: "Desarrollo web", route: "/servicios/desarrollo-web", icon: "lucide:monitor" },
                    { label: "Diseño UI/UX", route: "/servicios/diseno-ux-ui", icon: "lucide:pen-tool" },
                    { label: "Inteligencia artificial y automatización", route: "/servicios/inteligencia-artificial", icon: "lucide:sparkles" }
                ]
            },
            {
                title: "Operación y continuidad",
                type: "secondary",
                colSpan: 2,
                items: [
                    { label: "Cloud y DevOps", route: "/servicios/cloud-devops", icon: "lucide:cloud-cog" },
                    { label: "Mantenimiento y soporte", route: "/servicios/mantenimiento-soporte", icon: "lucide:wrench" }
                ],
                bottomCta: {
                    title: "¿No sabes qué necesitas?",
                    label: "Analicemos tu proyecto",
                    route: "/contacto"
                }
            }
        ]
    },
    "Soluciones": {
        title: "Encuentra una solución para lo que necesitas resolver.",
        description: "Explora alternativas para organizar procesos, construir productos digitales, conectar sistemas o modernizar una solución existente.",
        viewAllLabel: "Ver todas las soluciones",
        viewAllRoute: "/soluciones",
        groups: [
            {
                title: "Organizar y automatizar",
                type: "primary",
                colSpan: 4,
                items: [
                    { label: "Automatización de procesos", route: "/soluciones/automatizacion-procesos", description: "Optimiza tareas repetitivas y gana eficiencia operativa.", icon: "lucide:workflow" },
                    { label: "Sistemas de gestión", route: "/soluciones/sistemas-gestion", description: "Centraliza y organiza la información de toda tu empresa.", icon: "lucide:layout-dashboard" },
                    { label: "Integración de sistemas", route: "/soluciones/integracion-sistemas", description: "Conecta plataformas independientes para que operen como una sola.", icon: "lucide:plug" }
                ]
            },
            {
                title: "Construir y crecer",
                type: "primary",
                colSpan: 5,
                items: [
                    { label: "Plataformas digitales", route: "/soluciones/plataformas-digitales", description: "Crea nuevos modelos de negocio o servicios basados en la web.", icon: "lucide:layers" },
                    { label: "Comercio electrónico", route: "/soluciones/comercio-electronico", description: "Vende en línea con un sistema escalable y seguro.", icon: "lucide:shopping-bag" },
                    { label: "Modernización de software", route: "/soluciones/modernizacion-software", description: "Actualiza sistemas legados para prepararlos hacia el futuro.", icon: "lucide:refresh-cw" }
                ],
                bottomCta: {
                    title: "¿Todavía no sabes qué solución necesitas?",
                    label: "Cuéntanos tu situación",
                    route: "/contacto"
                }
            }
        ]
    },
    "Casos de éxito": {
        title: "Proyectos construidos desde la idea hasta la implementación.",
        description: "Conoce cómo Biznovatech ha participado en el análisis, diseño y desarrollo de soluciones digitales reales.",
        viewAllLabel: "Ver todos los casos de éxito",
        viewAllRoute: "/casos-de-exito",
        groups: [
            {
                title: "Destacados",
                type: "primary",
                colSpan: 5,
                items: [
                    { label: "HYCON", route: "/casos-de-exito/hycon", description: "Plataforma web corporativa y sistema de gestión comercial.", icon: "lucide:truck" },
                    { label: "TIKTUY", route: "/casos-de-exito/tiktuy", description: "Aplicación móvil para la gestión de fuerza de ventas.", icon: "lucide:users" },
                    { label: "Presusoft", route: "/casos-de-exito/presusoft", description: "Sistema SaaS para cotizaciones de construcción.", icon: "lucide:calculator" }
                ]
            },
            {
                title: "Diseño de producto",
                type: "secondary",
                colSpan: 4,
                items: [
                    { label: "Tiktuy Design", route: "/casos-de-exito/tiktuy-design", description: "Diseño de interfaz y experiencia de usuario.", icon: "lucide:pen-tool" }
                ],
                bottomCta: {
                    title: "¿Tienes un proyecto en mente?",
                    label: "Construyamos el siguiente caso",
                    route: "/contacto"
                }
            }
        ]
    },
    "Nosotros": {
        title: "Conoce quiénes somos y cómo construimos cada proyecto.",
        description: "Biznovatech integra análisis, diseño y desarrollo para acompañar cada solución de forma completa.",
        viewAllLabel: "Conoce Biznovatech",
        viewAllRoute: "/nosotros",
        groups: [
            {
                title: "Nuestra identidad",
                type: "secondary",
                colSpan: 4,
                items: [
                    { label: "Quiénes somos", route: "/nosotros#quienes-somos", icon: "lucide:building-2" },
                    { label: "Propósito", route: "/nosotros#proposito-valores", icon: "lucide:target" },
                    { label: "Misión y visión", route: "/nosotros#proposito-valores", icon: "lucide:badge-info" },
                    { label: "Valores", route: "/nosotros#proposito-valores", icon: "lucide:heart-handshake" }
                ]
            },
            {
                title: "Cómo trabajamos",
                type: "secondary",
                colSpan: 5,
                items: [
                    { label: "Equipo", route: "/nosotros#equipo", icon: "lucide:users" },
                    { label: "Metodología", route: "/nosotros#metodologia", icon: "lucide:workflow" },
                    { label: "Forma de colaborar", route: "/nosotros#metodologia", icon: "lucide:handshake" }
                ],
                bottomCta: {
                    title: "¿Quieres saber más?",
                    label: "Conoce nuestra forma de trabajar",
                    route: "/nosotros#metodologia"
                }
            }
        ]
    },
    "Recursos": {
        title: "Contenido para tomar mejores decisiones tecnológicas.",
        description: "Explora artículos, tecnologías y respuestas pensadas para ayudarte a comprender qué solución necesita tu proyecto.",
        viewAllLabel: "Explorar todos los recursos",
        viewAllRoute: "/recursos",
        groups: [
            {
                title: "Aprende y decide",
                type: "primary",
                colSpan: 5,
                items: [
                    { label: "Cuánto cuesta desarrollar software", route: "/recursos/cuanto-cuesta-desarrollar-software", description: "Guía para entender costos y variables involucradas.", icon: "lucide:calculator" },
                    { label: "Web corporativa o plataforma", route: "/recursos/web-corporativa-o-plataforma", description: "Diferencias y cuándo necesitas cada una.", icon: "lucide:monitor-smartphone" },
                    { label: "Cómo digitalizar un proceso", route: "/recursos/como-digitalizar-un-proceso", description: "Pasos claros para llevar lo manual a lo digital.", icon: "lucide:workflow" },
                    { label: "Cuándo necesitas software a medida", route: "/recursos/cuando-necesitas-software-a-medida", description: "Señales de que el software genérico ya no basta.", icon: "lucide:blocks" }
                ]
            },
            {
                title: "Explora nuestras capacidades",
                type: "secondary",
                colSpan: 4,
                items: [
                    { label: "Atlas tecnológico", route: "/recursos/tecnologias", description: "Tecnologías que dominamos y recomendamos.", icon: "lucide:library-big" },
                    { label: "Preguntas frecuentes", route: "/recursos#preguntas-frecuentes", description: "Dudas comunes antes de iniciar un proyecto.", icon: "lucide:circle-help" }
                ],
                bottomCta: {
                    title: "¿Tienes una pregunta específica?",
                    label: "Conversemos",
                    route: "/contacto"
                }
            }
        ]
    }
};
