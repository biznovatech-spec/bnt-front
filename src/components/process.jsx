import { useState } from "react";
import { ProcessText } from "../utils/process";
import { Container, Reveal, SectionHeader } from "../ui";
/**
 * Proceso: banda de cinco columnas separadas por filetes verticales que
 * recorren toda la altura. Cada fase se anuncia con su número a gran escala;
 * la columna activa lo pasa a sólido y enciende la regla superior.
 */
export default function Process() {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <section className="w-full py-[var(--section-py)] bg-canvas-2" id="process">
            <Container size="wide">
                <SectionHeader
                    label="Cómo trabajamos"
                    index="02"
                    title="Un proceso claro para resultados reales"
                />
            </Container>

            <div className="mt-16 w-full max-w-[var(--shell-max)] mx-auto px-[var(--gutter)]">
                <div className="band grid-cols-1 md:grid-cols-5">
                    {ProcessText.map((item, index) => {
                        const isActive = activeIndex === index;
                        return (
                            <Reveal
                                key={item.id}
                                as="button"
                                dir="none"
                                delay={index * 70}
                                type="button"
                                onMouseEnter={() => setActiveIndex(index)}
                                onFocus={() => setActiveIndex(index)}
                                onClick={() => setActiveIndex(index)}
                                aria-pressed={isActive}
                                className={`group relative text-left px-6 md:px-7 py-9 md:py-12 cursor-pointer transition-colors duration-500 ${
                                    isActive ? "bg-canvas" : ""
                                }`}
                            >
                                <span
                                    aria-hidden="true"
                                    className={`absolute top-0 left-0 right-0 h-[2px] fill-accent origin-left transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                                        isActive ? "scale-x-100" : "scale-x-0"
                                    }`}
                                />

                                <span
                                    aria-hidden="true"
                                    className={`num-solid block text-[clamp(3rem,5vw,4.6rem)] transition-colors duration-500 ${
                                        isActive
                                            ? "t-accent"
                                            : "t-1-mute"
                                    }`}
                                >
                                    {item.id}
                                </span>

                                <h3
                                    className={`display-caps text-[clamp(0.95rem,1.1vw,1.2rem)] mt-7 transition-colors duration-500 ${
                                        isActive
                                            ? "t-1"
                                            : "t-1-dim"
                                    }`}
                                >
                                    {item.title}
                                </h3>

                                <p className="copy text-[0.85rem] mt-4 max-w-[28ch]">{item.text}</p>
                            </Reveal>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
