"use client";

import Link from "next/link";

import Icon from "./icon/Icon";
import FlexBox from "./FlexBox";
import { H2, H5, SemiSpan } from "./Typography";
import { Button } from "./buttons";
import { useState } from "react";
import { colors } from "@utils/themeColors";

// ==============================================================
interface Props {
  title?: string;
  iconName?: string;
  seeMoreLink?: string;
  categories?: string[];
  selectedCategory?: string;
  onCategoryChange?: (category: string) => void;
}
// ==============================================================

export default function CategorySectionHeader({ 
  title, 
  categories = ["New Additions", "Top Services", "Popular Picks", "View All"],
  selectedCategory: propSelectedCategory,
  onCategoryChange
   }: Props) {
  // Local state to track selection if not controlled via props
  const [selectedCategory, setSelectedCategory] = useState<string>(
    propSelectedCategory || "New Additions"
  );

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    onCategoryChange?.(category);
  };

  return (
    <FlexBox justifyContent="space-between" alignItems="center" mb="1.5rem" flexWrap={"wrap"}>
      <FlexBox alignItems="flex-start" flexDirection={"column"}>
        <H2 fontWeight="bold" lineHeight="1" marginBottom={"20px"} color={colors.primary.main}>
          {title}
        </H2>
        <H5>Explore our latest business support solutions and financial services</H5>
      </FlexBox>

      {/* Category Selection Buttons */}
      <FlexBox>
        {categories.map((category) => (
          <Link href={category === "View All" ? "/services" : "#"} key={category}>
            <Button
              key={category}
              variant={selectedCategory === category ? "contained" : "outlined"}
              color="primary"
              onClick={() => handleCategoryChange(category)}
              style={{ marginRight: "8px" }}
            >
              {category}
            </Button>
          </Link>
        ))}
      </FlexBox>
    </FlexBox>
  );
}
