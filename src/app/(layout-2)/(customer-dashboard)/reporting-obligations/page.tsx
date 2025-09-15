"use client";
import { Fragment } from "react";
// API FUNCTIONS
import api from "@utils/__api__/gadget";
// GLOBAL CUSTOM COMPONENTS
import Box from "@component/Box";
import Navbar from "@component/navbar/Navbar";
// PAGE SECTION COMPONENTS
// import Section1 from "@sections/gadget-shop/section-1";
// import Section2 from "@sections/gadget-shop/section-2";
// import Section3 from "@sections/gadget-shop/section-3";

// import PenaltyTracker from "@component/penalty-tracker/PenaltyTracker";
import UpcomingObligationsTimeline from "@component/reporting-obligations/UpcomingObligationsTimeline/UpcomingObligationsTimeline";
import AnnualExternalAuditSummary from "@component/reporting-obligations/AnnualExternalAuditSummary/AnnualExternalAuditSummary";
import ReportingDashboard from "@component/reporting-obligations/ReportingDashboard/ReportingDashboard";

export default async function GadgetShop() {
  return (
    <Fragment>
      {/* NAVIGATION BAR AREA */}
      {/* <Navbar /> */}

      <Box my="2rem">
        {/* <Section3 /> */}
        {/* <PenaltyTracker /> */}
        <UpcomingObligationsTimeline />
        <AnnualExternalAuditSummary />
        <ReportingDashboard />
      </Box>
    </Fragment>
  );
}
