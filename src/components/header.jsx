import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import { navigationData } from "../data/navigation";
import { useHeader } from "../context/HeaderContext";
import { useTheme } from "../context/ThemeContext";
import AnnouncementBar from "./announcement-bar";
import GenericMegaMenu from "./mega-menu/GenericMegaMenu";
import { megaMenus } from "../data/megaMenu";

/**
 * Barra de navegación "Precision Grid".
 *
 * A sangre completa, filete inferior de 1px y fondo que gana opacidad al
 * abandonar el hero. Sin píldoras ni sombras difusas: la jerarquía la marcan
 * el filete, la monoespaciada y el acento de marca.
 */
export default function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();
    const dropdownRef = useRef(null);
    const megaMenuRef = useRef(null);

    const { isHeroVisible } = useHeader();
    const { theme, toggleTheme } = useTheme();

    const [prevPath, setPrevPath] = useState(location.pathname + location.hash);

    if (location.pathname + location.hash !== prevPath) {
        setPrevPath(location.pathname + location.hash);
        setIsMobileMenuOpen(false);
        setOpenDropdown(null);
    }

    useEffect(() => {
        function handleClickOutside(event) {
            const clickedInsideNav = dropdownRef.current && dropdownRef.current.contains(event.target);
            const clickedInsideMegaMenu = megaMenuRef.current && megaMenuRef.current.contains(event.target);

            if (!clickedInsideNav && !clickedInsideMegaMenu) {
                setOpenDropdown(null);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        function handleKeyDown(event) {
            if (event.key === "Escape") {
                setIsMobileMenuOpen(false);
                setOpenDropdown(null);
            }
        }
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, []);

    useEffect(() => {
        document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [isMobileMenuOpen]);

    const handleNavigation = (e, item) => {
        if (item.type === "hash") {
            e.preventDefault();
            if (location.pathname !== "/" && item.href.startsWith("/#")) {
                navigate(item.href);
            } else {
                const targetId = item.href.split("#")[1];
                const element = document.getElementById(targetId);
                if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                    window.history.pushState(null, "", item.href);
                } else {
                    navigate(item.href);
                }
            }
            setIsMobileMenuOpen(false);
            setOpenDropdown(null);
        }
    };

    const isSolid = !isHeroVisible || openDropdown !== null;

    return (
        <div className="fixed top-0 inset-x-0 z-50 w-full">
            <div className="relative z-50">
                <AnnouncementBar isVisible={isHeroVisible} />
            </div>

            <header
                className={`relative z-50 w-full border-b transition-[background-color,border-color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isSolid
                        ? "bg-canvas bd-hair"
                        : "bg-transparent border-transparent"
                }`}
            >
                <div className="w-full max-w-[var(--shell-max)] mx-auto px-[var(--gutter)]">
                    <div className="flex items-center justify-between gap-4 xl:gap-6 h-[var(--header-compact-height)]">
                        {/* Marca */}
                        <Link
                            to="/"
                            className="group flex items-center gap-2.5 shrink-0"
                            aria-label="Biznovatech, ir al inicio"
                        >
                            <img
                                src="/image/logo_only.webp"
                                alt=""
                                aria-hidden="true"
                                className="w-9 h-9 object-contain transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:rotate-[8deg]"
                            />
                            <span className="font-display text-[1.12rem] font-bold tracking-[-0.02em] t-1 leading-none">
                                Biznova<span className="t-accent">tech</span>
                            </span>
                        </Link>

                        {/* Navegación de escritorio */}
                        <nav className="hidden min-[1340px]:flex items-center" ref={dropdownRef}>
                            <ul className="flex items-center gap-5 xl:gap-7 2xl:gap-9">
                                {navigationData.map((item, index) => {
                                    const isDropdownOpen = openDropdown === index;
                                    const isActive =
                                        item.href === "/"
                                            ? location.pathname === "/"
                                            : location.pathname.startsWith(item.href);

                                    return (
                                        <li key={item.label} className="relative">
                                            <div className="flex items-center gap-1.5">
                                                <Link
                                                    to={item.href}
                                                    onClick={(e) => {
                                                        if (item.submenu) {
                                                            e.preventDefault();
                                                            setOpenDropdown(isDropdownOpen ? null : index);
                                                        }
                                                    }}
                                                    className={`relative flex items-baseline gap-1.5 py-2 text-[0.7rem] xl:text-[0.75rem] font-semibold uppercase tracking-[0.1em] xl:tracking-[0.14em] whitespace-nowrap transition-colors duration-300 ${
                                                        isActive || isDropdownOpen
                                                            ? "t-accent"
                                                            : "t-2 hover:t-1"
                                                    }`}
                                                >
                                                    <span
                                                        aria-hidden="true"
                                                        className={`index-num text-[0.6rem] hidden min-[1560px]:inline transition-colors duration-300 ${
                                                            isActive || isDropdownOpen ? "t-accent" : "t-3"
                                                        }`}
                                                    >
                                                        {String(index + 1).padStart(2, "0")}.
                                                    </span>
                                                    {item.label}
                                                    <span
                                                        aria-hidden="true"
                                                        className={`absolute left-0 -bottom-0.5 h-px bg-current transition-[width] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                                                            isActive || isDropdownOpen ? "w-full" : "w-0"
                                                        }`}
                                                    />
                                                </Link>
                                                {item.submenu && (
                                                    <button
                                                        type="button"
                                                        className={`transition-colors ${
                                                            isActive || isDropdownOpen
                                                                ? "t-accent"
                                                                : "t-3"
                                                        }`}
                                                        onClick={() => setOpenDropdown(isDropdownOpen ? null : index)}
                                                        aria-expanded={isDropdownOpen}
                                                        aria-label={`Desplegar ${item.label}`}
                                                    >
                                                        <Icon
                                                            icon="lucide:chevron-down"
                                                            className={`w-3.5 h-3.5 transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                                                                isDropdownOpen ? "rotate-180" : ""
                                                            }`}
                                                        />
                                                    </button>
                                                )}
                                            </div>
                                        </li>
                                    );
                                })}
                            </ul>
                        </nav>

                        {/* Acciones */}
                        <div className="flex items-center gap-3 shrink-0">
                            <button
                                type="button"
                                onClick={toggleTheme}
                                className="grid place-items-center w-10 h-10 border bd t-2 hover:t-accent hover:bd-strong transition-colors duration-300"
                                aria-label={`Cambiar a modo ${theme === "dark" ? "claro" : "oscuro"}`}
                            >
                                <Icon
                                    icon={theme === "dark" ? "lucide:sun" : "lucide:moon"}
                                    className="w-4 h-4"
                                />
                            </button>

                            <div className="hidden min-[1340px]:block">
                                <Link to="/contacto" className="btn btn-primary btn-sm group">
                                    Agendar reunión
                                    <Icon icon="lucide:arrow-up-right" className="w-4 h-4 arrow-shift" aria-hidden="true" />
                                </Link>
                            </div>

                            <button
                                type="button"
                                className="min-[1340px]:hidden relative grid place-items-center w-10 h-10 border bd t-1"
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                aria-expanded={isMobileMenuOpen}
                                aria-label="Alternar menú"
                            >
                                <span
                                    aria-hidden="true"
                                    className={`absolute h-px w-4 bg-current transition-all duration-400 ease-[cubic-bezier(0.76,0,0.24,1)] ${
                                        isMobileMenuOpen ? "rotate-45" : "-translate-y-1"
                                    }`}
                                />
                                <span
                                    aria-hidden="true"
                                    className={`absolute h-px w-4 bg-current transition-all duration-400 ease-[cubic-bezier(0.76,0,0.24,1)] ${
                                        isMobileMenuOpen ? "-rotate-45" : "translate-y-1"
                                    }`}
                                />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mega menú de escritorio */}
                <div ref={megaMenuRef}>
                    <GenericMegaMenu
                        isOpen={openDropdown !== null && !!megaMenus[navigationData[openDropdown]?.label]}
                        activeMenuId={openDropdown !== null ? navigationData[openDropdown]?.label : null}
                        onClose={() => setOpenDropdown(null)}
                    />
                </div>
            </header>

            {/* Menú móvil a pantalla completa */}
            <div
                className={`min-[1340px]:hidden fixed inset-0 top-0 z-40 transition-[visibility] duration-500 ${
                    isMobileMenuOpen ? "visible" : "invisible"
                }`}
            >
                <button
                    type="button"
                    tabIndex={isMobileMenuOpen ? 0 : -1}
                    aria-label="Cerrar menú"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`absolute inset-0 w-full bg-canvas transition-opacity duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${
                        isMobileMenuOpen ? "opacity-100" : "opacity-0"
                    }`}
                />

                <div className="relative h-full flex flex-col pt-[calc(var(--header-compact-height)+28px)] pb-10 px-[var(--gutter)] overflow-y-auto">
                    <ul className="flex flex-col">
                        {navigationData.map((item, index) => {
                            const isDropdownOpen = openDropdown === index;
                            return (
                                <li
                                    key={item.label}
                                    className="hair-t last:border-b last:bd-hair transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]"
                                    style={{
                                        opacity: isMobileMenuOpen ? 1 : 0,
                                        transform: isMobileMenuOpen ? "translateX(0)" : "translateX(-24px)",
                                        transitionDelay: isMobileMenuOpen ? `${120 + index * 60}ms` : "0ms",
                                    }}
                                >
                                    <div className="flex items-center justify-between gap-4 py-4">
                                        <Link
                                            to={item.href}
                                            className="flex items-baseline gap-4 display-xs text-[1.35rem] t-1"
                                            onClick={(e) => {
                                                if (!item.submenu) {
                                                    setIsMobileMenuOpen(false);
                                                } else {
                                                    e.preventDefault();
                                                    setOpenDropdown(isDropdownOpen ? null : index);
                                                }
                                            }}
                                        >
                                            <span className="index-num text-[0.7rem] t-accent">
                                                {String(index + 1).padStart(2, "0")}
                                            </span>
                                            {item.label}
                                        </Link>
                                        {item.submenu && (
                                            <button
                                                type="button"
                                                className="grid place-items-center w-9 h-9 border bd t-2"
                                                onClick={() => setOpenDropdown(isDropdownOpen ? null : index)}
                                                aria-expanded={isDropdownOpen}
                                                aria-label={`Desplegar ${item.label}`}
                                            >
                                                <Icon
                                                    icon="lucide:plus"
                                                    className={`w-4 h-4 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                                                        isDropdownOpen ? "rotate-45" : ""
                                                    }`}
                                                />
                                            </button>
                                        )}
                                    </div>

                                    <div
                                        className="grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                                        style={{
                                            gridTemplateRows: isDropdownOpen ? "1fr" : "0fr",
                                            opacity: isDropdownOpen ? 1 : 0,
                                        }}
                                    >
                                        <div className="overflow-hidden">
                                            {megaMenus[item.label] ? (
                                                <div className="flex flex-col gap-6 pb-6 pl-8 border-l bd-hair">
                                                    <Link
                                                        to={megaMenus[item.label].viewAllRoute}
                                                        onClick={() => setIsMobileMenuOpen(false)}
                                                        className="arrow-link"
                                                    >
                                                        {megaMenus[item.label].viewAllLabel}
                                                        <Icon icon="lucide:arrow-right" className="w-4 h-4" />
                                                    </Link>
                                                    {megaMenus[item.label].groups.map((group, gIdx) => (
                                                        <div key={gIdx} className="flex flex-col gap-2.5">
                                                            <span className="micro-label t-3">
                                                                {group.title}
                                                            </span>
                                                            <ul className="flex flex-col gap-2">
                                                                {group.items.map((subitem, sIdx) => (
                                                                    <li key={sIdx}>
                                                                        <Link
                                                                            to={subitem.route}
                                                                            onClick={(e) =>
                                                                                handleNavigation(e, {
                                                                                    href: subitem.route,
                                                                                    type: subitem.route.includes("#")
                                                                                        ? "hash"
                                                                                        : "route",
                                                                                })
                                                                            }
                                                                            className="group flex items-center gap-3 text-sm t-2 hover:t-accent transition-colors"
                                                                        >
                                                                            <Icon
                                                                                icon={subitem.icon}
                                                                                className="w-4 h-4 shrink-0 opacity-60"
                                                                            />
                                                                            {subitem.label}
                                                                        </Link>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : (
                                                item.submenu && (
                                                    <ul className="flex flex-col gap-2 pb-6 pl-8 border-l bd-hair">
                                                        {item.submenu.map((subitem) => (
                                                            <li key={subitem.label}>
                                                                <Link
                                                                    to={subitem.href}
                                                                    onClick={(e) => handleNavigation(e, subitem)}
                                                                    className="text-sm t-2 hover:t-accent transition-colors"
                                                                >
                                                                    {subitem.label}
                                                                </Link>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                )
                                            )}
                                        </div>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>

                    <div
                        className="mt-auto pt-10 transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]"
                        style={{
                            opacity: isMobileMenuOpen ? 1 : 0,
                            transform: isMobileMenuOpen ? "translateY(0)" : "translateY(16px)",
                            transitionDelay: isMobileMenuOpen ? "420ms" : "0ms",
                        }}
                    >
                        <Link
                            to="/contacto"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="btn btn-primary btn-block group"
                        >
                            Agendar reunión
                            <Icon icon="lucide:arrow-up-right" className="w-4 h-4 arrow-shift" aria-hidden="true" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
