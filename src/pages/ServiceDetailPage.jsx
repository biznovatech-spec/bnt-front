import { useSeo } from "../hooks/useSeo";
import { useParams } from "react-router-dom";
import { Icon } from "@iconify/react";
import Container from "../ui/container";
import Breadcrumb from "../ui/breadcrumb";
import CTASection from "../ui/cta-section";
import { getServiceBySlug, services } from "../data/services";
import { Link } from "react-router-dom";

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

    const relatedServices = services.filter(s => s.slug !== slug && s.category === service.category).slice(0, 2);

    return (
        <div className="w-full flex flex-col gap-16 lg:gap-24">
            <Container size="standard">
                <Breadcrumb items={[
                    { label: "Servicios", to: "/servicios" },
                    { label: service.name }
                ]} />

                {/* Hero */}
                <section className="flex flex-col lg:flex-row gap-12 pt-4 pb-8">
                    <div className="flex flex-col gap-6 lg:w-3/5">
                        <div className="flex items-center gap-3">
                            <Icon icon={service.icon} className="w-10 h-10 text-primary" />
                            <span className="text-sm font-bold tracking-widest text-t-secondary">
                                {service.category === "strategy" ? "ESTRATEGIA" :
                                 service.category === "products" ? "PRODUCTOS DIGITALES" :
                                 service.category === "experience" ? "EXPERIENCIA E INTELIGENCIA" :
                                 "OPERACIÓN Y CONTINUIDAD"}
                            </span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                            {service.name}
                        </h1>
                        <p className="text-lg text-t-secondary leading-relaxed">
                            {service.description}
                        </p>
                    </div>
                    <aside className="lg:w-2/5 bg-gray-50 rounded-2xl p-6 lg:p-8 flex flex-col gap-6 lg:sticky lg:top-24 self-start">
                        <p className="font-bold text-gray-900 text-lg">{service.proposition}</p>
                        <div className="h-px bg-gray-200" />
                        <div className="flex flex-col gap-3">
                            <span className="text-sm font-bold text-t-secondary tracking-widest">ESTE SERVICIO ES PARA TI SI</span>
                            {service.problems.map((problem, i) => (
                                <div key={i} className="flex items-start gap-3">
                                    <Icon icon="solar:check-circle-linear" className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                                    <span className="text-sm text-gray-700 leading-relaxed">{problem}</span>
                                </div>
                            ))}
                        </div>
                    </aside>
                </section>
            </Container>

            {/* Capabilities */}
            <section className="w-full bg-gray-50 py-16 border-y border-gray-100">
                <Container size="standard">
                    <div className="flex flex-col gap-8">
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Qué incluye este servicio</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {service.capabilities.map((cap, i) => (
                                <div key={i} className="flex items-start gap-3 p-4 bg-white rounded-xl border border-gray-100">
                                    <span className="text-primary font-bold text-sm mt-0.5">{String(i + 1).padStart(2, '0')}</span>
                                    <span className="text-sm text-gray-700 leading-relaxed">{cap}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </Container>
            </section>

            {/* Deliverables */}
            <Container size="standard">
                <div className="flex flex-col lg:flex-row gap-12">
                    <div className="lg:w-1/2 flex flex-col gap-6">
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Entregables</h2>
                        <p className="text-t-secondary leading-relaxed">Al finalizar, recibes resultados concretos que puedes utilizar, revisar y evolucionar.</p>
                    </div>
                    <div className="lg:w-1/2 flex flex-col gap-4">
                        {service.deliverables.map((del, i) => (
                            <div key={i} className="flex items-center gap-4 p-4 border-l-2 border-primary/30">
                                <Icon icon="solar:document-linear" className="w-5 h-5 text-primary shrink-0" />
                                <span className="text-gray-700">{del}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </Container>

            {/* Related services */}
            {relatedServices.length > 0 && (
                <Container size="standard">
                    <div className="border-t border-gray-100 pt-12 flex flex-col gap-8">
                        <h2 className="text-xl font-bold text-gray-900">Servicios relacionados</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {relatedServices.map(rs => (
                                <Link key={rs.slug} to={`/servicios/${rs.slug}`} className="flex items-start gap-4 p-5 rounded-xl border border-gray-100 hover:border-primary/30 transition-all group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                                    <Icon icon={rs.icon} className="w-7 h-7 text-primary shrink-0" />
                                    <div>
                                        <h3 className="font-bold text-gray-900 group-hover:text-primary transition-colors">{rs.name}</h3>
                                        <p className="text-sm text-t-secondary mt-1">{rs.shortDescription}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </Container>
            )}

            <Container size="standard">
                <CTASection
                    title={service.cta.text}
                    description="Cuéntanos tu situación y exploraremos juntos la mejor forma de avanzar."
                    buttonText="Cuéntanos tu idea"
                    buttonTo={service.cta.to}
                />
            </Container>
        </div>
    );
}
