import { useSeo } from "../hooks/useSeo";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import { Breadcrumb, CTASection, Container, Reveal, SectionHeader } from "../ui";
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
        <div className="w-full flex flex-col">
            <Container size="wide">
                <Breadcrumb items={[{ label: "Casos de éxito" }]} />
            </Container>

            <section className="w-full pt-10 pb-[var(--section-py)]">
                <Container size="wide">
                    <SectionHeader
                        label="Casos de éxito"
                        title="Proyectos que hablan por nosotros"
                        description="Cada proyecto nace de una necesidad real. Aquí compartimos cómo abordamos cada desafío, qué decisiones tomamos y qué aprendimos en el camino."
                        as="h1"
                    />

                    {/* Índice editorial de casos */}
                    <div className="mt-16 flex flex-col border-t bd-hair overflow-hidden">
                        {projects.map((project, index) => (
                            <Reveal key={project.slug} delay={(index % 2) * 60} className="border-b bd-hair">
                                <Link
                                    to={`/casos-de-exito/${project.slug}`}
                                    className="group grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 py-10 lg:py-14 items-center"
                                >
                                    <div
                                        className={`lg:col-span-5 media-frame relative aspect-[16/10] overflow-hidden border bd-hair ${
                                            index % 2 === 0
                                                ? "lg:-ml-[var(--gutter)] lg:border-l-0"
                                                : "lg:order-2 lg:-mr-[var(--gutter)] lg:border-r-0"
                                        }`}
                                    >
                                        <img
                                            src={project.image}
                                            alt={project.name}
                                            className="w-full h-full object-cover"
                                            loading="lazy"
                                        />
                                        <span
                                            aria-hidden="true"
                                            className="absolute inset-0 group-hover:fill-accent-faint transition-colors duration-500"
                                        />
                                    </div>

                                    <div
                                        className={`lg:col-span-7 flex flex-col gap-5 ${
                                            index % 2 === 0 ? "" : "lg:order-1"
                                        }`}
                                    >
                                        <div className="flex items-center gap-5">
                                            <span aria-hidden="true" className="ghost-num text-[clamp(2rem,3.4vw,3.2rem)]">
                                                {String(index + 1).padStart(2, "0")}
                                            </span>
                                            <span aria-hidden="true" className="w-10 h-px bg-[var(--hair)]" />
                                            <span className="micro-label t-accent">
                                                {project.category}
                                            </span>
                                        </div>

                                        <h2 className="display-caps text-[clamp(1.6rem,2.8vw,2.8rem)] t-1 transition-colors duration-500 group-hover:t-accent">
                                            {project.name}
                                        </h2>

                                        <p className="copy max-w-[62ch]">{project.context}</p>

                                        <div className="flex flex-wrap items-center gap-2 mt-1">
                                            {project.technologies.slice(0, 5).map((tech) => (
                                                <span key={tech} className="chip capitalize">
                                                    {techIcons[tech] && (
                                                        <Icon icon={techIcons[tech]} className="w-3.5 h-3.5 grayscale" aria-hidden="true" />
                                                    )}
                                                    {tech}
                                                </span>
                                            ))}
                                            {project.technologies.length > 5 && (
                                                <span className="chip">+{project.technologies.length - 5}</span>
                                            )}
                                        </div>

                                        <span className="flex items-center gap-2 micro-label t-accent mt-2">
                                            Ver caso completo
                                            <Icon icon="lucide:arrow-right" className="w-3.5 h-3.5 arrow-shift" aria-hidden="true" />
                                        </span>
                                    </div>
                                </Link>
                            </Reveal>
                        ))}
                    </div>
                </Container>
            </section>

            <div className="pb-[var(--section-py)]">
                <Container size="wide">
                    <CTASection
                        title="Construyamos tu próximo proyecto"
                        description="Cada caso de éxito comenzó con una conversación. Cuéntanos tu idea."
                        buttonText="Cuéntanos tu idea"
                        buttonTo="/contacto"
                    />
                </Container>
            </div>
        </div>
    );
}
