"use client";

import { Fragment } from "react";
import Box from "@component/Box";
import Navbar from "@component/navbar/marketplace_nav/Navbar";
import NonFinancialServiceCatalogue from "@sections/market-2/non-financial-service-catalogue";

export default function NonFinancialMarketplace() {
  return (
    <Fragment>
      {/* NAVBAR AREA */}
      <Navbar />

      <Box bg="#F6F6F6">
        <NonFinancialServiceCatalogue />
      </Box>
    </Fragment>
  );
}
