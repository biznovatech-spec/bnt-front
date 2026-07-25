import { useState } from "react";

export default function FAQ({ items, className = "" }) {
    const [openIndex, setOpenIndex] = useState(null);

    const toggle = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className={`flex flex-col gap-4 ${className}`}>
            {items.map((item, index) => {
                const isOpen = openIndex === index;
                return (
                    <div 
                        key={item.id || index} 
                        className="relative p-5 md:p-6 border border-gray-200 bg-white group transition-all duration-300 cursor-pointer select-none"
                        onClick={() => toggle(index)}
                    >
                        {/* Hover L-Corners (Animated) */}
                        {/* Top Left */}
                        <span className="absolute top-[-1px] left-[-1px] h-[2px] w-0 group-hover:w-3 bg-gray-900 transition-all duration-300 pointer-events-none"></span>
                        <span className="absolute top-[-1px] left-[-1px] w-[2px] h-0 group-hover:h-3 bg-gray-900 transition-all duration-300 pointer-events-none"></span>
                        
                        {/* Top Right */}
                        <span className="absolute top-[-1px] right-[-1px] h-[2px] w-0 group-hover:w-3 bg-gray-900 transition-all duration-300 pointer-events-none"></span>
                        <span className="absolute top-[-1px] right-[-1px] w-[2px] h-0 group-hover:h-3 bg-gray-900 transition-all duration-300 pointer-events-none"></span>
                        
                        {/* Bottom Left */}
                        <span className="absolute bottom-[-1px] left-[-1px] h-[2px] w-0 group-hover:w-3 bg-gray-900 transition-all duration-300 pointer-events-none"></span>
                        <span className="absolute bottom-[-1px] left-[-1px] w-[2px] h-0 group-hover:h-3 bg-gray-900 transition-all duration-300 pointer-events-none"></span>
                        
                        {/* Bottom Right */}
                        <span className="absolute bottom-[-1px] right-[-1px] h-[2px] w-0 group-hover:w-3 bg-gray-900 transition-all duration-300 pointer-events-none"></span>
                        <span className="absolute bottom-[-1px] right-[-1px] w-[2px] h-0 group-hover:h-3 bg-gray-900 transition-all duration-300 pointer-events-none"></span>

                        <div
                            className="w-full flex items-center justify-between gap-4 text-left focus-visible:outline-none"
                            aria-expanded={isOpen}
                        >
                            <span className="text-base md:text-lg font-medium text-gray-900 leading-snug">
                                {item.question}
                            </span>
                            <span className="text-2xl md:text-3xl font-light text-gray-900 shrink-0 leading-none mb-1">
                                {isOpen ? '−' : '+'}
                            </span>
                        </div>
                        <div
                            className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-[500px] opacity-100 mt-4" : "max-h-0 opacity-0"}`}
                        >
                            <p className="text-sm md:text-base text-t-secondary leading-relaxed pr-8">
                                {item.answer}
                            </p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
