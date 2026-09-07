import { useSeo } from "../hooks/useSeo";
import { useParams, Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import { Breadcrumb, Container, CutPanel, PendingImagePlaceholder, Reveal } from "../ui";
import { getArticleBySlug } from "../data/resources";
import { getGeneratedImage } from "../data/generatedImages";
import { getPendingImage } from "../data/pendingImages";
const slugToImageId = {
    "cuanto-cuesta-desarrollar-software": "article-cost",
    "web-corporativa-o-plataforma": "article-web",
    "como-digitalizar-un-proceso": "article-process",
    "cuando-necesitas-software-a-medida": "article-custom"
};

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

    const imageId = slugToImageId[slug];
    const heroImage = getGeneratedImage(imageId);
    const pendingImage = !heroImage ? getPendingImage(imageId) : null;

    return (
        <div className="w-full flex flex-col pb-[var(--section-py)]">
            <Container size="reading">
                <Breadcrumb items={[{ label: "Recursos", to: "/recursos" }, { label: article.category }]} />
            </Container>

            {/* Cabecera del artículo */}
            <Container size="reading">
                <header className="flex flex-col gap-6 pt-10 pb-10 border-b bd-hair">
                    <Reveal dir="none" className="flex flex-wrap items-center gap-4">
                        <span className="chip chip-accent">{article.category}</span>
                        <span className="flex items-center gap-2 micro-label t-2">
                            <Icon icon="lucide:clock" className="w-3.5 h-3.5" aria-hidden="true" />
                            Lectura de {article.readTime}
                        </span>
                    </Reveal>

                    <Reveal delay={80}>
                        <h1 className="display-lg t-1">{article.title}</h1>
                    </Reveal>

                    <Reveal delay={160}>
                        <p className="lead">{article.excerpt}</p>
                    </Reveal>
                </header>

                {/* Portada */}
                {heroImage ? (
                    <Reveal delay={120} dir="scale" className="mt-10">
                        <CutPanel surface="plate" cut="34px" className="p-8 flex items-center justify-center">
                            <div
                                aria-hidden="true"
                                className="deco absolute inset-0 grid-hairline opacity-70"
                                style={{ "--cell": "48px" }}
                            />
                            <img
                                src={heroImage.filename}
                                alt={heroImage.alt}
                                className="relative w-full max-w-2xl object-contain"
                                loading="eager"
                            />
                        </CutPanel>
                    </Reveal>
                ) : pendingImage ? (
                    <div className="mt-10">
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

            {/* Cuerpo */}
            <Container size="reading">
                <article className="flex flex-col gap-10 mt-14">
                    {article.content.map((block, i) => {
                        if (block.type === "intro") {
                            return (
                                <Reveal key={i}>
                                    <p className="text-[var(--fs-lead)] leading-[1.6] t-1 border-l-2 bd-accent pl-6">
                                        {block.text}
                                    </p>
                                </Reveal>
                            );
                        }

                        if (block.type === "section") {
                            return (
                                <Reveal key={i} className="flex flex-col gap-5 pt-4">
                                    <div className="flex items-baseline gap-4">
                                        <span className="index-num micro-label t-accent shrink-0">
                                            {String(i).padStart(2, "0")}
                                        </span>
                                        <h2 className="display-sm t-1">{block.title}</h2>
                                    </div>

                                    {block.text && <p className="copy text-[1rem]">{block.text}</p>}

                                    {block.items && (
                                        <ul className="flex flex-col mt-1">
                                            {block.items.map((item, j) => (
                                                <li
                                                    key={j}
                                                    className="flex items-start gap-4 py-3.5 border-t bd-hair last:border-b last:bd-hair"
                                                >
                                                    <span
                                                        aria-hidden="true"
                                                        className="w-1.5 h-1.5 mt-2.5 fill-accent shrink-0"
                                                    />
                                                    <span className="copy text-[0.95rem]">{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </Reveal>
                            );
                        }

                        if (block.type === "cta") {
                            return (
                                <Reveal key={i} dir="depth" className="mt-8">
                                    <div className="relative overflow-hidden surface-strong p-10 flex flex-col items-start gap-6">
                                        <div aria-hidden="true" className="deco absolute inset-0">
                                            <div
                                                className="absolute inset-0 grid-hairline"
                                                style={{ "--cell": "56px" }}
                                            />
                                        </div>
                                        <p className="relative display-xs text-[1.15rem] t-1 max-w-[40ch]">
                                            {block.text}
                                        </p>
                                        <Link to={block.button.to} className="relative btn btn-primary group">
                                            {block.button.text}
                                            <Icon icon="lucide:arrow-right" className="w-4 h-4 arrow-shift" aria-hidden="true" />
                                        </Link>
                                    </div>
                                </Reveal>
                            );
                        }

                        return null;
                    })}
                </article>
            </Container>
        </div>
    );
}
