import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import { company } from "../data/company";

const SOCIALS = [
    { key: "linkedin", icon: "mdi:linkedin", label: "LinkedIn" },
    { key: "facebook", icon: "mdi:facebook", label: "Facebook" },
    { key: "instagram", icon: "mdi:instagram", label: "Instagram" },
    { key: "github", icon: "mdi:github", label: "GitHub" },
];

const SERVICES = [
    { to: "/servicios/desarrollo-software", label: "Desarrollo de software" },
    { to: "/servicios/aplicaciones-moviles", label: "Aplicaciones móviles" },
    { to: "/servicios/consultoria-tecnologica", label: "Consultoría tecnológica" },
    { to: "/servicios/diseno-ux-ui", label: "Diseño UI/UX" },
];

const LINKS = [
    { to: "/nosotros", label: "Nosotros" },
    { to: "/casos-de-exito", label: "Casos de éxito" },
    { to: "/recursos/tecnologias", label: "Atlas tecnológico" },
    { to: "/recursos", label: "Recursos" },
];

/**
 * Pie de página: bloque de tinta a sangre con retícula, columnas separadas por
 * filetes y micro-etiquetas monoespaciadas. Cierra el sitio con el mismo
 * lenguaje con el que abre el hero.
 */
export default function Footer() {
    return (
        <footer className="relative w-full surface-strong overflow-hidden" id="contact">
            <div aria-hidden="true" className="deco absolute inset-0">
                <div
                    className="absolute inset-0 grid-hairline"
                    style={{ "--cell": "clamp(56px, 6vw, 104px)" }}
                />
            </div>

            <div className="relative z-10 w-full max-w-[var(--shell-max)] mx-auto px-[var(--gutter)]">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 border-t bd-hair">
                    {/* Marca */}
                    <div className="lg:col-span-4 flex flex-col gap-7 py-12 lg:pr-12 lg:border-r bd-hair">
                        <Link to="/" className="flex items-center gap-3 w-fit group">
                            <img
                                src="/image/logo_only.webp"
                                alt=""
                                aria-hidden="true"
                                className="w-11 h-11 object-contain transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:rotate-[8deg]"
                            />
                            <span className="font-display text-2xl font-bold tracking-[-0.02em] t-1">
                                Biznova<span className="t-accent">tech</span>
                            </span>
                        </Link>

                        <p className="text-sm leading-relaxed max-w-[38ch] t-2">
                            {company.shortDescription}
                        </p>

                        <div className="flex gap-px bg-hair w-fit border bd-hair">
                            {SOCIALS.map((social) => {
                                const data = company.social[social.key];
                                if (!data || data.status !== "active" || !data.url) return null;
                                return (
                                    <a
                                        key={social.key}
                                        href={data.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={`${social.label} de Biznovatech`}
                                        className="grid place-items-center w-11 h-11 bg-canvas t-2 hover:fill-accent transition-colors duration-300"
                                    >
                                        <Icon icon={social.icon} className="w-[18px] h-[18px]" aria-hidden="true" />
                                    </a>
                                );
                            })}
                        </div>
                    </div>

                    {/* Servicios */}
                    <nav
                        aria-label="Servicios"
                        className="lg:col-span-3 flex flex-col gap-5 py-12 lg:px-10 border-t md:border-t-0 bd-hair lg:border-r"
                    >
                        <span className="micro-label t-accent">Servicios</span>
                        <ul className="flex flex-col gap-3.5 text-sm">
                            {SERVICES.map((item) => (
                                <li key={item.to}>
                                    <Link
                                        to={item.to}
                                        className="link-underline t-2 hover:t-1 transition-colors"
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                        <Link to="/servicios" className="arrow-link mt-1">
                            <span>Ver todos</span>
                            <Icon icon="lucide:arrow-right" className="w-4 h-4" aria-hidden="true" />
                        </Link>
                    </nav>

                    {/* Enlaces */}
                    <nav
                        aria-label="Enlaces"
                        className="lg:col-span-2 flex flex-col gap-5 py-12 lg:px-10 border-t md:border-t-0 lg:border-t-0 bd-hair lg:border-r"
                    >
                        <span className="micro-label t-accent">Enlaces</span>
                        <ul className="flex flex-col gap-3.5 text-sm">
                            {LINKS.map((item) => (
                                <li key={item.to}>
                                    <Link
                                        to={item.to}
                                        className="link-underline t-2 hover:t-1 transition-colors"
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* Contacto */}
                    <div className="lg:col-span-3 flex flex-col gap-5 py-12 lg:pl-10 border-t lg:border-t-0 bd-hair">
                        <span className="micro-label t-accent">Contacto</span>
                        <ul className="flex flex-col gap-4 text-sm">
                            <li className="flex items-start gap-3">
                                <Icon icon="lucide:phone" className="w-4 h-4 t-accent shrink-0 mt-0.5" aria-hidden="true" />
                                <a
                                    href={`https://wa.me/${company.contact.whatsapp}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="link-underline t-2 hover:t-1 transition-colors"
                                >
                                    {company.contact.phone}
                                </a>
                            </li>
                            <li className="flex items-start gap-3">
                                <Icon icon="lucide:mail" className="w-4 h-4 t-accent shrink-0 mt-0.5" aria-hidden="true" />
                                <a
                                    href={`mailto:${company.contact.email}`}
                                    className="link-underline t-2 hover:t-1 transition-colors break-all"
                                >
                                    {company.contact.email}
                                </a>
                            </li>
                            <li className="flex items-start gap-3">
                                <Icon icon="lucide:map-pin" className="w-4 h-4 t-accent shrink-0 mt-0.5" aria-hidden="true" />
                                <span>{company.location.full}</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Cierre de marca: la firma a todo el ancho */}
                <div className="pt-12 border-t bd-hair">
                    <span
                        aria-hidden="true"
                        className="block font-display font-bold uppercase leading-[0.78] tracking-[-0.055em] text-[clamp(2.6rem,13.4vw,13rem)] t-1-faint select-none whitespace-nowrap"
                    >
                        Biznovatech
                    </span>
                </div>

                {/* Línea legal */}
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 py-7 border-t bd-hair">
                    <p className="micro-label t-2/70">
                        © {new Date().getFullYear()} {company.legalName}. Todos los derechos reservados.
                    </p>
                    <div className="flex flex-wrap gap-x-8 gap-y-2">
                        <Link
                            to="/privacidad"
                            className="micro-label t-2/70 hover:t-accent transition-colors"
                        >
                            Política de privacidad
                        </Link>
                        <Link
                            to="/terminos-y-condiciones"
                            className="micro-label t-2/70 hover:t-accent transition-colors"
                        >
                            Términos y condiciones
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
