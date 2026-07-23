import { useSeo } from "../hooks/useSeo";
import { useParams, Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import Container from "../ui/container";
import Breadcrumb from "../ui/breadcrumb";
import { getArticleBySlug } from "../data/resources";
import { getGeneratedImage } from "../data/generatedImages";
import { getPendingImage } from "../data/pendingImages";
import PendingImagePlaceholder from "../ui/pending-image-placeholder";

export default function ArticlePage() {
    const { slug } = useParams();
    const article = getArticleBySlug(slug);

    useSeo({
        title: article ? article.title : "Artículo",
        description: article ? article.excerpt : "Lectura recomendada en Biznovatech."
    });

    if (!article) {
        throw new Response("Not Found", { status: 404 });
    }

    const slugToImageId = {
        "cuanto-cuesta-desarrollar-software": "article-cost",
        "web-corporativa-o-plataforma": "article-web",
        "como-digitalizar-un-proceso": "article-process",
        "cuando-necesitas-software-a-medida": "article-custom"
    };

    const imageId = slugToImageId[slug];
    const heroImage = getGeneratedImage(imageId);
    const pendingImage = !heroImage ? getPendingImage(imageId) : null;

    return (
        <div className="w-full flex flex-col gap-16 lg:gap-20 pb-12">
            {/* Header / Breadcrumb */}
            <Container size="standard">
                <Breadcrumb items={[
                    { label: "Recursos", to: "/recursos" },
                    { label: article.category }
                ]} />
            </Container>

            {/* Hero — reading width */}
            <Container size="reading">
                <section className="flex flex-col gap-6 pb-10 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                        <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full">
                            {article.category}
                        </span>
                        <div className="flex items-center gap-2 text-sm text-t-secondary font-medium">
                            <Icon icon="solar:clock-circle-linear" className="w-4 h-4" />
                            <span>Lectura de {article.readTime}</span>
                        </div>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                        {article.title}
                    </h1>
                    <p className="text-lg text-t-secondary leading-relaxed">
                        {article.excerpt}
                    </p>
                </section>

                {/* Cover image or placeholder */}
                {heroImage ? (
                    <div className="w-full mt-8 rounded-2xl overflow-hidden bg-gray-50 border border-gray-100 flex items-center justify-center p-8">
                        <img src={heroImage.filename} alt={heroImage.alt} className="w-full max-w-2xl object-contain" loading="eager" />
                    </div>
                ) : pendingImage ? (
                    <div className="mt-8">
                        <PendingImagePlaceholder
                            id={pendingImage.id}
                            title={pendingImage.title}
                            concept={pendingImage.concept}
                            expectedFilename={pendingImage.expectedFilename}
                            recommendedRatio={pendingImage.recommendedRatio}
                            recommendedSize={`${pendingImage.recommendedWidth}×${pendingImage.recommendedHeight}`}
                            variant="cover"
                        />
                    </div>
                ) : null}
            </Container>

            {/* Content — reading width */}
            <Container size="reading">
                <article className="flex flex-col gap-10">
                    {article.content.map((block, i) => {
                        if (block.type === "intro") {
                            return <p key={i} className="text-lg text-gray-900 leading-relaxed font-medium">{block.text}</p>;
                        }
                        if (block.type === "section") {
                            return (
                                <div key={i} className="flex flex-col gap-4">
                                    <h2 className="text-2xl font-bold text-gray-900 mt-4">{block.title}</h2>
                                    {block.text && <p className="text-lg text-t-secondary leading-relaxed">{block.text}</p>}
                                    {block.items && (
                                        <ul className="flex flex-col gap-3 mt-2">
                                            {block.items.map((item, j) => (
                                                <li key={j} className="flex items-start gap-3">
                                                    <Icon icon="solar:check-circle-bold" className="w-5 h-5 text-primary shrink-0 mt-1" />
                                                    <span className="text-lg text-gray-700 leading-relaxed">{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            );
                        }
                        if (block.type === "cta") {
                            return (
                                <div key={i} className="mt-8 bg-gray-50 rounded-2xl p-8 flex flex-col items-center text-center gap-6 border border-gray-100">
                                    <p className="text-lg font-medium text-gray-900">{block.text}</p>
                                    <Link to={block.button.to} className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">
                                        {block.button.text}
                                        <Icon icon="solar:arrow-right-linear" className="w-5 h-5" />
                                    </Link>
                                </div>
                            );
                        }
                        return null;
                    })}
                </article>
            </Container>
        </div>
    );
}
