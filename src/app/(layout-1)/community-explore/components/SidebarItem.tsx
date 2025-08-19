"use client";

import styles from "./SidebarItem.module.css";
import { getIcon } from "./icons";
import { SidebarItemProps } from "./types";

const SidebarItem: React.FC<SidebarItemProps> = ({
  item,
  isSelected,
  onSelect,
}) => {
  return (
    <div className={styles.sidebarItem} key={item.id}>
      <div
        className={`${styles.itemContent} ${isSelected ? styles.selected : ""}`}
        onClick={() => onSelect(item.id)}
      >
        <div
          className={`${styles.iconContainer} ${
            isSelected ? styles.selected : ""
          }`}
        >
          {getIcon(item.icon)}
        </div>
        <span
          className={`${styles.label} ${isSelected ? styles.selected : ""}`}
        >
          {item.label}
        </span>
      </div>
    </div>
  );
};

export default SidebarItem;
