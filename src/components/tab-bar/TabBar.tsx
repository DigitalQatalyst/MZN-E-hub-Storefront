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
        Non-Financial
      </Tab>
      <Tab onClick={() => handleTabClick('Financial')} active={activeTab === 'Financial'}>
        Financial
      </Tab>
      <Tab onClick={() => handleTabClick('Courses')} active={activeTab === 'Courses'}>
        Courses
      </Tab>
      <Tab onClick={() => handleTabClick('Communities')} active={activeTab === 'Communities'}>
        Communities
      </Tab>
      <Tab onClick={() => handleTabClick('Media')} active={activeTab === 'Media'}>
        Media
      </Tab>
      <Tab onClick={() => handleTabClick('Investment')} active={activeTab === 'Investment'}>
        Investment
      </Tab>
      <Tab onClick={() => handleTabClick('Calendar')} active={activeTab === 'Calendar'}>
        Calendar
      </Tab>
      <Tab onClick={() => handleTabClick('Opportunities')} active={activeTab === 'Opportunities'}>
        Opportunities
      </Tab>
    </TabBarContainer>
  );
};

export default TabBar;
