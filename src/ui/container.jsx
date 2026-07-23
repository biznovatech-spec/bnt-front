const sizeClasses = {
    wide: "max-w-none",
    standard: "max-w-none",
    reading: "max-w-[880px]",
};

export default function Container({ children, className = "", size = "standard" }) {
    const maxW = sizeClasses[size] || sizeClasses.standard;

    return (
        <div className={`w-full ${maxW} mx-auto px-[70px] ${className}`}>
            {children}
        </div>
    );
}
