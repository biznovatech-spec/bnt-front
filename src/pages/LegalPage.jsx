import { useSeo } from "../hooks/useSeo";
import { Link } from "react-router-dom";
import Container from "../ui/container";
import Breadcrumb from "../ui/breadcrumb";
import { company } from "../data/company";

export default function LegalPage({ title, date = "Enero 2025" }) {
    useSeo({
        title,
        description: `Página de ${title} de Biznovatech.`
    });

    return (
        <div className="w-full flex flex-col gap-12 pb-24">
            <Container size="reading">
                <Breadcrumb items={[{ label: title }]} />
                <section className="pt-4">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{title}</h1>
                    <p className="text-sm font-medium text-t-secondary">Última actualización: {date}</p>
                    
                    <div className="mt-8 p-6 bg-blue-50 border border-blue-100 rounded-xl">
                        <p className="text-blue-900 font-medium">
                            Este es un documento informativo preliminar. Los términos formales definitivos se encuentran en proceso de revisión legal.
                        </p>
                    </div>

                    <article className="mt-12 flex flex-col gap-8 text-gray-700 leading-relaxed">
                        <p>
                            En Biznovatech ({company.legalName}) valoramos la confianza que depositas en nosotros. Esta sección está destinada a documentar nuestras políticas y términos de servicio de forma clara y transparente.
                        </p>
                        
                        <div className="flex flex-col gap-3">
                            <h2 className="text-xl font-bold text-gray-900">1. Contacto para consultas</h2>
                            <p>Si tienes alguna duda sobre nuestras políticas o el manejo de tu información, puedes comunicarte con nosotros a través de:</p>
                            <ul className="list-disc pl-5 flex flex-col gap-2 mt-2">
                                <li>Correo electrónico: <a href={`mailto:${company.contact.email}`} className="text-primary hover:underline">{company.contact.email}</a></li>
                                <li>Teléfono: {company.contact.phone}</li>
                                <li>Dirección: {company.location.full}</li>
                            </ul>
                        </div>

                        <div className="flex flex-col gap-3">
                            <h2 className="text-xl font-bold text-gray-900">2. Privacidad de la información</h2>
                            <p>
                                Toda la información recopilada a través de nuestros formularios de contacto, reuniones iniciales o durante el desarrollo de un proyecto, será tratada con estricta confidencialidad y utilizada únicamente para los fines acordados contigo.
                            </p>
                        </div>

                        <div className="flex flex-col gap-3">
                            <h2 className="text-xl font-bold text-gray-900">3. Desarrollo de proyectos</h2>
                            <p>
                                Las condiciones específicas, alcances, plazos, garantías y propiedad intelectual de cada proyecto desarrollado por Biznovatech se establecerán detalladamente en el contrato o acuerdo de servicios correspondiente a dicho proyecto.
                            </p>
                        </div>
                    </article>
                    
                    <div className="mt-12 pt-8 border-t border-gray-100 flex gap-4">
                        <Link to="/" className="text-primary font-medium hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm">
                            Volver al inicio
                        </Link>
                        <span className="text-gray-300">|</span>
                        <Link to="/contacto" className="text-primary font-medium hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm">
                            Ir a contacto
                        </Link>
                    </div>
                </section>
            </Container>
        </div>
    );
}
