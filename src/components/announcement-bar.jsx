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
            className={`w-full bg-[#0F172A] text-white overflow-hidden ${transitionClass} ${
                isVisible ? 'max-h-16 opacity-100' : 'max-h-0 opacity-0'
            }`}
            role="region" 
            aria-label="Aviso destacado"
        >
            <Container size="wide">
                <div className="flex items-center justify-between h-10 md:h-11">
                    <Link 
                        to={announcement.href} 
                        className="flex-1 flex items-center justify-center gap-2 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm py-1"
                    >
                        <span className="hidden sm:inline text-sm font-medium">
                            {announcement.desktopMessage}
                        </span>
                        <span className="sm:hidden text-xs font-medium">
                            {announcement.mobileMessage}
                        </span>
                        <Icon icon="solar:arrow-right-linear" className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" />
                    </Link>
                    
                    {announcement.dismissible && (
                        <button 
                            onClick={handleDismiss}
                            className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary shrink-0 text-gray-400 hover:text-white ml-2"
                            aria-label="Cerrar aviso"
                        >
                            <Icon icon="solar:close-circle-linear" className="w-5 h-5" />
                        </button>
                    )}
                </div>
            </Container>
        </div>
    );
}
