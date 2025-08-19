"use client";

import styles from './SearchBar.module.css';
import { SearchBarProps } from './types';

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder = "Search communities..."
}) => {
  return (
    <input
      type="text"
      placeholder={placeholder}
      className={styles.searchBar}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      aria-label="Search communities"
    />
  );
};

export default SearchBar;