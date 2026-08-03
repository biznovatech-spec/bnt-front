import { useSeo } from "../hooks/useSeo";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import Container from "../ui/container";
import SectionHeader from "../ui/section-header";
import Breadcrumb from "../ui/breadcrumb";
import CTASection from "../ui/cta-section";
import { projects } from "../data/projects";

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

export default function CasosPage() {
    useSeo({
        title: "Casos de éxito",
        description: "Explora los proyectos en los que hemos colaborado. Conoce los desafíos, soluciones y resultados obtenidos para nuestros clientes."
    });

    return (
        <div className="w-full flex flex-col gap-16 lg:gap-24">
            <Container size="wide">
                <Breadcrumb items={[{ label: "Casos de éxito" }]} />
                <section className="flex flex-col gap-8 pt-4">
                    <SectionHeader
                        label="CASOS DE ÉXITO"
                        title="Proyectos que hablan por nosotros"
                        description="Cada proyecto nace de una necesidad real. Aquí compartimos cómo abordamos cada desafío, qué decisiones tomamos y qué aprendimos en el camino."
                        as="h1"
                    />
                </section>
            </Container>

            <Container size="wide">
                <div className="flex flex-col gap-12">
                    {projects.map((project, index) => (
                        <Link
                            key={project.slug}
                            to={`/casos-de-exito/${project.slug}`}
                            className="group flex flex-col lg:flex-row gap-8 lg:gap-12 pb-12 border-b border-gray-100 last:border-b-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-xl"
                        >
                            <div className="lg:w-2/5 aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100 shrink-0 border border-gray-200">
                                <img
                                    src={project.image}
                                    alt={project.name}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                            </div>
                            <div className="flex flex-col gap-4 justify-center flex-1">
                                <div className="flex items-center gap-3">
                                    <span className="text-xs font-bold tracking-widest text-t-secondary">{String(index + 1).padStart(2, '0')}</span>
                                    <span className="text-sm font-semibold text-primary">{project.category}</span>
                                </div>
                                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 group-hover:text-primary transition-colors">
                                    {project.name} 
                                </h2>
                                <p className="text-t-secondary leading-relaxed max-w-2xl">{project.context}</p>
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {project.technologies.slice(0, 5).map(tech => (
                                        <span key={tech} className="flex items-center gap-1.5 text-xs px-3 py-1.5 bg-gray-50 border border-gray-100 rounded-full text-t-secondary font-medium capitalize grayscale">
                                            {techIcons[tech] && <Icon icon={techIcons[tech]} className="w-3.5 h-3.5" />}
                                            {tech}
                                        </span>
                                    ))}
                                    {project.technologies.length > 5 && (
                                        <span className="flex items-center text-xs px-3 py-1.5 bg-gray-50 border border-gray-100 rounded-full text-gray-400 font-medium">
                                            +{project.technologies.length - 5}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </Container>

            <Container size="wide">
                <CTASection
                    title="Construyamos tu próximo proyecto"
                    description="Cada caso de éxito comenzó con una conversación. Cuéntanos tu idea."
                    buttonText="Cuéntanos tu idea"
                    buttonTo="/contacto"
                    variant="dark"
                />
            </Container>
        </div>
    );
}
