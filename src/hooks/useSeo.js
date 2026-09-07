import { useEffect } from 'react';
import { company } from '../data/company';

/** Crea o actualiza una etiqueta <meta> por nombre o propiedad. */
function setMeta(attr, key, content) {
    if (!content) return;
    let tag = document.head.querySelector(`meta[${attr}="${key}"]`);
    if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute(attr, key);
        document.head.appendChild(tag);
    }
    tag.setAttribute('content', content);
}

/** Enlace canónico: evita que las variantes de URL compitan entre sí. */
function setCanonical(href) {
    let link = document.head.querySelector('link[rel="canonical"]');
    if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', 'canonical');
        document.head.appendChild(link);
    }
    link.setAttribute('href', href);
}

export function useSeo({ title, description, preventIndex = false, exactTitle = false }) {
    useEffect(() => {
        const formattedTitle = exactTitle
            ? title
            : (title
                ? `${title} — ${company.legalName}`
                : `${company.legalName} — Consultoría y Desarrollo Tecnológico`);

        const finalDescription = description || company.heroDescription;
        const url = typeof window !== 'undefined' ? window.location.href.split('#')[0] : '';

        document.title = formattedTitle;

        setMeta('name', 'description', finalDescription);

        // Open Graph / Twitter: mismos textos, mejor presentación al compartir.
        setMeta('property', 'og:site_name', company.legalName);
        setMeta('property', 'og:type', 'website');
        setMeta('property', 'og:locale', 'es_ES');
        setMeta('property', 'og:title', formattedTitle);
        setMeta('property', 'og:description', finalDescription);
        setMeta('property', 'og:url', url);
        setMeta('name', 'twitter:card', 'summary_large_image');
        setMeta('name', 'twitter:title', formattedTitle);
        setMeta('name', 'twitter:description', finalDescription);

        if (url) setCanonical(url);

        // noindex opcional (404, documentos preliminares…)
        let metaRobots = document.head.querySelector('meta[name="robots"]');
        if (preventIndex) {
            if (!metaRobots) {
                metaRobots = document.createElement('meta');
                metaRobots.setAttribute('name', 'robots');
                document.head.appendChild(metaRobots);
            }
            metaRobots.setAttribute('content', 'noindex, nofollow');
        } else if (metaRobots) {
            metaRobots.remove();
        }
    }, [title, description, preventIndex, exactTitle]);
}
