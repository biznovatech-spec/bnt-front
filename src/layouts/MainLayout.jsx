import { Outlet, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
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
                    <motion.div
                        key={location.pathname}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <Outlet />
                    </motion.div>
                </main>
                <div className="w-full mt-auto">
                    <Footer />
                </div>
            </div>
        </HeaderProvider>
    );
}
