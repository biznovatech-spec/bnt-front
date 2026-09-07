/**
 * Micro-etiqueta de sección: una regla corta + [ TEXTO ] en monoespaciada.
 * Es la firma que identifica cada bloque del sitio.
 */
export default function Eyebrow({ children, className = "", tone = "accent" }) {
    const toneClass =
        tone === "muted"
            ? "t-2"
            : "t-accent";

    return (
        <span className={`inline-flex items-center gap-3 ${toneClass} ${className}`}>
            <span aria-hidden="true" className="rule-accent w-8 shrink-0 opacity-80" />
            <span className="micro-label">
                <span aria-hidden="true" className="opacity-45">[&nbsp;</span>
                {children}
                <span aria-hidden="true" className="opacity-45">&nbsp;]</span>
            </span>
        </span>
    );
}
