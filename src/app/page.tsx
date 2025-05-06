// API FUNCTIONS
import api from "@utils/__api__/market-1";
// PAGE SECTION COMPONENTS
import Section1 from "@sections/market-1/Section1";
import Section2 from "@sections/market-1/Section2";
import Section3 from "@sections/market-1/Section3";
import Section4 from "@sections/market-1/Section4";
import Section5 from "@sections/market-1/Section5";
// import Section6 from "@sections/market-1/Section6";
import Section7 from "@sections/market-1/Section7";
import Section8 from "@sections/market-1/Section8";
import Section10 from "@sections/market-1/Section10";
import Section11 from "@sections/market-1/Section11";
import Section12 from "@sections/market-1/Section12";
import Section13 from "@sections/market-1/Section13";
import Section6 from "@sections/landing/section6";
import Footer from "@sections/landing/footer";
import { zIndex } from "styled-system";
import { Wrapper } from "@component/footer/footer-2/styles";
import { Footer1 } from "@component/footer";
import Section9 from "@sections/market-1/Section9";
import Section14 from "@sections/market-1/Section14";


export default async function Market1() {
  const carList = await api.getCarList();
  const carBrands = await api.getCarBrands();
  const mobileList = await api.getMobileList();
  const opticsList = await api.getOpticsList();
  const mobileShops = await api.getMobileShops();
  const opticsShops = await api.getOpticsShops();
  const opticsBrands = await api.getOpticsBrands();
  const mobileBrands = await api.getMobileBrands();
  const popularProducts = await api.getPopularProducts();
  

  return (
    <main>
      {/* HERO CAROUSEL AREA
      <Section1 />
      FLASH DEAL PRODUCTS AREA */}
      <Section6 />
      <Section9 products={popularProducts} />
      <Section14 />
      <Section2 /> 
      {/* TOP CATEGORIES AREA */}
      <Section3 />
      <Footer1 />

    </main>
  );
}
