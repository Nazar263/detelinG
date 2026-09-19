"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BASE_URL } from "@/lib/data";
import GlassCard from "./GlassCard";
import Reveal from "./Reveal";

const EASE = [0.22, 1, 0.36, 1] as const;

const FAQ_ITEMS = [
  {
    q: "Скільки часу займає детейлінг?",
    a: "Залежить від послуги та стану авто: від кількох годин до повного дня. Точний час назвемо після безкоштовного огляду — до початку робіт.",
  },
  {
    q: "Чи потрібно записуватися заздалегідь?",
    a: "Рекомендуємо: запис гарантує місце саме під ваш час. Але телефонуйте і без запису — знайдемо вікно у графіку.",
  },
  {
    q: "Чи є гарантія на роботи?",
    a: "Так, ми даємо гарантію на виконані роботи. Наш рейтинг у Google — 5.0, і ми працюємо доти, доки результат вас не влаштує.",
  },
  {
    q: "Що входить у хімчистку салону?",
    a: "Глибоке очищення до основи: сидіння, стеля, килими, пластик. Плями та запахи зникають — салон як новий.",
  },
  {
    q: "Чи працюєте з преміум-авто?",
    a: "Так. У портфоліо студії — Bentley, Lamborghini, Lexus та інші. Кожне авто отримує однаково уважний підхід.",
  },
] as const;

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
    url: BASE_URL,
  };

  return (
    <section id="faq" className="relative py-24 sm:py-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="container-x">
        <Reveal>
          <div className="flex justify-center">
            <span className="eyebrow inline-flex items-center gap-3">
              <span className="hairline inline-block h-px w-10" aria-hidden />
              Питання
              <span className="hairline inline-block h-px w-10" aria-hidden />
            </span>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <h2 className="mt-5 text-center font-display text-[clamp(1.7rem,3.6vw,3.1rem)] font-bold uppercase leading-[1.12] tracking-tight">
            <span className="chrome-text">Часті</span>{" "}
            <span className="text-ivory">питання</span>
          </h2>
        </Reveal>

        <div className="mx-auto mt-12 flex max-w-3xl flex-col gap-4">
          {FAQ_ITEMS.map((item, i) => {
            const isOpen = open === i;
            const num = String(i + 1).padStart(2, "0");
            return (
              <motion.div
                key={item.q}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.7, delay: i * 0.08, ease: EASE }}
              >
                <GlassCard
                  className={`group relative ${
                    isOpen
                      ? "border-neon/40 shadow-[0_28px_70px_-35px_rgba(77,201,246,0.4)]"
                      : ""
                  }`}
                >
                  {/* верхнє акцентне ребро */}
                  <span
                    aria-hidden
                    className={`pointer-events-none absolute left-0 top-0 z-10 h-px w-full bg-gradient-to-r from-transparent via-neon to-transparent transition-opacity duration-500 ${
                      isOpen ? "opacity-80" : "opacity-0 group-hover:opacity-60"
                    }`}
                  />

                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${i}`}
                    className="flex w-full items-center gap-4 p-5 text-left sm:gap-6 sm:p-6"
                  >
                    <span
                      aria-hidden
                      style={{ WebkitTextStroke: "1.5px rgba(77,201,246,0.4)" }}
                      className={`text-outline-neon font-display text-3xl font-extrabold leading-none transition-all duration-500 sm:text-4xl ${
                        isOpen
                          ? "text-neon drop-shadow-[0_0_12px_rgba(77,201,246,0.5)]"
                          : "group-hover:text-neon"
                      }`}
                    >
                      {num}
                    </span>

                    <span
                      className={`font-display flex-1 text-sm uppercase tracking-wide transition-colors duration-300 sm:text-base ${
                        isOpen ? "text-neon" : "text-ivory group-hover:text-neon-light"
                      }`}
                    >
                      {item.q}
                    </span>

                    <span
                      className={`flex size-9 shrink-0 items-center justify-center rounded-full border backdrop-blur-md transition-all duration-300 ${
                        isOpen
                          ? "border-neon/50 bg-neon/10 shadow-[0_0_20px_-4px_rgba(77,201,246,0.4)]"
                          : "border-white/10 bg-night/40 group-hover:border-neon/40"
                      }`}
                    >
                      <motion.svg
                        animate={{ rotate: isOpen ? 45 : 0 }}
                        transition={{ duration: 0.35, ease: EASE }}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        aria-hidden
                        className={`size-4 transition-colors duration-300 ${
                          isOpen ? "text-neon" : "text-mist group-hover:text-neon-light"
                        }`}
                      >
                        <path d="M12 5v14M5 12h14" />
                      </motion.svg>
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`faq-answer-${i}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: EASE }}
                        className="overflow-hidden"
                      >
                        <div className="flex gap-4 px-5 pb-6 sm:gap-5 sm:px-6 sm:pb-7">
                          <span
                            aria-hidden
                            className="w-px shrink-0 self-stretch bg-gradient-to-b from-neon/70 via-neon/25 to-transparent"
                          />
                          <p className="text-sm leading-[1.7] text-mist">{item.a}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
