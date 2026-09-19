// Genera public/sitemap.xml y public/robots.txt a partir de los datos del sitio
import { writeFileSync } from "node:fs";
import { services } from "../src/data/services.js";
import { solutions } from "../src/data/solutions.js";
import { projects } from "../src/data/projects.js";
import { articles } from "../src/data/resources.js";
import { SITE_URL } from "../src/data/site.js";

const pages = [
    { path: "/", changefreq: "weekly", priority: "1.0" },
    ...["/servicios", "/soluciones", "/casos-de-exito", "/nosotros", "/recursos", "/contacto"].map((path) => ({ path, changefreq: "monthly", priority: "0.8" })),
    ...services.map((s) => ({ path: `/servicios/${s.slug}`, changefreq: "monthly", priority: "0.7" })),
    ...solutions.map((s) => ({ path: `/soluciones/${s.slug}`, changefreq: "monthly", priority: "0.7" })),
    ...projects.map((p) => ({ path: `/casos-de-exito/${p.slug}`, changefreq: "monthly", priority: "0.6" })),
    { path: "/recursos/tecnologias", changefreq: "monthly", priority: "0.6" },
    ...articles.map((a) => ({ path: `/recursos/${a.slug}`, changefreq: "monthly", priority: "0.6" })),
    ...["/privacidad", "/terminos-y-condiciones", "/libro-de-reclamaciones"].map((path) => ({ path, changefreq: "yearly", priority: "0.3" })),
];

const urls = pages
    .map(({ path, changefreq, priority }) => `    <url>\n        <loc>${SITE_URL}${path}</loc>\n        <changefreq>${changefreq}</changefreq>\n        <priority>${priority}</priority>\n    </url>`)
    .join("\n");

writeFileSync("public/sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);
writeFileSync("public/robots.txt", `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`);
console.log(`sitemap.xml generado con ${pages.length} URLs`);
