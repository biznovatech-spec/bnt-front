import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import Container from "../ui/container";
import SectionHeader from "../ui/section-header";
import { audienceCards } from "../data/hero";

export default function AudienceSection({ variants }) {
    const [activeAudience, setActiveAudience] = useState(0);

    return (
        <motion.section 
            variants={variants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="w-full py-16"
        >
            <Container size="wide">
                <div className="flex flex-col gap-10">
                    <SectionHeader
                        label="PARA QUIÉN CONSTRUIMOS"
                        title="Acompañamos tu proyecto sin importar la etapa"
                        description="No importa si partes de una idea inicial, de un proceso manual o de un sistema en funcionamiento. Analizamos tu situación para diseñar una solución adecuada."
                    />
                    <div className="flex flex-col md:flex-row w-full border border-gray-200 bg-white">
                        {/* Left Column: Tabs */}
                        <div className="w-full md:w-1/3 lg:w-[35%] flex flex-col border-b md:border-b-0 md:border-r border-gray-200">
                            {audienceCards.map((item, index) => {
                                const isActive = activeAudience === index;
                                return (
                                    <button
                                        key={item.title}
                                        onClick={() => setActiveAudience(index)}
                                        className={`relative flex items-center w-full px-6 py-6 text-left border-b border-gray-200 last:border-b-0 transition-colors ${
                                            isActive ? "bg-gray-50" : "hover:bg-gray-50/50"
                                        }`}
                                    >
                                        {isActive && (
                                            <motion.div layoutId="activeTabIndicator" className="absolute inset-0 pointer-events-none">
                                                <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-gray-900"></div>
                                                <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-gray-900"></div>
                                                <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-gray-900"></div>
                                                <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-gray-900"></div>
                                            </motion.div>
                                        )}
                                        <span className={`text-base ${isActive ? "font-bold text-gray-900" : "font-medium text-gray-600"}`}>
                                            {item.title}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>

                        {/* Right Column: Content */}
                        <div className="w-full md:w-2/3 lg:w-[65%] p-8 md:p-12 bg-gray-50/50 flex flex-col justify-center">
                            <motion.div
                                key={activeAudience}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                                    {audienceCards[activeAudience].title}
                                </h3>
                                <p className="text-gray-600 leading-relaxed mb-10 max-w-2xl text-lg">
                                    {audienceCards[activeAudience].text}
                                </p>
                                
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-auto">
                                    <Link 
                                        to={audienceCards[activeAudience].to}
                                        className="group flex items-start gap-3 text-base font-semibold text-gray-900 hover:text-primary transition-colors"
                                    >
                                        <span className="flex-1">{audienceCards[activeAudience].action}</span>
                                        <Icon icon="solar:arrow-right-up-linear" className="w-5 h-5 shrink-0 mt-0.5" />
                                    </Link>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                    <div className="flex flex-col items-start gap-2 border-t border-gray-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
                        <p className="text-sm text-t-secondary">¿No estás seguro de qué opción se ajusta a tu caso?</p>
                        <Link to="/contacto" className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-primary underline-offset-4 hover:underline focus-visible:rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">
                            Conversemos y lo analizamos contigo
                            <Icon icon="solar:arrow-right-linear" className="h-4 w-4" aria-hidden="true" />
                        </Link>
                    </div>
                </div>
            </Container>
        </motion.section>
    );
}
