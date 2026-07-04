"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface Spark {
  id: number;
  x: number;
  y: number;
}

const PARTICLES_PER_CLICK = 6;

export default function CursorTrail() {
  const [sparks, setSparks] = useState<Spark[]>([]);
  const counter = useRef(0);
  const reducedMotion = useRef(false);

  useEffect(() => {
    reducedMotion.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    function handleClick(e: MouseEvent) {
      if (reducedMotion.current) return;
      const id = counter.current++;
      setSparks((prev) => [...prev, { id, x: e.clientX, y: e.clientY }]);
      window.setTimeout(() => {
        setSparks((prev) => prev.filter((s) => s.id !== id));
      }, 700);
    }

    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[999] overflow-hidden"
    >
      <AnimatePresence>
        {sparks.map((spark) => (
          <span key={spark.id}>
            <motion.span
              className="absolute rounded-full border border-[var(--color-primary)]"
              style={{ left: spark.x, top: spark.y }}
              initial={{ width: 0, height: 0, opacity: 0.6, x: 0, y: 0 }}
              animate={{ width: 48, height: 48, opacity: 0, x: -24, y: -24 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
            {Array.from({ length: PARTICLES_PER_CLICK }).map((_, i) => {
              const angle = (i / PARTICLES_PER_CLICK) * Math.PI * 2;
              const distance = 26 + (i % 3) * 8;
              return (
                <motion.span
                  key={i}
                  className="absolute w-1.5 h-1.5 rounded-full"
                  style={{
                    left: spark.x,
                    top: spark.y,
                    background:
                      i % 2 === 0 ? "var(--color-primary)" : "var(--color-secondary)",
                  }}
                  initial={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                  animate={{
                    opacity: 0,
                    x: Math.cos(angle) * distance,
                    y: Math.sin(angle) * distance,
                    scale: 0.3,
                  }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                />
              );
            })}
          </span>
        ))}
      </AnimatePresence>
    </div>
  );
}
