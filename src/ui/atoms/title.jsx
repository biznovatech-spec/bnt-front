/**
 * Titular suelto (sin regla ni micro-etiqueta).
 *
 * `primary`   → titular display de sección.
 * `secondary` → subtítulo de apoyo, un escalón por debajo.
 */
export default function Title({ titulo, variant = "primary", as: Component, className = "" }) {
    const variants = {
        primary: {
            classes: "display-lg t-1",
            tag: "h2",
        },
        secondary: {
            classes: "display-sm t-1",
            tag: "h3",
        },
    };

    const config = variants[variant] || variants.primary;
    const Tag = Component || config.tag;

    return <Tag className={`${config.classes} ${className}`}>{titulo}</Tag>;
}
