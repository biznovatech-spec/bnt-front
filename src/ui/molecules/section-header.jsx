import Eyebrow from "../atoms/eyebrow";
import Reveal from "../atoms/reveal";

/**
 * Cabecera de sección.
 *
 * Regla superior a todo el ancho, micro-etiqueta a la izquierda y el número de
 * sección dibujado a contorno en el extremo derecho, a un tamaño que compite
 * con el propio titular. Debajo, el titular en versalitas —normalmente en
 * escalera— y la bajada. Es la firma que ordena todas las páginas.
 */
export default function SectionHeader({
    label,
    title,
    description,
    index,
    as: TitleTag = "h2",
    align = "left",
    rule = true,
    className = "",
}) {
    const centered = align === "center";
    const ghost = index ? String(index).split("/")[0].trim() : null;

    return (
        <div className={`flex flex-col ${centered ? "items-center text-center" : ""} ${className}`}>
            {rule && (
                <Reveal dir="none" className="w-full">
                    <div className="rule-section w-full" />
                </Reveal>
            )}

            <div className={`w-full flex items-start justify-between gap-8 ${rule ? "pt-6" : ""}`}>
                <div className={`flex flex-col gap-6 min-w-0 ${centered ? "items-center mx-auto" : ""}`}>
                    {label && (
                        <Reveal dir="none">
                            <Eyebrow>{label}</Eyebrow>
                        </Reveal>
                    )}

                    {title && (
                        <Reveal delay={80}>
                            <TitleTag
                                className={`display-caps t-1 max-w-[18ch] ${
                                    centered ? "mx-auto" : ""
                                }`}
                            >
                                {title}
                            </TitleTag>
                        </Reveal>
                    )}

                    {description && (
                        <Reveal delay={160}>
                            <p className={`lead max-w-[58ch] ${centered ? "mx-auto" : ""}`}>{description}</p>
                        </Reveal>
                    )}
                </div>

                {ghost && !centered && (
                    <Reveal dir="none" delay={200} className="shrink-0 hidden md:block -mt-2">
                        <span aria-hidden="true" className="ghost-num block">
                            {ghost}
                        </span>
                    </Reveal>
                )}
            </div>
        </div>
    );
}
