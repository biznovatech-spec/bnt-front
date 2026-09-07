import { Icon } from "@iconify/react";
import { Container, Reveal, SectionHeader } from "../ui";
import { whyValues } from "../data/hero";

/**
 * Por qué elegirnos: manifiesto en renglones.
 *
 * Cada argumento ocupa una franja completa con su número a tamaño de titular
 * a la izquierda. Sin tarjetas: la jerarquía la marcan el número, el filete y
 * el aire. Al pasar el cursor, el contorno del número toma el acento.
 */
export default function WhyBiznovatechSection() {
    return (
        <section
            className="relative w-full py-[var(--section-py)] bg-canvas overflow-hidden"
            id="why-biznovatech"
        >
            <Container size="wide" className="relative z-10">
                <SectionHeader
                    label="Por qué elegirnos"
                    index="05"
                    title="El partner tecnológico que tu empresa necesita para escalar"
                />

                <div className="mt-16">
                    {whyValues.map((item, index) => (
                        <Reveal key={item.step} delay={index * 70} dir="none">
                            <article className="row group grid-cols-1 md:grid-cols-[minmax(0,7rem)_minmax(0,1fr)_minmax(0,1.3fr)_auto] gap-x-8 gap-y-4 py-10 md:py-14 items-start">
                                <span
                                    aria-hidden="true"
                                    className="ghost-num text-[clamp(2.8rem,6vw,5.5rem)]"
                                >
                                    {item.step}
                                </span>

                                <h3 className="display-caps text-[clamp(1.2rem,2vw,2rem)] t-1 max-w-[14ch] transition-colors duration-500 group-hover:t-accent">
                                    {item.title}
                                </h3>

                                <p className="copy max-w-[52ch] md:pt-1">{item.text}</p>

                                <span className="hidden md:grid place-items-center w-12 h-12 border bd t-3 transition-colors duration-500 group-hover:bd-accent group-hover:t-accent">
                                    <Icon icon={item.icon} className="w-5 h-5" aria-hidden="true" />
                                </span>
                            </article>
                        </Reveal>
                    ))}
                </div>
            </Container>
        </section>
    );
}
