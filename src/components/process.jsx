import { useState } from "react";
import { ProcessText } from "../utils/process";
import Title from "../ui/title";

export default function Process() {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <section className="flex flex-col lg:flex-row gap-12 py-16 w-full justify-between items-start" id="process">
            <div className="w-full lg:w-1/3 shrink-0">
                <Title variant="primary" titulo="COMO TRABAJAMOS" />
                <div className="w-full mt-4">
                    <Title variant="secondary" titulo="Un proceso claro para resultados reales" />
                </div>
            </div>
            
            <div className="w-full lg:w-2/3">
                {/* Desktop Version */}
                <div className="hidden md:block relative pt-2 pb-6 overflow-hidden">
                    <div className="absolute top-[1.35rem] left-0 w-full h-[1px] bg-gray-200 z-0"></div>
                    <div className="absolute top-[1.1rem] right-0 w-2 h-2 border-t border-r border-gray-300 transform rotate-45 z-0"></div>
                    <div className="flex w-full">
                        {ProcessText.map((item, index) => (
                            <div 
                                key={item.id} 
                                className="flex-1 flex flex-col relative cursor-pointer"
                                onMouseEnter={() => setActiveIndex(index)}
                            >
                                <div className="h-10 flex items-center mb-4 relative z-10 pl-6">
                                    <div className={`w-8 h-8 rounded-full border-4 flex items-center justify-center -ml-[0.875rem] transition-colors duration-300 ${activeIndex === index ? 'border-primary/20 bg-white' : 'border-transparent'}`}>
                                        <div className={`rounded-full transition-all duration-300 ${activeIndex === index ? 'w-2 h-2 bg-primary' : 'w-1.5 h-1.5 bg-gray-400'}`}></div>
                                    </div>
                                </div>

                                <div className={`flex h-full transition-colors duration-300 ${index !== 0 ? 'border-l border-gray-100' : ''}`}>
                                    <div className={`flex flex-col items-start gap-3 ${index !== 0 ? 'pl-8' : 'pl-2'} pr-4 transition-transform duration-300 ${activeIndex === index ? '-translate-y-1' : ''}`}>
                                        <span className={`text-lg font-bold transition-colors duration-300 ${activeIndex === index ? 'text-primary' : 'text-gray-900'}`}>{item.id}</span>
                                        <h3 className="text-lg font-bold text-gray-900">{item.title}</h3>
                                        <p className="text-sm text-t-secondary leading-relaxed">{item.text}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Mobile Version */}
                <div className="md:hidden flex flex-col gap-8 relative">
                    <div className="absolute left-[0.9rem] top-4 bottom-4 w-[1px] bg-gray-200 z-0"></div>
                    {ProcessText.map((item) => (
                        <div key={item.id} className="flex gap-6 relative z-10">
                            <div className="h-8 flex items-start pt-1">
                                <div className="w-8 h-8 rounded-full border-4 border-primary/20 bg-white flex items-center justify-center shrink-0">
                                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2 pb-4">
                                <div className="flex items-center gap-3">
                                    <span className="text-primary font-bold">{item.id}</span>
                                    <h3 className="font-bold text-gray-900">{item.title}</h3>
                                </div>
                                <p className="text-sm text-t-secondary">{item.text}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}