import { Fragment } from "react";
// GLOBAL CUSTOM COMPONENTS
import Box from "@component/Box";
import NavbarMarketplace from "@component/navbar/NavbarMarketplace";
// Update the import path to the correct location of CardsFav
import Tabbarfav from "@component/Tabbarfav"; // Adjust the import path as necessary
import CardsFav from "@component/CardsFav"; // Adjust the import path as necessary

// PAGE SECTION COMPONENTS

// import Section6 from "@sections/market-2/section-6";

export default function Favourites() {
  return (
    <Fragment>
      {/* NAVBAR AREA */}
      <NavbarMarketplace />

      <Box bg="#F6F6F6">
        <Tabbarfav />
        <CardsFav /> {/* Replaced ProductCard19 with CardsFav */}
        {/* HERO CAROUSEL AREA */}
        {/* <Section1 /> */}
        {/* SERVICE LIST AREA --- To be results section*/}
        {/* <Section2 /> */}
        {/* TOP CATEGORIES AREA */}
        {/* <Section3 /> */}
        {/* DEAL OF THE DAY PRODUCTS AREA */}
        {/* <Section4 /> */}
        {/* NEW ARRIVALS AND BEST SELLER OFFER BANNER AREA */}
        {/* <Section5 /> */}
        {/* ELECTRONICS CATEGORY BASED PRODUCTS AREA */}
        {/* <Section6 /> */}
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
