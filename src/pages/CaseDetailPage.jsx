import { useSeo } from "../hooks/useSeo";
import { useParams, Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import Container from "../ui/container";
import Breadcrumb from "../ui/breadcrumb";
import CTASection from "../ui/cta-section";
import { getProjectBySlug, projects } from "../data/projects";
import { services } from "../data/services";

const techIcons = {
    react: "logos:react",
    nodejs: "logos:nodejs-icon",
    express: "simple-icons:express",
    postgresql: "logos:postgresql",
    tailwind: "logos:tailwindcss-icon",
    figma: "logos:figma",
    docker: "logos:docker-icon",
    vite: "logos:vitejs",
    javascript: "logos:javascript",
    html5: "logos:html-5",
    css3: "logos:css-3",
    blender: "logos:blender"
};

export default function CaseDetailPage() {
    const { slug } = useParams();
    const project = getProjectBySlug(slug);

    useSeo({
        title: project ? `Caso de éxito: ${project.name}` : "Caso de éxito",
        description: project ? project.context : "Detalles del caso de éxito."
    });

    if (!project) {
        throw new Response("Not Found", { status: 404 });
    }

    const relatedServices = services.filter(s => project.relatedServices.includes(s.slug));
    const relatedCases = projects.filter(p => project.relatedCases.includes(p.slug));

    return (
        <div className="w-full flex flex-col gap-16 lg:gap-24">
            <Container size="standard">
                <Breadcrumb items={[
                    { label: "Casos de éxito", to: "/casos-de-exito" },
                    { label: project.name }
                ]} />

                {/* Hero */}
                <section className="flex flex-col gap-8 pt-4">
                    <div className="flex flex-col lg:flex-row gap-8 items-start">
                        <div className="flex flex-col gap-4 lg:w-3/5 pr-4">
                            <span className="text-sm font-bold text-primary">{project.category}</span>
                            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">{project.name}</h1>
                            <p className="text-lg text-t-secondary leading-relaxed max-w-2xl">{project.context}</p>
                            <div className="flex flex-wrap gap-2 mt-4">
                                {project.technologies.map(tech => (
                                    <span key={tech} className="flex items-center gap-1.5 text-xs px-3 py-1.5 bg-gray-50 border border-gray-100 rounded-full text-t-secondary font-medium capitalize grayscale">
                                        {techIcons[tech] && <Icon icon={techIcons[tech]} className="w-3.5 h-3.5" />}
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="lg:w-2/5 aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100 shrink-0 border border-gray-200">
                            <img src={project.image} alt={project.name} className="w-full h-full object-cover" />
                        </div>
                    </div>
                </section>
            </Container>

            {/* Challenge */}
            <section className="w-full bg-gray-50 py-16 border-y border-gray-100">
                <Container size="standard">
                    <div className="flex flex-col lg:flex-row gap-12">
                        <div className="lg:w-1/2 flex flex-col gap-4 pr-4 border-r border-gray-200">
                            <span className="text-sm font-bold tracking-widest text-primary">EL DESAFÍO</span>
                            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">¿Qué necesitaba resolver?</h2>
                            <p className="text-t-secondary leading-relaxed text-lg mt-2">{project.challenge}</p>
                        </div>
                        <div className="lg:w-1/2 flex flex-col gap-4">
                            <span className="text-sm font-bold tracking-widest text-primary">LA SOLUCIÓN</span>
                            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">¿Cómo lo abordamos?</h2>
                            <p className="text-t-secondary leading-relaxed text-lg mt-2">{project.solution}</p>
                        </div>
                    </div>
                </Container>
            </section>

            {/* Participation */}
            <Container size="standard">
                <div className="flex flex-col gap-8">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Participación de Biznovatech</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {project.participation.map((item, i) => (
                            <div key={i} className="flex items-start gap-4 p-4 border-l-2 border-primary/30">
                                <span className="text-primary font-bold text-sm shrink-0">{String(i + 1).padStart(2, '0')}</span>
                                <span className="text-gray-700 leading-relaxed">{item}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </Container>

            {/* Reflection */}
            <Container size="standard">
                <div className="bg-surface-dark rounded-3xl p-8 lg:p-12 relative overflow-hidden">
                    {/* Abstract line decoration */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-3xl rounded-full" />
                    
                    <div className="flex flex-col gap-4 max-w-3xl relative z-10">
                        <span className="text-primary text-sm font-bold tracking-widest">REFLEXIÓN</span>
                        <p className="text-white text-lg leading-relaxed italic">&ldquo;{project.reflection}&rdquo;</p>
                    </div>
                </div>
            </Container>

            {/* Related */}
            {relatedServices.length > 0 && (
                <Container size="standard">
                    <div className="flex flex-col gap-6">
                        <h2 className="text-xl font-bold text-gray-900">Servicios involucrados</h2>
                        <div className="flex flex-wrap gap-3">
                            {relatedServices.map(s => (
                                <Link key={s.slug} to={`/servicios/${s.slug}`} className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-100 hover:border-primary/30 transition-all text-sm font-medium text-gray-700 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                                    <Icon icon={s.icon} className="w-4 h-4" />
                                    {s.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                </Container>
            )}

            {relatedCases.length > 0 && (
                <Container size="standard">
                    <div className="border-t border-gray-100 pt-12 flex flex-col gap-6">
                        <h2 className="text-xl font-bold text-gray-900">Casos relacionados</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {relatedCases.map(rc => (
                                <Link key={rc.slug} to={`/casos-de-exito/${rc.slug}`} className="flex items-start gap-4 p-4 rounded-xl border border-gray-100 hover:border-primary/30 transition-all group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                                    <img src={rc.image} alt={rc.name} className="w-20 h-20 rounded-xl object-cover shrink-0 border border-gray-200" />
                                    <div>
                                        <h3 className="font-bold text-gray-900 group-hover:text-primary transition-colors text-lg">{rc.name}</h3>
                                        <p className="text-sm text-t-secondary mt-1 line-clamp-2">{rc.context}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </Container>
            )}

            <Container size="standard">
                <CTASection
                    title="Construyamos tu próximo proyecto"
                    description="Cada caso de éxito comenzó con una conversación."
                    buttonText="Cuéntanos tu idea"
                    buttonTo="/contacto"
                />
            </Container>
        </div>
    );
}
