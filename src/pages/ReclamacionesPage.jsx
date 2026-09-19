import { useState } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import { useSeo } from "../hooks/useSeo";
import { Breadcrumb, Container, Eyebrow, Reveal } from "../ui";
import { company } from "../data/company";
import ContactList from "../components/contact-list";
import { DOC_TYPES, EMPTY_CLAIM, buildClaimPayload, createClaimCode, validateClaim } from "../utils/claims";

const CLAIM_TYPES = [
    { value: "Reclamo", text: "Disconformidad relacionada con los productos o servicios contratados." },
    { value: "Queja", text: "Disconformidad no relacionada con los productos o servicios, o malestar respecto a la atención." },
];

export default function ReclamacionesPage() {
    useSeo({
        title: "Libro de Reclamaciones",
        description: "Registra un reclamo o queja sobre los servicios de Biznovatech en nuestro Libro de Reclamaciones virtual.",
    });

    const [form, setForm] = useState(EMPTY_CLAIM);
    const [errors, setErrors] = useState({});
    const [status, setStatus] = useState("idle");
    const [sent, setSent] = useState(null);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
        setErrors((prev) => ({ ...prev, [name]: undefined }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const found = validateClaim(form);
        setErrors(found);
        if (Object.keys(found).length) {
            document.getElementById(Object.keys(found)[0])?.focus();
            return;
        }

        setStatus("submitting");
        const now = new Date();
        const code = createClaimCode(now);

        try {
            const response = await fetch(`https://formsubmit.co/ajax/${company.contact.email}`, {
                method: "POST",
                headers: { "Content-Type": "application/json", Accept: "application/json" },
                body: JSON.stringify({ ...buildClaimPayload(form, code, now), _cc: form.email.trim() }),
            });
            if (!response.ok) throw new Error("Error en el envío");
            setSent({ code, date: now, email: form.email.trim(), type: form.claimType });
            setForm(EMPTY_CLAIM);
            window.scrollTo({ top: 0, behavior: "smooth" });
        } catch {
            setStatus("error");
            return;
        }
        setStatus("idle");
    };

    return (
        <div className="w-full flex flex-col pb-[var(--section-py)]">
            <Container size="reading">
                <Breadcrumb items={[{ label: "Libro de Reclamaciones" }]} />

                <header className="flex flex-col gap-5 pt-10 pb-8 border-b bd-hair">
                    <Reveal dir="none">
                        <Eyebrow tone="muted">Protección al consumidor</Eyebrow>
                    </Reveal>
                    <Reveal delay={80}>
                        <h1 className="display-caps t-1">Libro de Reclamaciones</h1>
                    </Reveal>
                    <Reveal delay={140}>
                        <p className="copy text-[1rem]">
                            Conforme al Código de Protección y Defensa del Consumidor (Ley N.° 29571), ponemos a tu
                            disposición este libro virtual. Responderemos a tu correo en un plazo no mayor a quince
                            (15) días hábiles.
                        </p>
                    </Reveal>
                </header>

                <Reveal className="mt-10">
                    <dl className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-hair border bd-hair">
                        <div className="p-5 bg-canvas flex flex-col gap-1.5">
                            <dt className="micro-label t-3">Proveedor</dt>
                            <dd className="t-1">{company.legalName}</dd>
                        </div>
                        <div className="p-5 bg-canvas flex flex-col gap-1.5">
                            <dt className="micro-label t-3">Domicilio</dt>
                            <dd className="t-1">{company.location.full}</dd>
                        </div>
                    </dl>
                </Reveal>

                {sent ? (
                    <ClaimReceipt sent={sent} onReset={() => setSent(null)} />
                ) : (
                    <form onSubmit={handleSubmit} noValidate className="mt-14 flex flex-col gap-12">
                        <Block number="01" title="Identificación del consumidor">
                            <Field id="name" label="Nombre completo" error={errors.name}>
                                <input id="name" name="name" value={form.name} onChange={handleChange} className="field" autoComplete="name" />
                            </Field>
                            <div className="grid grid-cols-1 md:grid-cols-[0.8fr_1.2fr] gap-6">
                                <Field id="docType" label="Tipo de documento">
                                    <select id="docType" name="docType" value={form.docType} onChange={handleChange} className="field">
                                        {DOC_TYPES.map((type) => (
                                            <option key={type} value={type}>{type}</option>
                                        ))}
                                    </select>
                                </Field>
                                <Field id="docNumber" label="Número de documento" error={errors.docNumber}>
                                    <input id="docNumber" name="docNumber" value={form.docNumber} onChange={handleChange} className="field" inputMode={form.docType === "DNI" || form.docType === "RUC" ? "numeric" : "text"} />
                                </Field>
                            </div>
                            <Field id="address" label="Domicilio" error={errors.address}>
                                <input id="address" name="address" value={form.address} onChange={handleChange} className="field" autoComplete="street-address" />
                            </Field>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Field id="phone" label="Teléfono" error={errors.phone}>
                                    <input id="phone" name="phone" type="tel" value={form.phone} onChange={handleChange} className="field" autoComplete="tel" />
                                </Field>
                                <Field id="email" label="Correo electrónico" error={errors.email}>
                                    <input id="email" name="email" type="email" value={form.email} onChange={handleChange} className="field" autoComplete="email" />
                                </Field>
                            </div>
                            <Field id="guardian" label="Padre, madre o apoderado" optional hint="Solo si el consumidor es menor de edad.">
                                <input id="guardian" name="guardian" value={form.guardian} onChange={handleChange} className="field" />
                            </Field>
                        </Block>

                        <Block number="02" title="Identificación del bien contratado">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Field id="itemType" label="Tipo">
                                    <select id="itemType" name="itemType" value={form.itemType} onChange={handleChange} className="field">
                                        <option value="Servicio">Servicio</option>
                                        <option value="Producto">Producto</option>
                                    </select>
                                </Field>
                                <Field id="amount" label="Monto reclamado (S/)" optional error={errors.amount}>
                                    <input id="amount" name="amount" type="number" min="0" step="0.01" value={form.amount} onChange={handleChange} className="field" />
                                </Field>
                            </div>
                            <Field id="itemDescription" label="Descripción" error={errors.itemDescription}>
                                <input id="itemDescription" name="itemDescription" value={form.itemDescription} onChange={handleChange} className="field" placeholder="Ej.: Desarrollo de sitio web corporativo" />
                            </Field>
                        </Block>

                        <Block number="03" title="Detalle de la reclamación">
                            <fieldset className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <legend className="field-label mb-3">Tipo</legend>
                                {CLAIM_TYPES.map((type) => (
                                    <label
                                        key={type.value}
                                        className={`flex items-start gap-3.5 p-4 border cursor-pointer transition-colors duration-300 ${
                                            form.claimType === type.value ? "bd-accent bg-2" : "bd hover:bd-strong"
                                        }`}
                                    >
                                        <input
                                            type="radio"
                                            name="claimType"
                                            value={type.value}
                                            checked={form.claimType === type.value}
                                            onChange={handleChange}
                                            className="mt-1 accent-[var(--color-primary)]"
                                        />
                                        <span className="flex flex-col gap-1">
                                            <span className="t-1 font-medium">{type.value}</span>
                                            <span className="text-[0.82rem] leading-relaxed t-2">{type.text}</span>
                                        </span>
                                    </label>
                                ))}
                            </fieldset>
                            <Field id="detail" label="Detalle" error={errors.detail}>
                                <textarea id="detail" name="detail" rows={5} value={form.detail} onChange={handleChange} className="field resize-none" placeholder="Cuéntanos qué ocurrió" />
                            </Field>
                            <Field id="request" label="Pedido del consumidor" error={errors.request}>
                                <textarea id="request" name="request" rows={3} value={form.request} onChange={handleChange} className="field resize-none" placeholder="¿Qué solución esperas?" />
                            </Field>
                        </Block>

                        <div className="flex flex-col gap-6 pt-8 border-t bd-hair">
                            <div className="flex items-start gap-3.5">
                                <input
                                    type="checkbox"
                                    id="accept"
                                    name="accept"
                                    checked={form.accept}
                                    onChange={handleChange}
                                    aria-invalid={!!errors.accept}
                                    className="mt-1 w-4 h-4 accent-[var(--color-primary)] cursor-pointer shrink-0"
                                />
                                <label htmlFor="accept" className="text-[0.85rem] leading-relaxed t-2 cursor-pointer">
                                    Declaro que los datos consignados son verdaderos y acepto su tratamiento según la{" "}
                                    <Link to="/privacidad" className="link-underline t-accent">política de privacidad</Link>.
                                </label>
                            </div>
                            {errors.accept && <p className="text-[0.8rem] text-error -mt-3">{errors.accept}</p>}

                            <p className="text-[0.8rem] leading-relaxed t-3">
                                La formulación del reclamo no impide acudir a otras vías de solución de controversias
                                ni es requisito previo para interponer una denuncia ante el INDECOPI.
                            </p>

                            {status === "error" && (
                                <p role="alert" className="flex items-start gap-3 p-4 border-l-2 border-error bg-2 text-[0.88rem] t-1">
                                    <Icon icon="lucide:alert-triangle" className="w-4 h-4 mt-0.5 text-error shrink-0" aria-hidden="true" />
                                    No pudimos registrar la hoja. Inténtalo de nuevo o escríbenos a {company.contact.email}.
                                </p>
                            )}

                            <button
                                type="submit"
                                disabled={status === "submitting"}
                                className="btn btn-primary w-full sm:w-fit disabled:opacity-40 disabled:cursor-not-allowed"
                            >
                                <Icon
                                    icon={status === "submitting" ? "line-md:loading-twotone-loop" : "lucide:file-text"}
                                    className="w-4 h-4"
                                    aria-hidden="true"
                                />
                                {status === "submitting" ? "Registrando..." : `Registrar ${form.claimType.toLowerCase()}`}
                            </button>
                        </div>
                    </form>
                )}

                <section className="mt-16 flex flex-col gap-4 pt-8 border-t bd-hair">
                    <h2 className="display-sm t-1">Otros canales</h2>
                    <ContactList />
                </section>
            </Container>
        </div>
    );
}

function Block({ number, title, children }) {
    return (
        <fieldset className="flex flex-col gap-6">
            <legend className="flex items-baseline gap-4 mb-6">
                <span className="index-num micro-label t-accent">{number}</span>
                <span className="display-sm t-1">{title}</span>
            </legend>
            {children}
        </fieldset>
    );
}

function Field({ id, label, optional = false, hint, error, children }) {
    return (
        <div className="flex flex-col gap-2.5">
            <label htmlFor={id} className="field-label">
                {label} {optional ? <span className="opacity-50">(Opcional)</span> : <span className="t-accent">*</span>}
            </label>
            {children}
            {hint && !error && <p className="text-[0.78rem] t-3">{hint}</p>}
            {error && <p id={`${id}-error`} className="text-[0.8rem] text-error">{error}</p>}
        </div>
    );
}

function ClaimReceipt({ sent, onReset }) {
    return (
        <div role="status" className="mt-14 flex flex-col gap-6 p-8 border bd-accent bg-2">
            <span className="grid place-items-center w-11 h-11 border border-success text-success">
                <Icon icon="lucide:check" className="w-5 h-5" aria-hidden="true" />
            </span>
            <div className="flex flex-col gap-2">
                <p className="micro-label t-accent">{sent.type} registrado</p>
                <p className="display-sm t-1 break-all">{sent.code}</p>
                <p className="micro-label t-3">
                    {sent.date.toLocaleString("es-PE", { timeZone: "America/Lima" })}
                </p>
            </div>
            <p className="copy text-[0.95rem]">
                Guarda este código. Enviamos una copia de tu hoja a <strong className="t-1">{sent.email}</strong> y te
                responderemos en un plazo no mayor a quince (15) días hábiles.
            </p>
            <button type="button" onClick={onReset} className="arrow-link w-fit">
                <span>Registrar otra hoja</span>
                <Icon icon="lucide:arrow-right" className="w-4 h-4" aria-hidden="true" />
            </button>
        </div>
    );
}
