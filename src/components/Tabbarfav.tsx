import React from "react";

const Tabbar = () => {
  return (
    <div
      style={{
        marginTop: "40px",
        marginBottom: "0px",
        width: "100%",
        // borderBottom: "1px solid #e0e0e0",
        backgroundColor: "#ffffff",
        padding: "10px 0",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div style={{ marginLeft: "260px" }}>
        <div
          style={{ display: "flex", alignItems: "center", marginBottom: "4px" }}
        >
          <span
            style={{
              color: "#0030E3",
              fontWeight: 600,
              marginRight: "8px",
              cursor: "pointer",
              fontSize: "20px",
              fontFamily: "FS Kim Trial",
            }}
          >
            Results
          </span>
          <span
            style={{
              color: "#0030E3",
              fontSize: "12px",
              fontFamily: "Helvetica Neue",
            }}
          >
            15+ Results
          </span>
        </div>
        <div style={{ color: "#5f6368", fontSize: "12px" }}>
          Explore your bookmarked business services
        </div>
      </div>
    </div>
  );
};

export default Tabbar;
