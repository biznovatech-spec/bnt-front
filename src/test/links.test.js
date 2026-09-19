import { describe, expect, it } from "vitest";
import { readFileSync, readdirSync, existsSync, statSync } from "node:fs";
import { join } from "node:path";
import process from "node:process";
import { matchRoutes } from "react-router-dom";
import { routes } from "../router";
import { services } from "../data/services";
import { solutions } from "../data/solutions";
import { projects } from "../data/projects";
import { articles } from "../data/resources";
import { megaMenus } from "../data/megaMenu";
import { navigationData } from "../data/navigation";

// Vitest corre desde la raíz del proyecto
const ROOT = process.cwd();
const SRC = join(ROOT, "src");

// Esto sirve para leer todo el código fuente y buscar enlaces escritos a mano
function sourceFiles(dir = SRC) {
    return readdirSync(dir).flatMap((name) => {
        const full = join(dir, name);
        if (statSync(full).isDirectory()) return name === "test" ? [] : sourceFiles(full);
        return /\.(jsx?|tsx?)$/.test(name) && !/\.test\./.test(name) ? [full] : [];
    });
}

const files = sourceFiles().map((file) => ({ file, code: readFileSync(file, "utf8") }));
const allCode = files.map((f) => f.code).join("\n");

const ASSET_RE = /^\/(image|images|brand|fonts)\//;
// pendingImages y generatedImages guardan metadatos de imágenes, no enlaces
const METADATA = /(pending|generated)Images\.js$/;
const literalPaths = [
    ...new Set(
        files.filter(({ file }) => !METADATA.test(file)).flatMap(({ code }) =>
            [...code.matchAll(/["'`](\/[a-z0-9][a-z0-9\-/#]*|\/)["'`]/g)].map((m) => m[1])
        )
    ),
].filter((path) => !ASSET_RE.test(path) && !/\.[a-z]{2,4}$/.test(path));

const slugsByBase = {
    servicios: services.map((s) => s.slug),
    soluciones: solutions.map((s) => s.slug),
    "casos-de-exito": projects.map((p) => p.slug),
    recursos: [...articles.map((a) => a.slug), "tecnologias"],
};

function resolveLink(link) {
    const [pathname, hash] = link.split("#");
    const matches = matchRoutes(routes, pathname || "/");
    const leaf = matches?.[matches.length - 1];
    if (!leaf || leaf.route.path === "*") return `sin ruta: ${link}`;
    if (leaf.params.slug) {
        const base = pathname.split("/")[1];
        if (!slugsByBase[base]?.includes(leaf.params.slug)) return `slug inexistente: ${link}`;
    }
    if (hash && !new RegExp(`id(=|:\\s*)["']${hash}["']`).test(allCode)) return `ancla inexistente: ${link}`;
    return null;
}

describe("integridad de enlaces", () => {
    it("encuentra enlaces para revisar", () => {
        expect(literalPaths.length).toBeGreaterThan(30);
    });

    it("cada enlace interno lleva a una vista real (ruta, slug y ancla)", () => {
        const broken = literalPaths.map(resolveLink).filter(Boolean);
        expect(broken).toEqual([]);
    });

    it("las referencias cruzadas de los datos apuntan a elementos existentes", () => {
        const serviceSlugs = new Set(slugsByBase.servicios);
        const caseSlugs = new Set(slugsByBase["casos-de-exito"]);
        const broken = [
            ...projects.flatMap((p) => p.relatedServices.filter((s) => !serviceSlugs.has(s)).map((s) => `${p.slug} -> servicio ${s}`)),
            ...projects.flatMap((p) => p.relatedCases.filter((c) => !caseSlugs.has(c)).map((c) => `${p.slug} -> caso ${c}`)),
            ...articles.flatMap((a) => (a.relatedServices || []).filter((s) => !serviceSlugs.has(s)).map((s) => `${a.slug} -> servicio ${s}`)),
            ...services.filter((s) => s.relatedProject && !caseSlugs.has(s.relatedProject)).map((s) => `${s.slug} -> caso ${s.relatedProject}`),
        ];
        expect(broken).toEqual([]);
    });

    it("cada URL del sitemap lleva a una vista real", () => {
        const sitemap = readFileSync(join(ROOT, "public", "sitemap.xml"), "utf8");
        const locs = [...sitemap.matchAll(/<loc>https?:\/\/[^/]+(\/[^<]*)<\/loc>/g)].map((m) => m[1]);
        expect(locs.length).toBeGreaterThan(30);
        expect(locs.map(resolveLink).filter(Boolean)).toEqual([]);
    });

    it("en cada menú, dos opciones distintas no llevan al mismo lugar", () => {
        const menus = [
            ...Object.entries(megaMenus).map(([name, menu]) => [name, menu.groups.flatMap((g) => g.items.map((i) => i.route))]),
            ...navigationData.filter((n) => n.submenu).map((n) => [n.label, n.submenu.map((i) => i.href)]),
        ];
        const repeated = menus.flatMap(([name, routes]) =>
            routes.filter((route, i) => routes.indexOf(route) !== i).map((route) => `${name}: ${route}`)
        );
        expect(repeated).toEqual([]);
    });

    it("la página legal enlaza al libro de reclamaciones desde el footer", () => {
        expect(allCode).toMatch(/to="\/libro-de-reclamaciones"/);
    });
});

describe("imágenes", () => {
    it("cada imagen referenciada existe en /public", () => {
        const refs = new Set(
            files
                .filter(({ file }) => !file.endsWith("pendingImages.js"))
                .flatMap(({ code }) => [...code.matchAll(/["'`](\/(?:image|images)\/[^"'`]+\.(?:png|jpe?g|webp|svg|avif))["'`]/g)].map((m) => m[1]))
        );
        const missing = [...refs].filter((ref) => !existsSync(join(ROOT, "public", ref)));
        expect(refs.size).toBeGreaterThan(10);
        expect(missing).toEqual([]);
    });

    it("ninguna imagen servida pesa más de 300 KB", () => {
        const heavy = [];
        const walk = (dir) => {
            for (const name of readdirSync(dir)) {
                const full = join(dir, name);
                const info = statSync(full);
                if (info.isDirectory()) walk(full);
                else if (/\.(png|jpe?g|webp|avif)$/.test(name) && info.size > 300 * 1024 && allCode.includes(name)) {
                    heavy.push(`${name} ${Math.round(info.size / 1024)}KB`);
                }
            }
        };
        walk(join(ROOT, "public"));
        expect(heavy).toEqual([]);
    });
});
