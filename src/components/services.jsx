import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import { Container, Reveal, SectionHeader } from "../ui";
import { serviceShowcase } from "../utils/services";

/**
 * Servicios: índice editorial en filas, no una rejilla de tarjetas iguales.
 *
 * Cada fila es un renglón de catálogo — número, nombre en versalitas, una línea
 * de descripción y la flecha — con una barra de acento que crece desde el
 * margen al pasar el cursor.
 */
export default function Services() {
    return (
        <section className="w-full py-[var(--section-py)] bg-canvas" id="services">
            <Container size="wide">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
                    <div className="lg:col-span-8">
                        <SectionHeader
                            label="Nuestros servicios"
                            index="01"
                            title="Soluciones digitales a la medida de tu negocio"
                        />
                    </div>
                    <Reveal delay={120} className="lg:col-span-4 lg:pb-2">
                        <p className="copy max-w-[42ch]">
                            Combinamos estrategia, tecnología y creatividad para desarrollar soluciones que
                            generan impacto real en un entorno digital exigente.
                        </p>
                    </Reveal>
                </div>

                <div className="mt-16">
                    {serviceShowcase.map((item, index) => (
                        <Reveal key={item.title} delay={index * 60} dir="none">
                            <Link
                                to={item.to}
                                className="row group grid-cols-[auto_1fr] md:grid-cols-[3.5rem_minmax(0,1fr)_minmax(0,1.1fr)_auto] gap-x-6 gap-y-2 py-7 md:py-8"
                            >
                                <span className="index-num micro-label t-3 self-center transition-colors duration-500 group-hover:t-accent">
                                    {String(index + 1).padStart(2, "0")}
                                </span>

                                <span className="flex items-center gap-4 min-w-0">
                                    <Icon
                                        icon={item.icon}
                                        className="w-5 h-5 shrink-0 t-3 transition-colors duration-500 group-hover:t-accent"
                                        aria-hidden="true"
                                    />
                                    <span className="display-caps text-[clamp(1.05rem,1.5vw,1.6rem)] t-1 transition-colors duration-500 group-hover:t-accent">
                                        {item.title}
                                    </span>
                                </span>

                                <span className="copy text-[0.9rem] col-span-2 md:col-span-1 md:self-center pl-9 md:pl-0">
                                    {item.text}
                                </span>

                                <span className="hidden md:grid place-items-center w-10 h-10 border border-transparent t-3 self-center transition-all duration-500 group-hover:bd group-hover:t-accent">
                                    <Icon icon="lucide:arrow-right" className="w-4 h-4 arrow-shift" aria-hidden="true" />
                                </span>
                            </Link>
                        </Reveal>
                    ))}

                    {/* Último renglón: acceso al catálogo completo */}
                    <Reveal delay={serviceShowcase.length * 60} dir="none">
                        <Link
                            to="/servicios"
                            className="row group grid-cols-[auto_1fr] md:grid-cols-[3.5rem_minmax(0,1fr)_auto] gap-x-6 py-7 md:py-8"
                        >
                            <span className="index-num micro-label t-accent self-center">
                                {String(serviceShowcase.length + 1).padStart(2, "0")}
                            </span>
                            <span className="display-caps text-[clamp(1.05rem,1.5vw,1.6rem)] t-accent self-center">
                                Ver todos los servicios
                            </span>
                            <span className="hidden md:grid place-items-center w-10 h-10 border bd t-accent self-center">
                                <Icon icon="lucide:arrow-right" className="w-4 h-4 arrow-shift" aria-hidden="true" />
                            </span>
                        </Link>
                    </Reveal>
                </div>
            </Container>
        </section>
    );
}
