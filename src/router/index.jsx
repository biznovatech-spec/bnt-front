import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";

import ServiciosPage from "../pages/ServiciosPage";
import ServiceDetailPage from "../pages/ServiceDetailPage";
import SolucionesPage from "../pages/SolucionesPage";
import SolutionDetailPage from "../pages/SolutionDetailPage";
import CasosPage from "../pages/CasosPage";
import CaseDetailPage from "../pages/CaseDetailPage";
import NosotrosPage from "../pages/NosotrosPage";
import RecursosPage from "../pages/RecursosPage";
import TecnologiasPage from "../pages/TecnologiasPage";
import ArticlePage from "../pages/ArticlePage";
import ContactoPage from "../pages/ContactoPage";
import LegalPage from "../pages/LegalPage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        errorElement: (
            <MainLayout>
                <NotFound />
            </MainLayout>
        ),
        children: [
            {
                index: true,
                element: <Home />,
            },
            // SERVICIOS
            {
                path: "servicios",
                element: <ServiciosPage />,
            },
            {
                path: "servicios/:slug",
                element: <ServiceDetailPage />,
            },
            // SOLUCIONES
            {
                path: "soluciones",
                element: <SolucionesPage />,
            },
            {
                path: "soluciones/:slug",
                element: <SolutionDetailPage />,
            },
            // CASOS DE EXITO
            {
                path: "casos-de-exito",
                element: <CasosPage />,
            },
            {
                path: "casos-de-exito/:slug",
                element: <CaseDetailPage />,
            },
            // NOSOTROS
            {
                path: "nosotros",
                element: <NosotrosPage />,
            },
            // RECURSOS
            {
                path: "recursos",
                element: <RecursosPage />,
            },
            {
                path: "recursos/tecnologias",
                element: <TecnologiasPage />,
            },
            {
                path: "recursos/:slug",
                element: <ArticlePage />,
            },
            // CONTACTO
            {
                path: "contacto",
                element: <ContactoPage />,
            },
            // LEGALES
            {
                path: "privacidad",
                element: <LegalPage title="Política de Privacidad" />,
            },
            {
                path: "terminos-y-condiciones",
                element: <LegalPage title="Términos y Condiciones" />,
            },
            {
                path: "libro-de-reclamaciones",
                element: <LegalPage title="Libro de Reclamaciones" />,
            },
            // 404 CATCH ALL FOR INTERNAL ROUTES IF NEEDED, handled by errorElement
            {
                path: "*",
                element: <NotFound />
            }
        ],
    },
]);
