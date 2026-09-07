import { useSeo } from "../hooks/useSeo";
import { useEffect, useRef } from "react";
import Hero from "../components/hero";
import AudienceSection from "../components/AudienceSection";
import Technologies from "../components/technologies";
import Services from "../components/services";
import Process from "../components/process";
import Project from "../components/project";
import WhyBiznovatechSection from "../components/WhyBiznovatechSection";
import { CTASection, Container } from "../ui";
import { useHeader } from "../context/HeaderContext";

export default function Home() {
    useSeo({
        title: "Biznovatech",
        exactTitle: true,
        description: "Analizamos, diseñamos y desarrollamos soluciones digitales a medida para convertir ideas y desafíos reales en productos funcionales, seguros y preparados para crecer."
    });

    const { setIsHeroVisible } = useHeader();
    const heroRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsHeroVisible(entry.isIntersecting);
            },
            { root: null, rootMargin: "0px", threshold: 0.15 }
        );

        const currentRef = heroRef.current;
        if (currentRef) observer.observe(currentRef);

        return () => {
            if (currentRef) observer.unobserve(currentRef);
            setIsHeroVisible(false);
        };
    }, [setIsHeroVisible]);

    return (
        <div className="w-full flex flex-col bg-canvas">
            {/* El hero pasa por debajo de la barra fija: se anula el offset del layout */}
            <div ref={heroRef} className="-mt-[var(--header-compact-height)]">
                <Hero />
            </div>

            <AudienceSection />
            <Services />
            <Process />
            <Technologies />
            <Project />
            <WhyBiznovatechSection />

            <div className="pb-[var(--section-py)]">
                <Container size="wide">
                    <CTASection
                        title="¿Estás listo para dar el siguiente paso?"
                        description="Cuéntanos sobre tu idea, tu proceso manual o el sistema que necesitas mejorar."
                        buttonText="Cuéntanos tu idea"
                        buttonTo="/contacto"
                    />
                </Container>
            </div>
        </div>
    );
}
