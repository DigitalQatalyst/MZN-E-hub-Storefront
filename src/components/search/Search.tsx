"use client";

import React from "react";
import {
  SearchInputWrapper,
  SearchInput,
  SearchIcon,
} from "./styles";

interface SearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export default function Search({ searchQuery, setSearchQuery }: SearchProps) {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <SearchInputWrapper>
      <SearchInput
        type="search"
        placeholder="Search by name or category..."
        aria-label="Search services"
        value={searchQuery}
        onChange={handleSearchChange}
      />
      <SearchIcon src="/assets/images/avatars/search-icon.svg" alt="Search icon" />
    </SearchInputWrapper>
  );
}