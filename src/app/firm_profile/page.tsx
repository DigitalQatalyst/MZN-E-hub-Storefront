"use client";

import { useState } from "react";

export default function FirmProfilePage() {
  const [activeTab, setActiveTab] = useState("premises-infrastructure");
  return (
    <div
      style={{
        padding: "32px",
        maxWidth: "1400px",
        margin: "0 auto",
        backgroundColor: "#f8fafc",
        minHeight: "100vh",
      }}
    >
      <div style={{ marginBottom: "24px" }}>
        <h1
          style={{
            fontSize: "28px",
            fontWeight: "600",
            color: "#1a202c",
            margin: "0 0 16px 0",
          }}
        >
          Profile
        </h1>
      </div>

      <div style={{ width: "100%" }}>
        <div
          style={{
            borderBottom: "1px solid #e2e8f0",
            marginBottom: "24px",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "32px",
              marginBottom: "-1px",
            }}
          >
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
              <div
                key={tab.key}
                style={{
                  cursor: "pointer",
                  padding: "12px 4px",
                  fontSize: "14px",
                  fontWeight: activeTab === tab.key ? "600" : "500",
                  borderBottom:
                    activeTab === tab.key
                      ? "2px solid #3b82f6"
                      : "2px solid transparent",
                  color: activeTab === tab.key ? "#3b82f6" : "#64748b",
                  transition: "all 0.2s",
                  whiteSpace: "nowrap",
                }}
                onClick={() => setActiveTab(tab.key)}
                onMouseEnter={(e) => {
                  if (activeTab !== tab.key) {
                    const target = e.target as HTMLDivElement;
                    target.style.color = "#1a202c";
                    target.style.borderBottomColor = "#cbd5e0";
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeTab !== tab.key) {
                    const target = e.target as HTMLDivElement;
                    target.style.color = "#64748b";
                    target.style.borderBottomColor = "transparent";
                  }
                }}
              >
                {tab.label}
              </div>
            ))}
          </div>
        </div>

        {activeTab === "premises-infrastructure" && (
          <div
            style={{ display: "flex", flexDirection: "column", gap: "24px" }}
          >
            {/* DIFC Premises */}
            <div
              style={{
                backgroundColor: "white",
                border: "1px solid #e2e8f0",
                borderRadius: "8px",
                boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
              }}
            >
              <div
                style={{
                  padding: "24px 24px 0",
                  borderBottom: "1px solid #e2e8f0",
                }}
              >
                <h2
                  style={{
                    fontSize: "18px",
                    fontWeight: "600",
                    color: "#1a202c",
                    margin: "0 0 24px 0",
                  }}
                >
                  DIFC Premises
                </h2>
              </div>
              <div style={{ padding: "24px" }}>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "32px",
                    marginBottom: "24px",
                  }}
                >
                  <div>
                    <h4
                      style={{
                        fontWeight: "500",
                        fontSize: "14px",
                        color: "#64748b",
                        marginBottom: "8px",
                      }}
                    >
                      DIFC Premises
                    </h4>
                    <p
                      style={{
                        fontSize: "14px",
                        color: "#1a202c",
                        marginBottom: "8px",
                        margin: "0 0 8px 0",
                      }}
                    >
                      Premises within the DIFC
                    </p>
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        padding: "4px 12px",
                        borderRadius: "4px",
                        fontSize: "12px",
                        fontWeight: "500",
                        backgroundColor: "#10b981",
                        color: "white",
                      }}
                    >
                      Yes
                    </span>
                  </div>
                  <div>
                    <h4
                      style={{
                        fontWeight: "500",
                        fontSize: "14px",
                        color: "#64748b",
                        marginBottom: "8px",
                      }}
                    >
                      Building
                    </h4>
                    <p
                      style={{
                        fontSize: "14px",
                        color: "#1a202c",
                        margin: "0",
                      }}
                    >
                      Emirates Financial Towers
                    </p>
                  </div>
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "32px",
                    marginBottom: "24px",
                  }}
                >
                  <div>
                    <h4
                      style={{
                        fontWeight: "500",
                        fontSize: "14px",
                        color: "#64748b",
                        marginBottom: "8px",
                      }}
                    >
                      Office Address
                    </h4>
                    <p
                      style={{
                        fontSize: "14px",
                        color: "#1a202c",
                        margin: "0",
                      }}
                    >
                      Level 15, Office 1501
                    </p>
                  </div>
                  <div>
                    <h4
                      style={{
                        fontWeight: "500",
                        fontSize: "14px",
                        color: "#64748b",
                        marginBottom: "8px",
                      }}
                    >
                      Office Phone
                    </h4>
                    <p
                      style={{
                        fontSize: "14px",
                        color: "#1a202c",
                        margin: "0",
                      }}
                    >
                      +971 4 123 4567
                    </p>
                  </div>
                </div>

                <div style={{ marginBottom: "24px" }}>
                  <h4
                    style={{
                      fontWeight: "500",
                      fontSize: "14px",
                      color: "#64748b",
                      marginBottom: "8px",
                    }}
                  >
                    DIFC District
                  </h4>
                  <p
                    style={{
                      fontSize: "14px",
                      color: "#1a202c",
                      margin: "0",
                    }}
                  >
                    Gate District
                  </p>
                </div>

                <div
                  style={{
                    borderTop: "1px solid #e2e8f0",
                    paddingTop: "24px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "12px",
                    }}
                  >
                    <div
                      style={{
                        width: "24px",
                        height: "24px",
                        borderRadius: "50%",
                        backgroundColor: "#3b82f6",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginTop: "2px",
                        fontSize: "12px",
                      }}
                    >
                      📍
                    </div>
                    <div>
                      <h4
                        style={{
                          fontWeight: "500",
                          fontSize: "14px",
                          color: "#1a202c",
                          marginBottom: "4px",
                          margin: "0 0 4px 0",
                        }}
                      >
                        Office Sharing Arrangement
                      </h4>
                      <p
                        style={{
                          fontSize: "14px",
                          color: "#64748b",
                          margin: "0",
                        }}
                      >
                        No
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* IT Systems & Technology */}
            <div
              style={{
                backgroundColor: "white",
                border: "1px solid #e2e8f0",
                borderRadius: "8px",
                boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
              }}
            >
              <div
                style={{
                  padding: "24px 24px 0",
                  borderBottom: "1px solid #e2e8f0",
                }}
              >
                <h2
                  style={{
                    fontSize: "18px",
                    fontWeight: "600",
                    color: "#1a202c",
                    margin: "0 0 24px 0",
                  }}
                >
                  IT Systems & Technology
                </h2>
              </div>
              <div style={{ padding: "24px" }}>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "32px",
                    marginBottom: "24px",
                  }}
                >
                  <div>
                    <h4
                      style={{
                        fontWeight: "500",
                        fontSize: "14px",
                        color: "#64748b",
                        marginBottom: "8px",
                      }}
                    >
                      IT Service Level
                    </h4>
                    <p
                      style={{
                        fontSize: "14px",
                        color: "#1a202c",
                        margin: "0",
                      }}
                    >
                      Completely reliant on IT systems
                    </p>
                  </div>
                  <div>
                    <h4
                      style={{
                        fontWeight: "500",
                        fontSize: "14px",
                        color: "#64748b",
                        marginBottom: "8px",
                      }}
                    >
                      IT Environment Complexity
                    </h4>
                    <p
                      style={{
                        fontSize: "14px",
                        color: "#1a202c",
                        margin: "0",
                      }}
                    >
                      Uses complex technologies to deliver services
                    </p>
                  </div>
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "32px",
                    marginBottom: "24px",
                  }}
                >
                  <div>
                    <h4
                      style={{
                        fontWeight: "500",
                        fontSize: "14px",
                        color: "#64748b",
                        marginBottom: "8px",
                      }}
                    >
                      Internal Applications
                    </h4>
                    <p
                      style={{
                        fontSize: "14px",
                        color: "#1a202c",
                        margin: "0",
                      }}
                    >
                      More than 5 applications
                    </p>
                  </div>
                  <div>
                    <h4
                      style={{
                        fontWeight: "500",
                        fontSize: "14px",
                        color: "#64748b",
                        marginBottom: "8px",
                      }}
                    >
                      Third-party Providers
                    </h4>
                    <p
                      style={{
                        fontSize: "14px",
                        color: "#1a202c",
                        margin: "0",
                      }}
                    >
                      More than 3 providers
                    </p>
                  </div>
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "32px",
                  }}
                >
                  <div>
                    <h4
                      style={{
                        fontWeight: "500",
                        fontSize: "14px",
                        color: "#64748b",
                        marginBottom: "8px",
                      }}
                    >
                      Cloud Services
                    </h4>
                    <p
                      style={{
                        fontSize: "14px",
                        color: "#1a202c",
                        margin: "0",
                      }}
                    >
                      Private/hybrid
                    </p>
                  </div>
                  <div>
                    <h4
                      style={{
                        fontWeight: "500",
                        fontSize: "14px",
                        color: "#64748b",
                        marginBottom: "8px",
                      }}
                    >
                      System Technologies
                    </h4>
                    <p
                      style={{
                        fontSize: "14px",
                        color: "#1a202c",
                        margin: "0",
                      }}
                    >
                      Two or more enabling technologies
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Client-Facing Technology */}
            <div
              style={{
                backgroundColor: "white",
                border: "1px solid #e2e8f0",
                borderRadius: "8px",
                boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
              }}
            >
              <div
                style={{
                  padding: "24px 24px 0",
                  borderBottom: "1px solid #e2e8f0",
                }}
              >
                <h2
                  style={{
                    fontSize: "18px",
                    fontWeight: "600",
                    color: "#1a202c",
                    margin: "0 0 24px 0",
                  }}
                >
                  Client-Facing Technology
                </h2>
              </div>
              <div style={{ padding: "24px" }}>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "32px",
                    marginBottom: "24px",
                  }}
                >
                  <div>
                    <h4
                      style={{
                        fontWeight: "500",
                        fontSize: "14px",
                        color: "#64748b",
                        marginBottom: "8px",
                      }}
                    >
                      Online Presence
                    </h4>
                    <p
                      style={{
                        fontSize: "14px",
                        color: "#1a202c",
                        margin: "0",
                      }}
                    >
                      Internet applications (web/mobile)
                    </p>
                  </div>
                  <div>
                    <h4
                      style={{
                        fontWeight: "500",
                        fontSize: "14px",
                        color: "#64748b",
                        marginBottom: "8px",
                      }}
                    >
                      Mobile Presence
                    </h4>
                    <p
                      style={{
                        fontSize: "14px",
                        color: "#1a202c",
                        margin: "0",
                      }}
                    >
                      Mobile banking apps
                    </p>
                  </div>
                </div>

                <div>
                  <h4
                    style={{
                      fontWeight: "500",
                      fontSize: "14px",
                      color: "#64748b",
                      marginBottom: "8px",
                    }}
                  >
                    Expected IT Developments (First Year)
                  </h4>
                  <p
                    style={{
                      fontSize: "14px",
                      color: "#1a202c",
                      margin: "0",
                    }}
                  >
                    Significant development expected
                  </p>
                </div>
              </div>
            </div>

            {/* Cybersecurity */}
            <div
              style={{
                backgroundColor: "white",
                border: "1px solid #e2e8f0",
                borderRadius: "8px",
                boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
              }}
            >
              <div
                style={{
                  padding: "24px 24px 0",
                  borderBottom: "1px solid #e2e8f0",
                }}
              >
                <h2
                  style={{
                    fontSize: "18px",
                    fontWeight: "600",
                    color: "#1a202c",
                    margin: "0 0 24px 0",
                  }}
                >
                  Cybersecurity
                </h2>
              </div>
              <div style={{ padding: "24px" }}>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "32px",
                    marginBottom: "24px",
                  }}
                >
                  <div>
                    <h4
                      style={{
                        fontWeight: "500",
                        fontSize: "14px",
                        color: "#64748b",
                        marginBottom: "8px",
                      }}
                    >
                      Security Policy Status
                    </h4>
                    <p
                      style={{
                        fontSize: "14px",
                        color: "#1a202c",
                        margin: "0",
                      }}
                    >
                      Written policy approved by senior management
                    </p>
                  </div>
                  <div>
                    <h4
                      style={{
                        fontWeight: "500",
                        fontSize: "14px",
                        color: "#64748b",
                        marginBottom: "8px",
                      }}
                    >
                      Cyber Risk Assessed
                    </h4>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <span
                        style={{
                          width: "16px",
                          height: "16px",
                          color: "#10b981",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        ✓
                      </span>
                      <span
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          padding: "4px 12px",
                          borderRadius: "4px",
                          fontSize: "12px",
                          fontWeight: "500",
                          backgroundColor: "#10b981",
                          color: "white",
                        }}
                      >
                        Yes
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4
                    style={{
                      fontWeight: "500",
                      fontSize: "14px",
                      color: "#64748b",
                      marginBottom: "8px",
                    }}
                  >
                    Incident Response Plan Implemented
                  </h4>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <span
                      style={{
                        width: "16px",
                        height: "16px",
                        color: "#10b981",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      ✓
                    </span>
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        padding: "4px 12px",
                        borderRadius: "4px",
                        fontSize: "12px",
                        fontWeight: "500",
                        backgroundColor: "#10b981",
                        color: "white",
                      }}
                    >
                      Yes
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
