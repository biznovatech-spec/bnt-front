import { Icon } from "@iconify/react";

const isDev = import.meta.env.DEV;

const variantStyles = {
    hero: "aspect-[16/9] max-w-xl",
    cover: "aspect-[16/9] max-w-2xl",
    small: "aspect-square max-w-[200px]",
};

/**
 * Marco de reserva para imágenes aún no generadas. Mantiene el mismo lenguaje
 * que el resto del sitio: filete de 1px, retícula y micro-tipografía.
 */
export default function PendingImagePlaceholder({
    title = "Imagen pendiente",
    concept = "",
    expectedFilename = "",
    recommendedRatio = "16:9",
    recommendedSize = "",
    className = "",
    variant = "hero",
    showSpecs = false,
}) {
    const variantClass = variantStyles[variant] || variantStyles.hero;

    return (
        <div
            className={`relative w-full ${variantClass} border border-dashed bd bg-[var(--panel-bg-2)] flex flex-col items-center justify-center overflow-hidden select-none ${className}`}
            role="img"
            aria-label={title}
        >
            <div
                aria-hidden="true"
                className="deco absolute inset-0 grid-hairline opacity-60"
                style={{ "--cell": "40px" }}
            />

            <span className="relative grid place-items-center w-12 h-12 border bd bg-[var(--panel-bg)] t-2 mb-4">
                <Icon icon="lucide:image" className="w-5 h-5" aria-hidden="true" />
            </span>

            {isDev && (showSpecs || true) ? (
                <div className="relative flex flex-col items-center gap-1.5 text-center px-6">
                    <p className="micro-label t-2">{title}</p>
                    {concept && (
                        <p className="text-[0.7rem] leading-relaxed t-3 max-w-xs">
                            {concept}
                        </p>
                    )}
                    {expectedFilename && (
                        <p className="index-num text-[0.65rem] t-3 mt-1">
                            {expectedFilename}
                        </p>
                    )}
                    {recommendedSize && (
                        <p className="index-num text-[0.65rem] t-3">
                            {recommendedRatio} · {recommendedSize}
                        </p>
                    )}
                </div>
            ) : (
                <p className="relative micro-label t-3">
                    Contenido visual próximamente
                </p>
            )}
        </div>
    );
}
