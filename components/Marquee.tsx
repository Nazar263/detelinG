type Props = {
  items: string[];
  reverse?: boolean;
  outline?: boolean;
  className?: string;
};

/**
 * Рухомий рядок великим текстом (marquee). Контент дублюється для безшовного циклу.
 */
export default function Marquee({ items, reverse = false, outline = false, className = "" }: Props) {
  const row = [...items, ...items];

  return (
    <div className={`ticker relative overflow-hidden py-6 ${className}`} aria-hidden>
      <div
        className={`ticker-track flex w-max items-center gap-8 whitespace-nowrap sm:gap-12 ${
          reverse ? "ticker-reverse" : ""
        }`}
      >
        {row.map((item, i) => (
          <span key={i} className="flex items-center gap-8 sm:gap-12">
            <span
              className={`font-display text-[9vw] font-extrabold uppercase leading-none sm:text-6xl lg:text-7xl ${
                outline ? "text-outline" : "text-ivory/90"
              }`}
            >
              {item}
            </span>
            <span className={`size-2 rotate-45 ${outline ? "bg-neon/50" : "bg-neon"}`} aria-hidden />
          </span>
        ))}
      </div>
      {/* градієнтні краї */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-night to-transparent sm:w-40" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-night to-transparent sm:w-40" />
    </div>
  );
}
