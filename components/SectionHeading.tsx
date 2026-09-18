import SplitText, { makeSegments } from "./SplitText";
import Reveal from "./Reveal";

type Props = {
  eyebrow: string;
  title: string;
  accent?: string;
  accentClass?: string;
  desc?: string;
  align?: "left" | "center";
};

export default function SectionHeading({
  eyebrow,
  title,
  accent,
  accentClass = "chrome-text",
  desc,
  align = "center",
}: Props) {
  const alignCls = align === "center" ? "items-center text-center" : "items-start text-left";
  const segments = makeSegments(title, accent ?? "", accentClass);

  return (
    <div className={`flex flex-col gap-5 ${alignCls}`}>
      <Reveal>
        <span className="eyebrow inline-flex items-center gap-3">
          <span className="hairline inline-block h-px w-10" aria-hidden />
          {eyebrow}
          {align === "center" && <span className="hairline inline-block h-px w-10" aria-hidden />}
        </span>
      </Reveal>
      <h2 className="font-display text-[clamp(1.7rem,3.6vw,3.1rem)] font-bold uppercase leading-[1.12] tracking-tight">
        <SplitText segments={segments} />
      </h2>
      {desc && (
        <Reveal delay={0.15}>
          <p className={`max-w-2xl text-base leading-relaxed text-mist ${align === "center" ? "mx-auto" : ""}`}>
            {desc}
          </p>
        </Reveal>
      )}
    </div>
  );
}
