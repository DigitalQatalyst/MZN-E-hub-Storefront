"use client";

import { StyledCustomNavLink } from "@component/navbar/marketplace_nav/styles";
import React from "react";

interface CustomNavLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  mr?: string;
  onClick?: () => void;
}

const CustomNavLink: React.FC<CustomNavLinkProps> = ({ href, children, className, mr, onClick }) => {
  return (
    <StyledCustomNavLink
      href={href}
      className={className}
      style={{ marginRight: mr }}
      onClick={onClick}
    >
      {children}
    </StyledCustomNavLink>
  );
};

export default CustomNavLink;