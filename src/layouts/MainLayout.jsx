import { Outlet } from "react-router-dom";
import Header from "../components/header";
import Footer from "../components/footer";
import ScrollToTop from "../utils/ScrollToTop";
import { HeaderProvider } from "../context/HeaderContext";

export default function MainLayout() {
    return (
        <HeaderProvider>
            <div className="min-h-screen w-full flex flex-col bg-background font-sans">
                <ScrollToTop />
                <Header />
                <main className="flex-1 w-full overflow-x-clip">
                    <Outlet />
                </main>
                <div className="w-full mt-auto">
                    <Footer />
                </div>
            </div>
        </HeaderProvider>
    );
}
