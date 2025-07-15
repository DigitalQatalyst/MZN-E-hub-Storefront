"use client";

import React, { useState } from "react";
import Container from "@component/Container";
import {
  ResultsTitle,
  DescriptionText,
  ActiveButton,
  LayoutWrapper,
  LeftSection,
  CenterSection,
  RightSection,
  CategoryDropdown,
  ButtonWrapper,
} from "./styles";
import Search from "@component/search/Search";

export default function Section2({
  resultsCount = 0,
  searchQuery,
  setSearchQuery,
  setActiveButton, // Add setActiveButton to props
  activeButton, // Add activeButton to props
  ...props
}: {
  resultsCount?: number;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  setActiveButton: (button: string) => void; // Add type for setActiveButton
  activeButton: string; // Add type for activeButton
} & React.HTMLAttributes<HTMLDivElement>) {
  const [category, setCategory] = useState("all");

  const handleButtonClick = (button: string) => {
    setActiveButton(button);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
  };

  return (
    <Container pt="2rem" style={{ marginTop: "-45px" }}>
      <LayoutWrapper {...props}>
        <LeftSection>
          <ResultsTitle>
            Results{" "}
            <span
              style={{
                color: "var(--KF-BG-Blue, #0030E3)",
                fontFamily: "Open Sans",
                fontSize: "14px",
                fontWeight: "400",
                lineHeight: "22px",
              }}
            >
              {resultsCount}+ Results
            </span>
          </ResultsTitle>
          <DescriptionText>
            Explore our latest business support solutions.
          </DescriptionText>
        </LeftSection>

        <CenterSection>
          <CategoryDropdown
            aria-label="Select category"
            value={category}
            onChange={handleCategoryChange}
          >
            <option value="all">All Categories</option>
            {/* Add more categories as needed */}
          </CategoryDropdown>
          <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        </CenterSection>

        <RightSection>
          <ButtonWrapper style={{ margin: 0 }}>
            <ActiveButton
              isActive={activeButton === "newAdditions"}
              onClick={() => handleButtonClick("newAdditions")}
            >
              New Additions
            </ActiveButton>

            <ActiveButton
              isActive={activeButton === "topServices"}
              onClick={() => handleButtonClick("topServices")}
            >
              Top Services
            </ActiveButton>

            <ActiveButton
              isActive={activeButton === "popularPicks"}
              onClick={() => handleButtonClick("popularPicks")}
            >
              Popular Picks
            </ActiveButton>
          </ButtonWrapper>
        </RightSection>
      </LayoutWrapper>
    </Container>
  );
}