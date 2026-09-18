"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { SERVICES } from "@/lib/data";
import Magnetic from "./Magnetic";
import { ArrowRightIcon } from "./icons";

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

const titleWords = ["Кожна", "деталь", "має значення"];

export default function Services() {
  return (
    <section id="posluhy" className="relative py-24 sm:py-32">
      <div className="container-x grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        {/* ліва колонка — заголовок */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          {/* Eyebrow + line */}
          <motion.div {...fadeLeft(0)}>
            <span className="eyebrow inline-flex items-center gap-3">
              <span className="hairline inline-block h-px w-10" aria-hidden />
              Послуги
            </span>
          </motion.div>

          {/* Title — word by word */}
          <h2 className="mt-5 font-display text-[clamp(1.7rem,3.6vw,3.1rem)] font-bold uppercase leading-[1.12] tracking-tight">
            {titleWords.map((word, i) => (
              <motion.span
                key={i}
                {...fadeLeft(0.15 + i * 0.15)}
                className={`mr-[0.3em] inline-block ${
                  word === "деталь" ? "chrome-text" : ""
                }`}
              >
                {word}
              </motion.span>
            ))}
          </h2>

          {/* Subtitle */}
          <motion.p {...fadeUp(0.6)} className="mt-6 max-w-xl text-base leading-relaxed text-mist">
            Повний цикл детейлінгу: від глибокої хімчистки салону до керамічних покриттів та ремонту ЛКП.
          </motion.p>

          {/* Button */}
          <motion.div {...fadeUp(0.75)} className="mt-8 hidden lg:block">
            <Magnetic strength={0.25}>
              <a href="#zapis" className="group btn-ghost">
                Підібрати послугу
                <ArrowRightIcon className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </Magnetic>
          </motion.div>
        </div>

        {/* картки */}
        <div className="grid gap-5 sm:grid-cols-2">
          {SERVICES.map((service, i) => (
            <motion.article
              key={service.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: EASE }}
              className={`service-card group relative overflow-hidden rounded-2xl ${
                service.wide ? "sm:col-span-2" : ""
              }`}
            >
              <div
                className={`relative overflow-hidden ${
                  service.wide
                    ? "aspect-[16/9] sm:aspect-auto sm:absolute sm:inset-y-0 sm:left-0 sm:w-[42%]"
                    : "aspect-[16/10]"
                }`}
              >
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  sizes={
                    service.wide
                      ? "(max-width: 640px) 100vw, 42vw"
                      : "(max-width: 640px) 100vw, 33vw"
                  }
                  className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.06]"
                />
                {/* Overlay darkens on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-night/80 via-night/10 to-transparent transition-all duration-[0.4s] group-hover:from-night/90 group-hover:via-night/40" />
                {/* Blue bottom line */}
                <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-neon transition-all duration-[0.4s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:w-full" />
                {/* номер */}
                <span
                  aria-hidden
                  className="text-outline-neon absolute right-4 top-2 font-display text-4xl font-extrabold"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>

              <div className={`relative p-6 ${service.wide ? "sm:ml-[42%] sm:p-8 sm:pt-10" : ""}`}>
                <h3 className="font-display text-sm uppercase tracking-wide text-ivory transition-colors duration-300 group-hover:text-neon sm:text-base">
                  {service.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-mist">{service.desc}</p>
                {service.wide && (
                  <a
                    href="#zapis"
                    className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-neon-light transition-all hover:gap-3.5"
                  >
                    Записатися на ремонт
                    <ArrowRightIcon className="size-4" />
                  </a>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
