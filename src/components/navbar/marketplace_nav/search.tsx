"use client";

import { useState } from "react";
import { StyledNavbar } from "./styles";

interface SearchProps {
  onClick?: () => void;
}

export default function Search({ onClick }: SearchProps) {
  const [isInputVisible, setIsInputVisible] = useState(false);

  const handleSearchClick = () => {
    setIsInputVisible(true);
    if (onClick) onClick();
  };

  const handleCloseClick = () => {
    setIsInputVisible(false);
  };

  return (
    <>
      {!isInputVisible && (
        <div className="search-icon" onClick={handleSearchClick}>
          <img
            src="/assets/images/icons/search-white.svg"
            alt="Search"
            width="18"
            height="18"
            style={{ marginTop: "5px" }}
          />
        </div>
      )}
      {isInputVisible && (
        <div style={{ display: "flex", alignItems: "center", border: "#000", borderRadius: "6px", padding: "2px 8px", background: "#FFF" }}>
          <input
            type="text"
            placeholder="How can we help you"
            style={{ border: "none", outline: "none", fontSize: "14px",fontWeight: "500", flex: 1, padding: "4px", color: "#D8E0E9" }}
          />
          <img
            src="/assets/images/icons/search-white.svg"
            alt="Search"
            width="18"
            height="18"
            style={{ marginLeft: "8px", cursor: "pointer" }}
          />
          <span
            style={{ cursor: "pointer", marginLeft: "8px", fontSize: "16px", fontWeight: "bold", color: "#000" }}
            onClick={handleCloseClick}
          >
            ×
          </span>
        </div>
      )}
    </>
  );
}
