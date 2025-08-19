"use client";

import styles from './MainNavButton.module.css';
import { MainNavButtonProps } from './types';

const MainNavButton: React.FC<MainNavButtonProps> = ({ link, isActive, onClick }) => {
  return (
    <button
      className={`${styles.mainNavButton} ${isActive ? styles.active : ""}`}
      onClick={onClick}
      aria-pressed={isActive}
    >
      <img
        src={link.icon}
        alt={link.label}
        className={styles.icon}
        style={{
          filter: isActive
            ? "brightness(0) invert(1)"
            : "saturate(0)",
        }}
      />
      {link.label}
    </button>
  );
};

export default MainNavButton;