import { useSeo } from "../hooks/useSeo";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import { Breadcrumb, Container, Eyebrow, Reveal } from "../ui";
import { company } from "../data/company";

export default function LegalPage({ title, date = "Enero 2025" }) {
    useSeo({
        title,
        description: `Página de ${title} de Biznovatech.`
    });

    return (
        <div className="w-full flex flex-col pb-[var(--section-py)]">
            <Container size="reading">
                <Breadcrumb items={[{ label: title }]} />

                <header className="flex flex-col gap-5 pt-10 pb-8 border-b bd-hair">
                    <Reveal dir="none">
                        <Eyebrow tone="muted">Documento legal</Eyebrow>
                    </Reveal>
                    <Reveal delay={80}>
                        <h1 className="display-caps t-1">{title}</h1>
                    </Reveal>
                    <Reveal delay={140}>
                        <p className="micro-label t-2">
                            Última actualización: {date}
                        </p>
                    </Reveal>
                </header>

                <Reveal delay={100} className="mt-10">
                    <div className="flex items-start gap-4 p-6 border-l-2 bd-accent bg-2">
                        <Icon
                            icon="lucide:info"
                            className="w-4 h-4 mt-1 t-accent shrink-0"
                            aria-hidden="true"
                        />
                        <p className="text-[0.92rem] leading-relaxed t-1">
                            Este es un documento informativo preliminar. Los términos formales definitivos se
                            encuentran en proceso de revisión legal.
                        </p>
                    </div>
                </Reveal>

                <article className="mt-14 flex flex-col gap-12">
                    <Reveal>
                        <p className="copy text-[1rem]">
                            En Biznovatech ({company.legalName}) valoramos la confianza que depositas en nosotros.
                            Esta sección está destinada a documentar nuestras políticas y términos de servicio de
                            forma clara y transparente.
                        </p>
                    </Reveal>

                    <Reveal className="flex flex-col gap-4 pt-8 border-t bd-hair">
                        <div className="flex items-baseline gap-4">
                            <span className="index-num micro-label t-accent">01</span>
                            <h2 className="display-sm t-1">Contacto para consultas</h2>
                        </div>
                        <p className="copy text-[1rem]">
                            Si tienes alguna duda sobre nuestras políticas o el manejo de tu información, puedes
                            comunicarte con nosotros a través de:
                        </p>
                        <ul className="flex flex-col mt-1">
                            <li className="flex items-center gap-4 py-3.5 border-t bd-hair">
                                <span className="micro-label t-3 w-28 shrink-0">
                                    Correo
                                </span>
                                <a
                                    href={`mailto:${company.contact.email}`}
                                    className="link-underline t-accent break-all"
                                >
                                    {company.contact.email}
                                </a>
                            </li>
                            <li className="flex items-center gap-4 py-3.5 border-t bd-hair">
                                <span className="micro-label t-3 w-28 shrink-0">
                                    Teléfono
                                </span>
                                <span className="t-1">{company.contact.phone}</span>
                            </li>
                            <li className="flex items-center gap-4 py-3.5 border-y bd-hair">
                                <span className="micro-label t-3 w-28 shrink-0">
                                    Dirección
                                </span>
                                <span className="t-1">{company.location.full}</span>
                            </li>
                        </ul>
                    </Reveal>

                    <Reveal className="flex flex-col gap-4 pt-8 border-t bd-hair">
                        <div className="flex items-baseline gap-4">
                            <span className="index-num micro-label t-accent">02</span>
                            <h2 className="display-sm t-1">
                                Privacidad de la información
                            </h2>
                        </div>
                        <p className="copy text-[1rem]">
                            Toda la información recopilada a través de nuestros formularios de contacto, reuniones
                            iniciales o durante el desarrollo de un proyecto, será tratada con estricta
                            confidencialidad y utilizada únicamente para los fines acordados contigo.
                        </p>
                    </Reveal>

                    <Reveal className="flex flex-col gap-4 pt-8 border-t bd-hair">
                        <div className="flex items-baseline gap-4">
                            <span className="index-num micro-label t-accent">03</span>
                            <h2 className="display-sm t-1">Desarrollo de proyectos</h2>
                        </div>
                        <p className="copy text-[1rem]">
                            Las condiciones específicas, alcances, plazos, garantías y propiedad intelectual de cada
                            proyecto desarrollado por Biznovatech se establecerán detalladamente en el contrato o
                            acuerdo de servicios correspondiente a dicho proyecto.
                        </p>
                    </Reveal>
                </article>

                <div className="mt-14 pt-8 border-t bd-hair flex flex-wrap gap-8">
                    <Link to="/" className="arrow-link">
                        <span>Volver al inicio</span>
                        <Icon icon="lucide:arrow-right" className="w-4 h-4" aria-hidden="true" />
                    </Link>
                    <Link to="/contacto" className="arrow-link">
                        <span>Ir a contacto</span>
                        <Icon icon="lucide:arrow-right" className="w-4 h-4" aria-hidden="true" />
                    </Link>
                </div>
            </Container>
        </div>
    );
}
