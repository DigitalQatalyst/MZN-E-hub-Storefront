"use client";

import {
  ArchiveIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  DownloadIcon,
  EyeIcon,
  HomeIcon
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useReportingData } from "../hooks/useReportingData";
import { ServiceRequestsFilters } from "./ServiceRequestsFilters";

export function AllReceivedReportsPage() {
  const { data: reportData, loading: isLoading, error } = useReportingData();
  const [dateRange, setDateRange] = useState({
    startDate: null,
    endDate: null,
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [filteredReports, setFilteredReports] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const reportsPerPage = 10;

  const reports = reportData?.receivedReports || [];

  // Filter reports based on search, date range, and priority
  useEffect(() => {
    let filtered = reports;

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(report =>
        report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        report.source.toLowerCase().includes(searchQuery.toLowerCase()) ||
        report.priority.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply priority filter
    if (priorityFilter !== "all") {
      filtered = filtered.filter(report =>
        report.priority.toLowerCase() === priorityFilter.toLowerCase()
      );
    }

    // Apply date range filter
    if (dateRange.startDate || dateRange.endDate) {
      filtered = filtered.filter(report => {
        const receivedDate = new Date(report.receivedDate);
        const startDateMatch = !dateRange.startDate || receivedDate >= new Date(dateRange.startDate);
        const endDateMatch = !dateRange.endDate || receivedDate <= new Date(dateRange.endDate);
        return startDateMatch && endDateMatch;
      });
    }

    setFilteredReports(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchQuery, priorityFilter, dateRange, reports]);

  // Pagination calculations
  const indexOfLastReport = currentPage * reportsPerPage;
  const indexOfFirstReport = indexOfLastReport - reportsPerPage;
  const currentReports = filteredReports.slice(indexOfFirstReport, indexOfLastReport);
  const totalPages = Math.ceil(filteredReports.length / reportsPerPage);

  // Breadcrumbs component
  const Breadcrumbs = () => (
    <nav className="flex items-center text-sm text-gray-500 mb-6">
      <Link href="/" className="flex items-center hover:text-blue-600">
        <HomeIcon size={16} className="mr-1" />
        Home
      </Link>
      <ChevronRightIcon size={14} className="mx-2" />
      <Link href="/reporting-obligations" className="hover:text-blue-600">
        Reports
      </Link>
      <ChevronRightIcon size={14} className="mx-2" />
      <span className="text-gray-800 font-medium">All Received Reports</span>
    </nav>
  );

  // Function to determine priority styling
  const getPriorityBadge = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "high":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            High
          </span>
        );
      case "medium":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
            Medium
          </span>
        );
      case "low":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            Low
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            {priority}
          </span>
        );
    }
  };

  if (isLoading) {
    return (
      <div className="bg-gray-50 min-h-screen w-full">
        <div className="container mx-auto p-4 md:p-6 lg:p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            All Received Reports
          </h1>
          <Breadcrumbs />
          <div className="bg-white rounded-2xl shadow-sm p-6 flex items-center justify-center h-64">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600">Loading received reports...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-50 min-h-screen w-full">
        <div className="container mx-auto p-4 md:p-6 lg:p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            All Received Reports
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
        <div className="p-6 pb-2">
          <h1 className="text-2xl font-bold text-gray-900">All Received Reports</h1>
          <p className="text-gray-600">Full list of reports received from regulatory authorities and partners</p>
        </div>
        <Breadcrumbs />

        {/* Filters Card */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <ServiceRequestsFilters
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              dateRange={dateRange}
              onDateRangeChange={setDateRange}
            />
          </div>
        </div>

        {/* Data Table Card */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="border-b border-gray-200 p-6">
            <h2 className="text-lg font-bold text-gray-900">Received Reports</h2>
            <p className="text-sm text-gray-600">Reports sent to you by regulatory authorities and partners</p>
          </div>
          <div className="p-6">
            {currentReports.length === 0 ? (
              <div className="text-center py-8 bg-gray-50 rounded-xl">
                <p className="text-gray-500">No received reports found matching your filters.</p>
              </div>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Report Title
                        </th>
                        <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Source
                        </th>
                        <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Priority
                        </th>
                        <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Received Date
                        </th>
                        <th className="text-right py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentReports.map((report, index) => (
                        <tr
                          key={report.id}
                          className={`hover:bg-gray-50 ${index !== currentReports.length - 1 ? 'border-b border-gray-100' : ''
                            }`}
                          style={{ minHeight: '3.5rem' }}
                        >
                          <td className="py-3 px-6">
                            <div className="text-sm font-medium text-gray-900">{report.title}</div>
                          </td>
                          <td className="py-3 px-6">
                            <div className="text-sm text-gray-500">{report.source}</div>
                          </td>
                          <td className="py-3 px-6">{getPriorityBadge(report.priority)}</td>
                          <td className="py-3 px-6">
                            <div className="text-sm text-gray-500">
                              {new Date(report.receivedDate).toLocaleDateString()}
                            </div>
                          </td>
                          <td className="py-3 px-6 text-right">
                            <div className="flex items-center justify-end space-x-2">
                              <button
                                className="p-2 text-blue-600 hover:text-blue-800 rounded-full hover:bg-gray-100"
                                onClick={() => console.log('View report', report.id)}
                                title="View"
                              >
                                <EyeIcon size={16} />
                              </button>
                              <button
                                className="p-2 text-blue-600 hover:text-blue-800 rounded-full hover:bg-gray-100"
                                onClick={() => console.log('Download report', report.id)}
                                title="Download"
                              >
                                <DownloadIcon size={16} />
                              </button>
                              <button
                                className="p-2 text-blue-600 hover:text-blue-800 rounded-full hover:bg-gray-100"
                                onClick={() => console.log('Archive report', report.id)}
                                title="Archive"
                              >
                                <ArchiveIcon size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-end mt-4 gap-2">
                    <span className="text-sm text-gray-500 mr-4">
                      Showing {indexOfFirstReport + 1} to{' '}
                      {Math.min(indexOfLastReport, filteredReports.length)} of {filteredReports.length} results
                    </span>
                    <button
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className={`p-2 rounded-md ${currentPage === 1
                        ? 'text-gray-300 cursor-not-allowed'
                        : 'text-gray-500 hover:bg-gray-100'
                        }`}
                    >
                      <ChevronLeftIcon size={16} />
                    </button>
                    {[...Array(totalPages)].map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`px-3 py-1 rounded-md ${currentPage === i + 1
                          ? 'bg-blue-100 text-blue-600'
                          : 'text-gray-500 hover:bg-gray-100'
                          }`}
                      >
                        {i + 1}
                      </button>
                    ))}
                    <button
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                      className={`p-2 rounded-md ${currentPage === totalPages
                        ? 'text-gray-300 cursor-not-allowed'
                        : 'text-gray-500 hover:bg-gray-100'
                        }`}
                    >
                      <ChevronRightIcon size={16} />
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
