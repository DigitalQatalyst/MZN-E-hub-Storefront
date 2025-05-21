import React, { useState } from 'react';
import { TabBarContainer, Tab } from './styles';

const TabBar: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('Financial'); // Default active tab

  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
  };

  return (
    <TabBarContainer>
      <Tab onClick={() => handleTabClick('Non-Financial')} active={activeTab === 'Non-Financial'}>
        <img src="../assets/images/tab_bar/all_inclusive.svg" alt="icon" />
        Non-Financial
      </Tab>
      <Tab onClick={() => handleTabClick('Financial')} active={activeTab === 'Financial'}>
        <img src="../assets/images/tab_bar/money_bag.svg" alt="icon" />
        Financial
      </Tab>
      <Tab onClick={() => handleTabClick('Courses')} active={activeTab === 'Courses'}>
        <img src="../assets/images/tab_bar/local_library.svg" alt="icon" />
        Courses
      </Tab>
      <Tab onClick={() => handleTabClick('Communities')} active={activeTab === 'Communities'}>
        <img src="../assets/images/tab_bar/forum.svg" alt="icon" />
        Communities
      </Tab>
      <Tab onClick={() => handleTabClick('Media')} active={activeTab === 'Media'}>
        <img src="../assets/images/tab_bar/brand_awareness.svg" alt="icon" />
        Media
      </Tab>
      <Tab onClick={() => handleTabClick('Investment')} active={activeTab === 'Investment'}>
        <img src="../assets/images/tab_bar/crowdsource.svg" alt="icon" />
        Investment
      </Tab>
      <Tab onClick={() => handleTabClick('Calendar')} active={activeTab === 'Calendar'}>
        <img src="../assets/images/tab_bar/calendar_month.svg" alt="icon" />
        Calendar
      </Tab>
      <Tab onClick={() => handleTabClick('Opportunities')} active={activeTab === 'Opportunities'}>
        <img src="../assets/images/tab_bar/rocket_launch.svg" alt="icon" />
        Opportunities
      </Tab>
    </TabBarContainer>
  );
};

export default TabBar;
