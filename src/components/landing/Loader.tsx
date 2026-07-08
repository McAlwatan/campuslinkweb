// Logo 01 Loader — Two circles swap places horizontally
// Filled orange circle and outlined circle trade positions
// while the connecting bar stretches/shrinks between them

"use client";
import { useEffect, useRef } from "react";

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export default function Loader1({
  size = 80,
  color = "#F0B429",
  bgColor = "transparent",
}: {
  size?: number;
  color?: string;
  bgColor?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef    = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const dpr = window.devicePixelRatio || 1;
    canvas.width  = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width  = `${size}px`;
    canvas.style.height = `${size}px`;
    ctx.scale(dpr, dpr);

    const DURATION = 900; // ms per full swap cycle
    const startTime = performance.now();

    const r          = size * 0.175;
    const cy         = size * 0.5;
    const barH       = size * 0.055;
    const leftZone   = r + size * 0.04;
    const rightZone  = size - r - size * 0.04;

    function draw(now: number) {
      ctx.clearRect(0, 0, size, size);

      if (bgColor !== "transparent") {
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, size, size);
      }

      const elapsed = now - startTime;
      const raw  = (Math.sin((elapsed / DURATION) * Math.PI * 2) + 1) / 2;
      const ease = easeInOutCubic(raw);

      // at ease=0: filled on left, outline on right
      // at ease=1: filled on right, outline on left
      const filledX  = leftZone  + ease * (rightZone - leftZone);
      const outlineX = rightZone - ease * (rightZone - leftZone);

      const barLeft  = Math.min(filledX, outlineX) + r - 1;
      const barRight = Math.max(filledX, outlineX) - r + 1;
      const barW     = Math.max(0, barRight - barLeft);

      // bar opacity fades at mid-swap when circles overlap
      const barOpacity = Math.abs(ease - 0.5) * 2;

      // ── Bar ─────────────────────────────────────────────
      ctx.globalAlpha = barOpacity;
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.roundRect(barLeft, cy - barH / 2, barW, barH, barH / 2);
      ctx.fill();
      ctx.globalAlpha = 1;

      // ── Filled circle (orange) ───────────────────────────
      ctx.beginPath();
      ctx.arc(filledX, cy, r, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();

      // ── Outlined circle ──────────────────────────────────
      ctx.beginPath();
      ctx.arc(outlineX, cy, r, 0, Math.PI * 2);
      ctx.strokeStyle = color;
      ctx.lineWidth = size * 0.03;
      ctx.stroke();

      // ── Center merge dot when they cross ────────────────
      if (barOpacity < 0.15) {
        ctx.globalAlpha = (0.15 - barOpacity) / 0.15;
        ctx.beginPath();
        ctx.arc(size / 2, cy, r * 0.35, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      rafRef.current = requestAnimationFrame(draw);
    }

    rafRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafRef.current);
  }, [size, color, bgColor]);

  return (
    <canvas
      ref={canvasRef}
      aria-label="Loading…"
      role="img"
      style={{ display: "block" }}
    />
  );
}