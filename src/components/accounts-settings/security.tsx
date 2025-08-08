"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Security() {
  const router = useRouter();

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#F9FAFB",
        padding: "24px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "24px",
        }}
      >
        <h2
          style={{ fontSize: "1.25rem", fontWeight: "600", color: "#4B5563" }}
        >
          Account / Security
        </h2>
        <button style={{ color: "#6B7280", fontSize: "1.25rem" }}>
          &times;
        </button>
      </div>
      <div
        style={{
          backgroundColor: "#FFFFFF",
          padding: "24px",
          borderRadius: "8px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div style={{ display: "flex", gap: "16px", marginBottom: "24px" }}>
          <Link href="/account-settings/profile">
            <button
              style={{
                display: "flex",
                alignItems: "center",
                padding: "8px 16px",
                color: "#6B7280",
                cursor: "pointer",
              }}
            >
              <span style={{ marginRight: "8px" }}>👤</span> Profile
            </button>
          </Link>
          <Link href="/account-settings/security">
            <button
              style={{
                display: "flex",
                alignItems: "center",
                padding: "8px 16px",
                backgroundColor: "#BFDBFE",
                color: "#3B82F6",
                borderRadius: "8px",
              }}
            >
              <span style={{ marginRight: "8px" }}>🔒</span> Security
            </button>
          </Link>
          <Link href="/src/components/accounts-settings/notifications">
            <button
              style={{
                display: "flex",
                alignItems: "center",
                padding: "8px 16px",
                color: "#6B7280",
                cursor: "pointer",
              }}
            >
              <span style={{ marginRight: "8px" }}>🔔</span> Notifications
            </button>
          </Link>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "16px",
          }}
        >
          <div>
            <label
              style={{
                fontSize: "0.875rem",
                fontWeight: "500",
                color: "#4B5563",
              }}
            >
              Current Password
            </label>
            <input
              type="password"
              defaultValue="••••••••"
              style={{
                width: "100%",
                padding: "8px",
                border: "1px solid #D1D5DB",
                borderRadius: "8px",
                marginTop: "8px",
              }}
            />
          </div>
          <div>
            <label
              style={{
                fontSize: "0.875rem",
                fontWeight: "500",
                color: "#4B5563",
              }}
            >
              New Password
            </label>
            <input
              type="password"
              defaultValue="••••••••"
              style={{
                width: "100%",
                padding: "8px",
                border: "1px solid #D1D5DB",
                borderRadius: "8px",
                marginTop: "8px",
              }}
            />
          </div>
          <div>
            <label
              style={{
                fontSize: "0.875rem",
                fontWeight: "500",
                color: "#4B5563",
              }}
            >
              Confirm New Password
            </label>
            <input
              type="password"
              defaultValue="••••••••"
              style={{
                width: "100%",
                padding: "8px",
                border: "1px solid #D1D5DB",
                borderRadius: "8px",
                marginTop: "8px",
              }}
            />
          </div>
          <div>
            <p
              style={{
                fontSize: "0.875rem",
                fontWeight: "500",
                color: "#4B5563",
              }}
            >
              Password Requirements:
            </p>
            <ul
              style={{
                listStyleType: "disc",
                paddingLeft: "20px",
                color: "#4B5563",
              }}
            >
              <li>Minimum 8 characters long - the more, the better</li>
              <li>At least one lowercase character</li>
              <li>At least one number, symbol, or whitespace character</li>
            </ul>
          </div>
          <div style={{ display: "flex", gap: "16px", marginTop: "24px" }}>
            <button
              style={{
                padding: "8px 16px",
                backgroundColor: "#3B82F6",
                color: "#FFFFFF",
                borderRadius: "8px",
              }}
            >
              Save Changes
            </button>
            <button
              style={{
                padding: "8px 16px",
                backgroundColor: "#E5E7EB",
                color: "#374151",
                borderRadius: "8px",
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
