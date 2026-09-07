import { Link } from 'react-router-dom';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Botón del sistema "Precision Grid": caja biselada, texto en versalitas
 * espaciadas y un reflejo diagonal que cruza al pasar el cursor.
 *
 * Las variantes conservan los nombres previos para no romper llamadas
 * existentes; lo que cambia es únicamente su acabado.
 */
const VARIANTS = {
    primary: 'btn-primary',
    accent: 'btn-primary',
    secondary: 'btn-outline',
    ink: 'btn-ink',
    ghost: 'btn-outline',
};

const SIZES = {
    sm: 'btn-sm',
    md: '',
    lg: 'btn-lg',
    icon: 'btn-sm',
};

// eslint-disable-next-line react-refresh/only-export-components
export function cn(...inputs) {
    return twMerge(clsx(inputs));
}

export default function Button({
    children,
    variant = 'primary',
    size = 'md',
    className,
    to,
    href,
    onClick,
    type = 'button',
    ...props
}) {
    const combinedClasses = cn('btn', VARIANTS[variant] || VARIANTS.primary, SIZES[size] || '', className);

    if (to) {
        return (
            <Link to={to} className={combinedClasses} onClick={onClick} {...props}>
                {children}
            </Link>
        );
    }

    if (href) {
        return (
            <a
                href={href}
                className={combinedClasses}
                onClick={onClick}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                {...props}
            >
                {children}
            </a>
        );
    }

    return (
        <button type={type} className={combinedClasses} onClick={onClick} {...props}>
            {children}
        </button>
    );
}
