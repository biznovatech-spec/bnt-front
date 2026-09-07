import { useState, useMemo } from "react";
import { useSeo } from "../hooks/useSeo";
import { Icon } from "@iconify/react";
import { Breadcrumb, Container, Reveal, SectionHeader } from "../ui";
import { technologies, technologyCategories } from "../data/technologies";

export default function TecnologiasPage() {
    const [search, setSearch] = useState("");
    const [activeCategory, setActiveCategory] = useState("all");

    useSeo({
        title: "Atlas Tecnológico",
        description: "Catálogo de las tecnologías, herramientas y lenguajes que utilizamos en Biznovatech para construir soluciones robustas y escalables."
    });

    const filteredTechs = useMemo(() => {
        return technologies
            .filter((tech) => {
                const matchesSearch =
                    tech.name.toLowerCase().includes(search.toLowerCase()) ||
                    tech.shortDescription.toLowerCase().includes(search.toLowerCase());
                const matchesCategory = activeCategory === "all" || tech.category === activeCategory;
                return matchesSearch && matchesCategory;
            })
            .sort((a, b) => a.name.localeCompare(b.name));
    }, [search, activeCategory]);

    const groupedTechs = useMemo(() => {
        const groups = {};
        filteredTechs.forEach((tech) => {
            const initial = tech.initial.toUpperCase();
            if (!groups[initial]) groups[initial] = [];
            groups[initial].push(tech);
        });
        return groups;
    }, [filteredTechs]);

    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

    const chipClass = (isActive) =>
        `flex items-center gap-2 px-4 py-2.5 micro-label border transition-colors duration-300 ${
            isActive
                ? "fill-accent bd-accent"
                : "bd t-2 hover:bd-strong hover:t-1"
        }`;

    return (
        <div className="w-full flex flex-col pb-[var(--section-py)]">
            <Container size="wide">
                <Breadcrumb
                    items={[{ label: "Recursos", to: "/recursos" }, { label: "Atlas tecnológico" }]}
                />
            </Container>

            {/* Portada + controles */}
            <section className="w-full pt-10 pb-12 border-b bd-hair">
                <Container size="wide">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
                        <div className="lg:col-span-6 flex flex-col gap-8">
                            <SectionHeader
                                label="Ecosistema"
                                title="Atlas tecnológico"
                                description="Explora los lenguajes, frameworks, plataformas y herramientas que forman parte de las capacidades técnicas y creativas de Biznovatech."
                                as="h1"
                            />

                            <Reveal delay={200} className="flex items-baseline gap-4 pt-2">
                                <span className="font-display text-[clamp(2.4rem,4vw,3.4rem)] font-bold leading-none tracking-[-0.03em] t-accent">
                                    {technologies.length}
                                </span>
                                <span className="micro-label t-2 max-w-[16ch]">
                                    Tecnologías documentadas
                                </span>
                            </Reveal>
                        </div>

                        <Reveal delay={140} dir="right" className="lg:col-span-6 flex flex-col gap-5 lg:pt-7">
                            <div className="relative w-full">
                                <Icon
                                    icon="lucide:search"
                                    className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 t-2"
                                    aria-hidden="true"
                                />
                                <input
                                    type="text"
                                    placeholder="Buscar tecnología o uso..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    aria-label="Buscar tecnología"
                                    className="field field-icon"
                                />
                            </div>

                            <div className="flex flex-wrap gap-2">
                                <button
                                    type="button"
                                    onClick={() => setActiveCategory("all")}
                                    className={chipClass(activeCategory === "all")}
                                >
                                    Todas
                                </button>
                                {technologyCategories.map((cat) => (
                                    <button
                                        key={cat.id}
                                        type="button"
                                        onClick={() => setActiveCategory(cat.id)}
                                        className={chipClass(activeCategory === cat.id)}
                                    >
                                        <Icon icon={cat.icon} className="w-3.5 h-3.5" aria-hidden="true" />
                                        {cat.name}
                                    </button>
                                ))}
                            </div>
                        </Reveal>
                    </div>
                </Container>
            </section>

            <Container size="wide">
                {/* Índice alfabético */}
                <div className="w-full overflow-x-auto py-6 mb-6 custom-scrollbar border-b bd-hair">
                    <div className="flex gap-px min-w-max bg-[var(--hair)] border bd-hair w-fit">
                        {alphabet.map((letter) => {
                            const hasItems = groupedTechs[letter] && groupedTechs[letter].length > 0;
                            return (
                                <a
                                    key={letter}
                                    href={hasItems ? `#letter-${letter}` : undefined}
                                    aria-disabled={!hasItems}
                                    className={`w-9 h-9 grid place-items-center index-num text-[0.72rem] transition-colors duration-300 ${
                                        hasItems
                                            ? "bg-[var(--panel-bg)] t-1 hover:fill-accent cursor-pointer"
                                            : "bg-[var(--panel-bg)] t-3 cursor-not-allowed"
                                    }`}
                                >
                                    {letter}
                                </a>
                            );
                        })}
                    </div>
                </div>

                {/* Resultados */}
                {filteredTechs.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-24 px-4 border border-dashed bd text-center">
                        <span className="grid place-items-center w-14 h-14 border bd t-2 mb-6">
                            <Icon icon="lucide:search-x" className="w-6 h-6" aria-hidden="true" />
                        </span>
                        <h3 className="display-xs text-[1.2rem] t-1">
                            No encontramos resultados
                        </h3>
                        <p className="copy mt-3 max-w-md">
                            No hay tecnologías que coincidan con tu búsqueda. Intenta con otros términos o
                            selecciona otra categoría.
                        </p>
                        <button
                            type="button"
                            onClick={() => {
                                setSearch("");
                                setActiveCategory("all");
                            }}
                            className="btn btn-outline btn-sm mt-8"
                        >
                            Limpiar filtros
                        </button>
                    </div>
                ) : (
                    <div className="flex flex-col">
                        {Object.keys(groupedTechs)
                            .sort()
                            .map((letter) => (
                                <section
                                    key={letter}
                                    id={`letter-${letter}`}
                                    className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 py-10 border-t bd-hair scroll-mt-28"
                                >
                                    <div className="lg:col-span-2">
                                        <h2 className="ghost-num text-[clamp(2.6rem,5vw,5rem)] lg:sticky lg:top-28">
                                            {letter}
                                        </h2>
                                    </div>

                                    <div className="lg:col-span-10">
                                        {groupedTechs[letter].map((tech, i) => (
                                            <Reveal key={tech.id} delay={i * 40} dir="none">
                                                <article className="row group grid-cols-1 md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)_minmax(0,1.2fr)] gap-x-8 gap-y-3 py-7 items-start">
                                                    <span className="flex items-center gap-4 min-w-0">
                                                        <Icon
                                                            icon={tech.icon}
                                                            className="w-6 h-6 shrink-0 t-3 transition-colors duration-500 group-hover:t-accent"
                                                            aria-hidden="true"
                                                        />
                                                        <span className="flex flex-col gap-1">
                                                            <h3 className="display-caps text-[1.05rem] t-1">
                                                                {tech.name}
                                                            </h3>
                                                            <span className="micro-label t-accent">
                                                                {tech.type}
                                                            </span>
                                                        </span>
                                                    </span>

                                                    <p className="text-[0.92rem] leading-relaxed t-1-soft">
                                                        {tech.shortDescription}
                                                    </p>

                                                    <p className="copy text-[0.85rem]">
                                                        <span className="micro-label t-3 block mb-1.5">
                                                            En Biznovatech
                                                        </span>
                                                        {tech.useAtBiznovatech}
                                                    </p>
                                                </article>
                                            </Reveal>
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
