import React from "react";

const Tabbar = () => {
  return (
    <div style={{ width: "100%" }}>
      {/* Back to the Dashboard Link */}
      <div
        style={{
          backgroundColor: "#ffffff",
          padding: "10px 0",
        }}
      >
        <a
          href="/dashboard"
          style={{
            color: "#0030E3",
            fontFamily: "helvetica, sans-serif",
            fontSize: "12px",
            fontStyle: "normal",
            fontWeight: "bold",
            lineHeight: "22px",
            display: "block",
            textDecoration: "none",
            marginLeft: "248px",
            marginTop: "30px",
            marginBottom: "10px",
          }}
        >
          <span style={{ marginRight: "8px" }}>&larr;</span> {/* Left arrow */}
          Back to the Dashboard
        </a>
      </div>

      <div
        style={{
          marginBottom: "0px",
          width: "100%",
          backgroundColor: "#ffffff",
          padding: "10px 0",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div style={{ marginLeft: "248px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "4px",
            }}
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
    </div>
  );
};

export default Tabbar;
