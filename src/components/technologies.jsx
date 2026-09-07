import { useEffect, useState } from "react";
import { carouselTechnologies } from "../utils/carouselTech";

/**
 * Stack tecnológico: carrusel cilíndrico real.
 *
 * Cada logotipo se coloca sobre una cara de un cilindro (`rotateY` +
 * `translateZ`) y el cilindro entero gira sobre su eje. La perspectiva la
 * resuelve el compositor: una sola transform animada, sin trabajo por frame
 * en JS.
 *
 * En pantallas pequeñas o con movimiento reducido se sirve una marquesina
 * plana, que se lee igual de bien y cuesta lo mismo.
 */
export default function Technologies() {
    const [ring, setRing] = useState(false);

    useEffect(() => {
        const wide = window.matchMedia("(min-width: 768px)");
        const calm = window.matchMedia("(prefers-reduced-motion: reduce)");
        const sync = () => setRing(wide.matches && !calm.matches);
        sync();
        wide.addEventListener("change", sync);
        calm.addEventListener("change", sync);
        return () => {
            wide.removeEventListener("change", sync);
            calm.removeEventListener("change", sync);
        };
    }, []);

    const count = carouselTechnologies.length;
    const radius = Math.round((count * 132) / (2 * Math.PI));

    return (
        <section
            className="w-full border-y bd-hair bg-canvas-2 select-none overflow-hidden"
            id="technologies"
            aria-label="Tecnologías utilizadas"
        >
            <div className="w-full max-w-[var(--shell-max)] mx-auto flex flex-col lg:flex-row lg:items-stretch">
                <div className="px-[var(--gutter)] py-6 lg:py-0 lg:pr-10 lg:border-r lg:bd-hair shrink-0 flex flex-col justify-center gap-2.5">
                    <span className="micro-label t-2">
                        <span aria-hidden="true" className="opacity-40">[&nbsp;</span>
                        Stack tecnológico
                        <span aria-hidden="true" className="opacity-40">&nbsp;]</span>
                    </span>
                    <span className="index-num micro-label t-3">
                        {String(count).padStart(2, "0")}
                    </span>
                </div>

                {ring ? (
                    <div className="tech-stage flex-1 border-t bd-hair lg:border-t-0" style={{ "--ring-r": `${radius}px` }}>
                        <div className="tech-ring">
                            {carouselTechnologies.map((tech, i) => (
                                <span key={tech.name} className="tech-face" style={{ "--i": i, "--n": count }}>
                                    <img
                                        src={tech.image}
                                        alt={tech.name}
                                        className="max-h-11 max-w-[104px] w-auto h-auto object-contain grayscale opacity-55 dark:brightness-0 dark:invert"
                                        loading="lazy"
                                    />
                                </span>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="marquee relative flex-1 overflow-hidden py-8 border-t bd-hair lg:border-t-0">
                        <div className="flex gap-16 animate-scroll w-max">
                            {[0, 1].map((copy) => (
                                <div key={copy} className="flex gap-16 shrink-0" aria-hidden={copy === 1}>
                                    {carouselTechnologies.map((tech, index) => (
                                        <span
                                            key={`${copy}-${index}`}
                                            className="flex items-center justify-center shrink-0 w-[130px] h-[52px]"
                                        >
                                            <img
                                                src={tech.image}
                                                alt={copy === 1 ? "" : tech.name}
                                                className="max-h-10 max-w-[110px] w-auto h-auto object-contain grayscale opacity-50 dark:brightness-0 dark:invert"
                                                loading="lazy"
                                            />
                                        </span>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
