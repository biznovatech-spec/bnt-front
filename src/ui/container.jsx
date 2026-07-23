const sizeClasses = {
    wide: "max-w-[1600px]",
    standard: "max-w-[1400px]",
    reading: "max-w-[880px]",
};

export default function Container({ children, className = "", size = "standard" }) {
    const maxW = sizeClasses[size] || sizeClasses.standard;

    return (
        <div className={`w-full ${maxW} mx-auto px-5 sm:px-8 lg:px-12 xl:px-16 ${className}`}>
            {children}
        </div>
    );
}
