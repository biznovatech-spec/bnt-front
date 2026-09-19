import { company } from "../data/company";

// Esto sirve para mostrar los canales de contacto como enlaces que abren correo o teléfono
export default function ContactList() {
    const rows = [
        { label: "Correo", value: company.contact.email, href: `mailto:${company.contact.email}` },
        { label: "Teléfono", value: company.contact.phone, href: `tel:${company.contact.phone.replace(/\s/g, "")}` },
        { label: "Dirección", value: company.location.full },
    ];

    return (
        <ul className="flex flex-col mt-1">
            {rows.map((row, index) => (
                <li
                    key={row.label}
                    className={`flex items-center gap-4 py-3.5 bd-hair ${index === rows.length - 1 ? "border-y" : "border-t"}`}
                >
                    <span className="micro-label t-3 w-28 shrink-0">{row.label}</span>
                    {row.href ? (
                        <a href={row.href} className="link-underline t-accent break-all">
                            {row.value}
                        </a>
                    ) : (
                        <span className="t-1">{row.value}</span>
                    )}
                </li>
            ))}
        </ul>
    );
}
