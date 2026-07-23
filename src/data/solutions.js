export const solutions = [
    {
        id: 1,
        slug: "automatizacion-procesos",
        title: "Automatización de procesos",
        situation: "Tengo tareas repetitivas que consumen tiempo y generan errores",
        icon: "solar:settings-minimalistic-linear",
        description: "Cuando un equipo dedica horas a copiar información entre sistemas, enviar los mismos correos, validar datos manualmente o generar reportes a mano, hay una oportunidad clara de automatización. No se trata de reemplazar personas, sino de liberar su tiempo para tareas que realmente requieren criterio humano.",
        signals: [
            "Copias información entre sistemas manualmente",
            "Envías los mismos correos o notificaciones de forma repetitiva",
            "Validas datos de forma manual que podrían verificarse automáticamente",
            "Generas reportes que requieren recopilar datos de múltiples fuentes",
            "Realizas tareas que siguen siempre el mismo patrón"
        ],
        approach: "Analizamos los procesos actuales, identificamos las tareas automatizables y diseñamos flujos que conectan herramientas, reducen pasos manuales y minimizan errores. La implementación es gradual, priorizando las tareas de mayor impacto.",
        benefits: [
            "Reducción de tiempo en tareas repetitivas",
            "Menor margen de error humano",
            "Información sincronizada entre sistemas",
            "Equipo enfocado en tareas de mayor valor",
            "Procesos documentados y reproducibles"
        ],
        relatedServices: ["desarrollo-software", "inteligencia-artificial", "consultoria-tecnologica"],
        cta: { text: "Identifiquemos qué puedes automatizar", to: "/contacto" }
    },
    {
        id: 2,
        slug: "sistemas-gestion",
        title: "Sistemas de gestión",
        situation: "Mi información está dispersa y necesito controlar mejor mi operación",
        icon: "solar:clipboard-list-linear",
        description: "Cuando la información de un negocio vive en hojas de cálculo, correos, cuadernos y archivos dispersos, la gestión se vuelve frágil. Un sistema de gestión a medida centraliza datos, organiza operaciones y permite que cada persona acceda exactamente a lo que necesita.",
        signals: [
            "Tu información principal está en hojas de cálculo",
            "Diferentes personas manejan versiones distintas de los mismos datos",
            "No tienes visibilidad clara del estado de tus operaciones",
            "Generar un reporte te toma horas de recopilación",
            "Tus procesos dependen de la memoria de personas específicas"
        ],
        approach: "Definimos qué información necesitas gestionar, diseñamos una estructura de datos coherente y construimos un sistema que permite registrar, consultar, filtrar y reportar de forma organizada. Cada módulo se desarrolla según las prioridades reales del proyecto.",
        benefits: [
            "Información centralizada y accesible",
            "Control de usuarios y permisos",
            "Seguimiento de operaciones en tiempo real",
            "Reportes y dashboards útiles",
            "Procesos organizados y escalables"
        ],
        relatedServices: ["desarrollo-software", "desarrollo-web", "consultoria-tecnologica"],
        cta: { text: "Organicemos tu información", to: "/contacto" }
    },
    {
        id: 3,
        slug: "plataformas-digitales",
        title: "Plataformas digitales",
        situation: "Quiero ofrecer un servicio digital o crear un espacio para mis usuarios",
        icon: "solar:monitor-smartphone-linear",
        description: "Cuando necesitas un espacio donde tus usuarios puedan registrarse, interactuar, gestionar información o acceder a servicios, necesitas una plataforma digital. No es un sitio web estático: es un producto con lógica, usuarios, roles y funcionalidades que evolucionan.",
        signals: [
            "Quieres ofrecer un servicio a través de internet",
            "Necesitas que tus usuarios tengan cuentas y perfiles",
            "Tu idea requiere interacción entre diferentes tipos de usuarios",
            "Quieres crear un área privada con contenido o herramientas",
            "Necesitas un producto digital que pueda crecer por módulos"
        ],
        approach: "Partimos del problema o servicio que deseas ofrecer. Definimos los tipos de usuario, los flujos principales y la arquitectura de la plataforma. Diseñamos y desarrollamos un producto que puede lanzarse con las funcionalidades esenciales y crecer de forma ordenada.",
        benefits: [
            "Servicio digital accesible desde cualquier lugar",
            "Gestión de usuarios y roles",
            "Experiencia personalizada por tipo de usuario",
            "Capacidad de crecer por módulos",
            "Base técnica sólida para escalar"
        ],
        relatedServices: ["desarrollo-software", "desarrollo-web", "diseno-ux-ui", "aplicaciones-moviles"],
        cta: { text: "Construyamos tu plataforma", to: "/contacto" }
    },
    {
        id: 4,
        slug: "integracion-sistemas",
        title: "Integración de sistemas",
        situation: "Mis herramientas no se comunican entre sí y duplico información",
        icon: "solar:link-round-linear",
        description: "Cuando usas un CRM, un sistema de facturación, una plataforma de envíos y un correo electrónico, pero ninguno se comunica con el otro, terminas ingresando la misma información varias veces. La integración de sistemas conecta herramientas para que la información fluya de forma automática y confiable.",
        signals: [
            "Ingresas los mismos datos en más de un sistema",
            "Tus herramientas no comparten información automáticamente",
            "Pasas tiempo exportando e importando archivos entre plataformas",
            "Tienes datos inconsistentes entre sistemas",
            "Necesitas conectar un sistema nuevo con uno que ya usas"
        ],
        approach: "Identificamos los sistemas involucrados, analizamos sus capacidades de conexión (APIs, webhooks, bases de datos) y diseñamos un flujo de integración que elimine la duplicidad y asegure que la información esté sincronizada.",
        benefits: [
            "Información sincronizada entre herramientas",
            "Eliminación de duplicidad de datos",
            "Flujos automatizados entre sistemas",
            "Menor riesgo de errores por entrada manual",
            "Mayor visibilidad del estado real de operaciones"
        ],
        relatedServices: ["desarrollo-software", "cloud-devops", "consultoria-tecnologica"],
        cta: { text: "Conectemos tus herramientas", to: "/contacto" }
    },
    {
        id: 5,
        slug: "comercio-electronico",
        title: "Comercio electrónico",
        situation: "Quiero vender o atender a mis clientes a través de internet",
        icon: "solar:cart-large-2-linear",
        description: "Vender por internet no es solo tener un catálogo en línea. Requiere una experiencia de compra clara, gestión de productos, un flujo de pedidos organizado y la posibilidad de integrar medios de pago cuando el proyecto lo requiera. Construimos tiendas y experiencias de comercio digital adaptadas a cada contexto.",
        signals: [
            "Quieres vender productos o servicios en línea",
            "Necesitas un catálogo digital organizado",
            "Recibes pedidos por WhatsApp o correo y quieres profesionalizar el proceso",
            "Necesitas gestionar inventario, pedidos y clientes",
            "Quieres una experiencia de compra adaptada a dispositivos móviles"
        ],
        approach: "Definimos el catálogo, los flujos de compra y la gestión de pedidos. Diseñamos una experiencia responsive y desarrollamos la plataforma con la capacidad de integrar medios de pago según el proveedor elegido. El panel administrativo permite gestionar productos, pedidos y clientes.",
        benefits: [
            "Presencia comercial digital profesional",
            "Catálogo organizado y actualizable",
            "Gestión de pedidos centralizada",
            "Experiencia responsive para el comprador",
            "Base para integrar pagos y logística"
        ],
        relatedServices: ["desarrollo-web", "diseno-ux-ui", "desarrollo-software"],
        cta: { text: "Llevemos tu negocio al digital", to: "/contacto" }
    },
    {
        id: 6,
        slug: "modernizacion-software",
        title: "Modernización de software",
        situation: "Mi sistema ya no responde a mis necesidades o está desactualizado",
        icon: "solar:refresh-circle-linear",
        description: "Con el tiempo, los sistemas envejecen. Las interfaces se vuelven difíciles de usar, las tecnologías dejan de recibir soporte, los procesos cambian y el software ya no acompaña. Modernizar no siempre significa rehacer todo desde cero. A veces es reestructurar, migrar gradualmente o rediseñar la experiencia.",
        signals: [
            "Tu sistema actual es lento o difícil de usar",
            "La tecnología que usa ya no recibe soporte o actualizaciones",
            "Has acumulado parches y soluciones temporales",
            "Los usuarios evitan usar el sistema porque es confuso",
            "Necesitas nuevas funcionalidades pero la base actual no lo permite"
        ],
        approach: "Realizamos una evaluación técnica del sistema actual. Identificamos la deuda técnica, las dependencias obsoletas y las oportunidades de mejora. Proponemos un plan de modernización que puede ser gradual: rediseño de interfaz, migración de tecnología, reestructuración de código o reconstrucción parcial.",
        benefits: [
            "Sistema actualizado y mantenible",
            "Mejor experiencia para los usuarios",
            "Base técnica preparada para nuevas funcionalidades",
            "Reducción de errores y deuda técnica",
            "Continuidad sin interrumpir la operación"
        ],
        relatedServices: ["consultoria-tecnologica", "desarrollo-software", "diseno-ux-ui", "mantenimiento-soporte"],
        cta: { text: "Evaluemos tu sistema actual", to: "/contacto" }
    }
];

export function getSolutionBySlug(slug) {
    return solutions.find(s => s.slug === slug) || null;
}
