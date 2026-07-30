import { Icon } from "@iconify/react";
import Button from "../ui/button";
import { company } from "../data/company";
import { metrics } from "../data/metrics";
import HeroLogo3D from "./hero-logo-3d";

export default function Hero() {
    return (
        <section className="w-full flex flex-col pt-8 pb-12 lg:pt-16 lg:pb-20" id="home">
            <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-8 justify-between">
                <article className="flex flex-col gap-8 w-full lg:w-[50%]">
                    <h1 className="text-left text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.1] text-gray-900">
                        Transformamos{" "}
                        ideas en <span className="text-tertiary">soluciones</span>{" "}
                        que impulsan tu proyecto
                    </h1>
                    <p className="text-lg text-t-secondary max-w-xl leading-relaxed">
                        {company.heroDescription}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Button variant="primary" to="/contacto">
                            Cuéntanos tu idea
                            <Icon icon="solar:arrow-up-linear" className="w-5 h-5 rotate-45" />
                        </Button>
                        <Button variant="secondary" to="/casos-de-exito">
                            Ver casos de éxito
                            <Icon icon="solar:arrow-up-linear" className="w-5 h-5 rotate-45" />
                        </Button>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 w-full mt-4 border-t border-gray-100 pt-8">
                        {metrics.map((stat, index) => (
                            <div key={index} className="flex flex-col items-start gap-1.5">
                                <span className="text-2xl lg:text-3xl font-bold text-gray-900">{stat.value}</span>
                                <span className="text-xs text-t-secondary leading-tight">{stat.label}</span>
                            </div>
                        ))}
                    </div>
                </article>
                <aside className="w-full lg:w-[50%] flex justify-center items-center ">
                    <HeroLogo3D />
                </aside>
            </div>
        </section>
    );
}