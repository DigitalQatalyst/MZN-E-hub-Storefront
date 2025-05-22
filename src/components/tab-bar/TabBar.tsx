import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation'; // Import useRouter and usePathname
import { TabBarContainer, Tab } from './styles';

const TabBar: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname(); // Get the current route

  // Map routes to tab names
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

  // Initialize activeTab based on the current route, default to 'Financial' if no match
  const [activeTab, setActiveTab] = useState<string>(() => {
    return routeToTabMap[pathname] || 'Financial';
  });

  // Update activeTab when the route changes
  useEffect(() => {
    setActiveTab(routeToTabMap[pathname] || 'Financial');
  }, [pathname]);

  const handleTabClick = (tabName: string, path: string) => {
    setActiveTab(tabName); // Update active tab state
    router.push(path); // Navigate to the specified path
  };

  return (
    <TabBarContainer>
      <Tab
        onClick={() => handleTabClick('Non-Financial', '/non-financial-marketplace')}
        active={activeTab === 'Non-Financial'}
      >
        <img src="/assets/images/tab_bar/all_inclusive.svg" alt="icon" />
        Non-Financial
      </Tab>
      <Tab
        onClick={() => handleTabClick('Financial', '/services')}
        active={activeTab === 'Financial'}
      >
        <img src="/assets/images/tab_bar/money_bag.svg" alt="icon" />
        Financial
      </Tab>
      <Tab
        onClick={() => handleTabClick('Courses', '#')} // Placeholder path
        active={activeTab === 'Courses'}
      >
        <img src="/assets/images/tab_bar/local_library.svg" alt="icon" />
        Courses
      </Tab>
      <Tab
        onClick={() => handleTabClick('Communities', '#')} // Placeholder path
        active={activeTab === 'Communities'}
      >
        <img src="/assets/images/tab_bar/forum.svg" alt="icon" />
        Communities
      </Tab>
      <Tab
        onClick={() => handleTabClick('Media', '#')} // Placeholder path
        active={activeTab === 'Media'}
      >
        <img src="/assets/images/tab_bar/brand_awareness.svg" alt="icon" />
        Media
      </Tab>
      <Tab
        onClick={() => handleTabClick('Investment', '#')} // Placeholder path
        active={activeTab === 'Investment'}
      >
        <img src="/assets/images/tab_bar/crowdsource.svg" alt="icon" />
        Investment
      </Tab>
      <Tab
        onClick={() => handleTabClick('Calendar', '#')} // Placeholder path
        active={activeTab === 'Calendar'}
      >
        <img src="/assets/images/tab_bar/calendar_month.svg" alt="icon" />
        Calendar
      </Tab>
      <Tab
        onClick={() => handleTabClick('Opportunities', '#')} // Placeholder path
        active={activeTab === 'Opportunities'}
      >
        <img src="/assets/images/tab_bar/rocket_launch.svg" alt="icon" />
        Opportunities
      </Tab>
    </TabBarContainer>
  );
};

export default TabBar;