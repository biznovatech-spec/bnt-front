export const articles = [
    {
        id: 1,
        slug: "cuanto-cuesta-desarrollar-software",
        title: "¿Cuánto cuesta desarrollar software a medida?",
        category: "Decisiones",
        icon: "solar:calculator-linear",
        readTime: "8 min",
        date: "2025",
        excerpt: "No existe un precio único. El costo de un software a medida depende de muchos factores que vale la pena comprender antes de solicitar una cotización.",
        content: [
            {
                type: "intro",
                text: "Una de las primeras preguntas que surge cuando alguien considera desarrollar un sistema propio es: ¿cuánto va a costar? Es una pregunta legítima, pero la respuesta honesta es que no existe un número fijo. El costo de un software a medida depende de lo que necesitas, no de una lista de precios estándar."
            },
            {
                type: "section",
                title: "¿Por qué no hay un precio fijo?",
                text: "Cada proyecto de software es diferente. Dos empresas del mismo rubro pueden necesitar sistemas completamente distintos porque sus procesos, usuarios y objetivos son diferentes. Un sistema de gestión para una clínica pequeña no tiene el mismo alcance que uno para una cadena de tiendas, aunque ambos sean 'sistemas de gestión'."
            },
            {
                type: "section",
                title: "Factores que influyen en el costo",
                items: [
                    "Alcance funcional: ¿Cuántas funcionalidades necesitas en la primera versión?",
                    "Cantidad de usuarios y roles: ¿Quiénes usarán el sistema y qué permisos tendrán?",
                    "Integraciones: ¿Necesitas conectar con otros sistemas, APIs o servicios?",
                    "Diseño: ¿Requieres un diseño personalizado o una interfaz funcional básica?",
                    "Seguridad: ¿Qué nivel de protección de datos necesitas?",
                    "Infraestructura: ¿Dónde se alojará el sistema y quién lo administrará?",
                    "Tiempo: ¿Hay una fecha límite o el proyecto puede avanzar por fases?",
                    "Mantenimiento: ¿Necesitas soporte continuo después del lanzamiento?"
                ]
            },
            {
                type: "section",
                title: "Errores comunes al presupuestar",
                items: [
                    "Comparar precios sin comparar alcances",
                    "Elegir al proveedor más barato sin evaluar calidad ni proceso",
                    "No considerar el costo de mantenimiento posterior",
                    "Querer todas las funcionalidades desde el primer día",
                    "No definir prioridades antes de solicitar cotización"
                ]
            },
            {
                type: "section",
                title: "Cómo prepararte para una buena cotización",
                text: "Antes de pedir un precio, dedica tiempo a definir qué problema quieres resolver. No necesitas un documento técnico perfecto: una descripción clara de tu situación, tus usuarios y tus objetivos permite que el equipo de desarrollo entienda el contexto y proponga una solución realista."
            },
            {
                type: "section",
                title: "¿Se puede empezar con un presupuesto limitado?",
                text: "Sí. Un enfoque por fases permite construir primero lo esencial y evolucionar el producto con el tiempo. No todo necesita estar listo el primer día. Lo importante es que la primera versión sea funcional, útil y bien construida."
            },
            {
                type: "cta",
                text: "Si tienes una idea o necesidad y quieres entender qué implicaría construirla, conversemos. Podemos ayudarte a definir el alcance antes de hablar de presupuesto.",
                button: { text: "Conversemos sobre tu proyecto", to: "/contacto" }
            }
        ],
        relatedServices: ["consultoria-tecnologica", "desarrollo-software"]
    },
    {
        id: 2,
        slug: "web-corporativa-o-plataforma",
        title: "¿Necesitas una web corporativa o una plataforma?",
        category: "Decisiones",
        icon: "solar:monitor-linear",
        readTime: "6 min",
        date: "2025",
        excerpt: "No es lo mismo tener un sitio web que presentar tu empresa que construir una plataforma con usuarios, roles y funcionalidades. Entender la diferencia te ahorra tiempo y dinero.",
        content: [
            {
                type: "intro",
                text: "Muchas personas buscan 'hacer una página web' cuando en realidad necesitan algo más complejo. Y al revés: algunas invierten en plataformas complejas cuando un sitio bien diseñado habría sido suficiente. La diferencia entre una web corporativa y una plataforma digital no siempre es obvia, pero entenderla puede cambiar completamente el rumbo de tu proyecto."
            },
            {
                type: "section",
                title: "¿Qué es una web corporativa?",
                text: "Es un sitio web diseñado para presentar una empresa, sus servicios, su equipo y sus canales de contacto. Su objetivo principal es comunicar quién eres y generar confianza. No requiere que los visitantes creen cuentas ni interactúen con una base de datos compleja."
            },
            {
                type: "section",
                title: "¿Qué es una plataforma digital?",
                text: "Es un producto web con lógica de negocio. Tiene usuarios, roles, bases de datos, flujos y funcionalidades que permiten operar un servicio. Ejemplos: un sistema de gestión interna, un marketplace, una plataforma de cursos o un portal de atención al cliente."
            },
            {
                type: "section",
                title: "¿Cómo saber cuál necesitas?",
                items: [
                    "Si tu objetivo es presentar servicios y generar contacto → web corporativa",
                    "Si necesitas que los usuarios se registren y operen → plataforma",
                    "Si quieres vender productos en línea → puede ser ambas cosas, depende del volumen",
                    "Si gestionas información que requiere acceso controlado → plataforma",
                    "Si quieres una presencia profesional y clara → web corporativa"
                ]
            },
            {
                type: "section",
                title: "¿Se puede empezar con una web y evolucionar a plataforma?",
                text: "Sí, y es una estrategia válida. Muchos proyectos comienzan con una web corporativa para validar la propuesta y, cuando el negocio crece, incorporan funcionalidades de plataforma de forma gradual."
            },
            {
                type: "cta",
                text: "Si no estás seguro de qué necesitas, conversemos. Te ayudamos a definir el enfoque antes de invertir.",
                button: { text: "Definamos tu enfoque", to: "/contacto" }
            }
        ],
        relatedServices: ["desarrollo-web", "consultoria-tecnologica"]
    },
    {
        id: 3,
        slug: "como-digitalizar-un-proceso",
        title: "¿Cómo digitalizar un proceso sin perder el control?",
        category: "Procesos",
        icon: "solar:refresh-circle-linear",
        readTime: "7 min",
        date: "2025",
        excerpt: "Digitalizar un proceso no significa automatizar todo ni eliminar personas. Significa organizar mejor lo que ya funciona y hacerlo más eficiente.",
        content: [
            {
                type: "intro",
                text: "Digitalizar no es sinónimo de complejidad. A veces, el primer paso es tan simple como dejar de depender de un cuaderno o una hoja de cálculo para gestionar información crítica. Lo importante es hacerlo de forma ordenada, entendiendo qué se gana y qué se mantiene."
            },
            {
                type: "section",
                title: "¿Qué significa realmente digitalizar un proceso?",
                text: "Significa trasladar un flujo de trabajo que actualmente se realiza de forma manual, dispersa o analógica a un entorno digital estructurado. No se trata de eliminar la participación humana, sino de facilitar su trabajo con herramientas que organicen, registren y comuniquen mejor."
            },
            {
                type: "section",
                title: "Señales de que un proceso necesita digitalizarse",
                items: [
                    "La información depende de la memoria de una persona",
                    "Los datos se almacenan en múltiples lugares sin conexión",
                    "No hay forma fácil de consultar el historial de una operación",
                    "Los errores se repiten por falta de validación",
                    "El seguimiento requiere preguntar a varias personas"
                ]
            },
            {
                type: "section",
                title: "Errores comunes al digitalizar",
                items: [
                    "Querer digitalizar todo al mismo tiempo",
                    "Copiar el proceso manual tal cual en un sistema digital",
                    "No involucrar a las personas que usan el proceso",
                    "Elegir una herramienta antes de entender el problema",
                    "No planificar la transición"
                ]
            },
            {
                type: "section",
                title: "Un enfoque realista",
                text: "El mejor punto de partida es identificar el proceso que más dolor genera, analizarlo con el equipo que lo ejecuta y diseñar una primera versión digital que resuelva lo esencial. Después, se puede iterar y expandir."
            },
            {
                type: "cta",
                text: "Si tienes un proceso que sabes que podría funcionar mejor, exploremos juntos cómo transformarlo.",
                button: { text: "Exploremos tu proceso", to: "/contacto" }
            }
        ],
        relatedServices: ["consultoria-tecnologica", "desarrollo-software", "inteligencia-artificial"]
    },
    {
        id: 4,
        slug: "cuando-necesitas-software-a-medida",
        title: "¿Cuándo necesitas software a medida y cuándo basta con herramientas existentes?",
        category: "Decisiones",
        icon: "solar:code-square-linear",
        readTime: "7 min",
        date: "2025",
        excerpt: "No siempre necesitas un sistema propio. Pero cuando las herramientas genéricas no alcanzan, el software a medida se convierte en la solución más eficiente.",
        content: [
            {
                type: "intro",
                text: "Antes de invertir en desarrollo de software, vale la pena preguntarte si realmente lo necesitas. Muchas veces una combinación de herramientas existentes resuelve el problema. Pero cuando tu flujo de trabajo es específico, cuando necesitas algo que ninguna herramienta genérica ofrece, el software a medida deja de ser un lujo y se convierte en la decisión más inteligente."
            },
            {
                type: "section",
                title: "¿Cuándo bastan las herramientas existentes?",
                items: [
                    "Tu necesidad es estándar y las herramientas disponibles la cubren",
                    "Tu equipo es pequeño y los procesos son simples",
                    "No necesitas integraciones complejas",
                    "El costo de una herramienta existente es razonable para tu contexto",
                    "No necesitas personalizar la experiencia del usuario"
                ]
            },
            {
                type: "section",
                title: "¿Cuándo necesitas software a medida?",
                items: [
                    "Tu proceso de trabajo tiene reglas específicas que no encajan en herramientas genéricas",
                    "Necesitas conectar varios sistemas que no se comunican",
                    "La información que gestionas requiere una estructura propia",
                    "Quieres ofrecer una experiencia digital diferenciada",
                    "Has crecido y las hojas de cálculo ya no son suficientes",
                    "Necesitas control total sobre tus datos y su seguridad"
                ]
            },
            {
                type: "section",
                title: "El enfoque híbrido",
                text: "No todo tiene que ser a medida. Un enfoque inteligente combina herramientas existentes para lo estándar y software propio para lo específico. Por ejemplo, puedes usar una herramienta de facturación existente y construir un sistema a medida que gestione tus operaciones particulares, conectando ambos mediante una API."
            },
            {
                type: "section",
                title: "¿Cómo decidir?",
                text: "La clave es un buen diagnóstico. Antes de construir, analiza tus procesos, identifica dónde están las fricciones y evalúa si una herramienta existente las resuelve. Si la respuesta es no, entonces el software a medida es el camino."
            },
            {
                type: "cta",
                text: "Si no estás seguro de qué necesitas, podemos ayudarte a evaluarlo. Un buen diagnóstico vale más que una decisión apresurada.",
                button: { text: "Evaluemos tu situación", to: "/contacto" }
            }
        ],
        relatedServices: ["consultoria-tecnologica", "desarrollo-software", "mantenimiento-soporte"]
    }
];

export function getArticleBySlug(slug) {
    return articles.find(a => a.slug === slug) || null;
}
