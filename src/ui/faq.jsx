import { useState } from "react";
import { Icon } from "@iconify/react";

export default function FAQ({ items, className = "" }) {
    const [openIndex, setOpenIndex] = useState(null);

    const toggle = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className={`flex flex-col divide-y divide-gray-100 ${className}`}>
            {items.map((item, index) => {
                const isOpen = openIndex === index;
                return (
                    <div key={item.id || index} className="py-5">
                        <button
                            className="w-full flex items-start justify-between gap-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm"
                            onClick={() => toggle(index)}
                            aria-expanded={isOpen}
                        >
                            <span className="text-base md:text-lg font-semibold text-gray-900 leading-snug">
                                {item.question}
                            </span>
                            <Icon
                                icon="solar:alt-arrow-down-linear"
                                className={`w-5 h-5 text-gray-400 shrink-0 mt-1 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                            />
                        </button>
                        <div
                            className={`overflow-hidden transition-all duration-200 ${isOpen ? "max-h-96 opacity-100 mt-3" : "max-h-0 opacity-0"}`}
                        >
                            <p className="text-t-secondary leading-relaxed pr-8">
                                {item.answer}
                            </p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
