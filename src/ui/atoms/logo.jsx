export default function Logo({ className = "w-24 h-auto" }) {
    return (
        <img 
            src="/logo_only.svg" 
            alt="Logo" 
            className={`object-contain ${className}`}
        />
    );
}