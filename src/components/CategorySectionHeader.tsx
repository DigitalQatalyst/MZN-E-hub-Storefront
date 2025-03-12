"use client";

import Link from "next/link";

import Icon from "./icon/Icon";
import FlexBox from "./FlexBox";
import { H2, SemiSpan } from "./Typography";
import { Button } from "./buttons";
import { useState } from "react";

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
    <FlexBox justifyContent="space-between" alignItems="center" mb="1.5rem">
      <FlexBox alignItems="center">
        <H2 fontWeight="bold" lineHeight="1">
          {title}
        </H2>
      </FlexBox>

      {/* Category Selection Buttons */}
      <FlexBox>
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "contained" : "outlined"}
            color="primary"
            onClick={() => handleCategoryChange(category)}
            style={{ marginRight: "8px" }}
          >
            {category}
          </Button>
        ))}
      </FlexBox>
    </FlexBox>
  );
}
