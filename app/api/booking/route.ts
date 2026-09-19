import { NextResponse } from "next/server";
import { bookingSchema } from "@/lib/validation";
import { SITE } from "@/lib/data";

// Простий in-memory rate limit: 5 заявок / 10 хв з однієї IP
const hits = new Map<string, number[]>();
const RATE_LIMIT = 5;
const RATE_WINDOW = 10 * 60 * 1000;

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW);
  if (recent.length >= RATE_LIMIT) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 1000) hits.clear();
  return false;
}

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json({ ok: false, error: "RATE_LIMITED" }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "INVALID_JSON" }, { status: 400 });
  }

  const parsed = bookingSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        error: "VALIDATION",
        issues: parsed.error.issues.map((i) => ({
          path: i.path.join("."),
          message: i.message,
        })),
      },
      { status: 400 }
    );
  }

  // honeypot заповнено — бот. Відповідаємо «успіхом», заявку не зберігаємо
  if (parsed.data.website) {
    return NextResponse.json({ ok: true, simulated: true });
  }

  const { name, phone, service, car, time, comment } = parsed.data;

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.BOOKING_EMAIL;

  if (apiKey && to) {
    try {
      const { Resend } = await import("resend");
      const resend = new Resend(apiKey);
      const from = process.env.BOOKING_FROM_EMAIL ?? "KrosCar <onboarding@resend.dev>";
      await resend.emails.send({
        from,
        to,
        replyTo: undefined,
        subject: `Нова заявка: ${service} — ${car}`,
        html: `
          <h2 style="font-family:sans-serif">Нова заявка з сайту KrosCar Detailing</h2>
          <table style="font-family:sans-serif;font-size:14px;border-collapse:collapse">
            <tr><td style="padding:6px 12px 6px 0;color:#888">Ім'я</td><td><strong>${escapeHtml(name)}</strong></td></tr>
            <tr><td style="padding:6px 12px 6px 0;color:#888">Телефон</td><td><a href="tel:${escapeHtml(phone.replace(/\s/g, ""))}">${escapeHtml(phone)}</a></td></tr>
            <tr><td style="padding:6px 12px 6px 0;color:#888">Послуга</td><td>${escapeHtml(service)}</td></tr>
            <tr><td style="padding:6px 12px 6px 0;color:#888">Авто</td><td>${escapeHtml(car)}</td></tr>
            <tr><td style="padding:6px 12px 6px 0;color:#888">Час</td><td>${escapeHtml(time ?? "—")}</td></tr>
            <tr><td style="padding:6px 12px 6px 0;color:#888">Коментар</td><td>${escapeHtml(comment ?? "—")}</td></tr>
          </table>
          <p style="font-family:sans-serif;font-size:12px;color:#888">${SITE.name}</p>
        `,
      });
      return NextResponse.json({ ok: true });
    } catch (err) {
      console.error("[booking] email send failed:", err);
      return NextResponse.json({ ok: false, error: "EMAIL_FAILED" }, { status: 502 });
    }
  }

  // Dev-режим: без RESEND_API_KEY просто логуємо заявку
  console.log("[booking] (dev) Нова заявка:", parsed.data);
  return NextResponse.json({ ok: true, simulated: true });
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
