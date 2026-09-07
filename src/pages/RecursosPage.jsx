import { useSeo } from "../hooks/useSeo";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import { Breadcrumb, CTASection, Container, CutPanel, Eyebrow, FAQ, PendingImagePlaceholder, Reveal, SectionHeader } from "../ui";
import { getGeneratedImage } from "../data/generatedImages";
import { getPendingImage } from "../data/pendingImages";
import { articles } from "../data/resources";
import { faqs, faqCategories } from "../data/faqs";

const ATLAS_PREVIEW = [
    "react",
    "nodedotjs",
    "flutter",
    "postgresql",
    "figma",
    "docker",
    "tailwindcss",
    "python",
];

export default function RecursosPage() {
    useSeo({
        title: "Recursos",
        description: "Explora nuestras ideas, herramientas y el Atlas tecnológico. Documentamos aprendizajes, decisiones técnicas y respondemos a las preguntas frecuentes."
    });

    const heroImage = getGeneratedImage("resources-editorial");
    const pendingImage = !heroImage ? getPendingImage("resources-editorial") : null;

    return (
        <div className="w-full flex flex-col">
            <Container size="wide">
                <Breadcrumb items={[{ label: "Recursos" }]} />
            </Container>

            {/* Portada */}
            <section className="w-full pt-10 pb-[var(--section-py)]">
                <Container size="wide">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
                        <div className="lg:col-span-6">
                            <SectionHeader
                                label="Recursos"
                                title="Explora nuestras ideas y herramientas"
                                description="Un espacio donde documentamos aprendizajes, compartimos decisiones técnicas y respondemos a las preguntas más frecuentes sobre nuestro trabajo."
                                as="h1"
                            />
                        </div>

                        <Reveal delay={160} dir="scale" className="lg:col-span-6">
                            {heroImage ? (
                                <CutPanel surface="plate" cut="34px" className="p-8 flex items-center justify-center">
                                    <div
                                        aria-hidden="true"
                                        className="deco absolute inset-0 grid-hairline opacity-70"
                                        style={{ "--cell": "48px" }}
                                    />
                                    <img
                                        src={heroImage.filename}
                                        alt={heroImage.alt}
                                        className="relative w-full object-contain"
                                        loading="eager"
                                    />
                                </CutPanel>
                            ) : pendingImage ? (
                                <PendingImagePlaceholder
                                    id={pendingImage.id}
                                    title={pendingImage.title}
                                    concept={pendingImage.concept}
                                    expectedFilename={pendingImage.expectedFilename}
                                    recommendedRatio={pendingImage.recommendedRatio}
                                    recommendedSize={`${pendingImage.recommendedWidth}×${pendingImage.recommendedHeight}`}
                                    variant="hero"
                                />
                            ) : null}
                        </Reveal>
                    </div>
                </Container>
            </section>

            {/* Atlas tecnológico */}
            <section className="w-full pb-[var(--section-py)]">
                <Container size="wide">
                    <Reveal dir="depth">
                        <div className="relative overflow-hidden surface-strong">
                            <div aria-hidden="true" className="deco absolute inset-0">
                                <div
                                    className="absolute inset-0 grid-hairline"
                                    style={{ "--cell": "72px" }}
                                />
                            </div>

                            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2">
                                <div className="flex flex-col gap-6 p-10 lg:p-14">
                                    <Eyebrow className="t-accent">Ecosistema</Eyebrow>
                                    <h2 className="display-caps t-1">Atlas tecnológico</h2>
                                    <p className="text-[var(--fs-lead)] leading-relaxed t-2 max-w-[52ch]">
                                        Explora los lenguajes, frameworks, plataformas y herramientas que forman parte
                                        de las capacidades técnicas y creativas de Biznovatech.
                                    </p>
                                    <Link to="/recursos/tecnologias" className="btn btn-primary group w-fit mt-2">
                                        Explorar Atlas
                                        <Icon icon="lucide:arrow-right" className="w-4 h-4 arrow-shift" aria-hidden="true" />
                                    </Link>
                                </div>

                                <div className="grid grid-cols-4 gap-px bg-hair border-l bd-hair">
                                    {ATLAS_PREVIEW.map((slug) => (
                                        <div
                                            key={slug}
                                            className="aspect-square bg-canvas grid place-items-center transition-colors duration-500 hover:bg-white/[0.04]"
                                        >
                                            <Icon
                                                icon={`simple-icons:${slug}`}
                                                className="w-7 h-7 t-3"
                                                aria-hidden="true"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </Reveal>
                </Container>
            </section>

            {/* Artículos */}
            <section
                id="articulos"
                className="w-full py-[var(--section-py)] bg-canvas-2 border-y bd-hair"
            >
                <Container size="wide">
                    <SectionHeader
                        label="Artículos"
                        index="01"
                        title="Lecturas sobre estrategia y tecnología"
                    />

                    <div className="mt-14">
                        {articles.map((article, i) => (
                            <Reveal key={article.slug} delay={i * 55} dir="none">
                                <Link
                                    to={`/recursos/${article.slug}`}
                                    className="row group grid-cols-1 md:grid-cols-[4rem_minmax(0,1.1fr)_minmax(0,1fr)_auto] gap-x-8 gap-y-3 py-9 md:py-11 items-start"
                                >
                                    <span aria-hidden="true" className="ghost-num text-[clamp(2rem,3.2vw,3rem)]">
                                        {String(i + 1).padStart(2, "0")}
                                    </span>

                                    <span className="flex flex-col gap-3 min-w-0">
                                        <span className="flex items-center gap-4">
                                            <span className="micro-label t-accent">
                                                {article.category}
                                            </span>
                                            <span aria-hidden="true" className="w-6 h-px bg-[var(--hair)]" />
                                            <span className="micro-label t-3">
                                                {article.readTime}
                                            </span>
                                        </span>
                                        <h3 className="display-caps text-[clamp(1.1rem,1.7vw,1.7rem)] t-1 max-w-[22ch] transition-colors duration-500 group-hover:t-accent">
                                            {article.title}
                                        </h3>
                                    </span>

                                    <span className="copy text-[0.9rem] md:pt-1 max-w-[46ch]">{article.excerpt}</span>

                                    <span className="hidden md:grid place-items-center w-10 h-10 border border-transparent t-3 transition-all duration-500 group-hover:bd group-hover:t-accent">
                                        <Icon icon="lucide:arrow-right" className="w-4 h-4 arrow-shift" aria-hidden="true" />
                                    </span>
                                </Link>
                            </Reveal>
                        ))}
                    </div>
                </Container>
            </section>

            {/* Preguntas frecuentes */}
            <section id="preguntas-frecuentes" className="w-full py-[var(--section-py)]">
                <Container size="wide">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
                        <div className="lg:col-span-4">
                            <SectionHeader
                                label="FAQ"
                                index="02"
                                title="Preguntas frecuentes"
                                description="Si no encuentras la respuesta que buscas, escríbenos y con gusto resolveremos tus dudas."
                            />
                        </div>

                        <div className="lg:col-span-8 flex flex-col gap-12 lg:pt-7">
                            {faqCategories.map((category) => {
                                const categoryFaqs = faqs.filter((f) => f.category === category.id);
                                if (categoryFaqs.length === 0) return null;
                                return (
                                    <div key={category.id} className="flex flex-col gap-2">
                                        <h3 className="micro-label t-2 pb-4">
                                            {category.name}
                                        </h3>
                                        <FAQ items={categoryFaqs} />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </Container>
            </section>

            <div className="pb-[var(--section-py)]">
                <Container size="wide">
                    <CTASection
                        title="¿Tienes un proyecto en mente?"
                        description="Podemos aplicar estos recursos y experiencia para construir la solución que necesitas."
                        buttonText="Cuéntanos tu idea"
                        buttonTo="/contacto"
                    />
                </Container>
            </div>
        </div>
    );
}
