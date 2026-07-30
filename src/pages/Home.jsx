import { useSeo } from "../hooks/useSeo";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Hero from "../components/hero";
import AudienceSection from "../components/AudienceSection";
import Technologies from "../components/technologies";
import Services from "../components/services";
import Process from "../components/process";
import Project from "../components/project";
import WhyBiznovatechSection from "../components/WhyBiznovatechSection";
import Container from "../ui/container";
import CTASection from "../ui/cta-section";
import { useHeader } from "../context/HeaderContext";


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
            <AudienceSection variants={sectionVariants} />

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
            <WhyBiznovatechSection variants={sectionVariants} />

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

