import type { Metadata, Viewport } from "next";
import { Manrope, Montserrat, Unbounded } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageLoader from "@/components/PageLoader";
import CustomCursor from "@/components/CustomCursor";
import Background from "@/components/Background";
import { BASE_URL, SITE } from "@/lib/data";

const unbounded = Unbounded({
  subsets: ["latin", "cyrillic"],
  variable: "--font-unbounded",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin", "cyrillic"],
  variable: "--font-montserrat",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Kroscar Detailing Lviv — Детейлінг у Львові",
    template: "%s | KrosCar Detailing Lviv",
  },
  description:
    "Хімчистка та полірування авто у Львові. Професійний детейлінг, кераміка, перешиття керма. Рейтинг 5.0 ★.",
  keywords: [
    "детейлінг Львів",
    "хімчистка салону Львів",
    "полірування авто Львів",
    "керамічне покриття",
    "полірування фар",
    "перешиття керма",
    "передпродажна підготовка",
    "KrosCar",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "uk_UA",
    url: "/",
    siteName: SITE.name,
    title: "Kroscar Detailing Lviv — Детейлінг у Львові",
    description: SITE.description,
  },
  twitter: {
    card: "summary_large_image",
    title: "Kroscar Detailing Lviv — Детейлінг у Львові",
    description: SITE.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AutoDetailing",
  name: SITE.legalName,
  alternateName: SITE.name,
  description: SITE.description,
  url: BASE_URL,
  telephone: SITE.phoneIntl,
  priceRange: "₴₴",
  image: `${BASE_URL}/images/hero.jpg`,
  address: {
    "@type": "PostalAddress",
    streetAddress: SITE.street,
    addressLocality: SITE.city,
    postalCode: SITE.postalCode,
    addressCountry: "UA",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "19:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Saturday"],
      opens: "10:00",
      closes: "18:00",
    },
  ],
  sameAs: [SITE.instagram, SITE.googleMaps],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: String(SITE.rating),
    reviewCount: String(SITE.reviewsCount),
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="uk" className={`${unbounded.variable} ${montserrat.variable} ${manrope.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <noscript>
          <style>{`#kc-loader{display:none!important}`}</style>
        </noscript>
        <PageLoader />
        <Background />
        <CustomCursor />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
