/**
 * Retícula de precisión: hairlines verticales/horizontales a porcentajes fijos
 * más una cruz en cada intersección. Es puramente decorativa (pointer-events
 * desactivados) y no anima nada por frame — las líneas sólo hacen un barrido de
 * entrada mediante transform, que resuelve el compositor.
 */

const V = ["12.5%", "37.5%", "62.5%", "87.5%"];
const H = ["32%", "72%"];

export default function GridBackdrop({
    active = true,
    className = "",
    lines = true,
    cells = true,
}) {
    return (
        <div
            aria-hidden="true"
            className={`deco absolute inset-0 overflow-hidden ${active ? "is-in" : ""} ${className}`}
        >
            {/* Trama fina de fondo, atenuada hacia los bordes */}
            {cells && (
                <div
                    className="absolute inset-0 grid-hairline grid-fade"
                    style={{ "--cell": "clamp(56px, 6vw, 104px)" }}
                />
            )}

            {lines && (
                <>
                    {/* Ejes verticales */}
                    {V.map((left, i) => (
                        <span
                            key={`v-${left}`}
                            className="wipe-y absolute top-0 h-full w-px bg-hair"
                            style={{ left, "--rv-d": `${240 + i * 90}ms` }}
                        />
                    ))}

                    {/* Ejes horizontales */}
                    {H.map((top, i) => (
                        <span
                            key={`h-${top}`}
                            className="wipe-x absolute left-0 w-full h-px bg-hair"
                            style={{ top, "--rv-d": `${420 + i * 130}ms` }}
                        />
                    ))}

                    {/* Cruces en cada intersección */}
                    {H.map((top, hi) =>
                        V.map((left, vi) => (
                            <span
                                key={`p-${top}-${left}`}
                                className="plus-mark t-accent transition-opacity duration-700"
                                style={{
                                    top,
                                    left,
                                    marginTop: "-5px",
                                    marginLeft: "-5px",
                                    opacity: active ? 1 : 0,
                                    transitionDelay: `${700 + (hi * V.length + vi) * 70}ms`,
                                }}
                            />
                        ))
                    )}
                </>
            )}
        </div>
    );
}
