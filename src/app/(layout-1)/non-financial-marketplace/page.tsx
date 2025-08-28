"use client"
import React, { Fragment, useState, Suspense } from "react";
// GLOBAL CUSTOM COMPONENTS
import Box from "@component/Box";
import NavbarMarketplace from "@component/navbar/NavbarMarketplace";
import NonFinancialServiceCatalogue from "@sections/market-2/non-financial-service-catalogue";

function MarketTwoContent() {
  const [activeButton, setActiveButton] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  
  return (
    <Fragment>
      {/* NAVBAR AREA */}
      <NavbarMarketplace />

      <Box bg="#F6F6F6">
        <NonFinancialServiceCatalogue 
          activeButton={activeButton} 
          setActiveButton={setActiveButton} 
        />
      </Box>
    </Fragment>
  );
}

export default function MarketTwo() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MarketTwoContent />
    </Suspense>
  );
}
