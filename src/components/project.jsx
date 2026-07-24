import Title from "../ui/title";
import Button from "../ui/button";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import { homeProjects } from "../utils/projects";

export default function Project() {
    return (
        <section className="w-full py-16" id="projects">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                <div>
                    <Title variant="primary" titulo="PROYECTOS DESTACADOS" />
                    <div className="mt-4 max-w-xl">
                        <Title variant="secondary" titulo="Resultados que hablan por nosotros" />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {homeProjects.map(project => (
                    <Link
                        key={project.id}
                        to={project.link}
                        className="flex flex-col group rounded-2xl border border-gray-100 hover:border-primary/30 hover:shadow-sm transition-all overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    >
                        <div className="p-3 pb-0">
                            <div className="relative w-full aspect-[4/3] overflow-hidden bg-gray-100 rounded-2xl">
                            <img
                                src={project.image}
                                alt={project.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                                loading="lazy"
                                width="600"
                                height="450"
                            />
                            <div className="absolute bottom-3 left-3 bg-tertiary/10 px-3 py-1 rounded-lg shadow-sm border border-tertiary/20 backdrop-blur-sm">
                                <span className="text-xs font-semibold text-tertiary">{project.type}</span>
                            </div>
                        </div>
                        </div>

                        <div className="flex flex-col gap-2 p-5 flex-1">
                            <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary transition-colors">
                                {project.title}
                            </h3>
                            <p className="text-sm text-t-secondary leading-relaxed flex-1 line-clamp-2">
                                {project.text}
                            </p>
                            <span className="text-primary text-sm font-semibold flex items-center gap-1.5 mt-2">
                                Ver proyecto
                                <Icon icon="solar:arrow-up-linear" className="w-4 h-4 rotate-45 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                            </span>
                        </div>
                    </Link>
                ))}
            </div>

            <div className="mt-10 flex justify-center">
                <Button variant="secondary" to="/casos-de-exito">
                    Ver todos los casos de éxito
                    <Icon icon="solar:arrow-right-linear" className="w-5 h-5" />
                </Button>
            </div>
        </section>
    );
}