"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { motion, useReducedMotion } from "framer-motion";
import { GALLERY } from "@/lib/data";
import Reveal from "./Reveal";
import { ChevronLeftIcon, ChevronRightIcon } from "./icons";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Gallery() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    slidesToScroll: 1,
  });
  const reduce = useReducedMotion();

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  useEffect(() => {
    if (!emblaApi || reduce) return;
    const interval = setInterval(() => emblaApi.scrollNext(), 5000);
    return () => clearInterval(interval);
  }, [emblaApi, reduce]);

  return (
    <section id="galereya" className="relative py-20 sm:py-28">
      <div className="container-x">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-70px" }}
          transition={{ duration: 0.8, ease: EASE }}
          className="flex justify-center"
        >
          <span className="eyebrow inline-flex items-center gap-3">
            <span className="hairline inline-block h-px w-10" aria-hidden />
            Галерея
            <span className="hairline inline-block h-px w-10" aria-hidden />
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-70px" }}
          transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
          className="mt-5 text-center font-display text-[clamp(1.7rem,3.6vw,3.1rem)] font-bold uppercase leading-[1.12] tracking-tight"
        >
          <span className="chrome-text">Наші роботи</span>{" "}
          <span className="text-ivory">— гортайте фото</span>
        </motion.h2>

        <Reveal delay={0.2} className="mt-4 text-center">
          <p className="mx-auto max-w-[500px] text-base leading-relaxed text-mist">
            Свайпайте або натискайте стрілки, щоб переглянути більше наших робіт.
          </p>
        </Reveal>
      </div>

      {/* Carousel */}
      <div className="relative mt-10 sm:mt-14">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {GALLERY.map((img, i) => (
              <div
                key={img.src}
                className="relative min-w-0 shrink-0 grow-0 basis-full px-4 sm:basis-[80%] lg:basis-[60%]"
              >
                <motion.div
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.7, delay: i * 0.06, ease: EASE }}
                  className="group relative aspect-[4/3] overflow-hidden rounded-2xl"
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 60vw"
                    className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-[1.04]"
                    priority={i === 0}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <span className="absolute bottom-4 left-4 right-4 translate-y-3 text-sm font-semibold text-white opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    {img.alt}
                  </span>
                </motion.div>
              </div>
            ))}
          </div>
        </div>

        {/* Arrows */}
        <button
          type="button"
          onClick={scrollPrev}
          aria-label="Попереднє фото"
          className="absolute left-2 top-1/2 z-10 flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-night/60 text-ivory backdrop-blur-md transition-all duration-300 hover:border-neon/60 hover:text-neon sm:left-4 sm:size-12"
        >
          <ChevronLeftIcon className="size-5" />
        </button>
        <button
          type="button"
          onClick={scrollNext}
          aria-label="Наступне фото"
          className="absolute right-2 top-1/2 z-10 flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-night/60 text-ivory backdrop-blur-md transition-all duration-300 hover:border-neon/60 hover:text-neon sm:right-4 sm:size-12"
        >
          <ChevronRightIcon className="size-5" />
        </button>

        {/* Dots */}
        <div className="mt-6 flex items-center justify-center gap-2">
          {GALLERY.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => emblaApi?.scrollTo(i)}
              aria-label={`Фото ${i + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === selectedIndex
                  ? "w-8 bg-neon"
                  : "w-2 bg-white/25 hover:bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
