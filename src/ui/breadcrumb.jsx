import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";

export default function Breadcrumb({ items }) {

    return (
        <nav aria-label="Navegación de migas de pan" className="mb-8 mt-6 lg:mt-8">
            <ol className="flex flex-wrap items-center gap-2 text-sm text-t-secondary">
                <li className="flex items-center gap-2">
                    <Link to="/" className="hover:text-gray-900 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm">
                        Inicio
                    </Link>
                </li>
                {items.map((item, index) => {
                    const isLast = index === items.length - 1;
                    return (
                        <li key={item.label} className="flex items-center gap-2">
                            <Icon icon="solar:alt-arrow-right-linear" className="w-3.5 h-3.5 text-gray-400" />
                            {isLast || !item.to ? (
                                <span className="text-gray-900 font-medium" aria-current="page">{item.label}</span>
                            ) : (
                                <Link to={item.to} className="hover:text-gray-900 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm">
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
