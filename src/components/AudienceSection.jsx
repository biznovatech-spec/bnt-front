import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";
import { Container, Reveal, SectionHeader } from "../ui";
import { audienceCards as rawAudienceCards } from "../data/hero";

const stageImagesMapping = [
    { image: "/image/idea-stage.webp", imagePosition: "60% center" },
    { image: "/image/digitalize-stage.webp", imagePosition: "55% center" },
    { image: "/image/product-stage.webp", imagePosition: "70% center" },
    { image: "/image/improve-system-stage.webp", imagePosition: "50% center" },
    { image: "/image/guidance-stage.webp", imagePosition: "65% center" }
];

const audienceCards = rawAudienceCards.map((card, idx) => ({
    ...card,
    ...stageImagesMapping[idx]
}));

/**
 * Para quién construimos.
 *
 * Índice de etapas a la izquierda y ficha de la etapa activa a la derecha,
 * con la fotografía sangrando por el borde de la pantalla. Ni una caja: la
 * estructura son filetes, números y aire.
 */
export default function AudienceSection() {
    const [activeAudience, setActiveAudience] = useState(0);
    const activeCard = audienceCards[activeAudience];

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
            document.getElementById(`audience-tab-${newIndex}`)?.focus();
        }
    };

    return (
        <section className="w-full py-[var(--section-py)] bg-canvas">
            <Container size="wide">
                <SectionHeader
                    label="Para quién construimos"
                    index="03"
                    title="Acompañamos tu proyecto sin importar la etapa"
                    description="No importa si partes de una idea inicial, de un proceso manual o de un sistema en funcionamiento. Analizamos tu situación para diseñar una solución adecuada."
                />
            </Container>

            {/* ESCRITORIO — la ficha sangra por el borde derecho */}
            <div className="hidden lg:block mt-16 w-full max-w-[var(--shell-max)] mx-auto pl-[var(--gutter)]">
                <div className="grid grid-cols-12 border-t bd-hair">
                    {/* Índice de etapas */}
                    <div
                        role="tablist"
                        aria-label="Etapas del proyecto"
                        className="col-span-4 xl:col-span-3 flex flex-col border-r bd-hair"
                    >
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
                                    onMouseEnter={() => setActiveAudience(index)}
                                    onKeyDown={(e) => handleKeyDown(e, index)}
                                    className={`stage-row group relative flex items-center gap-5 pr-7 py-7 text-left border-b bd-hair cursor-pointer ${
                                        isActive ? "is-on" : ""
                                    }`}
                                >
                                    {/* Barra de acento: crece desde el centro, no desde arriba */}
                                    <span aria-hidden="true" className="stage-bar" />

                                    <span
                                        className={`index-num micro-label shrink-0 transition-colors duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                                            isActive ? "t-accent" : "t-3"
                                        }`}
                                    >
                                        {item.number}
                                    </span>

                                    <span
                                        className={`flex-1 display-caps text-[clamp(0.92rem,1.05vw,1.15rem)] leading-[1.15] transition-colors duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                                            isActive ? "t-1" : "t-1-dim"
                                        }`}
                                    >
                                        {item.title}
                                    </span>

                                    <Icon
                                        icon="lucide:arrow-right"
                                        aria-hidden="true"
                                        className={`w-4 h-4 shrink-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                                            isActive
                                                ? "opacity-100 translate-x-0 t-accent"
                                                : "opacity-0 -translate-x-2 t-3"
                                        }`}
                                    />
                                </button>
                            );
                        })}
                    </div>

                    {/* Ficha de la etapa activa */}
                    <div
                        role="tabpanel"
                        id="audience-panel-desktop"
                        aria-labelledby={`audience-tab-${activeAudience}`}
                        className="col-span-8 xl:col-span-9 relative border-b bd-hair overflow-hidden"
                    >
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeAudience}
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -6 }}
                                transition={{
                                    duration: 0.6,
                                    ease: [0.16, 1, 0.3, 1],
                                    opacity: { duration: 0.45 },
                                }}
                                className="grid grid-cols-12 h-full min-h-[clamp(420px,38vw,560px)]"
                            >
                                <div className="col-span-6 flex flex-col justify-between gap-10 py-12 px-10 xl:px-14">
                                    <div className="flex flex-col gap-6">
                                        <span className="micro-label t-accent">
                                            {activeCard.number}
                                            <span aria-hidden="true" className="opacity-40 mx-2">/</span>
                                            {activeCard.stage}
                                        </span>

                                        <h3 className="display-caps text-[clamp(1.5rem,2.4vw,2.4rem)] t-1 max-w-[14ch]">
                                            {activeCard.title}
                                        </h3>

                                        <p className="copy max-w-[46ch]">{activeCard.text}</p>
                                    </div>

                                    <div className="flex flex-col gap-6">
                                        <div className="flex flex-col gap-3 pt-6 border-t bd-hair">
                                            <span className="micro-label t-3">
                                                Servicios para esta etapa
                                            </span>
                                            <div className="flex flex-wrap gap-x-6 gap-y-2">
                                                {activeCard.related?.map((rel) => (
                                                    <Link
                                                        key={rel.label}
                                                        to={rel.href}
                                                        className="inline-flex items-center gap-1.5 text-sm t-1-soft hover:t-accent transition-colors link-underline"
                                                    >
                                                        {rel.label}
                                                        <Icon
                                                            icon="lucide:arrow-up-right"
                                                            className="w-3.5 h-3.5 opacity-50"
                                                            aria-hidden="true"
                                                        />
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>

                                        <Link to={activeCard.to} className="btn btn-primary group w-fit">
                                            {activeCard.action}
                                            <Icon
                                                icon="lucide:arrow-right"
                                                className="w-4 h-4 arrow-shift"
                                                aria-hidden="true"
                                            />
                                        </Link>
                                    </div>
                                </div>

                                <div className="col-span-6 relative overflow-hidden border-l bd-hair">
                                    <motion.img
                                        src={activeCard.image}
                                        alt={activeCard.title}
                                        className="w-full h-full object-cover"
                                        style={{ objectPosition: activeCard.imagePosition }}
                                        loading="lazy"
                                        initial={{ scale: 1.05 }}
                                        animate={{ scale: 1 }}
                                        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                                    />
                                    <div
                                        aria-hidden="true"
                                        className="deco absolute inset-0 grid-hairline"
                                        style={{ "--cell": "48px" }}
                                    />
                                    <span className="absolute bottom-0 left-0 flex items-center gap-2.5 px-4 py-2.5 bg-[var(--panel-bg)] border-t border-r bd-hair">
                                        <span aria-hidden="true" className="w-1.5 h-1.5 fill-accent" />
                                        <span className="micro-label t-2">
                                            {activeCard.stage}
                                        </span>
                                    </span>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>

            {/* MÓVIL */}
            <Container size="wide">
                <div className="lg:hidden mt-12 flex flex-col border-t bd-hair">
                    {audienceCards.map((item, index) => {
                        const isOpen = activeAudience === index;
                        return (
                            <div key={item.title} className="border-b bd-hair">
                                <button
                                    type="button"
                                    onClick={() => setActiveAudience(isOpen ? -1 : index)}
                                    aria-expanded={isOpen}
                                    className="w-full flex items-center gap-5 py-6 text-left"
                                >
                                    <span
                                        className={`num-solid text-[1.4rem] shrink-0 ${
                                            isOpen
                                                ? "t-accent"
                                                : "t-1-mute"
                                        }`}
                                    >
                                        {item.number}
                                    </span>
                                    <span className="flex-1 display-caps text-[1rem] t-1">
                                        {item.title}
                                    </span>
                                    <span
                                        aria-hidden="true"
                                        className={`grid place-items-center w-8 h-8 border bd transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                                            isOpen ? "rotate-45 t-accent" : "text-t-secondary"
                                        }`}
                                    >
                                        <Icon icon="lucide:plus" className="w-4 h-4" />
                                    </span>
                                </button>

                                <div
                                    className="grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                                    style={{ gridTemplateRows: isOpen ? "1fr" : "0fr", opacity: isOpen ? 1 : 0 }}
                                >
                                    <div className="overflow-hidden">
                                        <div className="flex flex-col gap-6 pb-8">
                                            <span className="micro-label t-accent">
                                                {item.stage}
                                            </span>
                                            <p className="copy">{item.text}</p>

                                            <div className="relative w-full aspect-[16/10] overflow-hidden border bd-hair">
                                                <img
                                                    src={item.image}
                                                    alt={item.title}
                                                    className="w-full h-full object-cover"
                                                    style={{ objectPosition: item.imagePosition }}
                                                    loading="lazy"
                                                />
                                            </div>

                                            <div className="flex flex-col gap-3">
                                                <span className="micro-label t-3">
                                                    Servicios para esta etapa
                                                </span>
                                                <div className="flex flex-col gap-2">
                                                    {item.related?.map((rel) => (
                                                        <Link
                                                            key={rel.label}
                                                            to={rel.href}
                                                            className="inline-flex items-center gap-1.5 text-sm t-1-soft hover:t-accent transition-colors w-fit"
                                                        >
                                                            {rel.label}
                                                            <Icon
                                                                icon="lucide:arrow-up-right"
                                                                className="w-3.5 h-3.5 opacity-50"
                                                                aria-hidden="true"
                                                            />
                                                        </Link>
                                                    ))}
                                                </div>
                                            </div>

                                            <Link to={item.to} className="btn btn-primary btn-block group">
                                                {item.action}
                                                <Icon
                                                    icon="lucide:arrow-right"
                                                    className="w-4 h-4 arrow-shift"
                                                    aria-hidden="true"
                                                />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <Reveal
                    delay={80}
                    className="mt-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-8 border-t bd-hair"
                >
                    <p className="copy">¿No estás seguro de qué opción se ajusta a tu caso?</p>
                    <Link
                        to="/contacto"
                        className="group inline-flex items-center gap-2 micro-label t-1 hover:t-accent transition-colors"
                    >
                        Conversemos y lo analizamos contigo
                        <Icon icon="lucide:arrow-right" className="w-4 h-4 arrow-shift" aria-hidden="true" />
                    </Link>
                </Reveal>
            </Container>
        </section>
    );
}
