"use client";

import Box from "@component/Box";
import { useRef } from "react";
import NavButton from "./NavButton";
import SearchBar from "./SearchBar";
import { NavLink } from "./types";

// Data for navigation links
const navLinks: NavLink[] = [
  { id: "trending", label: "Trending", icon: "/images/trending-up.svg" },
  { id: "recently-added", label: "Recently Added", icon: "/images/clock.svg" },
  { id: "popular", label: "Popular", icon: "/images/star2.svg" },
];

interface TopNavigationProps {
  selectedNavLink: string;
  onNavLinkChange: (link: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const TopNavigation: React.FC<TopNavigationProps> = ({
  selectedNavLink,
  onNavLinkChange,
  searchQuery,
  onSearchChange,
}) => {
  const navLinksRef = useRef<HTMLDivElement>(null);

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      p="20px 0"
      borderBottom="1px solid #e2e8f0"
      mb="20px"
      style={{ gap: "20px" }}
    >
      <Box
        display="flex"
        alignItems="center"
        style={{
          gap: "10px",
          overflowX: "auto",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
        ref={navLinksRef}
      >
        {navLinks.map((link) => (
          <NavButton
            key={link.id}
            link={link}
            isActive={selectedNavLink === link.id}
            onClick={() => onNavLinkChange(link.id)}
          />
        ))}
      </Box>
      <SearchBar
        value={searchQuery}
        onChange={onSearchChange}
        placeholder="Search communities..."
      />
    </Box>
  );
};

export default TopNavigation;
