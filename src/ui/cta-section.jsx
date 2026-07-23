import { Icon } from "@iconify/react";
import Button from "./button";

export default function CTASection({ title, description, buttonText, buttonTo, variant = "light" }) {
    const variants = {
        light: "bg-gray-50 border border-gray-100",
        dark: "bg-surface-dark text-white",
    };

    return (
        <section className={`rounded-2xl p-8 md:p-12 lg:p-16 ${variants[variant]}`}>
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
                <div className="flex flex-col gap-3 max-w-2xl">
                    <h2 className={`text-2xl md:text-3xl font-bold ${variant === "dark" ? "text-white" : "text-gray-900"}`}>
                        {title}
                    </h2>
                    {description && (
                        <p className={`text-lg leading-relaxed ${variant === "dark" ? "text-gray-400" : "text-t-secondary"}`}>
                            {description}
                        </p>
                    )}
                </div>
                <Button variant={variant === "dark" ? "secondary" : "primary"} to={buttonTo} className="shrink-0">
                    {buttonText}
                    <Icon icon="solar:arrow-up-linear" className="w-5 h-5 rotate-45" />
                </Button>
            </div>
        </section>
    );
}
