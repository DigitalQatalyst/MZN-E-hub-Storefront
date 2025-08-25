"use client";

import Box from "@component/Box";
import TextField from "@component/text-field";
import { SearchBarProps } from "./types";

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder = "Search communities...",
}) => {
  return (
    <Box flexShrink={0} minWidth="250px" maxWidth="300px">
      <TextField
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          onChange(e.target.value)
        }
        aria-label="Search communities"
        fullwidth
        style={{
          padding: "12px 16px",
          border: "1px solid #ddd",
          borderRadius: "8px",
          color: "#bebebe",
          fontSize: "14px",
          transition: "all 0.2s ease",
          fontFamily: "Inter, sans-serif",
        }}
      />
    </Box>
  );
};

export default SearchBar;
