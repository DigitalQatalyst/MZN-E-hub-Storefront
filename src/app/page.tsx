// API FUNCTIONS
import api from "@utils/__api__/market-1";
// PAGE SECTION COMPONENTS
import Section3 from "@sections/market-1/Section3";
// import Section6 from "@sections/market-1/Section6";
import Section6 from "@sections/landing/section6";
import { Footer1 } from "@component/footer";
import Section9 from "@sections/market-1/Section9";
import Section14 from "@sections/market-1/Section14";
import Section15 from "@sections/market-1/Section15";
import Section16 from "@sections/market-1/Section16";
import Section17 from "@sections/market-1/Section17";
import Section19 from "@sections/market-1/Section19";
import MsalWrapper from "@component/MsalWrapper";


export default async function Market1() {
  const popularProducts = await api.getPopularProducts();
  

  return (
    <MsalWrapper>
    <main> 
      {/* HERO CAROUSEL AREA
      <Section1 />

      
      FLASH DEAL PRODUCTS AREA */}
      <Section6 />
      <Section9 products={popularProducts} />
      <Section14 />
      <Section15 />
      <Section16 />
      <Section17 /> 
      {/* <Section2 />  */}
      {/* TOP CATEGORIES AREA */}
      <Section3 />
      <Section19 />
      <Footer1 />

    </main>
    </MsalWrapper>
  );
}