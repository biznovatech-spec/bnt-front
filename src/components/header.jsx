import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import Button from "../ui/button";
import Container from "../ui/container";
import { navigationData } from "../data/navigation";
import { useHeader } from "../context/HeaderContext";
import AnnouncementBar from "./announcement-bar";
import GenericMegaMenu from "./mega-menu/GenericMegaMenu";
import { megaMenus } from "../data/megaMenu";

export default function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();
    const dropdownRef = useRef(null);
    const megaMenuRef = useRef(null);

    const { isHeroVisible, isHeaderReady } = useHeader();
    
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
            if (event.key === 'Escape') {
                setIsMobileMenuOpen(false);
                setOpenDropdown(null);
            }
        }
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, []);

    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isMobileMenuOpen]);

    const handleNavigation = (e, item) => {
        if (item.type === 'hash') {
            e.preventDefault();
            if (location.pathname !== '/' && item.href.startsWith('/#')) {
                navigate(item.href);
            } else {
                const targetId = item.href.split('#')[1];
                const element = document.getElementById(targetId);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                    window.history.pushState(null, '', item.href);
                } else {
                    navigate(item.href);
                }
            }
            setIsMobileMenuOpen(false);
            setOpenDropdown(null);
        }
    };

    const isCompact = !isHeroVisible;

    const transitionClass = isHeaderReady ? 'transition-all duration-300' : 'transition-none';

    return (
        <div className="sticky top-0 z-50 w-full flex flex-col">
            {/* Announcement bar solo en Hero */}
            <AnnouncementBar isVisible={isHeroVisible} isHeaderReady={isHeaderReady} />
            
            <header className={`w-full backdrop-blur-md border-b border-gray-200 ${transitionClass} ${isCompact ? 'bg-white/85 shadow-[0_1px_2px_rgba(0,0,0,0.02)]' : 'bg-white'}`}>
                <Container size="wide" className={`flex flex-col justify-center transition-all duration-300 ${isCompact ? 'pt-2 pb-1.5 2xl:py-0 2xl:h-[80px]' : 'pt-4 pb-2 2xl:py-0 2xl:h-[100px]'}`}>
                    
                    <div className="grid w-full items-center gap-x-4 grid-cols-2 2xl:grid-cols-[auto_minmax(0,1fr)_auto] gap-y-2 2xl:gap-y-0">
                        
                        {/* Logo */}
                        <div className="flex items-center justify-start 2xl:col-auto">
                            <Link to="/" className="flex flex-row gap-0 items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md group">
                                <img 
                                    src="/image/logo_only.webp" 
                                    alt="Biznovatech Logo" 
                                    className={`transition-all duration-300 ${isCompact ? 'w-16 md:w-20' : 'w-20 md:w-24'}`} 
                                />
                                <span className={`text-secondary font-semibold transition-all duration-300 ${isCompact ? 'text-xl md:text-2xl' : 'text-2xl md:text-3xl'}`}>
                                    Biznova<strong className="text-tertiary font-bold">tech</strong>
                                </span>
                            </Link>
                        </div>

                        {/* Desktop Navigation */}
                        <nav className="hidden min-[1200px]:flex col-span-2 2xl:col-span-1 2xl:col-start-2 row-start-2 2xl:row-start-1 justify-center w-full border-t border-gray-200 2xl:border-t-0 pt-1.5 2xl:pt-0 mt-1 2xl:mt-0" ref={dropdownRef}>
                            <ul className={`flex flex-row items-center justify-center text-t-secondary gap-8 2xl:gap-10 transition-all duration-300 w-full`}>
                                {navigationData.map((item, index) => {
                                    const isDropdownOpen = openDropdown === index;
                                    const isActive = location.pathname.startsWith(item.href) && (item.href !== '/' || location.pathname === '/');

                                    return (
                                        <li 
                                            key={item.label} 
                                            className="relative group"
                                        >
                                            <div 
                                                className="flex items-center gap-0.5 cursor-pointer py-2"
                                                onClick={(e) => {
                                                    if (item.submenu) {
                                                        e.preventDefault();
                                                        setOpenDropdown(isDropdownOpen ? null : index);
                                                    }
                                                }}
                                            >
                                                <Link
                                                    to={item.href}
                                                    onClick={(e) => {
                                                        if (item.submenu) {
                                                            e.preventDefault();
                                                            setOpenDropdown(isDropdownOpen ? null : index);
                                                        }
                                                    }}
                                                    className={`font-medium whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm px-1 ${
                                                        isActive ? 'text-gray-900 relative after:content-[""] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[2px] after:bg-blue-600 after:rounded-t-sm' : 'hover:text-gray-900'
                                                    } text-lg`}
                                                >
                                                    {item.label}
                                                </Link>
                                                {item.submenu && (
                                                    <button 
                                                        className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm"
                                                        onClick={() => setOpenDropdown(isDropdownOpen ? null : index)}
                                                        aria-expanded={isDropdownOpen}
                                                    >
                                                        <Icon icon="solar:alt-arrow-down-linear" className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                                                    </button>
                                                )}
                                            </div>
                                        </li>
                                    );
                                })}
                            </ul>
                        </nav>

                        {/* CTA Button (Desktop) & Mobile Toggle */}
                        <div className="flex items-center justify-end gap-4 col-start-2 2xl:col-start-3 row-start-1">
                            <div className="hidden min-[1200px]:block">
                                <div className={`transition-transform duration-300 origin-right ${isCompact ? 'scale-90' : 'scale-100'}`}>
                                    <Button 
                                        variant="secondary" 
                                        to="/contacto"
                                    >
                                        Agendar Reunion
                                        <Icon icon="solar:arrow-up-linear" className="w-5 h-5 rotate-45" />
                                    </Button>
                                </div>
                            </div>

                            {/* Mobile Menu Button */}
                            <button 
                                className="min-[1200px]:hidden p-2 text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md"
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                aria-expanded={isMobileMenuOpen}
                                aria-label="Alternar menú móvil"
                            >
                                <Icon icon={isMobileMenuOpen ? "solar:close-circle-linear" : "solar:hamburger-menu-linear"} className="w-8 h-8" />
                            </button>
                        </div>

                    </div>
                </Container>

                {/* Mobile Navigation Drawer */}
                {isMobileMenuOpen && (
                    <div className="min-[1200px]:hidden fixed inset-0 top-[65px] bg-white z-40 overflow-y-auto pb-24">
                        <div className="px-6 py-6 flex flex-col gap-6">
                            <ul className="flex flex-col gap-4">
                                {navigationData.map((item, index) => {
                                    const isDropdownOpen = openDropdown === index;
                                    return (
                                        <li key={item.label} className="border-b border-gray-100 pb-4">
                                            <div className="flex justify-between items-center">
                                                <Link
                                                    to={item.href}
                                                    className="text-lg font-semibold text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm"
                                                >
                                                    {item.label}
                                                </Link>
                                                {item.submenu && (
                                                    <button 
                                                        className="p-2 text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md"
                                                        onClick={() => setOpenDropdown(isDropdownOpen ? null : index)}
                                                    >
                                                        <Icon icon="solar:alt-arrow-down-linear" className={`w-5 h-5 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                                                    </button>
                                                )}
                                            </div>
                                            
                                            {/* Mobile Submenu Accordion */}
                                            {isDropdownOpen && megaMenus[item.label] ? (
                                                <div className="mt-4 flex flex-col gap-5 pl-4 border-l-2 border-gray-100">
                                                    <Link
                                                        to={megaMenus[item.label].viewAllRoute}
                                                        onClick={(e) => handleNavigation(e, { href: megaMenus[item.label].viewAllRoute, type: 'route' })}
                                                        className="font-semibold text-primary text-[15px] hover:text-primary-hover transition-colors"
                                                    >
                                                        {megaMenus[item.label].viewAllLabel}
                                                    </Link>
                                                    {megaMenus[item.label].groups.map((group, gIdx) => (
                                                        <div key={gIdx} className="flex flex-col gap-3">
                                                            <span className="text-[11px] font-bold text-t-secondary uppercase tracking-wider">{group.title}</span>
                                                            <ul className="flex flex-col gap-2">
                                                                {group.items.map((subitem, sIdx) => (
                                                                    <li key={sIdx}>
                                                                        <Link
                                                                            to={subitem.route}
                                                                            onClick={(e) => handleNavigation(e, { href: subitem.route, type: subitem.route.includes('#') ? 'hash' : 'route' })}
                                                                            className="flex items-center gap-2.5 text-[14px] font-medium text-surface-dark hover:text-tertiary transition-colors py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm"
                                                                        >
                                                                            <Icon icon={subitem.icon} className="w-[18px] h-[18px] text-t-secondary shrink-0" />
                                                                            {subitem.label}
                                                                        </Link>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : isDropdownOpen && item.submenu && (
                                                <ul className="mt-4 flex flex-col gap-3 pl-4 border-l-2 border-gray-100">
                                                    {item.submenu.map((subitem) => (
                                                        <li key={subitem.label}>
                                                            <Link
                                                                to={subitem.href}
                                                                onClick={(e) => handleNavigation(e, subitem)}
                                                                className="block text-base text-t-secondary hover:text-primary transition-colors py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm"
                                                            >
                                                                {subitem.label}
                                                            </Link>
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </li>
                                    );
                                })}
                            </ul>
                            <div className="mt-4">
                                <Button variant="primary" to="/contacto" className="w-full justify-center">
                                    Agendar Reunion
                                    <Icon icon="solar:arrow-up-linear" className="w-5 h-5 rotate-45" />
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
            </header>

            {/* Mega Menu Portals */}
            <div ref={megaMenuRef}>
                <GenericMegaMenu 
                    isOpen={openDropdown !== null && !!megaMenus[navigationData[openDropdown]?.label]} 
                    activeMenuId={openDropdown !== null ? navigationData[openDropdown]?.label : null}
                    onClose={() => setOpenDropdown(null)} 
                />
            </div>
        </div>
    );
}