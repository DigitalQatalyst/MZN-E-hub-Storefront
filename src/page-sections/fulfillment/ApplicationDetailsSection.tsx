"use client";

import { useState } from "react";
import styled from "styled-components";
import Box from "@component/Box";
import FlexBox from "@component/FlexBox";
import Icon from "@component/icon/Icon";
import { H4 } from "@component/Typography";

// ==== Styled Components

const DetailsContainer = styled(Box)`
  padding: 24px;
  background-color: white;
  border-top: 1px solid #e5e7eb;
`;

const ViewApplicationCard = styled(Box)`
  background-color: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 0;
  cursor: pointer;
  transition: all 0.2s ease;
  overflow: hidden;

  &:hover {
    background-color: #f3f4f6;
    border-color: #d1d5db;
  }
`;

const CardHeader = styled(FlexBox)`
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px 16px 24px;
  border-bottom: 1px solid #e5e7eb;
`;

const CardTitle = styled(H4)`
  font-size: 16px;
  font-weight: 600;
  color: #374151;
  margin: 0;
`;

const ViewMoreButton = styled(FlexBox)`
  align-items: center;
  gap: 8px;
  color: #6b7280;
  font-size: 14px;
  font-weight: 500;
`;

const DropdownContent = styled(Box)`
  padding: 16px 24px;
  background-color: #ffffff;
  color: #374151;
  font-size: 14px;
`;

// ==== Functional Component ====

export default function ApplicationDetailsSection({
  onViewApplication,
}: {
  onViewApplication?: () => void;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DetailsContainer>
      <ViewApplicationCard onClick={() => setIsOpen(prev => !prev)}>
        <CardHeader>
          <CardTitle>View your application details</CardTitle>
          <ViewMoreButton>
            <Icon size="18px" defaultcolor="currentColor">
              {isOpen ? "chevron-down" : "chevron-right"}
            </Icon>
          </ViewMoreButton>
        </CardHeader>

        {isOpen && (
          <DropdownContent>
            <p>This is some mock dropdown content. You can replace this with component data or rich previews.</p>
          </DropdownContent>
        )}
      </ViewApplicationCard>
    </DetailsContainer>
  );
}
