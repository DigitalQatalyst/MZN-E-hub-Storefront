"use client";

import { Fragment, useState } from "react";
import Box from "@component/Box";
import NavbarMarketplace from "@component/navbar/NavbarMarketplace";
import FinancialServiceCatalogue from "@sections/market-2/financial-service-catalogue";
import Navbar from "@component/navbar/NavbarMarketplace";


export default function MarketTwo() {
  const [activeButton, setActiveButton] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <Fragment>
      {/* NAVBAR AREA */}
      <Navbar/>

      <Box bg="#F6F6F6">
        
        <FinancialServiceCatalogue activeButton={activeButton} setActiveButton={setActiveButton} />

      </Box>
    </Fragment>
  );
}