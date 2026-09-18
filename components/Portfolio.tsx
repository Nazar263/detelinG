"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { PORTFOLIO, type Work } from "@/lib/data";
import { ChevronLeftIcon, ChevronRightIcon, PlusIcon, XIcon } from "./icons";

const EASE = [0.22, 1, 0.36, 1] as const;

function PortfolioCard({
  work,
  index,
  onOpen,
}: {
  work: Work;
  index: number;
  onOpen: () => void;
}) {
  return (
    <motion.button
      type="button"
      onClick={onOpen}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: EASE }}
      aria-label={`Відкрити фото: ${work.label}`}
      className="portfolio-card group relative h-[50vh] w-[85vw] shrink-0 overflow-hidden rounded-2xl text-left sm:h-[70vh] sm:w-[460px] xl:w-[500px]"
    >
      <Image
        src={work.src}
        alt={work.alt}
        width={work.w}
        height={work.h}
        sizes="500px"
        className="h-full w-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-[1.04]"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/0 transition-all duration-[0.4s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:bg-black/65" />

      {/* Bottom label with blue line */}
      <div className="absolute bottom-0 left-0 right-0 flex items-center gap-3 p-6 translate-y-5 opacity-0 transition-all duration-[0.4s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0 group-hover:opacity-100">
        <span className="h-[2px] w-8 shrink-0 bg-neon" />
        <span className="text-sm font-semibold uppercase tracking-[0.1em] text-white">
          {work.label}
        </span>
      </div>

      {/* Plus button */}
      <span className="absolute right-4 top-4 flex size-9 translate-y-2 items-center justify-center rounded-full border border-white/20 bg-night/40 text-white/70 opacity-0 backdrop-blur-md transition-all duration-[0.4s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0 group-hover:opacity-100 group-hover:border-neon/60 group-hover:text-neon">
        <PlusIcon className="size-4" />
      </span>
    </motion.button>
  );
}

export default function Portfolio() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const cardWidth = 524;
  const totalCardsWidth = PORTFOLIO.length * cardWidth;
  const x = useTransform(scrollYProgress, [0, 1], [0, -(totalCardsWidth - 1280)]);

  const [active, setActive] = useState<number | null>(null);

  const close = useCallback(() => setActive(null), []);
  const step = useCallback(
    (dir: 1 | -1) =>
      setActive((i) => (i === null ? i : (i + dir + PORTFOLIO.length) % PORTFOLIO.length)),
    []
  );

  useEffect(() => {
    if (active === null) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [active, close, step]);

  return (
    <section id="roboty" className="relative">
      {/* Header — centered */}
      <div className="container-x pt-24 sm:pt-32">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-70px" }}
          transition={{ duration: 0.8, ease: EASE }}
          className="flex justify-center"
        >
          <span className="eyebrow inline-flex items-center gap-3">
            <span className="hairline inline-block h-px w-10" aria-hidden />
            Портфоліо
            <span className="hairline inline-block h-px w-10" aria-hidden />
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-70px" }}
          transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
          className="mt-5 text-center font-display text-[clamp(1.7rem,3.6vw,3.1rem)] font-bold uppercase leading-[1.12] tracking-tight"
        >
          <span className="chrome-text">Результати</span>{" "}
          <span className="text-ivory">— а не обіцянки</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-70px" }}
          transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
          className="mx-auto mt-4 max-w-[600px] text-center text-base leading-relaxed text-mist"
        >
          Реальні авто наших клієнтів — блиск, чистота та деталі, які роблять різницю.
        </motion.p>
      </div>

      {/* Horizontal scroll gallery — desktop */}
      <div ref={containerRef} className="relative hidden lg:block" style={{ height: "400vh" }}>
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          <motion.div style={reduce ? undefined : { x }} className="flex gap-6 pl-[max(2rem,calc((100vw-1280px)/2+2rem))]">
            {PORTFOLIO.map((work, i) => (
              <PortfolioCard
                key={work.src}
                work={work}
                index={i}
                onOpen={() => setActive(i)}
              />
            ))}
          </motion.div>
        </div>
      </div>

      {/* Mobile/tablet: horizontal swipe */}
      <div className="mt-10 overflow-x-auto px-5 pb-8 lg:hidden">
        <div className="flex gap-4" style={{ width: "max-content" }}>
          {PORTFOLIO.map((work, i) => (
            <PortfolioCard
              key={work.src}
              work={work}
              index={i}
              onOpen={() => setActive(i)}
            />
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {active !== null && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 sm:p-10"
            onClick={close}
            role="dialog"
            aria-modal="true"
            aria-label={PORTFOLIO[active].label}
          >
            <motion.figure
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3, ease: EASE }}
              className="relative max-h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={PORTFOLIO[active].src}
                alt={PORTFOLIO[active].alt}
                width={PORTFOLIO[active].w}
                height={PORTFOLIO[active].h}
                priority
                className="h-auto max-h-[85vh] w-auto max-w-[92vw] rounded-xl object-contain"
              />
              <figcaption className="mt-4 flex items-center justify-between gap-4 px-1">
                <span className="text-sm font-semibold uppercase tracking-wider text-ivory">
                  {PORTFOLIO[active].label}
                </span>
                <span className="font-display text-xs text-mist">
                  {active + 1} / {PORTFOLIO.length}
                </span>
              </figcaption>
            </motion.figure>

            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); close(); }}
              aria-label="Закрити"
              className="absolute right-4 top-4 flex size-11 items-center justify-center rounded-full border border-white/20 bg-white/5 text-ivory backdrop-blur-md transition-all duration-300 hover:border-neon/60 hover:text-neon sm:right-6 sm:top-6"
            >
              <XIcon className="size-5" />
            </button>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); step(-1); }}
              aria-label="Попереднє фото"
              className="absolute left-3 top-1/2 flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/5 text-ivory backdrop-blur-md transition-all duration-300 hover:border-neon/60 hover:text-neon sm:left-6"
            >
              <ChevronLeftIcon className="size-5" />
            </button>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); step(1); }}
              aria-label="Наступне фото"
              className="absolute right-3 top-1/2 flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/5 text-ivory backdrop-blur-md transition-all duration-300 hover:border-neon/60 hover:text-neon sm:right-6"
            >
              <ChevronRightIcon className="size-5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
