import { useEffect, useRef, useState } from "react";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import { company } from "../data/company";
import { metrics } from "../data/metrics";
import HeroStage from "./hero-stage";
import { Checker, Crosshair, GridBackdrop } from "../ui";
/**
 * Portada.
 *
 * Composición asimétrica: raíl vertical a la izquierda, titular en escalera
 * ocupando el ancho de lectura y el núcleo 3D sangrando por el borde derecho
 * de la pantalla. Nada de degradados: la profundidad la dan los filetes, la
 * escala tipográfica y el propio volumen del 3D.
 */
export default function Hero() {
    const [ready, setReady] = useState(false);
    // Solo se monta la escena que toca: dos lienzos WebGL vivos a la vez
    // (uno de ellos oculto por CSS) sería tirar un contexto a la basura.
    const [isDesktop, setIsDesktop] = useState(() =>
        typeof window === "undefined" ? true : window.matchMedia("(min-width: 1024px)").matches
    );
    const scene = useRef(null);

    useEffect(() => {
        const mq = window.matchMedia("(min-width: 1024px)");
        const sync = () => setIsDesktop(mq.matches);
        sync();
        mq.addEventListener("change", sync);
        return () => mq.removeEventListener("change", sync);
    }, []);

    useEffect(() => {
        // rAF para entrar en el primer frame pintado; el temporizador es la red
        // de seguridad si la pestaña arranca en segundo plano y no hay frames.
        const raf = requestAnimationFrame(() => setReady(true));
        const timer = setTimeout(() => setReady(true), 400);
        return () => {
            cancelAnimationFrame(raf);
            clearTimeout(timer);
        };
    }, []);

    const step = (delay) => ({
        opacity: ready ? 1 : 0,
        transform: ready ? "translate3d(0,0,0)" : "translate3d(0,22px,0)",
        transition: `opacity 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
    });

    return (
        <section
            id="home"
            ref={scene}
            className={`relative w-full min-h-screen flex flex-col justify-center overflow-hidden bg-canvas ${
                ready ? "is-in" : ""
            }`}
        >
            <GridBackdrop active={ready} className="z-0 par par-1" />
            <Crosshair targetRef={scene} />

            {/* Raíl vertical: firma editorial en el margen */}
            <div
                aria-hidden="true"
                className="deco absolute left-0 top-0 bottom-0 hidden min-[1400px]:flex w-[var(--gutter)] items-center justify-center border-r bd-hair z-10"
                style={step(1200)}
            >
                <span className="vrail micro-label t-3">
                    {company.name} — {company.location.zone}, {company.location.city}
                </span>
            </div>

            {/* Núcleo 3D: sangra por el borde derecho de la pantalla */}
            {isDesktop && (
                <div
                    className="par par-2 hidden lg:block absolute right-0 top-[var(--header-compact-height)] bottom-[21%] w-[54%] xl:w-[52%] z-0"
                    style={{
                        opacity: ready ? 1 : 0,
                        transition: "opacity 1.4s cubic-bezier(0.16,1,0.3,1) 200ms",
                    }}
                >
                    <HeroStage variant="wide" ready={ready} />
                </div>
            )}

            <div className="relative z-10 w-full max-w-[var(--shell-max)] mx-auto px-[var(--gutter)] pt-[calc(var(--header-compact-height)+clamp(2.5rem,5vw,4.5rem))] pb-[clamp(1.5rem,3vw,2.5rem)]">
                {/* Cabecera de la portada */}
                <div
                    className="flex items-center gap-6 pb-7 border-b bd-hair lg:pr-[52%]"
                    style={step(80)}
                >
                    <span className="index-num micro-label t-accent">01.</span>
                    <span aria-hidden="true" className="w-10 h-px bg-[var(--hair)]" />
                    <span className="micro-label t-2">
                        <span aria-hidden="true" className="opacity-40">[&nbsp;</span>
                        Soluciones tecnológicas avanzadas
                        <span aria-hidden="true" className="opacity-40">&nbsp;]</span>
                    </span>
                </div>

                {/* Escena orbital: la portada propia de pantallas pequeñas */}
                {!isDesktop && (
                    <div
                        className="lg:hidden relative h-[clamp(320px,76vw,440px)] mt-6"
                        style={{
                            opacity: ready ? 1 : 0,
                            transition: "opacity 1.2s cubic-bezier(0.16,1,0.3,1) 200ms",
                        }}
                    >
                        <HeroStage variant="tall" ready={ready} />
                    </div>
                )}

                {/* Titular en escalera */}
                <h1 className="display-mega t-1 mt-10 lg:mt-14">
                    <span className="line-mask" style={{ "--rv-d": "180ms" }}>
                        <span>Transformamos</span>
                    </span>
                    <span className="line-mask stair-1" style={{ "--rv-d": "290ms" }}>
                        <span>ideas en</span>
                    </span>
                    <span className="line-mask stair-2" style={{ "--rv-d": "400ms" }}>
                        <span className="accent-word inline-flex items-baseline gap-[0.35em]">
                            soluciones
                            <Checker className="w-[0.6em] h-[0.6em] translate-y-[-0.02em] opacity-60" />
                        </span>
                    </span>
                </h1>

                <p
                    className="display-caps text-[clamp(1.1rem,1.5vw+0.5rem,2rem)] t-1-soft mt-4 lg:pr-[52%]"
                    style={step(560)}
                >
                    <span className="stair-1">que impulsan tu proyecto</span>
                </p>

                {/* Bajada y acciones: siempre dentro de la mitad de lectura */}
                <div className="mt-10 flex flex-col gap-8 lg:pr-[56%]">
                    <p className="lead max-w-[46ch]" style={step(700)}>
                        {company.heroDescription}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4" style={step(820)}>
                        <span className="btn-trail inline-flex">
                            <Link to="/contacto" className="btn btn-primary btn-lg group">
                                <span className="glyph-star" aria-hidden="true">&#10022;</span>
                                Cuéntanos tu idea
                            </Link>
                        </span>
                        <Link to="/casos-de-exito" className="btn btn-outline btn-lg group">
                            Ver casos
                            <Icon icon="lucide:arrow-right" className="w-4 h-4 arrow-shift" aria-hidden="true" />
                        </Link>
                    </div>
                </div>
            </div>

            {/* Cifras: franja de cierre */}
            <div
                className="relative z-10 w-full max-w-[var(--shell-max)] mx-auto px-[var(--gutter)] pb-[clamp(2rem,4vw,3.5rem)]"
                style={step(960)}
            >
                <div className="grid grid-cols-2 lg:grid-cols-4">
                    {metrics.map((stat, index) => (
                        <div
                            key={stat.id}
                            className={`flex flex-col gap-3 py-7 pr-6 border-t bd-hair ${
                                index % 2 === 1 ? "pl-5 border-l" : ""
                            } ${index > 0 ? "lg:pl-8 lg:border-l" : "lg:border-l-0"}`}
                        >
                            <span className="index-num micro-label t-3">
                                {String(index + 1).padStart(2, "0")}
                            </span>
                            <span className="font-display text-[clamp(2rem,3vw,3.2rem)] font-bold leading-[0.85] tracking-[-0.045em] t-1">
                                {stat.value}
                            </span>
                            <span className="micro-label t-2 max-w-[20ch] leading-[1.5]">
                                {stat.label}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
