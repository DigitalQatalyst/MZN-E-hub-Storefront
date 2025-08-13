"use client";

import { useState } from "react";
import Navbar from "@component/navbar/Navbar copy";
import { Footer1 } from "@component/footer";
import TabNavigation from "@component/tab-navigation";
import ProfilePage from "@component/profile-page";
import SecurityPage from "@component/security-page";
import NotificationsPage from "@component/notifications-page";

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState("profile");

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

  return (
    <>
      <Navbar />
      <div
        style={{
          minHeight: "100vh",
          backgroundColor: "#f5f5f5",
          padding: "20px",
          fontFamily: "'Public Sans', sans-serif", // Added font family
        }}
      >
        <div
          style={{
            maxWidth: "800px",
            margin: "0 auto",
            backgroundColor: "white",
            borderRadius: "8px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            overflow: "hidden",
            fontFamily: "'Public Sans', sans-serif", // Added font family
          }}
        >
          <div
            style={{
              padding: "20px 20px 0 20px",
              borderBottom: "1px solid #e5e5e5",
              fontFamily: "'Public Sans', sans-serif", // Added font family
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "20px",
                fontFamily: "'Public Sans', sans-serif", // Added font family
              }}
            >
              <h1
                style={{
                  fontSize: "24px",
                  fontWeight: "600",
                  color: "#666",
                  margin: 0,
                  fontFamily: "'Public Sans', sans-serif", // Added font family
                }}
              >
                Account /{" "}
                {activeTab === "profile"
                  ? "Profile"
                  : activeTab === "security"
                  ? "Security"
                  : "Notifications"}
              </h1>
              <button
                style={{
                  background: "none",
                  border: "none",
                  fontSize: "20px",
                  color: "#999",
                  cursor: "pointer",
                  fontFamily: "'Public Sans', sans-serif", // Added font family
                }}
              >
                ×
              </button>
            </div>
            <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
          </div>
          <div
            style={{ padding: "30px", fontFamily: "'Public Sans', sans-serif" }}
          >
            {renderContent()}
          </div>
        </div>
      </div>
      <Footer1 />
    </>
  );
}
