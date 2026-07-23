import { useEffect } from 'react';
import { company } from '../data/company';

export function useSeo({ title, description, preventIndex = false }) {
    useEffect(() => {
        // Set document title
        const formattedTitle = title 
            ? `${title} — ${company.legalName}`
            : `${company.legalName} — Consultoría y Desarrollo Tecnológico`;
        
        document.title = formattedTitle;

        // Set or create meta description
        let metaDescription = document.querySelector('meta[name="description"]');
        if (!metaDescription) {
            metaDescription = document.createElement('meta');
            metaDescription.setAttribute('name', 'description');
            document.head.appendChild(metaDescription);
        }
        
        metaDescription.setAttribute('content', description || company.heroDescription);

        // Optional: noindex for specific pages (like 404 or legal placeholders)
        let metaRobots = document.querySelector('meta[name="robots"]');
        if (preventIndex) {
            if (!metaRobots) {
                metaRobots = document.createElement('meta');
                metaRobots.setAttribute('name', 'robots');
                document.head.appendChild(metaRobots);
            }
            metaRobots.setAttribute('content', 'noindex, nofollow');
        } else if (metaRobots) {
            // Eliminar la directiva restrictiva anterior
            metaRobots.remove();
        }

        return () => {
            // Cleanup title (optional, usually left as is until next route)
        };
    }, [title, description, preventIndex]);
}
