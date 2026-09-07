/**
 * MARCAS DIBUJADAS
 *
 * Piezas de trazo tomadas de los skills: las escuadras en L que enmarcan un
 * bloque sin necesidad de tarjeta (synth-mode), el globo de alambre que da
 * volumen sin WebGL, y el damero que se incrusta en el titular.
 *
 * Todas heredan el color con `currentColor`, así que el tema las resuelve.
 */

/** Cuatro escuadras en las esquinas — enmarca sin encerrar. */
export function CornerBrackets({ size = 12, className = "" }) {
    const paths = [
        { d: "M0 11.5V0.5H11.5", pos: "top-0 left-0" },
        { d: "M0.5 0.5H11.5V11.5", pos: "top-0 right-0" },
        { d: "M0 0.5V11.5H11.5", pos: "bottom-0 left-0" },
        { d: "M0.5 11.5H11.5V0.5", pos: "bottom-0 right-0" },
    ];

    return (
        <span aria-hidden="true" className={`deco absolute inset-0 ${className}`}>
            {paths.map((p) => (
                <svg
                    key={p.pos}
                    className={`absolute ${p.pos}`}
                    width={size}
                    height={size}
                    viewBox="0 0 12 12"
                    fill="none"
                >
                    <path d={p.d} stroke="currentColor" strokeWidth="1" vectorEffect="non-scaling-stroke" />
                </svg>
            ))}
        </span>
    );
}

/** Globo de alambre: círculo, ecuador, meridianos y paralelos. */
export function WireGlobe({ className = "" }) {
    return (
        <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
            <g stroke="currentColor" strokeWidth="1" vectorEffect="non-scaling-stroke">
                <circle cx="32" cy="32" r="28" />
                <line x1="4" y1="32" x2="60" y2="32" />
                <ellipse cx="32" cy="32" rx="28" ry="10" />
                <ellipse cx="32" cy="32" rx="28" ry="19" />
                <line x1="32" y1="4" x2="32" y2="60" />
                <ellipse cx="32" cy="32" rx="10" ry="28" />
                <ellipse cx="32" cy="32" rx="19" ry="28" />
            </g>
        </svg>
    );
}

/** Damero: se incrusta al final de una línea de titular. */
export function Checker({ className = "" }) {
    const cells = [];
    for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 3; col++) {
            cells.push(
                <rect
                    key={`${row}-${col}`}
                    x={col * 4.5 + (row % 2 ? 2.25 : 0)}
                    y={row * 4.5}
                    width="3.8"
                    height="3.8"
                    fill="currentColor"
                />
            );
        }
    }
    return (
        <svg viewBox="0 0 18 18" className={className} aria-hidden="true">
            {cells}
        </svg>
    );
}
