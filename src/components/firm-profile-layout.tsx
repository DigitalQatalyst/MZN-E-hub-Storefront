"use client";

import { useState } from "react";
import FirmProfilePage from "./firm-profile-page";

export default function FirmProfileLayout() {
  const [activeMenuItem, setActiveMenuItem] = useState("profile");

  const menuItems = [
    { key: "overview", label: "Overview", icon: "📊" },
    { key: "profile", label: "Profile", icon: "👤" },
    { key: "documents", label: "Documents", icon: "📄" },
    { key: "service-applications", label: "Service Applications", icon: "📋" },
    { key: "enquiries", label: "Enquiries", icon: "❓" },
    {
      key: "reporting-obligations",
      label: "Reporting Obligations",
      icon: "📈",
    },
    { key: "support-tickets", label: "Support Tickets", icon: "🎫" },
    { key: "settings", label: "Settings", icon: "⚙️" },
    { key: "support", label: "Support", icon: "💬" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center">
                <span className="text-white font-bold text-sm">D</span>
              </div>
              <span className="text-xl font-semibold text-gray-900">
                DIFC Connect
              </span>
            </div>
            <nav className="hidden md:flex space-x-6">
              <a href="#" className="text-gray-600 hover:text-gray-900">
                Enquiries
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900">
                Services
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900">
                Regulation
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900">
                Listings
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900">
                Media
              </a>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-400 hover:text-gray-600">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-gray-700">FL</span>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200 min-h-screen">
          <div className="p-4">
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-500 mb-2">
                FutureTech LLC
              </h3>
            </div>

            <div className="mb-6">
              <h4 className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3">
                Essentials
              </h4>
              <nav className="space-y-1">
                {menuItems.slice(0, 3).map((item) => (
                  <button
                    key={item.key}
                    onClick={() => setActiveMenuItem(item.key)}
                    className={`w-full flex items-center px-3 py-2 text-sm rounded-md transition-colors ${
                      activeMenuItem === item.key
                        ? "bg-red-50 text-red-700 border-r-2 border-red-600"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                  >
                    <span className="mr-3">{item.icon}</span>
                    {item.label}
                  </button>
                ))}
              </nav>
            </div>

            <div className="mb-6">
              <h4 className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3">
                Transactions
              </h4>
              <nav className="space-y-1">
                {menuItems.slice(3, 7).map((item) => (
                  <button
                    key={item.key}
                    onClick={() => setActiveMenuItem(item.key)}
                    className={`w-full flex items-center px-3 py-2 text-sm rounded-md transition-colors ${
                      activeMenuItem === item.key
                        ? "bg-red-50 text-red-700 border-r-2 border-red-600"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                  >
                    <span className="mr-3">{item.icon}</span>
                    {item.label}
                    {item.key === "service-applications" && (
                      <svg
                        className="ml-auto w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    )}
                  </button>
                ))}
              </nav>
            </div>

            <div>
              <h4 className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3">
                Settings & Support
              </h4>
              <nav className="space-y-1">
                {menuItems.slice(7).map((item) => (
                  <button
                    key={item.key}
                    onClick={() => setActiveMenuItem(item.key)}
                    className={`w-full flex items-center px-3 py-2 text-sm rounded-md transition-colors ${
                      activeMenuItem === item.key
                        ? "bg-red-50 text-red-700 border-r-2 border-red-600"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                  >
                    <span className="mr-3">{item.icon}</span>
                    {item.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 bg-gray-50">
          {activeMenuItem === "profile" && <FirmProfilePage />}
          {activeMenuItem !== "profile" && (
            <div className="p-6">
              <h1 className="text-3xl font-semibold text-gray-900 capitalize">
                {menuItems.find((item) => item.key === activeMenuItem)?.label ||
                  "Page"}
              </h1>
              <p className="mt-4 text-gray-600">
                This section is under development.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
