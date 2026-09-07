import { useSeo } from "../hooks/useSeo";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import { Breadcrumb, CTASection, Container, CutPanel, Reveal, SectionHeader } from "../ui";
import { getGeneratedImage } from "../data/generatedImages";
import { solutions } from "../data/solutions";

export default function SolucionesPage() {
    useSeo({
        title: "Soluciones",
        description: "Encuentra soluciones a medida para tu situación: desde automatización de tareas hasta modernización de software."
    });

    const heroImage = getGeneratedImage("solutions-editorial");

    return (
        <div className="w-full flex flex-col">
            <Container size="wide">
                <Breadcrumb items={[{ label: "Soluciones" }]} />
            </Container>

            {/* Portada */}
            <section className="w-full pt-10 pb-[var(--section-py)]">
                <Container size="wide">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
                        <div className="lg:col-span-7">
                            <SectionHeader
                                label="Soluciones"
                                title="¿Qué necesitas resolver?"
                                description="No importa si partes de una idea inicial, de un proceso manual o de un sistema que necesita mejorar. Identifica tu situación y descubre cómo podemos acompañarte."
                                as="h1"
                            />
                        </div>

                        {heroImage && (
                            <Reveal delay={180} dir="scale" className="lg:col-span-5">
                                <CutPanel surface="plate" cut="34px" className="p-10 flex items-center justify-center">
                                    <div
                                        aria-hidden="true"
                                        className="deco absolute inset-0 grid-hairline opacity-70"
                                        style={{ "--cell": "48px" }}
                                    />
                                    <img
                                        src={heroImage.filename}
                                        alt={heroImage.alt}
                                        className="relative w-full max-w-sm object-contain"
                                        loading="eager"
                                    />
                                </CutPanel>
                            </Reveal>
                        )}
                    </div>
                </Container>
            </section>

            {/* Catálogo de soluciones */}
            <section className="w-full pb-[var(--section-py)]">
                <Container size="wide">
                    <div>
                        {solutions.map((solution, index) => (
                            <Reveal key={solution.slug} delay={index * 55} dir="none">
                                <Link
                                    to={`/soluciones/${solution.slug}`}
                                    className="row group grid-cols-1 md:grid-cols-[4rem_minmax(0,1fr)_minmax(0,1.25fr)_auto] gap-x-8 gap-y-3 py-9 md:py-11 items-start"
                                >
                                    <span
                                        aria-hidden="true"
                                        className="ghost-num text-[clamp(2rem,3.4vw,3.2rem)]"
                                    >
                                        {String(index + 1).padStart(2, "0")}
                                    </span>

                                    <span className="flex flex-col gap-3 min-w-0">
                                        <span className="flex items-center gap-3">
                                            <Icon
                                                icon={solution.icon}
                                                className="w-5 h-5 shrink-0 t-3 transition-colors duration-500 group-hover:t-accent"
                                                aria-hidden="true"
                                            />
                                            <h2 className="display-caps text-[clamp(1.1rem,1.7vw,1.7rem)] t-1 transition-colors duration-500 group-hover:t-accent">
                                                {solution.title}
                                            </h2>
                                        </span>
                                        <span className="text-[0.92rem] leading-relaxed t-accent border-l bd pl-4 max-w-[36ch]">
                                            &ldquo;{solution.situation}&rdquo;
                                        </span>
                                    </span>

                                    <span className="copy text-[0.9rem] md:pt-1">
                                        {solution.description.slice(0, 190)}...
                                    </span>

                                    <span className="hidden md:grid place-items-center w-10 h-10 border border-transparent t-3 transition-all duration-500 group-hover:bd group-hover:t-accent">
                                        <Icon icon="lucide:arrow-right" className="w-4 h-4 arrow-shift" aria-hidden="true" />
                                    </span>
                                </Link>
                            </Reveal>
                        ))}
                    </div>
                </Container>
            </section>

            <div className="pb-[var(--section-py)]">
                <Container size="wide">
                    <CTASection
                        title="¿No encuentras tu situación?"
                        description="Cada proyecto es diferente. Cuéntanos tu contexto y te orientamos hacia la solución adecuada."
                        buttonText="Cuéntanos tu situación"
                        buttonTo="/contacto"
                    />
                </Container>
            </div>
        </div>
    );
}
