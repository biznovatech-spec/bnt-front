/**
 * Indicador de carga de las rutas diferidas.
 *
 * Reutiliza el lenguaje del sitio: el armazón de alambre girando, las cruces
 * de la retícula latiendo en cascada y un filete que barre de ida y vuelta.
 * Solo anima transform y opacity, así que no compite con la descarga del
 * fragmento de código.
 */
export default function PageLoader() {
    const ticks = [
        { top: 0, left: 0 },
        { top: 0, right: 0 },
        { bottom: 0, left: 0 },
        { bottom: 0, right: 0 },
    ];

    return (
        <div className="w-full min-h-[60vh] flex flex-col items-center justify-center gap-8">
            <div className="loader-mark" aria-hidden="true">
                <div className="wire-cube loader-cube" style={{ "--wire-size": "50px" }}>
                    <span /><span /><span /><span /><span /><span />
                </div>

                {ticks.map((pos, i) => (
                    <span
                        key={i}
                        className="loader-tick"
                        style={{ ...pos, animationDelay: `${i * 160}ms` }}
                    />
                ))}
            </div>

            <div className="flex flex-col items-center gap-4">
                <span className="micro-label t-2">
                    <span aria-hidden="true" className="opacity-40">[&nbsp;</span>
                    Cargando
                    <span aria-hidden="true" className="opacity-40">&nbsp;]</span>
                </span>

                <span className="loader-rail" aria-hidden="true">
                    <span />
                </span>
            </div>
        </div>
    );
}
