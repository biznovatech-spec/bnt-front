import { useState } from "react";
import { Icon } from "@iconify/react";

/**
 * Acordeón de preguntas frecuentes.
 *
 * Filas separadas por hairline (no tarjetas): el índice monoespaciado a la
 * izquierda y un signo que gira 45° al abrir. La altura se anima con grid
 * (`grid-template-rows`), que evita los saltos de los max-height fijos.
 */
export default function FAQ({ items, className = "" }) {
    const [openIndex, setOpenIndex] = useState(null);

    const toggle = (index) => setOpenIndex(openIndex === index ? null : index);

    return (
        <div className={`flex flex-col ${className}`}>
            {items.map((item, index) => {
                const isOpen = openIndex === index;
                return (
                    <div key={item.id || index} className="hair-t last:border-b last:bd-hair">
                        <button
                            type="button"
                            onClick={() => toggle(index)}
                            aria-expanded={isOpen}
                            className="group w-full flex items-start gap-5 md:gap-8 py-6 md:py-7 text-left cursor-pointer"
                        >
                            <span
                                className={`index-num micro-label pt-1.5 shrink-0 transition-colors duration-300 ${
                                    isOpen
                                        ? "t-accent"
                                        : "t-3 group-hover:t-accent"
                                }`}
                            >
                                {String(index + 1).padStart(2, "0")}
                            </span>

                            <span
                                className={`flex-1 display-xs text-[clamp(1rem,0.6vw+0.9rem,1.22rem)] transition-colors duration-300 ${
                                    isOpen
                                        ? "t-1"
                                        : "t-1-soft group-hover:t-1"
                                }`}
                            >
                                {item.question}
                            </span>

                            <span
                                className={`shrink-0 mt-0.5 grid place-items-center w-8 h-8 border bd transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                                    isOpen
                                        ? "rotate-45 bd-accent t-accent"
                                        : "t-2 group-hover:bd-strong"
                                }`}
                                aria-hidden="true"
                            >
                                <Icon icon="lucide:plus" className="w-4 h-4" />
                            </span>
                        </button>

                        <div
                            className="grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                            style={{
                                gridTemplateRows: isOpen ? "1fr" : "0fr",
                                opacity: isOpen ? 1 : 0,
                            }}
                        >
                            <div className="overflow-hidden">
                                <p className="copy pb-7 pr-8 md:pl-[calc(2rem+2.5rem)] max-w-[70ch]">
                                    {item.answer}
                                </p>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
