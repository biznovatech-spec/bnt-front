const sizeClasses = {
    /** Ancho completo del shell — secciones y rejillas */
    wide: "max-w-[var(--shell-max)]",
    /** Contenido estándar de página */
    standard: "max-w-[1400px]",
    /** Columna de lectura larga (artículos, legales) */
    reading: "max-w-[74ch]",
};

export default function Container({ children, className = "", size = "standard" }) {
    const maxW = sizeClasses[size] || sizeClasses.standard;

    return (
        <div className={`w-full ${maxW} mx-auto px-[var(--gutter)] ${className}`}>
            {children}
        </div>
    );
}
