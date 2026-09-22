export const SITE = {
  name: "KrosCar Detailing Lviv",
  legalName: "Хімчистка та полірування авто KrosCar детейлінг",
  shortName: "KrosCar",
  slogan: "Хімчистка та полірування авто м. Львів",
  description: "Детейлінг послуги професійної якості та доступними цінами.",
  phone: "073 353 79 77",
  phoneHref: "tel:+380733537977",
  phoneIntl: "+380733537977",
  address: "м. Львів, вул. Міцна, 2",
  street: "вул. Міцна, 2",
  city: "Львів",
  postalCode: "79000",
  instagram: "https://www.instagram.com/kroscar_detailling_lviv/",
  instagramHandle: "@kroscar_detailling_lviv",
  googleMaps: "https://maps.app.goo.gl/ryu5aj9CXgXao26x8",
  googleMapsEmbed:
    "https://www.google.com/maps?q=%D0%B2%D1%83%D0%BB.+%D0%9C%D1%96%D1%86%D0%BD%D0%B0%2C+2%2C+%D0%9B%D1%8C%D0%B2%D1%96%D0%B2&hl=uk&z=16&output=embed",
  rating: 5.0,
  reviewsCount: 128,
  // TODO: перевірити актуальні години на картці Google Maps
  hours: [
    { days: "Пн – Пт", time: "09:00 – 19:00" },
    { days: "Субота", time: "10:00 – 18:00" },
    { days: "Неділя", time: "За домовленістю" },
  ],
} as const;

export const BASE_URL = "https://kroscar-detailing-lviv.vercel.app";

export const NAV = [
  { href: "#pro-nas", label: "Про нас" },
  { href: "#posluhy", label: "Послуги" },
  { href: "#roboty", label: "Роботи" },
  { href: "#galereya", label: "Галерея" },
  { href: "#do-pislya", label: "До / Після" },
  { href: "#vidhuky", label: "Відгуки" },
  { href: "#kontakty", label: "Контакти" },
] as const;

export type Service = {
  title: string;
  desc: string;
  image: string;
  wide?: boolean;
};

export const SERVICES: Service[] = [
  {
    title: "Хімчистка салону",
    desc: "Глибоке очищення до основи: сидіння, стеля, килими, пластик. Плями та запахи зникають — салон як новий.",
    image: "/images/service-1.jpg",
  },
  {
    title: "Полірування кузову",
    desc: "Знімаємо царапини, голограми та патьоки. Колір стає глибшим, блиск — дзеркальним.",
    image: "/images/service-2.jpg",
  },
  {
    title: "Полірування фар",
    desc: "Повертаємо фарам прозорість, світло стає яскравішим — і захищаємо від повторного помутніння.",
    image: "/images/service-3.jpg",
  },
  {
    title: "Перешиття керма",
    desc: "Натуральна шкіра або алькантара, ідеальний шов та посадка матеріалу під вашу руку.",
    image: "/images/service-4.jpg",
  },
  {
    title: "Захисні покриття",
    desc: "Кераміка та рідке скло: ЛКП захищене на роки, а бруд і реагенти не тримаються на кузові.",
    image: "/images/service-5.jpg",
  },
  {
    title: "Передпродажна підготовка",
    desc: "Комплекс, після якого авто продається швидше та дорожче — покупець бачить ідеал.",
    image: "/images/service-6.jpg",
  },
  {
    title: "Ремонт глибоких царапин",
    desc: "Локальний ремонт з точним підбором кольору. Від пошкодження не лишається жодного сліду.",
    image: "/images/service-7.jpg",
    wide: true,
  },
];

export const SERVICE_OPTIONS = [...SERVICES.map((s) => s.title), "Інше / комплекс послуг"];

export type Work = { src: string; alt: string; label: string; w: number; h: number };

export const PORTFOLIO: Work[] = [
  { src: "/images/work-1.jpg", alt: "Полірування фари Bentley — відновлення прозорості", label: "Полірування фар", w: 1200, h: 1500 },
  { src: "/images/work-2.jpg", alt: "Хімчистка салону VW — глибоке очищення інтер'єру", label: "Хімчистка салону", w: 1200, h: 900 },
  { src: "/images/work-3.jpg", alt: "Передпродажна підготовка Lamborghini — ідеальний стан", label: "Передпродажна підготовка", w: 1200, h: 1200 },
  { src: "/images/work-4.jpg", alt: "Керамічне покриття — ефект водовідштовхування", label: "Захисні покриття", w: 1200, h: 1500 },
  { src: "/images/work-5.jpg", alt: "Перешиття керма Lexus — натуральна шкіра", label: "Перешиття керма", w: 1200, h: 1200 },
  { src: "/images/work-6.jpg", alt: "Полірування кузову — видалення царапин буфером", label: "Полірування кузову", w: 1200, h: 1500 },
  { src: "/images/work-7.jpg", alt: "Деталізоване опрацювання Lamborghini — ідеальний блиск", label: "Деталі", w: 1200, h: 1500 },
  { src: "/images/work-8.jpg", alt: "Диски HRE з жовтими гальмівними супортами", label: "Деталі", w: 1200, h: 900 },
];

export const BEFORE_AFTER = [
  {
    title: "Ремонт глибоких царапин",
    note: "Локальний ремонт ЛКП з підбором кольору",
    before: "/images/before-1.jpg",
    after: "/images/after-1.jpg",
  },
  {
    title: "Полірування + кераміка",
    note: "Комплексне відновлення та захист кузова",
    before: "/images/before-2.jpg",
    after: "/images/after-2.jpg",
  },
] as const;

// TODO: замінити на реальні відгуки з картки Google Maps
export type Review = { name: string; date: string; text: string };

export const REVIEWS: Review[] = [
  {
    name: "Олександр К.",
    date: "2 тижні тому",
    text: "Замовляв комплекс: полірування кузова + кераміка. Авто як із салону, дзеркальний блиск! Уважні до деталей, все показали та пояснили. Рекомендую!",
  },
  {
    name: "Марія С.",
    date: "місяць тому",
    text: "Робили хімчистку салону. Сидіння та килими стали як нові, запах вологи зник повністю. Дуже дякую за якість та акуратність!",
  },
  {
    name: "Андрій М.",
    date: "2 місяці тому",
    text: "Звернувся з глибокими царапинами на дверях. Відремонтували так, що сліду не видно. Ціна адекватна, зробили вчасно.",
  },
  {
    name: "Ігор В.",
    date: "3 місяці тому",
    text: "Передпродажна підготовка авто — покупець був у захваті! Полірування, хімчистка, все на рівні. Дякую за професійний підхід.",
  },
];

export const STATS = [
  { value: 5.0, decimals: 1, suffix: "", label: "Рейтинг Google" },
  { value: 500, decimals: 0, suffix: "+", label: "Авто виконано" },
  { value: 5, decimals: 0, suffix: "+", label: "Років досвіду" },
  { value: 100, decimals: 0, suffix: "%", label: "Гарантія якості" },
] as const;
// TODO: уточнити у замовника реальні цифри «років досвіду» та «виконаних авто»

export const TIME_SLOTS = [
  "09:00", "10:00", "11:00", "12:00", "13:00",
  "14:00", "15:00", "16:00", "17:00", "18:00", "Гнучкий графік",
] as const;

export type GalleryImage = { src: string; alt: string };

export const GALLERY: GalleryImage[] = [
  { src: "/images/gallery-1.jpg", alt: "Результат детейлінгу — ідеальний блиск" },
  { src: "/images/work-1.jpg", alt: "Полірування фари" },
  { src: "/images/work-2.jpg", alt: "Хімчистка салону" },
  { src: "/images/work-3.jpg", alt: "Передпродажна підготовка" },
  { src: "/images/work-4.jpg", alt: "Керамічне покриття" },
  { src: "/images/work-5.jpg", alt: "Перешиття керма" },
  { src: "/images/work-6.jpg", alt: "Полірування кузову" },
  { src: "/images/work-7.jpg", alt: "Деталі Lamborghini" },
];
