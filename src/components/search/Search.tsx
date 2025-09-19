"use client";

import React, { useState, useEffect } from "react";
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
  const [placeholder, setPlaceholder] = useState("Search by name or category...");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    const updatePlaceholder = () => {
      if (window.innerWidth <= 480) {
        setPlaceholder("search service...");
      } else {
        setPlaceholder("Search by name or category...");
      }
    };

    // Set initial placeholder
    updatePlaceholder();

    // Add resize event listener
    window.addEventListener("resize", updatePlaceholder);

    // Cleanup on component unmount
    return () => window.removeEventListener("resize", updatePlaceholder);
  }, []);

  return (
    <SearchInputWrapper>
      <SearchInput
        type="search"
        placeholder={placeholder}
        aria-label="Search services"
        value={searchQuery}
        onChange={handleSearchChange}
      />
      <SearchIcon
        src="/assets/images/avatars/search-icon.svg"
        alt="Search icon"
        hasText={searchQuery.trim().length > 0}
      />
    </SearchInputWrapper>
  );
}