import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { motion } from 'framer-motion'
import { Icon } from '@iconify/react'

// 1. EL NÚCLEO DE ENERGÍA (Una masa esférica orgánica que palpita detrás del logo)
function OrganicCore() {
    const pointsRef = useRef()

    const { geometry, originalPositions, normals } = useMemo(() => {
        // IcosahedronGeometry no tiene polos (círculos feos), 
        // distribuye los puntos uniformemente creando una esfera 3D perfecta.
        // Radio 5.5 y nivel de detalle 60 (~36,000 puntos) para un look premium.
        const geom = new THREE.IcosahedronGeometry(6, 60)

        const posAttribute = geom.getAttribute('position')
        const normAttribute = geom.getAttribute('normal')

        const origPos = new Float32Array(posAttribute.array)
        const norms = new Float32Array(normAttribute.array)

        return { geometry: geom, originalPositions: origPos, normals: norms }
    }, [])

    useFrame((state) => {
        if (!pointsRef.current) return

        const time = state.clock.elapsedTime * 0.35 // Movimiento relajante y elegante
        const posArray = pointsRef.current.geometry.attributes.position.array

        for (let i = 0; i < posArray.length / 3; i++) {
            const ox = originalPositions[i * 3]
            const oy = originalPositions[i * 3 + 1]
            const oz = originalPositions[i * 3 + 2]

            const nx = normals[i * 3]
            const ny = normals[i * 3 + 1]
            const nz = normals[i * 3 + 2]

            // Frecuencias asimétricas en 3D para que NUNCA se vea rígido ni repetitivo
            const displacement =
                Math.sin(ox * 0.8 + time) *
                Math.cos(oy * 0.9 + time * 0.8) *
                Math.sin(oz * 1.1 + time * 1.2)

            const amplitude = 0.85 // Suavidad de la deformación

            // Desplazamos los vértices a lo largo de su normal (hacia afuera o adentro)
            posArray[i * 3] = ox + nx * displacement * amplitude
            posArray[i * 3 + 1] = oy + ny * displacement * amplitude
            posArray[i * 3 + 2] = oz + nz * displacement * amplitude
        }

        pointsRef.current.geometry.attributes.position.needsUpdate = true

        // Rotación continua muy sutil
        pointsRef.current.rotation.y = time * 0.12
        pointsRef.current.rotation.z = time * 0.05
    })

    return (
        <points ref={pointsRef} geometry={geometry}>
            {/* Las zonas donde la esfera se deforma y los puntos se solapan crearán sombras azules naturales */}
            <pointsMaterial color="#25C6FD" size={0.045} transparent opacity={0.4} depthWrite={false} />
        </points>
    )
}

// 2. POLVO FLOTANTE ESTELAR
const DUST_COUNT = 200;
const DUST_POSITIONS = (() => {
    const pos = new Float32Array(DUST_COUNT * 3);
    for (let i = 0; i < DUST_COUNT; i++) {
        pos[i * 3] = (Math.random() - 0.5) * 30;
        pos[i * 3 + 1] = (Math.random() - 0.5) * 30;
        pos[i * 3 + 2] = (Math.random() - 0.5) * 15;
    }
    return pos;
})();

function FloatingDust() {
    const dustRef = useRef();
    const { positions } = useMemo(() => ({ positions: DUST_POSITIONS }), []);

    useFrame((state, delta) => {
        if (dustRef.current) {
            dustRef.current.rotation.y -= delta * 0.03
            dustRef.current.rotation.x -= delta * 0.015
        }
    })

    return (
        <points ref={dustRef}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" count={DUST_COUNT} array={positions} itemSize={3} />
            </bufferGeometry>
            <pointsMaterial color="#25C6FD" size={0.03} transparent opacity={0.3} />
        </points>
    )
}

const PILLS = [
    { text: "Análisis", icon: "lucide:line-chart" },
    { text: "Estrategia", icon: "lucide:target" },
    { text: "Desarrollo", icon: "lucide:code-2" },
    { text: "Implementación", icon: "lucide:rocket" },
    { text: "Soporte", icon: "lucide:headphones" }
]

function OrbitingPills() {
    return (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
            <motion.div 
                className="relative w-[82%] h-[82%] sm:w-[85%] sm:h-[85%] rounded-full"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
            >
                {PILLS.map((pill, i) => {
                    const angle = (i * 360) / PILLS.length
                    return (
                        <div 
                            key={pill.text} 
                            className="absolute top-0 left-1/2 w-0 h-1/2"
                            style={{ 
                                transformOrigin: "bottom center",
                                transform: `rotate(${angle}deg)`
                            }}
                        >
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                <motion.div 
                                    animate={{ rotate: [-angle, -angle - 360] }}
                                    transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
                                >
                                    <div className="bg-white/85 backdrop-blur-md shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-white/70 rounded-full px-5 py-2.5 sm:px-6 sm:py-3 flex items-center gap-3 pointer-events-auto hover:bg-white hover:scale-105 hover:shadow-[0_8px_30px_rgb(37,198,253,0.25)] transition-all cursor-pointer group">
                                        <Icon icon={pill.icon} className="text-[#25C6FD] text-xl sm:text-2xl group-hover:scale-110 transition-transform" />
                                        <span className="text-slate-700 font-bold text-sm sm:text-base whitespace-nowrap">{pill.text}</span>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    )
                })}
            </motion.div>
        </div>
    )
}

// Componente Principal
export default function HeroLogo3D({ className = "w-full max-w-[600px] aspect-square" }) {
    return (
        <div className={`relative flex items-center justify-center ${className}`}>
            <div className="absolute -inset-[15%] z-0 overflow-visible pointer-events-none">
                <Canvas camera={{ position: [0, 0, 16], fov: 60 }} dpr={[1, 2]}>
                    <ambientLight intensity={1} />
                    <OrganicCore />
                    <FloatingDust />
                </Canvas>
            </div>

            <motion.div
                className="relative z-10 w-[50%] h-[50%] sm:w-[54%] sm:h-[54%] cursor-pointer"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
                <motion.img
                    src="/logo_only.svg"
                    alt="Logo BNT"
                    className="w-full h-full object-contain drop-shadow-[0_0_50px_rgba(26,148,224,0.6)]"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
                />
            </motion.div>

            <OrbitingPills />
        </div>
    )
}