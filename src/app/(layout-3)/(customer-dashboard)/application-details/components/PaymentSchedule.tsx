"use client";
import React, { useState, useEffect } from "react";
import { ChevronDown, ChevronUp, MoreVertical } from "lucide-react";

interface TableProps {
  id: string;
  status: "Unpaid" | "Paid" | "Overdue";
  dueDate: string;
  total: string;
  principal: string;
  interest: string;
}

const mockData: TableProps[] = [
  {
    id: "1",
    dueDate: "01.05.2025",
    total: "1000",
    principal: "700",
    interest: "300",
    status: "Unpaid",
  },
  {
    id: "2",
    dueDate: "10.05.2025",
    total: "1500",
    principal: "1000",
    interest: "500",
    status: "Paid",
  },
  {
    id: "3",
    dueDate: "15.05.2025",
    total: "1200",
    principal: "800",
    interest: "400",
    status: "Overdue",
  },
];

const PaymentSchedule: React.FC = () => {
  const [data, setData] = useState<TableProps[]>(mockData);
  const [isMobile, setIsMobile] = useState(false);

  // Handle responsive design by detecting screen size changes
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);

    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  // Dynamic status badge styling based on status type
  const getStatusStyle = (status: string) => {
    const baseStyle = {
      padding: isMobile ? "2px 8px" : "4px 12px",
      borderRadius: "4px",
      fontSize: isMobile ? "12px" : "14px",
      fontWeight: "500",
    };

    switch (status) {
      case "Paid":
        return { ...baseStyle, backgroundColor: "#d1fae5", color: "#10b981" };
      case "Overdue":
        return { ...baseStyle, backgroundColor: "#fee2e2", color: "#ef4444" };
      default:
        return { ...baseStyle, backgroundColor: "#f3f4f6", color: "#6b7280" };
    }
  };

  const handleStatusChange = (
    id: string,
    newStatus: "Unpaid" | "Paid" | "Overdue"
  ) => {
    const updatedData = data.map((item) =>
      item.id === id ? { ...item, status: newStatus } : item
    );
    setData(updatedData);
  };

  return (
    <div
      style={{
        padding: isMobile ? "16px" : "0px",
        marginTop: isMobile ? "16px" : "20px",
        backgroundColor: "white",
        minHeight: "100vh",
      }}
    >
      <div style={{ width: "100%", margin: "0 auto" }}>
        {/* Main Content Container - Card with border, shadow, and radius */}
        <div
          style={{
            borderRadius: "6px",
            backgroundColor: "white",

            overflow: "hidden", // Ensures content respects the border radius
          }}
        >
          {/* Table Container */}
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "8px",
              overflow: "hidden",
              overflowX: "auto",
              //   marginInline: "24px",
              //   marginBottom: "24px",
            }}
          >
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                minWidth: isMobile ? "800px" : "auto",
              }}
            >
              {/* Table Header */}
              <thead>
                <tr>
                  <th
                    style={{
                      padding: isMobile ? "12px 8px" : "16px",
                      textAlign: "left",
                      fontSize: isMobile ? "10px" : "12px",
                      fontWeight: "600",
                      color: "#6b7280",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                      borderTop: "1px solid #e5e7eb",
                      borderBottom: "1px solid #e5e7eb",
                    }}
                  >
                    Due Date
                  </th>
                  <th
                    style={{
                      padding: isMobile ? "12px 8px" : "16px",
                      textAlign: "left",
                      fontSize: isMobile ? "10px" : "12px",
                      fontWeight: "600",
                      color: "#6b7280",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                      borderTop: "1px solid #e5e7eb",
                      borderBottom: "1px solid #e5e7eb",
                    }}
                  >
                    TOTAL
                  </th>
                  <th
                    style={{
                      padding: isMobile ? "12px 8px" : "16px",
                      textAlign: "left",
                      fontSize: isMobile ? "10px" : "12px",
                      fontWeight: "600",
                      color: "#6b7280",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                      borderTop: "1px solid #e5e7eb",
                      borderBottom: "1px solid #e5e7eb",
                    }}
                  >
                    PRINCIPAL
                  </th>
                  <th
                    style={{
                      padding: isMobile ? "12px 8px" : "16px",
                      textAlign: "left",
                      fontSize: isMobile ? "10px" : "12px",
                      fontWeight: "600",
                      color: "#6b7280",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                      borderTop: "1px solid #e5e7eb",
                      borderBottom: "1px solid #e5e7eb",
                    }}
                  >
                    INTEREST
                  </th>
                  <th
                    style={{
                      padding: isMobile ? "12px 8px" : "16px",
                      textAlign: "left",
                      fontSize: isMobile ? "10px" : "12px",
                      fontWeight: "600",
                      color: "#6b7280",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                      borderTop: "1px solid #e5e7eb",
                      borderBottom: "1px solid #e5e7eb",
                    }}
                  >
                    STATUS
                  </th>
                  <th
                    style={{
                      padding: isMobile ? "12px 8px" : "16px",
                      textAlign: "left",
                      fontSize: isMobile ? "10px" : "12px",
                      fontWeight: "600",
                      color: "#6b7280",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                      borderTop: "1px solid #e5e7eb",
                      borderBottom: "1px solid #e5e7eb",
                    }}
                  >
                    ACTION
                  </th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody>
                {data.map((item) => (
                  <tr
                    key={item.id}
                    style={{
                      borderBottom: "1px solid #f3f4f6",
                    }}
                  >
                    <td
                      style={{
                        padding: isMobile ? "12px 8px" : "16px",
                        fontSize: isMobile ? "12px" : "12px",
                        color: "#6b7280",
                      }}
                    >
                      {item.dueDate}
                    </td>

                    <td
                      style={{
                        padding: isMobile ? "12px 8px" : "16px",
                        fontSize: isMobile ? "12px" : "12px",
                        color: "#6b7280",
                      }}
                    >
                      {item.total}
                    </td>

                    <td
                      style={{
                        padding: isMobile ? "12px 8px" : "16px",
                        fontSize: isMobile ? "12px" : "12px",
                        color: "#6b7280",
                      }}
                    >
                      {item.principal}
                    </td>

                    <td
                      style={{
                        padding: isMobile ? "12px 8px" : "16px",
                        fontSize: isMobile ? "12px" : "12px",
                        color: "#6b7280",
                      }}
                    >
                      {item.interest}
                    </td>

                    <td
                      style={{
                        padding: isMobile ? "12px 8px" : "16px",
                        fontSize: isMobile ? "12px" : "12px",
                      }}
                    >
                      <span style={getStatusStyle(item.status)}>
                        {item.status}
                      </span>
                    </td>

                    <td style={{ padding: isMobile ? "12px 8px" : "16px" }}>
                      <button
                        style={{
                          padding: "4px",
                          backgroundColor: "transparent",
                          border: "none",
                          cursor: "pointer",
                          color: "#9B1823",
                          borderRadius: "4px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                        // onClick={() => handleStatusChange(item.id, "Paid")}
                      >
                        <MoreVertical size={16} color="#7367F0" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSchedule;
