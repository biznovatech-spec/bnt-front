import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import { megaMenus } from "../../data/megaMenu";

/**
 * Mega menú de escritorio.
 *
 * Se despliega como una hoja a sangre bajo la barra: columna de introducción a
 * la izquierda, grupos separados por filetes y entrada escalonada de cada
 * enlace. Sin sombras difusas ni bordes redondeados.
 */
export default function GenericMegaMenu({ isOpen, activeMenuId, onClose }) {
    const [currentData, setCurrentData] = useState(null);
    const [prevMenuId, setPrevMenuId] = useState(null);

    if (activeMenuId !== prevMenuId) {
        setPrevMenuId(activeMenuId);
        if (activeMenuId && megaMenus[activeMenuId]) {
            setCurrentData(megaMenus[activeMenuId]);
        }
    }

    useEffect(() => {
        if (!isOpen) return;
        const handleKeyDown = (e) => {
            if (e.key === "Escape") onClose();
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, onClose]);

    if (!isOpen && !activeMenuId) return null;
    if (!currentData) return null;

    return (
        <div
            className={`absolute top-full left-0 w-full z-40 hidden min-[1340px]:block transition-[opacity,visibility] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
            }`}
        >
            <button
                type="button"
                tabIndex={-1}
                aria-hidden="true"
                onClick={onClose}
                className="absolute top-0 left-0 w-full h-screen scrim -z-10 cursor-default"
            />

            <div
                className="w-full bg-canvas border-b bd-hair overflow-hidden"
                role="dialog"
                aria-label={`Menú ampliado de ${activeMenuId}`}
            >
                <div
                    key={activeMenuId}
                    className="w-full max-w-[var(--shell-max)] mx-auto px-[var(--gutter)] py-12"
                >
                    <div className="grid grid-cols-12 gap-0">
                        {/* Introducción */}
                        <div className="col-span-3 flex flex-col gap-5 pr-10 border-r bd-hair">
                            <span className="micro-label t-accent">{activeMenuId}</span>
                            <h3 className="display-xs text-[1.25rem] t-1 max-w-[24ch]">
                                {currentData.title}
                            </h3>
                            <p className="copy text-[0.85rem] max-w-[38ch]">{currentData.description}</p>
                            <Link to={currentData.viewAllRoute} onClick={onClose} className="arrow-link mt-2 w-fit">
                                <span>{currentData.viewAllLabel}</span>
                                <Icon icon="lucide:arrow-right" className="w-4 h-4" aria-hidden="true" />
                            </Link>
                        </div>

                        {/* Grupos */}
                        <div className="col-span-9 grid grid-cols-9 gap-0">
                            {currentData.groups.map((group, index) => (
                                <div
                                    key={index}
                                    className={`flex flex-col gap-4 px-8 ${
                                        index < currentData.groups.length - 1
                                            ? "border-r bd-hair"
                                            : "pr-0"
                                    }`}
                                    style={{ gridColumn: `span ${group.colSpan || 3}` }}
                                >
                                    <span className="micro-label t-3">
                                        {group.title}
                                    </span>

                                    <div className={`flex flex-col ${group.type === "primary" ? "gap-1" : "gap-0.5"}`}>
                                        {group.items.map((item, itemIdx) => (
                                            <Link
                                                key={itemIdx}
                                                to={item.route}
                                                onClick={onClose}
                                                className={`group flex items-start gap-3.5 py-2.5 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                                                    group.type === "primary" ? "" : "items-center"
                                                }`}
                                                style={{
                                                    opacity: isOpen ? 1 : 0,
                                                    transform: isOpen ? "translateY(0)" : "translateY(8px)",
                                                    transitionDelay: isOpen ? `${60 + itemIdx * 45}ms` : "0ms",
                                                }}
                                            >
                                                <span
                                                    className={`grid place-items-center shrink-0 border bd t-2 transition-colors duration-300 group-hover:bd-accent group-hover:t-accent ${
                                                        group.type === "primary" ? "w-10 h-10" : "w-8 h-8"
                                                    }`}
                                                >
                                                    <Icon
                                                        icon={item.icon}
                                                        className={group.type === "primary" ? "w-5 h-5" : "w-4 h-4"}
                                                        aria-hidden="true"
                                                    />
                                                </span>

                                                <span className="flex flex-col gap-1 min-w-0">
                                                    <span className="flex items-center gap-1.5 text-[0.9rem] font-semibold t-1 group-hover:t-accent transition-colors">
                                                        {item.label}
                                                        <Icon
                                                            icon="lucide:arrow-up-right"
                                                            className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
                                                            aria-hidden="true"
                                                        />
                                                    </span>
                                                    {item.description && group.type === "primary" && (
                                                        <span className="copy text-[0.8rem] max-w-[34ch]">
                                                            {item.description}
                                                        </span>
                                                    )}
                                                </span>
                                            </Link>
                                        ))}
                                    </div>

                                    {group.bottomCta && (
                                        <div className="mt-auto pt-6 border-t bd-hair">
                                            <span className="block micro-label t-3 mb-2.5">
                                                {group.bottomCta.title}
                                            </span>
                                            <Link
                                                to={group.bottomCta.route}
                                                onClick={onClose}
                                                className="arrow-link"
                                            >
                                                <span>{group.bottomCta.label}</span>
                                                <Icon icon="lucide:arrow-right" className="w-4 h-4" aria-hidden="true" />
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
