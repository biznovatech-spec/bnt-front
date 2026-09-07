import { useSeo } from "../hooks/useSeo";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import { getGeneratedImage } from "../data/generatedImages";
import { Container, CutPanel, Eyebrow, Reveal } from "../ui";
export default function NotFound() {
    useSeo({
        title: "Página no encontrada",
        description: "La página que buscas no existe o ha sido movida.",
        preventIndex: true
    });

    const heroImage = getGeneratedImage("notfound-editorial");

    return (
        <section className="relative w-full min-h-[72vh] flex items-center overflow-hidden">
            <div
                aria-hidden="true"
                className="deco absolute inset-0 grid-hairline grid-fade opacity-70"
                style={{ "--cell": "clamp(56px, 6vw, 104px)" }}
            />

            <Container size="wide" className="relative z-10 py-[var(--section-py)]">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
                    <div className="lg:col-span-7 flex flex-col gap-7">
                        <Reveal dir="none" className="flex items-center gap-6">
                            <span aria-hidden="true" className="ghost-num text-[clamp(3.5rem,9vw,8rem)]">
                                404
                            </span>
                            <Eyebrow>Error</Eyebrow>
                        </Reveal>

                        <Reveal delay={80}>
                            <h1 className="display-mega t-1 max-w-[14ch]">
                                Página no encontrada
                            </h1>
                        </Reveal>

                        <Reveal delay={160}>
                            <p className="lead max-w-[52ch]">
                                Lo sentimos, la página que estás buscando no existe, ha sido movida o está
                                temporalmente inaccesible.
                            </p>
                        </Reveal>

                        <Reveal delay={240} className="flex flex-col sm:flex-row gap-4">
                            <Link to="/" className="btn btn-primary group">
                                Volver al inicio
                                <Icon icon="lucide:arrow-right" className="w-4 h-4 arrow-shift" aria-hidden="true" />
                            </Link>
                            <Link to="/contacto" className="btn btn-outline group">
                                Contactar soporte
                                <Icon icon="lucide:arrow-up-right" className="w-4 h-4 arrow-shift" aria-hidden="true" />
                            </Link>
                        </Reveal>
                    </div>

                    {heroImage && (
                        <Reveal delay={200} dir="scale" className="lg:col-span-5">
                            <CutPanel surface="plate" cut="34px" className="p-10 flex items-center justify-center">
                                <img
                                    src={heroImage.filename}
                                    alt={heroImage.alt}
                                    className="w-full max-w-xs object-contain"
                                />
                            </CutPanel>
                        </Reveal>
                    )}
                </div>
            </Container>
        </section>
    );
}
