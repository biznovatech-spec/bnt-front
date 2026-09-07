import { Link } from "react-router-dom";
import useTilt from "../../hooks/useTilt";

/**
 * Panel: la única "tarjeta" del sistema.
 *
 * Esquinas rectas, filete de 1px y escuadras que se dibujan en las cuatro
 * esquinas al pasar el cursor. Sin sombras difusas ni bordes redondeados: la
 * jerarquía la marcan el filete, el acento y la profundidad.
 *
 * @param {boolean} interactive añade hover (escuadras, elevación, acento)
 * @param {boolean} sweep       barrido de acento sobre el filete superior
 * @param {boolean} tilt        inclinación 3D siguiendo al puntero
 */
export default function Panel({
    children,
    as: Tag = "div",
    to,
    href,
    className = "",
    interactive = true,
    sweep = true,
    tilt = false,
    quiet = false,
    ...props
}) {
    const tiltHandlers = useTilt(4);

    const classes = [
        "panel",
        quiet ? "panel-quiet" : "",
        interactive ? "panel-i" : "",
        sweep ? "panel-sweep" : "",
        tilt ? "tilt" : "",
        className,
    ]
        .filter(Boolean)
        .join(" ");

    const motion = tilt ? tiltHandlers : {};

    if (to) {
        return (
            <Link to={to} className={classes} {...motion} {...props}>
                {children}
            </Link>
        );
    }

    if (href) {
        return (
            <a href={href} className={classes} {...motion} {...props}>
                {children}
            </a>
        );
    }

    return (
        <Tag className={classes} {...motion} {...props}>
            {children}
        </Tag>
    );
}
