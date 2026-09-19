import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/header";
import Footer from "../components/footer";
import ScrollToTop from "../utils/ScrollToTop";
import { HeaderProvider } from "../context/HeaderContext";

/**
 * Estructura común del sitio. La transición entre rutas es un desvanecido con
 * un desplazamiento mínimo (solo opacity/transform) para que el cambio de
 * página se sienta continuo sin coste de repintado.
 */
export default function MainLayout() {
    const location = useLocation();

    return (
        <HeaderProvider>
            <div className="min-h-screen w-full flex flex-col bg-canvas font-sans">
                <ScrollToTop />
                <Header />
                <main className="flex-1 w-full overflow-x-clip pt-[var(--header-compact-height)]">
                    {/* En la carga inicial no se anima: el contenido pinta de inmediato (mejor LCP) */}
                    <div
                        key={location.pathname}
                        className={location.key === "default" ? undefined : "animate-page-in"}
                    >
                        <Outlet />
                    </div>
                </main>
                <div className="w-full mt-auto">
                    <Footer />
                </div>
            </div>
        </HeaderProvider>
    );
}
