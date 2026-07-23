import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import SectionHeader from "../ui/section-header";
import { getPriorityServices } from "../data/services";

export default function Services() {
    const priorityServices = getPriorityServices(4);

    return (
        <section className="flex flex-col py-16" id="services">
            <div className="flex flex-col lg:flex-row items-start gap-6 lg:gap-12 mb-12">
                <div className="w-full lg:w-1/2">
                    <SectionHeader 
                        label="NUESTROS SERVICIOS"
                        title="Soluciones digitales a la medida de tu proyecto"
                    />
                </div>
                <div className="w-full lg:w-1/2 lg:mt-8">
                    <p className="text-left w-full lg:w-4/5 text-t-secondary text-lg leading-relaxed">
                        Combinamos estrategia, diseño y tecnología para desarrollar soluciones que generan impacto real. Te acompañamos desde el diagnóstico hasta la implementación.
                    </p>
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {priorityServices.map((item) => (
                    <Link key={item.id} to={`/servicios/${item.slug}`} className="p-6 rounded-2xl flex flex-col space-y-4 hover:bg-white hover:shadow-sm transition-all duration-300 border border-gray-100 hover:border-primary/30 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                        <Icon icon={item.icon} className="text-4xl text-primary" />
                        <h3 className="font-bold text-lg text-gray-900 group-hover:text-primary transition-colors">{item.name}</h3>
                        <p className="text-t-secondary text-sm text-left leading-relaxed flex-1">{item.shortDescription}</p>
                        <span className="text-primary text-sm font-semibold flex items-center gap-1.5 mt-auto">
                            Ver servicio
                            <Icon icon="solar:arrow-up-linear" className="w-4 h-4 rotate-45" />
                        </span>
                    </Link>
                ))}
            </div>
            <div className="mt-10 flex justify-center">
                <Link to="/servicios" className="inline-flex items-center gap-2 px-6 py-3 bg-gray-50 border border-gray-200 text-gray-900 font-medium rounded-lg hover:bg-gray-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                    Ver todos los servicios
                    <Icon icon="solar:arrow-right-linear" className="w-5 h-5" />
                </Link>
            </div>
        </section>
    );
}