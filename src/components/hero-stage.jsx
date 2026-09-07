import { CornerBrackets } from "../ui";
import { company } from "../data/company";
import HeroScene from "./hero-scene";

/**
 * PLATÓ DE LA PORTADA — la misma pieza en escritorio y en móvil.
 *
 * Sobre la escena 3D se montan las piezas dibujadas, siempre las mismas:
 * el isotipo suspendido en el centro exacto del lienzo (donde la cámara apunta
 * al núcleo, así que no hay que cuadrar nada a mano), su retícula de enfoque,
 * las plomadas que lo amarran al terreno, el marco de escuadras y las lecturas.
 *
 * Lo único que cambia entre proporciones es la escala de esas piezas y si el
 * índice de fases se despliega en lista (ancho) o rota en teletipo (alto).
 */

const PHASES = ["Análisis", "Estrategia", "Desarrollo", "Implementación", "Soporte"];

export default function HeroStage({ variant = "wide", ready = false }) {
    const wide = variant === "wide";

    const layer = (delay) => ({
        opacity: ready ? 1 : 0,
        transition: `opacity 1.1s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
    });

    return (
        <div className="relative w-full h-full flex flex-col">
            <div className="relative flex-1 min-h-0">
                {/* Escena: terreno, núcleo y armazón */}
                <HeroScene variant={variant} className="absolute inset-0" />

                {/* Isotipo: el centro del lienzo es donde apunta la cámara */}
                <div
                    className={`absolute left-1/2 top-1/2 ${wide ? "w-[31%] max-w-[240px]" : "w-[34%] max-w-[150px]"}`}
                    style={{
                        opacity: ready ? 1 : 0,
                        transform: ready
                            ? "translate3d(-50%,-50%,0) scale(1)"
                            : "translate3d(-50%,-50%,0) scale(0.88)",
                        transition:
                            "opacity 1.2s cubic-bezier(0.16,1,0.3,1) 200ms, transform 1.2s cubic-bezier(0.16,1,0.3,1) 200ms",
                    }}
                >
                    <div className="relative aspect-square animate-hero-float">
                        <img
                            src="/image/logo_only.webp"
                            alt="Isotipo de Biznovatech"
                            className="w-full h-full object-contain"
                            width="280"
                            height="280"
                            fetchPriority="high"
                        />

                        <span className="reticle-box t-accent" aria-hidden="true">
                            <i /><i /><i /><i />
                        </span>
                    </div>
                </div>

                {/* Plomadas: amarran el isotipo al terreno, como una cota */}
                <span
                    aria-hidden="true"
                    className={`absolute w-px plumb ${wide ? "left-[calc(50%-3.4rem)] top-1/2 bottom-[14%]" : "left-[calc(50%-2.7rem)] top-1/2 bottom-[16%]"}`}
                    style={layer(560)}
                />
                <span
                    aria-hidden="true"
                    className={`absolute w-px plumb ${wide ? "left-[calc(50%+3.4rem)] top-1/2 bottom-[24%]" : "left-[calc(50%+2.7rem)] top-1/2 bottom-[26%]"}`}
                    style={layer(680)}
                />

                {/* Marco y lecturas: encuadran la escena, no la columna entera
                    (arriba se comerían el espacio de la barra fija) */}
                <div
                    className={`absolute left-0 right-0 ${wide ? "top-[7%] bottom-[5%]" : "inset-0"}`}
                >
                    <span className="t-accent">
                        <CornerBrackets size={wide ? 16 : 14} />
                    </span>

                    <span className="absolute top-0 left-0 pl-6 -mt-6 micro-label t-3" style={layer(760)}>
                        {company.name}
                    </span>
                    <span className="absolute top-0 right-0 pr-6 -mt-6 micro-label t-3" style={layer(820)}>
                        {company.location.city} · PE
                    </span>
                </div>

                {/* Índice de fases: lista completa cuando hay sitio */}
                {wide && (
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 pr-8 flex flex-col items-end gap-3.5">
                        {PHASES.map((phase, i) => (
                            <span
                                key={phase}
                                className="flex items-center gap-3 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                                style={{
                                    opacity: ready ? 1 : 0,
                                    transform: ready ? "translate3d(0,0,0)" : "translate3d(14px,0,0)",
                                    transitionDelay: `${900 + i * 100}ms`,
                                }}
                            >
                                <span className="index-num micro-label t-3">
                                    {String(i + 1).padStart(2, "0")}
                                </span>
                                <span className="w-5 h-px fill-accent-soft" />
                                <span className="micro-label t-1-soft whitespace-nowrap">{phase}</span>
                            </span>
                        ))}
                    </div>
                )}
            </div>

            {/* Índice de fases en teletipo cuando el sitio es escaso */}
            {!wide && (
                <div
                    className="flex items-center gap-4 pt-4 border-t bd-hair"
                    style={{
                        opacity: ready ? 1 : 0,
                        transform: ready ? "translate3d(0,0,0)" : "translate3d(0,10px,0)",
                        transition:
                            "opacity 0.9s cubic-bezier(0.16,1,0.3,1) 700ms, transform 0.9s cubic-bezier(0.16,1,0.3,1) 700ms",
                    }}
                >
                    <span className="index-num micro-label t-accent shrink-0">EN CURSO</span>
                    <span aria-hidden="true" className="w-6 h-px fill-accent-soft shrink-0" />

                    <div className="ticker flex-1" aria-hidden="true">
                        <ul>
                            {[...PHASES, PHASES[0]].map((phase, i) => (
                                <li key={`${phase}-${i}`} className="micro-label t-2">
                                    {phase}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
}
