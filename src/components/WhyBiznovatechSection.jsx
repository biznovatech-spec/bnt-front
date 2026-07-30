import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import Container from "../ui/container";
import { whyValues } from "../data/hero";

export default function WhyBiznovatechSection({ variants }) {
    return (
        <motion.section 
            variants={variants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="w-full py-20 border-t border-gray-100"
        >
            <Container size="wide">
                <div className="flex flex-col gap-16">
                    <div className="max-w-2xl">
                        <span className="text-xs font-bold tracking-[0.2em] text-primary uppercase">Por qué Biznovatech</span>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mt-4">
                            Un proyecto no empieza con código.{" "}
                            <span className="text-t-secondary font-normal">Empieza entendiendo lo que necesitas resolver.</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                        {whyValues.map((item, index) => (
                            <motion.div 
                                key={item.step} 
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                className="flex gap-5 group"
                            >
                                <div className="flex flex-col items-center shrink-0">
                                    <div className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center group-hover:border-primary/40 transition-colors">
                                        <Icon icon={item.icon} className="w-5 h-5 text-primary" />
                                    </div>
                                    <div className="w-px flex-1 bg-gray-200 mt-3 hidden md:block"></div>
                                </div>
                                <div className="flex flex-col gap-2 pb-2">
                                    <span className="text-xs font-bold text-primary tracking-wider">{item.step}</span>
                                    <h3 className="text-lg font-bold text-gray-900">{item.title}</h3>
                                    <p className="text-sm text-t-secondary leading-relaxed">{item.text}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </Container>
        </motion.section>
    );
}
