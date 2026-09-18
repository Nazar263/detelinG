"use client";

import CountUp from "react-countup";
import { motion } from "framer-motion";
import { STATS, SITE } from "@/lib/data";
import { ArrowUpRightIcon, StarIcon } from "./icons";

const EASE = [0.22, 1, 0.36, 1] as const;

const fadeLeft = (delay: number) => ({
  initial: { opacity: 0, x: -24 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, margin: "-70px" } as const,
  transition: { duration: 0.8, delay, ease: EASE },
});

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-70px" } as const,
  transition: { duration: 0.8, delay, ease: EASE },
});

const titleLines = ["Детейлінг,", "який видно", "з першого погляду"];

export default function About() {
  return (
    <section id="pro-nas" className="relative py-24 sm:py-32">
      <div className="container-x grid items-start gap-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
        {/* ліва колонка — текст */}
        <div>
          {/* Eyebrow + line */}
          <motion.div {...fadeLeft(0)}>
            <span className="eyebrow inline-flex items-center gap-3">
              <span className="hairline inline-block h-px w-10" aria-hidden />
              Про студію
            </span>
          </motion.div>

          {/* Title — line by line */}
          <h2 className="mt-5 font-display text-[clamp(1.7rem,3.6vw,3.1rem)] font-bold uppercase leading-[1.12] tracking-tight">
            {titleLines.map((line, i) => (
              <motion.span
                key={i}
                {...fadeLeft(0.15 + i * 0.15)}
                className="block"
              >
                {i === 0 ? (
                  <span className="chrome-text">{line}</span>
                ) : (
                  line
                )}
              </motion.span>
            ))}
          </h2>

          {/* Paragraph 1 */}
          <motion.p {...fadeUp(0.6)} className="mt-7 max-w-xl leading-relaxed text-mist">
            KrosCar — детейлінг-студія у Львові. Працюємо з кожним авто як із власним:
            хімчистка салону до основи, відновлювальне полірування кузову, керамічні покриття,
            перешиття керма та ремонт глибоких царапин.
          </motion.p>

          {/* Paragraph 2 */}
          <motion.p {...fadeUp(0.7)} className="mt-4 max-w-xl leading-relaxed text-mist">
            Жодних «приблизно» — тільки виміряний результат. Тому наш рейтинг у Google —{" "}
            <strong className="font-semibold text-ivory">5.0</strong>, а клієнти повертаються
            та приводять друзів.
          </motion.p>

          {/* Google rating card */}
          <motion.div {...fadeUp(0.9)} className="mt-9">
            <a
              href={SITE.googleMaps}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between gap-6 rounded-2xl border border-white/[0.08] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-neon/40 hover:shadow-[0_20px_50px_-15px_rgba(77,201,246,0.2)]"
              style={{
                background:
                  "linear-gradient(160deg, rgba(255,255,255,0.055), rgba(255,255,255,0.015) 38%, rgba(77,201,246,0.04))",
                backdropFilter: "blur(14px)",
                WebkitBackdropFilter: "blur(14px)",
              }}
              aria-label={`Рейтинг ${SITE.rating} у Google — відкрити карту`}
            >
              <div className="flex items-center gap-5">
                <div className="flex flex-col items-center">
                  <span className="font-display text-4xl text-neon-light">5.0</span>
                  <div className="mt-1.5 flex gap-0.5" aria-label="Рейтинг 5 з 5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <StarIcon key={i} className="size-3.5 text-neon" />
                    ))}
                  </div>
                </div>
                <div className="text-sm leading-relaxed">
                  <p className="font-semibold text-ivory">Рейтинг Google</p>
                  <p className="text-mist">на основі відгуків клієнтів</p>
                  <div className="mt-2 flex -space-x-2">
                    {["О", "М", "А", "І"].map((ch, i) => (
                      <motion.span
                        key={ch}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 1.0 + i * 0.08, ease: EASE }}
                        className="flex size-7 items-center justify-center rounded-full border border-night bg-neon/20 font-display text-[10px] text-neon-light"
                      >
                        {ch}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </div>
              <ArrowUpRightIcon className="size-5 shrink-0 text-mist transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-neon" />
            </a>
          </motion.div>
        </div>

        {/* права колонка — статистика */}
        <div className="grid grid-cols-2 lg:pt-24">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-70px" }}
              transition={{ duration: 0.7, delay: 0.15 + i * 0.15, ease: EASE }}
              className={`group relative flex flex-col justify-center gap-3 border-white/8 p-8 sm:p-10 ${
                i < 2 ? "border-b" : ""
              } ${i % 2 === 0 ? "border-r" : ""}`}
            >
              {/* Accent line on hover */}
              <span
                aria-hidden
                className="absolute left-0 top-0 h-0 w-px bg-neon/70 transition-all duration-500 group-hover:h-full"
              />
              <span className="font-display text-4xl font-bold text-ivory transition-colors duration-300 group-hover:text-neon sm:text-5xl">
                {i === 0 ? (
                  "5.0"
                ) : (
                  <CountUp
                    end={stat.value}
                    decimals={stat.decimals}
                    suffix={stat.suffix}
                    duration={stat.value === 5 ? 1.2 : 2}
                    enableScrollSpy
                    scrollSpyOnce
                    scrollSpyDelay={150}
                  />
                )}
              </span>
              <span className="font-alt text-[11px] font-semibold uppercase tracking-[0.22em] text-mist transition-colors duration-300 group-hover:text-ivory/70">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
