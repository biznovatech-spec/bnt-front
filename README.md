# Biznovatech

Sitio web corporativo multipágina para presentar los servicios, soluciones, proyectos y capacidades tecnológicas de Biznovatech.

> Donde tus ideas empiezan a funcionar.

![React](https://img.shields.io/badge/React-19.2.7-blue?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8.1.1-646CFF?logo=vite&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?logo=javascript&logoColor=black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.3.2-38B2AC?logo=tailwind-css&logoColor=white)
![PNPM](https://img.shields.io/badge/pnpm-Enabled-F69220?logo=pnpm&logoColor=white)

## Vista General

Biznovatech es una empresa de tecnología que acompaña a personas, emprendedores y organizaciones a convertir ideas, desafíos y procesos en soluciones digitales funcionales, seguras y diseñadas a la medida de sus objetivos. 

Este proyecto contiene el frontend completo del sitio web corporativo, desarrollado para presentar servicios, soluciones, casos de éxito, tecnologías, recursos y canales de contacto mediante una experiencia moderna, responsive y accesible.

## Características Principales

- **Navegación corporativa multipágina**: Múltiples secciones conectadas mediante un enrutador del lado del cliente.
- **Servicios y soluciones organizados por necesidades**: Catálogos detallados de servicios y soluciones.
- **Casos de éxito con narrativa editorial**: Proyectos reales con contexto y resultados.
- **Atlas de tecnologías con filtros y búsqueda**: Directorio tecnológico con navegación por orden alfabético.
- **Diseño responsive**: Adaptabilidad comprobada desde dispositivos móviles (360px) hasta pantallas ultrawide.
- **Navegación accesible mediante teclado**: Soporte para foco visible y atajos semánticos (Escape).
- **SEO básico por ruta**: Gestión de `<title>` y `<meta name="description">` dinámica, junto a `robots.txt` y `sitemap.xml`.
- **Contacto integral**: Accesos a comunicación directa mediante correo y WhatsApp.
- **Componentes y contenido reutilizables**: Separación estricta de la UI y los datos (`src/data/`).

## Stack Tecnológico

- **React (19.2.x)**: Biblioteca principal de interfaces.
- **Vite (8.1.x)**: Entorno de desarrollo y empaquetador ultrarrápido con React Compiler integrado.
- **JavaScript (JSX)**: Lenguaje principal del proyecto.
- **Tailwind CSS (v4)**: Framework de utilidades CSS para diseño ágil.
- **React Router (7.18.x)**: Gestión de enrutamiento multipágina (SPA).
- **Iconify (@iconify/react)**: Sistema unificado de iconos corporativos.
- **PNPM**: Gestor de paquetes eficiente y determinista.
- **ESLint**: Herramienta de linting para la calidad de código.

*Nota: No se utiliza un framework meta como Next.js, ni TypeScript, en la arquitectura de este repositorio.*

## Arquitectura del Proyecto

El proyecto está diseñado como una Single Page Application (SPA) estática. La arquitectura implementa:
- Un **MainLayout** global (con un Header dinámico "sticky" y Footer persistentes).
- **Componentes de UI agnósticos** (contenedores con tamaños unificados `wide`, `standard` y `reading`).
- **Datos centralizados** en archivos estáticos (`src/data/`), lo cual facilita la edición editorial sin backend (CMS).
- Una **Barra de anuncios** gestionada mediante un contexto ligero (`HeaderContext`) e `IntersectionObserver`.

**Este proyecto es exclusivamente frontend.** No cuenta con backend propio, bases de datos, autenticación o procesado de formularios en servidor activo dentro de este repositorio.

## Estructura de Carpetas

```text
src/
├── assets/         # Recursos estáticos locales
├── components/     # Componentes compuestos y de secciones (Header, Hero, etc.)
├── context/        # Contextos globales de React (ej. HeaderContext)
├── data/           # Contenido estructurado en archivos estáticos (simulación CMS)
├── hooks/          # Hooks personalizados (ej. useSeo, hooks de scroll)
├── layouts/        # Layouts principales de las vistas
├── pages/          # Componentes raíz para cada ruta del sitio
├── router/         # Configuración y definición de React Router
├── ui/             # Componentes base y de bajo nivel (Botones, Contenedores, Badges)
├── utils/          # Utilidades globales y lógicas (ej. ScrollToTop)
├── App.css         # Estilos globales complementarios
├── App.jsx         # Componente raíz proveedor
├── index.css       # Configuración global de Tailwind y directivas CSS custom
└── main.jsx        # Punto de entrada de Vite y ReactDOM

public/
├── image/          # Imágenes rasterizadas y placeholders editoriales
├── images/         # Elementos gráficos complementarios
├── favicon.svg     # Favicon del sitio
├── robots.txt      # Instrucciones para crawlers
└── sitemap.xml     # Mapa del sitio base
```

## Rutas Principales

| Ruta | Descripción |
|---|---|
| `/` | Página principal de Biznovatech |
| `/servicios` | Catálogo de servicios tecnológicos |
| `/soluciones` | Soluciones organizadas por necesidad del usuario |
| `/casos-de-exito` | Proyectos y colaboraciones desarrolladas |
| `/nosotros` | Identidad, valores e información de la compañía |
| `/recursos` | Centro de recursos de información y herramientas |
| `/recursos/tecnologias` | Atlas tecnológico navegable y filtrable |
| `/contacto` | Accesos a canales de comunicación y WhatsApp |

*(El sitio cuenta con hasta 33 sub-rutas dinámicas que corresponden a detalles individuales de servicios, soluciones y casos de éxito).*

## Requisitos Previos

- **Node.js**: Se recomienda utilizar una versión LTS reciente (Node.js 18 o superior).
- **PNPM**: Gestor de paquetes principal (`npm install -g pnpm`).

## Instalación

1. Clona el repositorio:
```bash
git clone URL_DEL_REPOSITORIO
cd NOMBRE_DEL_REPOSITORIO
```

2. Instala las dependencias:
```bash
pnpm install
```

## Ejecución en Desarrollo

Para levantar el servidor local con Hot Module Replacement (HMR):

```bash
pnpm run dev
```

El servidor estará disponible en la URL indicada por la terminal (generalmente `http://localhost:5173`).

## Scripts Disponibles

En el directorio del proyecto, puedes ejecutar:

- `pnpm run dev`: Inicia el servidor de desarrollo local.
- `pnpm run build`: Compila la aplicación para producción en la carpeta `dist`.
- `pnpm run lint`: Ejecuta ESLint sobre todo el código fuente.
- `pnpm run preview`: Sirve localmente la carpeta `dist` compilada para pruebas finales previas a despliegue.

## Compilación para Producción

Generar los archivos estáticos listos para desplegar:

```bash
pnpm run build
```
Vite empaquetará los archivos optimizados dentro del directorio `/dist`.

## Variables de Entorno

Actualmente el repositorio no depende estrictamente de variables secretas de entorno para levantar la aplicación, ya que todo el flujo de contactos es mediante `mailto` y enlaces de `WhatsApp API`.

## Sistema de Diseño

- El proyecto usa las paletas y utilidades provistas por **Tailwind CSS**.
- Existen tokens propios para variables cromáticas (como `primary`, `secondary`, `surface`, `accent`, etc.) definidos en `src/index.css`.
- Para mantener la integridad visual del layout, todas las secciones deben ser envueltas en el componente `<Container size="wide | standard | reading">`.

## Responsive y Accesibilidad

- Se ha verificado la visibilidad y uso en resoluciones de **360px** hasta **1920px**.
- El `Header` cuenta con un comportamiento de colapso a "estado compacto" para preservar espacio visual al descender por la página (IntersectionObserver).
- Soporte para `@media (prefers-reduced-motion: reduce)` integrado en los elementos y transiciones core.
- Control de foco visible `focus-visible` implementado transversalmente.

## Gestión del Contenido y Editoriales Pendientes

Todo el contenido literario reside localmente en Javascript plano dentro del directorio `src/data/`. Cualquier modificación de textos y variables públicas debe hacerse en esos archivos.

Para imágenes que aún no han pasado por el área creativa, se mantienen placeholders visuales grises con etiquetado explícito en `src/ui/placeholder.jsx`, esperando ser sustituidas posteriormente con los recursos fotográficos o 3D definitivos.

## Flujo de Trabajo Recomendado

1. Asegúrate de ejecutar `pnpm run lint` y arreglar los errores antes de hacer un commit.
2. Si introduces nuevas secciones o enlaces con *hash*, prueba las anclas asegurándote de que no queden superpuestas bajo el menú adhesivo (`scroll-margin-top`).

## Validación de Calidad

- Ejecutar asiduamente `pnpm run lint` (ESLint) y confirmar 0 errores para conservar consistencia.
- Antes de publicar, un `pnpm run build` confirmará que el *React Compiler* ha superado satisfactoriamente los nodos.

## Despliegue

La carpeta `dist` es un paquete estático clásico. Puede ser montada de forma directa y sencilla en proveedores de web estática y CDNs como **Vercel**, **Netlify**, **Cloudflare Pages** o un **Nginx** básico. No se requieren runtimes en servidor (`Node`/`PM2`).

---
*(La administración final y licencia de uso depende exclusivamente de los dueños del repositorio en Biznovatech).*
