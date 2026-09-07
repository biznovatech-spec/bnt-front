import { useSeo } from "../hooks/useSeo";
import { useParams, Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import { Breadcrumb, CTASection, Container, Eyebrow, Reveal } from "../ui";
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

    const relatedServices = services.filter((s) => project.relatedServices.includes(s.slug));
    const relatedCases = projects.filter((p) => project.relatedCases.includes(p.slug));

    return (
        <div className="w-full flex flex-col">
            <Container size="wide">
                <Breadcrumb items={[{ label: "Casos de éxito", to: "/casos-de-exito" }, { label: project.name }]} />
            </Container>

            {/* Portada */}
            <section className="w-full pt-10 pb-[var(--section-py)]">
                <Container size="wide">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
                        <div className="lg:col-span-6 flex flex-col gap-7">
                            <Reveal dir="none">
                                <Eyebrow>{project.category}</Eyebrow>
                            </Reveal>

                            <Reveal delay={80}>
                                <h1 className="display-caps t-1">{project.name}</h1>
                            </Reveal>

                            <Reveal delay={150}>
                                <p className="lead max-w-[58ch]">{project.context}</p>
                            </Reveal>

                            <Reveal delay={220} className="flex flex-wrap gap-2">
                                {project.technologies.map((tech) => (
                                    <span key={tech} className="chip capitalize">
                                        {techIcons[tech] && (
                                            <Icon icon={techIcons[tech]} className="w-3.5 h-3.5" aria-hidden="true" />
                                        )}
                                        {tech}
                                    </span>
                                ))}
                            </Reveal>
                        </div>

                        <Reveal delay={140} dir="scale" className="lg:col-span-6">
                            <div className="media-frame relative aspect-[16/10] overflow-hidden border bd-hair">
                                <img
                                    src={project.image}
                                    alt={project.name}
                                    className="w-full h-full object-cover"
                                    loading="eager"
                                />
                            </div>
                        </Reveal>
                    </div>
                </Container>
            </section>

            {/* Desafío y solución */}
            <section className="w-full py-[var(--section-py)] bg-canvas-2 border-y bd-hair">
                <Container size="wide">
                    <div className="band grid-cols-1 lg:grid-cols-2">
                        <Reveal dir="none" className="h-full">
                            <div className="h-full flex flex-col gap-5 p-8 lg:p-12">
                                <Eyebrow>El desafío</Eyebrow>
                                <h2 className="display-caps text-[clamp(1.2rem,2vw,2rem)] t-1">
                                    ¿Qué necesitaba resolver?
                                </h2>
                                <p className="copy max-w-[52ch]">{project.challenge}</p>
                            </div>
                        </Reveal>

                        <Reveal dir="none" delay={100} className="h-full">
                            <div className="h-full flex flex-col gap-5 p-8 lg:p-12">
                                <Eyebrow>La solución</Eyebrow>
                                <h2 className="display-caps text-[clamp(1.2rem,2vw,2rem)] t-1">¿Cómo lo abordamos?</h2>
                                <p className="copy max-w-[52ch]">{project.solution}</p>
                            </div>
                        </Reveal>
                    </div>
                </Container>
            </section>

            {/* Participación */}
            <section className="w-full py-[var(--section-py)]">
                <Container size="wide">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
                        <Reveal className="lg:col-span-4">
                            <h2 className="display-caps t-1 max-w-[14ch]">
                                Participación de Biznovatech
                            </h2>
                        </Reveal>

                        <div className="lg:col-span-8 flex flex-col">
                            {project.participation.map((item, i) => (
                                <Reveal
                                    key={i}
                                    delay={i * 60}
                                    className="flex items-start gap-6 py-5 border-t bd-hair last:border-b last:bd-hair"
                                >
                                    <span className="index-num micro-label t-accent pt-1.5 shrink-0">
                                        {String(i + 1).padStart(2, "0")}
                                    </span>
                                    <span className="text-[0.98rem] leading-relaxed t-1">
                                        {item}
                                    </span>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </Container>
            </section>

            {/* Reflexión */}
            <section className="w-full pb-[var(--section-py)]">
                <Container size="wide">
                    <Reveal dir="depth">
                        <div className="relative overflow-hidden surface-strong">
                            <div aria-hidden="true" className="deco absolute inset-0">
                                <div
                                    className="absolute inset-0 grid-hairline"
                                    style={{ "--cell": "72px" }}
                                />
                            </div>
                            <div className="relative z-10 p-10 lg:p-16 flex flex-col gap-6 max-w-4xl">
                                <Eyebrow className="t-accent">Reflexión</Eyebrow>
                                <p className="font-display text-[clamp(1.2rem,2vw,1.7rem)] leading-[1.5] t-1">
                                    &ldquo;{project.reflection}&rdquo;
                                </p>
                            </div>
                        </div>
                    </Reveal>
                </Container>
            </section>

            {/* Servicios involucrados */}
            {relatedServices.length > 0 && (
                <section className="w-full pb-[var(--section-py)]">
                    <Container size="wide">
                        <Reveal dir="none">
                            <div className="rule-section w-full" />
                        </Reveal>
                        <h2 className="display-sm t-1 pt-8">Servicios involucrados</h2>
                        <div className="mt-6 flex flex-wrap gap-3">
                            {relatedServices.map((s) => (
                                <Link
                                    key={s.slug}
                                    to={`/servicios/${s.slug}`}
                                    className="group flex items-center gap-2.5 px-4 py-3 border bd text-sm t-1 hover:bd-accent hover:t-accent transition-colors duration-300"
                                >
                                    <Icon icon={s.icon} className="w-4 h-4" aria-hidden="true" />
                                    {s.name}
                                    <Icon
                                        icon="lucide:arrow-up-right"
                                        className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity"
                                        aria-hidden="true"
                                    />
                                </Link>
                            ))}
                        </div>
                    </Container>
                </section>
            )}

            {/* Casos relacionados */}
            {relatedCases.length > 0 && (
                <section className="w-full pb-[var(--section-py)]">
                    <Container size="wide">
                        <Reveal dir="none">
                            <div className="rule-section w-full" />
                        </Reveal>
                        <h2 className="display-sm t-1 pt-8">Casos relacionados</h2>

                        <div className="mt-8">
                            {relatedCases.map((rc, i) => (
                                <Reveal key={rc.slug} delay={i * 70} dir="none">
                                    <Link
                                        to={`/casos-de-exito/${rc.slug}`}
                                        className="row group grid-cols-[7rem_minmax(0,1fr)_auto] md:grid-cols-[9rem_minmax(0,0.8fr)_minmax(0,1.2fr)_auto] gap-x-6 py-6 items-center"
                                    >
                                        <span className="media-frame relative block aspect-[16/10] overflow-hidden border bd-hair">
                                            <img
                                                src={rc.image}
                                                alt={rc.name}
                                                className="w-full h-full object-cover"
                                                loading="lazy"
                                            />
                                        </span>

                                        <span className="display-caps text-[clamp(1rem,1.4vw,1.35rem)] t-1 transition-colors duration-500 group-hover:t-accent">
                                            {rc.name}
                                        </span>

                                        <span className="hidden md:block copy text-[0.88rem] line-clamp-2">
                                            {rc.context}
                                        </span>

                                        <span className="grid place-items-center w-10 h-10 border border-transparent t-3 transition-all duration-500 group-hover:bd group-hover:t-accent">
                                            <Icon icon="lucide:arrow-right" className="w-4 h-4 arrow-shift" aria-hidden="true" />
                                        </span>
                                    </Link>
                                </Reveal>
                            ))}
                        </div>
                    </Container>
                </section>
            )}

            <div className="pb-[var(--section-py)]">
                <Container size="wide">
                    <CTASection
                        title="Construyamos tu próximo proyecto"
                        description="Cada caso de éxito comenzó con una conversación."
                        buttonText="Cuéntanos tu idea"
                        buttonTo="/contacto"
                    />
                </Container>
            </div>
        </div>
    );
}
