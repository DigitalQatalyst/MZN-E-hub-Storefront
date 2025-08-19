"use client";

import styles from './NavButton.module.css';
import { NavButtonProps } from './types';

const NavButton: React.FC<NavButtonProps> = ({ link, isActive, onClick }) => {
  return (
    <button
      className={`${styles.navButton} ${isActive ? styles.active : ""}`}
      onClick={onClick}
      aria-pressed={isActive}
    >
      <img
        src={link.icon}
        alt={`${link.label} Icon`}
        className={styles.navIcon}
        style={{
          filter: isActive ? "brightness(0) invert(1)" : "none",
        }}
      />
      {link.label}
    </button>
  );
};

export default NavButton;