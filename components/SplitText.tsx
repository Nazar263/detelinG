"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ElementType } from "react";

export type Segment = { text: string; className?: string };

type Props = {
  segments: Segment[];
  as?: ElementType;
  className?: string;
  delay?: number;
  stagger?: number;
  once?: boolean;
};

/**
 * Заголовок, що з'являється по словах із маски (overflow hidden).
 * Кожне слово — окремий span із вертикальним "виїздом" нагору.
 */
export default function SplitText({
  segments,
  as: Tag = "span",
  className,
  delay = 0,
  stagger = 0.05,
  once = true,
}: Props) {
  const reduce = useReducedMotion();
  let wordIndex = 0;

  return (
    <Tag className={className}>
      {segments.map((seg, si) =>
        seg.text
          .split(" ")
          .filter(Boolean)
          .map((word) => {
            const i = wordIndex++;
            return (
              <span key={`${si}-${i}`} className="inline-block align-bottom">
                <motion.span
                  className={`inline-block clip-text-reveal will-change-transform ${seg.className ?? ""}`}
                  style={{ animationDelay: `${delay + i * stagger}s` }}
                  initial={reduce ? false : undefined}
                  whileInView={reduce ? undefined : undefined}
                  viewport={{ once, margin: "-8% 0px" }}
                >
                  {word}
                </motion.span>
                {"\u00A0"}
              </span>
            );
          })
      )}
    </Tag>
  );
}

/** Розбиває "текст з АКЦЕНТОМ" на сегменти, підсвічуючи accent-фразу. */
export function makeSegments(text: string, accent: string, accentClass = "neon-text"): Segment[] {
  if (!accent) return [{ text }];
  const segments: Segment[] = [];
  const parts = text.split(accent);
  parts.forEach((part, i) => {
    if (part) segments.push({ text: part });
    if (i < parts.length - 1) segments.push({ text: accent, className: accentClass });
  });
  return segments;
}
