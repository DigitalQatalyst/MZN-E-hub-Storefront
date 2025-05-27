"use client";

import Link from "next/link";
import Icon from "./icon/Icon";
import FlexBox from "./FlexBox";
import { H2, H5, SemiSpan } from "./Typography";
import { Button } from "./buttons";
import { useState } from "react";
import { colors } from "@utils/themeColors";
import { TextField, MenuItem, Select, InputLabel, FormControl } from "@mui/material";

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
  categories = ["Industry"],
  selectedCategory: propSelectedCategory,
  onCategoryChange,
}: Props) {
  // Local state to track selection if not controlled via props
  const [selectedCategory, setSelectedCategory] = useState<string>(
    propSelectedCategory || "Industry"
  );
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    onCategoryChange?.(category);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <FlexBox justifyContent="space-between" alignItems="center" mb="1.5rem" flexWrap="wrap">
      <FlexBox alignItems="flex-start" flexDirection="column">
        <H2 fontWeight="bold" lineHeight="1" marginBottom="20px" color={colors.primary.main}>
          {title}
        </H2>
        <H5></H5>
      </FlexBox>

      {/* Category Selection with Search Bar Side by Side */}
<FlexBox justifyContent="flex-start" alignItems="center" width="100%" maxWidth="520px">
  {/* Category Dropdown */}
  <FormControl variant="outlined" style={{ width: "50%" }}>
    <InputLabel id="category-select-label"></InputLabel>
    <Select
      labelId="category-select-label"
      value={selectedCategory}
      onChange={(e) => handleCategoryChange(e.target.value as string)}
      label=""
      displayEmpty
    >
      {categories
        .filter((category) => category.toLowerCase().includes(searchTerm.toLowerCase()))
        .map((category) => (
          <MenuItem key={category} value={category}>
            {category}
          </MenuItem>
        ))}
    </Select>
  </FormControl>

  {/* Search Bar */}
  <TextField
    label="Search Communities"
    variant="outlined"
    fullWidth
    value={searchTerm}
    onChange={handleSearchChange}
    style={{ width: "50%" }}
  />
</FlexBox>


      {/* Category Selection Buttons */}
      <FlexBox>
        {categories.map((category) => (
          <Link href={category === "View All" ? "/services" : "#"} key={category}>
            <Button
              onClick={() => handleCategoryChange(category)}
              style={{
                marginRight: "8px",
                border: `${selectedCategory === category ? colors.primary.main : "#D8E0E9"}`, // Primary color for selected, #D8E0E9 for unselected
                color: selectedCategory === category ? colors.primary.main : "#2B3445", // Primary color for selected, #2B3445 for unselected
                backgroundColor: "transparent", // Ensure no background color
                padding: "8px 16px", // Consistent padding
                borderRadius: "4px", // Slight rounding for aesthetics
              }}
            >
              {category}
            </Button>
          </Link>
        ))}
      </FlexBox>
    </FlexBox>
  );
}
