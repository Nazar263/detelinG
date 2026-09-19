"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { XIcon } from "./icons";

const EASE = [0.22, 1, 0.36, 1] as const;

type Props = {
  open: boolean;
  onClose: () => void;
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="font-alt text-[13px] font-bold uppercase tracking-[0.14em] text-neon">
        {title}
      </h3>
      <div className="mt-2 space-y-2 text-sm leading-[1.7] text-white/75">{children}</div>
    </div>
  );
}

export default function PrivacyModal({ open, onClose }: Props) {
  // закриття по Escape + блокування скролу сторінки
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          className="fixed inset-0 z-[100] flex items-end justify-center bg-night/85 backdrop-blur-sm sm:items-center sm:p-6"
          role="presentation"
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="privacy-modal-title"
            initial={{ opacity: 0, y: 32, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.35, ease: EASE }}
            onClick={(e) => e.stopPropagation()}
            className="relative flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-t-[20px] border border-white/[0.08] bg-[#0E0E15] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)] sm:rounded-[20px]"
          >
            {/* шапка */}
            <div className="flex items-start justify-between gap-4 border-b border-white/[0.08] px-7 py-6">
              <div>
                <span className="eyebrow inline-flex items-center gap-3">
                  <span className="hairline inline-block h-px w-8" aria-hidden />
                  Документи
                </span>
                <h2
                  id="privacy-modal-title"
                  className="mt-2 font-display text-lg font-bold uppercase tracking-tight text-ivory sm:text-xl"
                >
                  Політика конфіденційності
                </h2>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Закрити"
                className="mt-1 inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-white/10 text-mist transition-all duration-300 hover:border-neon/60 hover:text-neon active:scale-95"
              >
                <XIcon className="size-5" />
              </button>
            </div>

            {/* текст */}
            <div className="space-y-7 overflow-y-auto px-7 py-6">
              <p className="text-sm leading-[1.7] text-white/75">
                Ця політика описує, як детейлінг-студія KrosCar збирає та використовує
                персональні дані, які ви залишаєте через форму запису на сайті.
              </p>

              <Section title="1. Які дані ми збираємо">
                <p>
                  Через форму запису ви можете надати: ім&rsquo;я, номер телефону, марку та
                  модель автомобіля, обрану послугу, зручний час візиту та коментар до
                  заявки (за бажанням).
                </p>
              </Section>

              <Section title="2. Мета обробки">
                <p>
                  Дані використовуються виключно для зворотного зв&rsquo;язку: щоб ми могли
                  підтвердити запис, уточнити деталі замовлення та узгодити зручний час
                  візиту до студії.
                </p>
              </Section>

              <Section title="3. Передача третім особам">
                <p>
                  Ми не продаємо, не передаємо та не розкриваємо ваші персональні дані
                  третім особам. Доступ до них мають лише співробітники KrosCar, залучені
                  до обробки заявок.
                </p>
              </Section>

              <Section title="4. Зберігання та захист">
                <p>
                  Заявки зберігаються в захищеному режимі та лише стільки часу, скільки
                  потрібно для обробки запису. Ви можете попросити видалити свої дані,
                  зателефонувавши нам або написавши в Instagram.
                </p>
              </Section>

              <Section title="5. Ваша згода">
                <p>
                  Надсилаючи заявку, ви підтверджуєте, що ознайомилися з цією політикою та
                  даєте згоду на обробку зазначених персональних даних на зазначених
                  умовах.
                </p>
              </Section>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
