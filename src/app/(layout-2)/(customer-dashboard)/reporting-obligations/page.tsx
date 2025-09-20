"use client";

import Box from "@component/Box";
import { Fragment } from "react";
import { ReportsPage } from "./components/ReportsPage";

export default function ReportingObligationsPage() {
  return (
    <Fragment>
      <Box my="2rem">
        <ReportsPage />
      </Box>
    </Fragment>
  );
}