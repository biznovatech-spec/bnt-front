import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import { Container, Reveal, SectionHeader } from "../ui";
import { homeProjects } from "../utils/projects";

/**
 * Proyectos destacados.
 *
 * La pieza principal sangra por el borde derecho de la pantalla —el bloque de
 * texto queda a la izquierda, sobre la misma línea de la retícula— y el resto
 * baja a renglones de índice. Sin velos degradados sobre las imágenes: la
 * etiqueta va en una placa sólida.
 */
export default function Project() {
    const [lead, ...rest] = homeProjects;

    return (
        <section className="w-full py-[var(--section-py)] bg-canvas" id="projects">
            <Container size="wide">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
                    <div className="lg:col-span-8">
                        <SectionHeader
                            label="Proyectos destacados"
                            index="04"
                            title="Resultados que hablan por nosotros"
                        />
                    </div>
                    <Reveal delay={120} className="lg:col-span-4 lg:pb-2 lg:flex lg:justify-end">
                        <Link to="/casos-de-exito" className="arrow-link group">
                            <span>Ver todos los casos</span>
                            <Icon icon="lucide:arrow-right" className="w-4 h-4 arrow-shift" aria-hidden="true" />
                        </Link>
                    </Reveal>
                </div>
            </Container>

            {/* Pieza principal: el medio toca el borde de la pantalla */}
            <div className="mt-16 w-full max-w-[var(--shell-max)] mx-auto pl-[var(--gutter)]">
                <Link to={lead.link} className="group grid grid-cols-1 lg:grid-cols-12 items-stretch">
                    <div className="lg:col-span-5 flex flex-col justify-between gap-8 py-8 lg:py-10 pr-[var(--gutter)] lg:pr-12 border-t bd-hair">
                        <div className="flex flex-col gap-5">
                            <div className="flex items-center gap-4">
                                <span className="index-num micro-label t-accent">01</span>
                                <span aria-hidden="true" className="w-8 h-px bg-[var(--hair)]" />
                                <span className="micro-label t-2">
                                    {lead.type}
                                </span>
                            </div>

                            <h3 className="display-caps text-[clamp(1.8rem,3vw,3rem)] t-1 transition-colors duration-500 group-hover:t-accent">
                                {lead.title}
                            </h3>

                            <p className="copy max-w-[46ch]">{lead.text}</p>
                        </div>

                        <span className="flex items-center gap-3 micro-label t-accent">
                            Ver proyecto
                            <Icon icon="lucide:arrow-up-right" className="w-4 h-4 arrow-shift" aria-hidden="true" />
                        </span>
                    </div>

                    <div className="lg:col-span-7 media-frame relative aspect-[16/9] lg:aspect-auto lg:min-h-[clamp(320px,34vw,520px)] overflow-hidden border-t border-l bd-hair">
                        <img
                            src={lead.image}
                            alt={lead.title}
                            className="w-full h-full object-cover"
                            loading="lazy"
                            width="1200"
                            height="675"
                        />
                    </div>
                </Link>
            </div>

            {/* Resto: renglones de índice */}
            <Container size="wide">
                <div className="mt-0">
                    {rest.map((project, index) => (
                        <Reveal key={project.id} delay={index * 70} dir="none">
                            <Link
                                to={project.link}
                                className="row group grid-cols-[auto_1fr] md:grid-cols-[3.5rem_minmax(0,0.9fr)_minmax(0,1.2fr)_auto] gap-x-6 gap-y-2 py-7"
                            >
                                <span className="index-num micro-label t-3 self-center transition-colors duration-500 group-hover:t-accent">
                                    {String(index + 2).padStart(2, "0")}
                                </span>

                                <span className="flex flex-col gap-1.5 min-w-0 self-center">
                                    <span className="micro-label t-3">
                                        {project.type}
                                    </span>
                                    <span className="display-caps text-[clamp(1.05rem,1.5vw,1.55rem)] t-1 transition-colors duration-500 group-hover:t-accent">
                                        {project.title}
                                    </span>
                                </span>

                                <span className="copy text-[0.9rem] col-span-2 md:col-span-1 md:self-center">
                                    {project.text}
                                </span>

                                <span className="hidden md:grid place-items-center w-10 h-10 border border-transparent t-3 self-center transition-all duration-500 group-hover:bd group-hover:t-accent">
                                    <Icon icon="lucide:arrow-right" className="w-4 h-4 arrow-shift" aria-hidden="true" />
                                </span>
                            </Link>
                        </Reveal>
                    ))}
                </div>
            </Container>
        </section>
    );
}
