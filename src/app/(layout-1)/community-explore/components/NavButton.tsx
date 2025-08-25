"use client";

import Box from "@component/Box";
import Button from "@component/buttons/Button";
import { NavButtonProps } from "./types";

const NavButton: React.FC<NavButtonProps> = ({ link, isActive, onClick }) => {
  return (
    <Button
      onClick={onClick}
      aria-pressed={isActive}
      variant={isActive ? "contained" : "text"}
      color={isActive ? "primary" : undefined}
      size="small"
      style={{
        display: "flex",
        alignItems: "center",
        gap: "6px",
        padding: "2px 10px",
        fontSize: "13px",
        fontWeight: isActive ? "600" : "500",
        borderRadius: "8px",
        border: "1px solid #D9D9D9",
        backgroundColor: isActive ? "#0078D4" : "#EFF6FF",
        color: isActive ? "white" : "#666",
        transition: "all 0.3s ease",
        minWidth: "auto",
        height: "32px",
        whiteSpace: "nowrap",
      }}
    >
      <Box
        as="img"
        src={link.icon}
        alt={`${link.label} Icon`}
        width="16px"
        height="16px"
        style={{
          filter: isActive ? "brightness(0) invert(1)" : "none",
          transition: "filter 0.3s ease",
        }}
      />
      {link.label}
    </Button>
  );
};

export default NavButton;
