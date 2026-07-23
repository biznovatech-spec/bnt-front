import { carouselTechnologies } from "../utils/carouselTech";

export default function Technologies() {
    return (
        <section
            className="w-full border-y border-border py-6 overflow-hidden select-none"
            id="technologies"
            aria-label="Tecnologías utilizadas"
        >
            <div
                className="flex gap-16 md:gap-24 animate-scroll"
                style={{ width: "max-content" }}
                aria-hidden="false"
            >
                {/* First copy */}
                {carouselTechnologies.map((tech, index) => (
                    <div key={`a-${index}`} className="flex items-center justify-center shrink-0" style={{ width: "140px", height: "56px" }}>
                        <img
                            src={tech.image}
                            alt={tech.name}
                            className="max-h-10 max-w-[120px] w-auto h-auto object-contain grayscale opacity-60"
                            loading="lazy"
                        />
                    </div>
                ))}
                {/* Second copy — hidden from screen readers */}
                <div aria-hidden="true" className="flex gap-16 md:gap-24">
                    {carouselTechnologies.map((tech, index) => (
                        <div key={`b-${index}`} className="flex items-center justify-center shrink-0" style={{ width: "140px", height: "56px" }}>
                            <img
                                src={tech.image}
                                alt=""
                                className="max-h-10 max-w-[120px] w-auto h-auto object-contain grayscale opacity-60"
                                loading="lazy"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}