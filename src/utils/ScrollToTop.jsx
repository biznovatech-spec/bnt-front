import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
    const { pathname, hash } = useLocation();

    useEffect(() => {
        // Only scroll to top if there is no hash
        if (!hash) {
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'instant' // Instant to avoid visual jump when navigating between pages
            });
        }
    }, [pathname, hash]);

    return null;
}
