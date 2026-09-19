"use client";

import type { CSSProperties } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

const streakStyle = (delay: string) => ({ "--streak-delay": delay }) as CSSProperties;

/**
 * Фон сайту v2:
 * - aurora-плями без filter:blur (м'якість запечена в градієнти — легше для GPU)
 * - scroll-drift: плями ледь пливуть разом зі скролом
 * - глянцевий sweep: світлова смуга пропливає екраном за цикл сторінки
 * - віньєта для фокусу на контенті
 */
export default function Background() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();

  // scroll-drift (тонко: ±5-8% за всю сторінку)
  const aX = useTransform(scrollYProgress, [0, 1], ["0%", "6%"]);
  const aY = useTransform(scrollYProgress, [0, 1], ["0%", "-7%"]);
  const bX = useTransform(scrollYProgress, [0, 1], ["0%", "-8%"]);
  const bY = useTransform(scrollYProgress, [0, 1], ["0%", "6%"]);
  const cX = useTransform(scrollYProgress, [0, 1], ["0%", "5%"]);
  const cY = useTransform(scrollYProgress, [0, 1], ["0%", "-5%"]);

  // sweep: -110% → 290% власної ширини = повний перетин екрану
  const sweepX = useTransform(scrollYProgress, [0, 1], ["-110%", "290%"]);
  const sweepOpacity = useTransform(
    scrollYProgress,
    [0, 0.1, 0.5, 0.9, 1],
    [0, 1, 0.75, 1, 0]
  );

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* дрейфуючі aurora-плями — без blur-фільтра */}
      <motion.div
        style={reduce ? undefined : { x: aX, y: aY }}
        className="absolute left-[-10%] top-[-15%] size-[55vw]"
      >
        <div
          className="aurora-blob drift-a size-full"
          style={{
            background:
              "radial-gradient(circle, rgba(77,201,246,0.14) 0%, rgba(77,201,246,0.07) 34%, rgba(77,201,246,0.03) 52%, transparent 70%)",
          }}
        />
      </motion.div>

      <motion.div
        style={reduce ? undefined : { x: bX, y: bY }}
        className="absolute right-[-15%] top-[30%] size-[45vw]"
      >
        <div
          className="aurora-blob drift-b size-full"
          style={{
            background:
              "radial-gradient(circle, rgba(26,143,196,0.13) 0%, rgba(26,143,196,0.06) 34%, rgba(26,143,196,0.025) 52%, transparent 70%)",
          }}
        />
      </motion.div>

      <motion.div
        style={reduce ? undefined : { x: cX, y: cY }}
        className="absolute bottom-[-20%] left-[20%] size-[50vw]"
      >
        <div
          className="aurora-blob drift-c size-full"
          style={{
            background:
              "radial-gradient(circle, rgba(125,216,248,0.10) 0%, rgba(125,216,248,0.05) 34%, rgba(125,216,248,0.02) 52%, transparent 70%)",
          }}
        />
      </motion.div>

      {/* світлові streaks — м'які промені, як світло шоу-руму по лаку */}
      <div className="light-streak left-0 top-[22%]" style={streakStyle("0s")} />
      <div className="light-streak left-0 top-[40%]" style={streakStyle("12.5s")} />
      <div className="light-streak left-0 top-[58%]" style={streakStyle("4.5s")} />
      <div className="light-streak left-0 top-[84%]" style={streakStyle("8s")} />

      {/* віньєта — фокус на контенті, глибина по краях */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 115% 90% at 50% 42%, transparent 55%, rgba(5,5,9,0.42) 100%)",
        }}
      />

      {/* глянцевий sweep — «відполірований кузов ловить світло» під час скролу */}
      <motion.div
        style={reduce ? undefined : { x: sweepX, opacity: sweepOpacity }}
        className="absolute inset-y-[-25%] left-0 hidden w-[38vw] md:block"
      >
        <div
          className="size-full rotate-[16deg]"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(125,216,248,0.045) 42%, rgba(163,228,255,0.07) 50%, rgba(125,216,248,0.045) 58%, transparent 100%)",
            mixBlendMode: "screen",
          }}
        />
      </motion.div>
    </div>
  );
}
