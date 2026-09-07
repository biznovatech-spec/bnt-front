import { useSeo } from "../hooks/useSeo";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import { Breadcrumb, CTASection, Container, CutPanel, Eyebrow, Reveal, SectionHeader } from "../ui";
import { getGeneratedImage } from "../data/generatedImages";
import { services, serviceCategories, getServicesByCategory } from "../data/services";

export default function ServiciosPage() {
    useSeo({
        title: "Servicios",
        description: "Encuentra el servicio adecuado para tu proyecto. Ofrecemos desde consultoría inicial hasta soporte continuo para que avances con confianza."
    });

    const heroImage = getGeneratedImage("services-editorial");
    const featured = services.filter((s) => s.priority <= 3).sort((a, b) => a.priority - b.priority);

    return (
        <div className="w-full flex flex-col">
            <Container size="wide">
                <Breadcrumb items={[{ label: "Servicios" }]} />
            </Container>

            {/* Portada */}
            <section className="w-full pt-10 pb-[var(--section-py)]">
                <Container size="wide">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
                        <div className="lg:col-span-7 flex flex-col gap-8">
                            <SectionHeader
                                label="Servicios"
                                title="Encuentra el servicio adecuado para tu proyecto"
                                description="Cada proyecto tiene necesidades diferentes. Ofrecemos servicios que cubren desde la consultoría inicial hasta el soporte continuo, para que puedas avanzar con confianza en cada etapa."
                                as="h1"
                            />

                            {heroImage && (
                                <Reveal delay={200} dir="scale" className="mt-2 relative">
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

                        <div className="lg:col-span-5 flex flex-col gap-5 lg:pt-16">
                            <Reveal dir="none">
                                <Eyebrow tone="muted">Servicios destacados</Eyebrow>
                            </Reveal>

                            <div className="flex flex-col border-t bd-hair">
                                {featured.map((service, i) => (
                                    <Reveal key={service.slug} delay={i * 70} dir="right" className="border-b bd-hair">
                                        <Link
                                            to={`/servicios/${service.slug}`}
                                            className="group flex items-start gap-5 py-5 transition-[padding] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:pl-3"
                                        >
                                            <span className="grid place-items-center w-11 h-11 border bd t-accent shrink-0 transition-colors duration-500 group-hover:border-current">
                                                <Icon icon={service.icon} className="w-5 h-5" aria-hidden="true" />
                                            </span>
                                            <span className="flex flex-col gap-1.5">
                                                <span className="display-caps text-[0.98rem] t-1 transition-colors duration-300 group-hover:t-accent">
                                                    {service.name}
                                                </span>
                                                <span className="copy text-[0.85rem]">{service.shortDescription}</span>
                                            </span>
                                        </Link>
                                    </Reveal>
                                ))}
                            </div>
                        </div>
                    </div>
                </Container>
            </section>

            {/* Categorías */}
            {serviceCategories.map((category, catIndex) => {
                const categoryServices = getServicesByCategory(category.id);
                if (categoryServices.length === 0) return null;

                return (
                    <section
                        key={category.id}
                        className={`w-full py-[var(--section-py)] ${
                            catIndex % 2 === 0 ? "bg-canvas-2 border-y bd-hair" : ""
                        }`}
                    >
                        <Container size="wide">
                            <SectionHeader
                                label={category.name}
                                index={String(catIndex + 1).padStart(2, "0")}
                                title={category.description}
                            />

                            <div className="mt-14">
                                {categoryServices.map((service, i) => (
                                    <Reveal key={service.slug} delay={i * 60} dir="none">
                                        <Link
                                            to={`/servicios/${service.slug}`}
                                            className="row group grid-cols-[auto_1fr] md:grid-cols-[3.5rem_minmax(0,1fr)_minmax(0,1.2fr)_auto] gap-x-6 gap-y-2 py-7 md:py-8"
                                        >
                                            <span className="index-num micro-label t-3 self-center transition-colors duration-500 group-hover:t-accent">
                                                {String(i + 1).padStart(2, "0")}
                                            </span>

                                            <span className="flex items-center gap-4 min-w-0">
                                                <Icon
                                                    icon={service.icon}
                                                    className="w-5 h-5 shrink-0 t-3 transition-colors duration-500 group-hover:t-accent"
                                                    aria-hidden="true"
                                                />
                                                <h3 className="display-caps text-[clamp(1rem,1.4vw,1.5rem)] t-1 transition-colors duration-500 group-hover:t-accent">
                                                    {service.name}
                                                </h3>
                                            </span>

                                            <span className="copy text-[0.9rem] col-span-2 md:col-span-1 md:self-center pl-9 md:pl-0">
                                                {service.shortDescription}
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
            })}

            <div className="py-[var(--section-py)]">
                <Container size="wide">
                    <CTASection
                        title="¿No sabes por dónde empezar?"
                        description="Cuéntanos tu situación y te ayudamos a identificar qué servicio se adapta mejor a tus necesidades."
                        buttonText="Cuéntanos tu idea"
                        buttonTo="/contacto"
                    />
                </Container>
            </div>
        </div>
    );
}
