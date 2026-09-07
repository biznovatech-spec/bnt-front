import { useSeo } from "../hooks/useSeo";
import { useParams } from "react-router-dom";
import { Icon } from "@iconify/react";
import { Breadcrumb, CTASection, Container, CutPanel, Eyebrow, Panel, Reveal } from "../ui";
import { getServiceBySlug, services } from "../data/services";

const CATEGORY_LABEL = {
    strategy: "Estrategia",
    products: "Productos digitales",
    experience: "Experiencia e inteligencia",
};

export default function ServiceDetailPage() {
    const { slug } = useParams();
    const service = getServiceBySlug(slug);

    useSeo({
        title: service ? service.name : "Servicio",
        description: service ? service.shortDescription : "Detalles del servicio."
    });

    if (!service) {
        throw new Response("Not Found", { status: 404 });
    }

    const relatedServices = services
        .filter((s) => s.slug !== slug && s.category === service.category)
        .slice(0, 2);

    return (
        <div className="w-full flex flex-col">
            <Container size="wide">
                <Breadcrumb items={[{ label: "Servicios", to: "/servicios" }, { label: service.name }]} />
            </Container>

            {/* Portada */}
            <section className="w-full pt-10 pb-[var(--section-py)]">
                <Container size="wide">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
                        <div className="lg:col-span-7 flex flex-col gap-7">
                            <Reveal dir="none" className="flex items-center gap-4">
                                <span className="grid place-items-center w-12 h-12 border bd t-accent shrink-0">
                                    <Icon icon={service.icon} className="w-6 h-6" aria-hidden="true" />
                                </span>
                                <Eyebrow>{CATEGORY_LABEL[service.category] || "Operación y continuidad"}</Eyebrow>
                            </Reveal>

                            <Reveal delay={80}>
                                <h1 className="display-caps t-1 max-w-[18ch]">
                                    {service.name}
                                </h1>
                            </Reveal>

                            <Reveal delay={160}>
                                <p className="lead max-w-[60ch]">{service.description}</p>
                            </Reveal>
                        </div>

                        <Reveal delay={220} dir="right" className="lg:col-span-5">
                            <CutPanel cut="30px" className="p-8 lg:p-10 flex flex-col gap-6 lg:sticky lg:top-28">
                                <p className="display-xs text-[1.15rem] t-1">
                                    {service.proposition}
                                </p>

                                <div className="rule-accent w-full" />

                                <div className="flex flex-col gap-4">
                                    <span className="micro-label t-2">
                                        Este servicio es para ti si
                                    </span>
                                    <ul className="flex flex-col">
                                        {service.problems.map((problem, i) => (
                                            <li
                                                key={i}
                                                className="flex items-start gap-4 py-3.5 border-t bd-hair last:border-b last:bd-hair"
                                            >
                                                <span className="index-num micro-label t-accent pt-1 shrink-0">
                                                    {String(i + 1).padStart(2, "0")}
                                                </span>
                                                <span className="copy text-[0.88rem]">{problem}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </CutPanel>
                        </Reveal>
                    </div>
                </Container>
            </section>

            {/* Qué incluye */}
            <section className="w-full py-[var(--section-py)] bg-canvas-2 border-y bd-hair">
                <Container size="wide">
                    <Reveal>
                        <h2 className="display-caps t-1 max-w-[20ch]">
                            Qué incluye este servicio
                        </h2>
                    </Reveal>

                    <div className="mt-14 grid grid-cols-1 lg:grid-cols-2 gap-x-16">
                        {service.capabilities.map((cap, i) => (
                            <Reveal key={i} delay={i * 45} dir="none">
                                <div className="row group grid-cols-[3.5rem_minmax(0,1fr)] gap-x-6 py-6 items-center">
                                    <span className="index-num micro-label t-3 transition-colors duration-500 group-hover:t-accent">
                                        {String(i + 1).padStart(2, "0")}
                                    </span>
                                    <span className="text-[0.98rem] leading-relaxed t-1">
                                        {cap}
                                    </span>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </Container>
            </section>

            {/* Entregables */}
            <section className="w-full py-[var(--section-py)]">
                <Container size="wide">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
                        <div className="lg:col-span-5 flex flex-col gap-5">
                            <Reveal>
                                <h2 className="display-caps t-1">Entregables</h2>
                            </Reveal>
                            <Reveal delay={80}>
                                <p className="copy max-w-[42ch]">
                                    Al finalizar, recibes resultados concretos que puedes utilizar, revisar y
                                    evolucionar.
                                </p>
                            </Reveal>
                        </div>

                        <div className="lg:col-span-7 flex flex-col">
                            {service.deliverables.map((del, i) => (
                                <Reveal
                                    key={i}
                                    delay={i * 60}
                                    className="group flex items-center gap-5 py-5 border-t bd-hair last:border-b last:bd-hair"
                                >
                                    <span className="index-num micro-label t-3 shrink-0">
                                        {String(i + 1).padStart(2, "0")}
                                    </span>
                                    <span className="text-[0.98rem] t-1 flex-1">
                                        {del}
                                    </span>
                                    <Icon
                                        icon="lucide:arrow-right"
                                        className="w-4 h-4 t-accent opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500"
                                        aria-hidden="true"
                                    />
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </Container>
            </section>

            {/* Servicios relacionados */}
            {relatedServices.length > 0 && (
                <section className="w-full pb-[var(--section-py)]">
                    <Container size="wide">
                        <Reveal dir="none">
                            <div className="rule-section w-full" />
                        </Reveal>
                        <h2 className="display-sm t-1 pt-8">Servicios relacionados</h2>

                        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                            {relatedServices.map((rs, i) => (
                                <Reveal key={rs.slug} delay={i * 80}>
                                    <Panel to={`/servicios/${rs.slug}`} className="group flex items-start gap-5 p-7 h-full">
                                        <span className="grid place-items-center w-11 h-11 border bd t-accent shrink-0 transition-colors duration-500 group-hover:border-current">
                                            <Icon icon={rs.icon} className="w-5 h-5" aria-hidden="true" />
                                        </span>
                                        <span className="flex flex-col gap-2">
                                            <span className="display-xs text-[1.05rem] t-1 transition-colors duration-300 group-hover:t-accent">
                                                {rs.name}
                                            </span>
                                            <span className="copy text-[0.85rem]">{rs.shortDescription}</span>
                                        </span>
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
                        title={service.cta.text}
                        description="Cuéntanos tu situación y exploraremos juntos la mejor forma de avanzar."
                        buttonText="Cuéntanos tu idea"
                        buttonTo={service.cta.to}
                    />
                </Container>
            </div>
        </div>
    );
}
