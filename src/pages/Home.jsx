import { useSeo } from "../hooks/useSeo";
import { Icon } from "@iconify/react";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Hero from "../components/hero";
import Technologies from "../components/technologies";
import Services from "../components/services";
import Process from "../components/process";
import Project from "../components/project";
import Container from "../ui/container";
import SectionHeader from "../ui/section-header";
import CTASection from "../ui/cta-section";
import { useHeader } from "../context/HeaderContext";
import { audienceCards, whyValues } from "../data/hero";


export default function Home() {
    useSeo({
        title: "Inicio",
        description: "Analizamos, diseñamos y desarrollamos soluciones digitales a medida para convertir ideas y desafíos reales en productos funcionales, seguros y preparados para crecer."
    });

    const { setIsHeroVisible } = useHeader();
    const heroRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsHeroVisible(entry.isIntersecting);
            },
            {
                root: null,
                rootMargin: "0px",
                threshold: 0.15, // Switch when at least 15% is visible
            }
        );

        const currentRef = heroRef.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
            setIsHeroVisible(false); // Reset on unmount
        };
    }, [setIsHeroVisible]);

    return (
        <div className="w-full flex flex-col gap-0">
            {/* Hero */}
            <div ref={heroRef}>
                <Container size="wide">
                    <Hero />
                </Container>
            </div>

            {/* Para quién construimos */}
            <section className="w-full bg-gray-50 py-16">
                <Container size="wide">
                    <div className="flex flex-col gap-10">
                        <SectionHeader
                            label="PARA QUIÉN CONSTRUIMOS"
                            title="Acompañamos tu proyecto sin importar la etapa"
                            description="No importa si partes de una idea inicial, de un proceso manual o de un sistema en funcionamiento. Analizamos tu situación para diseñar una solución adecuada."
                        />
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
                            {audienceCards.map((item, index) => (
                                <Link
                                    key={item.title}
                                    to={item.to}
                                    className={`group relative flex min-h-64 flex-col overflow-hidden rounded-xl border border-gray-200 bg-white p-6 transition-[transform,border-color] duration-200 hover:-translate-y-1 hover:border-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 motion-reduce:transform-none motion-reduce:transition-none ${index < 3 ? "lg:col-span-2" : "lg:col-span-3"}`}
                                    aria-label={`${item.title}: ${item.action}`}
                                >
                                    <span className="flex h-12 w-12 items-center justify-center rounded-lg border border-gray-200 bg-gray-50 text-primary transition-[transform,border-color] duration-200 group-hover:translate-x-1 group-hover:border-primary/30 group-focus-visible:translate-x-1 motion-reduce:transform-none motion-reduce:transition-none">
                                        <Icon icon={item.icon} className="h-7 w-7" aria-hidden="true" />
                                    </span>
                                    <h3 className="mt-5 font-bold text-gray-900">{item.title}</h3>
                                    <p className="mt-3 text-sm leading-relaxed text-t-secondary">{item.text}</p>
                                    <span className="mt-auto flex items-center gap-2 pt-6 text-sm font-semibold text-primary opacity-100 transition-opacity duration-200 lg:opacity-0 lg:group-hover:opacity-100 lg:group-focus-visible:opacity-100 motion-reduce:transition-none">
                                        {item.action}
                                        <Icon icon="solar:arrow-right-linear" className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1 group-focus-visible:translate-x-1 motion-reduce:transform-none motion-reduce:transition-none" aria-hidden="true" />
                                    </span>
                                    <span className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-primary transition-transform duration-200 group-hover:scale-x-100 group-focus-visible:scale-x-100 motion-reduce:transition-none" aria-hidden="true" />
                                </Link>
                            ))}
                        </div>
                        <div className="flex flex-col items-start gap-2 border-t border-gray-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
                            <p className="text-sm text-t-secondary">¿No estás seguro de qué opción se ajusta a tu caso?</p>
                            <Link to="/contacto" className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-primary underline-offset-4 hover:underline focus-visible:rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">
                                Conversemos y lo analizamos contigo
                                <Icon icon="solar:arrow-right-linear" className="h-4 w-4" aria-hidden="true" />
                            </Link>
                        </div>
                    </div>
                </Container>
            </section>

            {/* Servicios */}
            <Container size="wide">
                <Services />
            </Container>

            {/* Proceso */}
            <Container size="wide">
                <Process />
            </Container>

            {/* Tecnologías marquee */}
            <Technologies />

            {/* Proyectos destacados */}
            <Container size="wide">
                <Project />
            </Container>

            {/* Por qué Biznovatech — Rediseñado en fondo claro */}
            <section className="w-full py-20 border-t border-gray-100">
                <Container size="wide">
                    <div className="flex flex-col gap-16">
                        <div className="max-w-2xl">
                            <span className="text-xs font-bold tracking-[0.2em] text-primary uppercase">Por qué Biznovatech</span>
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mt-4">
                                Un proyecto no empieza con código.{" "}
                                <span className="text-t-secondary font-normal">Empieza entendiendo lo que necesitas resolver.</span>
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                            {whyValues.map((item) => (
                                <div key={item.step} className="flex gap-5 group">
                                    <div className="flex flex-col items-center shrink-0">
                                        <div className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center group-hover:border-primary/40 transition-colors">
                                            <Icon icon={item.icon} className="w-5 h-5 text-primary" />
                                        </div>
                                        <div className="w-px flex-1 bg-gray-200 mt-3 hidden md:block"></div>
                                    </div>
                                    <div className="flex flex-col gap-2 pb-2">
                                        <span className="text-xs font-bold text-primary tracking-wider">{item.step}</span>
                                        <h3 className="text-lg font-bold text-gray-900">{item.title}</h3>
                                        <p className="text-sm text-t-secondary leading-relaxed">{item.text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </Container>
            </section>

            {/* CTA final */}
            <Container size="standard">
                <CTASection
                    title="¿Estás listo para dar el siguiente paso?"
                    description="Cuéntanos sobre tu idea, tu proceso manual o el sistema que necesitas mejorar."
                    buttonText="Cuéntanos tu idea"
                    buttonTo="/contacto"
                />
            </Container>
        </div>
    );
}
