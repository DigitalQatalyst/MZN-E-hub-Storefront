"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function FirmProfilePage() {
  const [activeTab, setActiveTab] = useState("premises-infrastructure");
  const router = useRouter();

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold text-gray-900">Profile</h1>
      </div>

      <div className="w-full">
        <div className="border-b border-gray-200 mb-6">
          <div className="flex space-x-8">
            {[
              { key: "license-information", label: "License Information" },
              { key: "organization-details", label: "Organization Details" },
              { key: "ownership-control", label: "Ownership & Control" },
              {
                key: "premises-infrastructure",
                label: "Premises & Infrastructure",
              },
              {
                key: "additional-information",
                label: "Additional Information",
              },
            ].map((tab) => (
              <button
                key={tab.key}
                className={`cursor-pointer py-3 px-1 text-sm font-medium transition-colors border-b-2 ${
                  activeTab === tab.key
                    ? "border-red-600 text-red-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
                onClick={() => setActiveTab(tab.key)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {activeTab === "premises-infrastructure" && (
          <div className="space-y-6">
            <div className="bg-white border border-gray-300 rounded-lg shadow-sm">
              <div className="px-6 py-4 border-b border-gray-300">
                <h2 className="text-xl font-semibold text-gray-800">
                  DIFC Premises
                </h2>
              </div>
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-medium text-sm text-gray-600 mb-2">
                      DIFC Premises
                    </h4>
                    <p className="text-sm text-gray-800 mb-2">
                      Premises within the DIFC
                    </p>
                    <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Yes
                    </span>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm text-gray-600 mb-2">
                      Building
                    </h4>
                    <p className="text-sm text-gray-800">
                      Emirates Financial Towers
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-medium text-sm text-gray-600 mb-2">
                      Office Address
                    </h4>
                    <p className="text-sm text-gray-800">
                      Level 15, Office 1501
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm text-gray-600 mb-2">
                      Office Phone
                    </h4>
                    <p className="text-sm text-gray-800">+971 4 123 4567</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-sm text-gray-600 mb-2">
                    DIFC District
                  </h4>
                  <p className="text-sm text-gray-800">Gate District</p>
                </div>

                <div className="border-t border-gray-300 pt-6">
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full border border-gray-400 flex items-center justify-center mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm text-gray-800 mb-1">
                        Office Sharing Arrangement
                      </h4>
                      <p className="text-sm text-gray-600">No</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-300 rounded-lg shadow-sm">
              <div className="px-6 py-4 border-b border-gray-300">
                <h2 className="text-xl font-semibold text-gray-800">
                  IT Systems & Technology
                </h2>
              </div>
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-medium text-sm text-gray-600 mb-2">
                      IT Service Level
                    </h4>
                    <p className="text-sm text-gray-800">
                      Completely reliant on IT systems
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm text-gray-600 mb-2">
                      IT Environment Complexity
                    </h4>
                    <p className="text-sm text-gray-800">
                      Uses complex technologies to deliver services
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-medium text-sm text-gray-600 mb-2">
                      Internal Applications
                    </h4>
                    <p className="text-sm text-gray-800">
                      More than 5 applications
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm text-gray-600 mb-2">
                      Third-party Providers
                    </h4>
                    <p className="text-sm text-gray-800">
                      More than 3 providers
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-medium text-sm text-gray-600 mb-2">
                      Cloud Services
                    </h4>
                    <p className="text-sm text-gray-800">Private/hybrid</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm text-gray-600 mb-2">
                      System Technologies
                    </h4>
                    <p className="text-sm text-gray-800">
                      Two or more enabling technologies
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-300 rounded-lg shadow-sm">
              <div className="px-6 py-4 border-b border-gray-300">
                <h2 className="text-xl font-semibold text-gray-800">
                  Client-Facing Technology
                </h2>
              </div>
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-medium text-sm text-gray-600 mb-2">
                      Online Presence
                    </h4>
                    <p className="text-sm text-gray-800">
                      Internet applications (web/mobile)
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm text-gray-600 mb-2">
                      Mobile Presence
                    </h4>
                    <p className="text-sm text-gray-800">Mobile banking apps</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-sm text-gray-600 mb-2">
                    Expected IT Developments (First Year)
                  </h4>
                  <p className="text-sm text-gray-800">
                    Significant development expected
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-300 rounded-lg shadow-sm">
              <div className="px-6 py-4 border-b border-gray-300">
                <h2 className="text-xl font-semibold text-gray-800">
                  Cybersecurity
                </h2>
              </div>
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-medium text-sm text-gray-600 mb-2">
                      Security Policy Status
                    </h4>
                    <p className="text-sm text-gray-800">
                      Written policy approved by senior management
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm text-gray-600 mb-2">
                      Cyber Risk Assessed
                    </h4>
                    <p className="text-sm text-gray-800">Yes</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-sm text-gray-600 mb-2">
                    Incident Response Plan Implemented
                  </h4>
                  <p className="text-sm text-gray-800">Yes</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
