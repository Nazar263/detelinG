"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { BEFORE_AFTER } from "@/lib/data";
import Reveal from "./Reveal";
import { ChevronsLeftRightIcon } from "./icons";

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

function Compare({
  before,
  after,
  title,
  note,
}: {
  before: string;
  after: string;
  title: string;
  note: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const pos = useMotionValue(50);
  const posLeft = useTransform(pos, (v) => `${v}%`);
  const posClip = useTransform(pos, (v) => `inset(0 ${100 - v}% 0 0)`);
  const [hintVisible, setHintVisible] = useState(true);
  const isDesktop = useRef(false);

  // Check if desktop on mount
  useEffect(() => {
    isDesktop.current = window.matchMedia("(min-width: 1024px)").matches;
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!isDesktop.current) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      pos.set(clamp(x, 2, 98));
      if (hintVisible) setHintVisible(false);
    },
    [pos, hintVisible]
  );

  const handleMouseLeave = useCallback(() => {
    if (!isDesktop.current) return;
    pos.set(50);
  }, [pos]);

  // Mobile: touch drag
  const dragging = useRef(false);
  const updateTouch = (clientX: number) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    pos.set(clamp(((clientX - rect.left) / rect.width) * 100, 2, 98));
  };

  return (
    <Reveal>
      <figure className="group">
        <div className="glass rounded-3xl p-2.5 transition-all duration-500 group-hover:border-neon/30">
          <div
            ref={ref}
            className="relative aspect-[16/10] cursor-ew-resize touch-pan-y select-none overflow-hidden rounded-[1.15rem]"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onPointerDown={(e) => {
              if (isDesktop.current) return;
              dragging.current = true;
              e.currentTarget.setPointerCapture(e.pointerId);
              updateTouch(e.clientX);
            }}
            onPointerMove={(e) => {
              if (!isDesktop.current && dragging.current) updateTouch(e.clientX);
            }}
            onPointerUp={() => (dragging.current = false)}
            onPointerCancel={() => (dragging.current = false)}
          >
            {/* ПІСЛЯ — bottom layer */}
            <Image
              src={after}
              alt={`Після: ${title}`}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              draggable={false}
            />

            {/* ДО — top layer, clipped */}
            <motion.div className="absolute inset-0" style={{ clipPath: posClip }}>
              <Image
                src={before}
                alt={`До: ${title}`}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                draggable={false}
              />
            </motion.div>

            {/* Divider shadow */}
            <motion.div
              aria-hidden
              className="pointer-events-none absolute inset-y-0 w-20 -translate-x-full bg-gradient-to-r from-transparent to-night/50"
              style={{ left: posLeft }}
            />

            {/* Divider line */}
            <motion.div
              aria-hidden
              className="pointer-events-none absolute inset-y-0 w-[2px] bg-white/80"
              style={{
                left: posLeft,
                transition: "left 0.1s ease",
              }}
            />

            {/* Handle */}
            <motion.div
              aria-hidden
              className="pointer-events-none absolute top-1/2 z-10 flex size-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/60 bg-night/70 text-white backdrop-blur-md transition-transform duration-300 group-hover:scale-110"
              style={{ left: posLeft }}
            >
              <ChevronsLeftRightIcon className="size-5" />
            </motion.div>

            {/* DO badge */}
            <span className="pointer-events-none absolute left-4 top-4 rounded-full bg-night/70 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-ivory backdrop-blur-md">
              До
            </span>

            {/* ПІСЛЯ badge */}
            <span className="pointer-events-none absolute right-4 top-4 rounded-full bg-neon px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-night">
              Після
            </span>

            {/* Hint — first load */}
            {hintVisible && (
              <div className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5">
                <span className="scroll-arrow text-white/70">
                  <ChevronsLeftRightIcon className="size-5" />
                </span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-white/50 animate-pulse">
                  Наведіть курсор
                </span>
              </div>
            )}
          </div>
        </div>
        <figcaption className="mt-4 flex flex-wrap items-baseline justify-between gap-2 px-2">
          <span className="font-display text-sm uppercase tracking-wide text-ivory">{title}</span>
          <span className="text-xs text-mist">{note}</span>
        </figcaption>
      </figure>
    </Reveal>
  );
}

export default function BeforeAfter() {
  return (
    <section id="do-pislya" className="relative py-24 sm:py-32">
      <div className="container-x">
        <Reveal>
          <div className="flex justify-center">
            <span className="eyebrow inline-flex items-center gap-3">
              <span className="hairline inline-block h-px w-10" aria-hidden />
              До / Після
              <span className="hairline inline-block h-px w-10" aria-hidden />
            </span>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <h2 className="mt-5 text-center font-display text-[clamp(1.7rem,3.6vw,3.1rem)] font-bold uppercase leading-[1.12] tracking-tight">
            <span className="chrome-text">Різниця</span>{" "}
            <span className="text-ivory">яку не треба пояснювати</span>
          </h2>
        </Reveal>

        <Reveal delay={0.3}>
          <p className="mx-auto mt-4 max-w-[600px] text-center text-base leading-relaxed text-mist">
            Наведіть курсор — і подивіться, що робить професійний детейлінг.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-8 lg:grid-cols-2 lg:gap-10">
          {BEFORE_AFTER.map((pair) => (
            <Compare
              key={pair.title}
              before={pair.before}
              after={pair.after}
              title={pair.title}
              note={pair.note}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
