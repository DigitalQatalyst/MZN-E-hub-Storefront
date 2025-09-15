"use client";

import { useState } from "react";
import FilterButtons from "./FilterButtons/FilterButtons";
import ReportTable from "./ReportTable/ReportTable";

const ReportingDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const reports = [
    {
      name: "Quarterly Financial Statement",
      frequency: "Quarterly",
      dueDate: "Sep 15, 2025",
      status: "Upcoming",
      action: "View",
    },
    {
      name: "Annual External Audit Summary",
      frequency: "Annual",
      dueDate: "Dec 10, 2025",
      status: "Completed",
      action: "View",
    },
    {
      name: "Bi-Annual Compliance Review",
      frequency: "Bi-Annual",
      dueDate: "Aug 01, 2025",
      status: "Overdue",
      action: "View",
    },
    {
      name: "Report Statement Review",
      frequency: "Monthly",
      dueDate: "Jul 20, 2025",
      status: "Completed",
      action: "View",
    },
    ...Array.from({ length: 21 }, (_, i) => ({
      name: `Report ${i + 1}`,
      frequency: "Quarterly",
      dueDate: "Oct 01, 2025",
      status: "Upcoming",
      action: "View",
    })),
  ];

  return (
    <div style={{ margin: "0 auto", width: "93%" }}>
      <FilterButtons
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        setStatusFilter={setStatusFilter}
      />
      <ReportTable
        reports={reports}
        searchTerm={searchTerm}
        statusFilter={statusFilter}
      />
    </div>
  );
};

export default ReportingDashboard;
