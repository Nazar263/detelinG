"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { NAV, SITE } from "@/lib/data";
import { track } from "@/lib/analytics";
import { InstagramIcon, MenuIcon, PhoneIcon, XIcon } from "./icons";
import Magnetic from "./Magnetic";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.4 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Escape закриває мобільне меню
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      {/* лінія прогресу сторінки */}
      <motion.div
        aria-hidden
        className="fixed inset-x-0 top-0 z-50 h-[2px] origin-left bg-gradient-to-r from-neon-deep via-neon to-neon-light"
        style={{ scaleX: progress }}
      />

      <header className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${scrolled ? "pt-3" : "pt-0"}`}>
        <div className="container-x">
          <div
            className={`flex h-[64px] items-center justify-between gap-4 transition-all duration-500 ${
              scrolled
                ? "glass rounded-2xl px-5 shadow-[0_18px_50px_-25px_rgba(0,0,0,0.9)] sm:px-7"
                : "bg-gradient-to-b from-night/80 to-transparent"
            }`}
          >
            <a
              href="#top"
              className="font-display text-base tracking-[0.22em] text-ivory"
              aria-label="KrosCar — на початок"
            >
              KROS<span className="chrome-text">CAR</span>
            </a>

            <nav className="hidden items-center gap-7 lg:flex" aria-label="Основна навігація">
              {NAV.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="group relative text-[12px] font-semibold uppercase tracking-wider text-ivory/70 transition-colors hover:text-neon-light"
                >
                  {item.label}
                  <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-neon transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-2.5 sm:gap-3">
              {/* телефон: іконка на lg, текст на xl */}
              <a
                href={SITE.phoneHref}
                aria-label={`Зателефонувати ${SITE.phone}`}
                onClick={() => track("phone_click", { location: "header" })}
                className="glass hidden size-11 items-center justify-center rounded-full text-neon transition-colors hover:text-neon-light lg:flex xl:hidden"
              >
                <PhoneIcon className="size-5" />
              </a>
              <a
                href={SITE.phoneHref}
                onClick={() => track("phone_click", { location: "header" })}
                className="hidden items-center gap-2 text-sm font-semibold text-ivory transition-colors hover:text-neon-light xl:flex"
              >
                <PhoneIcon className="size-4 text-neon" />
                {SITE.phone}
              </a>
              <Magnetic strength={0.2}>
                <a
                  href="#zapis"
                  onClick={() => track("cta_click", { location: "header" })}
                  className="btn-neon px-3.5! py-2! text-[11px]! sm:px-6! sm:py-2.5! sm:text-sm!"
                >
                  <span className="sm:hidden">Запис</span>
                  <span className="hidden sm:inline">Записатися</span>
                </a>
              </Magnetic>
              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                aria-label={open ? "Закрити меню" : "Відкрити меню"}
                className="glass flex size-11 items-center justify-center rounded-full text-ivory transition-colors hover:border-neon/50 hover:text-neon-light lg:hidden"
              >
                {open ? <XIcon className="size-5" /> : <MenuIcon className="size-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-30 flex flex-col bg-night/95 pt-24 backdrop-blur-xl lg:hidden"
          >
            <nav className="container-x flex flex-col gap-1" aria-label="Мобільна навігація">
              {NAV.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -28 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="border-b border-white/5 py-4 font-display text-lg uppercase tracking-wider text-ivory transition-colors hover:text-neon-light"
                >
                  {item.label}
                </motion.a>
              ))}
            </nav>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="container-x mt-auto flex flex-col gap-4 pb-10"
            >
              <a href="#zapis" onClick={() => setOpen(false)} className="btn-neon w-full">
                Записатися
              </a>
              <div className="flex items-center justify-between text-sm text-ivory/60">
                <a
                  href={SITE.phoneHref}
                  onClick={() => track("phone_click", { location: "mobile_menu" })}
                  className="flex items-center gap-2 font-semibold text-ivory"
                >
                  <PhoneIcon className="size-4 text-neon" /> {SITE.phone}
                </a>
                <a
                  href={SITE.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => track("instagram_click", { location: "mobile_menu" })}
                  className="flex items-center gap-2 hover:text-neon-light"
                  aria-label="Instagram"
                >
                  <InstagramIcon className="size-5" /> Instagram
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
