"use client";

import {
  AlertCircleIcon,
  ArrowUpRightIcon,
  CalendarIcon,
  ChevronRightIcon,
  ClockIcon,
  UserIcon,
} from "lucide-react";
import Link from "next/link";
import { UpcomingObligation } from "../types/reporting";

interface UpcomingObligationsProps {
  obligations: UpcomingObligation[];
}

export function UpcomingObligations({ obligations }: UpcomingObligationsProps) {
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
          <button
            className="px-3 py-1.5 bg-red-600 text-white text-xs font-medium rounded-lg hover:bg-red-700 transition-colors flex items-center"
            onClick={() => console.log("Submit report", obligation.id)}
          >
            Submit Now
            <ArrowUpRightIcon size={12} className="ml-1" />
          </button>
        );
      case "due soon":
        return (
          <button
            className="px-3 py-1.5 bg-blue-600 text-white text-xs font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center"
            onClick={() => console.log("Prepare report", obligation.id)}
          >
            Prepare
            <ArrowUpRightIcon size={12} className="ml-1" />
          </button>
        );
      case "upcoming":
      default:
        return (
          <button
            className="px-3 py-1.5 text-blue-600 hover:bg-blue-50 text-xs font-medium rounded-lg transition-colors flex items-center"
            onClick={() => console.log("View report", obligation.id)}
          >
            View
            <ArrowUpRightIcon size={12} className="ml-1" />
          </button>
        );
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm h-full w-full flex flex-col">
      <div className="border-b border-gray-200 p-6 flex justify-between items-center">
        <div>
          <h2 className="text-lg font-bold text-gray-900">
            Upcoming Obligations
          </h2>
          <p className="text-sm text-gray-600">Reports you need to file soon</p>
        </div>
        <Link
          href="/reporting-obligations/obligations"
          className="text-sm text-blue-600 hover:text-blue-800 font-bold whitespace-nowrap flex items-center"
        >
          View All
          <ChevronRightIcon size={14} className="ml-1" />
        </Link>
      </div>

      <div className="p-6 flex-1 overflow-y-auto">
        {obligations.length === 0 ? (
          <div className="text-center py-8 bg-gray-50 rounded-xl">
            <p className="text-gray-500">No upcoming obligations found.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {obligations.map((obligation) => (
              <div
                key={obligation.id}
                className="p-3 bg-white rounded-xl border border-gray-200 hover:border-blue-200 transition-colors"
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-sm font-medium text-gray-900 line-clamp-1 flex-1 mr-3">
                    {obligation.name}
                  </h3>
                  {getStatusBadge(obligation.status)}
                </div>
                <div className="flex justify-between items-end">
                  <div className="flex flex-col space-y-1 text-xs text-gray-500">
                    <div className="flex items-center">
                      <CalendarIcon
                        size={12}
                        className="mr-1.5 text-gray-400"
                      />
                      <span>
                        Due: {new Date(obligation.dueDate).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <UserIcon size={12} className="mr-1.5 text-gray-400" />
                      <span>Assigned to: {obligation.assignedTo}</span>
                    </div>
                  </div>
                  <div>{getActionButton(obligation)}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
