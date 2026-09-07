import { useEffect, useRef, useState } from "react";

/**
 * Revelado al entrar en viewport.
 *
 * Usa IntersectionObserver + transiciones CSS (solo opacity/transform), por lo
 * que el trabajo lo hace el compositor y no el hilo principal: cero jank aunque
 * haya decenas de elementos revelándose a la vez.
 *
 * @param {"up"|"left"|"right"|"scale"|"none"} dir  dirección de entrada
 * @param {number} delay                            retardo en ms (para escalonar)
 */
export default function Reveal({
    children,
    as: Tag = "div",
    dir = "up",
    delay = 0,
    threshold = 0.12,
    className = "",
    style,
    ...props
}) {
    const ref = useRef(null);
    const [isIn, setIsIn] = useState(
        () => typeof IntersectionObserver === "undefined"
    );

    useEffect(() => {
        const node = ref.current;
        if (!node) return;

        // Sin soporte de IO (o SSR raro): ya se mostró sin animar.
        if (typeof IntersectionObserver === "undefined") return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsIn(true);
                    observer.disconnect();
                }
            },
            { threshold, rootMargin: "0px 0px -8% 0px" }
        );

        observer.observe(node);
        return () => observer.disconnect();
    }, [threshold]);

    return (
        <Tag
            ref={ref}
            data-dir={dir}
            className={`reveal ${isIn ? "is-in" : ""} ${className}`}
            style={{ "--rv-d": `${delay}ms`, ...style }}
            {...props}
        >
            {children}
        </Tag>
    );
}
