"use client"
import React, { Fragment } from "react";
// GLOBAL CUSTOM COMPONENTS
import Box from "@component/Box";
import NavbarMarketplace from "@component/navbar/NavbarMarketplace";
import NonFinancialServiceCatalogue from "@sections/market-2/non-financial-service-catalogue";

export default function MarketTwo() {
  const [activeButton, setActiveButton] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  
  return (
    <Fragment>
      {/* NAVBAR AREA */}
      <NavbarMarketplace />

      <Box bg="#F6F6F6">
        
          <NonFinancialServiceCatalogue activeButton={activeButton} setActiveButton={setActiveButton} />
      </Box>
    </Fragment>
  );
}
