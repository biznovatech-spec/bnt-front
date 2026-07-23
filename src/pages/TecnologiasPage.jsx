import { useState, useMemo } from "react";
import { useSeo } from "../hooks/useSeo";
import { Icon } from "@iconify/react";
import Container from "../ui/container";
import Breadcrumb from "../ui/breadcrumb";
import SectionHeader from "../ui/section-header";
import { technologies, technologyCategories } from "../data/technologies";

export default function TecnologiasPage() {
    const [search, setSearch] = useState("");
    const [activeCategory, setActiveCategory] = useState("all");

    useSeo({
        title: "Atlas Tecnológico",
        description: "Catálogo de las tecnologías, herramientas y lenguajes que utilizamos en Biznovatech para construir soluciones robustas y escalables."
    });

    const filteredTechs = useMemo(() => {
        return technologies.filter(tech => {
            const matchesSearch = tech.name.toLowerCase().includes(search.toLowerCase()) || 
                                  tech.shortDescription.toLowerCase().includes(search.toLowerCase());
            const matchesCategory = activeCategory === "all" || tech.category === activeCategory;
            return matchesSearch && matchesCategory;
        }).sort((a, b) => a.name.localeCompare(b.name));
    }, [search, activeCategory]);

    // Group for alphabet index
    const groupedTechs = useMemo(() => {
        const groups = {};
        filteredTechs.forEach(tech => {
            const initial = tech.initial.toUpperCase();
            if (!groups[initial]) groups[initial] = [];
            groups[initial].push(tech);
        });
        return groups;
    }, [filteredTechs]);

    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

    return (
        <div className="w-full flex flex-col gap-12 lg:gap-16 pb-24">
            <Container size="wide">
                <Breadcrumb items={[
                    { label: "Recursos", to: "/recursos" },
                    { label: "Atlas tecnológico" }
                ]} />
                <section className="flex flex-col lg:flex-row gap-12 pt-4 border-b border-gray-100 pb-12">
                    <div className="lg:w-1/2 flex flex-col gap-6">
                        <SectionHeader
                            label="ECOSISTEMA"
                            title="Atlas tecnológico"
                            description="Explora los lenguajes, frameworks, plataformas y herramientas que forman parte de las capacidades técnicas y creativas de Biznovatech."
                            as="h1"
                        />
                        <div className="flex items-center gap-2 mt-2">
                            <span className="text-3xl font-bold text-primary">{technologies.length}</span>
                            <span className="text-sm font-semibold text-t-secondary uppercase tracking-widest">Tecnologías documentadas</span>
                        </div>
                    </div>
                    <div className="lg:w-1/2 flex flex-col gap-6">
                        {/* Search and Filters */}
                        <div className="relative w-full">
                            <Icon icon="solar:magnifer-linear" className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Buscar tecnología o uso..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-all text-gray-900"
                            />
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <button
                                onClick={() => setActiveCategory("all")}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${activeCategory === "all" ? "bg-primary text-white" : "bg-gray-50 text-gray-600 hover:bg-gray-100"}`}
                            >
                                Todas
                            </button>
                            {technologyCategories.map(cat => (
                                <button
                                    key={cat.id}
                                    onClick={() => setActiveCategory(cat.id)}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary flex items-center gap-2 ${activeCategory === cat.id ? "bg-primary text-white" : "bg-gray-50 text-gray-600 hover:bg-gray-100"}`}
                                >
                                    <Icon icon={cat.icon} className="w-4 h-4" />
                                    {cat.name}
                                </button>
                            ))}
                        </div>
                    </div>
                </section>
            </Container>

            <Container size="wide">
                {/* Alphabet navigation */}
                <div className="w-full overflow-x-auto pb-4 mb-8 custom-scrollbar">
                    <div className="flex gap-2 min-w-max">
                        {alphabet.map(letter => {
                            const hasItems = groupedTechs[letter] && groupedTechs[letter].length > 0;
                            return (
                                <a
                                    key={letter}
                                    href={hasItems ? `#letter-${letter}` : undefined}
                                    aria-disabled={!hasItems}
                                    className={`w-10 h-10 flex items-center justify-center rounded-lg text-sm font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary
                                        ${hasItems 
                                            ? "bg-gray-50 text-gray-900 hover:bg-primary/10 hover:text-primary cursor-pointer" 
                                            : "text-gray-300 cursor-not-allowed"}`}
                                >
                                    {letter}
                                </a>
                            );
                        })}
                    </div>
                </div>

                {/* Results */}
                {filteredTechs.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-24 px-4 bg-gray-50 rounded-2xl border border-gray-100 border-dashed">
                        <Icon icon="solar:ghost-linear" className="w-16 h-16 text-gray-300 mb-4" />
                        <h3 className="text-xl font-bold text-gray-900">No encontramos resultados</h3>
                        <p className="text-t-secondary mt-2 text-center max-w-md">No hay tecnologías que coincidan con tu búsqueda. Intenta con otros términos o selecciona otra categoría.</p>
                        <button onClick={() => {setSearch(""); setActiveCategory("all");}} className="mt-6 px-6 py-2.5 bg-white border border-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                            Limpiar filtros
                        </button>
                    </div>
                ) : (
                    <div className="flex flex-col gap-16">
                        {Object.keys(groupedTechs).sort().map(letter => (
                            <section key={letter} id={`letter-${letter}`} className="flex flex-col lg:flex-row gap-8 lg:gap-12 scroll-mt-24">
                                <div className="lg:w-16 shrink-0 hidden lg:block">
                                    <h2 className="text-4xl lg:text-5xl font-bold text-gray-200 sticky top-24">{letter}</h2>
                                </div>
                                <div className="lg:hidden">
                                    <h2 className="text-2xl font-bold text-primary">{letter}</h2>
                                </div>
                                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {groupedTechs[letter].map(tech => (
                                        <article key={tech.id} className="flex flex-col p-6 rounded-2xl border border-gray-100 hover:border-primary/30 transition-colors bg-white">
                                            <div className="flex items-start gap-4 mb-4">
                                                <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center shrink-0 border border-gray-100">
                                                    <Icon icon={tech.icon} className="w-7 h-7 text-gray-700" />
                                                </div>
                                                <div className="flex flex-col">
                                                    <h3 className="font-bold text-xl text-gray-900">{tech.name}</h3>
                                                    <span className="text-sm font-medium text-primary">{tech.type}</span>
                                                </div>
                                            </div>
                                            <div className="flex flex-col gap-4 flex-1">
                                                <p className="text-gray-700 leading-relaxed font-medium">{tech.shortDescription}</p>
                                                <div className="h-px bg-gray-100 w-full" />
                                                <p className="text-sm text-t-secondary leading-relaxed flex-1">
                                                    <span className="font-semibold text-gray-900 block mb-1">En Biznovatech:</span>
                                                    {tech.useAtBiznovatech}
                                                </p>
                                            </div>
                                        </article>
                                    ))}
                                </div>
                            </section>
                        ))}
                    </div>
                )}
            </Container>
        </div>
    );
}
