import { useSeo } from "../hooks/useSeo";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import Container from "../ui/container";
import SectionHeader from "../ui/section-header";
import Breadcrumb from "../ui/breadcrumb";
import CTASection from "../ui/cta-section";
import { getGeneratedImage } from "../data/generatedImages";
import { services, serviceCategories, getServicesByCategory } from "../data/services";

export default function ServiciosPage() {
    useSeo({
        title: "Servicios",
        description: "Encuentra el servicio adecuado para tu proyecto. Ofrecemos desde consultoría inicial hasta soporte continuo para que avances con confianza."
    });

    const heroImage = getGeneratedImage("services-editorial");

    return (
        <div className="w-full flex flex-col gap-16 lg:gap-24">
            <Container size="standard">
                <Breadcrumb items={[{ label: "Servicios" }]} />
                <section className="flex flex-col lg:flex-row gap-12 lg:gap-16 pt-4 pb-8">
                    <div className="flex flex-col gap-6 lg:w-1/2">
                        <SectionHeader
                            label="SERVICIOS"
                            title="Encuentra el servicio adecuado para tu proyecto"
                            as="h1"
                        />
                        <p className="text-t-secondary text-lg leading-relaxed">
                            Cada proyecto tiene necesidades diferentes. Ofrecemos servicios que cubren desde la consultoría inicial hasta el soporte continuo, para que puedas avanzar con confianza en cada etapa.
                        </p>
                        {heroImage && (
                            <div className="mt-8 relative rounded-2xl overflow-hidden   p-8 flex items-center justify-center">
                                <img src={heroImage.filename} alt={heroImage.alt} className="w-full max-w-sm object-contain animate-fade-in zoom-125" loading="eager" />
                            </div>
                        )}
                    </div>
                    <div className="lg:w-1/2 flex flex-col gap-4 lg:pt-8">
                        <p className="text-sm font-bold tracking-widest text-t-secondary">SERVICIOS DESTACADOS</p>
                        {services.filter(s => s.priority <= 3).sort((a, b) => a.priority - b.priority).map(service => (
                            <Link
                                key={service.slug}
                                to={`/servicios/${service.slug}`}
                                className="flex items-start gap-4 p-4 rounded-xl border border-gray-100 hover:border-primary/30 hover:bg-white transition-all group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                            >
                                <Icon icon={service.icon} className="w-8 h-8 text-primary shrink-0 mt-0.5" />
                                <div className="flex flex-col gap-1">
                                    <span className="font-bold text-gray-900 group-hover:text-primary transition-colors">{service.name}</span>
                                    <span className="text-sm text-t-secondary leading-relaxed">{service.shortDescription}</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>
            </Container>

            {serviceCategories.map(category => {
                const categoryServices = getServicesByCategory(category.id);
                if (categoryServices.length === 0) return null;
                return (
                    <section key={category.id} className="w-full">
                        <Container size="standard">
                            <div className="border-t border-gray-100 pt-12">
                                <div className="flex flex-col gap-2 mb-10">
                                    <span className="text-primary font-bold text-sm tracking-widest">{category.name.toUpperCase()}</span>
                                    <p className="text-t-secondary text-lg">{category.description}</p>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {categoryServices.map(service => (
                                        <Link
                                            key={service.slug}
                                            to={`/servicios/${service.slug}`}
                                            className="flex flex-col gap-4 p-6 rounded-xl border border-gray-100 hover:border-primary/30 hover:shadow-sm transition-all group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                                        >
                                            <div className="flex items-center gap-3">
                                                <Icon icon={service.icon} className="w-7 h-7 text-primary" />
                                                <h3 className="font-bold text-lg text-gray-900 group-hover:text-primary transition-colors">{service.name}</h3>
                                            </div>
                                            <p className="text-t-secondary text-sm leading-relaxed">{service.shortDescription}</p>
                                            <span className="text-primary text-sm font-semibold flex items-center gap-1.5 mt-auto">
                                                Conocer más
                                                <Icon icon="solar:arrow-up-linear" className="w-4 h-4 rotate-45" />
                                            </span>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </Container>
                    </section>
                );
            })}

            <Container size="standard">
                <CTASection
                    title="¿No sabes por dónde empezar?"
                    description="Cuéntanos tu situación y te ayudamos a identificar qué servicio se adapta mejor a tus necesidades."
                    buttonText="Cuéntanos tu idea"
                    buttonTo="/contacto"
                    variant="dark"
                />
            </Container>
        </div>
    );
}
