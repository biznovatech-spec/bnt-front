import { useSeo } from "../hooks/useSeo";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import { Breadcrumb, Container, Eyebrow, Reveal } from "../ui";
import ContactList from "../components/contact-list";
import { legalDocs } from "../data/legal";

export default function LegalPage({ doc }) {
    const { title, description, updated, intro, sections } = legalDocs[doc];

    useSeo({ title, description });

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
                            Última actualización: {updated}
                        </p>
                    </Reveal>
                </header>

                <article className="mt-14 flex flex-col gap-12">
                    <Reveal>
                        <p className="copy text-[1rem]">{intro}</p>
                    </Reveal>

                    {sections.map((section, index) => (
                        <Reveal key={section.title} className="flex flex-col gap-4 pt-8 border-t bd-hair">
                            <div className="flex items-baseline gap-4">
                                <span className="index-num micro-label t-accent">
                                    {String(index + 1).padStart(2, "0")}
                                </span>
                                <h2 className="display-sm t-1">{section.title}</h2>
                            </div>
                            {section.paragraphs.map((text) => (
                                <p key={text} className="copy text-[1rem]">
                                    {text}
                                </p>
                            ))}
                            {section.list && (
                                <ul className="flex flex-col gap-2.5 mt-1">
                                    {section.list.map((item) => (
                                        <li key={item} className="flex items-start gap-3 copy text-[1rem]">
                                            <span aria-hidden="true" className="mt-[0.7em] w-3 h-px fill-accent-soft shrink-0" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            )}
                            {section.link && (
                                <Link to={section.link.to} className="arrow-link w-fit mt-1">
                                    <span>{section.link.label}</span>
                                    <Icon icon="lucide:arrow-right" className="w-4 h-4" aria-hidden="true" />
                                </Link>
                            )}
                        </Reveal>
                    ))}

                    <Reveal className="flex flex-col gap-4 pt-8 border-t bd-hair">
                        <div className="flex items-baseline gap-4">
                            <span className="index-num micro-label t-accent">
                                {String(sections.length + 1).padStart(2, "0")}
                            </span>
                            <h2 className="display-sm t-1">Contacto para consultas</h2>
                        </div>
                        <p className="copy text-[1rem]">
                            Si tienes alguna duda sobre este documento o el manejo de tu información, puedes
                            comunicarte con nosotros a través de:
                        </p>
                        <ContactList />
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
