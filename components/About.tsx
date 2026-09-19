"use client";

import CountUp from "react-countup";
import { motion } from "framer-motion";
import { SITE } from "@/lib/data";
import { track } from "@/lib/analytics";
import { ArrowUpRightIcon, StarIcon } from "./icons";

const EASE = [0.22, 1, 0.36, 1] as const;

// Інші факти, ніж у Hero-статистиці — без дублювання (rating і 500+ авто вже у Hero)
const aboutStats = [
  { label: "Рейтинг Google", display: "5.0" },
  { label: "Авто виконано", value: 500, suffix: "+", duration: 1.2 },
  { label: "Років досвіду", value: 5, suffix: "+", duration: 1.6 },
  { label: "Гарантія якості", value: 100, suffix: "%", duration: 1.6 },
] as const;

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
      {/* blueprint-сітка — «жодних приблизно, тільки виміряний результат» */}
      <div aria-hidden className="blueprint" />

      <div className="container-x relative grid items-start gap-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
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
        </div>

        {/* права колонка — статистика (інші факти, ніж у Hero) */}
        <div className="grid grid-cols-2 lg:pt-24">
          {aboutStats.map((stat, i) => (
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
                {"display" in stat ? (
                  stat.display
                ) : (
                  <CountUp
                    end={stat.value}
                    suffix={stat.suffix}
                    duration={stat.duration}
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

      {/* Google rating card — full width */}
      <div className="container-x mt-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-70px" }}
          transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
        >
          <a
            href={SITE.googleMaps}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex w-full items-center justify-between overflow-hidden rounded-2xl border border-white/[0.08] px-8 py-6 sm:px-12 sm:py-8 transition-all duration-500 hover:-translate-y-1.5 hover:border-neon/40 hover:shadow-[0_24px_60px_-12px_rgba(77,201,246,0.25)]"
            style={{
              background: "linear-gradient(160deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02) 38%, rgba(77,201,246,0.05))",
              backdropFilter: "blur(14px)",
              WebkitBackdropFilter: "blur(14px)",
            }}
            aria-label={`Рейтинг ${SITE.rating} у Google — відкрити карту`}
            onClick={() => track("maps_click", { location: "about" })}
          >
            <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
              <div className="absolute -left-20 -top-20 h-40 w-40 rounded-full bg-neon/10 blur-[60px]" />
              <div className="absolute -bottom-10 -right-10 h-32 w-32 rounded-full bg-neon/8 blur-[40px]" />
            </div>
            <div className="pointer-events-none absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-neon/60 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

            <div className="relative flex items-center gap-6">
              <div className="flex flex-col items-center">
                <motion.span
                  className="font-display text-5xl font-bold text-neon-light sm:text-6xl"
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 1.0, ease: EASE }}
                >
                  {SITE.rating.toFixed(1)}
                </motion.span>
                <div className="mt-2 flex gap-1" aria-label={`Рейтинг ${SITE.rating} з 5`}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 8, rotate: -30 }}
                      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 1.2 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <StarIcon className="size-4 text-neon" />
                    </motion.div>
                  ))}
                </div>
              </div>
              <div className="hidden h-14 w-px bg-white/10 sm:block" />
              <div className="flex flex-col gap-2.5">
                <p className="text-sm font-semibold text-ivory">Рейтинг Google</p>
                <p className="text-xs text-mist">на основі {SITE.reviewsCount} відгуків</p>
              </div>
            </div>

            <div className="relative hidden max-w-md lg:block">
              <p className="text-sm leading-relaxed text-ivory/60 italic">
                &ldquo;Полірування + кераміка — авто як нове, дзеркальний блиск! Дякую!&rdquo;
              </p>
              <p className="mt-1 text-xs text-mist">— Олександр К.</p>
            </div>

            <motion.div className="relative shrink-0" whileHover={{ scale: 1.1 }} transition={{ duration: 0.2 }}>
              <ArrowUpRightIcon className="size-6 text-mist transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-neon" />
            </motion.div>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
