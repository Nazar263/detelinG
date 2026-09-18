import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import BeforeAfter from "@/components/BeforeAfter";
import Reviews from "@/components/Reviews";
import Booking from "@/components/Booking";
import Contacts from "@/components/Contacts";
import Marquee from "@/components/Marquee";

export default function Home() {
  return (
    <>
      <Hero />
      <main>
        <Marquee
          items={["Хімчистка", "Полірування", "Кераміка", "Детейлінг", "KrosCar"]}
          outline
          className="border-y border-white/5 bg-night/40"
        />
        <About />
        <Services />
        <Portfolio />
        <BeforeAfter />
        <Marquee
          items={["Записуйся", "Огляд безкоштовний", "KrosCar"]}
          reverse
          className="border-y border-white/5 bg-night/40"
        />
        <Reviews />
        <Booking />
        <Contacts />
      </main>
    </>
  );
}
