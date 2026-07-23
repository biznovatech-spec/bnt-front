import { useSeo } from "../hooks/useSeo";
import { useParams, Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import Container from "../ui/container";
import Breadcrumb from "../ui/breadcrumb";
import CTASection from "../ui/cta-section";
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

    const related = services.filter(s => solution.relatedServices.includes(s.slug));

    return (
        <div className="w-full flex flex-col gap-16 lg:gap-24">
            <Container size="standard">
                <Breadcrumb items={[
                    { label: "Soluciones", to: "/soluciones" },
                    { label: solution.title }
                ]} />

                <section className="flex flex-col lg:flex-row gap-12 pt-4">
                    <div className="lg:w-3/5 flex flex-col gap-6">
                        <div className="flex items-center gap-3">
                            <Icon icon={solution.icon} className="w-8 h-8 text-primary" />
                            <span className="text-sm font-bold tracking-widest text-t-secondary">SOLUCIÓN</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                            {solution.title}
                        </h1>
                        <p className="text-lg text-t-secondary leading-relaxed">{solution.description}</p>
                    </div>
                    <aside className="lg:w-2/5 bg-primary/5 rounded-2xl p-6 lg:p-8 flex flex-col gap-5 self-start border border-primary/10">
                        <p className="text-primary font-semibold italic text-lg">&ldquo;{solution.situation}&rdquo;</p>
                        <div className="h-px bg-primary/10" />
                        <span className="text-sm font-bold text-gray-900 tracking-widest">¿TE IDENTIFICAS?</span>
                        {solution.signals.map((signal, i) => (
                            <div key={i} className="flex items-start gap-3">
                                <Icon icon="solar:danger-triangle-linear" className="w-4 h-4 text-primary shrink-0 mt-1" />
                                <span className="text-sm text-gray-700 leading-relaxed">{signal}</span>
                            </div>
                        ))}
                    </aside>
                </section>
            </Container>

            <section className="w-full bg-gray-50 py-16 border-y border-gray-100">
                <Container size="standard">
                    <div className="flex flex-col gap-6">
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Nuestro enfoque</h2>
                        <p className="text-t-secondary text-lg leading-relaxed max-w-3xl">{solution.approach}</p>
                    </div>
                    <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {solution.benefits.map((benefit, i) => (
                            <div key={i} className="flex items-start gap-3 p-4 bg-white rounded-xl border border-gray-100">
                                <Icon icon="solar:check-circle-linear" className="w-5 h-5 text-success shrink-0 mt-0.5" />
                                <span className="text-sm text-gray-700 leading-relaxed">{benefit}</span>
                            </div>
                        ))}
                    </div>
                </Container>
            </section>

            {related.length > 0 && (
                <Container size="standard">
                    <div className="flex flex-col gap-8">
                        <h2 className="text-xl font-bold text-gray-900">Servicios que intervienen</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {related.map(s => (
                                <Link key={s.slug} to={`/servicios/${s.slug}`} className="flex items-start gap-3 p-4 rounded-xl border border-gray-100 hover:border-primary/30 transition-all group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                                    <Icon icon={s.icon} className="w-6 h-6 text-primary shrink-0" />
                                    <div>
                                        <h3 className="font-bold text-sm text-gray-900 group-hover:text-primary transition-colors">{s.name}</h3>
                                        <p className="text-xs text-t-secondary mt-1">{s.shortDescription}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </Container>
            )}

            <Container size="standard">
                <CTASection
                    title={solution.cta.text}
                    description="Cuéntanos tu contexto y exploraremos juntos cómo resolverlo."
                    buttonText="Cuéntanos tu idea"
                    buttonTo={solution.cta.to}
                />
            </Container>
        </div>
    );
}
