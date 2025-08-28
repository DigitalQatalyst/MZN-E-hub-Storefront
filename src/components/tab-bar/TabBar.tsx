"use client"
import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { TabBarContainer, Tab } from './styles';
import { FaBars } from 'react-icons/fa';

const TabBar: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const routeToTabMap: { [key: string]: string } = {
    '/non-financial-marketplace': 'Non-Financial',
    '/financial-marketplace': 'Financial',
    '/courses': 'Courses',
    '/community-marketplace': 'Communities',
    '/media': 'Media',
    '/investment': 'Investment',
    '/calendar': 'Calendar',
    '/opportunities': 'Opportunities',
  };

  const [activeTab, setActiveTab] = useState<string>(() => {
    return routeToTabMap[pathname] || "Financial";
  });
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setActiveTab(routeToTabMap[pathname] || "Financial");
  }, [pathname]);

  const handleTabClick = (tabName: string, path: string) => {
    setActiveTab(tabName);
    router.push(path);
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <TabBarContainer>
      <div className="hamburger" onClick={toggleMenu}>
        <FaBars className="hamburger-icon" />
      </div>
      <div className={`tabs ${isMenuOpen ? 'open' : ''}`}>
        <Tab
          onClick={() => handleTabClick('Non-Financial', '/non-financial-marketplace')}
          active={activeTab === 'Non-Financial' ? true : undefined}
        >
          <img
            src={activeTab === 'Non-Financial'
              ? '/assets/images/tab_bar/all_inclusive_active.svg'
              : '/assets/images/tab_bar/all_inclusive.svg'}
            alt="icon"
          />
          Non-Financial
        </Tab>
        <Tab
          onClick={() => handleTabClick('Financial', '/financial-marketplace')}
          active={activeTab === 'Financial'}
        >
          <img
            src={activeTab === 'Financial'
              ? '/assets/images/tab_bar/money_bag.svg'
              : '/assets/images/tab_bar/money_bag_inactive.svg'}
            alt="icon"
          />
          Financial
        </Tab>
        <Tab
          onClick={() => handleTabClick('Courses', '#')}
          active={activeTab === 'Courses'}
        >
          <img src="/assets/images/tab_bar/local_library.svg" alt="icon" />
          Courses
        </Tab>
        <Tab
          onClick={() => handleTabClick('Communities', '/community-marketplace')}
          active={activeTab === 'Communities' ? true : undefined}
        >
          <img
            src={activeTab === 'Communities'
              ? '/assets/images/tab_bar/groups.png'
              : '/assets/images/tab_bar/forum.svg'}
            alt="icon"
          />
          Communities
        </Tab>
        <Tab
          onClick={() => handleTabClick('Media', 'https://kf-ej-media-marketplace-c7ifty1ol-digitalqatalysts-projects.vercel.app/media/')}
          active={activeTab === 'Media'}
        >
          <img src="/assets/images/tab_bar/brand_awareness.svg" alt="icon" />
          Media
        </Tab>
        <Tab
          onClick={() => handleTabClick('Investment', '#')}
          active={activeTab === 'Investment'}
        >
          <img src="/assets/images/tab_bar/crowdsource.svg" alt="icon" />
          Investment
        </Tab>
        <Tab
          onClick={() => handleTabClick('Calendar', '#')}
          active={activeTab === 'Calendar'}
        >
          <img src="/assets/images/tab_bar/calendar_month.svg" alt="icon" />
          Calendar
        </Tab>
        <Tab
          onClick={() => handleTabClick('Opportunities', '#')}
          active={activeTab === 'Opportunities'}
        >
          <img src="/assets/images/tab_bar/rocket_launch.svg" alt="icon" />
          Opportunities
        </Tab>
      </div>
    </TabBarContainer>
  );
};

export default TabBar;
