export const faqs = [
    {
        id: 1,
        category: "general",
        question: "¿Qué tipo de proyectos desarrolla Biznovatech?",
        answer: "Trabajamos con personas, emprendedores y organizaciones que necesitan soluciones digitales: desde sitios web corporativos y aplicaciones móviles hasta sistemas de gestión, plataformas y automatizaciones. Cada proyecto parte de un análisis de la situación real del cliente."
    },
    {
        id: 2,
        category: "general",
        question: "¿Trabajan solo con empresas grandes?",
        answer: "No. Acompañamos a personas con una idea, emprendedores, startups, pequeñas empresas, medianas organizaciones e instituciones. Lo que importa no es el tamaño, sino la claridad del problema que queremos resolver juntos."
    },
    {
        id: 3,
        category: "process",
        question: "¿Cómo es el proceso de trabajo con Biznovatech?",
        answer: "Comenzamos con un diagnóstico para entender tu contexto y necesidades. Luego definimos la estrategia, diseñamos la solución, la desarrollamos con validaciones continuas y finalmente la implementamos. Después del lanzamiento, ofrecemos soporte y acompañamiento para evolucionar el producto."
    },
    {
        id: 4,
        category: "process",
        question: "¿Cuánto tiempo toma desarrollar un proyecto?",
        answer: "Depende del alcance. Un sitio web corporativo puede estar listo en pocas semanas. Una plataforma con múltiples funcionalidades puede tomar varios meses. Durante el diagnóstico definimos un cronograma realista basado en las prioridades del proyecto."
    },
    {
        id: 5,
        category: "cost",
        question: "¿Cuánto cuesta un proyecto de software a medida?",
        answer: "No existe un precio estándar. El costo depende del alcance, las funcionalidades, las integraciones, el diseño, la infraestructura y el tiempo. Ofrecemos una evaluación inicial gratuita para entender tu situación y proponer un enfoque realista."
    },
    {
        id: 6,
        category: "cost",
        question: "¿Se puede empezar con un presupuesto limitado?",
        answer: "Sí. Un enfoque por fases permite construir primero lo esencial y evolucionar el producto con el tiempo. Lo importante es que la primera versión sea funcional, útil y bien construida."
    },
    {
        id: 7,
        category: "tech",
        question: "¿Qué tecnologías utilizan?",
        answer: "Trabajamos principalmente con React, Node.js, Flutter, PostgreSQL, Tailwind CSS, Docker y Figma, entre otras. La elección de tecnología depende de cada proyecto. Puedes explorar nuestro Atlas tecnológico completo en la sección de Recursos."
    },
    {
        id: 8,
        category: "tech",
        question: "¿Pueden trabajar con tecnologías que ya uso?",
        answer: "Sí. Si ya tienes un sistema o infraestructura, evaluamos cómo integrarnos o extender lo que ya funciona. No obligamos a migrar a nuestra stack si no es necesario."
    },
    {
        id: 9,
        category: "support",
        question: "¿Ofrecen soporte después de la entrega?",
        answer: "Sí. Ofrecemos mantenimiento, corrección de errores, actualizaciones y nuevas funcionalidades como servicio continuo. Un producto digital necesita acompañamiento después de su lanzamiento."
    },
    {
        id: 10,
        category: "support",
        question: "¿Pueden mejorar un sistema que ya tengo?",
        answer: "Sí. Evaluamos sistemas existentes, identificamos áreas de mejora y proponemos un plan de modernización que puede ser gradual. No siempre es necesario reconstruir desde cero."
    },
    {
        id: 11,
        category: "location",
        question: "¿Trabajan de forma remota?",
        answer: "Sí. Nuestra atención principal es remota, lo que nos permite trabajar con clientes de diferentes ubicaciones. También ofrecemos coordinación presencial con cita previa en Lima, Perú."
    },
    {
        id: 12,
        category: "general",
        question: "¿Cómo empiezo?",
        answer: "Cuéntanos tu idea, necesidad o desafío a través de nuestra página de contacto. Agendamos una conversación inicial sin compromiso para entender tu situación y evaluar cómo podemos ayudarte."
    }
];

export const faqCategories = [
    { id: "general", name: "Generales" },
    { id: "process", name: "Proceso" },
    { id: "cost", name: "Costos" },
    { id: "tech", name: "Tecnología" },
    { id: "support", name: "Soporte" },
    { id: "location", name: "Ubicación" }
];

export function getFaqsByCategory(categoryId) {
    return faqs.filter(f => f.category === categoryId);
}
