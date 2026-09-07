import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { announcement } from '../data/announcement';

/**
 * Franja superior de aviso: una única línea de tinta con micro-tipografía
 * monoespaciada y separadores de 1px. Se pliega al abandonar el hero.
 */
export default function AnnouncementBar({ isVisible }) {
    const [isDismissed, setIsDismissed] = useState(() => {
        if (typeof window !== 'undefined') {
            return sessionStorage.getItem(announcement.sessionKey) === 'true';
        }
        return true;
    });

    const handleDismiss = () => {
        if (typeof window !== 'undefined') {
            sessionStorage.setItem(announcement.sessionKey, 'true');
            setIsDismissed(true);
        }
    };

    if (isDismissed) return null;

    return (
        <div
            className={`w-full overflow-hidden surface-strong transition-[max-height,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isVisible ? 'max-h-12 opacity-100' : 'max-h-0 opacity-0'
            }`}
            role="region"
            aria-label="Aviso destacado"
        >
            <div className="w-full max-w-[var(--shell-max)] mx-auto px-[var(--gutter)]">
                <div className="flex items-center justify-between gap-4 h-11">
                    <div className="flex flex-1 items-center gap-4 lg:gap-6 min-w-0 overflow-hidden">
                        <span className="flex items-center gap-2.5 shrink-0 min-w-0">
                            <span
                                aria-hidden="true"
                                className="w-1.5 h-1.5 fill-accent animate-pulse-dot shrink-0"
                            />
                            <span className="micro-label truncate t-1">
                                <span className="hidden sm:inline">Transformamos ideas en </span>
                                <span className="t-accent">soluciones digitales</span>
                                <span className="hidden lg:inline"> que impulsan tu proyecto</span>
                            </span>
                        </span>

                        <span aria-hidden="true" className="hidden min-[1400px]:block w-px h-3 bg-hair shrink-0" />
                        <span className="hidden min-[1400px]:flex items-center gap-2 shrink-0 micro-label t-2">
                            <Icon icon="lucide:users" className="w-3.5 h-3.5" aria-hidden="true" />
                            Acompañamiento personalizado
                        </span>

                        <span aria-hidden="true" className="hidden min-[1660px]:block w-px h-3 bg-hair shrink-0" />
                        <span className="hidden min-[1660px]:flex items-center gap-2 shrink-0 micro-label t-2">
                            <Icon icon="lucide:shield-check" className="w-3.5 h-3.5" aria-hidden="true" />
                            Tecnología segura y confiable
                        </span>
                    </div>

                    <div className="flex items-center gap-4 shrink-0">
                        <Link
                            to="/contacto"
                            className="hidden sm:flex group items-center gap-2 micro-label t-accent hover:t-1 transition-colors"
                        >
                            <span>Conversemos</span>
                            <Icon icon="lucide:arrow-right" className="w-3.5 h-3.5 arrow-shift" aria-hidden="true" />
                        </Link>

                        <button
                            type="button"
                            onClick={handleDismiss}
                            className="grid place-items-center w-6 h-6 t-2 hover:t-1 transition-colors"
                            aria-label="Cerrar aviso"
                        >
                            <Icon icon="lucide:x" className="w-3.5 h-3.5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
