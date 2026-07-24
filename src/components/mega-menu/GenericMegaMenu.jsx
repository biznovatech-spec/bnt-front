import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import Container from "../../ui/container";
import { useEffect, useState, useRef } from "react";
import { megaMenus } from "../../data/megaMenu";

export default function GenericMegaMenu({ isOpen, activeMenuId, onClose }) {
    const menuRef = useRef(null);
    const [currentData, setCurrentData] = useState(null);
    const [prevMenuId, setPrevMenuId] = useState(null);

    // Derived state pattern: update data synchronously when activeMenuId changes
    // retaining the old data if activeMenuId becomes null
    if (activeMenuId !== prevMenuId) {
        setPrevMenuId(activeMenuId);
        if (activeMenuId && megaMenus[activeMenuId]) {
            setCurrentData(megaMenus[activeMenuId]);
        }
    }

    // Trap focus and handle escape key
    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (e) => {
            if (e.key === "Escape") {
                onClose();
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, onClose]);

    if (!isOpen && !activeMenuId) return null;
    if (!currentData) return null;

    return (
        <div className={`absolute top-full left-0 w-full z-40 hidden min-[1200px]:block ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'} transition-all duration-200`}>
            {/* Overlay */}
            <div 
                className="absolute top-0 left-0 w-full h-[100vh] bg-white/40 backdrop-blur-sm -z-10"
                onClick={onClose}
                aria-hidden="true"
            />

            {/* Mega Menu Panel */}
            <div 
                ref={menuRef}
                className="w-full bg-white border-b border-gray-100 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] origin-top relative overflow-hidden"
                role="dialog"
                aria-label={`Menú ampliado de ${activeMenuId}`}
                aria-modal="false"
                aria-expanded={isOpen}
            >
                {/* Contenedor que cambia suavemente cuando cambia currentData */}
                <div key={activeMenuId} className="animate-fade-in">
                    <Container size="wide" className="relative py-12">
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-8 right-0 p-2 text-surface-dark hover:text-tertiary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md bg-transparent"
                            aria-label={`Cerrar menú de ${activeMenuId}`}
                        >
                            <Icon icon="solar:close-linear" className="w-[32px] h-[32px]" strokeWidth="1.5" />
                        </button>

                        <div className="flex flex-wrap lg:flex-nowrap gap-8 pr-16 w-full">
                            
                            {/* ZONA A: INTRODUCCIÓN */}
                            <div className="w-[280px] shrink-0 flex flex-col gap-4 border-r border-gray-100 pr-8">
                                <span className="text-[11px] font-bold tracking-widest text-t-secondary uppercase">{activeMenuId}</span>
                                <h3 className="text-[22px] font-bold text-surface-dark leading-tight">
                                    {currentData.title}
                                </h3>
                                <p className="text-[13px] text-t-secondary leading-relaxed">
                                    {currentData.description}
                                </p>
                                <Link 
                                    to={currentData.viewAllRoute} 
                                    onClick={onClose}
                                    className="inline-flex items-center gap-1.5 text-surface-dark font-semibold hover:text-tertiary mt-2 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm w-fit text-[14px]"
                                >
                                    {currentData.viewAllLabel}
                                    <Icon icon="solar:arrow-right-linear" className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </div>

                            {/* GRUPOS DINÁMICOS */}
                            <div className="flex flex-1 gap-8">
                                {currentData.groups.map((group, index) => (
                                    <div key={index} className="flex flex-col gap-2" style={{ flex: group.colSpan || 1 }}>
                                        <span className="text-[11px] font-bold tracking-widest text-t-secondary uppercase mb-2">{group.title}</span>
                                        
                                        <div className={`flex flex-col ${group.type === 'primary' ? 'gap-3' : 'gap-1'}`}>
                                            {group.items.map((item, itemIdx) => (
                                                <Link 
                                                    key={itemIdx} 
                                                    to={item.route} 
                                                    onClick={onClose} 
                                                    className={`group flex items-start focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md p-2 -ml-2 hover:bg-gray-50 transition-colors ${group.type === 'primary' ? 'gap-4 p-3 -ml-3' : 'gap-3 items-center'}`}
                                                >
                                                    {group.type === 'primary' ? (
                                                        <div className="p-2.5 border border-gray-200 rounded-lg shrink-0 group-hover:border-tertiary/30 transition-colors bg-white">
                                                            <Icon icon={item.icon} className="w-6 h-6 text-surface-dark group-hover:text-tertiary transition-colors" strokeWidth="1.5" />
                                                        </div>
                                                    ) : (
                                                        <div className="w-8 h-8 flex items-center justify-center border border-transparent group-hover:border-tertiary/20 group-hover:bg-white rounded-md transition-all shrink-0">
                                                            <Icon icon={item.icon} className="w-4 h-4 text-t-secondary group-hover:text-tertiary transition-colors" strokeWidth="2" />
                                                        </div>
                                                    )}
                                                    
                                                    <div className={`flex ${group.type === 'primary' ? 'flex-col gap-1' : 'flex-row items-center flex-1'}`}>
                                                        <span className={`font-bold text-surface-dark group-hover:text-tertiary transition-colors flex items-center gap-1.5 ${group.type === 'primary' ? 'text-[15px]' : 'font-semibold text-[14px]'}`}>
                                                            {item.label}
                                                            {group.type === 'primary' && (
                                                                <Icon icon="solar:arrow-right-linear" className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-tertiary" />
                                                            )}
                                                        </span>
                                                        {item.description && group.type === 'primary' && (
                                                            <p className="text-[13px] text-t-secondary leading-relaxed">{item.description}</p>
                                                        )}
                                                    </div>
                                                    {group.type !== 'primary' && (
                                                        <Icon icon="solar:arrow-right-linear" className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-tertiary ml-auto" />
                                                    )}
                                                </Link>
                                            ))}
                                        </div>

                                        {/* Bottom CTA si existe en el grupo */}
                                        {group.bottomCta && (
                                            <div className="mt-auto pt-6 border-t border-gray-100">
                                                <span className="block text-[11px] font-semibold text-t-secondary mb-2 uppercase tracking-wide">{group.bottomCta.title}</span>
                                                <Link 
                                                    to={group.bottomCta.route} 
                                                    onClick={onClose}
                                                    className="inline-flex items-center gap-1.5 text-surface-dark font-bold hover:text-tertiary group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm text-[14px]"
                                                >
                                                    {group.bottomCta.label}
                                                    <Icon icon="solar:arrow-right-linear" className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                                </Link>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Container>
                </div>
            </div>
        </div>
    );
}
