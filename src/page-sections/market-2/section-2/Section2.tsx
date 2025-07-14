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

// Extend props to include HTML attributes like 'style'
export default function Section2({ resultsCount = 0, ...props }: { resultsCount?: number } & React.HTMLAttributes<HTMLDivElement>) {
  const [activeButton, setActiveButton] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("all");

  const handleButtonClick = (button: string) => {
    setActiveButton(button);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
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
            <option value="finance">Finance</option>
            <option value="support">Business Support</option>
            <option value="legal">Legal</option>
            {/* Add more categories as needed */}
          </CategoryDropdown>
          <Search/>
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