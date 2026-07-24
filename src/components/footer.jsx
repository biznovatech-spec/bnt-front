import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import Container from "../ui/container";
import { company } from "../data/company";

export default function Footer() {
    return (
        <footer className="bg-surface-dark w-full mt-20 text-gray-400" id="contact">
            <Container size="wide" className="py-12 lg:py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

                    <div className="flex flex-col gap-6">
                        <Link to="/" className="flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md w-fit">
                            <img src="/image/logo-only.png" alt="Biznovatech Logo" className="w-12" />
                            <span className="text-white text-3xl font-semibold">
                                Biznova<strong className="text-tertiary font-bold">tech</strong>
                            </span>
                        </Link>
                        <p className="text-sm leading-relaxed max-w-xs mt-2">
                            {company.shortDescription}
                        </p>
                        <div className="flex gap-4 mt-2">
                            {company.social.linkedin.status === "active" && company.social.linkedin.url && (
                                <a href={company.social.linkedin.url} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn de Biznovatech" className="w-10 h-10 rounded-full bg-white/5 hover:bg-t-primary hover:text-white transition-colors flex items-center justify-center text-t-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                                    <Icon icon="mdi:linkedin" className="w-5 h-5" />
                                </a>
                            )}
                            {company.social.facebook.status === "active" && company.social.facebook.url && (
                                <a href={company.social.facebook.url} target="_blank" rel="noopener noreferrer" aria-label="Facebook de Biznovatech" className="w-10 h-10 rounded-full bg-white/5 hover:bg-t-primary hover:text-white transition-colors flex items-center justify-center text-t-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                                    <Icon icon="mdi:facebook" className="w-5 h-5" />
                                </a>
                            )}
                            {company.social.instagram.status === "active" && company.social.instagram.url && (
                                <a href={company.social.instagram.url} target="_blank" rel="noopener noreferrer" aria-label="Instagram de Biznovatech" className="w-10 h-10 rounded-full bg-white/5 hover:bg-t-primary hover:text-white transition-colors flex items-center justify-center text-t-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                                    <Icon icon="mdi:instagram" className="w-5 h-5" />
                                </a>
                            )}
                            {company.social.github.status === "active" && company.social.github.url && (
                                <a href={company.social.github.url} target="_blank" rel="noopener noreferrer" aria-label="GitHub de Biznovatech" className="w-10 h-10 rounded-full bg-white/5 hover:bg-t-primary hover:text-white transition-colors flex items-center justify-center text-t-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                                    <Icon icon="mdi:github" className="w-5 h-5" />
                                </a>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-col gap-6">
                        <h4 className="text-white font-semibold text-lg">Servicios</h4>
                        <ul className="flex flex-col gap-4 text-sm">
                            <li><Link to="/servicios/desarrollo-software" className="hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm">Desarrollo de software</Link></li>
                            <li><Link to="/servicios/aplicaciones-moviles" className="hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm">Aplicaciones móviles</Link></li>
                            <li><Link to="/servicios/consultoria-tecnologica" className="hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm">Consultoría tecnológica</Link></li>
                            <li><Link to="/servicios/diseno-ux-ui" className="hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm">Diseño UI/UX</Link></li>
                        </ul>
                        <Link to="/servicios" className="text-primary text-sm font-semibold hover:text-white transition-colors mt-2 flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm w-fit">
                            Ver todos los servicios <span aria-hidden="true">&rarr;</span>
                        </Link>
                    </div>

                    <div className="flex flex-col gap-6">
                        <h4 className="text-white font-semibold text-lg">Enlaces</h4>
                        <ul className="flex flex-col gap-4 text-sm">
                            <li><Link to="/nosotros" className="hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm">Nosotros</Link></li>
                            <li><Link to="/casos-de-exito" className="hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm">Casos de éxito</Link></li>
                            <li><Link to="/recursos/tecnologias" className="hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm">Atlas tecnológico</Link></li>
                            <li><Link to="/recursos" className="hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm">Recursos</Link></li>
                        </ul>
                    </div>

                    <div className="flex flex-col gap-6">
                        <h4 className="text-white font-semibold text-lg">Contacto</h4>
                        <ul className="flex flex-col gap-5 text-sm">
                            <li className="flex items-center gap-3">
                                <Icon icon="solar:phone-bold" className="w-5 h-5 text-primary shrink-0" />
                                <a href={`https://wa.me/${company.contact.whatsapp}`} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">{company.contact.phone}</a>
                            </li>
                            <li className="flex items-center gap-3">
                                <Icon icon="solar:letter-bold" className="w-5 h-5 text-primary shrink-0" />
                                <a href={`mailto:${company.contact.email}`} className="hover:text-white transition-colors">{company.contact.email}</a>
                            </li>
                            <li className="flex items-start gap-3">
                                <Icon icon="solar:map-point-bold" className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                                <span>{company.location.full}</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="w-full h-px bg-white/10 mb-8"></div>
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
                    <p>© {new Date().getFullYear().toString()} {company.legalName}. Todos los derechos reservados.</p>
                    <div className="flex gap-6">
                        <Link to="/privacidad" className="hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm">Política de privacidad</Link>
                        <Link to="/terminos-y-condiciones" className="hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm">Términos y condiciones</Link>
                    </div>
                </div>
            </Container>
        </footer>
    );
}