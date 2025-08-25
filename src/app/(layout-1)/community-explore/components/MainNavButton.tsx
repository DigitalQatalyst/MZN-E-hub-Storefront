"use client";

import Box from "@component/Box";
import Button from "@component/buttons/Button";
import { MainNavButtonProps } from "./types";

const MainNavButton: React.FC<MainNavButtonProps> = ({
  link,
  isActive,
  onClick,
}) => {
  return (
    <Button
      onClick={onClick}
      aria-pressed={isActive}
      variant={isActive ? "contained" : "text"}
      color={isActive ? "primary" : undefined}
      size="medium"
      style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        padding: "10px",
        fontSize: "14px",
        fontWeight: isActive ? "600" : "500",
        borderRadius: "16px",
        border: isActive ? "none" : "1px solid transparent",
        backgroundColor: isActive ? "#0078D4" : "#EFF6FF",
        color: isActive ? "white" : "#5C5C5C",
        transition: "all 0.3s ease",
        minWidth: "auto",
        height: "auto",
        whiteSpace: "nowrap",
        rowGap: "10px",
      }}
    >
      <Box
        as="img"
        src={link.icon}
        alt={link.label}
        width="20px"
        height="20px"
        style={{
          filter: isActive ? "brightness(0) invert(1)" : "saturate(0)",
          transition: "filter 0.3s ease",
        }}
      />
      {link.label}
    </Button>
  );
};

export default MainNavButton;
