import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";
import Container from "../ui/container";
import SectionHeader from "../ui/section-header";
import { audienceCards as rawAudienceCards } from "../data/hero";

/* ==========================================================================
   MAPEO EXACTO DE IMÁGENES EDITORIALES Y ENCUADRES (PUBLIC FOLDER)
   ========================================================================== */
const stageImagesMapping = [
    { image: "/image/idea-stage.webp", imagePosition: "60% center" },
    { image: "/image/digitalize-stage.webp", imagePosition: "55% center" },
    { image: "/image/product-stage.webp", imagePosition: "70% center" },
    { image: "/image/improve-system-stage.webp", imagePosition: "50% center" },
    { image: "/image/guidance-stage.webp", imagePosition: "65% center" }
];

// Enriquecemos los datos existentes con las imágenes públicas y su encuadre individual
const audienceCards = rawAudienceCards.map((card, idx) => ({
    ...card,
    ...stageImagesMapping[idx]
}));

export default function AudienceSection({ variants }) {
    const [activeAudience, setActiveAudience] = useState(0);
    const activeCard = audienceCards[activeAudience];

    const fallbackVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    };

    // Navegación accesible por teclado para el patrón Tablist en escritorio
    const handleKeyDown = (e, currentIndex) => {
        let newIndex = currentIndex;
        if (e.key === "ArrowDown" || e.key === "ArrowRight") {
            e.preventDefault();
            newIndex = (currentIndex + 1) % audienceCards.length;
        } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
            e.preventDefault();
            newIndex = (currentIndex - 1 + audienceCards.length) % audienceCards.length;
        } else if (e.key === "Home") {
            e.preventDefault();
            newIndex = 0;
        } else if (e.key === "End") {
            e.preventDefault();
            newIndex = audienceCards.length - 1;
        }

        if (newIndex !== currentIndex) {
            setActiveAudience(newIndex);
            const targetTab = document.getElementById(`audience-tab-${newIndex}`);
            targetTab?.focus();
        }
    };

    return (
        <motion.section 
            variants={variants || fallbackVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="w-full py-24 bg-white text-[#0F172A]"
        >
            <Container size="wide">
                <div className="flex flex-col gap-12 xl:gap-16">
                    {/* Cabecera intacta de la sección */}
                    <SectionHeader
                        label="PARA QUIÉN CONSTRUIMOS"
                        title="Acompañamos tu proyecto sin importar la etapa"
                        description="No importa si partes de una idea inicial, de un proceso manual o de un sistema en funcionamiento. Analizamos tu situación para diseñar una solución adecuada."
                    />

                    {/* Contenedor Principal: Composición Editorial Abierta (Sin bordes de caja, fondo blanco) */}
                    <div className="w-full bg-white">
                        
                        {/* 1. ESCRITORIO Y TABLET GRANDE (Navegación Compacta + Contenido Editorial y Foto de gran presencia) */}
                        <div className="hidden lg:grid grid-cols-12 min-h-[480px]">
                            
                            {/* Columna Izquierda: Navegación Compacta (25% / col-span-3) */}
                            <div 
                                role="tablist" 
                                aria-label="Etapas del proyecto"
                                className="col-span-3 border-r border-slate-200/80 flex flex-col justify-center py-2 lg:pr-6 bg-white z-10"
                            >
                                <div className="flex flex-col gap-1.5">
                                    {audienceCards.map((item, index) => {
                                        const isActive = activeAudience === index;
                                        return (
                                            <button
                                                key={item.title}
                                                role="tab"
                                                id={`audience-tab-${index}`}
                                                aria-selected={isActive}
                                                aria-controls="audience-panel-desktop"
                                                tabIndex={isActive ? 0 : -1}
                                                onClick={() => setActiveAudience(index)}
                                                onKeyDown={(e) => handleKeyDown(e, index)}
                                                className={`group relative flex items-center justify-between px-5 py-4 text-left rounded-xl transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#0A84FF] ${
                                                    isActive 
                                                        ? "bg-slate-100 font-extrabold text-[#0F172A]" 
                                                        : "bg-white hover:bg-slate-50/80 font-medium text-slate-500 hover:text-slate-800"
                                                }`}
                                            >
                                                {/* Indicador lateral cian */}
                                                {isActive && (
                                                    <motion.div 
                                                        layoutId="audienceActiveTabIndicator"
                                                        transition={{ duration: 0.25, ease: "easeInOut" }}
                                                        className="absolute inset-y-2.5 left-0 w-[3.5px] bg-[#25C6FD] z-20 rounded-r-full" 
                                                    />
                                                )}

                                                <div className="flex items-center gap-3 min-w-0 flex-1">
                                                    <span className={`text-xs font-extrabold tracking-wider uppercase transition-colors shrink-0 ${
                                                        isActive ? "text-[#0A84FF]" : "text-slate-400 group-hover:text-slate-500"
                                                    }`}>
                                                        {item.number}
                                                    </span>
                                                    <Icon 
                                                        icon={item.icon} 
                                                        className={`w-4 h-4 shrink-0 transition-colors ${
                                                            isActive ? "text-[#0A84FF]" : "text-slate-400 group-hover:text-slate-600"
                                                        }`} 
                                                    />
                                                    <span className="text-sm xl:text-base truncate">
                                                        {item.title}
                                                    </span>
                                                </div>

                                                <Icon 
                                                    icon="lucide:chevron-right" 
                                                    className={`w-4 h-4 text-slate-300 shrink-0 transition-all ${
                                                        isActive ? "text-[#0A84FF] translate-x-0.5 opacity-100" : "opacity-0 group-hover:opacity-60"
                                                    }`} 
                                                />
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Columna Derecha: Panel Activo con Mayor Presencia (75% / col-span-9) */}
                            <div 
                                role="tabpanel"
                                id="audience-panel-desktop"
                                aria-labelledby={`audience-tab-${activeAudience}`}
                                className="col-span-9 bg-white flex flex-col justify-center lg:pl-10 xl:pl-16 relative overflow-hidden"
                            >
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={activeAudience}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.25, ease: "easeInOut" }}
                                        className="flex flex-col lg:flex-row items-stretch h-full min-w-0"
                                    >
                                        {/* A. CONTENIDO EDITORIAL (Approx. 54%) */}
                                        <div className="lg:w-[54%] py-8 xl:py-12 lg:pr-10 xl:pr-14 flex flex-col justify-between gap-8 min-w-0 z-10 my-auto bg-white/60 lg:bg-transparent">
                                            <div className="space-y-4">
                                                {/* Etiqueta tipográfica editorial limpia */}
                                                <div className="flex items-center gap-2 text-xs font-extrabold tracking-[0.18em] uppercase text-[#0A84FF]">
                                                    <span>{activeCard.number}</span>
                                                    <span className="text-slate-300">/</span>
                                                    <span>{activeCard.stage}</span>
                                                </div>

                                                <h3 className="text-3xl xl:text-4xl font-extrabold text-[#0F172A] tracking-tight leading-tight">
                                                    {activeCard.title}
                                                </h3>

                                                <p className="text-base xl:text-lg text-[#4B5563] leading-relaxed">
                                                    {activeCard.text}
                                                </p>
                                            </div>

                                            {/* Servicios para esta etapa */}
                                            <div className="flex flex-col gap-2.5 pt-4 border-t border-slate-100">
                                                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                                                    Servicios para esta etapa
                                                </span>
                                                <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                                                    {activeCard.related?.map((rel) => (
                                                        <Link
                                                            key={rel.label}
                                                            to={rel.href}
                                                            className="group inline-flex items-center gap-1.5 py-1 text-sm font-semibold text-[#0F172A] hover:text-[#0A84FF] transition-colors underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A84FF]"
                                                        >
                                                            <span>{rel.label}</span>
                                                            <Icon 
                                                                icon="lucide:arrow-up-right" 
                                                                className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#0A84FF] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" 
                                                            />
                                                        </Link>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* CTA Principal: Sistema Premium Navy con acento Cian */}
                                            <div className="pt-2">
                                                <Link
                                                    to={activeCard.to}
                                                    className="group inline-flex items-center gap-3 px-8 py-4 rounded-xl font-bold text-sm xl:text-base bg-[#0F172A] text-white hover:bg-slate-800 shadow-md hover:shadow-xl hover:shadow-slate-950/10 active:scale-[0.98] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#0F172A] w-fit"
                                                >
                                                    <span>{activeCard.action}</span>
                                                    <Icon icon="lucide:arrow-right" className="w-4 h-4 text-[#25C6FD] group-hover:translate-x-1.5 transition-transform" />
                                                </Link>
                                            </div>
                                        </div>

                                        {/* B. IMAGEN EDITORIAL REAL (Approx. 46%) */}
                                        <div className="lg:w-[46%] relative min-h-[320px] lg:min-h-0 overflow-hidden select-none bg-slate-50/50">
                                            <img 
                                                src={activeCard.image}
                                                alt={activeCard.title}
                                                className="w-full h-full object-cover block transition-all duration-500"
                                                style={{ objectPosition: activeCard.imagePosition }}
                                                loading="lazy"
                                            />
                                            {/* Fade suave hacia el fondo BLANCO en el borde izquierdo (Escritorio) */}
                                            <div 
                                                className="hidden lg:block absolute inset-y-0 left-0 w-44 bg-gradient-to-r from-white via-white/85 to-transparent pointer-events-none" 
                                                aria-hidden="true" 
                                            />
                                            {/* Fade superior suave hacia blanco si en tablet se dispusieran en columna */}
                                            <div 
                                                className="block lg:hidden absolute top-0 inset-x-0 h-20 bg-gradient-to-b from-white to-transparent pointer-events-none" 
                                                aria-hidden="true" 
                                            />
                                        </div>
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        </div>

                        {/* 2. MÓVIL Y TABLET COMPACTA (Acordeón Accesible, Fondo Blanco) */}
                        <div className="lg:hidden flex flex-col divide-y divide-slate-100 border-t border-b border-slate-100">
                            {audienceCards.map((item, index) => {
                                const isOpen = activeAudience === index;
                                return (
                                    <div key={item.title} className="flex flex-col bg-white">
                                        <button
                                            type="button"
                                            onClick={() => setActiveAudience(index)}
                                            aria-expanded={isOpen}
                                            className={`flex items-center justify-between gap-4 w-full p-5 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#0A84FF] ${
                                                isOpen ? "bg-slate-50 font-extrabold text-[#0F172A]" : "bg-white hover:bg-slate-50/50 font-semibold text-slate-700"
                                            }`}
                                        >
                                            <div className="flex items-center gap-3 min-w-0">
                                                <span className={`text-xs font-bold tracking-wider uppercase shrink-0 px-2 py-0.5 rounded ${
                                                    isOpen ? "bg-[#0A84FF] text-white" : "bg-slate-100 text-slate-500"
                                                }`}>
                                                    ETAPA {item.number}
                                                </span>
                                                <Icon 
                                                    icon={item.icon} 
                                                    className={`w-4 h-4 shrink-0 ${
                                                        isOpen ? "text-[#0A84FF]" : "text-slate-400"
                                                    }`} 
                                                />
                                                <span className="text-sm sm:text-base truncate">
                                                    {item.title}
                                                </span>
                                            </div>
                                            <Icon 
                                                icon="lucide:chevron-down" 
                                                className={`w-5 h-5 shrink-0 text-slate-400 transition-transform duration-300 ${
                                                    isOpen ? "rotate-180 text-[#0A84FF]" : ""
                                                }`} 
                                            />
                                        </button>

                                        {/* Contenido Desplegable del Acordeón en Móvil */}
                                        <AnimatePresence initial={false}>
                                            {isOpen && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: "auto", opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{ duration: 0.25, ease: "easeInOut" }}
                                                    className="overflow-hidden bg-white"
                                                >
                                                    <div className="p-5 sm:p-6 flex flex-col gap-6 border-t border-slate-100">
                                                        <div>
                                                            <div className="flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-widest text-[#0A84FF]">
                                                                <span>{item.number}</span>
                                                                <span className="text-slate-300">/</span>
                                                                <span>{item.stage}</span>
                                                            </div>
                                                            <p className="mt-2 text-sm sm:text-base text-[#4B5563] leading-relaxed">
                                                                {item.text}
                                                            </p>
                                                        </div>

                                                        {/* Fotografía Editorial Real en Móvil */}
                                                        <div className="relative w-full h-56 sm:h-64 rounded-xl overflow-hidden bg-slate-50 shadow-xs">
                                                            <img 
                                                                src={item.image} 
                                                                alt={item.title} 
                                                                className="w-full h-full object-cover block" 
                                                                style={{ objectPosition: item.imagePosition }}
                                                                loading="lazy"
                                                            />
                                                        </div>

                                                        <div>
                                                            <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2.5">
                                                                Servicios para esta etapa
                                                            </span>
                                                            <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3">
                                                                {item.related?.map((rel) => (
                                                                    <Link
                                                                        key={rel.label}
                                                                        to={rel.href}
                                                                        className="group inline-flex items-center gap-1.5 text-xs font-semibold text-[#0F172A] hover:text-[#0A84FF] underline-offset-4 hover:underline transition-colors"
                                                                    >
                                                                        <span>{rel.label}</span>
                                                                        <Icon icon="lucide:arrow-up-right" className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#0A84FF] transition-colors" />
                                                                    </Link>
                                                                ))}
                                                            </div>
                                                        </div>

                                                        <div className="pt-1">
                                                            <Link
                                                                to={item.to}
                                                                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-bold text-sm bg-[#0F172A] text-white hover:bg-slate-800 shadow-xs active:scale-[0.98] transition-all w-full sm:w-auto"
                                                            >
                                                                <span>{item.action}</span>
                                                                <Icon icon="lucide:arrow-right" className="w-4 h-4 text-[#25C6FD]" />
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* 3. SALIDA SECUNDARIA DISCRETA (Fuera y debajo de la experiencia) */}
                    <div className="w-full pt-4 flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-4 text-center sm:text-left border-t border-slate-100">
                        <p className="text-sm font-medium text-[#4B5563]">
                            ¿No estás seguro de qué opción se ajusta a tu caso?
                        </p>
                        <Link 
                            to="/contacto" 
                            className="group inline-flex items-center gap-2 text-sm font-bold text-[#0F172A] hover:text-[#0A84FF] transition-colors underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A84FF] rounded-sm"
                        >
                            <span>Conversemos y lo analizamos contigo</span>
                            <Icon icon="lucide:arrow-right" className="w-4 h-4 text-[#0A84FF] group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </div>
            </Container>
        </motion.section>
    );
}

