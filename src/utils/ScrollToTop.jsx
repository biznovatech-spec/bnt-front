import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Tiempo máximo para esperar a que una página diferida pinte la sección del ancla
const HASH_WAIT_MS = 3000;

export default function ScrollToTop() {
    const { pathname, hash, key } = useLocation();

    useEffect(() => {
        if (!hash) {
            window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
            return;
        }

        // Esto sirve para que /nosotros#equipo baje a la sección aunque la página aún se esté cargando
        const id = decodeURIComponent(hash.slice(1));
        const start = performance.now();
        let timer = 0;

        const seek = () => {
            const target = document.getElementById(id);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                // Esto sirve para marcar un instante el bloque de destino y que se vea adónde llevó el enlace
                target.classList.remove('anchor-flash');
                void target.offsetWidth;
                target.classList.add('anchor-flash');
                target.addEventListener('animationend', () => target.classList.remove('anchor-flash'), { once: true });
                return;
            }
            if (performance.now() - start < HASH_WAIT_MS) {
                timer = setTimeout(seek, 50);
            }
        };

        seek();
        return () => clearTimeout(timer);
    }, [pathname, hash, key]);

    return null;
}
