"use client"
import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { TabBarContainer, Tab } from './styles';
 
const TabBar: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
 
  const routeToTabMap: { [key: string]: string } = {
    '/non-financial-marketplace': 'Non-Financial',
    '/services': 'Financial',
    '/courses': 'Courses',
    '/communities': 'Communities',
    '/media': 'Media',
    '/investment': 'Investment',
    '/calendar': 'Calendar',
    '/opportunities': 'Opportunities',
  };
 
  const [activeTab, setActiveTab] = useState<string>(() => {
    return routeToTabMap[pathname] || 'Financial';
  });
 
  useEffect(() => {
    setActiveTab(routeToTabMap[pathname] || 'Financial');
  }, [pathname]);
 
  const handleTabClick = (tabName: string, path: string) => {
    setActiveTab(tabName);
    router.push(path);
  };
 
  return (
    <TabBarContainer>
      <Tab
        onClick={() => handleTabClick('Non-Financial', '/non-financial-marketplace')}  
        active={activeTab === 'Non-Financial'}
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
        onClick={() => handleTabClick('Financial', '/services')}
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
        onClick={() => handleTabClick('Communities', '#')}
        active={activeTab === 'Communities'}
      >
        <img src="/assets/images/tab_bar/forum.svg" alt="icon" />
        Communities
      </Tab>
      <Tab
        onClick={() => handleTabClick('Media', '#')}
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
    </TabBarContainer>
  );
};
 
export default TabBar;