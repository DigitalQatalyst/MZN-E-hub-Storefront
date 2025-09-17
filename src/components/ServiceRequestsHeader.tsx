import React from "react";
import { PlusIcon, MenuIcon, XIcon } from "lucide-react";
interface ServiceRequestsHeaderProps {
  onRequestNewService: () => void;
  toggleSidebar?: () => void;
  sidebarOpen?: boolean;
}
export function ServiceRequestsHeader({
  onRequestNewService,
  toggleSidebar,
  sidebarOpen,
}: ServiceRequestsHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-4 md:p-6 border-b border-gray-200">
      <div className="flex items-center">
        {toggleSidebar && (
          <button
            className="md:hidden mr-3 text-gray-600"
            onClick={toggleSidebar}
            aria-label="Toggle sidebar"
          >
            {sidebarOpen ? <XIcon size={20} /> : <MenuIcon size={20} />}
          </button>
        )}
        <h1 className="text-2xl font-semibold text-gray-900">
          Service Requests
        </h1>
      </div>
      {/* Mobile: Icon-only button, Desktop: Full button with text */}
      <button
        onClick={onRequestNewService}
        className="inline-flex items-center px-3 py-2 sm:px-4 sm:py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        aria-label="Request new service"
      >
        <PlusIcon className="w-4 h-4 sm:mr-2" />
        <span className="hidden sm:inline">Request New Service</span>
        <span className="inline sm:hidden">New Request</span>
      </button>
    </div>
  );
}
