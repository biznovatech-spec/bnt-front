import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";

/**
 * Enlace de continuidad: versalitas espaciadas + flecha que se separa del
 * texto al pasar el cursor. Sustituye a los botones "fantasma" del sitio.
 */
export default function ArrowLink({
    children,
    to,
    href,
    icon = "lucide:arrow-right",
    className = "",
    onClick,
    ...props
}) {
    const content = (
        <>
            <span>{children}</span>
            <Icon icon={icon} className="w-4 h-4 shrink-0" aria-hidden="true" />
        </>
    );

    const classes = `arrow-link ${className}`;

    if (href) {
        return (
            <a href={href} className={classes} onClick={onClick} {...props}>
                {content}
            </a>
        );
    }

    return (
        <Link to={to} className={classes} onClick={onClick} {...props}>
            {content}
        </Link>
    );
}
