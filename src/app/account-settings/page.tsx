"use client";
import Navbar from "@component/navbar/Navbar copy";
import { Footer1 } from "@component/footer";
import { useRouter } from "next/navigation";
import Link from "next/link";
// import Security from "@component/accounts-settings/security";
// // import Notifications from "@component/accounts-settings/notifications";

export default function AccountSettings() {
  const router = useRouter();

  return (
    <>
      <Navbar />

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
            Account / Profile
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
                  backgroundColor: "#BFDBFE",
                  color: "#3B82F6",
                  borderRadius: "8px",
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
            <Link href="/account-settings/notifications">
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

          {/* Form Layout - 2x2 Grid */}
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
                First Name
              </label>
              <input
                type="text"
                defaultValue="John"
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
                Last Name
              </label>
              <input
                type="text"
                defaultValue="Doe"
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
                Phone Number
              </label>
              <input
                type="text"
                defaultValue="674 758 7365"
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
                Address
              </label>
              <input
                type="text"
                defaultValue="Address"
                style={{
                  width: "100%",
                  padding: "8px",
                  border: "1px solid #D1D5DB",
                  borderRadius: "8px",
                  marginTop: "8px",
                }}
              />
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

          {/* Account Removal Section */}
          <div style={{ marginTop: "24px" }}>
            <h3
              style={{
                fontSize: "1.125rem",
                fontWeight: "500",
                color: "#4B5563",
              }}
            >
              Remove Account
            </h3>
            <div
              style={{
                padding: "16px",
                backgroundColor: "#FEF3C7",
                border: "1px solid #FBBF24",
                borderRadius: "8px",
                marginTop: "8px",
              }}
            >
              <p style={{ color: "#F97316" }}>
                Are you sure you want to remove your account?
              </p>
              <p style={{ color: "#F97316" }}>
                Once you remove your account, there is no going back. Please be
                certain.
              </p>
              <div
                style={{
                  marginTop: "8px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <input
                  type="checkbox"
                  id="confirmRemoval"
                  style={{ marginRight: "8px" }}
                />
                <label
                  htmlFor="confirmRemoval"
                  style={{
                    fontSize: "0.875rem",
                    fontWeight: "500",
                    color: "#4B5563",
                  }}
                >
                  I confirm my account removal
                </label>
              </div>
              <button
                style={{
                  marginTop: "8px",
                  padding: "8px 16px",
                  backgroundColor: "#EF4444",
                  color: "#FFFFFF",
                  borderRadius: "8px",
                }}
              >
                Remove Account
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer1 />
    </>
  );
}
