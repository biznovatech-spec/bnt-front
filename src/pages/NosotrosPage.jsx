import { useSeo } from "../hooks/useSeo";
import { Icon } from "@iconify/react";
import Container from "../ui/container";
import Breadcrumb from "../ui/breadcrumb";
import SectionHeader from "../ui/section-header";
import CTASection from "../ui/cta-section";
import { getGeneratedImage } from "../data/generatedImages";
import { company } from "../data/company";
import { team, teamDescription } from "../data/team";

const methodology = [
    {
        step: "01",
        title: "Diagnóstico",
        description: "Conversamos contigo para entender el contexto, identificar el problema real, los usuarios involucrados, las necesidades y las restricciones. No asumimos: preguntamos.",
        details: ["Conversaciones iniciales", "Comprensión del contexto", "Identificación del problema", "Usuarios y necesidades", "Restricciones y recursos"]
    },
    {
        step: "02",
        title: "Estrategia",
        description: "Definimos qué se va a construir, en qué orden y con qué enfoque. Priorizamos lo esencial y proponemos una ruta realista.",
        details: ["Requerimientos y priorización", "Alcance y fases", "Arquitectura inicial", "Plan de trabajo", "Propuesta visual o funcional"]
    },
    {
        step: "03",
        title: "Desarrollo",
        description: "Diseñamos, prototipamos y construimos. El proceso es iterativo: validamos avances con el cliente y ajustamos según lo aprendido.",
        details: ["Diseño UI/UX", "Prototipado", "Frontend y backend", "Integraciones", "Validación continua"]
    },
    {
        step: "04",
        title: "Implementación",
        description: "Preparamos el entorno, realizamos pruebas y desplegamos la solución. Acompañamos la transición para que todo funcione correctamente.",
        details: ["Pruebas y ajustes", "Preparación de entornos", "Despliegue", "Capacitación", "Acompañamiento"]
    },
    {
        step: "05",
        title: "Resultados y evolución",
        description: "Revisamos el resultado, recogemos retroalimentación y planificamos las siguientes mejoras. Un producto digital no termina al publicarse.",
        details: ["Revisión de resultados", "Soporte técnico", "Mejoras y nuevas funcionalidades", "Mantenimiento", "Evolución continua"]
    }
];

export default function NosotrosPage() {
    useSeo({
        title: "Nosotros",
        description: "Conoce a Biznovatech. Somos un equipo que integra análisis, diseño y desarrollo para convertir ideas y necesidades reales en soluciones digitales útiles."
    });

    const heroImage = getGeneratedImage("about-editorial");

    return (
        <div className="w-full flex flex-col gap-16 lg:gap-24">
            <Container size="standard">
                <Breadcrumb items={[{ label: "Nosotros" }]} />
                <section className="flex flex-col gap-8 pt-4" id="quienes-somos">
                    <SectionHeader
                        label="NOSOTROS"
                        title="Conoce a Biznovatech"
                        as="h1"
                    />
                    <div className="flex flex-col lg:flex-row gap-12">
                        <div className="lg:w-3/5 flex flex-col gap-6">
                            <p className="text-lg text-t-secondary leading-relaxed">{company.description}</p>
                            <p className="text-t-secondary leading-relaxed">{company.history}</p>
                            {heroImage && (
                                <div className="mt-4 rounded-2xl overflow-hidden bg-gray-50 border border-gray-100 p-8 flex items-center justify-center">
                                    <img src={heroImage.filename} alt={heroImage.alt} className="w-full max-w-sm object-contain animate-fade-in" loading="eager" />
                                </div>
                            )}
                        </div>
                        <aside className="lg:w-2/5 flex flex-col gap-4">
                            <div className="bg-gray-50 rounded-2xl p-6 flex flex-col gap-4">
                                <div className="flex flex-col gap-1">
                                    <span className="text-sm font-bold text-t-secondary tracking-widest">PROPÓSITO</span>
                                    <p className="text-gray-900 leading-relaxed">{company.purpose}</p>
                                </div>
                                <div className="h-px bg-gray-200" />
                                <div className="flex flex-col gap-1">
                                    <span className="text-sm font-bold text-t-secondary tracking-widest">MISIÓN</span>
                                    <p className="text-gray-700 text-sm leading-relaxed">{company.mission}</p>
                                </div>
                                <div className="h-px bg-gray-200" />
                                <div className="flex flex-col gap-1">
                                    <span className="text-sm font-bold text-t-secondary tracking-widest">VISIÓN</span>
                                    <p className="text-gray-700 text-sm leading-relaxed">{company.vision}</p>
                                </div>
                            </div>
                        </aside>
                    </div>
                </section>
            </Container>

            {/* Values */}
            <section className="w-full bg-gray-50 py-16 border-y border-gray-100" id="proposito-valores">
                <Container size="standard">
                    <div className="flex flex-col gap-10">
                        <SectionHeader label="VALORES" title="Cómo trabajamos, no solo qué hacemos" />
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {company.values.map((value, i) => (
                                <div key={value.name} className="flex flex-col gap-3 p-6 bg-white rounded-xl border border-gray-100">
                                    <div className="flex items-center gap-3">
                                        <span className="text-primary font-bold text-sm">{String(i + 1).padStart(2, '0')}</span>
                                        <h3 className="font-bold text-gray-900">{value.name}</h3>
                                    </div>
                                    <p className="text-sm text-t-secondary leading-relaxed">{value.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </Container>
            </section>

            {/* Team */}
            <Container size="standard">
                <section className="flex flex-col gap-10" id="equipo">
                    <SectionHeader label="EQUIPO" title="Las personas detrás de cada proyecto" description={teamDescription} />
                    <div className="flex flex-col gap-6">
                        {/* Flow diagram */}
                        <div className="hidden lg:flex items-center justify-between bg-gray-50 rounded-2xl p-6 gap-4">
                            <span className="text-sm text-t-secondary font-medium">Necesidad del cliente</span>
                            {team.map((member) => (
                                <div key={member.id} className="flex items-center gap-4">
                                    <Icon icon="solar:arrow-right-linear" className="w-5 h-5 text-gray-300" />
                                    <div className="flex items-center gap-3 px-4 py-2 rounded-xl border border-primary/20 bg-white relative">
                                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">{member.initial}</div>
                                        <span className="text-sm font-semibold text-gray-900">{member.stage}</span>
                                        {/* Conector abstracto entre roles */}
                                        <div className="absolute top-1/2 -right-8 w-6 h-px bg-primary/20 pointer-events-none hidden lg:block" />
                                    </div>
                                </div>
                            ))}
                            <div className="flex items-center gap-4">
                                <Icon icon="solar:arrow-right-linear" className="w-5 h-5 text-gray-300" />
                                <span className="text-sm text-primary font-bold">Producto</span>
                            </div>
                        </div>

                        {/* Team cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {team.map(member => (
                                <div key={member.id} className="flex flex-col gap-4 p-6 rounded-2xl border border-gray-100">
                                    <div className="flex items-center gap-4">
                                        <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                                            <Icon icon={member.icon} className="w-7 h-7 text-primary" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-900">{member.name}</h3>
                                            <p className="text-sm text-primary font-medium">{member.role}</p>
                                        </div>
                                    </div>
                                    <p className="text-sm text-t-secondary leading-relaxed">{member.description}</p>
                                    <div className="flex flex-col gap-2 mt-auto">
                                        {member.responsibilities.slice(0, 4).map((r, respIndex) => (
                                            <div key={respIndex} className="flex items-center gap-2 text-xs text-gray-600">
                                                <div className="w-1 h-1 rounded-full bg-primary shrink-0" />
                                                {r}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </Container>

            {/* Methodology */}
            <section className="w-full bg-surface-dark py-16" id="metodologia">
                <Container size="wide">
                    <div className="flex flex-col gap-10">
                        <div className="flex flex-col gap-4">
                            <span className="inline-flex items-center gap-2 text-sm font-bold tracking-widest text-primary">METODOLOGÍA</span>
                            <h2 className="text-white text-2xl md:text-3xl font-bold">Cómo abordamos cada proyecto</h2>
                            <p className="text-gray-400 text-lg leading-relaxed max-w-3xl">Trabajamos con una dinámica ágil y organizada que permite avanzar con claridad en cada fase, adaptándonos a las necesidades específicas del proyecto.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                            {methodology.map(m => (
                                <div key={m.step} className="flex flex-col gap-3 p-5 rounded-xl bg-white/5 border border-white/10">
                                    <span className="text-primary font-bold text-2xl">{m.step}</span>
                                    <h3 className="text-white font-bold">{m.title}</h3>
                                    <p className="text-gray-400 text-sm leading-relaxed">{m.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </Container>
            </section>

            <Container size="standard">
                <CTASection
                    title="¿Quieres conocer cómo trabajamos de cerca?"
                    description="Cada colaboración empieza con una conversación. Cuéntanos tu idea y veamos cómo podemos ayudarte."
                    buttonText="Cuéntanos tu idea"
                    buttonTo="/contacto"
                />
            </Container>
        </div>
    );
}
