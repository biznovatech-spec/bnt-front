import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { announcement } from '../data/announcement';
import Container from '../ui/container';

export default function AnnouncementBar({ isVisible, isHeaderReady }) {
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

    const transitionClass = isHeaderReady ? 'transition-all duration-300 ease-in-out' : 'transition-none';

    return (
        <div 
            className={`w-full bg-[#25C6FD] text-white overflow-hidden ${transitionClass} ${
                isVisible ? 'max-h-12 opacity-100' : 'max-h-0 opacity-0'
            }`}
            role="region" 
            aria-label="Aviso destacado"
        >
            <Container size="wide">
                <div className="flex items-center justify-between h-10 md:h-[42px] gap-2 lg:gap-4 text-[13px] md:text-[14px]">
                    
                    {/* LEFT / CENTER CONTENT */}
                    <div className="flex flex-1 items-center justify-start xl:justify-center gap-3 lg:gap-5 overflow-hidden">
                        
                        {/* ZONE 1: MAIN MESSAGE */}
                        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0 min-w-0">
                            <Icon icon="solar:bolt-linear" className="w-[16px] h-[16px] sm:w-[18px] sm:h-[18px] shrink-0" />
                            <span className="truncate text-xs sm:text-[13px] md:text-[14px]">
                                <span className="hidden sm:inline">Transformamos ideas en </span>
                                <span className="text-[#0F172A] font-semibold">soluciones digitales</span>
                                <span className="hidden lg:inline"> que impulsan tu proyecto.</span>
                            </span>
                        </div>

                        {/* ZONE 2: BENEFIT 1 */}
                        <div className="hidden md:block w-px h-3.5 bg-white/30 shrink-0" />
                        <div className="hidden md:flex items-center gap-2 shrink-0">
                            <Icon icon="solar:users-group-two-rounded-linear" className="w-[18px] h-[18px]" />
                            <span>Acompañamiento personalizado</span>
                        </div>

                        {/* ZONE 3: TRUST */}
                        <div className="hidden xl:block w-px h-3.5 bg-white/30 shrink-0" />
                        <div className="hidden xl:flex items-center gap-2 shrink-0">
                            <Icon icon="solar:shield-check-linear" className="w-[18px] h-[18px]" />
                            <span>Tecnología segura y confiable</span>
                        </div>
                        
                    </div>

                    {/* RIGHT SIDE: CTA & CLOSE */}
                    <div className="flex items-center gap-2 sm:gap-3 shrink-0 sm:border-l border-white/30 sm:pl-3 ml-auto">
                        <Link 
                            to="/contacto"
                            className="flex items-center gap-1 sm:gap-1.5 text-[#0F172A] font-semibold group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F172A] rounded-sm transition-opacity active:opacity-75 duration-200 text-xs sm:text-[13px] md:text-[14px]"
                        >
                            <Icon icon="solar:chat-round-line-linear" className="w-[14px] h-[14px] sm:w-[16px] sm:h-[16px] hidden sm:block" />
                            <span>Conversemos</span>
                            <Icon icon="solar:arrow-right-linear" className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 motion-safe:transition-transform duration-200" />
                        </Link>

                        <button 
                            onClick={handleDismiss}
                            className="flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 rounded-md hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F172A] transition-colors duration-200 text-white shrink-0 ml-1 sm:ml-0"
                            aria-label="Cerrar aviso"
                        >
                            <Icon icon="solar:close-linear" className="w-[16px] h-[16px] sm:w-[18px] sm:h-[18px]" />
                        </button>
                    </div>
                    
                </div>
            </Container>
        </div>
    );
}
