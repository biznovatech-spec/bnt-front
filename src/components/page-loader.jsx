import { Icon } from "@iconify/react";

export default function PageLoader() {
    return (
        <div className="w-full min-h-[50vh] flex flex-col items-center justify-center gap-4">
            <Icon icon="solar:spinner-bold-duotone" className="w-10 h-10 text-primary animate-spin" />
            <span className="text-sm text-t-secondary font-medium">Cargando...</span>
        </div>
    );
}
