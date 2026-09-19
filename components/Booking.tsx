"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { bookingSchema, type BookingInput } from "@/lib/validation";
import { SERVICE_OPTIONS, SITE, TIME_SLOTS } from "@/lib/data";
import { track } from "@/lib/analytics";
import { PREFILL_SERVICE_EVENT } from "@/lib/prefill";
import Magnetic from "./Magnetic";
import PrivacyModal from "./PrivacyModal";
import { ArrowRightIcon, ClockIcon, InstagramIcon, PhoneIcon } from "./icons";

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

const formFade = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" } as const,
  transition: { duration: 0.6, delay, ease: EASE },
});

function Err({ msg }: { msg?: string }) {
  return msg ? <p className="mt-1.5 text-xs" style={{ color: "#FF4444" }}>{msg}</p> : null;
}

const titleLines = ["Займіть місце", "на цьому", "тижні"];

export default function Booking() {
  const [sent, setSent] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const started = useRef(false);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<BookingInput>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      name: "",
      phone: "",
      service: "",
      car: "",
      time: "Гнучкий графік",
      comment: "",
      website: "",
    },
  });

  // Auto-reset success after 7s (щоб встигли прочитати/зробити скріншот)
  useEffect(() => {
    if (!sent) return;
    const t = setTimeout(() => {
      setSent(false);
      reset();
    }, 7000);
    return () => clearTimeout(t);
  }, [sent, reset]);

  // Pre-fill послуги з карток Services
  useEffect(() => {
    const handler = (e: Event) =>
      setValue("service", (e as CustomEvent<string>).detail, { shouldValidate: true });
    window.addEventListener(PREFILL_SERVICE_EVENT, handler);
    return () => window.removeEventListener(PREFILL_SERVICE_EVENT, handler);
  }, [setValue]);

  // Мікроконверсія: перший фокус на полі форми
  const onFirstInteract = () => {
    if (started.current) return;
    started.current = true;
    track("form_start");
  };

  const onSubmit = handleSubmit(async (data) => {
    setServerError(null);
    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("server");
      setSent(true);
      track("generate_lead", { service: data.service });
    } catch {
      setServerError("error");
    }
  });

  return (
    <section id="zapis" className="relative overflow-hidden py-24 sm:py-32">
      <div className="container-x grid gap-14 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
        {/* ліва колонка */}
        <div className="flex flex-col justify-center lg:sticky lg:top-28 lg:self-start">
          {/* Eyebrow */}
          <motion.div {...fadeLeft(0)}>
            <span className="eyebrow inline-flex items-center gap-3">
              <span className="hairline inline-block h-px w-10" aria-hidden />
              Запис
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
                {i === 2 ? (
                  <span className="chrome-text">{line}</span>
                ) : (
                  line
                )}
              </motion.span>
            ))}
          </h2>

          {/* Subtitle */}
          <motion.p {...fadeUp(0.6)} className="mt-6 max-w-xl text-base leading-relaxed text-mist">
            Залиште заявку — передзвонимо протягом робочого дня, відповімо на питання та підберемо зручний час.
          </motion.p>

          {/* Phone */}
          <motion.div {...fadeUp(0.75)} className="mt-9">
            <Magnetic strength={0.2} className="w-fit">
              <a
                href={SITE.phoneHref}
                onClick={() => track("phone_click", { location: "booking" })}
                className="group inline-flex items-center gap-3 font-display text-2xl text-ivory transition-colors hover:text-neon sm:text-3xl"
              >
                <span className="glass flex size-12 items-center justify-center rounded-full text-neon transition-all duration-300 group-hover:border-neon/50 group-hover:text-neon">
                  <PhoneIcon className="size-5" />
                </span>
                {SITE.phone}
              </a>
            </Magnetic>
          </motion.div>

          {/* Hours */}
          <motion.div {...fadeUp(0.9)} className="mt-6 flex flex-col gap-1.5 text-sm text-mist">
            {SITE.hours.map((h) => (
              <p key={h.days} className="flex items-center gap-2">
                <ClockIcon className="size-4 text-neon" />
                <span className="w-24 text-ivory/80">{h.days}</span> {h.time}
              </p>
            ))}
          </motion.div>

          {/* Instagram */}
          <motion.a
            {...fadeUp(1.05)}
            href={SITE.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex w-fit items-center gap-2 text-sm font-semibold text-mist transition-all duration-300 hover:text-neon hover:underline hover:underline-offset-4"
            onClick={() => track("instagram_click", { location: "booking" })}
          >
            <InstagramIcon className="size-4" />
            {SITE.instagramHandle}
          </motion.a>
        </div>

        {/* форма — glassmorphism */}
        <motion.div
          initial={{ opacity: 0, x: 24, scale: 0.98 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          viewport={{ once: true, margin: "-70px" }}
          transition={{ duration: 0.8, ease: EASE }}
          className="rounded-[20px] p-9"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
          }}
        >
          <AnimatePresence mode="wait">
            {sent ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, ease: EASE }}
                className="flex min-h-[480px] flex-col items-center justify-center text-center"
              >
                <motion.svg viewBox="0 0 72 72" className="size-20" fill="none" aria-hidden>
                  <motion.circle
                    cx="36" cy="36" r="32"
                    stroke="#22C55E"
                    strokeWidth="2.5"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                  />
                  <motion.path
                    d="M22 37.5 32 47l18-20"
                    stroke="#22C55E"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.5, delay: 0.55, ease: "easeOut" }}
                  />
                </motion.svg>
                <h3 className="mt-7 font-display text-xl uppercase text-ivory sm:text-2xl">
                  ✓ Заявку надіслано
                </h3>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-mist">
                  Ми зателефонуємо найближчим часом. До зустрічі на KrosCar!
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                noValidate
                onSubmit={onSubmit}
                onFocus={onFirstInteract}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col gap-5"
              >
                {/* honeypot — приховане поле від ботів */}
                <div className="hidden" aria-hidden="true">
                  <label htmlFor="website">Не заповнюйте це поле</label>
                  <input
                    id="website"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    {...register("website")}
                  />
                </div>

                {/* Row 1: Name + Phone */}
                <div className="grid gap-5 sm:grid-cols-2">
                  <motion.div {...formFade(0.2)}>
                    <label htmlFor="name" className="block mb-1.5 text-[11px] font-semibold uppercase tracking-[0.08em]" style={{ color: "rgba(255,255,255,0.5)" }}>
                      {"Ім\u2019я *"}
                    </label>
                    <input
                      id="name"
                      type="text"
                      autoComplete="name"
                      placeholder="Ваше ім'я"
                      className="booking-input"
                      aria-invalid={!!errors.name}
                      {...register("name")}
                    />
                    <Err msg={errors.name?.message} />
                  </motion.div>
                  <motion.div {...formFade(0.3)}>
                    <label htmlFor="phone" className="block mb-1.5 text-[11px] font-semibold uppercase tracking-[0.08em]" style={{ color: "rgba(255,255,255,0.5)" }}>
                      Телефон *
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      autoComplete="tel"
                      placeholder="073 353 79 77"
                      className="booking-input"
                      aria-invalid={!!errors.phone}
                      {...register("phone")}
                    />
                    <Err msg={errors.phone?.message} />
                  </motion.div>
                </div>

                {/* Row 2: Service */}
                <motion.div {...formFade(0.4)}>
                  <label htmlFor="service" className="block mb-1.5 text-[11px] font-semibold uppercase tracking-[0.08em]" style={{ color: "rgba(255,255,255,0.5)" }}>
                    Послуга *
                  </label>
                  <select
                    id="service"
                    className="booking-input"
                    aria-invalid={!!errors.service}
                    {...register("service")}
                  >
                    <option value="">Оберіть послугу</option>
                    {SERVICE_OPTIONS.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                  <Err msg={errors.service?.message} />
                </motion.div>

                {/* Row 3: Car + Time */}
                <div className="grid gap-5 sm:grid-cols-2">
                  <motion.div {...formFade(0.5)}>
                    <label htmlFor="car" className="block mb-1.5 text-[11px] font-semibold uppercase tracking-[0.08em]" style={{ color: "rgba(255,255,255,0.5)" }}>
                      Марка та модель авто *
                    </label>
                    <input
                      id="car"
                      type="text"
                      placeholder="Напр. BMW 5 Series"
                      className="booking-input"
                      aria-invalid={!!errors.car}
                      {...register("car")}
                    />
                    <Err msg={errors.car?.message} />
                  </motion.div>
                  <motion.div {...formFade(0.5)}>
                  <label htmlFor="time" className="block mb-1.5 text-[11px] font-semibold uppercase tracking-[0.08em]" style={{ color: "rgba(255,255,255,0.5)" }}>
                    Зручний час (опційно)
                  </label>
                  <select
                    id="time"
                    className="booking-input"
                    {...register("time")}
                  >
                    {TIME_SLOTS.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                  <Err msg={errors.time?.message} />
                  </motion.div>
                </div>

                {/* Row 4: Comment */}
                <motion.div {...formFade(0.6)}>
                  <label htmlFor="comment" className="block mb-1.5 text-[11px] font-semibold uppercase tracking-[0.08em]" style={{ color: "rgba(255,255,255,0.5)" }}>
                    Коментар
                  </label>
                  <textarea
                    id="comment"
                    rows={3}
                    placeholder={"Опишіть завдання (необов\u2019язково)"}
                    className="booking-input resize-none"
                    {...register("comment")}
                  />
                  <Err msg={errors.comment?.message} />
                </motion.div>

                {/* Server error */}
                {serverError && (
                  <div className="rounded-xl border px-4 py-3 text-sm" style={{ borderColor: "rgba(255,68,68,0.3)", background: "rgba(255,68,68,0.1)", color: "#FF4444" }}>
                    Помилка. Спробуйте ще раз або зателефонуйте:{" "}
                    <a
                      href={SITE.phoneHref}
                      onClick={() => track("phone_click", { location: "form_error" })}
                      className="font-semibold underline underline-offset-2"
                    >
                      {SITE.phone}
                    </a>
                  </div>
                )}

                {/* Submit button */}
                <motion.div {...formFade(0.7)}>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="booking-submit group relative w-full"
                  >
                    {isSubmitting ? (
                      <span className="inline-flex items-center gap-2">
                        <svg className="size-4 animate-spin" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Відправляємо...
                      </span>
                    ) : (
                      <>
                        Надіслати заявку
                        <ArrowRightIcon className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </>
                    )}
                  </button>
                  <p className="mt-3 text-center text-xs text-mist">
                    Натискаючи кнопку, ви погоджуєтесь на{" "}
                    <button
                      type="button"
                      onClick={() => {
                        setPrivacyOpen(true);
                        track("privacy_open", { location: "form" });
                      }}
                      className="underline decoration-white/30 underline-offset-2 transition-colors duration-300 hover:text-neon hover:decoration-neon/60"
                    >
                      обробку персональних даних
                    </button>
                    .
                  </p>
                </motion.div>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      <PrivacyModal open={privacyOpen} onClose={() => setPrivacyOpen(false)} />
    </section>
  );
}
