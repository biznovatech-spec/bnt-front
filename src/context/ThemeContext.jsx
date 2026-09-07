import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

/** Lee el tema ya resuelto por el script en línea de index.html. */
function readTheme() {
    if (typeof document === "undefined") return "dark";
    if (document.documentElement.classList.contains("light")) return "light";
    if (document.documentElement.classList.contains("dark")) return "dark";
    try {
        return localStorage.getItem("theme") || "dark";
    } catch {
        return "dark";
    }
}

export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState(readTheme);

    useEffect(() => {
        const root = document.documentElement;

        // Durante el cambio se congelan las transiciones de color: el salto es
        // instantáneo y limpio, sin decenas de elementos animando a la vez.
        root.classList.add("theme-switching");

        root.classList.toggle("dark", theme === "dark");
        root.classList.toggle("light", theme !== "dark");
        root.style.colorScheme = theme;

        try {
            localStorage.setItem("theme", theme);
        } catch {
            /* almacenamiento no disponible: el tema vive solo en memoria */
        }

        const clear = () => root.classList.remove("theme-switching");
        const frame = requestAnimationFrame(() => requestAnimationFrame(clear));
        // Si el navegador no entrega frames (pestaña oculta), no dejamos el
        // sitio sin transiciones para siempre.
        const timer = setTimeout(clear, 240);

        return () => {
            cancelAnimationFrame(frame);
            clearTimeout(timer);
        };
    }, [theme]);

    const toggleTheme = () => setTheme((prev) => (prev === "dark" ? "light" : "dark"));

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
}
