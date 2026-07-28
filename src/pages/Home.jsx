import { useSeo } from "../hooks/useSeo";
import { Icon } from "@iconify/react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
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
    const [activeAudience, setActiveAudience] = useState(0);

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

    const sectionVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
    };

    return (
        <div className="w-full flex flex-col gap-0">
            {/* Hero */}
            <div ref={heroRef}>
                <Container size="wide">
                    <Hero />
                </Container>
            </div>

            {/* Para quién construimos */}
            <motion.section 
                variants={sectionVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="w-full py-16"
            >
                <Container size="wide">
                    <div className="flex flex-col gap-10">
                        <SectionHeader
                            label="PARA QUIÉN CONSTRUIMOS"
                            title="Acompañamos tu proyecto sin importar la etapa"
                            description="No importa si partes de una idea inicial, de un proceso manual o de un sistema en funcionamiento. Analizamos tu situación para diseñar una solución adecuada."
                        />
                        <div className="flex flex-col md:flex-row w-full border border-gray-200 bg-white">
                            {/* Left Column: Tabs */}
                            <div className="w-full md:w-1/3 lg:w-[35%] flex flex-col border-b md:border-b-0 md:border-r border-gray-200">
                                {audienceCards.map((item, index) => {
                                    const isActive = activeAudience === index;
                                    return (
                                        <button
                                            key={item.title}
                                            onClick={() => setActiveAudience(index)}
                                            className={`relative flex items-center w-full px-6 py-6 text-left border-b border-gray-200 last:border-b-0 transition-colors ${
                                                isActive ? "bg-gray-50" : "hover:bg-gray-50/50"
                                            }`}
                                        >
                                            {isActive && (
                                                <motion.div layoutId="activeTabIndicator" className="absolute inset-0 pointer-events-none">
                                                    <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-gray-900"></div>
                                                    <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-gray-900"></div>
                                                    <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-gray-900"></div>
                                                    <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-gray-900"></div>
                                                </motion.div>
                                            )}
                                            <span className={`text-base ${isActive ? "font-bold text-gray-900" : "font-medium text-gray-600"}`}>
                                                {item.title}
                                            </span>
                                        </button>
                                    );
                                })}
                            </div>

                            {/* Right Column: Content */}
                            <div className="w-full md:w-2/3 lg:w-[65%] p-8 md:p-12 bg-gray-50/50 flex flex-col justify-center">
                                <motion.div
                                    key={activeAudience}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                                        {audienceCards[activeAudience].title}
                                    </h3>
                                    <p className="text-gray-600 leading-relaxed mb-10 max-w-2xl text-lg">
                                        {audienceCards[activeAudience].text}
                                    </p>
                                    
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-auto">
                                        <Link 
                                            to={audienceCards[activeAudience].to}
                                            className="group flex items-start gap-3 text-base font-semibold text-gray-900 hover:text-primary transition-colors"
                                        >
                                            <span className="flex-1">{audienceCards[activeAudience].action}</span>
                                            <Icon icon="solar:arrow-right-up-linear" className="w-5 h-5 shrink-0 mt-0.5" />
                                        </Link>
                                    </div>
                                </motion.div>
                            </div>
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
            </motion.section>

            {/* Servicios */}
            <motion.div 
                variants={sectionVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
            >
                <Container size="wide">
                    <Services />
                </Container>
            </motion.div>

            {/* Proceso */}
            <motion.div 
                variants={sectionVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
            >
                <Container size="wide">
                    <Process />
                </Container>
            </motion.div>

            {/* Tecnologías marquee */}
            <Technologies />

            {/* Proyectos destacados */}
            <motion.div 
                variants={sectionVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
            >
                <Container size="wide">
                    <Project />
                </Container>
            </motion.div>

            {/* Por qué Biznovatech */}
            <motion.section 
                variants={sectionVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="w-full py-20 border-t border-gray-100"
            >
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
                            {whyValues.map((item, index) => (
                                <motion.div 
                                    key={item.step} 
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1, duration: 0.5 }}
                                    className="flex gap-5 group"
                                >
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
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </Container>
            </motion.section>

            {/* CTA final */}
            <motion.div 
                variants={sectionVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
            >
                <Container size="standard">
                    <CTASection
                        title="¿Estás listo para dar el siguiente paso?"
                        description="Cuéntanos sobre tu idea, tu proceso manual o el sistema que necesitas mejorar."
                        buttonText="Cuéntanos tu idea"
                        buttonTo="/contacto"
                    />
                </Container>
            </motion.div>
        </div>
    );
}
