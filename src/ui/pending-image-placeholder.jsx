import { Icon } from "@iconify/react";

const isDev = import.meta.env.DEV;

const variantStyles = {
    hero: "aspect-[16/9] max-w-xl",
    cover: "aspect-[16/9] max-w-2xl",
    small: "aspect-square max-w-[200px]",
};

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
            className={`relative w-full ${variantClass} rounded-2xl border border-gray-200 bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center justify-center overflow-hidden select-none ${className}`}
            role="img"
            aria-label={title}
        >
            {/* Abstract geometric decoration */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.07]">
                <svg className="w-full h-full" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="40" y="30" width="120" height="80" rx="8" stroke="#0A84FF" strokeWidth="1.5" />
                    <rect x="200" y="60" width="160" height="100" rx="8" stroke="#062A73" strokeWidth="1" />
                    <circle cx="100" cy="200" r="50" stroke="#0A84FF" strokeWidth="1" />
                    <line x1="160" y1="70" x2="200" y2="90" stroke="#0A84FF" strokeWidth="1" />
                    <line x1="100" y1="150" x2="100" y2="110" stroke="#062A73" strokeWidth="1" />
                    <rect x="260" y="180" width="90" height="60" rx="6" stroke="#0A84FF" strokeWidth="1" />
                    <line x1="280" y1="160" x2="280" y2="180" stroke="#062A73" strokeWidth="1" />
                </svg>
            </div>

            {/* Icon */}
            <div className="w-12 h-12 rounded-xl bg-white border border-gray-200 flex items-center justify-center mb-3 z-10">
                <Icon icon="solar:gallery-minimalistic-linear" className="w-6 h-6 text-gray-400" />
            </div>

            {/* Dev info */}
            {isDev && (showSpecs || true) ? (
                <div className="flex flex-col items-center gap-1 z-10 text-center px-4">
                    <p className="text-xs font-semibold text-gray-500">{title}</p>
                    {concept && <p className="text-[10px] text-gray-400 max-w-xs">{concept}</p>}
                    {expectedFilename && (
                        <p className="text-[10px] text-gray-400 font-mono mt-1">{expectedFilename}</p>
                    )}
                    {recommendedSize && (
                        <p className="text-[10px] text-gray-400">{recommendedRatio} · {recommendedSize}</p>
                    )}
                </div>
            ) : (
                <p className="text-xs text-gray-400 z-10">Contenido visual próximamente</p>
            )}
        </div>
    );
}
