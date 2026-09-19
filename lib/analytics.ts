type GtagFn = (...args: unknown[]) => void;

/** Надсилає подію в GA4, якщо аналітика підключена (NEXT_PUBLIC_GA_ID). */
export function track(event: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  const gtag = (window as unknown as { gtag?: GtagFn }).gtag;
  gtag?.("event", event, params);
}
