/**
 * Marco biselado.
 *
 * Reproduce el corte de esquina de aaurex conservando el filete: el fondo se
 * recorta con `clip-path` y el contorno se dibuja con cuatro aristas de 1px
 * más una diagonal girada 45°. Sin SVG, sin degradados y válido a cualquier
 * tamaño.
 *
 * @param {"default"|"accent"} tone color del contorno
 * @param {string} cut tamaño del corte (p. ej. "26px")
 */
export default function CutFrame({ tone = "default", cut }) {
    return (
        <span
            aria-hidden="true"
            className={`cut-line ${tone === "accent" ? "cut-line--accent" : ""}`}
            style={cut ? { "--cut": cut } : undefined}
        >
            <i /><i /><i /><i /><i />
        </span>
    );
}
