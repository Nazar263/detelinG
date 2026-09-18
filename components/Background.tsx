import type { CSSProperties } from "react";

const streakStyle = (delay: string) => ({ "--streak-delay": delay }) as CSSProperties;

export default function Background() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* дрейфуючі aurora-плями */}
      <div
        className="aurora-blob drift-a left-[-10%] top-[-15%] size-[55vw]"
        style={{ background: "radial-gradient(circle, rgba(77,201,246,0.10), transparent 70%)" }}
      />
      <div
        className="aurora-blob drift-b right-[-15%] top-[30%] size-[45vw]"
        style={{ background: "radial-gradient(circle, rgba(26,143,196,0.09), transparent 70%)" }}
      />
      <div
        className="aurora-blob drift-c bottom-[-20%] left-[20%] size-[50vw]"
        style={{ background: "radial-gradient(circle, rgba(125,216,248,0.06), transparent 70%)" }}
      />

      {/* світлові streaks */}
      <div className="light-streak left-0 top-[22%]" style={streakStyle("0s")} />
      <div className="light-streak left-0 top-[58%]" style={streakStyle("4.5s")} />
      <div className="light-streak left-0 top-[84%]" style={streakStyle("8s")} />
    </div>
  );
}
