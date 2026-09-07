/**
 * BARRIL DEL SISTEMA DE DISEÑO
 *
 * La interfaz está organizada por niveles (diseño atómico):
 *
 *   atoms/      piezas indivisibles — botón, micro-etiqueta, enlace de flecha,
 *               contenedor, revelado, marco de imagen pendiente.
 *   molecules/  combinaciones con una función concreta — panel, cabecera de
 *               sección, migas, acordeón, retícula de fondo, puntería.
 *   organisms/  bloques completos de página — cierre con llamada a la acción.
 *
 * Los colores NO viven aquí: los ponen los tokens de `index.css` (`--text-1`,
 * `--panel-bg`, `--accent-ink`…), que cada superficie redefine. Por eso el
 * mismo componente funciona en claro, en oscuro y sobre un bloque de tinta.
 *
 * Uso: import { Panel, Reveal, SectionHeader } from "../ui";
 */

/* ---------- Átomos ---------- */
export { default as Button } from "./atoms/button";
export { default as Eyebrow } from "./atoms/eyebrow";
export { default as ArrowLink } from "./atoms/arrow-link";
export { default as Reveal } from "./atoms/reveal";
export { default as CutFrame } from "./atoms/cut-frame";
export { CornerBrackets, WireGlobe, Checker } from "./atoms/marks";
export { default as Container } from "./atoms/container";
export { default as Title } from "./atoms/title";
export { default as Logo } from "./atoms/logo";
export { default as PendingImagePlaceholder } from "./atoms/pending-image-placeholder";

/* ---------- Moléculas ---------- */
export { default as Panel } from "./molecules/panel";
export { default as CutPanel } from "./molecules/cut-panel";
export { default as SectionHeader } from "./molecules/section-header";
export { default as Breadcrumb } from "./molecules/breadcrumb";
export { default as FAQ } from "./molecules/faq";
export { default as GridBackdrop } from "./molecules/grid-backdrop";
export { default as Crosshair } from "./molecules/crosshair";

/* ---------- Organismos ---------- */
export { default as CTASection } from "./organisms/cta-section";
