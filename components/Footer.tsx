"use client";

import { useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { NAV, SITE } from "@/lib/data";
import { track } from "@/lib/analytics";
import PrivacyModal from "./PrivacyModal";
import { InstagramIcon, PhoneIcon } from "./icons";

export default function Footer() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const bigX = useTransform(scrollYProgress, [0, 1], ["6%", "-6%"]);
  const year = new Date().getFullYear();

  return (
    <footer ref={ref} className="relative overflow-hidden border-t border-white/10 bg-coal/60">
      {/* гігантський scroll-текст */}
      <div aria-hidden className="pointer-events-none relative select-none pt-10">
        <motion.p
          style={reduce ? undefined : { x: bigX }}
          className="text-outline whitespace-nowrap text-center font-display text-[16vw] font-extrabold uppercase leading-none tracking-tight"
        >
          KROSCAR
        </motion.p>
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-coal to-transparent" />
      </div>

      <div className="container-x flex flex-col gap-10 pb-10 pt-14">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-start">
          <div className="max-w-xs">
            <a href="#top" className="font-display text-lg tracking-[0.22em] text-ivory">
              KROS<span className="chrome-text">CAR</span>
            </a>
            <p className="mt-3 text-sm leading-relaxed text-mist">
              Детейлінг-студія у Львові. Хімчистка, полірування, кераміка — блиск, який видно.
            </p>
          </div>

          <nav className="flex flex-wrap gap-x-6 gap-y-2.5" aria-label="Швидкі посилання">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm text-mist transition-colors hover:text-neon-light"
              >
                {item.label}
              </a>
            ))}
            <a href="#zapis" className="text-sm font-semibold text-neon-light transition-colors hover:text-neon">
              Записатися
            </a>
          </nav>

          <div className="flex flex-col gap-3">
            <a
              href={SITE.phoneHref}
              onClick={() => track("phone_click", { location: "footer" })}
              className="inline-flex items-center gap-2.5 text-sm font-semibold text-ivory transition-colors hover:text-neon-light"
            >
              <PhoneIcon className="size-4 text-neon" />
              {SITE.phone}
            </a>
            <a
              href={SITE.instagram}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track("instagram_click", { location: "footer" })}
              className="inline-flex items-center gap-2.5 text-sm text-mist transition-colors hover:text-neon-light"
            >
              <InstagramIcon className="size-4 text-neon" />
              {SITE.instagramHandle}
            </a>
          </div>
        </div>

        <div className="flex flex-col items-start justify-between gap-3 border-t border-white/5 pt-6 text-xs text-mist sm:flex-row sm:items-center">
          <p>
            © {year} {SITE.name}. Всі права захищено.
          </p>
          <p>{SITE.address}</p>
          <button
            type="button"
            onClick={() => {
              setPrivacyOpen(true);
              track("privacy_open", { location: "footer" });
            }}
            className="underline-offset-2 transition-colors hover:text-neon-light hover:underline"
          >
            Політика конфіденційності
          </button>
        </div>

        {/* розробник */}
        <div className="flex justify-center border-t border-white/5 pt-4">
          <a
            href="https://freelance-ua.agency"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] text-mist/80 transition-colors hover:text-neon-light"
          >
            Розробка — Freelance UA || Digital Agency
          </a>
        </div>
      </div>

      <PrivacyModal open={privacyOpen} onClose={() => setPrivacyOpen(false)} />
    </footer>
  );
}
