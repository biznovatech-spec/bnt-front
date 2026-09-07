import { useSeo } from "../hooks/useSeo";
import { Icon } from "@iconify/react";
import { Breadcrumb, CTASection, Container, CutPanel, Eyebrow, Reveal, SectionHeader } from "../ui";
import { getGeneratedImage } from "../data/generatedImages";
import { company } from "../data/company";
import { team, teamDescription } from "../data/team";
import { methodology } from "../data/nosotros";

export default function NosotrosPage() {
    useSeo({
        title: "Nosotros",
        description: "Conoce a Biznovatech. Somos un equipo que integra análisis, diseño y desarrollo para convertir ideas y necesidades reales en soluciones digitales útiles."
    });

    const heroImage = getGeneratedImage("about-editorial");

    const pillars = [
        { label: "Propósito", value: company.purpose },
        { label: "Misión", value: company.mission },
        { label: "Visión", value: company.vision },
    ];

    return (
        <div className="w-full flex flex-col">
            <Container size="wide">
                <Breadcrumb items={[{ label: "Nosotros" }]} />
            </Container>

            {/* Portada */}
            <section className="w-full pt-10 pb-[var(--section-py)]" id="quienes-somos">
                <Container size="wide">
                    <SectionHeader label="Nosotros" title="Conoce a Biznovatech" as="h1" />

                    <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
                        <div className="lg:col-span-7 flex flex-col gap-6">
                            <Reveal>
                                <p className="lead max-w-[62ch]">{company.description}</p>
                            </Reveal>
                            <Reveal delay={80}>
                                <p className="copy max-w-[62ch]">{company.history}</p>
                            </Reveal>

                            {heroImage && (
                                <Reveal delay={160} dir="scale" className="mt-4">
                                    <CutPanel surface="plate" cut="34px" className="p-10 flex items-center justify-center">
                                        <div
                                            aria-hidden="true"
                                            className="deco absolute inset-0 grid-hairline opacity-70"
                                            style={{ "--cell": "48px" }}
                                        />
                                        <img
                                            src={heroImage.filename}
                                            alt={heroImage.alt}
                                            className="relative w-full max-w-sm object-contain"
                                            loading="eager"
                                        />
                                    </CutPanel>
                                </Reveal>
                            )}
                        </div>

                        <Reveal delay={140} dir="right" className="lg:col-span-5">
                            <CutPanel cut="30px" className="p-8 lg:p-10 flex flex-col gap-7 lg:sticky lg:top-28">
                                {pillars.map((pillar, i) => (
                                    <div key={pillar.label} className={`flex flex-col gap-2.5 ${i > 0 ? "pt-7 border-t bd-hair" : ""}`}>
                                        <span className="micro-label t-accent">
                                            {pillar.label}
                                        </span>
                                        <p className={i === 0 ? "display-xs text-[1.1rem] t-1" : "copy text-[0.9rem]"}>
                                            {pillar.value}
                                        </p>
                                    </div>
                                ))}
                            </CutPanel>
                        </Reveal>
                    </div>
                </Container>
            </section>

            {/* Valores */}
            <section
                className="w-full py-[var(--section-py)] bg-canvas-2 border-y bd-hair"
                id="proposito-valores"
            >
                <Container size="wide">
                    <SectionHeader
                        label="Valores"
                        index="01"
                        title="Cómo trabajamos, no solo qué hacemos"
                    />

                    <div className="mt-14">
                        {company.values.map((value, i) => (
                            <Reveal key={value.name} delay={i * 55} dir="none">
                                <article className="row group grid-cols-1 md:grid-cols-[minmax(0,6rem)_minmax(0,1fr)_minmax(0,1.4fr)] gap-x-8 gap-y-3 py-9 md:py-11 items-start">
                                    <span aria-hidden="true" className="ghost-num text-[clamp(2.2rem,4vw,3.6rem)]">
                                        {String(i + 1).padStart(2, "0")}
                                    </span>
                                    <h3 className="display-caps text-[clamp(1.05rem,1.6vw,1.6rem)] t-1 max-w-[16ch] transition-colors duration-500 group-hover:t-accent">
                                        {value.name}
                                    </h3>
                                    <p className="copy max-w-[56ch] md:pt-1">{value.description}</p>
                                </article>
                            </Reveal>
                        ))}
                    </div>
                </Container>
            </section>

            {/* Equipo */}
            <section className="w-full py-[var(--section-py)]" id="equipo">
                <Container size="wide">
                    <SectionHeader
                        label="Equipo"
                        index="02"
                        title="Las personas detrás de cada proyecto"
                        description={teamDescription}
                    />

                    {/* Diagrama de flujo */}
                    <Reveal delay={100} dir="none" className="hidden lg:block mt-14">
                        <div className="flex items-stretch border bd-hair">
                            <div className="flex items-center px-6 py-5 shrink-0">
                                <span className="micro-label t-2">
                                    Necesidad del cliente
                                </span>
                            </div>

                            {team.map((member) => (
                                <div
                                    key={member.id}
                                    className="flex items-center gap-4 px-6 py-5 border-l bd-hair flex-1"
                                >
                                    <span className="grid place-items-center w-9 h-9 border bd index-num text-[0.75rem] t-accent shrink-0">
                                        {member.initial}
                                    </span>
                                    <span className="text-sm font-semibold t-1">
                                        {member.stage}
                                    </span>
                                </div>
                            ))}

                            <div className="flex items-center gap-3 px-6 py-5 border-l bd-hair bg-2 shrink-0">
                                <Icon
                                    icon="lucide:arrow-right"
                                    className="w-4 h-4 t-accent"
                                    aria-hidden="true"
                                />
                                <span className="micro-label t-accent">Producto</span>
                            </div>
                        </div>
                    </Reveal>

                    {/* Fichas del equipo */}
                    <div className="mt-8 band grid-cols-1 md:grid-cols-3">
                        {team.map((member, i) => (
                            <Reveal key={member.id} delay={i * 70} dir="none" className="h-full">
                                <div className="group h-full flex flex-col gap-5 p-8 transition-colors duration-500 hover:bg-2">
                                    <div className="flex items-center gap-4">
                                        <span className="grid place-items-center w-12 h-12 border bd t-accent transition-colors duration-500 group-hover:border-current">
                                            <Icon icon={member.icon} className="w-5 h-5" aria-hidden="true" />
                                        </span>
                                        <span className="flex flex-col gap-1">
                                            <span className="display-xs text-[1.05rem] t-1">
                                                {member.name}
                                            </span>
                                            <span className="micro-label t-accent">
                                                {member.role}
                                            </span>
                                        </span>
                                    </div>

                                    <p className="copy text-[0.88rem]">{member.description}</p>

                                    <ul className="flex flex-col mt-auto">
                                        {member.responsibilities.slice(0, 4).map((r, respIndex) => (
                                            <li
                                                key={respIndex}
                                                className="flex items-start gap-3 py-2.5 border-t bd-hair text-[0.82rem] t-2"
                                            >
                                                <span
                                                    aria-hidden="true"
                                                    className="w-1 h-1 mt-2 fill-accent shrink-0"
                                                />
                                                {r}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </Container>
            </section>

            {/* Metodología */}
            <section className="w-full py-[var(--section-py)] surface-strong relative overflow-hidden" id="metodologia">
                <div aria-hidden="true" className="deco absolute inset-0">
                    <div
                        className="absolute inset-0 grid-hairline"
                        style={{ "--cell": "clamp(56px, 6vw, 104px)" }}
                    />
                </div>

                <Container size="wide" className="relative z-10">
                    <div className="flex flex-col gap-6 max-w-3xl">
                        <Reveal dir="none">
                            <Eyebrow className="t-accent">Metodología</Eyebrow>
                        </Reveal>
                        <Reveal delay={80}>
                            <h2 className="display-caps t-1 max-w-[18ch]">Cómo abordamos cada proyecto</h2>
                        </Reveal>
                        <Reveal delay={150}>
                            <p className="text-[var(--fs-lead)] leading-relaxed t-2 max-w-[60ch]">
                                Trabajamos con una dinámica ágil y organizada que permite avanzar con claridad en
                                cada fase, adaptándonos a las necesidades específicas del proyecto.
                            </p>
                        </Reveal>
                    </div>

                    <div className="mt-16 grid grid-cols-1 md:grid-cols-5 border-y bd-hair">
                        {methodology.map((m, i) => (
                            <Reveal
                                key={m.step}
                                dir="none"
                                delay={i * 70}
                                className={`flex flex-col gap-6 px-6 md:px-7 py-10 md:py-12 ${
                                    i > 0 ? "border-t bd-hair md:border-t-0 md:border-l" : ""
                                }`}
                            >
                                <span aria-hidden="true" className="num-solid text-[clamp(2.6rem,4.4vw,4rem)] t-1-mute">
                                    {m.step}
                                </span>
                                <h3 className="display-caps text-[clamp(0.95rem,1.1vw,1.15rem)] t-1">
                                    {m.title}
                                </h3>
                                <p className="text-[0.85rem] leading-relaxed t-2 max-w-[28ch]">
                                    {m.description}
                                </p>
                            </Reveal>
                        ))}
                    </div>
                </Container>
            </section>

            <div className="py-[var(--section-py)]">
                <Container size="wide">
                    <CTASection
                        title="¿Quieres conocer cómo trabajamos de cerca?"
                        description="Cada colaboración empieza con una conversación. Cuéntanos tu idea y veamos cómo podemos ayudarte."
                        buttonText="Cuéntanos tu idea"
                        buttonTo="/contacto"
                    />
                </Container>
            </div>
        </div>
    );
}
