/* eslint-disable react-refresh/only-export-components -- Archivo de configuración de rutas que exporta la instancia del router y define componentes lazy */
import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import MainLayout from "../layouts/MainLayout";
import PageLoader from "../components/page-loader";

// Componentes críticos que cargan inmediato
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";

// Lazy Loaded Pages
const ServiciosPage = lazy(() => import("../pages/ServiciosPage"));
const ServiceDetailPage = lazy(() => import("../pages/ServiceDetailPage"));
const SolucionesPage = lazy(() => import("../pages/SolucionesPage"));
const SolutionDetailPage = lazy(() => import("../pages/SolutionDetailPage"));
const CasosPage = lazy(() => import("../pages/CasosPage"));
const CaseDetailPage = lazy(() => import("../pages/CaseDetailPage"));
const NosotrosPage = lazy(() => import("../pages/NosotrosPage"));
const RecursosPage = lazy(() => import("../pages/RecursosPage"));
const TecnologiasPage = lazy(() => import("../pages/TecnologiasPage"));
const ArticlePage = lazy(() => import("../pages/ArticlePage"));
const ContactoPage = lazy(() => import("../pages/ContactoPage"));
const LegalPage = lazy(() => import("../pages/LegalPage"));

const withSuspense = (Component, props = {}) => (
    <Suspense fallback={<PageLoader />}>
        <Component {...props} />
    </Suspense>
);

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
                element: withSuspense(ServiciosPage),
            },
            {
                path: "servicios/:slug",
                element: withSuspense(ServiceDetailPage),
            },
            // SOLUCIONES
            {
                path: "soluciones",
                element: withSuspense(SolucionesPage),
            },
            {
                path: "soluciones/:slug",
                element: withSuspense(SolutionDetailPage),
            },
            // CASOS DE EXITO
            {
                path: "casos-de-exito",
                element: withSuspense(CasosPage),
            },
            {
                path: "casos-de-exito/:slug",
                element: withSuspense(CaseDetailPage),
            },
            // NOSOTROS
            {
                path: "nosotros",
                element: withSuspense(NosotrosPage),
            },
            // RECURSOS
            {
                path: "recursos",
                element: withSuspense(RecursosPage),
            },
            {
                path: "recursos/tecnologias",
                element: withSuspense(TecnologiasPage),
            },
            {
                path: "recursos/:slug",
                element: withSuspense(ArticlePage),
            },
            // CONTACTO
            {
                path: "contacto",
                element: withSuspense(ContactoPage),
            },
            // LEGALES
            {
                path: "privacidad",
                element: withSuspense(LegalPage, { title: "Política de Privacidad" }),
            },
            {
                path: "terminos-y-condiciones",
                element: withSuspense(LegalPage, { title: "Términos y Condiciones" }),
            },
            {
                path: "libro-de-reclamaciones",
                element: withSuspense(LegalPage, { title: "Libro de Reclamaciones" }),
            },
            // 404 CATCH ALL FOR INTERNAL ROUTES
            {
                path: "*",
                element: <NotFound />
            }
        ],
    },
]);
