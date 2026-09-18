"use client";

import { useCallback, useEffect, useState, useSyncExternalStore } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

function subscribe(callback: () => void) {
  const fine = window.matchMedia("(pointer: fine)");
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
  fine.addEventListener("change", callback);
  reduce.addEventListener("change", callback);
  return () => {
    fine.removeEventListener("change", callback);
    reduce.removeEventListener("change", callback);
  };
}

const getSnapshot = () =>
  window.matchMedia("(pointer: fine)").matches &&
  !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const getServerSnapshot = () => false;

export default function CustomCursor() {
  const enabled = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [hovering, setHovering] = useState(false);
  const [pressed, setPressed] = useState(false);

  const dx = useMotionValue(-100);
  const dy = useMotionValue(-100);
  const x = useSpring(dx, { stiffness: 260, damping: 24, mass: 0.5 });
  const y = useSpring(dy, { stiffness: 260, damping: 24, mass: 0.5 });

  const onMove = useCallback(
    (e: PointerEvent) => {
      dx.set(e.clientX);
      dy.set(e.clientY);
      const t = e.target as HTMLElement | null;
      setHovering(!!t?.closest("a, button, [role='slider'], input, select, textarea, label"));
    },
    [dx, dy]
  );

  const onDown = useCallback(() => setPressed(true), []);
  const onUp = useCallback(() => setPressed(false), []);

  useEffect(() => {
    if (!enabled) return;
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
    };
  }, [enabled, onMove, onDown, onUp]);

  if (!enabled) return null;

  return (
    <>
      {/* м'яке світло навколо курсора */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[3] hidden lg:block"
        style={{ x, y }}
      >
        <div
          className="size-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(77,201,246,0.06) 0%, rgba(77,201,246,0.02) 40%, transparent 65%)",
          }}
        />
      </motion.div>

      {/* кільце */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[70] hidden lg:block"
        style={{ x, y }}
      >
        <motion.div
          className="-translate-x-1/2 -translate-y-1/2 rounded-full border border-neon/50"
          animate={{
            width: hovering ? 52 : 34,
            height: hovering ? 52 : 34,
            opacity: hovering ? 0.9 : 0.55,
            scale: pressed ? 0.85 : 1,
            backgroundColor: hovering ? "rgba(77,201,246,0.08)" : "rgba(77,201,246,0)",
          }}
          transition={{ type: "spring", stiffness: 320, damping: 24 }}
        />
      </motion.div>

      {/* крапка */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[70] hidden lg:block"
        style={{ x: dx, y: dy }}
      >
        <div className="size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-neon-light" />
      </motion.div>
    </>
  );
}
