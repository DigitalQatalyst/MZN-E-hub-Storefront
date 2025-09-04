"use client";
import { useState } from "react";

export default function SecurityPage() {
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const [error, setError] = useState<string>("");

  const handlePasswordChange = (field: string, value: string) => {
    setPasswords((prev) => ({ ...prev, [field]: value }));
    setError(""); // Reset error on input change
  };

  const validatePasswords = () => {
    const { current, new: newPassword, confirm } = passwords;

    if (!current || !newPassword || !confirm) {
      return "All fields are required.";
    }

    if (newPassword !== confirm) {
      return "New password and confirmation do not match.";
    }

    if (newPassword.length < 8) {
      return "New password must be at least 8 characters long.";
    }

    if (!/[a-z]/.test(newPassword)) {
      return "New password must contain at least one lowercase letter.";
    }

    if (!/[0-9!@#$%^&*(),.?":{}|<>]/.test(newPassword)) {
      return "New password must contain at least one number, symbol, or whitespace character.";
    }

    return "";
  };

  const handleSaveChanges = () => {
    const validationError = validatePasswords();
    if (validationError) {
      setError(validationError);
      return;
    }

    // Handle saving the password changes (e.g., make an API call)
    console.log("Saving password changes:", passwords);
    alert("Password changes saved successfully!");
  };

  return (
    <div>
      <h2
        style={{
          fontSize: "24px",
          fontWeight: "600",
          color: "#374151",
          marginBottom: "30px",
        }}
      >
        Change Password
      </h2>

      {error && (
        <div
          style={{
            color: "#dc2626",
            backgroundColor: "#fee2e2",
            padding: "10px",
            borderRadius: "6px",
            marginBottom: "20px",
          }}
        >
          {error}
        </div>
      )}

      <div style={{ marginBottom: "20px" }}>
        <label
          style={{
            display: "block",
            marginBottom: "8px",
            fontSize: "14px",
            fontWeight: "500",
            color: "#374151",
          }}
        >
          Current Password
        </label>
        <input
          type="password"
          value={passwords.current}
          onChange={(e) => handlePasswordChange("current", e.target.value)}
          style={{
            width: "100%",
            maxWidth: "400px",
            padding: "12px",
            border: "1px solid #d1d5db",
            borderRadius: "6px",
            fontSize: "15px", // Matching font size with screenshot
            fontFamily: "'Public Sans', sans-serif",
            color: "#4B465C",
            fontFeatureSettings: "'liga' off, 'clig' off", // To match styling
            placeholder: "#4B465C", // Placeholder color
            outline: "none",
            marginBottom: "20px", // Space between fields
          }}
        />
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "20px",
          marginBottom: "30px",
        }}
      >
        <div>
          <label
            style={{
              display: "block",
              marginBottom: "8px",
              fontSize: "14px",
              fontWeight: "500",
              color: "#374151",
            }}
          >
            New Password
          </label>
          <input
            type="password"
            value={passwords.new}
            onChange={(e) => handlePasswordChange("new", e.target.value)}
            style={{
              width: "100%",
              padding: "12px",
              border: "1px solid #d1d5db",
              borderRadius: "6px",
              fontSize: "15px", // Matching font size with screenshot
              fontFamily: "'Public Sans', sans-serif",
              color: "#4B465C",
              fontFeatureSettings: "'liga' off, 'clig' off", // To match styling
              placeholder: "#4B465C", // Placeholder color
              outline: "none",
              marginBottom: "20px", // Space between fields
            }}
          />
        </div>
        <div>
          <label
            style={{
              display: "block",
              marginBottom: "8px",
              fontSize: "14px",
              fontWeight: "500",
              color: "#374151",
            }}
          >
            Confirm New Password
          </label>
          <input
            type="password"
            value={passwords.confirm}
            onChange={(e) => handlePasswordChange("confirm", e.target.value)}
            style={{
              width: "100%",
              padding: "12px",
              border: "1px solid #d1d5db",
              borderRadius: "6px",
              fontSize: "15px", // Matching font size with screenshot
              fontFamily: "'Public Sans', sans-serif",
              color: "#4B465C",
              fontFeatureSettings: "'liga' off, 'clig' off", // To match styling
              placeholder: "#4B465C", // Placeholder color
              outline: "none",
              marginBottom: "20px", // Space between fields
            }}
          />
        </div>
      </div>

      <div style={{ marginBottom: "30px" }}>
        <h4
          style={{
            fontSize: "16px",
            fontWeight: "600",
            color: "#374151",
            marginBottom: "15px",
          }}
        >
          Password Requirements:
        </h4>
        <ul
          style={{
            listStyle: "disc",
            paddingLeft: "20px",
            color: "#6b7280",
            fontSize: "14px",
            lineHeight: "1.6",
          }}
        >
          <li>Minimum 8 characters long - the more, the better</li>
          <li>At least one lowercase character</li>
          <li>At least one number, symbol, or whitespace character</li>
        </ul>
      </div>

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
            cursor: "pointer",
          }}
          onClick={handleSaveChanges}
        >
          Save Changes
        </button>
        <button
          style={{
            padding: "12px 24px",
            backgroundColor: "rgba(168, 170, 174, 0.16)", // Updated background color
            color: "#6b7280",
            border: "none",
            borderRadius: "6px",
            fontSize: "14px",
            fontWeight: "500",
            cursor: "pointer",
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
