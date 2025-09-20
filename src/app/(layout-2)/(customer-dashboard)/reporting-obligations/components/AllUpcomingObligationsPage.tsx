"use client";

import {
  AlertCircleIcon,
  ArrowDownIcon,
  ArrowUpDownIcon,
  ArrowUpIcon,
  ArrowUpRightIcon,
  CalendarIcon,
  ChevronLeftIcon,
  ChevronRight,
  ChevronRightIcon,
  ClockIcon,
  DownloadIcon,
  EditIcon,
  EyeIcon,
  HomeIcon,
  MoreHorizontalIcon,
  TrashIcon,
  XIcon
} from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useReportingData } from "../hooks/useReportingData";
import { UpcomingObligation } from "../types/reporting";
import { ServiceRequestsFilters } from "./ServiceRequestsFilters";

export function AllUpcomingObligationsPage() {
  const { data: reportData, loading: isLoading, error } = useReportingData();
  const [dateRange, setDateRange] = useState({
    startDate: null,
    endDate: null,
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [selectedRows, setSelectedRows] = useState(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [showBulkActions, setShowBulkActions] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  // Filter and sort obligations
  const filteredAndSortedObligations = useMemo(() => {
    const obligations = reportData?.upcomingObligations || [];

    // Apply filters
    let filtered = obligations.filter((obligation) => {
      const matchesSearch = !searchQuery ||
        obligation.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        obligation.assignedTo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        obligation.type.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = statusFilter === 'all' ||
        obligation.status.toLowerCase() === statusFilter.toLowerCase();

      const matchesType = typeFilter === 'all' ||
        obligation.type.toLowerCase() === typeFilter.toLowerCase();

      const matchesDateRange = (!dateRange.startDate || new Date(obligation.dueDate) >= new Date(dateRange.startDate)) &&
        (!dateRange.endDate || new Date(obligation.dueDate) <= new Date(dateRange.endDate));

      return matchesSearch && matchesStatus && matchesType && matchesDateRange;
    });

    // Apply sorting
    if (sortConfig.key) {
      filtered.sort((a, b) => {
        let aValue = a[sortConfig.key];
        let bValue = b[sortConfig.key];

        if (sortConfig.key === 'dueDate') {
          aValue = new Date(aValue);
          bValue = new Date(bValue);
        }

        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return filtered;
  }, [reportData, searchQuery, statusFilter, typeFilter, dateRange, sortConfig]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedObligations.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedObligations = filteredAndSortedObligations.slice(startIndex, startIndex + itemsPerPage);

  // Sorting handler
  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  // Selection handlers
  const handleSelectAll = () => {
    if (selectedRows.size === paginatedObligations.length) {
      setSelectedRows(new Set());
    } else {
      setSelectedRows(new Set(paginatedObligations.map(o => o.id)));
    }
  };

  const handleSelectRow = (id) => {
    const newSelected = new Set(selectedRows);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedRows(newSelected);
  };

  // Export functionality
  const handleExport = (format) => {
    const dataToExport = selectedRows.size > 0
      ? filteredAndSortedObligations.filter(o => selectedRows.has(o.id))
      : filteredAndSortedObligations;

    if (format === 'csv') {
      const csv = [
        ['Name', 'Type', 'Status', 'Due Date', 'Assigned To'],
        ...dataToExport.map(o => [o.name, o.type, o.status, o.dueDate, o.assignedTo])
      ].map(row => row.join(',')).join('\n');

      const blob = new Blob([csv], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'upcoming-obligations.csv';
      a.click();
    }
  };

  // Bulk actions
  const handleBulkAction = (action) => {
    console.log(`Performing ${action} on ${selectedRows.size} items`);
    // Implement bulk actions here
    setSelectedRows(new Set());
    setShowBulkActions(false);
  };

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
      <span className="text-gray-800 font-medium">
        All Upcoming Obligations
      </span>
    </nav>
  );

  // Function to determine status styling
  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "overdue":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <AlertCircleIcon size={12} className="mr-1" />
            Overdue
          </span>
        );
      case "due soon":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
            <ClockIcon size={12} className="mr-1" />
            Due Soon
          </span>
        );
      case "upcoming":
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            <CalendarIcon size={12} className="mr-1" />
            Upcoming
          </span>
        );
    }
  };

  // Function to determine action button based on status
  const getActionButton = (obligation: UpcomingObligation) => {
    switch (obligation.status.toLowerCase()) {
      case "overdue":
        return (
          <button className="px-3 py-1.5 bg-red-600 text-white text-xs font-medium rounded-lg hover:bg-red-700 transition-colors flex items-center">
            Submit Now
            <ArrowUpRightIcon size={12} className="ml-1" />
          </button>
        );
      case "due soon":
        return (
          <button className="px-3 py-1.5 bg-blue-600 text-white text-xs font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center">
            Prepare
            <ArrowUpRightIcon size={12} className="ml-1" />
          </button>
        );
      case "upcoming":
      default:
        return (
          <button className="px-3 py-1.5 text-blue-600 hover:bg-blue-50 text-xs font-medium rounded-lg transition-colors flex items-center">
            View
            <ArrowUpRightIcon size={12} className="ml-1" />
          </button>
        );
    }
  };

  // Sort icon component
  const SortIcon = ({ column }) => {
    if (sortConfig.key !== column) {
      return <ArrowUpDownIcon size={14} className="text-gray-400" />;
    }
    return sortConfig.direction === 'asc'
      ? <ArrowUpIcon size={14} className="text-blue-600" />
      : <ArrowDownIcon size={14} className="text-blue-600" />;
  };

  // Row actions dropdown
  const RowActionsDropdown = ({ obligation, isOpen, onToggle }) => (
    <div className="relative">
      <button
        onClick={onToggle}
        className="p-1 hover:bg-gray-100 rounded-md transition-colors"
      >
        <MoreHorizontalIcon size={16} className="text-gray-500" />
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-1 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-10">
          <div className="py-1">
            <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              <EyeIcon size={14} className="mr-2" />
              View Details
            </button>
            <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              <EditIcon size={14} className="mr-2" />
              Edit
            </button>
            <button className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50">
              <TrashIcon size={14} className="mr-2" />
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );

  if (isLoading) {
    return (
      <div className="bg-gray-50 min-h-screen w-full">
        <div className="container mx-auto p-4 md:p-6 lg:p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            All Upcoming Obligations
          </h1>
          <Breadcrumbs />
          <div className="bg-white rounded-2xl shadow-sm p-6 flex items-center justify-center h-64">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600">Loading obligations...</p>
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
            All Upcoming Obligations
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
          <h1 className="text-2xl font-bold text-gray-900">All Upcoming Obligations</h1>
        </div>
        <Breadcrumbs />

        {/* Filters Card */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
            <div className="flex flex-wrap gap-3">
              <div className="relative">
                <select
                  className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2.5 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">All Statuses</option>
                  <option value="overdue">Overdue</option>
                  <option value="due soon">Due Soon</option>
                  <option value="upcoming">Upcoming</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                  <ChevronRightIcon size={16} className="transform rotate-90" />
                </div>
              </div>

              <div className="relative">
                <select
                  className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2.5 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                >
                  <option value="all">All Types</option>
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
            </div>

            <div className="w-full sm:w-auto sm:max-w-lg">
              <ServiceRequestsFilters
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                dateRange={dateRange}
                onDateRangeChange={setDateRange}
              />
            </div>
          </div>

          {/* Bulk Actions */}
          {selectedRows.size > 0 && (
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
              <span className="text-sm text-blue-700">
                {selectedRows.size} item(s) selected
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => handleBulkAction('export')}
                  className="px-3 py-1.5 text-blue-600 hover:bg-blue-100 text-xs font-medium rounded-md transition-colors flex items-center"
                >
                  <DownloadIcon size={12} className="mr-1" />
                  Export
                </button>
                <button
                  onClick={() => handleBulkAction('delete')}
                  className="px-3 py-1.5 text-red-600 hover:bg-red-100 text-xs font-medium rounded-md transition-colors flex items-center"
                >
                  <TrashIcon size={12} className="mr-1" />
                  Delete
                </button>
                <button
                  onClick={() => setSelectedRows(new Set())}
                  className="px-3 py-1.5 text-gray-600 hover:bg-gray-100 text-xs font-medium rounded-md transition-colors"
                >
                  <XIcon size={12} />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Data Table Card */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="border-b border-gray-200 p-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-lg font-bold text-gray-900">Upcoming Obligations</h2>
                <p className="text-sm text-gray-600">
                  Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredAndSortedObligations.length)} of {filteredAndSortedObligations.length} results
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleExport('csv')}
                  className="px-3 py-2 text-gray-600 hover:bg-gray-100 text-sm font-medium rounded-lg transition-colors flex items-center"
                >
                  <DownloadIcon size={16} className="mr-2" />
                  Export CSV
                </button>
                <select
                  value={itemsPerPage}
                  onChange={(e) => {
                    setItemsPerPage(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value={5}>5 per page</option>
                  <option value={10}>10 per page</option>
                  <option value={25}>25 per page</option>
                  <option value={50}>50 per page</option>
                </select>
              </div>
            </div>
          </div>

          <div className="p-6">
            {paginatedObligations.length === 0 ? (
              <div className="text-center py-8 bg-gray-50 rounded-xl">
                <p className="text-gray-500">No obligations found matching your filters.</p>
              </div>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-6 w-12">
                          <input
                            type="checkbox"
                            checked={selectedRows.size === paginatedObligations.length && paginatedObligations.length > 0}
                            onChange={handleSelectAll}
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                        </th>
                        <th
                          className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-50"
                          onClick={() => handleSort('name')}
                        >
                          <div className="flex items-center">
                            Obligation Name
                            <SortIcon column="name" />
                          </div>
                        </th>
                        <th
                          className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-50"
                          onClick={() => handleSort('type')}
                        >
                          <div className="flex items-center">
                            Type
                            <SortIcon column="type" />
                          </div>
                        </th>
                        <th
                          className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-50"
                          onClick={() => handleSort('status')}
                        >
                          <div className="flex items-center">
                            Status
                            <SortIcon column="status" />
                          </div>
                        </th>
                        <th
                          className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-50"
                          onClick={() => handleSort('dueDate')}
                        >
                          <div className="flex items-center">
                            Due Date
                            <SortIcon column="dueDate" />
                          </div>
                        </th>
                        <th
                          className="text-left py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-50"
                          onClick={() => handleSort('assignedTo')}
                        >
                          <div className="flex items-center">
                            Assigned To
                            <SortIcon column="assignedTo" />
                          </div>
                        </th>
                        <th className="text-right py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedObligations.map((obligation, index) => (
                        <tr
                          key={obligation.id}
                          className={`hover:bg-gray-50 ${index !== paginatedObligations.length - 1 ? 'border-b border-gray-100' : ''
                            } ${selectedRows.has(obligation.id) ? 'bg-blue-50' : ''}`}
                          style={{ minHeight: '3.5rem' }}
                        >
                          <td className="py-3 px-6">
                            <input
                              type="checkbox"
                              checked={selectedRows.has(obligation.id)}
                              onChange={() => handleSelectRow(obligation.id)}
                              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                          </td>
                          <td className="py-3 px-6">
                            <div className="text-sm font-medium text-gray-900">{obligation.name}</div>
                          </td>
                          <td className="py-3 px-6">
                            <div className="text-sm text-gray-500">{obligation.type}</div>
                          </td>
                          <td className="py-3 px-6">{getStatusBadge(obligation.status)}</td>
                          <td className="py-3 px-6">
                            <div className="text-sm text-gray-500">
                              {new Date(obligation.dueDate).toLocaleDateString()}
                            </div>
                          </td>
                          <td className="py-3 px-6">
                            <div className="text-sm text-gray-500">{obligation.assignedTo}</div>
                          </td>
                          <td className="py-3 px-6 text-right">
                            <div className="flex items-center justify-end gap-2">
                              {getActionButton(obligation)}
                              <RowActionsDropdown
                                obligation={obligation}
                                isOpen={activeDropdown === obligation.id}
                                onToggle={() => setActiveDropdown(activeDropdown === obligation.id ? null : obligation.id)}
                              />
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-between mt-6">
                    <div className="text-sm text-gray-500">
                      Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredAndSortedObligations.length)} of {filteredAndSortedObligations.length} results
                    </div>
                    <div className="flex items-center gap-2">
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

                      {[...Array(totalPages)].map((_, i) => {
                        const page = i + 1;
                        if (
                          page === 1 ||
                          page === totalPages ||
                          (page >= currentPage - 1 && page <= currentPage + 1)
                        ) {
                          return (
                            <button
                              key={i}
                              onClick={() => setCurrentPage(page)}
                              className={`px-3 py-1 rounded-md ${currentPage === page
                                ? 'bg-blue-100 text-blue-600'
                                : 'text-gray-500 hover:bg-gray-100'
                                }`}
                            >
                              {page}
                            </button>
                          );
                        } else if (page === currentPage - 2 || page === currentPage + 2) {
                          return <span key={i} className="text-gray-400">...</span>;
                        }
                        return null;
                      })}

                      <button
                        onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                        disabled={currentPage === totalPages}
                        className={`p-2 rounded-md ${currentPage === totalPages
                          ? 'text-gray-300 cursor-not-allowed'
                          : 'text-gray-500 hover:bg-gray-100'
                          }`}
                      >
                        <ChevronRight size={16} />
                      </button>
                    </div>
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
