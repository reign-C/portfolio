"use client";

import { useEffect, useRef } from "react";

const BAYER_4X4 = [
  0, 8, 2, 10,
  12, 4, 14, 6,
  3, 11, 1, 9,
  15, 7, 13, 5,
];

const WIDTH = 140;
const HEIGHT = 160;

function sampleDensity(x: number, y: number): number {
  const nx = x / WIDTH;
  const ny = y / HEIGHT;

  // Radial distance from portrait center + subtle horizontal signal scan ridges
  const dx = (nx - 0.5) * 2;
  const dy = (ny - 0.5) * 2;
  const radial = Math.max(0, 1 - Math.sqrt(dx * dx + dy * dy));

  const scanMod = 0.78 + 0.22 * Math.sin(ny * Math.PI * 16.0);
  const pulse = 0.85 + 0.15 * Math.cos(nx * Math.PI * 6.0);

  return Math.pow(radial, 1.35) * scanMod * pulse;
}

export function DitherHorizon() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const draw = () => {
      const isDark = document.documentElement.dataset.theme === "dark";
      const fill = isDark
        ? "rgba(242, 242, 240, 0.2)"
        : "rgba(23, 23, 23, 0.14)";

      ctx.clearRect(0, 0, WIDTH, HEIGHT);
      ctx.fillStyle = fill;

      for (let y = 0; y < HEIGHT; y++) {
        for (let x = 0; x < WIDTH; x++) {
          const density = sampleDensity(x, y);
          const threshold = (BAYER_4X4[(y & 3) * 4 + (x & 3)] + 0.5) / 16;
          if (density > threshold) {
            ctx.fillRect(x, y, 1, 1);
          }
        }
      }
    };

    draw();
    window.addEventListener("themechange", draw);
    return () => window.removeEventListener("themechange", draw);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute -inset-6 -z-10 select-none"
      style={{
        maskImage:
          "radial-gradient(closest-side, black 45%, rgba(0,0,0,0.45) 75%, transparent 100%)",
        WebkitMaskImage:
          "radial-gradient(closest-side, black 45%, rgba(0,0,0,0.45) 75%, transparent 100%)",
      }}
    >
      <canvas
        ref={canvasRef}
        width={WIDTH}
        height={HEIGHT}
        className="h-full w-full"
        style={{ imageRendering: "pixelated" }}
      />
    </div>
  );
}
