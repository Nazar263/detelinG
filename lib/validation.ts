import { z } from "zod";

export const bookingSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Вкажіть ім'я (мін. 2 символи)")
    .max(60, "Максимум 60 символів"),
  phone: z
    .string()
    .trim()
    .regex(/^\+?[\d\s\-()]{10,19}$/, "Вкажіть коректний номер телефону")
    .refine((v) => v.replace(/\D/g, "").length >= 9, "Номер занадто короткий"),
  service: z.string().min(2, "Оберіть послугу"),
  car: z
    .string()
    .trim()
    .min(2, "Вкажіть марку та модель авто")
    .max(80, "Максимум 80 символів"),
  time: z.string().optional(),
  comment: z.string().trim().max(500, "Максимум 500 символів").optional(),
  // honeypot від ботів: люди поле не бачать і не заповнюють
  website: z.string().optional(),
});

export type BookingInput = z.infer<typeof bookingSchema>;
