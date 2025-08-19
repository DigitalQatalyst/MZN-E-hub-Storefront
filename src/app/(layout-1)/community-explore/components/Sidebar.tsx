"use client";

import Box from "@component/Box";
import { sidebarItems } from "./constants";
import styles from "./Sidebar.module.css";
import SidebarItem from "./SidebarItem";

interface SidebarProps {
  selectedSection: string;
  onSectionChange: (section: string) => void;
  isMobile: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({
  selectedSection,
  onSectionChange,
  isMobile,
}) => {
  return (
    <Box
      borderRight="1px solid var(--Gray-20, #E2E8F0)"
      padding="1.25rem"
      bg="white"
      className={styles.sidebar}
      style={{
        minWidth: isMobile ? "auto" : "280px",
        width: isMobile ? "100%" : "280px",
      }}
    >
      {sidebarItems.map((item) => (
        <SidebarItem
          key={item.id}
          item={item}
          isSelected={selectedSection === item.id}
          onSelect={onSectionChange}
        />
      ))}
    </Box>
  );
};

export default Sidebar;
