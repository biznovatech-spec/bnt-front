import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import Reveal from "../atoms/reveal";

/**
 * Cierre de página: bloque de tinta a sangre, retícula sólida y titular en
 * escalera a tamaño de portada. Sin halos ni degradados — el peso lo da el
 * bloque de color y la escala tipográfica.
 */
export default function CTASection({ title, description, buttonText, buttonTo, label = "Siguiente paso" }) {
    return (
        <Reveal as="section" dir="none" className="relative overflow-hidden surface-strong isolate">
            <div aria-hidden="true" className="deco absolute inset-0">
                <div
                    className="absolute inset-0 grid-hairline"
                    style={{ "--cell": "clamp(56px, 6vw, 104px)" }}
                />
                <div className="absolute inset-y-0 left-[18%] w-px bg-hair" />
                <div className="absolute inset-y-0 right-[26%] w-px bg-hair" />

                {/* Volumen construido solo con filetes: dos armazones girando */}
                <div className="wire-scene absolute right-[5%] top-1/2 -translate-y-1/2 hidden lg:grid place-items-center">
                    <div className="wire-cube" style={{ "--wire-size": "clamp(180px, 17vw, 280px)" }}>
                        <span /><span /><span /><span /><span /><span />
                        <div className="wire-cube wire-cube--inner" style={{ "--wire-size": "clamp(78px, 7.4vw, 122px)" }}>
                            <span /><span /><span /><span /><span /><span />
                        </div>
                    </div>
                </div>
            </div>

            <div className="relative z-10 px-[clamp(1.5rem,5vw,5rem)] py-[clamp(3.5rem,7vw,7rem)]">
                <div className="flex items-center gap-6 pb-8 border-b bd-hair">
                    <span className="index-num micro-label t-accent">→</span>
                    <span aria-hidden="true" className="w-10 h-px bg-hair" />
                    <span className="micro-label t-2">
                        <span aria-hidden="true" className="opacity-40">[&nbsp;</span>
                        {label}
                        <span aria-hidden="true" className="opacity-40">&nbsp;]</span>
                    </span>
                </div>

                <h2 className="display-caps t-1 mt-10 max-w-[16ch]">{title}</h2>

                <div className="mt-10 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
                    {description && (
                        <p className="text-[var(--fs-lead)] leading-relaxed t-2 max-w-[52ch]">
                            {description}
                        </p>
                    )}

                    <Link to={buttonTo} className="btn btn-primary btn-lg group shrink-0">
                        {buttonText}
                        <Icon icon="lucide:arrow-right" className="w-4 h-4 arrow-shift" aria-hidden="true" />
                    </Link>
                </div>
            </div>
        </Reveal>
    );
}
