"use client";

import { motion } from "framer-motion";
import Reveal from "./Reveal";
import GlassCard from "./GlassCard";
import Magnetic from "./Magnetic";
import { track } from "@/lib/analytics";
import {
  PhoneIcon,
  SearchIcon,
  SparklesIcon,
  CheckCircleIcon,
  ArrowRightIcon,
} from "./icons";

const EASE = [0.22, 1, 0.36, 1] as const;

const STEPS = [
  {
    num: "01",
    title: "Заявка",
    desc: "Залишаєте заявку на сайті або телефонуєте — узгоджуємо послугу та зручний час.",
    Icon: PhoneIcon,
  },
  {
    num: "02",
    title: "Огляд",
    desc: "Безкоштовний огляд авто: оцінюємо стан і пропонуємо оптимальний перелік робіт.",
    Icon: SearchIcon,
  },
  {
    num: "03",
    title: "Робота",
    desc: "Виконуємо узгоджені роботи: хімчистка, полірування, покриття, ремонт ЛКП.",
    Icon: SparklesIcon,
  },
  {
    num: "04",
    title: "Здача",
    desc: "Показуємо результат до/після, відповідаємо на питання — і ви забираєте авто.",
    Icon: CheckCircleIcon,
  },
] as const;

export default function Process() {
  return (
    <section id="proces" className="relative overflow-hidden py-24 sm:py-32">
      {/* Background glow */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        aria-hidden
      >
        <div
          className="absolute left-1/2 top-0 h-[600px] w-[900px] -translate-x-1/2 rounded-full blur-[120px]"
          style={{
            background:
              "radial-gradient(ellipse, rgba(77,201,246,0.08), transparent 70%)",
          }}
        />
      </div>

      <div className="container-x relative">
        {/* Header */}
        <Reveal>
          <div className="flex justify-center">
            <span className="eyebrow inline-flex items-center gap-3">
              <span className="hairline inline-block h-px w-10" aria-hidden />
              Реалізація
              <span className="hairline inline-block h-px w-10" aria-hidden />
            </span>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <h2 className="mt-5 text-center font-display text-[clamp(1.7rem,3.6vw,3.1rem)] font-bold uppercase leading-[1.12] tracking-tight">
            <span className="chrome-text">Як</span>{" "}
            <span className="text-ivory">ми працюємо</span>
          </h2>
        </Reveal>

        <Reveal delay={0.3}>
          <p className="mx-auto mt-4 max-w-[600px] text-center text-base leading-relaxed text-mist">
            Чотири прості кроки — від заявки до виїзду на чистому авто.
          </p>
        </Reveal>

        {/* Steps grid */}
        <div className="relative mt-14">
          {/* Connector arrows (desktop) */}
          <div className="pointer-events-none absolute inset-0 hidden lg:block" aria-hidden>
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="absolute top-1/2 z-0 -translate-y-1/2"
                style={{
                  left: `${((i + 1) / 4) * 100}%`,
                  transform: `translate(-50%, -50%)`,
                }}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.8 + i * 0.15, ease: EASE }}
              >
                <motion.div
                  animate={{ opacity: [0.3, 0.8, 0.3] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <ArrowRightIcon className="size-5 text-neon/50" />
                </motion.div>
              </motion.div>
            ))}
          </div>

          <ol className="relative z-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((step, i) => (
              <motion.li
                key={step.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.7, delay: i * 0.12, ease: EASE }}
              >
                <GlassCard className="group relative flex h-full flex-col p-7 hover:-translate-y-1.5">
                  {/* Icon chip */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.6 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 + i * 0.12, ease: EASE }}
                    className="mb-5 flex size-11 items-center justify-center rounded-xl border border-neon/20 bg-neon/10 transition-all duration-300 group-hover:border-neon/40 group-hover:bg-neon/15 group-hover:shadow-[0_0_20px_-4px_rgba(77,201,246,0.3)]"
                  >
                    <step.Icon className="size-5 text-neon" />
                  </motion.div>

                  {/* Number */}
                  <span
                    aria-hidden
                    className="font-display text-6xl font-extrabold leading-none text-outline-neon transition-all duration-500 group-hover:text-neon group-hover:drop-shadow-[0_0_12px_rgba(77,201,246,0.5)]"
                    style={{ WebkitTextStroke: "1.5px rgba(77,201,246,0.4)" }}
                  >
                    {step.num}
                  </span>

                  {/* Title */}
                  <h3 className="mt-4 font-display text-base uppercase tracking-wide text-ivory transition-colors duration-300 group-hover:text-neon">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-2.5 text-sm leading-relaxed text-mist">
                    {step.desc}
                  </p>
                </GlassCard>
              </motion.li>
            ))}
          </ol>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.6, ease: EASE }}
          className="mt-12 flex justify-center"
        >
          <Magnetic>
            <a
              href="#zapis"
              onClick={() => track("cta_click", { location: "process" })}
              className="btn-neon"
            >
              Розпочати з кроку 01
              <ArrowRightIcon className="size-4" />
            </a>
          </Magnetic>
        </motion.div>
      </div>
    </section>
  );
}
