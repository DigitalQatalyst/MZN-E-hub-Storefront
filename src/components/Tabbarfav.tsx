import React from "react";

const Tabbar = () => {
  return (
    <div
      style={{
        marginTop: "40px",
        marginBottom: "28px",
        width: "100%",
        borderBottom: "1px solid #e0e0e0",
        backgroundColor: "#ffffff",
        padding: "10px 20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        fontFamily: "Arial, sans-serif",
        fontSize: "14px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <span
          style={{
            color: "#1a0dab",
            fontWeight: 600,
            marginRight: "8px",
            cursor: "pointer",
          }}
        >
          Results
        </span>
        <span style={{ color: "#5f6368", fontSize: "12px" }}>15+ Results</span>
        <div style={{ color: "#5f6368", fontSize: "12px" }}>
          Explore your bookmarked business services
        </div>
      </div>
    </div>
  );
};

export default Tabbar;
