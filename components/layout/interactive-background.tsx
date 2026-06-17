"use client";

import { useEffect, useRef } from "react";
import { Camera, Geometry, Mesh, Program, Renderer } from "ogl";

import { cn } from "@/lib/utils";

/**
 * Particle accent colors for the premium dark theme:
 * bright white, anchor brand purple, and a translucent midnight indigo.
 * (Alpha is folded into intensity since particles render opaque.)
 */
const PARTICLE_COLORS = ["#ffffff", "#ae7be5", "rgba(67, 56, 202, 0.4)"] as const;

interface ParticlesProps {
  particleCount: number;
  particleSpread: number;
  speed: number;
  particleColors: readonly string[];
  moveParticlesOnHover: boolean;
  particleHoverFactor: number;
  alphaParticles: boolean;
  particleBaseSize: number;
  sizeRandomness: number;
  cameraDistance: number;
  disableRotation: boolean;
  className?: string;
}

/** Parse `#rgb` / `#rrggbb` / `rgb()` / `rgba()` into normalized [r,g,b]. */
function parseColor(input: string): [number, number, number] {
  const value = input.trim();

  if (value.startsWith("#")) {
    let hex = value.slice(1);
    if (hex.length === 3) {
      hex = hex
        .split("")
        .map((c) => c + c)
        .join("");
    }
    const int = Number.parseInt(hex, 16);
    return [
      ((int >> 16) & 255) / 255,
      ((int >> 8) & 255) / 255,
      (int & 255) / 255,
    ];
  }

  const match = value.match(/rgba?\(([^)]+)\)/i);
  if (match && match[1]) {
    const parts = match[1].split(",").map((p) => Number.parseFloat(p.trim()));
    const r = (parts[0] ?? 0) / 255;
    const g = (parts[1] ?? 0) / 255;
    const b = (parts[2] ?? 0) / 255;
    const a = parts[3] ?? 1;
    // Fold alpha into intensity so "translucent" colors read as dimmer.
    return [r * a, g * a, b * a];
  }

  return [1, 1, 1];
}

const vertex = /* glsl */ `
  attribute vec3 position;
  attribute vec4 random;
  attribute vec3 color;

  uniform mat4 modelMatrix;
  uniform mat4 viewMatrix;
  uniform mat4 projectionMatrix;
  uniform float uTime;
  uniform float uSpread;
  uniform float uBaseSize;
  uniform float uSizeRandomness;

  varying vec4 vRandom;
  varying vec3 vColor;

  void main() {
    vRandom = random;
    vColor = color;

    vec3 pos = position * uSpread;
    pos.z *= 10.0;

    vec4 mPos = modelMatrix * vec4(pos, 1.0);
    float t = uTime;
    mPos.x += sin(t * random.z + 6.28 * random.w) * mix(0.1, 1.5, random.x);
    mPos.y += sin(t * random.y + 6.28 * random.x) * mix(0.1, 1.5, random.w);
    mPos.z += sin(t * random.w + 6.28 * random.y) * mix(0.1, 1.5, random.z);

    vec4 mvPos = viewMatrix * mPos;
    gl_PointSize = (uBaseSize * (1.0 + uSizeRandomness * (random.x - 0.5))) / length(mvPos.xyz);
    gl_Position = projectionMatrix * mvPos;
  }
`;

const fragment = /* glsl */ `
  precision highp float;

  uniform float uTime;
  uniform float uAlphaParticles;
  varying vec4 vRandom;
  varying vec3 vColor;

  void main() {
    vec2 uv = gl_PointCoord.xy;
    float d = length(uv - vec2(0.5));

    if (uAlphaParticles < 0.5) {
      if (d > 0.5) {
        discard;
      }
      gl_FragColor = vec4(vColor + 0.2 * sin(uv.yxx + uTime + vRandom.y * 6.28), 1.0);
    } else {
      float circle = smoothstep(0.5, 0.4, d) * 0.8;
      gl_FragColor = vec4(vColor + 0.2 * sin(uv.yxx + uTime + vRandom.y * 6.28), circle);
    }
  }
`;

/** ReactBits "Particles" WebGL effect, ported to TypeScript via OGL. */
function Particles({
  particleCount,
  particleSpread,
  speed,
  particleColors,
  moveParticlesOnHover,
  particleHoverFactor,
  alphaParticles,
  particleBaseSize,
  sizeRandomness,
  cameraDistance,
  disableRotation,
  className,
}: ParticlesProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const renderer = new Renderer({
      depth: false,
      alpha: true,
      dpr: Math.min(typeof window !== "undefined" ? window.devicePixelRatio : 1, 2),
    });
    const gl = renderer.gl;
    const canvas = gl.canvas as HTMLCanvasElement;
    container.appendChild(canvas);
    gl.clearColor(0, 0, 0, 0);

    const camera = new Camera(gl, { fov: 15 });
    camera.position.set(0, 0, cameraDistance);

    const resize = (): void => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      renderer.setSize(width, height);
      camera.perspective({ aspect: gl.canvas.width / gl.canvas.height });
      if (reduceMotion) {
        renderer.render({ scene: particles, camera });
      }
    };

    const handleMouseMove = (event: MouseEvent): void => {
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -((event.clientY / window.innerHeight) * 2 - 1);
      mouse.current = { x, y };
    };

    // Build geometry: points distributed within a unit sphere.
    const count = particleCount;
    const positions = new Float32Array(count * 3);
    const randoms = new Float32Array(count * 4);
    const colors = new Float32Array(count * 3);
    const palette = particleColors.length > 0 ? particleColors : ["#ffffff"];

    for (let i = 0; i < count; i++) {
      let x: number;
      let y: number;
      let z: number;
      let lenSq: number;
      do {
        x = Math.random() * 2 - 1;
        y = Math.random() * 2 - 1;
        z = Math.random() * 2 - 1;
        lenSq = x * x + y * y + z * z;
      } while (lenSq > 1 || lenSq === 0);
      const radius = Math.cbrt(Math.random());
      positions.set([x * radius, y * radius, z * radius], i * 3);
      randoms.set(
        [Math.random(), Math.random(), Math.random(), Math.random()],
        i * 4,
      );
      const swatch = palette[Math.floor(Math.random() * palette.length)] ?? "#ffffff";
      colors.set(parseColor(swatch), i * 3);
    }

    const geometry = new Geometry(gl, {
      position: { size: 3, data: positions },
      random: { size: 4, data: randoms },
      color: { size: 3, data: colors },
    });

    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        uTime: { value: 0 },
        uSpread: { value: particleSpread },
        uBaseSize: { value: particleBaseSize },
        uSizeRandomness: { value: sizeRandomness },
        uAlphaParticles: { value: alphaParticles ? 1 : 0 },
      },
      transparent: true,
      depthTest: false,
    });

    const particles = new Mesh(gl, { mode: gl.POINTS, geometry, program });

    window.addEventListener("resize", resize, false);
    resize();

    let rafId = 0;
    let lastTime = performance.now();
    let elapsed = 0;

    const update = (time: number): void => {
      rafId = requestAnimationFrame(update);
      const delta = time - lastTime;
      lastTime = time;
      elapsed += delta * speed;

      program.uniforms.uTime.value = elapsed * 0.001;

      if (moveParticlesOnHover) {
        particles.position.x = -mouse.current.x * particleHoverFactor;
        particles.position.y = -mouse.current.y * particleHoverFactor;
      } else {
        particles.position.x = 0;
        particles.position.y = 0;
      }

      if (!disableRotation) {
        particles.rotation.x = Math.sin(elapsed * 0.0002) * 0.1;
        particles.rotation.y = Math.cos(elapsed * 0.0005) * 0.15;
        particles.rotation.z += 0.01 * speed;
      }

      renderer.render({ scene: particles, camera });
    };

    if (reduceMotion) {
      // Accessibility guard: render a single static frame, no animation loop.
      renderer.render({ scene: particles, camera });
    } else {
      if (moveParticlesOnHover) {
        window.addEventListener("mousemove", handleMouseMove);
      }
      rafId = requestAnimationFrame(update);
    }

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
      if (canvas.parentNode === container) {
        container.removeChild(canvas);
      }
      const ext = gl.getExtension("WEBGL_lose_context");
      ext?.loseContext();
    };
  }, [
    particleCount,
    particleSpread,
    speed,
    particleColors,
    moveParticlesOnHover,
    particleHoverFactor,
    alphaParticles,
    particleBaseSize,
    sizeRandomness,
    cameraDistance,
    disableRotation,
  ]);

  return <div ref={containerRef} className={cn("h-full w-full", className)} />;
}

/**
 * Global ambient particle background.
 *
 * Mounted once in the root layout. Sits behind all content as a fixed,
 * non-interactive, low-opacity texture so it never harms readability.
 */
export function InteractiveBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 h-full w-full bg-background opacity-40"
    >
      <Particles
        particleCount={150}
        particleSpread={10}
        speed={0.24}
        moveParticlesOnHover={true}
        particleHoverFactor={0.7}
        alphaParticles={false}
        particleBaseSize={100}
        sizeRandomness={1}
        cameraDistance={30}
        disableRotation={false}
        particleColors={PARTICLE_COLORS}
      />
    </div>
  );
}
