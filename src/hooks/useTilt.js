import { useCallback, useRef } from "react";

/**
 * Inclinación 3D ligera siguiendo al puntero.
 *
 * Escribe dos custom properties (--tilt-x / --tilt-y) sobre el propio nodo y
 * deja que CSS resuelva la transform: no hay re-render de React ni lectura de
 * layout por frame, así que el efecto vive en el compositor.
 *
 * Se desactiva solo en punteros gruesos (táctil) y con movimiento reducido.
 *
 * @param {number} max grados máximos de giro
 */
export default function useTilt(max = 5) {
    const frame = useRef(0);
    const node = useRef(null);
    const next = useRef({ x: 0, y: 0, lift: 0 });

    const apply = useCallback(() => {
        frame.current = 0;
        const el = node.current;
        if (!el) return;
        el.style.setProperty("--tilt-x", `${next.current.x}deg`);
        el.style.setProperty("--tilt-y", `${next.current.y}deg`);
        el.style.setProperty("--tilt-lift", `${next.current.lift}px`);
    }, []);

    const schedule = useCallback(() => {
        if (frame.current) return;
        frame.current = requestAnimationFrame(apply);
    }, [apply]);

    const onPointerMove = useCallback(
        (event) => {
            if (event.pointerType !== "mouse") return;
            if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

            const el = event.currentTarget;
            node.current = el;

            const rect = el.getBoundingClientRect();
            const px = (event.clientX - rect.left) / rect.width - 0.5;
            const py = (event.clientY - rect.top) / rect.height - 0.5;

            next.current = { x: -py * max * 2, y: px * max * 2, lift: -4 };
            schedule();
        },
        [max, schedule]
    );

    const onPointerLeave = useCallback(
        (event) => {
            node.current = event.currentTarget;
            next.current = { x: 0, y: 0, lift: 0 };
            schedule();
        },
        [schedule]
    );

    return { onPointerMove, onPointerLeave };
}
