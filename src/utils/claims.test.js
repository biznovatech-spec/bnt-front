import { describe, expect, it } from "vitest";
import { EMPTY_CLAIM, buildClaimPayload, createClaimCode, validateClaim } from "./claims";

const valid = {
    ...EMPTY_CLAIM,
    name: "Ana Torres",
    docNumber: "12345678",
    address: "Av. Principal 123, Lima",
    phone: "+51 999 888 777",
    email: "ana@correo.com",
    itemDescription: "Desarrollo web",
    detail: "El entregable llegó incompleto.",
    request: "Completar el entregable",
    accept: true,
};

describe("validateClaim", () => {
    it("acepta una hoja completa", () => {
        expect(validateClaim(valid)).toEqual({});
    });

    it("marca todos los campos obligatorios vacíos", () => {
        const errors = validateClaim(EMPTY_CLAIM);
        expect(Object.keys(errors).sort()).toEqual(
            ["accept", "address", "detail", "docNumber", "email", "itemDescription", "name", "phone", "request"].sort()
        );
    });

    it("valida el número según el tipo de documento", () => {
        expect(validateClaim({ ...valid, docNumber: "1234567" }).docNumber).toBeDefined();
        expect(validateClaim({ ...valid, docType: "RUC", docNumber: "20123456789" }).docNumber).toBeUndefined();
        expect(validateClaim({ ...valid, docType: "RUC", docNumber: "12345678901" }).docNumber).toBeDefined();
        expect(validateClaim({ ...valid, docType: "Pasaporte", docNumber: "AB12345" }).docNumber).toBeUndefined();
    });

    it("rechaza correo y monto inválidos", () => {
        expect(validateClaim({ ...valid, email: "ana@" }).email).toBeDefined();
        expect(validateClaim({ ...valid, amount: "-5" }).amount).toBeDefined();
        expect(validateClaim({ ...valid, amount: "150.50" }).amount).toBeUndefined();
    });
});

describe("createClaimCode", () => {
    it("incluye la fecha y un sufijo de 6 caracteres sin ambiguos", () => {
        const code = createClaimCode(new Date(2026, 8, 19), () => 0);
        expect(code).toBe("LR-20260919-AAAAAA");
        expect(createClaimCode(new Date(2026, 0, 5))).toMatch(/^LR-20260105-[A-HJ-NP-Z2-9]{6}$/);
    });
});

describe("buildClaimPayload", () => {
    it("arma el correo con los datos normalizados", () => {
        const payload = buildClaimPayload({ ...valid, name: "  Ana Torres ", amount: "80" }, "LR-X", new Date());
        expect(payload.Consumidor).toBe("Ana Torres");
        expect(payload.Documento).toBe("DNI 12345678");
        expect(payload["Monto reclamado"]).toBe("S/ 80.00");
        expect(payload["Padre, madre o apoderado"]).toBe("No aplica");
        expect(payload._subject).toBe("Reclamo LR-X - Libro de Reclamaciones");
    });
});
