"use client";
import { useState } from "react";

export default function ProfilePage() {
  const [formData, setFormData] = useState({
    firstName: "John",
    lastName: "Doe",
    phoneNumber: "674 758 7365",
    address: "",
  });
  const [confirmRemoval, setConfirmRemoval] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveChanges = () => {
    // Handle saving form data here
    // This could involve an API call to save the data to a backend
    console.log("Saving changes:", formData);
    alert("Changes saved successfully!");
  };

  const handleRemoveAccount = () => {
    // Logic for account removal, like making an API call to delete the account
    console.log("Account removal confirmed.");
    alert("Account removed successfully!");
  };

  return (
    <div>
      <div style={{ marginBottom: "40px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "20px",
            marginBottom: "20px",
          }}
        >
          <div>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                fontSize: "14px",
                fontWeight: "500",
                color: "#111827",
              }}
            >
              First Name
            </label>
            <input
              type="text"
              value={formData.firstName}
              onChange={(e) => handleInputChange("firstName", e.target.value)}
              style={{
                width: "100%",
                padding: "12px",
                border: "1px solid #d1d5db",
                borderRadius: "6px",
                fontSize: "14px",
                boxSizing: "border-box",
                fontFamily: "'Public Sans', sans-serif",
                color: "#9ca3af",
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
                color: "#111827",
              }}
            >
              Last Name
            </label>
            <input
              type="text"
              value={formData.lastName}
              onChange={(e) => handleInputChange("lastName", e.target.value)}
              style={{
                width: "100%",
                padding: "12px",
                border: "1px solid #d1d5db",
                borderRadius: "6px",
                fontSize: "14px",
                boxSizing: "border-box",
                fontFamily: "'Public Sans', sans-serif",
                color: "#9ca3af",
              }}
            />
          </div>
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
                color: "#111827",
              }}
            >
              Phone Number
            </label>
            <input
              type="text"
              value={formData.phoneNumber}
              onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
              style={{
                width: "100%",
                padding: "12px",
                border: "1px solid #d1d5db",
                borderRadius: "6px",
                fontSize: "14px",
                boxSizing: "border-box",
                fontFamily: "'Public Sans', sans-serif",
                color: "#9ca3af",
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
                color: "#111827",
              }}
            >
              Address
            </label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => handleInputChange("address", e.target.value)}
              placeholder="Address"
              style={{
                width: "100%",
                padding: "12px",
                border: "1px solid #d1d5db",
                borderRadius: "6px",
                fontSize: "14px",
                boxSizing: "border-box",
                fontFamily: "'Public Sans', sans-serif",
                color: "#9ca3af",
              }}
            />
          </div>
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

      <div>
        <h3
          style={{
            fontSize: "18px",
            fontWeight: "600",
            color: "#374151",
            marginBottom: "20px",
          }}
        >
          Remove Account
        </h3>

        <div
          style={{
            backgroundColor: "rgba(254, 243, 199, 0.16)",
            padding: "20px",
            borderRadius: "6px",
            marginBottom: "20px",
          }}
        >
          <p
            style={{
              color: "#d97706",
              fontSize: "16px",
              fontWeight: "600",
              margin: "0 0 8px 0",
            }}
          >
            Are you sure you want to remove your account?
          </p>
          <p
            style={{
              color: "#d97706",
              fontSize: "14px",
              margin: 0,
            }}
          >
            Once you remove your account, there is no going back. Please be
            certain.
          </p>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginBottom: "20px",
          }}
        >
          <input
            type="checkbox"
            id="confirmRemoval"
            checked={confirmRemoval}
            onChange={(e) => setConfirmRemoval(e.target.checked)}
            style={{
              width: "16px",
              height: "16px",
              cursor: "pointer",
            }}
          />
          <label
            htmlFor="confirmRemoval"
            style={{
              fontSize: "14px",
              color: "#6b7280",
              cursor: "pointer",
            }}
          >
            I confirm my account removal
          </label>
        </div>

        <button
          disabled={!confirmRemoval}
          style={{
            padding: "12px 24px",
            backgroundColor: "#EC0004", // Red background color
            color: "white",
            border: "none",
            borderRadius: "6px",
            fontSize: "14px",
            fontWeight: "500",
            cursor: confirmRemoval ? "pointer" : "not-allowed",
          }}
          onClick={handleRemoveAccount}
        >
          Remove Account
        </button>
      </div>
    </div>
  );
}
