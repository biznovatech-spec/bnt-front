export default function Title({ titulo, variant = "primary", as: Component = "h2", className = "" }) {
    const variants = {
        "primary": "inline-flex items-center gap-2 text-sm font-bold tracking-widest text-surface-dark before:content-[''] before:w-2.5 before:h-2.5 before:bg-primary before:rounded-full",
        "secondary": "text-surface-dark font-bold text-xl md:text-2xl"
    };
    
    return (
        <Component className={`${variants[variant]} ${className}`}>
            {titulo}
        </Component>
    );
}