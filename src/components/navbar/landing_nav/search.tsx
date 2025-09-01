"use client";

import Icon from "../../icon/Icon";
import { StyledNavbar } from "./styles";

interface SearchProps {
  onClick?: () => void;
}

export default function Search({ onClick }: SearchProps) {
  return (
    <StyledNavbar>
      <Icon className="search-icon" size="18px" color="#002180" onClick={onClick}>
        search
      </Icon>
    </StyledNavbar>
  );
}