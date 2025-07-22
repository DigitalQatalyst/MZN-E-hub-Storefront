"use client";

import { FC } from "react";
import styled from "styled-components";
import Box from "@component/Box";
import FlexBox from "@component/FlexBox";
import Icon from "@component/icon/Icon";
import { Span } from "@component/Typography";


const NavigationContainer = styled(FlexBox)`
  flex-direction: column;
  align-items: flex-start;
  gap: 36px;
  cursor: pointer;
  color: #2563eb;
  margin-bottom: 20px;

  &:hover {
    color: #1d4ed8;
  }

  @media (max-width: 600px) {
    gap: 24px;
  }
`;


const BackButton = styled(FlexBox)`
   align-items: center;
  gap: 8px;
  color: #002180;
  cursor: pointer;

  &:hover {
    color: #1d4ed8;
  }

  @media (max-width: 600px) {
    font-size: 13px;
  }
`;


const TabsContainer = styled(FlexBox)`
  border-radius: 8px;
  width: 100%;
  height: auto;
  flex-wrap: wrap;

  @media (max-width: 600px) {
    flex-direction: column;
    gap: 12px;
  }
`;


const TabButton = styled(Box)<{ active?: boolean }>`
   display: flex;
  padding: 8px 12px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-right: 20px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  background-color: ${({ active }) => (active ? '#CCD7FF' : 'transparent')};
  color: ${({ active }) => (active ? '#0030E3' : '#000000')};

  &:hover {
    background-color: ${({ active }) => (active ? '#2563eb' : '#e2e8f0')};
    color: ${({ active }) => (active ? 'white' : '#475569')};
  }

  @media (max-width: 600px) {
    width: 100%;
    margin-right: 0;
    font-size: 13px;
  }
`;


// =================================================================
type Props = {
  onBackClick?: () => void;
  activeTab?: "progress" | "chat";
  onTabChange?: (tab: "progress" | "chat") => void;
};
// =================================================================

export default function NavigationSection({ 
  onBackClick, 
  activeTab = "progress", 
  onTabChange 
}: Props) {
  return (
    <NavigationContainer>
      <BackButton onClick={onBackClick}>
        <Icon mr="8px" size="18px" defaultcolor="currentColor">
          arrow-left
        </Icon>
        <Span fontSize="14px" fontWeight="500">
          Back to Requests
        </Span>
      </BackButton>

      <TabsContainer>
        <TabButton 
          active={activeTab === "progress"}
          onClick={() => onTabChange?.("progress")}
        >
          Your Application Progress
        </TabButton>
        <TabButton 
          active={activeTab === "chat"}
          onClick={() => onTabChange?.("chat")}
        >
          In-Service Chat
        </TabButton>
      </TabsContainer>
    </NavigationContainer>
  );
}