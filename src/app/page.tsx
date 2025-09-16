"use client";
// API FUNCTIONS
import api from "@utils/__api__/market-1";
// PAGE SECTION COMPONENTS
import HeroBanner from "@sections/landing/HeroBanner";
import PopularProducts from "@sections/market-1/Section9";
import ServicesShowcase from "@sections/market-1/ServicesShowcase";
import IndustrySolutions from "@sections/market-1/IndustrySolutions";
import EventsSection from "@sections/market-1/EventsSection";
import Testimonials from "@sections/market-1/Testimonials";
import TopCategories from "@sections/market-1/TopCategories";
import Newsletter from "@sections/market-1/Newsletter";
import Footer1 from "@component/footer/stage0_1_footer/Footer1";

export default async function Market1() {
  const popularProducts = await api.getPopularProducts();

  return (
    <main>
      <HeroBanner />
      <PopularProducts products={popularProducts} />
      <ServicesShowcase />
      <IndustrySolutions />
      <EventsSection />
      <Testimonials />
      <TopCategories />
      <Newsletter />
      <Footer1 />
    </main>
  );
}
