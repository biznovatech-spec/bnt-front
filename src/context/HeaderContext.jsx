import { createContext, useContext, useState, useEffect } from 'react';

const HeaderContext = createContext();

export function HeaderProvider({ children }) {
    const [isHeaderReady, setIsHeaderReady] = useState(false);
    const [isHeroVisible, setIsHeroVisible] = useState(() => {
        if (typeof window === 'undefined') return false;
        
        const path = window.location.pathname;
        const hash = window.location.hash;
        
        if (path === '/') {
            if (hash) return false;
            // Si scrollY es sustancialmente mayor que 0, probablemente no estamos en el hero.
            // threshold razonable: 100px.
            if (window.scrollY > 100) return false;
            return true;
        }
        return false;
    });

    useEffect(() => {
        const frame = requestAnimationFrame(() => {
            setIsHeaderReady(true);
        });
        return () => cancelAnimationFrame(frame);
    }, []);

    return (
        <HeaderContext.Provider value={{ isHeroVisible, setIsHeroVisible, isHeaderReady }}>
            {children}
        </HeaderContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useHeader() {
    return useContext(HeaderContext);
}
