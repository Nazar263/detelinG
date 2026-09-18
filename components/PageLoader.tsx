"use client";

import { useEffect, useLayoutEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

// ізоморфний хук: layout-ефект на клієнті, звичайний — під час SSR
const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

export default function PageLoader() {
  const [visible, setVisible] = useState(true);

  // повторним відвідувачам лоадер не показуємо — прибираємо ще до першої відмальовки
  useIsoLayoutEffect(() => {
    try {
      if (sessionStorage.getItem("kc-loader") === "1") setVisible(false);
    } catch {
      /* noop */
    }
  }, []);

  useEffect(() => {
    if (!visible) return;
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => {
      try {
        sessionStorage.setItem("kc-loader", "1");
      } catch {
        /* noop */
      }
      setVisible(false);
    }, 1300);
    return () => {
      clearTimeout(t);
      document.body.style.overflow = "";
    };
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          id="kc-loader"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-night"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          aria-hidden
        >
          <div className="overflow-hidden">
            <motion.p
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.7, ease: [0.21, 0.65, 0.15, 1] }}
              className="font-display text-3xl tracking-[0.3em] text-ivory sm:text-4xl"
            >
              KROS<span className="chrome-text">CAR</span>
            </motion.p>
          </div>
          <motion.div
            className="hairline mt-6 h-px w-44 origin-center"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.1, delay: 0.25, ease: "easeInOut" }}
          />
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.55, duration: 0.5 }}
            className="mt-5 text-[11px] uppercase tracking-[0.35em] text-mist"
          >
            Detailing Studio · Lviv
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
