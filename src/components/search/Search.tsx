"use client";

import React, { useState } from "react";
import {
  SearchInputWrapper,
  SearchInput,
  SearchIcon,
} from "./styles";

export default function Search() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <SearchInputWrapper>
      <SearchInput
        type="search"
        placeholder="Search services"
        aria-label="Search services"
        value={searchQuery}
        onChange={handleSearchChange}
      />
      <SearchIcon src="/assets/images/avatars/search-icon.svg" alt="Search icon" />
    </SearchInputWrapper>
  );
}