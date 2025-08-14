"use client";
import { useState } from "react";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState({
    newForYou: { email: true, browser: true },
    accountActivity: { email: true, browser: true },
    newBrowser: { email: true, browser: true },
    newDevice: { email: true, browser: false },
  });

  const [originalNotifications, setOriginalNotifications] = useState(
    JSON.parse(JSON.stringify(notifications))
  ); // Storing the original state to compare with

  const [isChangesMade, setIsChangesMade] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleNotificationChange = (
    type: string,
    channel: string,
    value: boolean
  ) => {
    setNotifications((prev) => {
      const updatedNotifications = {
        ...prev,
        [type]: {
          ...prev[type as keyof typeof prev],
          [channel]: value,
        },
      };
      // Check if there are changes
      setIsChangesMade(
        JSON.stringify(updatedNotifications) !==
          JSON.stringify(originalNotifications)
      );
      return updatedNotifications;
    });
  };

  const handleSaveChanges = () => {
    // Save changes logic (e.g., API call to save the notifications preferences)
    setOriginalNotifications(JSON.parse(JSON.stringify(notifications))); // Save current state as the original state
    setSuccessMessage("Changes saved successfully!");
    setIsChangesMade(false); // Reset the changes flag after saving
  };

  const handleDiscardChanges = () => {
    // Reset to the original state
    setNotifications(JSON.parse(JSON.stringify(originalNotifications)));
    setIsChangesMade(false); // Reset the changes flag
    setSuccessMessage("");
  };

  const notificationTypes = [
    { key: "newForYou", label: "New for you" },
    { key: "accountActivity", label: "Account activity" },
    { key: "newBrowser", label: "A new browser used to sign in" },
    { key: "newDevice", label: "A new device is linked" },
  ];

  return (
    <div>
      <h2
        style={{
          fontSize: "20px",
          fontWeight: "600",
          color: "#374151",
          marginBottom: "10px",
        }}
      >
        Recent Devices
      </h2>

      <p
        style={{
          fontSize: "14px",
          color: "#6b7280",
          marginBottom: "30px",
        }}
      >
        We need permission from your browser to show notifications.{" "}
        <a
          href="#"
          style={{
            color: "#4B465C", // Updated color
            textDecoration: "none",
            fontWeight: "500",
          }}
        >
          Request Permission
        </a>
      </p>

      <div
        style={{
          border: "1px solid #e5e7eb",
          borderRadius: "6px",
          overflow: "hidden",
          marginBottom: "30px",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr",
            backgroundColor: "#f9fafb",
            padding: "15px 20px",
            borderBottom: "1px solid #e5e7eb",
            fontSize: "14px",
            fontWeight: "600",
            color: "#374151",
          }}
        >
          <div>TYPE</div>
          <div style={{ textAlign: "center" }}>EMAIL</div>
          <div style={{ textAlign: "center" }}>BROWSER</div>
        </div>

        {notificationTypes.map((type, index) => (
          <div
            key={type.key}
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 1fr 1fr",
              padding: "15px 20px",
              borderBottom:
                index < notificationTypes.length - 1
                  ? "1px solid #e5e7eb"
                  : "none",
              fontSize: "14px",
              color: "#374151",
            }}
          >
            <div>{type.label}</div>
            <div style={{ textAlign: "center" }}>
              <input
                type="checkbox"
                checked={
                  notifications[type.key as keyof typeof notifications].email
                }
                onChange={(e) =>
                  handleNotificationChange(type.key, "email", e.target.checked)
                }
                style={{
                  width: "18px",
                  height: "18px",
                  accentColor: "#2563eb",
                  cursor: "pointer",
                }}
              />
            </div>
            <div style={{ textAlign: "center" }}>
              <input
                type="checkbox"
                checked={
                  notifications[type.key as keyof typeof notifications].browser
                }
                onChange={(e) =>
                  handleNotificationChange(
                    type.key,
                    "browser",
                    e.target.checked
                  )
                }
                style={{
                  width: "18px",
                  height: "18px",
                  accentColor: "#2563eb",
                  cursor: "pointer",
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {successMessage && (
        <div
          style={{
            color: "#16a34a", // Success message color
            backgroundColor: "#d1fae5", // Light green background
            padding: "10px",
            borderRadius: "6px",
            marginBottom: "20px",
          }}
        >
          {successMessage}
        </div>
      )}

      <div style={{ display: "flex", gap: "12px" }}>
        <button
          style={{
            padding: "12px 24px",
            backgroundColor: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "6px",
            fontSize: "14px",
            fontWeight: "500",
            cursor: isChangesMade ? "pointer" : "not-allowed",
          }}
          onClick={handleSaveChanges}
          disabled={!isChangesMade}
        >
          Save Changes
        </button>
        <button
          style={{
            padding: "12px 24px",
            backgroundColor: "transparent",
            color: "#6b7280",
            border: "none",
            borderRadius: "6px",
            fontSize: "14px",
            fontWeight: "500",
            cursor: "pointer",
          }}
          onClick={handleDiscardChanges}
        >
          Discard
        </button>
      </div>
    </div>
  );
}
