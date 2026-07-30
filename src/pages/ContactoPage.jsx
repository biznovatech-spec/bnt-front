import { useState } from "react";
import { useSeo } from "../hooks/useSeo";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import Container from "../ui/container";
import Breadcrumb from "../ui/breadcrumb";
import SectionHeader from "../ui/section-header";
import { getGeneratedImage } from "../data/generatedImages";
import { getPendingImage } from "../data/pendingImages";
import PendingImagePlaceholder from "../ui/pending-image-placeholder";
import { company } from "../data/company";
import { services } from "../data/services";

export default function ContactoPage() {
    useSeo({
        title: "Contacto",
        description: "Comunícate con Biznovatech. Cuéntanos tu idea, problema o proyecto y exploremos cómo podemos ayudarte a construir la solución adecuada."
    });

    const heroImage = getGeneratedImage("contact-editorial");
    const pendingImage = !heroImage ? getPendingImage("contact-editorial") : null;

    const [form, setForm] = useState({
        name: "",
        company: "",
        email: "",
        phone: "",
        stage: "",
        service: "",
        message: "",
        privacy: false
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm(prev => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
    };

    const isFormValid = form.name.trim() !== "" && form.email.trim() !== "" && form.message.trim() !== "" && form.privacy;

    const generateMessage = () => {
        const stageText = form.stage ? `\nEtapa: ${form.stage}` : "";
        const serviceText = form.service ? `\nInterés: ${form.service}` : "";
        const companyText = form.company ? ` (${form.company})` : "";
        const phoneText = form.phone ? `\nTeléfono: ${form.phone}` : "";
        
        return `Hola Biznovatech, soy ${form.name}${companyText}.\n${phoneText}${stageText}${serviceText}\n\nMensaje:\n${form.message}`;
    };

    const handleWhatsApp = (e) => {
        if (!isFormValid) {
            e.preventDefault();
            alert("Por favor, completa los campos requeridos y acepta la política de privacidad.");
            return;
        }
        const text = encodeURIComponent(generateMessage());
        window.open(`https://wa.me/${company.contact.whatsapp}?text=${text}`, '_blank');
    };

    const handleMailto = (e) => {
        if (!isFormValid) {
            e.preventDefault();
            alert("Por favor, completa los campos requeridos y acepta la política de privacidad.");
            return;
        }
        const subject = encodeURIComponent(`Nuevo contacto web: ${form.name}`);
        const body = encodeURIComponent(generateMessage());
        window.location.href = `mailto:${company.contact.email}?subject=${subject}&body=${body}`;
    };

    return (
        <div className="w-full flex flex-col gap-16 pb-24">
            <Container size="standard">
                <Breadcrumb items={[{ label: "Contacto" }]} />
                <section className="pt-4 flex flex-col lg:flex-row gap-16 lg:gap-24">
                    <div className="lg:w-2/5 flex flex-col gap-10">
                        <SectionHeader
                            label="CONTACTO"
                            title="Cuéntanos tu idea o situación"
                            description="Selecciona un canal para conversar y cuéntanos qué necesitas construir, mejorar o resolver."
                            as="h1"
                        />
                        <div className="flex flex-col gap-6">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                    <Icon icon="solar:letter-linear" className="w-5 h-5 text-primary" />
                                </div>
                                <div className="flex flex-col gap-1 mt-1">
                                    <span className="text-sm font-bold text-gray-900 tracking-widest">CORREO</span>
                                    <a href={`mailto:${company.contact.email}`} className="text-t-secondary hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm w-fit">{company.contact.email}</a>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                    <Icon icon="solar:phone-linear" className="w-5 h-5 text-primary" />
                                </div>
                                <div className="flex flex-col gap-1 mt-1">
                                    <span className="text-sm font-bold text-gray-900 tracking-widest">TELÉFONO Y WHATSAPP</span>
                                    <a href={`https://wa.me/${company.contact.whatsapp}`} target="_blank" rel="noopener noreferrer" className="text-t-secondary hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm w-fit">{company.contact.phone}</a>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                    <Icon icon="solar:map-point-linear" className="w-5 h-5 text-primary" />
                                </div>
                                <div className="flex flex-col gap-1 mt-1">
                                    <span className="text-sm font-bold text-gray-900 tracking-widest">UBICACIÓN Y ATENCIÓN</span>
                                    <p className="text-t-secondary">{company.location.full}</p>
                                    <p className="text-sm text-gray-500 mt-1">Atención remota y reuniones presenciales con coordinación previa.</p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="mt-auto pt-8">
                            {heroImage ? (
                                <div className="rounded-2xl overflow-hidden flex items-center justify-center ">
                                    <img src={heroImage.filename} alt={heroImage.alt} className="w-full max-w-sm object-contain animate-fade-in scale-110 mask-b-from-50% mask-b-to-95%" loading="lazy" />
                                </div>
                            ) : pendingImage ? (
                                <PendingImagePlaceholder
                                    id={pendingImage.id}
                                    title={pendingImage.title}
                                    concept={pendingImage.concept}
                                    expectedFilename={pendingImage.expectedFilename}
                                    recommendedRatio={pendingImage.recommendedRatio}
                                    recommendedSize={`${pendingImage.recommendedWidth}×${pendingImage.recommendedHeight}`}
                                    variant="hero"
                                />
                            ) : null}
                        </div>
                    </div>
                    
                    <div className="lg:w-3/5 bg-gray-50 rounded-2xl p-6 md:p-10 border border-gray-100">
                        <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="name" className="text-sm font-semibold text-gray-900">Nombre *</label>
                                    <input type="text" id="name" name="name" value={form.name} onChange={handleChange} required className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all" placeholder="Tu nombre" />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="company" className="text-sm font-semibold text-gray-900">Organización <span className="text-gray-400 font-normal">(Opcional)</span></label>
                                    <input type="text" id="company" name="company" value={form.company} onChange={handleChange} className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all" placeholder="Empresa o proyecto" />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="email" className="text-sm font-semibold text-gray-900">Correo *</label>
                                    <input type="email" id="email" name="email" value={form.email} onChange={handleChange} required className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all" placeholder="tucorreo@ejemplo.com" />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="phone" className="text-sm font-semibold text-gray-900">Teléfono <span className="text-gray-400 font-normal">(Opcional)</span></label>
                                    <input type="tel" id="phone" name="phone" value={form.phone} onChange={handleChange} className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all" placeholder="Tu número" />
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="stage" className="text-sm font-semibold text-gray-900">¿En qué punto se encuentra tu idea?</label>
                                <select id="stage" name="stage" value={form.stage} onChange={handleChange} className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all text-gray-700">
                                    <option value="">Selecciona una opción (opcional)</option>
                                    <option value="Tengo una idea y necesito ayuda para definirla">Tengo una idea y necesito ayuda para definirla</option>
                                    <option value="Tengo requerimientos claros y necesito desarrollo">Tengo requerimientos claros y necesito desarrollo</option>
                                    <option value="Tengo un producto actual y quiero mejorarlo">Tengo un producto actual y quiero mejorarlo</option>
                                    <option value="Tengo un proceso manual y quiero digitalizarlo">Tengo un proceso manual y quiero digitalizarlo</option>
                                    <option value="Busco mantenimiento o soporte">Busco mantenimiento o soporte</option>
                                </select>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="service" className="text-sm font-semibold text-gray-900">¿Qué tipo de apoyo buscas?</label>
                                <select id="service" name="service" value={form.service} onChange={handleChange} className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all text-gray-700">
                                    <option value="">Selecciona una opción (opcional)</option>
                                    {services.map(s => <option key={s.slug} value={s.name}>{s.name}</option>)}
                                </select>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="message" className="text-sm font-semibold text-gray-900">Mensaje *</label>
                                <textarea id="message" name="message" value={form.message} onChange={handleChange} required rows={4} className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all resize-none" placeholder="Cuéntanos un poco sobre tu situación..."></textarea>
                            </div>
                            <div className="flex items-start gap-3 mt-2">
                                <input type="checkbox" id="privacy" name="privacy" checked={form.privacy} onChange={handleChange} required className="mt-1 w-4 h-4 text-primary rounded border-gray-300 focus:ring-primary cursor-pointer" />
                                <label htmlFor="privacy" className="text-sm text-gray-600 leading-relaxed cursor-pointer">
                                    Acepto que mis datos se utilicen para ser contactado en relación a mi consulta, de acuerdo con la <Link to="/privacidad" className="text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm">política de privacidad</Link>.
                                </label>
                            </div>
                            
                            <div className="flex flex-col sm:flex-row gap-4 mt-6">
                                <button
                                    type="button"
                                    onClick={handleMailto}
                                    disabled={!isFormValid}
                                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                                >
                                    <Icon icon="solar:letter-linear" className="w-5 h-5" />
                                    Enviar por correo
                                </button>
                                <button
                                    type="button"
                                    onClick={handleWhatsApp}
                                    disabled={!isFormValid}
                                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 bg-[#25D366] text-white font-semibold rounded-lg hover:bg-[#20bd5a] disabled:opacity-50 disabled:cursor-not-allowed transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                                >
                                    <Icon icon="mdi:whatsapp" className="w-6 h-6" />
                                    Enviar por WhatsApp
                                </button>
                            </div>
                        </form>
                    </div>
                </section>
            </Container>
        </div>
    );
}
