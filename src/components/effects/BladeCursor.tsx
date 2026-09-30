"use client";

import { useEffect, useRef } from "react";

interface Point {
  x: number;
  y: number;
  time: number;
}

export default function BladeCursor() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    // Only run on desktop devices with fine pointer (mouse)
    if (typeof window === "undefined" || !window.matchMedia("(pointer: fine)").matches) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let points: Point[] = [];
    const maxAge = 260; // ms

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      points.push({
        x: e.clientX,
        y: e.clientY,
        time: Date.now(),
      });
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    const render = () => {
      const now = Date.now();
      points = points.filter((p) => now - p.time < maxAge);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (points.length > 2) {
        for (let i = 1; i < points.length; i++) {
          const p1 = points[i - 1];
          const p2 = points[i];
          const age = now - p2.time;
          const life = 1 - age / maxAge; // 1 to 0
          const progress = i / points.length; // 0 to 1

          // Calculate speed
          const dist = Math.hypot(p2.x - p1.x, p2.y - p1.y);

          // Only draw visible blade slash if there was swift motion
          if (dist > 1.5) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);

            // Razor-thin blade stroke with silver gleam
            const width = Math.min(3.5, (dist / 12) * progress) * life;
            ctx.lineWidth = Math.max(0.5, width);
            ctx.lineCap = "round";

            // Silver / white metallic blade with subtle crimson hue at the razor edge
            ctx.strokeStyle = `rgba(240, 245, 255, ${life * 0.45})`;
            ctx.shadowColor = "rgba(225, 29, 72, 0.4)";
            ctx.shadowBlur = dist > 20 ? 8 : 2;

            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-50 transition-opacity"
      aria-hidden="true"
    />
  );
}
