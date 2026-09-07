import { Link } from "react-router-dom";

/**
 * Migas de pan en monoespaciada: se lee como la ruta de un sistema de
 * archivos, no como una lista de enlaces sueltos.
 */
export default function Breadcrumb({ items }) {
    return (
        <nav aria-label="Navegación de migas de pan" className="pt-8 lg:pt-10">
            <ol className="flex flex-wrap items-center gap-x-3 gap-y-1 micro-label t-2">
                <li>
                    <Link
                        to="/"
                        className="link-underline hover:t-accent transition-colors"
                    >
                        Inicio
                    </Link>
                </li>
                {items.map((item, index) => {
                    const isLast = index === items.length - 1;
                    return (
                        <li key={item.label} className="flex items-center gap-x-3">
                            <span aria-hidden="true" className="opacity-40">
                                /
                            </span>
                            {isLast || !item.to ? (
                                <span className="t-accent" aria-current="page">
                                    {item.label}
                                </span>
                            ) : (
                                <Link
                                    to={item.to}
                                    className="link-underline hover:t-accent transition-colors"
                                >
                                    {item.label}
                                </Link>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
}
