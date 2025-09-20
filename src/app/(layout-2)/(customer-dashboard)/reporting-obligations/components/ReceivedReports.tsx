"use client";

import {
  CalendarIcon,
  ChevronRightIcon,
  ExternalLinkIcon,
  FileTextIcon,
} from "lucide-react";
import Link from "next/link";
import { ReceivedReport } from "../types/reporting";

interface ReceivedReportsProps {
  reports: ReceivedReport[];
}

export function ReceivedReports({ reports }: ReceivedReportsProps) {
  // Function to determine priority styling
  const getPriorityBadge = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "high":
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
            High
          </span>
        );
      case "medium":
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
            Medium
          </span>
        );
      case "low":
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
            Low
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
            {priority}
          </span>
        );
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm h-full w-full flex flex-col">
      <div className="border-b border-gray-200 p-6 flex justify-between items-center">
        <div>
          <h2 className="text-lg font-bold text-gray-900">Received Reports</h2>
          <p className="text-sm text-gray-600">
            Reports and updates from authorities
          </p>
        </div>
        <Link
          href="/reporting-obligations/received"
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
        >
          View All
          <ChevronRightIcon size={16} className="ml-1" />
        </Link>
      </div>

      <div className="p-6 flex-1 overflow-y-auto">
        {reports.length === 0 ? (
          <div className="text-center py-8 bg-gray-50 rounded-xl">
            <p className="text-gray-500">No received reports found.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {reports.slice(0, 4).map((report) => (
              <div
                key={report.id}
                className="p-3 bg-white rounded-xl border border-gray-200 hover:border-blue-200 transition-colors"
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-start flex-1 mr-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3 mt-0.5">
                      <FileTextIcon size={16} className="text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-gray-900 line-clamp-2">
                        {report.title}
                      </h3>
                      <p className="text-xs text-gray-500 mt-1 line-clamp-1">
                        {report.source}
                      </p>
                    </div>
                  </div>
                  {getPriorityBadge(report.priority)}
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center text-xs text-gray-500">
                    <CalendarIcon size={12} className="mr-1.5 text-gray-400" />
                    <span>
                      {new Date(report.receivedDate).toLocaleDateString()}
                    </span>
                  </div>
                  <button
                    className="text-blue-600 hover:text-blue-800 text-xs flex items-center"
                    onClick={() => window.open(report.fileUrl, "_blank")}
                  >
                    View
                    <ExternalLinkIcon size={12} className="ml-1" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
