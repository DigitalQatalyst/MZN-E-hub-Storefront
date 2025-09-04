"use client";

import { StyledNavbar } from "./styles";

interface SearchProps {
  onClick?: () => void;
}

export default function Search({ onClick }: SearchProps) {
  return (
    <div className="search-icon" onClick={onClick}>
      <img
        src="/assets/images/icons/search-white.svg"
        alt="Search"
        width="18"
        height="18"
        style={{ marginTop: "5px" }}
      />
    </div>
  );
}