"use client";

import { useRef } from 'react';
import { navLinks } from './constants';
import NavButton from './NavButton';
import SearchBar from './SearchBar';
import styles from './TopNavigation.module.css';


interface TopNavigationProps {
  selectedNavLink: string;
  onNavLinkChange: (link: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const TopNavigation: React.FC<TopNavigationProps> = ({
  selectedNavLink,
  onNavLinkChange,
  searchQuery,
  onSearchChange
}) => {
  const navLinksRef = useRef<HTMLDivElement>(null);

  return (
    <div className={styles.topNav}>
      <div className={styles.navLinks} ref={navLinksRef}>
        {navLinks.map((link) => (
          <NavButton
            key={link.id}
            link={link}
            isActive={selectedNavLink === link.id}
            onClick={() => onNavLinkChange(link.id)}
          />
        ))}
      </div>
      <SearchBar
        value={searchQuery}
        onChange={onSearchChange}
        placeholder="Search communities..."
      />
    </div>
  );
};

export default TopNavigation;