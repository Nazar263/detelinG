"use client";

import { useEffect, useState } from "react";
import { SITE } from "@/lib/data";
import { track } from "@/lib/analytics";

/** Липка мобільна панель дій: дзвінок + запис.
 *  Ховається, коли форма #zapis у зоні видимості (CTA там уже є). */
export default function MobileCTABar() {
  const [formVisible, setFormVisible] = useState(false);

  useEffect(() => {
    const target = document.getElementById("zapis");
    if (!target || typeof IntersectionObserver === "undefined") return;
    const obs = new IntersectionObserver(([entry]) => setFormVisible(entry.isIntersecting), {
      threshold: 0.08,
    });
    obs.observe(target);
    return () => obs.disconnect();
  }, []);

  if (formVisible) return null;

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-20 flex gap-3 border-t border-white/10 bg-night/90 px-4 pt-3 backdrop-blur-md lg:hidden"
      style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
    >
      <a
        href={SITE.phoneHref}
        onClick={() => track("phone_click", { location: "sticky_bar" })}
        className="btn-ghost flex-1 px-3! py-3! text-xs!"
      >
        Зателефонувати
      </a>
      <a
        href="#zapis"
        onClick={() => track("cta_click", { location: "sticky_bar" })}
        className="btn-neon flex-[1.3] px-3! py-3! text-xs!"
      >
        Записатися
      </a>
    </div>
  );
}
