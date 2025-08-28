"use client";

import { Fragment, useState, Suspense } from "react";
import Box from "@component/Box";
import NavbarMarketplace from "@component/navbar/NavbarMarketplace";
import FinancialServiceCatalogue from "@sections/market-2/financial-service-catalogue";

function MarketTwoContent() {
  const [activeButton, setActiveButton] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <Fragment>
      {/* NAVBAR AREA */}
      <NavbarMarketplace />

      <Box bg="#F6F6F6">
        <FinancialServiceCatalogue 
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