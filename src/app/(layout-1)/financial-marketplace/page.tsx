"use client";

import { Fragment, useState } from "react";
import Box from "@component/Box";
import NavbarMarketplace from "@component/navbar/NavbarMarketplace";
import FinancialServiceCatalogue from "@sections/market-2/financial-service-catalogue";


export default function MarketTwo() {
  const [activeButton, setActiveButton] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <Fragment>
      {/* NAVBAR AREA */}
      <NavbarMarketplace />

      <Box bg="#F6F6F6">
        
        <FinancialServiceCatalogue activeButton={activeButton} setActiveButton={setActiveButton} />

      </Box>
    </Fragment>
  );
}