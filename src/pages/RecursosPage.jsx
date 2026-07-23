import { useSeo } from "../hooks/useSeo";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import Container from "../ui/container";
import Breadcrumb from "../ui/breadcrumb";
import SectionHeader from "../ui/section-header";
import CTASection from "../ui/cta-section";
import FAQ from "../ui/faq";
import { getGeneratedImage } from "../data/generatedImages";
import { getPendingImage } from "../data/pendingImages";
import PendingImagePlaceholder from "../ui/pending-image-placeholder";
import { articles } from "../data/resources";
import { faqs, faqCategories } from "../data/faqs";

export default function RecursosPage() {
    useSeo({
        title: "Recursos",
        description: "Explora nuestras ideas, herramientas y el Atlas tecnológico. Documentamos aprendizajes, decisiones técnicas y respondemos a las preguntas frecuentes."
    });

    const heroImage = getGeneratedImage("resources-editorial");
    const pendingImage = !heroImage ? getPendingImage("resources-editorial") : null;

    return (
        <div className="w-full flex flex-col gap-16 lg:gap-24">
            <Container size="wide">
                <Breadcrumb items={[{ label: "Recursos" }]} />
                <section className="flex flex-col gap-8 pt-4 pb-8">
                    <div className="flex flex-col lg:flex-row gap-12 items-center">
                        <div className="lg:w-1/2">
                            <SectionHeader
                                label="RECURSOS"
                                title="Explora nuestras ideas y herramientas"
                                description="Un espacio donde documentamos aprendizajes, compartimos decisiones técnicas y respondemos a las preguntas más frecuentes sobre nuestro trabajo."
                                as="h1"
                            />
                        </div>
                        <div className="lg:w-1/2 flex justify-center lg:justify-end">
                            {heroImage ? (
                                <div className="rounded-2xl overflow-hidden bg-gray-50 border border-gray-100 p-8 flex items-center justify-center max-w-lg w-full">
                                    <img src={heroImage.filename} alt={heroImage.alt} className="w-full object-contain animate-fade-in" loading="eager" />
                                </div>
                            ) : pendingImage ? (
                                <div className="max-w-lg w-full">
                                    <PendingImagePlaceholder
                                        id={pendingImage.id}
                                        title={pendingImage.title}
                                        concept={pendingImage.concept}
                                        expectedFilename={pendingImage.expectedFilename}
                                        recommendedRatio={pendingImage.recommendedRatio}
                                        recommendedSize={`${pendingImage.recommendedWidth}×${pendingImage.recommendedHeight}`}
                                        variant="hero"
                                    />
                                </div>
                            ) : null}
                        </div>
                    </div>
                </section>
            </Container>

            {/* Atlas tecnológico teaser */}
            <section className="w-full">
                <Container size="wide">
                    <div className="bg-surface-dark rounded-3xl p-8 lg:p-12 flex flex-col lg:flex-row items-center gap-10">
                        <div className="lg:w-1/2 flex flex-col gap-6">
                            <span className="text-sm font-bold tracking-widest text-primary">ECOSISTEMA</span>
                            <h2 className="text-3xl lg:text-4xl font-bold text-white leading-tight">Atlas tecnológico</h2>
                            <p className="text-gray-400 text-lg leading-relaxed">
                                Explora los lenguajes, frameworks, plataformas y herramientas que forman parte de las capacidades técnicas y creativas de Biznovatech.
                            </p>
                            <Link to="/recursos/tecnologias" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-gray-900 font-semibold rounded-lg hover:bg-gray-100 transition-colors w-fit mt-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                                Explorar Atlas
                                <Icon icon="solar:arrow-right-linear" className="w-5 h-5" />
                            </Link>
                        </div>
                        <div className="lg:w-1/2 grid grid-cols-4 gap-4 opacity-50 pointer-events-none">
                            {['react', 'nodejs', 'flutter', 'postgresql', 'figma', 'docker', 'tailwind-css', 'python'].map(slug => (
                                <div key={slug} className="aspect-square rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
                                    <Icon icon={`simple-icons:${slug}`} className="w-8 h-8 text-white/50" />
                                </div>
                            ))}
                        </div>
                    </div>
                </Container>
            </section>

            {/* Artículos */}
            <section id="articulos" className="w-full bg-gray-50 py-16 border-y border-gray-100">
                <Container size="wide">
                    <div className="flex flex-col gap-10">
                        <SectionHeader label="ARTÍCULOS" title="Lecturas sobre estrategia y tecnología" />
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                            {articles.map(article => (
                                <Link
                                    key={article.slug}
                                    to={`/recursos/${article.slug}`}
                                    className="flex flex-col p-8 bg-white rounded-2xl border border-gray-100 hover:border-primary/30 hover:shadow-sm transition-all group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                                >
                                    <div className="flex items-center gap-3 mb-6">
                                        <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full">
                                            {article.category}
                                        </span>
                                        <span className="text-xs text-t-secondary font-medium">{article.readTime}</span>
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-primary transition-colors leading-snug">
                                        {article.title}
                                    </h3>
                                    <p className="text-t-secondary leading-relaxed mb-8 flex-1">
                                        {article.excerpt}
                                    </p>
                                    <div className="flex items-center gap-2 text-primary text-sm font-semibold mt-auto">
                                        Leer artículo
                                        <Icon icon="solar:arrow-right-linear" className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </Container>
            </section>

            {/* FAQs */}
            <section id="preguntas-frecuentes" className="w-full">
                <Container size="standard">
                    <div className="flex flex-col lg:flex-row gap-16">
                        <div className="lg:w-1/3 flex flex-col gap-6">
                            <SectionHeader label="FAQ" title="Preguntas frecuentes" />
                            <p className="text-t-secondary leading-relaxed">
                                Si no encuentras la respuesta que buscas, escríbenos y con gusto resolveremos tus dudas.
                            </p>
                        </div>
                        <div className="lg:w-2/3 flex flex-col gap-12">
                            {faqCategories.map(category => {
                                const categoryFaqs = faqs.filter(f => f.category === category.id);
                                if (categoryFaqs.length === 0) return null;
                                return (
                                    <div key={category.id} className="flex flex-col gap-6">
                                        <h3 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-4">{category.name}</h3>
                                        <FAQ items={categoryFaqs} />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </Container>
            </section>

            <Container size="standard">
                <CTASection
                    title="¿Tienes un proyecto en mente?"
                    description="Podemos aplicar estos recursos y experiencia para construir la solución que necesitas."
                    buttonText="Cuéntanos tu idea"
                    buttonTo="/contacto"
                />
            </Container>
        </div>
    );
}
