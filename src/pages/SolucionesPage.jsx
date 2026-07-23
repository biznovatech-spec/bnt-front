import { useSeo } from "../hooks/useSeo";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import Container from "../ui/container";
import SectionHeader from "../ui/section-header";
import Breadcrumb from "../ui/breadcrumb";
import CTASection from "../ui/cta-section";
import { getGeneratedImage } from "../data/generatedImages";
import { solutions } from "../data/solutions";

export default function SolucionesPage() {
    useSeo({
        title: "Soluciones",
        description: "Encuentra soluciones a medida para tu situación: desde automatización de tareas hasta modernización de software."
    });

    const heroImage = getGeneratedImage("solutions-editorial");

    return (
        <div className="w-full flex flex-col gap-16 lg:gap-24">
            <Container size="standard">
                <Breadcrumb items={[{ label: "Soluciones" }]} />
                <section className="flex flex-col gap-8 pt-4 pb-8">
                    <div className="flex flex-col lg:flex-row gap-12 items-center">
                        <div className="lg:w-1/2">
                            <SectionHeader
                                label="SOLUCIONES"
                                title="¿Qué necesitas resolver?"
                                description="No importa si partes de una idea inicial, de un proceso manual o de un sistema que necesita mejorar. Identifica tu situación y descubre cómo podemos acompañarte."
                                as="h1"
                            />
                        </div>
                        {heroImage && (
                            <div className="lg:w-1/2 flex justify-center lg:justify-end">
                                <div className="rounded-2xl overflow-hidden bg-gray-50 border border-gray-100 p-8 flex items-center justify-center max-w-sm w-full">
                                    <img src={heroImage.filename} alt={heroImage.alt} className="w-full object-contain animate-fade-in" loading="eager" />
                                </div>
                            </div>
                        )}
                    </div>
                </section>
            </Container>

            <Container size="standard">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {solutions.map((solution, index) => (
                        <Link
                            key={solution.slug}
                            to={`/soluciones/${solution.slug}`}
                            className="flex flex-col gap-5 p-6 lg:p-8 rounded-2xl border border-gray-100 hover:border-primary/30 hover:shadow-sm transition-all group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                                    <Icon icon={solution.icon} className="w-5 h-5 text-primary" />
                                </div>
                                <span className="text-xs font-bold text-t-secondary tracking-widest">
                                    {String(index + 1).padStart(2, '0')}
                                </span>
                            </div>
                            <h2 className="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors">{solution.title}</h2>
                            <p className="text-sm text-primary font-medium italic">&ldquo;{solution.situation}&rdquo;</p>
                            <p className="text-t-secondary text-sm leading-relaxed flex-1">{solution.description.slice(0, 200)}...</p>
                            <span className="text-primary text-sm font-semibold flex items-center gap-1.5 mt-auto">
                                Explorar solución
                                <Icon icon="solar:arrow-up-linear" className="w-4 h-4 rotate-45" />
                            </span>
                        </Link>
                    ))}
                </div>
            </Container>

            <Container size="standard">
                <CTASection
                    title="¿No encuentras tu situación?"
                    description="Cada proyecto es diferente. Cuéntanos tu contexto y te orientamos hacia la solución adecuada."
                    buttonText="Cuéntanos tu situación"
                    buttonTo="/contacto"
                    variant="dark"
                />
            </Container>
        </div>
    );
}
