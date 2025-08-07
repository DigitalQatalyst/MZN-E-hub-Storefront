"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Notifications() {
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
          Account / Notifications
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
                color: "#6B7280",
                cursor: "pointer",
              }}
            >
              <span style={{ marginRight: "8px" }}>🔒</span> Security
            </button>
          </Link>
          <Link href="/MZN-E-hub-Storefront/src/components/accounts-settings/security">
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
          {/* Recent devices table and checkboxes */}
          <div>
            <h3
              style={{
                fontSize: "1.125rem",
                fontWeight: "500",
                color: "#4B5563",
              }}
            >
              Recent Devices
            </h3>
            <p style={{ fontSize: "0.875rem", color: "#6B7280" }}>
              We need permission from your browser to show notifications.
              Request Permission
            </p>
            <div
              style={{
                border: "1px solid #D1D5DB",
                borderRadius: "8px",
                padding: "16px",
                marginTop: "16px",
              }}
            >
              <table style={{ width: "100%" }}>
                <thead>
                  <tr>
                    <th
                      style={{
                        textAlign: "left",
                        fontSize: "0.875rem",
                        color: "#4B5563",
                      }}
                    >
                      TYPE
                    </th>
                    <th
                      style={{
                        textAlign: "left",
                        fontSize: "0.875rem",
                        color: "#4B5563",
                      }}
                    >
                      EMAIL
                    </th>
                    <th
                      style={{
                        textAlign: "left",
                        fontSize: "0.875rem",
                        color: "#4B5563",
                      }}
                    >
                      BROWSER
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td
                      style={{
                        padding: "8px 0",
                        fontSize: "0.875rem",
                        color: "#6B7280",
                      }}
                    >
                      New for you
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        checked
                        style={{ marginRight: "8px" }}
                      />
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        checked
                        style={{ marginRight: "8px" }}
                      />
                    </td>
                  </tr>
                  {/* More rows as needed */}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
