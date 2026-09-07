import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * ESCENA DE PORTADA — una sola, en dos proporciones.
 *
 * Un paisaje de alambre que ondula hasta perderse en el horizonte y, flotando
 * sobre él, el núcleo de puntos con su armazón. La identidad es la misma en
 * escritorio y en móvil; lo único que cambia es el encuadre:
 *
 *   wide  cámara alta y lejana, terreno ancho, núcleo denso
 *   tall  cámara más cerca, terreno profundo, núcleo ligero
 *
 * Toda la deformación vive en los vertex shaders: por frame solo se actualiza
 * `uTime`. El hilo principal no recorre un solo vértice.
 */

/* ------------------------------------------------------------------
   Terreno
   ------------------------------------------------------------------ */

const TERRAIN_VERTEX = /* glsl */ `
  uniform float uTime;
  varying float vDepth;
  varying float vWave;

  void main() {
    vec3 p = position;

    // Tres ondas de distinta frecuencia y dirección: el patrón nunca se repite
    float w = sin(p.x * 0.16 + uTime) * 1.5
            + sin(p.y * 0.21 + uTime * 0.8) * 1.15
            + sin((p.x + p.y) * 0.1 - uTime * 0.55) * 0.9;

    p.z += w;

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    vDepth = -mv.z;
    vWave = w;

    gl_Position = projectionMatrix * mv;
  }
`;

const TERRAIN_FRAGMENT = /* glsl */ `
  uniform vec3 uColor;
  uniform float uNear;
  uniform float uFar;
  varying float vDepth;
  varying float vWave;

  void main() {
    // La distancia apaga la malla hacia el horizonte; las crestas la encienden
    float far = 1.0 - smoothstep(uNear, uFar, vDepth);
    float crest = 0.3 + 0.7 * smoothstep(-2.6, 2.8, vWave);

    gl_FragColor = vec4(uColor, far * crest * 0.55);
  }
`;

function Terrain({ color, size, segments, position, near, far }) {
    const material = useRef();

    const geometry = useMemo(
        () => new THREE.PlaneGeometry(size[0], size[1], segments[0], segments[1]),
        [size, segments]
    );

    const uniforms = useMemo(
        () => ({
            uTime: { value: 0 },
            uColor: { value: new THREE.Color(color) },
            uNear: { value: near },
            uFar: { value: far },
        }),
        [color, near, far]
    );

    useFrame((state) => {
        if (material.current) material.current.uniforms.uTime.value = state.clock.elapsedTime * 0.4;
    });

    useEffect(() => () => geometry.dispose(), [geometry]);

    return (
        <mesh geometry={geometry} rotation={[-Math.PI / 2, 0, 0]} position={position}>
            <shaderMaterial
                ref={material}
                uniforms={uniforms}
                vertexShader={TERRAIN_VERTEX}
                fragmentShader={TERRAIN_FRAGMENT}
                wireframe
                transparent
                depthWrite={false}
            />
        </mesh>
    );
}

/* ------------------------------------------------------------------
   Núcleo de puntos
   ------------------------------------------------------------------ */

/** Distribución de Fibonacci: puntos repartidos uniformemente en la esfera. */
function buildSphere(count, radius) {
    const positions = new Float32Array(count * 3);
    const scales = new Float32Array(count);
    const golden = Math.PI * (3 - Math.sqrt(5));

    for (let i = 0; i < count; i++) {
        const y = 1 - (i / (count - 1)) * 2;
        const r = Math.sqrt(Math.max(0, 1 - y * y));
        const theta = golden * i;

        positions[i * 3] = Math.cos(theta) * r * radius;
        positions[i * 3 + 1] = y * radius;
        positions[i * 3 + 2] = Math.sin(theta) * r * radius;
        scales[i] = 0.6 + Math.random() * 0.8;
    }

    return { positions, scales };
}

const CORE_DATA = {
    wide: buildSphere(4200, 6.4),
    tall: buildSphere(2000, 6.4),
};

const CORE_VERTEX = /* glsl */ `
  uniform float uTime;
  uniform float uSize;
  uniform float uPixelRatio;
  attribute float aScale;
  varying float vDepth;

  void main() {
    vec3 p = position;
    vec3 dir = normalize(position);

    float wave = sin(p.x * 0.8 + uTime)
               * cos(p.y * 0.9 + uTime * 0.8)
               * sin(p.z * 1.1 + uTime * 1.2);

    p += dir * wave * 0.55;

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = uSize * aScale * uPixelRatio * (14.0 / -mv.z);

    vDepth = smoothstep(-7.0, 7.0, p.z);
  }
`;

const CORE_FRAGMENT = /* glsl */ `
  uniform vec3 uColorNear;
  uniform vec3 uColorFar;
  varying float vDepth;

  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float d = dot(uv, uv);
    if (d > 0.25) discard;

    float alpha = (1.0 - smoothstep(0.05, 0.25, d)) * (0.25 + vDepth * 0.75);
    gl_FragColor = vec4(mix(uColorFar, uColorNear, vDepth), alpha);
  }
`;

function Core({ variant, pixelRatio, size }) {
    const points = useRef();
    const material = useRef();

    const geometry = useMemo(() => {
        const data = CORE_DATA[variant] || CORE_DATA.wide;
        const geom = new THREE.BufferGeometry();
        geom.setAttribute("position", new THREE.BufferAttribute(data.positions.slice(), 3));
        geom.setAttribute("aScale", new THREE.BufferAttribute(data.scales.slice(), 1));
        return geom;
    }, [variant]);

    const uniforms = useMemo(
        () => ({
            uTime: { value: 0 },
            uSize: { value: size },
            uPixelRatio: { value: pixelRatio },
            uColorNear: { value: new THREE.Color("#25C6FD") },
            uColorFar: { value: new THREE.Color("#0A84FF") },
        }),
        [pixelRatio, size]
    );

    useFrame((state) => {
        const t = state.clock.elapsedTime * 0.35;
        if (material.current) material.current.uniforms.uTime.value = t;
        if (points.current) {
            points.current.rotation.y = t * 0.1;
            points.current.rotation.z = t * 0.05;
        }
    });

    useEffect(() => () => geometry.dispose(), [geometry]);

    return (
        <points ref={points} geometry={geometry} frustumCulled={false}>
            <shaderMaterial
                ref={material}
                uniforms={uniforms}
                vertexShader={CORE_VERTEX}
                fragmentShader={CORE_FRAGMENT}
                transparent
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
}

/** Armazón de alambre: encierra el núcleo y le da lectura de instrumento. */
function Shell({ color }) {
    const shell = useRef();
    const geometry = useMemo(
        () => new THREE.WireframeGeometry(new THREE.IcosahedronGeometry(8.7, 1)),
        []
    );

    useFrame((state) => {
        if (!shell.current) return;
        const t = state.clock.elapsedTime;
        shell.current.rotation.y = -t * 0.045;
        shell.current.rotation.x = Math.sin(t * 0.12) * 0.12;
    });

    useEffect(() => () => geometry.dispose(), [geometry]);

    return (
        <lineSegments ref={shell} geometry={geometry}>
            <lineBasicMaterial color={color} transparent opacity={0.16} depthWrite={false} />
        </lineSegments>
    );
}

/* ------------------------------------------------------------------
   Encuadres
   ------------------------------------------------------------------ */

const FRAMING = {
    wide: {
        camera: { position: [0, 0, 20], fov: 42 },
        terrain: { size: [190, 130], segments: [58, 38], position: [0, -16, -45], near: 30, far: 108 },
        core: 5.6,
        dpr: [1, 1.5],
    },
    tall: {
        camera: { position: [0, 4.2, 24], fov: 56 },
        terrain: { size: [110, 92], segments: [42, 30], position: [0, -12, -32], near: 22, far: 80 },
        core: 4.6,
        dpr: [1, 1.3],
    },
};

export default function HeroScene({ variant = "wide", className = "" }) {
    const host = useRef(null);
    const [enabled, setEnabled] = useState(false);
    const [visible, setVisible] = useState(true);
    const [accent, setAccent] = useState("#25C6FD");
    const [pixelRatio] = useState(() =>
        typeof window === "undefined" ? 1 : Math.min(window.devicePixelRatio || 1, 1.5)
    );

    const frame = FRAMING[variant] || FRAMING.wide;

    useEffect(() => {
        const calm = window.matchMedia("(prefers-reduced-motion: reduce)");
        const sync = () => setEnabled(!calm.matches);
        sync();
        calm.addEventListener("change", sync);

        // El acento lo decide el tema: se lee del propio token
        const read = () => {
            const value = getComputedStyle(document.documentElement)
                .getPropertyValue("--accent-ink")
                .trim();
            if (value) setAccent(value);
        };
        read();
        const observer = new MutationObserver(read);
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

        return () => {
            calm.removeEventListener("change", sync);
            observer.disconnect();
        };
    }, []);

    // Fuera de pantalla no se dibuja ni un frame
    useEffect(() => {
        const node = host.current;
        if (!node || typeof IntersectionObserver === "undefined") return;
        const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), {
            threshold: 0.01,
        });
        io.observe(node);
        return () => io.disconnect();
    }, []);

    return (
        <div ref={host} className={className} aria-hidden="true">
            {enabled && (
                <Canvas
                    camera={frame.camera}
                    dpr={frame.dpr}
                    frameloop={visible ? "always" : "never"}
                    gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
                    onCreated={({ camera }) => camera.lookAt(0, 0, 0)}
                >
                    {variant !== "wide" && <Terrain color={accent} {...frame.terrain} />}
                    <Core variant={variant} pixelRatio={pixelRatio} size={frame.core} />
                    <Shell color={accent} />
                </Canvas>
            )}
        </div>
    );
}
