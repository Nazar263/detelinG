"use client";

import { useMemo, type CSSProperties, useSyncExternalStore } from "react";
import { motion } from "framer-motion";
import { SITE } from "@/lib/data";
import { track } from "@/lib/analytics";
import {
  ArrowUpRightIcon,
  ClockIcon,
  InstagramIcon,
  MapPinIcon,
  PhoneIcon,
} from "./icons";

const EASE = [0.22, 1, 0.36, 1] as const;
const VIEWPORT = { once: true, margin: "-15% 0px" } as const;

/** fade in up 24px → 0 */
const rise = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: VIEWPORT,
  transition: { duration: 0.7, delay, ease: EASE },
});

/** fade in right 24px → 0 + scale 0.98 → 1 (для карти) */
const riseRight = (delay: number) => ({
  initial: { opacity: 0, x: 24, scale: 0.98 },
  whileInView: { opacity: 1, x: 0, scale: 1 },
  viewport: VIEWPORT,
  transition: { duration: 0.7, delay, ease: EASE },
});

/** Поточний статус роботи студії: Пн–Пт 09–19, Сб 10–18, Нд — зачинено.
 *  Час оновлюється кожні 60с через useSyncExternalStore (без setState в ефекті). */

let cachedNow: Date = new Date();
const timeListeners = new Set<() => void>();
let timeInterval: ReturnType<typeof setInterval> | null = null;

function subscribeTime(callback: () => void) {
  timeListeners.add(callback);
  cachedNow = new Date();
  if (timeListeners.size === 1) {
    timeInterval = setInterval(() => {
      cachedNow = new Date();
      timeListeners.forEach((cb) => cb());
    }, 60000);
  }
  return () => {
    timeListeners.delete(callback);
    if (timeListeners.size === 0 && timeInterval) {
      clearInterval(timeInterval);
      timeInterval = null;
    }
  };
}

const getNowSnapshot = () => cachedNow;
const getNowServerSnapshot = (): Date | null => null;

function useOpenStatus() {
  const now = useSyncExternalStore(subscribeTime, getNowSnapshot, getNowServerSnapshot);

  const open = useMemo(() => {
    if (!now) return false;
    const day = now.getDay();
    const minutes = now.getHours() * 60 + now.getMinutes();
    if (day >= 1 && day <= 5) return minutes >= 9 * 60 && minutes < 19 * 60;
    if (day === 6) return minutes >= 10 * 60 && minutes < 18 * 60;
    return false;
  }, [now]);

  // рядок у SITE.hours, що відповідає сьогоднішньому дню: 0 = Пн–Пт, 1 = Субота, 2 = Неділя
  const activeRow = now ? (now.getDay() === 0 ? 2 : now.getDay() === 6 ? 1 : 0) : -1;

  return { open, activeRow, now };
}

export default function Contacts() {
  const { open, activeRow, now } = useOpenStatus();

  const items = [
    {
      icon: MapPinIcon,
      label: "Адреса",
      value: SITE.address,
      href: SITE.googleMaps,
      external: true,
      event: "maps_click" as const,
    },
    {
      icon: PhoneIcon,
      label: "Телефон",
      value: SITE.phone,
      href: SITE.phoneHref,
      external: false,
      event: "phone_click" as const,
    },
    {
      icon: InstagramIcon,
      label: "Instagram",
      value: SITE.instagramHandle,
      href: SITE.instagram,
      external: true,
      event: "instagram_click" as const,
    },
  ];

  return (
    <section id="kontakty" className="relative overflow-hidden py-24 sm:py-32">
      <div className="container-x">
        {/* заголовок: 0ms лейбл → 150ms H2 → 300ms підтекст */}
        <div className="flex flex-col items-center gap-5 text-center">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.6, delay: 0, ease: EASE }}
            className="eyebrow inline-flex items-center gap-3"
          >
            <span className="hairline inline-block h-px w-10" aria-hidden />
            Контакти
            <span className="hairline inline-block h-px w-10" aria-hidden />
          </motion.span>

          <motion.h2
            {...rise(0.15)}
            className="font-display text-[clamp(1.7rem,3.6vw,3.1rem)] font-bold uppercase leading-[1.12] tracking-tight"
          >
            Завітайте на <span className="chrome-text">огляд</span>
          </motion.h2>

          <motion.p {...rise(0.3)} className="max-w-xl text-base leading-relaxed text-mist">
            Студія у Львові, вул. Міцна, 2. Кава за наш рахунок — огляд теж.
          </motion.p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {/* ліва колонка — картки */}
          <div className="flex flex-col gap-4">
            {items.map((item, i) => (
              <motion.a
                key={item.label}
                {...rise(i * 0.15)}
                href={item.href}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noopener noreferrer" : undefined}
                aria-label={`${item.label}: ${item.value}`}
                onClick={() => track(item.event, { location: "contacts" })}
                className="arrow-nudge-on-hover group flex items-center gap-5 rounded-2xl border border-white/[0.08] bg-white/[0.04] px-6 py-5 backdrop-blur-[12px] transition-all duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-[4px] hover:border-aqua/35"
              >
                <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-aqua/15 text-aqua">
                  <item.icon className="size-5" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-alt text-[11px] font-semibold uppercase tracking-[0.22em] text-mist">
                    {item.label}
                  </span>
                  <span className="mt-1 block truncate font-semibold text-ivory transition-colors group-hover:text-ivory">
                    {item.value}
                  </span>
                </span>
                <ArrowUpRightIcon className="arrow-nudge size-4 shrink-0 text-mist transition-colors duration-300 group-hover:text-aqua" />
              </motion.a>
            ))}

            {/* годин роботи + динамічний статус */}
            <motion.div
              {...rise(0.45)}
              className="rounded-2xl border border-white/[0.08] bg-white/[0.04] p-7 backdrop-blur-[12px] transition-all duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
            >
              <span className="flex flex-wrap items-center gap-x-4 gap-y-2">
                <span className="flex items-center gap-3 font-alt text-[11px] font-semibold uppercase tracking-[0.22em] text-mist">
                  <ClockIcon className="size-4 text-aqua" />
                  Години роботи
                </span>
                {/* динамічний статус: відчинено / зачинено */}
                {now !== null && (
                  <span className="ml-auto inline-flex items-center gap-2 text-xs font-semibold">
                    <span
                      className="pulse-dot size-2 rounded-full"
                      style={
                        {
                          backgroundColor: open ? "#22C55E" : "#FF4444",
                          "--pulse-color": open
                            ? "rgba(34,197,94,0.5)"
                            : "rgba(255,68,68,0.5)",
                        } as CSSProperties
                      }
                    />
                    <span style={{ color: open ? "#22C55E" : "#FF4444" }}>
                      {open ? "Зараз відчинено" : "Зараз зачинено"}
                    </span>
                  </span>
                )}
              </span>

              <ul className="mt-4 flex flex-col gap-2.5 text-sm">
                {SITE.hours.map((h, i) => (
                  <li
                    key={h.days}
                    className={`flex items-baseline justify-between gap-4 border-b border-white/[0.08] pb-2.5 transition-opacity duration-300 last:border-0 last:pb-0 ${
                      activeRow === i ? "text-ivory" : "opacity-50"
                    }`}
                  >
                    <span>{h.days}</span>
                    <span>{h.time}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* карта — fade in right + scale */}
          <motion.div
            {...riseRight(0.65)}
            className="group min-h-[420px]"
          >
            <div className="relative h-full min-h-[420px] overflow-hidden rounded-2xl border border-white/[0.08] transition-[border-color] duration-300 group-hover:border-aqua/35">
              <iframe
                title="KrosCar Detailing на карті — вул. Міцна, 2, Львів"
                src={SITE.googleMapsEmbed}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                className="size-full min-h-[420px] border-0 [filter:grayscale(1)_invert(0.92)_contrast(0.85)_brightness(0.92)_hue-rotate(180deg)]"
              />
              {/* кнопка «Відкрити на Картах» */}
              <a
                href={SITE.googleMaps}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track("maps_click", { location: "contacts_map" })}
                className="group absolute bottom-4 right-4 z-10 inline-flex items-center gap-2 rounded-full border border-white/15 bg-night/70 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-ivory backdrop-blur-md transition-all duration-300 hover:border-aqua hover:bg-aqua hover:text-white"
              >
                Відкрити на Картах
                <ArrowUpRightIcon className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
