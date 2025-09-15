"use client";

import React from "react";
import {
  ChevronRight,
  FileText,
  Calendar,
  CheckCircle,
  AlertTriangle,
  Eye,
  LucideIcon,
  Home,
  LoaderPinwheel,
  Hourglass,
  HourglassIcon,
  CalendarClock,
} from "lucide-react";
import AppServices from "../components/AppServices";

// TypeScript interfaces for type safety
interface StatCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  color?: string;
}

interface ReportingObligation {
  id: string;
  title: string;
  dueDate: string;
  status: "Due Soon" | "Overdue" | "Complete" | "Submitted";
  statusColor: string;
}

interface ServiceApplication {
  id: string;
  title: string;
  lastUpdated: string;
  status: "Submitted" | "Under Review" | "Approved";
  statusColor: string;
}

interface QuickAccessItem {
  id: string;
  title: string;
  subtitle: string;
  iconSrc: string;
}

// Reusable StatCard component
const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  color = "#666",
}) => (
  <div
    style={{
      backgroundColor: "white",
      border: "1px solid #e0e0e0",
      borderRadius: "8px",
      padding: "24px",
      textAlign: "center",
      height: "4.5rem",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    }}
  >
    <div
      style={{
        fontSize: "16px",
        fontWeight: "bold",
        color: color,
        marginBottom: "8px",
      }}
    >
      {value}
    </div>
    <div
      style={{
        fontSize: "12px",
        color: "#666",
        fontWeight: "500",
        marginBottom: "4px",
      }}
    >
      {title}
    </div>
    <div
      style={{
        fontSize: "12px",
        color: "#999",
      }}
    >
      {subtitle}
    </div>
  </div>
);

// Quick Access Item component
const QuickAccessItem: React.FC<QuickAccessItem> = ({
  title,
  subtitle,
  iconSrc,
}) => (
  <div
    style={{
      backgroundColor: "white",
      borderRadius: "6px",
      padding: "12px 16px",
      display: "flex",
      alignItems: "center",
      cursor: "pointer",
      transition: "all 0.2s ease",
      marginBottom: "8px",
    }}
    onMouseOver={(e) => {
      e.currentTarget.style.backgroundColor = "#f8f9fa";
    }}
    onMouseOut={(e) => {
      e.currentTarget.style.backgroundColor = "white";
    }}
  >
    <img
      src={iconSrc}
      alt={title}
      style={{
        width: "20px",
        height: "20px",
        marginRight: "12px",
      }}
    />
    <div style={{ flex: 1 }}>
      <div style={{ fontSize: "14px", fontWeight: "500", color: "#333" }}>
        {title}
      </div>
      <div style={{ fontSize: "12px", color: "#666" }}>{subtitle}</div>
    </div>
    <div
      style={{
        backgroundColor: "#9B1823",
        borderRadius: "4px",
        width: "30px",
        height: "30px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <ChevronRight size={16} style={{ color: "white" }} />
    </div>
  </div>
);

// Reporting Obligation Item component
const ReportingObligationItem: React.FC<ReportingObligation> = ({
  title,
  dueDate,
  status,
  statusColor,
}) => (
  <div
    style={{
      backgroundColor: "white",
      border: "1px solid #e0e0e0",
      borderRadius: "6px",
      padding: "16px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: "8px",
      transition: "all 0.2s ease",
    }}
    onMouseOver={(e) => {
      e.currentTarget.style.backgroundColor = "#f8f9fa";
    }}
    onMouseOut={(e) => {
      e.currentTarget.style.backgroundColor = "white";
    }}
  >
    <div style={{ flex: 1 }}>
      <div>
        <span
          style={{
            fontSize: "14px",
            fontWeight: "500",
            color: "#333",
            marginBottom: "4px",
            marginRight: "12px",
          }}
        >
          {title}
        </span>
        <span
          style={{
            backgroundColor:
              status === "Due Soon"
                ? "#FF56301A"
                : status === "Submitted"
                ? "#0065FF1A"
                : statusColor,
            color:
              status === "Due Soon"
                ? "#FF5630"
                : status === "Submitted"
                ? "#0065FF"
                : "white",
            padding: "4px 8px",
            borderRadius: "4px",
            fontSize: "12px",
            fontWeight: "500",
          }}
        >
          {status}
        </span>
      </div>

      <div style={{ fontSize: "12px", color: "#666" }}>{dueDate}</div>
    </div>
    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
      <div
        style={{
          backgroundColor: "#9B1823",
          color: "white",
          borderRadius: "4px",
          padding: "4px 8px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minWidth: "24px",
          height: "24px",
        }}
      >
        <ChevronRight size={14} />
      </div>
    </div>
  </div>
);

// Service Application Item component
const ServiceApplicationItem: React.FC<ServiceApplication> = ({
  title,
  lastUpdated,
  status,
  statusColor,
}) => (
  <div
    style={{
      backgroundColor: "white",
      border: "1px solid #e0e0e0",
      borderRadius: "6px",
      padding: "16px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: "8px",
      transition: "all 0.2s ease",
    }}
    onMouseOver={(e) => {
      e.currentTarget.style.backgroundColor = "#f8f9fa";
    }}
    onMouseOut={(e) => {
      e.currentTarget.style.backgroundColor = "white";
    }}
  >
    <div style={{ flex: 1 }}>
      <div>
        <span
          style={{
            fontSize: "14px",
            fontWeight: "500",
            color: "#333",
            marginBottom: "4px",
            marginRight: "12px",
          }}
        >
          {title}
        </span>
        <span
          style={{
            backgroundColor: "#0065FF1A",
            color: "#0065FF",
            padding: "4px 8px",
            borderRadius: "4px",
            fontSize: "12px",
            fontWeight: "500",
          }}
        >
          {status}
        </span>
      </div>
      <div style={{ fontSize: "12px", color: "#666" }}>{lastUpdated}</div>
    </div>
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      <div
        style={{
          backgroundColor: "#9B1823",
          color: "white",
          borderRadius: "4px",
          padding: "4px 8px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minWidth: "24px",
          height: "24px",
        }}
      >
        <ChevronRight size={14} />
      </div>
    </div>
  </div>
);

// Main Dashboard Component
const RegulatoryDashboard: React.FC = () => {
  // Sample data - in real app, this would come from API/state management
  const reportingObligations: ReportingObligation[] = [
    {
      id: "1",
      title: "Quarterly AML Report",
      dueDate: "Due 15/07/2025",
      status: "Due Soon",
      statusColor: "#FF5630",
    },
    {
      id: "2",
      title: "Annual Financial Statement",
      dueDate: "Due 31/05/2025",
      status: "Submitted",
      statusColor: "#0065FF",
    },
  ];

  const serviceApplications: ServiceApplication[] = [
    {
      id: "1",
      title: "Request for New Authorization",
      lastUpdated: "Last updated 10/07/2025",
      status: "Submitted",
      statusColor: "#4CAF50",
    },
    {
      id: "2",
      title: "Annual Compliance Review",
      lastUpdated: "Last updated 08/07/2025",
      status: "Submitted",
      statusColor: "#4CAF50",
    },
  ];

  const quickAccessItems: QuickAccessItem[] = [
    {
      id: "1",
      title: "Apply for New Service",
      subtitle: "Browse available services",
      iconSrc: "/assets/images/icons/travel-explore.svg",
    },
    {
      id: "2",
      title: "2 Reporting Obligations Due Soon",
      subtitle: "Due in next 7 days",
      iconSrc: "/assets/images/icons/calendar-clock.svg",
    },
  ];

  return (
    <div
      style={{
        backgroundColor: "white",
        minHeight: "100vh",
        padding: "24px",
      }}
    >
      {/* Main Content Grid */}
      {/* top cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "24px",
        }}
      >
        {/* Left Column */}

        <div>
          {/* Combined Header, Stats Cards, and License Information */}
          <div
            style={{
              backgroundColor: "white",
              border: "1px solid #e0e0e0",
              borderRadius: "8px",
              padding: "24px",
              width: "100%", // Adjust width of the card to fit content
            }}
          >
            <div
              style={{
                backgroundColor: "rgba(0, 48, 227, 0.2)",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                height: "40px", // Adjusted height for better visibility
                width: "40px", // Adjusted width to match height
              }}
            >
              <CheckCircle color="#0030E3" size={20} />
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start", // Aligns to start
                justifyContent: "flex-start", // Aligns to start
                marginTop: "16px", // Adds a little space between the icon section and the text
                gap: "6px", // Added a little more space between h3 and p
              }}
            >
              <h3
                style={{
                  margin: "0",
                  padding: "0",
                  fontSize: "16px",
                  fontWeight: 500,
                  color: "#5D586C",
                }}
              >
                Applications in progress
              </h3>
              <p
                style={{
                  margin: "0",
                  padding: "0",
                  fontSize: "14px",
                  color: "#6F6B7D",
                }}
              >
                4 Request(s)
              </p>
            </div>

            <div
              style={{
                color: "#9B1823",
                marginTop: "16px", // Adds space before the link
              }}
            >
              <a
                style={{
                  color: "#0030E3",
                  textDecoration: "none", // Removes underline from link
                  fontWeight: "bold",
                }}
                href="#"
              >
                View
              </a>
            </div>
          </div>

          {/* Reporting Obligations Section */}
        </div>
        <div>
          {/* Combined Header, Stats Cards, and License Information */}
          <div
            style={{
              backgroundColor: "white",
              border: "1px solid #e0e0e0",
              borderRadius: "8px",
              padding: "24px",
              width: "100%", // Adjust width of the card to fit content
            }}
          >
            <div
              style={{
                backgroundColor: "rgba(0, 48, 227, 0.2)",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                height: "40px", // Adjusted height for better visibility
                width: "40px", // Adjusted width to match height
              }}
            >
              <CalendarClock color="#0030E3" size={20} />
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start", // Aligns to start
                justifyContent: "flex-start", // Aligns to start
                marginTop: "16px", // Adds a little space between the icon section and the text
                gap: "6px", // Added a little more space between h3 and p
              }}
            >
              <h3
                style={{
                  margin: "0",
                  padding: "0",
                  fontSize: "16px",
                  fontWeight: 500,
                  color: "#5D586C",
                }}
              >
                Applications needing Clarifications
              </h3>
              <p
                style={{
                  margin: "0",
                  padding: "0",
                  fontSize: "14px",
                  color: "#6F6B7D",
                }}
              >
                2 Request(s)
              </p>
            </div>

            <div
              style={{
                color: "#9B1823",
                marginTop: "16px", // Adds space before the link
              }}
            >
              <a
                style={{
                  color: "#0030E3",
                  textDecoration: "none", // Removes underline from link
                  fontWeight: "bold",
                }}
                href="#"
              >
                View
              </a>
            </div>
          </div>

          {/* Reporting Obligations Section */}
        </div>
        <div>
          {/* Combined Header, Stats Cards, and License Information */}
          <div
            style={{
              backgroundColor: "white",
              border: "1px solid #e0e0e0",
              borderRadius: "8px",
              padding: "24px",
              width: "100%", // Adjust width of the card to fit content
            }}
          >
            <div
              style={{
                backgroundColor: "rgba(0, 48, 227, 0.2)",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                height: "40px", // Adjusted height for better visibility
                width: "40px", // Adjusted width to match height
              }}
            >
              <HourglassIcon color="#0030E3" size={20} />
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start", // Aligns to start
                justifyContent: "flex-start", // Aligns to start
                marginTop: "16px", // Adds a little space between the icon section and the text
                gap: "6px", // Added a little more space between h3 and p
              }}
            >
              <h3
                style={{
                  margin: "0",
                  padding: "0",
                  fontSize: "16px",
                  fontWeight: 500,
                  color: "#5D586C",
                }}
              >
                Upcoming deadlines
              </h3>
              <p
                style={{
                  margin: "0",
                  padding: "0",
                  fontSize: "14px",
                  color: "#6F6B7D",
                }}
              >
                1 Request(s)
              </p>
            </div>

            <div
              style={{
                color: "#9B1823",
                marginTop: "16px", // Adds space before the link
              }}
            >
              <a
                style={{
                  color: "#0030E3",
                  textDecoration: "none", // Removes underline from link
                  fontWeight: "bold",
                }}
                href="#"
              >
                View
              </a>
            </div>
          </div>

          {/* Reporting Obligations Section */}
        </div>

        {/* Right Column */}
      </div>

      {/* table section */}
      {/* comm */}
      <AppServices />
    </div>
  );
};

export default RegulatoryDashboard;
