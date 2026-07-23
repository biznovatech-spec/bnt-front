export const serviceCategories = [
    { id: "strategy", name: "Estrategia", description: "Comprender antes de construir" },
    { id: "products", name: "Productos digitales", description: "Diseñar, desarrollar y entregar" },
    { id: "experience", name: "Experiencia e inteligencia", description: "Optimizar y potenciar" },
    { id: "operations", name: "Operación y continuidad", description: "Mantener y evolucionar" }
];

export const services = [
    {
        id: 1,
        slug: "consultoria-tecnologica",
        category: "strategy",
        name: "Consultoría tecnológica",
        icon: "hugeicons:nano-technology",
        priority: 3,
        shortDescription: "Te ayudamos a comprender qué solución necesitas antes de invertir tiempo y recursos en desarrollarla.",
        description: "Muchos proyectos tecnológicos comienzan sin un diagnóstico claro. Se invierte en herramientas, se contratan desarrolladores o se lanzan productos sin haber definido bien el problema que se quiere resolver. La consultoría tecnológica de Biznovatech existe para evitar exactamente eso.",
        proposition: "Antes de construir, te ayudamos a ordenar el problema, reconocer oportunidades y definir un camino realista.",
        problems: [
            "No sé qué tipo de solución necesito",
            "Tengo una idea pero no sé por dónde empezar",
            "Quiero digitalizar un proceso pero no sé qué tecnología usar",
            "Necesito evaluar si mi sistema actual puede mejorarse",
            "Debo priorizar funcionalidades con presupuesto limitado"
        ],
        capabilities: [
            "Diagnóstico de necesidades tecnológicas",
            "Levantamiento y análisis de requerimientos",
            "Evaluación de procesos actuales",
            "Definición de alcance y priorización",
            "Recomendación de herramientas y arquitectura",
            "Hoja de ruta técnica",
            "Análisis de viabilidad",
            "Acompañamiento en decisiones tecnológicas"
        ],
        deliverables: [
            "Documento de diagnóstico",
            "Mapa de requerimientos priorizados",
            "Propuesta de arquitectura inicial",
            "Hoja de ruta con fases y estimaciones",
            "Recomendaciones técnicas documentadas"
        ],
        technologies: ["notion", "figma"],
        relatedProject: null,
        cta: { text: "Analicemos tu desafío", to: "/contacto" },
        narrative: "diagnostic"
    },
    {
        id: 2,
        slug: "desarrollo-software",
        category: "products",
        name: "Desarrollo de software",
        icon: "ph:code-duotone",
        priority: 1,
        shortDescription: "Creamos sistemas y plataformas adaptados a las necesidades reales de cada proyecto.",
        description: "Cada organización, emprendimiento o proyecto tiene una forma particular de operar. Cuando las herramientas genéricas no alcanzan, el software a medida se convierte en la solución más eficiente. En Biznovatech diseñamos y desarrollamos sistemas que se adaptan a tu lógica de trabajo, no al revés.",
        proposition: "Creamos software alrededor de la manera en que tu proyecto o empresa necesita funcionar.",
        problems: [
            "Uso hojas de cálculo para gestionar información crítica",
            "Mi proceso depende de herramientas que no se comunican entre sí",
            "Necesito un sistema que se adapte a mi forma de trabajar",
            "Quiero automatizar tareas repetitivas",
            "Mi software actual ya no responde a las necesidades del negocio"
        ],
        capabilities: [
            "Software a medida",
            "Sistemas administrativos y de gestión",
            "Plataformas y portales",
            "Dashboards e informes",
            "Automatización de procesos",
            "Integraciones con terceros",
            "Arquitectura escalable",
            "Seguridad y control de acceso",
            "Evolución y mantenimiento posterior"
        ],
        deliverables: [
            "Sistema funcional desplegado",
            "Documentación técnica",
            "Manual de uso básico",
            "Código fuente organizado",
            "Plan de mantenimiento inicial"
        ],
        technologies: ["react", "nodejs", "express", "nestjs", "postgresql", "mysql", "docker", "jwt"],
        relatedProject: "tiktuy",
        cta: { text: "Conversemos sobre tu sistema", to: "/contacto" },
        narrative: "build"
    },
    {
        id: 3,
        slug: "desarrollo-web",
        category: "products",
        name: "Desarrollo web",
        icon: "solar:monitor-linear",
        priority: 4,
        shortDescription: "Construimos experiencias web que presentan, comunican o permiten operar un servicio.",
        description: "Una presencia web bien construida no es solo una página bonita. Es una herramienta que comunica quién eres, qué ofreces y cómo pueden contactarte. Desde sitios corporativos hasta plataformas con funcionalidades complejas, desarrollamos experiencias web pensadas para cumplir un objetivo concreto.",
        proposition: "Construimos sitios y plataformas web que funcionan como herramientas reales para tu proyecto.",
        problems: [
            "No tengo presencia digital profesional",
            "Mi sitio web no refleja lo que realmente hago",
            "Necesito una plataforma web con funcionalidades específicas",
            "Mi página no se ve bien en dispositivos móviles",
            "Quiero vender o atender a través de internet"
        ],
        capabilities: [
            "Sitios corporativos",
            "Landing pages",
            "Portales web",
            "Plataformas con autenticación",
            "Comercio electrónico",
            "Paneles administrativos",
            "Integraciones con APIs",
            "Optimización responsive",
            "Rendimiento y accesibilidad"
        ],
        deliverables: [
            "Sitio o plataforma web funcional",
            "Diseño responsive completo",
            "Panel administrativo cuando corresponda",
            "Despliegue en producción",
            "Documentación básica"
        ],
        technologies: ["react", "nextjs", "astro", "tailwind", "vite", "html5", "css3", "javascript"],
        relatedProject: "hycon",
        cta: { text: "Construyamos tu presencia digital", to: "/contacto" },
        narrative: "build"
    },
    {
        id: 4,
        slug: "aplicaciones-moviles",
        category: "products",
        name: "Aplicaciones móviles",
        icon: "solar:smartphone-linear",
        priority: 2,
        shortDescription: "Diseñamos y desarrollamos aplicaciones útiles para dispositivos móviles.",
        description: "Hay ideas y servicios que necesitan vivir en el bolsillo de las personas. Cuando la experiencia requiere cercanía, inmediatez o acceso constante, una aplicación móvil bien diseñada marca la diferencia. Trabajamos con Flutter para construir aplicaciones multiplataforma que funcionan tanto en Android como en iOS.",
        proposition: "Convertimos tu idea en una aplicación móvil funcional, bien diseñada y preparada para crecer.",
        problems: [
            "Tengo una idea para una app pero no sé cómo desarrollarla",
            "Necesito una aplicación que funcione en Android e iOS",
            "Quiero digitalizar un servicio que actualmente es presencial",
            "Mi aplicación actual necesita un rediseño",
            "Necesito integrar mi app con un sistema existente"
        ],
        capabilities: [
            "Aplicaciones multiplataforma con Flutter",
            "Diseño de experiencia móvil",
            "Prototipado y validación",
            "Integración con APIs y servicios",
            "Autenticación y gestión de usuarios",
            "Notificaciones cuando el proyecto lo requiera",
            "Publicación como etapa posterior",
            "Mantenimiento y evolución"
        ],
        deliverables: [
            "Aplicación funcional multiplataforma",
            "Código fuente organizado",
            "Documentación técnica",
            "APK o build de prueba",
            "Guía para publicación en tiendas"
        ],
        technologies: ["flutter", "dart", "firebase", "nodejs", "figma"],
        relatedProject: null,
        cta: { text: "Lleva tu idea a una aplicación", to: "/contacto" },
        narrative: "build"
    },
    {
        id: 5,
        slug: "inteligencia-artificial",
        category: "experience",
        name: "Inteligencia artificial y automatización",
        icon: "fluent:brain-sparkle-32-regular",
        priority: 5,
        shortDescription: "Identificamos tareas y procesos que pueden simplificarse mediante automatización y soluciones inteligentes.",
        description: "No todos los problemas requieren inteligencia artificial, pero muchos procesos repetitivos, consultas frecuentes y tareas de clasificación pueden beneficiarse enormemente de la automatización inteligente. Te ayudamos a identificar dónde tiene sentido aplicar estas herramientas y cómo integrarlas en tu flujo de trabajo.",
        proposition: "Te ayudamos a descubrir qué procesos puedes automatizar y cómo integrar soluciones inteligentes de forma práctica.",
        problems: [
            "Paso demasiado tiempo en tareas repetitivas",
            "Recibo las mismas consultas constantemente",
            "Necesito clasificar o procesar información de forma más rápida",
            "Quiero explorar cómo la IA puede ayudar a mi negocio",
            "Tengo datos que no estoy aprovechando"
        ],
        capabilities: [
            "Automatización de tareas repetitivas",
            "Integración de servicios de IA",
            "Asistentes conversacionales",
            "Clasificación y procesamiento de información",
            "Automatización de respuestas",
            "Flujos internos automatizados",
            "Integraciones mediante APIs de IA"
        ],
        deliverables: [
            "Diagnóstico de procesos automatizables",
            "Solución de automatización implementada",
            "Integración con herramientas existentes",
            "Documentación de flujos",
            "Guía de uso y mantenimiento"
        ],
        technologies: ["python", "fastapi", "nodejs"],
        relatedProject: null,
        cta: { text: "Exploremos qué puedes automatizar", to: "/contacto" },
        narrative: "opportunity"
    },
    {
        id: 6,
        slug: "diseno-ux-ui",
        category: "experience",
        name: "Diseño UI/UX",
        icon: "streamline-freehand:responsive-design-expand",
        priority: 6,
        shortDescription: "Convertimos necesidades, contenidos y funcionalidades en experiencias claras y comprensibles.",
        description: "Un producto digital puede tener toda la funcionalidad del mundo, pero si la experiencia no es clara, las personas no lo usan. El diseño UI/UX no es decoración: es la disciplina que conecta lo que el usuario necesita con lo que el producto ofrece, de forma intuitiva y coherente.",
        proposition: "Diseñamos experiencias que las personas entienden y quieren usar, conectando funcionalidad con claridad visual.",
        problems: [
            "Mi producto funciona pero los usuarios no lo entienden",
            "Necesito diseñar una interfaz antes de desarrollar",
            "Quiero mejorar la experiencia de mi aplicación actual",
            "No tengo un sistema de diseño coherente",
            "Necesito prototipos para validar una idea"
        ],
        capabilities: [
            "Investigación de usuarios",
            "Arquitectura de información",
            "Flujos de usuario",
            "Wireframes y prototipos",
            "Diseño de interfaces",
            "Sistemas de diseño",
            "Diseño responsive",
            "Pruebas de usabilidad",
            "Entrega organizada para desarrollo"
        ],
        deliverables: [
            "Mapa de flujos y arquitectura",
            "Wireframes validados",
            "Prototipos interactivos en Figma",
            "Sistema de diseño documentado",
            "Guía de componentes para desarrollo"
        ],
        technologies: ["figma", "blender"],
        relatedProject: "tiktuy-design",
        cta: { text: "Diseñemos una experiencia más clara", to: "/contacto" },
        narrative: "opportunity"
    },
    {
        id: 7,
        slug: "cloud-devops",
        category: "operations",
        name: "Cloud y DevOps",
        icon: "tabler:cloud-code",
        priority: 7,
        shortDescription: "Preparamos entornos de despliegue y operación que facilitan la continuidad técnica del producto.",
        description: "Desarrollar un producto es solo una parte del camino. Desplegarlo, mantenerlo disponible y actualizable es igual de importante. Configuramos entornos de despliegue organizados, reproducibles y preparados para escalar cuando tu proyecto lo necesite.",
        proposition: "Preparamos la infraestructura para que tu producto esté disponible, actualizable y listo para crecer.",
        problems: [
            "No sé cómo desplegar mi aplicación",
            "Mi entorno de desarrollo y producción no están organizados",
            "Necesito automatizar despliegues",
            "Quiero que mi aplicación esté disponible de forma confiable",
            "Mis actualizaciones generan interrupciones"
        ],
        capabilities: [
            "Configuración de entornos de despliegue",
            "Docker y contenedores",
            "Vercel, Railway y AWS",
            "Variables de entorno y configuración",
            "Automatización de despliegues",
            "Monitoreo básico",
            "Organización de ambientes (dev, staging, producción)",
            "Buenas prácticas de continuidad"
        ],
        deliverables: [
            "Entorno de despliegue configurado",
            "Pipeline de despliegue automatizado",
            "Documentación de infraestructura",
            "Variables y configuración organizadas",
            "Guía de operación básica"
        ],
        technologies: ["docker", "vercel", "railway", "aws", "git", "github"],
        relatedProject: null,
        cta: { text: "Preparemos una base estable", to: "/contacto" },
        narrative: "continuity"
    },
    {
        id: 8,
        slug: "mantenimiento-soporte",
        category: "operations",
        name: "Mantenimiento y soporte",
        icon: "solar:shield-check-linear",
        priority: 8,
        shortDescription: "Acompañamos tu producto después de su lanzamiento o ayudamos a mejorar uno existente.",
        description: "Un producto digital no termina cuando se publica. Las necesidades evolucionan, surgen errores, los usuarios piden mejoras y la tecnología avanza. El mantenimiento y soporte asegura que tu producto continúe funcionando, mejorando y adaptándose.",
        proposition: "Damos continuidad a tu producto para que siga funcionando, mejorando y respondiendo a nuevas necesidades.",
        problems: [
            "Mi aplicación tiene errores que necesito corregir",
            "Necesito añadir funcionalidades nuevas a un sistema existente",
            "Mi software necesita actualizarse técnicamente",
            "No tengo quién le dé soporte a mi producto actual",
            "Quiero mejorar el rendimiento de mi aplicación"
        ],
        capabilities: [
            "Corrección de errores",
            "Ajustes y mejoras",
            "Nuevas funcionalidades",
            "Actualización técnica",
            "Revisión de rendimiento",
            "Soporte técnico",
            "Evolución gradual",
            "Documentación",
            "Continuidad del producto"
        ],
        deliverables: [
            "Informe de estado del producto",
            "Correcciones implementadas",
            "Nuevas funcionalidades desplegadas",
            "Documentación actualizada",
            "Plan de evolución"
        ],
        technologies: ["react", "nodejs", "docker", "git", "github"],
        relatedProject: null,
        cta: { text: "Demos continuidad a tu producto", to: "/contacto" },
        narrative: "continuity"
    }
];

export function getServiceBySlug(slug) {
    return services.find(s => s.slug === slug) || null;
}

export function getServicesByCategory(categoryId) {
    return services.filter(s => s.category === categoryId).sort((a, b) => a.priority - b.priority);
}

export function getPriorityServices(count = 3) {
    return [...services].sort((a, b) => a.priority - b.priority).slice(0, count);
}
