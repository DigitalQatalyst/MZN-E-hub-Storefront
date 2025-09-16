"use client";

import { User, Lock, Bell } from "lucide-react";

interface TabNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function TabNavigation({
  activeTab,
  onTabChange,
}: TabNavigationProps) {
  const tabs = [
    {
      id: "profile",
      label: "Profile",
      icon: User,
    },
    {
      id: "security",
      label: "Security",
      icon: Lock,
    },
    {
      id: "notifications",
      label: "Notifications",
      icon: Bell,
    },
  ];

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-start",
        gap: "16px",
        flexWrap: "nowrap",
        width: "100%",
        height: "100%",
        padding: "0px",
        marginRight: "20px",
        backgroundColor: "#F3F4F6", // Light grey background color
        paddingTop: "8px", // Padding to adjust space at the top of the tabs
        paddingBottom: "8px", // Padding to adjust space at the bottom of the tabs
      }}
    >
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "10px 20px",
              fontSize: "15px",
              fontWeight: "500",
              lineHeight: "18px",
              letterSpacing: "0.43px",
              fontFamily: '"Public Sans", sans-serif',
              backgroundColor: isActive ? "#2563eb" : "transparent",
              color: isActive ? "white" : "#A8AAAE",
              borderRadius: "6px",
              border: "none",
              cursor: "pointer",
              transition: "all 0.2s ease",
              fontFeatureSettings: "'liga' off, 'clig' off",
            }}
          >
            <Icon
              size={16}
              style={{
                color: isActive ? "white" : "#A8AAAE",
                transition: "color 0.3s ease",
              }}
            />
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
