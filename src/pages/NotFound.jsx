import { useSeo } from "../hooks/useSeo";
import { getGeneratedImage } from "../data/generatedImages";
import { getPendingImage } from "../data/pendingImages";
import PendingImagePlaceholder from "../ui/pending-image-placeholder";
import Title from "../ui/title";
import Button from "../ui/button";
import Container from "../ui/container";

export default function NotFound() {
    useSeo({
        title: "Página no encontrada",
        description: "La página que buscas no existe o ha sido movida.",
        preventIndex: true
    });

    const heroImage = getGeneratedImage("notfound-editorial");
    const pendingImage = !heroImage ? getPendingImage("notfound-editorial") : null;

    return (
        <Container size="standard">
            <section className="w-full flex flex-col items-center justify-center py-20 min-h-[60vh] text-center animate-fade-in">
                <div className="max-w-2xl flex flex-col items-center gap-6">
                    {heroImage ? (
                        <img src={heroImage.filename} alt={heroImage.alt} className="w-40 h-40 object-contain mb-4" />
                    ) : pendingImage ? (
                        <div className="mb-4">
                            <PendingImagePlaceholder
                                id={pendingImage.id}
                                title={pendingImage.title}
                                concept={pendingImage.concept}
                                expectedFilename={pendingImage.expectedFilename}
                                recommendedRatio={pendingImage.recommendedRatio}
                                recommendedSize={`${pendingImage.recommendedWidth}×${pendingImage.recommendedHeight}`}
                                variant="small"
                                className="w-40 h-40"
                                showSpecs={false}
                            />
                        </div>
                    ) : null}
                    
                    <Title variant="primary" titulo="ERROR 404" />
                    
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mt-2">
                        Página no encontrada
                    </h1>
                    
                    <p className="text-lg text-t-secondary max-w-lg leading-relaxed mb-4">
                        Lo sentimos, la página que estás buscando no existe, ha sido movida o está temporalmente inaccesible.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-4 mt-4 w-full sm:w-auto">
                        <Button variant="primary" to="/" className="w-full sm:w-auto">
                            Volver al Inicio
                        </Button>
                        <Button variant="secondary" to="/contacto" className="w-full sm:w-auto">
                            Contactar Soporte
                        </Button>
                    </div>
                </div>
            </section>
        </Container>
    );
}
