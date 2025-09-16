"use client";

import { useState } from "react";
import { X } from "lucide-react";
import TabNavigation from "./tab-navigation";
import ProfilePage from "./profile-page";
import SecurityPage from "./security-page";
import NotificationsPage from "./notifications-page";
import { flex } from "styled-system";

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AccountModal({ isOpen, onClose }: AccountModalProps) {
  const [activeTab, setActiveTab] = useState("profile");

  const getTabDimensions = () => {
    switch (activeTab) {
      case "profile":
        return { width: "848px", height: "679px", align: "center" };
      case "security":
        return { width: "848px", height: "559px" };
      case "notifications":
        return { width: "848px", height: "548px" };
      default:
        return { width: "848px", height: "679px" };
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return <ProfilePage />;
      case "security":
        return <SecurityPage />;
      case "notifications":
        return <NotificationsPage />;
      default:
        return <ProfilePage />;
    }
  };

  if (!isOpen) return null;

  const dimensions = getTabDimensions();

  return (
    <div
      className="inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-xl overflow-hidden relative"
        style={{ width: dimensions.width, height: dimensions.height }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-1 rounded-md hover:bg-gray-100 transition-colors z-10"
        >
          <X size={20} />
        </button>

        <div className="p-6 pb-0 border-b border-gray-200">
          <h1 className="text-2xl font-semibold text-gray-600 font-sans mb-6">
            Account /{" "}
            {activeTab === "profile"
              ? "Profile"
              : activeTab === "security"
              ? "Security"
              : "Notifications"}
          </h1>
          <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
        </div>
        <div
          className="p-6 overflow-y-auto"
          style={{ height: `calc(${dimensions.height} - 140px)` }}
        >
          {renderContent()}
        </div>
      </div>
    </div>
  );
}
