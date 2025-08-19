"use client";

import { useRef } from 'react';
import { mainNavLinks } from './constants';
import MainNavButton from './MainNavButton';
import styles from './MainNavigation.module.css';



interface MainNavigationProps {
  selectedMainNavLink: string;
  onMainNavLinkChange: (link: string) => void;
}

const MainNavigation: React.FC<MainNavigationProps> = ({
  selectedMainNavLink,
  onMainNavLinkChange
}) => {
  const mainNavRef = useRef<HTMLDivElement>(null);

  return (
    <div className={styles.mainNav} ref={mainNavRef}>
      {mainNavLinks.map((link) => (
        <MainNavButton
          key={link.id}
          link={link}
          isActive={selectedMainNavLink === link.id}
          onClick={() => onMainNavLinkChange(link.id)}
        />
      ))}
    </div>
  );
};

export default MainNavigation;