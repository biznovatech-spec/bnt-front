import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import Button from "../ui/button";
import Container from "../ui/container";
import { navigationData } from "../data/navigation";
import { useHeader } from "../context/HeaderContext";
import AnnouncementBar from "./announcement-bar";

export default function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();
    const dropdownRef = useRef(null);

    const { isHeroVisible, isHeaderReady } = useHeader();
    
    const [prevPath, setPrevPath] = useState(location.pathname + location.hash);
    
    if (location.pathname + location.hash !== prevPath) {
        setPrevPath(location.pathname + location.hash);
        setIsMobileMenuOpen(false);
        setOpenDropdown(null);
    }

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
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
        <div className={`sticky top-0 z-50 w-full flex flex-col ${transitionClass}`}>
            {/* Announcement bar solo en Hero */}
            <AnnouncementBar isVisible={isHeroVisible} isHeaderReady={isHeaderReady} />
            
            <header className={`w-full bg-white ${transitionClass} ${isCompact ? 'border-b border-gray-100 shadow-[0_1px_2px_rgba(0,0,0,0.02)]' : ''}`}>
                <Container size="wide" className={`flex justify-between items-center ${transitionClass} ${isCompact ? 'py-3' : 'py-5'}`}>
                    
                    <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] w-full items-center gap-4">
                        
                        {/* Logo */}
                        <div className="flex items-center">
                            <Link to="/" className="flex flex-row gap-2 items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md group">
                                <img 
                                    src="/image/logo-only.png" 
                                    alt="Biznovatech Logo" 
                                    className={`${transitionClass} ease-in-out ${isCompact ? 'w-10 md:w-14' : 'w-12 md:w-16'}`} 
                                />
                                <span className={`text-secondary font-semibold ${transitionClass} ${isCompact ? 'text-xl md:text-2xl' : 'text-2xl md:text-3xl'}`}>
                                    Biznova<strong className="text-primary font-bold">tech</strong>
                                </span>
                            </Link>
                        </div>

                        {/* Desktop Navigation */}
                        <nav className="hidden min-[1200px]:flex justify-center" ref={dropdownRef}>
                            <ul className={`flex flex-row items-center text-t-secondary ${transitionClass} ${isCompact ? 'gap-10' : 'gap-7'}`}>
                                {navigationData.map((item, index) => {
                                    const isDropdownOpen = openDropdown === index;
                                    const isActive = location.pathname.startsWith(item.href) && (item.href !== '/' || location.pathname === '/');

                                    return (
                                        <li 
                                            key={item.label} 
                                            className="relative group"
                                            onMouseEnter={() => setOpenDropdown(index)}
                                            onMouseLeave={() => setOpenDropdown(null)}
                                        >
                                            <div className="flex items-center gap-0.5 cursor-pointer py-2">
                                                <Link
                                                    to={item.href}
                                                    className={`font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm px-1 ${
                                                        isActive ? 'text-gray-900 relative after:content-[""] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[2px] after:bg-blue-600 after:rounded-t-sm' : 'hover:text-gray-900'
                                                    } ${isCompact ? 'text-sm' : 'text-base'}`}
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

                                            {/* Dropdown Menu */}
                                            {item.submenu && isDropdownOpen && (
                                                <div className="absolute top-full left-1/2 -translate-x-1/2 w-64 bg-white border border-gray-100 shadow-sm rounded-xl py-3 px-2 z-50 animate-fade-in">
                                                    <ul className="flex flex-col gap-1">
                                                        {item.submenu.map((subitem) => (
                                                            <li key={subitem.label}>
                                                                <Link
                                                                    to={subitem.href}
                                                                    onClick={(e) => handleNavigation(e, subitem)}
                                                                    className="block px-4 py-2.5 text-sm text-t-secondary hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors focus-visible:outline-none focus-visible:bg-gray-50 focus-visible:text-gray-900"
                                                                >
                                                                    {subitem.label}
                                                                </Link>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}
                                        </li>
                                    );
                                })}
                            </ul>
                        </nav>

                        {/* CTA Button (Desktop) & Mobile Toggle */}
                        <div className="flex items-center justify-end gap-4">
                            <div className="hidden min-[1200px]:block">
                                <Button 
                                    variant="secondary" 
                                    to="/contacto"
                                    className={`${transitionClass} ${isCompact ? 'px-4 py-2 text-sm' : ''}`}
                                >
                                    Agendar Reunion
                                    <Icon icon="solar:arrow-up-linear" className="w-5 h-5 rotate-45" />
                                </Button>
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
                                            {item.submenu && isDropdownOpen && (
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
        </div>
    );
}