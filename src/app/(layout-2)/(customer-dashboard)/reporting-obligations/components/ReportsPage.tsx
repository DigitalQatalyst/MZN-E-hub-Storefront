"use client";

import Link from "next/link";
import { ChevronRightIcon, FilterIcon, HomeIcon } from "lucide-react";
import { useState } from "react";
import { useReportingData } from "../hooks/useReportingData";
import { DocumentWalletPanel } from "./DocumentWalletPanel";
import { ReceivedReports } from "./ReceivedReports";
import { ServiceRequestsFilters } from "./ServiceRequestsFilters";
import { SubmittedReports } from "./SubmittedReports";
import { SummaryHighlights } from "./SummaryHighlights";
import { UpcomingObligations } from "./UpcomingObligations";

export function ReportsPage() {
  const { data: reportData, loading: isLoading, error } = useReportingData();
  const [dateRange, setDateRange] = useState({
    startDate: null,
    endDate: null,
  });
  const [reportTypeFilter, setReportTypeFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  // Breadcrumbs component
  const Breadcrumbs = () => (
    <nav className="flex items-center text-sm text-gray-500 mb-6">
      <Link href="/" className="flex items-center hover:text-blue-600">
        <HomeIcon size={16} className="mr-1" />
        Home
      </Link>
      <ChevronRightIcon size={14} className="mx-2" />
      <span className="text-gray-800 font-medium">
        Reports & Reporting Obligations
      </span>
    </nav>
  );

  // Filter controls
  const FilterControls = () => (
    <div className="bg-white rounded-2xl shadow-sm p-6 mb-6 col-span-12">
      <div className="flex flex-col space-y-4">
        <button
          className="md:hidden p-2 text-gray-400 hover:text-blue-600 rounded-full hover:bg-gray-100 self-end"
          onClick={() => setShowFilters(!showFilters)}
        >
          <FilterIcon size={16} />
        </button>
        <div className={`${showFilters ? "block" : "hidden md:block"}`}>
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            {/* Dropdown Left */}
            <div className="relative lg:w-auto">
              <select
                id="reportType"
                className="w-full lg:w-auto appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2.5 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm min-w-[200px]"
                value={reportTypeFilter}
                onChange={(e) => setReportTypeFilter(e.target.value)}
              >
                <option value="all">All Report Types</option>
                <option value="financial">Financial</option>
                <option value="regulatory">Regulatory</option>
                <option value="compliance">Compliance</option>
                <option value="operational">Operational</option>
                <option value="environmental">Environmental</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                <ChevronRightIcon size={16} className="transform rotate-90" />
              </div>
            </div>
            {/* Date & Search Right */}
            <div className="w-full lg:w-auto lg:max-w-lg">
              <ServiceRequestsFilters
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                dateRange={dateRange}
                onDateRangeChange={setDateRange}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Loading state
  if (isLoading) {
    return (
      <div className="bg-gray-50 min-h-screen w-full">
        <div className="container mx-auto p-4 md:p-6 lg:p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Reports & Reporting Obligations
          </h1>
          <Breadcrumbs />
          <div className="bg-white rounded-2xl shadow-sm p-6 flex items-center justify-center h-64">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600">Loading reports data...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="bg-gray-50 min-h-screen w-full">
        <div className="container mx-auto p-4 md:p-6 lg:p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Reports & Reporting Obligations
          </h1>
          <Breadcrumbs />
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="text-center py-12">
              <div className="text-red-500 text-lg mb-2">Error</div>
              <p className="text-gray-600 mb-4">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Retry
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen w-full">
      <div className="container mx-auto p-4 md:p-6 lg:p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Reports & Reporting Obligations
        </h1>
        <Breadcrumbs />

        {/* Grid layout with 12 columns */}
        <div className="grid grid-cols-12 gap-6">
          {/* Filters - Full width (12/12) */}
          <FilterControls />

          {/* Main content section with fixed height proportions */}
          <div
            className="col-span-12 grid grid-cols-12 gap-6"
            style={{ minHeight: "calc(100vh - 300px)" }}
          >
            {/* Left Column - 8/12 width */}
            <div
              className="col-span-12 lg:col-span-8 grid grid-rows-3 gap-6"
              style={{ minHeight: "calc(100vh - 300px)" }}
            >
              {/* Summary - 1 unit height */}
              <div className="row-span-1">
                <SummaryHighlights data={reportData?.summaryData} />
              </div>
              {/* Upcoming Obligations - 2 units height */}
              <div className="row-span-2">
                <UpcomingObligations
                  obligations={reportData?.upcomingObligations || []}
                />
              </div>
            </div>

            {/* Right Column - 4/12 width with 2 equal height cards */}
            <div
              className="col-span-12 lg:col-span-4 grid grid-rows-2 gap-6"
              style={{ minHeight: "calc(100vh - 300px)" }}
            >
              {/* Received Reports - 50% height */}
              <div className="row-span-1 h-full">
                <ReceivedReports reports={reportData?.receivedReports || []} />
              </div>
              {/* Document Wallet - 50% height */}
              <div className="row-span-1 h-full">
                <DocumentWalletPanel
                  documents={reportData?.reportDocuments || []}
                />
              </div>
            </div>
          </div>

          {/* Submitted Reports - Full width (12/12) with 1.5 units height */}
          <div
            className="col-span-12 mt-0"
            style={{ minHeight: "calc((100vh - 300px) * 0.375)" }}
          >
            <SubmittedReports reports={reportData?.submittedReports || []} />
          </div>
        </div>
      </div>
    </div>
  );
}
