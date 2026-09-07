import { useState } from "react";
import { useSeo } from "../hooks/useSeo";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "framer-motion";
import { Breadcrumb, Container, CutPanel, PendingImagePlaceholder, Reveal, SectionHeader } from "../ui";
import { getGeneratedImage } from "../data/generatedImages";
import { getPendingImage } from "../data/pendingImages";
import { company } from "../data/company";
import { services } from "../data/services";

const STAGES = [
    "Tengo una idea y necesito ayuda para definirla",
    "Tengo requerimientos claros y necesito desarrollo",
    "Tengo un producto actual y quiero mejorarlo",
    "Tengo un proceso manual y quiero digitalizarlo",
    "Busco mantenimiento o soporte",
];

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

    const [selectedServices, setSelectedServices] = useState([]);
    const [status, setStatus] = useState("idle");

    // La selección múltiple se guarda en el mismo campo `service` que ya
    // viajaba en el correo y en el mensaje de WhatsApp: no cambia el contrato.
    const toggleService = (name) => {
        setSelectedServices((prev) => {
            const next = prev.includes(name) ? prev.filter((s) => s !== name) : [...prev, name];
            setForm((f) => ({ ...f, service: next.join(", ") }));
            return next;
        });
    };
    const [toast, setToast] = useState({ show: false, message: "", type: "success" });

    const showToast = (message, type = "success") => {
        setToast({ show: true, message, type });
        setTimeout(() => setToast({ show: false, message: "", type }), 5000);
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm(prev => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
    };

    const isFormValid = form.name.trim() !== "" && form.email.trim() !== "" && form.message.trim() !== "" && form.privacy;

    const generateMessage = () => {
        return `*m3BizNovaTech* 🌐\n\n` +
               `👤 *Nombre:* ${form.name}\n` +
               (form.company ? `🏢 *Organización:* ${form.company}\n` : "") +
               `📧 *Correo:* ${form.email}\n` +
               (form.phone ? `📱 *Teléfono:* ${form.phone}\n` : "") +
               (form.stage ? `📌 *Etapa:* ${form.stage}\n` : "") +
               (form.service ? `💡 *Interés:* ${form.service}\n` : "") +
               `\n📝 *Mensaje:*\n${form.message}`;
    };

    const handleWhatsApp = (e) => {
        if (!isFormValid) {
            e.preventDefault();
            showToast("Por favor, completa los campos requeridos y acepta la política de privacidad.", "error");
            return;
        }
        const text = encodeURIComponent(generateMessage());
        window.open(`https://wa.me/${company.contact.whatsapp}?text=${text}`, '_blank');
    };

    const handleEmailSubmit = async (e) => {
        e.preventDefault();
        if (!isFormValid) return;

        // Verificación de spam (5 minutos)
        const lastSentTime = localStorage.getItem("bnt_last_email_sent");
        if (lastSentTime) {
            const timeSinceLastSent = Date.now() - parseInt(lastSentTime, 10);
            const cooldownTime = 5 * 60 * 1000; // 5 minutos en milisegundos
            if (timeSinceLastSent < cooldownTime) {
                const remainingMinutes = Math.ceil((cooldownTime - timeSinceLastSent) / 60000);
                showToast(`Por favor, espera ${remainingMinutes} minuto(s) antes de enviar otro correo. Puedes usar WhatsApp si es urgente.`, "error");
                return;
            }
        }

        setStatus("submitting");

        try {
            const response = await fetch(`https://formsubmit.co/ajax/${company.contact.email}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    Nombre: form.name,
                    Organización: form.company || "No especificada",
                    Correo: form.email,
                    Teléfono: form.phone || "No especificado",
                    Etapa: form.stage || "No especificada",
                    Interés: form.service || "No especificado",
                    Mensaje: form.message,
                    _subject: `Nuevo contacto de ${form.name || 'la web'}`,
                    _template: "table"
                })
            });

            const data = await response.json();

            if (data.success === "false" && data.message && data.message.includes("Activation")) {
                // FormSubmit envía correo de activación interno, pero mostramos mensaje de éxito al usuario
                localStorage.setItem("bnt_last_email_sent", Date.now().toString());
                showToast("¡Mensaje enviado con éxito! Nos pondremos en contacto pronto.", "success");
                setForm({
                    name: "", company: "", email: "", phone: "",
                    stage: "", service: "", message: "", privacy: false
                });
                setSelectedServices([]);
                setStatus("idle");
                return;
            }

            if (response.ok || data.success === "true") {
                // Guardar la fecha del envío exitoso para el control de spam
                localStorage.setItem("bnt_last_email_sent", Date.now().toString());

                showToast("¡Mensaje enviado con éxito! Nos pondremos en contacto pronto.", "success");
                setForm({
                    name: "", company: "", email: "", phone: "",
                    stage: "", service: "", message: "", privacy: false
                });
                setSelectedServices([]);
            } else {
                throw new Error("Error en el envío");
            }
        } catch (error) {
            console.error("Error:", error);
            showToast("Hubo un problema al enviar el mensaje. Por favor, intenta usar WhatsApp.", "error");
        } finally {
            setStatus("idle");
        }
    };

    const channels = [
        {
            label: "Correo",
            icon: "lucide:mail",
            value: company.contact.email,
            href: `mailto:${company.contact.email}`,
        },
        {
            label: "Teléfono y WhatsApp",
            icon: "lucide:phone",
            value: company.contact.phone,
            href: `https://wa.me/${company.contact.whatsapp}`,
            external: true,
        },
        {
            label: "Ubicación y atención",
            icon: "lucide:map-pin",
            value: company.location.full,
            note: "Atención remota y reuniones presenciales con coordinación previa.",
        },
    ];

    return (
        <div className="w-full flex flex-col pb-[var(--section-py)] relative">
            {/* Aviso flotante */}
            <AnimatePresence>
                {toast.show && (
                    <motion.div
                        initial={{ opacity: 0, y: -16, x: "-50%" }}
                        animate={{ opacity: 1, y: 0, x: "-50%" }}
                        exit={{ opacity: 0, y: -16, x: "-50%" }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="fixed top-[calc(var(--header-compact-height)+20px)] left-1/2 z-50 w-[92%] max-w-md"
                        role="status"
                        aria-live="polite"
                    >
                        <div className="flex items-start gap-4 p-5 bg-[var(--panel-bg)] border bd shadow-[0_24px_60px_-30px_rgba(6,11,22,0.6)]">
                            <span
                                className={`grid place-items-center w-9 h-9 shrink-0 border ${
                                    toast.type === "success"
                                        ? "border-success text-success"
                                        : "border-error text-error"
                                }`}
                            >
                                <Icon
                                    icon={toast.type === "success" ? "lucide:check" : "lucide:alert-triangle"}
                                    className="w-4 h-4"
                                    aria-hidden="true"
                                />
                            </span>
                            <p className="text-[0.9rem] leading-relaxed t-1">
                                {toast.message}
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <Container size="wide">
                <Breadcrumb items={[{ label: "Contacto" }]} />
            </Container>

            <section className="w-full pt-10">
                <Container size="wide">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
                        {/* Canales */}
                        <div className="lg:col-span-5 flex flex-col gap-10">
                            <SectionHeader
                                label="Contacto"
                                title="Cuéntanos tu idea o situación"
                                description="Selecciona un canal para conversar y cuéntanos qué necesitas construir, mejorar o resolver."
                                as="h1"
                            />

                            <div className="flex flex-col border-t bd-hair">
                                {channels.map((channel, i) => (
                                    <Reveal
                                        key={channel.label}
                                        delay={i * 80}
                                        className="flex items-start gap-5 py-6 border-b bd-hair"
                                    >
                                        <span className="grid place-items-center w-11 h-11 border bd t-accent shrink-0">
                                            <Icon icon={channel.icon} className="w-4 h-4" aria-hidden="true" />
                                        </span>

                                        <span className="flex flex-col gap-2 min-w-0">
                                            <span className="micro-label t-2">
                                                {channel.label}
                                            </span>
                                            {channel.href ? (
                                                <a
                                                    href={channel.href}
                                                    target={channel.external ? "_blank" : undefined}
                                                    rel={channel.external ? "noopener noreferrer" : undefined}
                                                    className="link-underline text-[0.98rem] t-1 hover:t-accent transition-colors w-fit break-all"
                                                >
                                                    {channel.value}
                                                </a>
                                            ) : (
                                                <span className="text-[0.98rem] t-1">
                                                    {channel.value}
                                                </span>
                                            )}
                                            {channel.note && <span className="copy text-[0.82rem]">{channel.note}</span>}
                                        </span>
                                    </Reveal>
                                ))}
                            </div>

                            {heroImage ? (
                                <Reveal delay={140} dir="scale" className="hidden lg:block">
                                    <CutPanel surface="plate" cut="34px" className="p-8 flex items-center justify-center">
                                        <div
                                            aria-hidden="true"
                                            className="deco absolute inset-0 grid-hairline opacity-70"
                                            style={{ "--cell": "48px" }}
                                        />
                                        <img
                                            src={heroImage.filename}
                                            alt={heroImage.alt}
                                            className="relative w-full max-w-sm object-contain"
                                            loading="lazy"
                                        />
                                    </CutPanel>
                                </Reveal>
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

                        {/* Formulario */}
                        <Reveal delay={120} dir="right" className="lg:col-span-7 lg:border-l lg:bd-hair lg:pl-14">
                            <div className="pt-2">
                                <form onSubmit={handleEmailSubmit} className="flex flex-col gap-7">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="flex flex-col gap-2.5">
                                            <label htmlFor="name" className="field-label">
                                                Nombre <span className="t-accent">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                value={form.name}
                                                onChange={handleChange}
                                                required
                                                className="field"
                                                placeholder="Tu nombre"
                                            />
                                        </div>

                                        <div className="flex flex-col gap-2.5">
                                            <label htmlFor="company" className="field-label">
                                                Organización <span className="opacity-50">(Opcional)</span>
                                            </label>
                                            <input
                                                type="text"
                                                id="company"
                                                name="company"
                                                value={form.company}
                                                onChange={handleChange}
                                                className="field"
                                                placeholder="Empresa o proyecto"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="flex flex-col gap-2.5">
                                            <label htmlFor="email" className="field-label">
                                                Correo <span className="t-accent">*</span>
                                            </label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                value={form.email}
                                                onChange={handleChange}
                                                required
                                                className="field"
                                                placeholder="tucorreo@ejemplo.com"
                                            />
                                        </div>

                                        <div className="flex flex-col gap-2.5">
                                            <label htmlFor="phone" className="field-label">
                                                Teléfono <span className="opacity-50">(Opcional)</span>
                                            </label>
                                            <input
                                                type="tel"
                                                id="phone"
                                                name="phone"
                                                value={form.phone}
                                                onChange={handleChange}
                                                className="field"
                                                placeholder="Tu número"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-2.5">
                                        <label htmlFor="stage" className="field-label">
                                            ¿En qué punto se encuentra tu idea?
                                        </label>
                                        <select
                                            id="stage"
                                            name="stage"
                                            value={form.stage}
                                            onChange={handleChange}
                                            className="field"
                                        >
                                            <option value="">Selecciona una opción (opcional)</option>
                                            {STAGES.map((stage) => (
                                                <option key={stage} value={stage}>
                                                    {stage}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <fieldset className="flex flex-col gap-3.5">
                                        <legend className="field-label mb-1">
                                            ¿Qué tipo de apoyo buscas?
                                        </legend>

                                        <div className="flex flex-wrap gap-2">
                                            {services.map((s) => {
                                                const active = selectedServices.includes(s.name);
                                                return (
                                                    <button
                                                        key={s.slug}
                                                        type="button"
                                                        onClick={() => toggleService(s.name)}
                                                        aria-pressed={active}
                                                        className={`group flex items-center gap-2 px-3.5 py-2.5 micro-label border transition-colors duration-300 ${
                                                            active
                                                                ? "fill-accent bd-accent"
                                                                : "bd t-2 hover:bd-strong hover:t-1"
                                                        }`}
                                                    >
                                                        <Icon
                                                            icon={active ? "lucide:check" : "lucide:plus"}
                                                            className="w-3.5 h-3.5 shrink-0 transition-transform duration-300"
                                                            aria-hidden="true"
                                                        />
                                                        {s.name}
                                                    </button>
                                                );
                                            })}
                                        </div>

                                        {/* Acuse de recibo: crece solo cuando hay selección */}
                                        <div
                                            className="grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                                            style={{
                                                gridTemplateRows: selectedServices.length ? "1fr" : "0fr",
                                                opacity: selectedServices.length ? 1 : 0,
                                            }}
                                            aria-live="polite"
                                        >
                                            <div className="overflow-hidden">
                                                <p className="flex items-start gap-3 p-4 border-l-2 bd-accent bg-2 text-[0.85rem] leading-relaxed t-1">
                                                    <span className="micro-label t-accent shrink-0 pt-0.5">
                                                        Consulta sobre
                                                    </span>
                                                    <span>{selectedServices.join(" · ")}</span>
                                                </p>
                                            </div>
                                        </div>

                                        <input type="hidden" name="service" value={form.service} />
                                    </fieldset>

                                    <div className="flex flex-col gap-2.5">
                                        <label htmlFor="message" className="field-label">
                                            Mensaje <span className="t-accent">*</span>
                                        </label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            value={form.message}
                                            onChange={handleChange}
                                            required
                                            rows={5}
                                            className="field resize-none"
                                            placeholder="Cuéntanos un poco sobre tu situación..."
                                        />
                                    </div>

                                    <div className="flex items-start gap-3.5 pt-1">
                                        <input
                                            type="checkbox"
                                            id="privacy"
                                            name="privacy"
                                            checked={form.privacy}
                                            onChange={handleChange}
                                            required
                                            className="mt-1 w-4 h-4 accent-[var(--color-primary)] cursor-pointer shrink-0"
                                        />
                                        <label
                                            htmlFor="privacy"
                                            className="text-[0.85rem] leading-relaxed t-2 cursor-pointer"
                                        >
                                            Acepto que mis datos se utilicen para ser contactado en relación a mi
                                            consulta, de acuerdo con la{" "}
                                            <Link
                                                to="/privacidad"
                                                className="link-underline t-accent"
                                            >
                                                política de privacidad
                                            </Link>
                                            .
                                        </label>
                                    </div>

                                    <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t bd-hair">
                                        <button
                                            type="submit"
                                            disabled={!isFormValid || status === "submitting"}
                                            className="btn btn-primary flex-1 group disabled:opacity-40 disabled:cursor-not-allowed"
                                        >
                                            <Icon
                                                icon={
                                                    status === "submitting"
                                                        ? "line-md:loading-twotone-loop"
                                                        : "lucide:mail"
                                                }
                                                className="w-4 h-4"
                                                aria-hidden="true"
                                            />
                                            {status === "submitting" ? "Enviando..." : "Enviar por correo"}
                                        </button>

                                        <button
                                            type="button"
                                            onClick={handleWhatsApp}
                                            disabled={!isFormValid}
                                            className="btn btn-outline flex-1 group disabled:opacity-40 disabled:cursor-not-allowed"
                                        >
                                            <Icon icon="mdi:whatsapp" className="w-4 h-4" aria-hidden="true" />
                                            Enviar por WhatsApp
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </Reveal>
                    </div>
                </Container>
            </section>
        </div>
    );
}
