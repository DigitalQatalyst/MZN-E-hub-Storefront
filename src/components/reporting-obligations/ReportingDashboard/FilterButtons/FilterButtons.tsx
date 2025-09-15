import { useState } from "react";
import styles from "./FilterButtons.module.css";

const FilterButtons = ({ searchTerm, setSearchTerm, setStatusFilter }) => {
  const [activeFilter, setActiveFilter] = useState("All");

  const handleFilterClick = (filter) => {
    setActiveFilter(filter);
    setStatusFilter(filter === "All" ? "" : filter);
  };

  return (
    <div className={styles.container}>
      <div className={styles.buttonGroup}>
        <button
          className={activeFilter === "All" ? styles.primaryButton : styles.outlinedButton}
          onClick={() => handleFilterClick("All")}
        >
          All
        </button>
        {["Upcoming", "Overdue", "Completed"].map((status) => (
          <button
            key={status}
            className={activeFilter === status ? styles.primaryButton : styles.outlinedButton}
            onClick={() => handleFilterClick(status)}
          >
            {status}
          </button>
        ))}
      </div>
      <input
        type="text"
        placeholder="Search by name or category..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className={styles.searchInput}
      />
    </div>
  );
};

export default FilterButtons;