"use client";

import { useRef, type EventHandler, type MouseEvent, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

/**
 * Скляна картка: спекулярний відблиск, що слідує за курсором
 * (встановлює CSS-змінні --mx/--my для .glass-card::after).
 */
export default function GlassCard({ children, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove: EventHandler<MouseEvent> = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  return (
    <div ref={ref} onMouseMove={onMove} className={`glass-card ${className ?? ""}`}>
      {children}
    </div>
  );
}
