# KrosCar Detailing Lviv — Landing

Лендінг-сайт для детейлінг-студії **KrosCar Detailing Lviv** (Next.js 16, App Router, Tailwind CSS v4, Framer Motion).

```bash
npm run dev    # http://localhost:3000
npm run build  # продакшн-білд
npm run lint
```

## Заміна placeholder-фото на реальні (з Instagram)

Усі фото у `public/images/` — тимчасові градієнтні заглушки. Замініть їх реальними фото з постів `@kroscar_detailling_lviv`, **зберігаючи назви файлів**:

| Файл | Що це | Джерело |
|---|---|---|
| `hero.jpg` | Фон Hero (найкраще фото/кадр — чорне авто після полірування) | Instagram |
| `service-1.jpg` | Хімчистка салону | хайлайт/пост |
| `service-2.jpg` | Полірування кузову | пост |
| `service-3.jpg` | Полірування фар | пост |
| `service-4.jpg` | Перешиття керма | пост |
| `service-5.jpg` | Захисні покриття (кераміка) | пост |
| `service-6.jpg` | Передпродажна підготовка | пост |
| `service-7.jpg` | Ремонт глибоких царапин | пост |
| `work-1.jpg … work-8.jpg` | Портфоліо (різні співвідношення: 1200×1500, 1200×900, 1200×1200) | пости |
| `before-1.jpg` / `after-1.jpg` | До/Після: ремонт царапин | пост |
| `before-2.jpg` / `after-2.jpg` | До/Після: полірування + кераміка | пост |
| `app/opengraph-image.jpg` | OG-прев'ю для соцмереж (1200×630) | — |

Рекомендації: JPG/WebP, до 200 KB кожне, довший бік ≈ 1200–1600 px.

## Дані, які потрібно уточнити (позначено `TODO` в коді)

1. **Години роботи** — `lib/data.ts` → `SITE.hours` (взяти з картки Google Maps).
2. **Реальні відгуки Google** (4 шт: ім'я, дата, текст) — `lib/data.ts` → `REVIEWS`.
3. **Цифри статистики** — «років досвіду» та «виконаних авто» — `lib/data.ts` → `STATS`.
4. **Домен** — після деплою замінити `BASE_URL` у `lib/data.ts`.

## Форма запису (email через Resend)

Заявки відправляються на `POST /api/booking` (валідація Zod на клієнті та сервері).

Без налаштування — заявки лише логуються в консоль сервера (dev-режим). Щоб отримувати листи:

1. Створіть акаунт на [resend.com](https://resend.com), верифікуйте домен.
2. Скопіюйте `.env.example` → `.env.local` і заповніть:
   ```
   RESEND_API_KEY=re_xxx
   BOOKING_EMAIL=your@email.com
   BOOKING_FROM_EMAIL=KrosCar <booking@ваш-домен.com>
   ```

## Структура

- `app/` — layout (SEO, JSON-LD LocalBusiness, шрифти Unbounded + Manrope), сторінка, `api/booking/`, `robots.ts`, `sitemap.ts`
- `components/` — Header, Hero (parallax, ticker), About (CountUp), Services (hover glow), Portfolio (masonry + lightbox), BeforeAfter (drag-слайдер), Reviews (Embla autoplay), Booking (RHF + Zod), Contacts (карта), Footer, PageLoader, CursorGlow
- `lib/` — контент сайту (`data.ts`), схема валідації (`validation.ts`)

## Анімації

Scroll-reveal, parallax у Hero, counter-ефект, stagger-галерея, hover glow карток, drag «До/Після», auto-scroll відгуки (пауза при наведенні), page loader (1 раз за сесію), cursor glow (лише desktop, поважає `prefers-reduced-motion`), slide-up полів форми, success-анімація галочки.
