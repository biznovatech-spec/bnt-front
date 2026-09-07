import { useSeo } from "../hooks/useSeo";
import { useParams } from "react-router-dom";
import { Icon } from "@iconify/react";
import { Breadcrumb, CTASection, Container, CutPanel, Eyebrow, Panel, Reveal } from "../ui";
import { getSolutionBySlug } from "../data/solutions";
import { services } from "../data/services";

export default function SolutionDetailPage() {
    const { slug } = useParams();
    const solution = getSolutionBySlug(slug);

    useSeo({
        title: solution ? solution.title : "Solución",
        description: solution ? solution.description : "Detalles de la solución."
    });

    if (!solution) {
        throw new Response("Not Found", { status: 404 });
    }

    const related = services.filter((s) => solution.relatedServices.includes(s.slug));

    return (
        <div className="w-full flex flex-col">
            <Container size="wide">
                <Breadcrumb items={[{ label: "Soluciones", to: "/soluciones" }, { label: solution.title }]} />
            </Container>

            {/* Portada */}
            <section className="w-full pt-10 pb-[var(--section-py)]">
                <Container size="wide">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
                        <div className="lg:col-span-7 flex flex-col gap-7">
                            <Reveal dir="none" className="flex items-center gap-4">
                                <span className="grid place-items-center w-12 h-12 border bd t-accent shrink-0">
                                    <Icon icon={solution.icon} className="w-6 h-6" aria-hidden="true" />
                                </span>
                                <Eyebrow>Solución</Eyebrow>
                            </Reveal>

                            <Reveal delay={80}>
                                <h1 className="display-caps t-1 max-w-[18ch]">
                                    {solution.title}
                                </h1>
                            </Reveal>

                            <Reveal delay={160}>
                                <p className="lead max-w-[60ch]">{solution.description}</p>
                            </Reveal>
                        </div>

                        <Reveal delay={220} dir="right" className="lg:col-span-5">
                            <CutPanel cut="30px" className="p-8 lg:p-10 flex flex-col gap-6 lg:sticky lg:top-28">
                                <p className="display-xs text-[1.1rem] t-accent">
                                    &ldquo;{solution.situation}&rdquo;
                                </p>

                                <div className="rule-accent w-full" />

                                <div className="flex flex-col gap-4">
                                    <span className="micro-label t-2">
                                        ¿Te identificas?
                                    </span>
                                    <ul className="flex flex-col">
                                        {solution.signals.map((signal, i) => (
                                            <li
                                                key={i}
                                                className="flex items-start gap-4 py-3.5 border-t bd-hair last:border-b last:bd-hair"
                                            >
                                                <span
                                                    aria-hidden="true"
                                                    className="w-1.5 h-1.5 mt-2 fill-accent shrink-0"
                                                />
                                                <span className="copy text-[0.88rem]">{signal}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </CutPanel>
                        </Reveal>
                    </div>
                </Container>
            </section>

            {/* Enfoque */}
            <section className="w-full py-[var(--section-py)] bg-canvas-2 border-y bd-hair">
                <Container size="wide">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
                        <Reveal className="lg:col-span-5">
                            <h2 className="display-caps t-1">Nuestro enfoque</h2>
                        </Reveal>
                        <Reveal delay={80} className="lg:col-span-7">
                            <p className="lead max-w-[60ch]">{solution.approach}</p>
                        </Reveal>
                    </div>

                    <div className="mt-14 grid grid-cols-1 lg:grid-cols-2 gap-x-16">
                        {solution.benefits.map((benefit, i) => (
                            <Reveal key={i} delay={i * 45} dir="none">
                                <div className="row group grid-cols-[3.5rem_minmax(0,1fr)] gap-x-6 py-6 items-center">
                                    <span className="index-num micro-label t-3 transition-colors duration-500 group-hover:t-accent">
                                        {String(i + 1).padStart(2, "0")}
                                    </span>
                                    <span className="text-[0.98rem] leading-relaxed t-1">
                                        {benefit}
                                    </span>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </Container>
            </section>

            {/* Servicios que intervienen */}
            {related.length > 0 && (
                <section className="w-full py-[var(--section-py)]">
                    <Container size="wide">
                        <Reveal dir="none">
                            <div className="rule-section w-full" />
                        </Reveal>
                        <h2 className="display-sm t-1 pt-8">
                            Servicios que intervienen
                        </h2>

                        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                            {related.map((s, i) => (
                                <Reveal key={s.slug} delay={i * 70}>
                                    <Panel to={`/servicios/${s.slug}`} className="group flex flex-col gap-4 p-7 h-full">
                                        <span className="grid place-items-center w-11 h-11 border bd t-accent transition-colors duration-500 group-hover:border-current">
                                            <Icon icon={s.icon} className="w-5 h-5" aria-hidden="true" />
                                        </span>
                                        <span className="display-xs text-[1.02rem] t-1 transition-colors duration-300 group-hover:t-accent">
                                            {s.name}
                                        </span>
                                        <span className="copy text-[0.84rem]">{s.shortDescription}</span>
                                    </Panel>
                                </Reveal>
                            ))}
                        </div>
                    </Container>
                </section>
            )}

            <div className="pb-[var(--section-py)]">
                <Container size="wide">
                    <CTASection
                        title={solution.cta.text}
                        description="Cuéntanos tu contexto y exploraremos juntos cómo resolverlo."
                        buttonText="Cuéntanos tu idea"
                        buttonTo={solution.cta.to}
                    />
                </Container>
            </div>
        </div>
    );
}
