import CutFrame from "../atoms/cut-frame";

const SURFACES = {
    panel: "bg-1",
    quiet: "bg-2",
    plate: "plate-fill",
    none: "",
};

/**
 * Panel biselado.
 *
 * Tres capas: el fondo recortado por `clip-path`, el contorno dibujado aparte
 * (para que el bisel conserve su filete) y el contenido.
 *
 * El contenido usa `display: contents`, así que las clases de maquetación que
 * se pasen en `className` —flex, rejilla, gap— siguen aplicando a los hijos
 * reales, como si el marco no existiera.
 */
export default function CutPanel({
    children,
    className = "",
    surface = "quiet",
    tone = "default",
    cut,
    as: Tag = "div",
    ...props
}) {
    const style = cut ? { "--cut": cut } : undefined;

    return (
        <Tag className={`relative isolate ${className}`} style={style} {...props}>
            <span
                aria-hidden="true"
                className={`cut absolute inset-0 -z-10 ${SURFACES[surface] ?? SURFACES.quiet}`}
            />
            <CutFrame tone={tone} />
            <span className="contents">{children}</span>
        </Tag>
    );
}
