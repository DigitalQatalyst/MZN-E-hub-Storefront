"use client";

import { ChevronRightIcon, ExternalLinkIcon, FileTextIcon } from "lucide-react";
import Link from "next/link";
import { SubmittedReport } from "../types/reporting";

interface SubmittedReportsProps {
  reports: SubmittedReport[];
}

export function SubmittedReports({ reports }: SubmittedReportsProps) {
  // Function to determine status styling
  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "approved":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            Approved
          </span>
        );
      case "pending review":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            Pending Review
          </span>
        );
      case "rejected":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            Rejected
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm h-full w-full flex flex-col">
      <div className="border-b border-gray-200 p-6 flex justify-between items-center">
        <div>
          <h2 className="text-lg font-bold text-gray-900">Submitted Reports</h2>
          <p className="text-sm text-gray-600">
            Reports you have submitted for review
          </p>
        </div>
        <Link
          href="/reporting-obligations/submitted"
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
        >
          View All
          <ChevronRightIcon size={16} className="ml-1" />
        </Link>
      </div>

      <div className="p-6 flex-1 overflow-y-auto">
        {reports.length === 0 ? (
          <div className="text-center py-8 bg-gray-50 rounded-xl">
            <p className="text-gray-500">No submitted reports found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-3">
                    Report
                  </th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-3">
                    Status
                  </th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-3">
                    Submitted
                  </th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-3">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {reports.slice(0, 5).map((report) => (
                  <tr key={report.id} className="hover:bg-gray-50">
                    <td className="py-3">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                          <FileTextIcon size={16} className="text-blue-600" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {report.name}
                          </div>
                          <div className="text-xs text-gray-500">
                            {report.type}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3">{getStatusBadge(report.status)}</td>
                    <td className="py-3">
                      <div className="text-sm text-gray-900">
                        {new Date(report.submittedDate).toLocaleDateString()}
                      </div>
                      <div className="text-xs text-gray-500">
                        {report.reviewer}
                      </div>
                    </td>
                    <td className="py-3">
                      <button
                        className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
                        onClick={() => window.open(report.fileUrl, "_blank")}
                      >
                        View
                        <ExternalLinkIcon size={12} className="ml-1" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
