import { Fragment } from "react";
// GLOBAL CUSTOM COMPONENTS
import Box from "@component/Box";
import Navbar from "@component/navbar/Navbar";
// PAGE SECTION COMPONENTS
import Section1 from "@sections/market-2/section-1";
import Section2 from "@sections/market-2/section-2";
import Section3 from "@sections/market-2/section-3";
import Section4 from "@sections/market-2/section-4";
import Section5 from "@sections/market-2/section-5";
import Section6 from "@sections/market-2/section-6";
import Section7 from "@sections/market-2/section-7";
import Section8 from "@sections/market-2/section-8";
import Section9 from "@sections/market-2/section-9";
import Section10 from "@sections/market-2/section-10";

export default function MarketTwo() {
  return (
    <Fragment>
      {/* NAVBAR AREA */}
      <Navbar />

      <Box bg="#F6F6F6">
        {/* HERO CAROUSEL AREA */}
        {/* <Section1 /> */}

        {/* SERVICE LIST AREA --- To be results section*/}
        <Section2 />

        {/* TOP CATEGORIES AREA */}
        {/* <Section3 /> */}

        {/* DEAL OF THE DAY PRODUCTS AREA */}
        {/* <Section4 /> */}

        {/* NEW ARRIVALS AND BEST SELLER OFFER BANNER AREA */}
        {/* <Section5 /> */}

        {/* ELECTRONICS CATEGORY BASED PRODUCTS AREA */}
        <Section6 /> {/* Empty data passed */}

        {/* SALES OFFER BANNERS AREA */}
        {/* <Section7 /> */}

        {/* MEN'S CATEGORY BASED PRODUCTS AREA */}
        {/* <Section6 data={[]} /> */} {/* Empty data passed */}

        {/* DISCOUNT OFFER BANNER AREA */}
        {/* <Section8 /> */}

        {/* WOMEN'S CATEGORY BASED PRODUCTS AREA */}
        {/* <Section6 data={[]} /> */} {/* Empty data passed */}

        {/* FEATURES BRAND LIST AREA */}
        {/* <Section9 brands={[]} /> */} {/* Empty data passed */}

        {/* SELECTED PRODUCTS AREA */}
        {/* <Section10 products={[]} /> */} {/* Empty data passed */}
      </Box>
    </Fragment>
  );
}
