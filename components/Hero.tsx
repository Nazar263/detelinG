"use client";

import { useRef, useState, useCallback } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import CountUp from "react-countup";
import { STATS } from "@/lib/data";
import SplitText from "./SplitText";
import Magnetic from "./Magnetic";
import { ArrowRightIcon, ClockIcon, MapPinIcon, StarIcon } from "./icons";

const EASE = [0.22, 1, 0.36, 1] as const;

const PAGE_LOAD_OFFSET = 1.4;

const fade = (i: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay: i * 0.15 + PAGE_LOAD_OFFSET, ease: EASE },
});

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const carContainerRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.16]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const chipsY = useTransform(scrollYProgress, [0, 1], [0, -160]);
  const chipsYSlow = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const statsOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const [maskPos, setMaskPos] = useState({ x: 50, y: 50 });
  const [maskActive, setMaskActive] = useState(false);

  const handleCarMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (reduce) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setMaskPos({ x, y });
    },
    [reduce]
  );

  return (
    <section
      ref={ref}
      id="top"
      className="relative flex min-h-[100svh] flex-col overflow-hidden bg-night"
    >
      {/* Fullscreen photo with parallax */}
      <motion.div style={reduce ? undefined : { y: bgY }} className="absolute inset-0 -z-10">
        <motion.div style={reduce ? undefined : { scale: bgScale }} className="absolute inset-0">
          <Image
            src="/images/hero.jpg"
            alt="Чорне авто після професійного полірування — дзеркальний блиск кузова"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-r from-night via-night/70 to-night/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-night via-transparent to-night/60" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 55% 45% at 72% 38%, rgba(77,201,246,0.12), transparent 70%)",
          }}
        />
      </motion.div>

      {/* Content */}
      <motion.div
        style={reduce ? undefined : { opacity: contentOpacity, y: contentY }}
        className="container-x relative z-10 flex flex-1 items-center pt-28 pb-12"
      >
        <div className="flex max-w-3xl flex-col gap-6">
          {/* Title */}
          <motion.h1
            {...fade(0)}
            className="font-display text-[clamp(2.1rem,5.8vw,4.9rem)] font-extrabold uppercase leading-[1.04] tracking-tight"
          >
            <SplitText
              segments={[
                { text: "Блиск", className: "chrome-text" },
                { text: "який збирає погляди" },
              ]}
              delay={1.55}
              stagger={0.06}
            />
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            {...fade(0.2)}
            className="max-w-xl text-base leading-relaxed text-ivory/70 sm:text-lg"
          >
            Хімчистка салону, полірування кузову, керамічні покриття та ремонт ЛКП у Львові.
            Детейлінг, після якого авто виглядає краще, ніж у день покупки.
          </motion.p>

          {/* Buttons */}
          <motion.div {...fade(0.4)} className="mt-2 flex flex-wrap items-center gap-3">
            <Magnetic>
              <a href="#zapis" className="btn-neon">
                Записатися
                <ArrowRightIcon className="size-4" />
              </a>
            </Magnetic>
            <Magnetic strength={0.25}>
              <a href="#roboty" className="btn-ghost">
                Дивитись роботи
              </a>
            </Magnetic>
          </motion.div>

          {/* Meta row (mobile/tablet) */}
          <motion.div
            {...fade(0.6)}
            className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-ivory/60 lg:hidden"
          >
            <span className="inline-flex items-center gap-2">
              <MapPinIcon className="size-4 text-neon" />
              вул. Міцна, 2
            </span>
            <span className="inline-flex items-center gap-2">
              <ClockIcon className="size-4 text-neon" />
              Пн–Сб · 09:00–19:00
            </span>
          </motion.div>
        </div>

        {/* ---- CAR BEFORE/AFTER (cursor reveal) ---- */}
        <motion.div
          ref={carContainerRef}
          initial={reduce ? false : { opacity: 0, x: 200, scale: 0.85, rotate: -2 }}
          animate={{ opacity: 1, x: 0, scale: 1, rotate: 0 }}
          transition={{ duration: 1.4, delay: 0.9 + PAGE_LOAD_OFFSET, ease: [0.16, 1, 0.3, 1] }}
          className="absolute right-6 top-1/2 hidden -translate-y-1/2 lg:block xl:right-14"
          onMouseMove={handleCarMouseMove}
          onMouseEnter={() => setMaskActive(true)}
          onMouseLeave={() => setMaskActive(false)}
        >
          {/* Blue glow under car */}
          <div
            className="pointer-events-none absolute -bottom-8 left-1/2 -z-10 h-[60%] w-[80%] -translate-x-1/2 rounded-full blur-[60px]"
            style={{ background: "radial-gradient(circle, rgba(0,180,216,0.35), transparent 70%)" }}
          />

          {/* Car images container */}
          <div className="relative w-[480px] xl:w-[540px]">
            {/* Dirty car (always visible) */}
            <Image
              src="/images/car-dirty.png"
              alt="Брудне авто до детейлінгу"
              width={1536}
              height={1024}
              priority
              className="w-full h-auto"
            />

            {/* Clean car — revealed only under cursor */}
            <div
              className="absolute inset-0 transition-opacity duration-300"
              style={{
                opacity: maskActive ? 1 : 0,
                maskImage: `radial-gradient(circle 120px at ${maskPos.x}% ${maskPos.y}%, black 40%, transparent 100%)`,
                WebkitMaskImage: `radial-gradient(circle 120px at ${maskPos.x}% ${maskPos.y}%, black 40%, transparent 100%)`,
              }}
            >
              <Image
                src="/images/car-clean.png"
                alt="Чисте авто після детейлінгу"
                width={1536}
                height={1024}
                priority
                className="w-full h-auto"
              />
            </div>
          </div>
        </motion.div>

        {/* Floating glass chips (desktop) */}
        <motion.div
          style={reduce ? undefined : { y: chipsY }}
          className="absolute right-6 top-[24%] hidden lg:block xl:right-14"
        >
          <div className="glass float-y rounded-2xl px-5 py-4">
            <p className="font-display text-2xl text-neon-light">5.0</p>
            <div className="mt-1 flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <StarIcon key={i} className="size-3 text-neon" />
              ))}
            </div>
            <p className="mt-1.5 text-[10px] uppercase tracking-[0.2em] text-ivory/60">
              Рейтинг Google
            </p>
          </div>
        </motion.div>

        <motion.div
          style={reduce ? undefined : { y: chipsYSlow }}
          className="absolute right-40 top-[58%] hidden lg:block xl:right-56"
        >
          <div className="glass float-y-slow flex items-center gap-3 rounded-2xl px-5 py-4">
            <MapPinIcon className="size-5 text-neon" />
            <div>
              <p className="text-sm font-semibold text-ivory">вул. Міцна, 2</p>
              <p className="text-xs text-ivory/60">Галицьке перехрестя, Львів</p>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* ---- SCROLL INDICATOR ---- */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 + PAGE_LOAD_OFFSET, duration: 0.8 }}
        style={reduce ? undefined : { opacity: statsOpacity }}
        className="absolute bottom-40 left-1/2 -translate-x-1/2 z-20 hidden flex-col items-center gap-2 text-ivory/50 transition-colors hover:text-neon-light xl:flex"
      >
        <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <svg className="scroll-arrow h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 9l6 6 6-6" />
        </svg>
      </motion.div>

      {/* ---- GLASSMORPHISM STAT CARDS ---- */}
      <motion.div
        style={reduce ? undefined : { opacity: statsOpacity }}
        className="container-x relative z-10 pb-8 lg:pb-10"
      >
        <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={reduce ? false : { opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, delay: i * 0.15, ease: EASE }}
              whileHover={reduce ? undefined : { y: -6, transition: { duration: 0.3, ease: EASE } }}
              className="stat-card group relative overflow-hidden rounded-2xl px-6 py-5 sm:px-8 sm:py-6"
            >
              {/* Top gradient line */}
              <div className="pointer-events-none absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-neon to-transparent" />

              <span className="font-display text-xl text-ivory transition-colors duration-300 group-hover:text-neon-light sm:text-2xl">
                <CountUp
                  end={stat.value}
                  decimals={stat.decimals}
                  duration={2.2}
                  enableScrollSpy
                  scrollSpyOnce
                  scrollSpyDelay={i * 150}
                />
                {stat.suffix}
              </span>
              <span className="mt-1 block text-[10px] font-semibold uppercase tracking-[0.18em] text-ivory/55">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
