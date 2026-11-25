"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  GAME_HEIGHT,
  GAME_WIDTH,
  GROUND_Y,
  PACKET_SPRITE,
  PING_SPRITE,
  PING_X,
  createInitialState,
  formatHud,
  stepRunner,
  triggerJump,
  type GamePhase,
  type RunnerState,
} from "@/lib/packet-runner-engine";

const STORAGE_KEY = "pr-best";

function drawSprite(
  ctx: CanvasRenderingContext2D,
  sprite: readonly string[],
  x: number,
  y: number,
  color: string,
) {
  ctx.fillStyle = color;
  for (let row = 0; row < sprite.length; row++) {
    const line = sprite[row];
    for (let col = 0; col < line.length; col++) {
      if (line[col] === "#") {
        ctx.fillRect(Math.round(x + col), Math.round(y + row), 1, 1);
      }
    }
  }
}

export function PacketRunner() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hudRef = useRef<HTMLSpanElement>(null);
  const lastHudRef = useRef<string>("");
  const stateRef = useRef<RunnerState>(createInitialState(0));
  const lastTimeRef = useRef<number>(0);
  const [phase, setPhase] = useState<GamePhase>("idle");
  const [statusMessage, setStatusMessage] = useState<string>("");

  const handleJump = useCallback(() => {
    const prevPhase = stateRef.current.phase;
    const next = triggerJump(stateRef.current);
    stateRef.current = next;
    if (prevPhase !== next.phase) {
      setPhase(next.phase);
    }
    if (next.phase === "running") {
      setStatusMessage("");
    }
  }, []);

  useEffect(() => {
    try {
      const saved = Number(localStorage.getItem(STORAGE_KEY) || 0);
      if (Number.isFinite(saved) && saved > 0) {
        stateRef.current = createInitialState(saved);
      }
    } catch {
      // Ignore storage failures
    }

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.code === "ArrowUp") {
        const tag = (e.target as HTMLElement | null)?.tagName;
        if (tag === "INPUT" || tag === "TEXTAREA") return;
        e.preventDefault();
        handleJump();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [handleJump]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let rafId = 0;

    const renderFrame = (time: number) => {
      const dt = lastTimeRef.current
        ? Math.min((time - lastTimeRef.current) / 16.7, 2)
        : 1;
      lastTimeRef.current = time;

      const prevPhase = stateRef.current.phase;
      const next = stepRunner(stateRef.current, dt);
      stateRef.current = next;

      if (prevPhase !== next.phase) {
        setPhase(next.phase);
        if (next.phase === "over") {
          try {
            localStorage.setItem(STORAGE_KEY, String(next.best));
          } catch {
            // Ignore storage failures
          }
          setStatusMessage("Connection lost. Press Space to reconnect.");
        }
      }

      const hudText = formatHud(next.score, next.best);
      if (hudRef.current && hudText !== lastHudRef.current) {
        hudRef.current.textContent = hudText;
        lastHudRef.current = hudText;
      }

      const styles = getComputedStyle(document.documentElement);
      const ink = styles.getPropertyValue("--ink").trim() || "#0A0A0A";
      const muted = styles.getPropertyValue("--muted").trim() || "#666666";

      ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
      ctx.fillStyle = ink;
      ctx.fillRect(0, GROUND_Y, GAME_WIDTH, 1);

      drawSprite(ctx, PING_SPRITE, PING_X, next.py, ink);
      for (const obstacle of next.obstacles) {
        drawSprite(ctx, PACKET_SPRITE, obstacle.x, GROUND_Y - 8, muted);
      }

      rafId = requestAnimationFrame(renderFrame);
    };

    rafId = requestAnimationFrame(renderFrame);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <div data-phase={phase} className="w-[600px] max-w-full">
      <div className="relative">
        <canvas
          id="packet-runner-canvas"
          ref={canvasRef}
          width={GAME_WIDTH}
          height={GAME_HEIGHT}
          tabIndex={0}
          role="application"
          aria-label="Packet Runner game canvas. Press Space, Up arrow, or tap to jump."
          data-testid="packet-runner-canvas"
          onPointerDown={handleJump}
          className="cursor-pointer touch-manipulation"
        />
        <span
          ref={hudRef}
          className="mono pointer-events-none absolute top-2 right-3 select-none text-[12px] leading-none text-ink tabular"
        >
          Uptime 00000  Best 00000
        </span>
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-[14px] text-muted">
        <p>Press Space, Up arrow, or tap the canvas to start.</p>
        <p role="status" aria-live="polite" className="font-medium text-ink">
          {statusMessage}
        </p>
      </div>
    </div>
  );
}
