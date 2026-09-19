// Lógica del Libro de Reclamaciones separada de la vista para poder probarla

export const DOC_TYPES = ["DNI", "Carné de extranjería", "Pasaporte", "RUC"];

export const EMPTY_CLAIM = {
    name: "",
    docType: "DNI",
    docNumber: "",
    address: "",
    phone: "",
    email: "",
    guardian: "",
    itemType: "Servicio",
    amount: "",
    itemDescription: "",
    claimType: "Reclamo",
    detail: "",
    request: "",
    accept: false,
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Esto sirve para validar el número según el tipo de documento elegido
function isValidDoc(type, number) {
    const value = number.trim();
    if (type === "DNI") return /^\d{8}$/.test(value);
    if (type === "RUC") return /^(10|15|17|20)\d{9}$/.test(value);
    return /^[A-Za-z0-9]{6,15}$/.test(value);
}

export function validateClaim(form) {
    const errors = {};
    if (form.name.trim().length < 3) errors.name = "Ingresa tu nombre completo.";
    if (!isValidDoc(form.docType, form.docNumber)) errors.docNumber = `Número de ${form.docType} no válido.`;
    if (form.address.trim().length < 5) errors.address = "Ingresa tu domicilio.";
    if (!/^[+\d\s-]{7,15}$/.test(form.phone.trim())) errors.phone = "Ingresa un teléfono válido.";
    if (!EMAIL_RE.test(form.email.trim())) errors.email = "Ingresa un correo válido.";
    if (form.amount !== "" && !(Number(form.amount) >= 0)) errors.amount = "El monto debe ser un número positivo.";
    if (form.itemDescription.trim().length < 5) errors.itemDescription = "Describe el producto o servicio.";
    if (form.detail.trim().length < 10) errors.detail = "Detalla lo ocurrido (mínimo 10 caracteres).";
    if (form.request.trim().length < 5) errors.request = "Indica qué solicitas.";
    if (!form.accept) errors.accept = "Debes aceptar para registrar la hoja.";
    return errors;
}

// Esto sirve para generar el código correlativo que se entrega al consumidor, p. ej. LR-20260919-4F7K2Q
export function createClaimCode(date = new Date(), random = Math.random) {
    const stamp = [
        date.getFullYear(),
        String(date.getMonth() + 1).padStart(2, "0"),
        String(date.getDate()).padStart(2, "0"),
    ].join("");
    const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let suffix = "";
    for (let i = 0; i < 6; i += 1) suffix += alphabet[Math.floor(random() * alphabet.length)];
    return `LR-${stamp}-${suffix}`;
}

export function buildClaimPayload(form, code, date = new Date()) {
    return {
        Código: code,
        Fecha: date.toLocaleString("es-PE", { timeZone: "America/Lima" }),
        Tipo: form.claimType,
        Consumidor: form.name.trim(),
        Documento: `${form.docType} ${form.docNumber.trim()}`,
        Domicilio: form.address.trim(),
        Teléfono: form.phone.trim(),
        Correo: form.email.trim(),
        "Padre, madre o apoderado": form.guardian.trim() || "No aplica",
        "Bien contratado": form.itemType,
        "Monto reclamado": form.amount === "" ? "No especificado" : `S/ ${Number(form.amount).toFixed(2)}`,
        Descripción: form.itemDescription.trim(),
        Detalle: form.detail.trim(),
        Pedido: form.request.trim(),
        _subject: `${form.claimType} ${code} - Libro de Reclamaciones`,
        _template: "table",
    };
}
