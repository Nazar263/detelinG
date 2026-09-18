"use client";

import { motion } from "framer-motion";
import { REVIEWS, SITE } from "@/lib/data";
import { ArrowUpRightIcon, StarIcon } from "./icons";

const EASE = [0.22, 1, 0.36, 1] as const;
const VIEWPORT = { once: true, margin: "-15% 0px" } as const;

/** fade in up 24px → 0, один раз при появі */
const rise = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: VIEWPORT,
  transition: { duration: 0.7, delay, ease: EASE },
});

function Stars({ size = "size-[18px]" }: { size?: string }) {
  return (
    <div className="flex gap-1" aria-label="5 зірок">
      {Array.from({ length: 5 }).map((_, i) => (
        <StarIcon key={i} className={`${size} text-star`} />
      ))}
    </div>
  );
}

export default function Reviews() {
  const initials = (name: string) =>
    name
      .split(" ")
      .map((w) => w[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();

  // дублюємо масив для безшовного конвеєра (-50% цикл)
  const loop = [...REVIEWS, ...REVIEWS];

  return (
    <section id="vidhuky" className="relative overflow-hidden py-24 sm:py-32">
      <div className="container-x">
        {/* заголовок: 0ms лейбл → 150ms рядок 1 → 300ms рядок 2 */}
        <div className="flex flex-col items-center gap-5 text-center">
          <motion.span {...rise(0)} className="eyebrow inline-flex items-center gap-3">
            <span className="hairline inline-block h-px w-10" aria-hidden />
            Відгуки
            <span className="hairline inline-block h-px w-10" aria-hidden />
          </motion.span>
          <h2 className="font-display text-[clamp(1.7rem,3.6vw,3.1rem)] font-bold uppercase leading-[1.12] tracking-tight">
            <motion.span {...rise(0.15)} className="block">
              Нам довіряють
            </motion.span>
            <motion.span {...rise(0.3)} className="block">
              <span className="text-aqua">найдорожче</span> — авто
            </motion.span>
          </h2>
        </div>

        {/* картка Google 5.0 — glassmorphism, поява 400ms */}
        <div className="mt-10 flex justify-center">
          <motion.a
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.7, delay: 0.4, ease: EASE }}
            href={SITE.googleMaps}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Рейтинг ${SITE.rating} у Google — читати відгуки`}
            className="group inline-flex items-center gap-5 rounded-2xl border border-white/[0.08] bg-white/[0.04] px-7 py-5 backdrop-blur-[12px] transition-all duration-300 hover:-translate-y-[3px] hover:border-aqua/30"
          >
            <span className="font-display text-4xl font-bold text-ivory">5.0</span>
            <span className="flex flex-col items-start gap-1.5">
              <Stars />
              <span className="text-xs text-mist">
                · {SITE.reviewsCount} відгуків у Google
              </span>
            </span>
            <ArrowUpRightIcon className="size-5 text-mist transition-all duration-300 group-hover:-translate-x-[2px] group-hover:translate-y-[2px] group-hover:text-aqua" />
          </motion.a>
        </div>

        {/* безперервний конвеєр карток — повільний рух в один бік, пауза при hover */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
          className="mt-12"
        >
          {/* py-3 — буфер, щоб hover-підйом картки не обрізався */}
          <div className="ticker overflow-hidden py-3" role="region" aria-label="Відгуки клієнтів">
            <div className="ticker-track ticker-slow flex w-max items-stretch">
              {loop.map((review, i) => (
                <article
                  key={`${review.name}-${i}`}
                  aria-hidden={i >= REVIEWS.length}
                  className="w-[min(420px,86vw)] shrink-0 pr-5"
                >
                  <div className="relative flex h-full flex-col rounded-2xl border border-white/[0.08] bg-white/[0.04] p-7 backdrop-blur-[12px] transition-[border-color,transform] duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-[6px] hover:border-aqua/35">
                    {/* лапка */}
                    <span
                      aria-hidden
                      className="pointer-events-none absolute right-6 top-3 font-display text-[48px] font-extrabold leading-none text-aqua opacity-40"
                    >
                      &rdquo;
                    </span>

                    <Stars size="size-[18px]" />

                    <p className="mt-5 flex-1 text-[15px] leading-[1.7] text-white/85">
                      {review.text}
                    </p>

                    <footer className="mt-6 flex items-center gap-3 border-t border-white/[0.08] pt-5">
                      <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-aqua font-semibold text-white">
                        {initials(review.name)}
                      </span>
                      <span className="flex flex-col">
                        <span className="text-sm font-semibold text-ivory">{review.name}</span>
                        <span className="text-xs text-mist">{review.date} · Google</span>
                      </span>
                    </footer>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
