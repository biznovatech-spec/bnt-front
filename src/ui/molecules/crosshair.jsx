import { useEffect, useRef } from "react";

/**
 * Retícula de puntería que sigue al cursor dentro de su contenedor.
 *
 * Además publica la posición suavizada en el propio contenedor como
 * `--px` / `--py` (de -1 a 1), para que otras capas de la escena puedan
 * desplazarse con paralaje y construir profundidad real.
 *
 * Dos filetes de 1px y una lectura de coordenadas en monoespaciada: la misma
 * idea de "instrumento" del foco interactivo de synth-mode, pero resuelta con
 * líneas sólidas en lugar de una máscara difusa.
 *
 * No provoca ni un render de React: el puntero escribe custom properties y el
 * suavizado ocurre en un único requestAnimationFrame.
 */
export default function Crosshair({ targetRef }) {
    const layer = useRef(null);
    const readout = useRef(null);

    useEffect(() => {
        const host = targetRef?.current;
        const node = layer.current;
        if (!host || !node) return;

        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

        const target = { x: 0.5, y: 0.5 };
        const smooth = { x: 0.5, y: 0.5 };
        let frame = 0;
        let active = false;

        const tick = () => {
            smooth.x += (target.x - smooth.x) * 0.14;
            smooth.y += (target.y - smooth.y) * 0.14;

            node.style.setProperty("--cx", `${(smooth.x * 100).toFixed(3)}%`);
            node.style.setProperty("--cy", `${(smooth.y * 100).toFixed(3)}%`);

            // Coordenadas normalizadas para el paralaje de las demás capas
            host.style.setProperty("--px", (smooth.x * 2 - 1).toFixed(4));
            host.style.setProperty("--py", (smooth.y * 2 - 1).toFixed(4));

            if (readout.current) {
                readout.current.textContent = `X ${String(Math.round(smooth.x * 1000)).padStart(
                    4,
                    "0"
                )}  Y ${String(Math.round(smooth.y * 1000)).padStart(4, "0")}`;
            }

            const settled =
                Math.abs(target.x - smooth.x) < 0.0005 && Math.abs(target.y - smooth.y) < 0.0005;
            frame = settled && !active ? 0 : requestAnimationFrame(tick);
        };

        const start = () => {
            if (!frame) frame = requestAnimationFrame(tick);
        };

        const onMove = (event) => {
            const rect = host.getBoundingClientRect();
            target.x = (event.clientX - rect.left) / rect.width;
            target.y = (event.clientY - rect.top) / rect.height;
            start();
        };

        const onEnter = () => {
            active = true;
            node.style.setProperty("--ch-o", "1");
            start();
        };

        const onLeave = () => {
            active = false;
            node.style.setProperty("--ch-o", "0");
        };

        host.addEventListener("pointermove", onMove);
        host.addEventListener("pointerenter", onEnter);
        host.addEventListener("pointerleave", onLeave);

        return () => {
            host.removeEventListener("pointermove", onMove);
            host.removeEventListener("pointerenter", onEnter);
            host.removeEventListener("pointerleave", onLeave);
            if (frame) cancelAnimationFrame(frame);
        };
    }, [targetRef]);

    return (
        <div
            ref={layer}
            aria-hidden="true"
            className="deco absolute inset-0 z-20 hidden lg:block"
            style={{ "--cx": "50%", "--cy": "50%", "--ch-o": "0" }}
        >
            <span
                className="absolute top-0 bottom-0 w-px fill-accent-soft transition-opacity duration-500"
                style={{ left: "var(--cx)", opacity: "var(--ch-o)" }}
            />
            <span
                className="absolute left-0 right-0 h-px fill-accent-soft transition-opacity duration-500"
                style={{ top: "var(--cy)", opacity: "var(--ch-o)" }}
            />
            <span
                className="absolute w-2 h-2 -translate-x-1/2 -translate-y-1/2 border bd-accent transition-opacity duration-500"
                style={{ left: "var(--cx)", top: "var(--cy)", opacity: "var(--ch-o)" }}
            />
            <span
                ref={readout}
                className="absolute micro-label t-accent translate-x-4 translate-y-3 transition-opacity duration-500"
                style={{ left: "var(--cx)", top: "var(--cy)", opacity: "var(--ch-o)" }}
            />
        </div>
    );
}
