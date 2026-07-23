import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import SectionHeader from "../ui/section-header";

const serviceShowcase = [
    {
        title: "Consultoría Tecnológica",
        text: "Analizamos tu negocio y diseñamos estrategias tecnológicas efectivas",
        icon: "hugeicons:nano-technology",
        to: "/servicios/consultoria-tecnologica",
    },
    {
        title: "Desarrollo de Software",
        text: "Creamos aplicaciones escalables, seguras y de alto rendimiento",
        icon: "ph:code-duotone",
        to: "/servicios/desarrollo-software",
    },
    {
        title: "Inteligencia Artificial",
        text: "Automatizamos procesos y extraemos valor de tus datos.",
        icon: "fluent:brain-sparkle-32-regular",
        to: "/servicios/inteligencia-artificial",
    },
    {
        title: "Diseño UI/UX",
        text: "Diseñamos experiencias centradas en el usuario que generan resultados",
        icon: "streamline-freehand:responsive-design-expand",
        to: "/servicios/diseno-ux-ui",
    },
    {
        title: "Cloud & DevOps",
        text: "Implementamos soluciones en la nube con maxima disponibilidad y seguridad",
        icon: "tabler:cloud-code",
        to: "/servicios/cloud-devops",
    },
];

export default function Services() {
    return (
        <section className="flex flex-col py-20" id="services">
            <div className="mb-12 flex flex-col items-start gap-6 lg:flex-row lg:gap-12">
                <div className="w-full lg:w-1/2">
                    <SectionHeader
                        label="NUESTROS SERVICIOS"
                        title="Soluciones digitales a la medida de tu negocio"
                    />
                </div>
                <div className="w-full lg:mt-8 lg:w-1/2">
                    <p className="w-full text-left text-lg leading-relaxed text-t-secondary lg:w-4/5">
                        Combinamos estrategia, tecnología y creatividad para desarrollar soluciones que generan impacto real.
                    </p>
                </div>
            </div>

            <div className="mx-auto flex w-full max-w-[1540px] flex-wrap justify-center gap-x-20 gap-y-16 pt-8 xl:justify-between xl:gap-x-10">
                {serviceShowcase.map((item) => (
                    <Link
                        key={item.title}
                        to={item.to}
                        className="group block w-[210px] rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-8"
                    >
                        <Icon
                            icon={item.icon}
                            className="mb-7 h-16 w-16 text-black transition-[opacity,transform] duration-200 ease-out group-hover:-translate-y-0.5 group-hover:opacity-75 group-focus-visible:-translate-y-0.5 group-focus-visible:opacity-75 motion-reduce:transform-none motion-reduce:transition-none"
                            aria-hidden="true"
                        />
                        <h3 className="text-xl font-bold leading-snug text-black">
                            {item.title}
                        </h3>
                        <span className="mt-3 block h-px w-12 origin-left scale-x-0 bg-black transition-transform duration-200 ease-out group-hover:scale-x-100 group-focus-visible:scale-x-100 motion-reduce:transition-none" />
                        <p className="mt-4 text-base leading-relaxed text-t-secondary">
                            {item.text}
                        </p>
                    </Link>
                ))}
            </div>

            <div className="mt-16 flex justify-center">
                <Link to="/servicios" className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-6 py-3 font-medium text-gray-900 transition-colors hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                    Ver todos los servicios
                    <Icon icon="solar:arrow-right-linear" className="h-5 w-5" />
                </Link>
            </div>
        </section>
    );
}
