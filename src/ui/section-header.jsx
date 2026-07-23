export default function SectionHeader({ label, title, description, as: TitleTag = "h2", className = "" }) {
    return (
        <div className={`flex flex-col gap-4 ${className}`}>
            {label && (
                <span className="inline-flex items-center gap-2 text-sm font-bold tracking-widest text-surface-dark before:content-[''] before:w-2.5 before:h-2.5 before:bg-primary before:rounded-full">
                    {label}
                </span>
            )}
            <TitleTag className="text-surface-dark font-bold text-2xl md:text-3xl lg:text-4xl leading-tight">
                {title}
            </TitleTag>
            {description && (
                <p className="text-t-secondary text-lg leading-relaxed max-w-3xl">
                    {description}
                </p>
            )}
        </div>
    );
}
