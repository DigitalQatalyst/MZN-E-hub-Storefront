"use client";

import { useState } from "react";
import styled from "styled-components";
import { H3 } from "@component/Typography";
import Icon from "@component/icon/Icon";

const DevelopmentSection = styled.section`
  background-color: #f4f4f4;
  color: #333;
  padding: 50px 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Open Sans', serif;
  gap: 2rem;
  min-height: 100vh;
  @media (max-width: 1199px) {
    padding: 32px 32px;
  }
  @media (max-width: 899px) {
    padding: 16px 8px;
  }
`;

const ContentColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  text-align: center;
`;

const ConstructionIcon = styled.div`
  font-size: 4em;
  color: #ff4444;
`;

const Message = styled.p`
  font-size: 1.2em;
  color: #666;
  max-width: 600px;
`;

const DevelopmentPage: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  const handleDismiss = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <DevelopmentSection>
      <ContentColumn>
        <ConstructionIcon>🚧</ConstructionIcon>
        <H3 fontSize="48px" fontWeight="400" fontFamily="Open Sans">
          Page in Development
        </H3>
        <Message>
          This page is currently under construction. Please check back later for updates or contact support if you need assistance.
        </Message>
        
        {/* <Button onClick={handleDismiss}>Dismiss</Button> */}
      </ContentColumn>
    </DevelopmentSection>
  );
};

const Button = styled.button`
  background-color: #0030E3;
  color: #fff;
  padding: 12px 24px;
  border: none;
  border-radius: 4px;
  font-family: "Public Sans", sans-serif;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  width: fit-content;

  &:hover {
    background-color: #0026CC;
  }

  @media (max-width: 899px) {
    padding: 10px 20px;
    font-size: 14px;
  }
`;

export default DevelopmentPage;