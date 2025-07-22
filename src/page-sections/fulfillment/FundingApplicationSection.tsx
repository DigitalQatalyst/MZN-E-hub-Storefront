"use client";

import React, { FC, useState } from "react";
// import styled from "styled-components";
import Box from "@component/Box";
import FlexBox from "@component/FlexBox";
import Icon from "@component/icon/Icon";
import { H4, Span } from "@component/Typography";
import CheckIcon from "@mui/icons-material/Check";
import styled from "styled-components";

// STYLED COMPONENTS
const FundingContainer = styled.div`
  height: auto;
  padding: 32px 24px;
  border-radius: 6px;
  background-color: #ffffff;
  box-shadow: 0px 4px 18px rgba(75, 70, 92, 0.1);

  @media (max-width: 600px) {
    padding: 24px 16px;
  }
`;

const ProgressContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  gap: 8px;
  margin-top: 32px;

  @media (max-width: 850px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
    margin-inline-end: 10%;
  }
`;


const StepContainer = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "isSelected",
})<{ isSelected?: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
  transition: background-color 0.2s ease;
  background-color: ${({ isSelected }) =>
    isSelected ? "#f0f4ff" : "transparent"};

  &:hover {
    background-color: ${({ isSelected }) =>
      isSelected ? "#f0f4ff" : "#f8fafc"};
  }

  @media (max-width: 600px) {
    width: 100%;
  }
`;

const StepCircle = styled.div.withConfig({
  shouldForwardProp: (prop) => !["completed", "current"].includes(prop),
})<{ completed?: boolean; current?: boolean }>`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: ${({ completed, current }) =>
    completed ? "#6366F1" : current ? "#E0E7FF" : "#E5E7EB"};
  border: ${({ completed, current }) =>
    completed || current ? "none" : "2px solid #D1D5DB"};
`;

const InnerDot = styled.div`
  width: 8px;
  height: 8px;
  background-color: #6366f1;
  border-radius: 50%;
`;

const EmptyDot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
`;

const StepLabel = styled.div`
  display: flex;
  flex-direction: row;
  gap: 7px;
`;

const StepNumber = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: #6b7280;
`;

const StepText = styled.span.withConfig({
  shouldForwardProp: (prop) => !["completed", "current"].includes(prop),
})<{ completed?: boolean; current?: boolean }>`
  font-size: 14px;

  @media (max-width: 600px) {
    font-size: 13px;
  }
`;


const ConnectorLine = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "completed",
})<{ completed?: boolean }>`
  background-color: ${({ completed }) => (completed ? "#6366F1" : "#E5E7EB")};
  flex-shrink: 0;

  @media (min-width: 850px) {
    flex: 1;
    height: 2px;
    width: auto;
    margin: 0 4px;
  }

  @media (max-width: 850px) {
    width: 2px;
    height: 24px;
    margin: 4px 10px;
    align-self: start;
  }
`;

const TrackingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  flex: 1 0 0;
  margin-top: 38px;
`;

const TrackingHeader = styled.span`
  flex: 1 0 0;
  color: #4b465c;
  font-feature-settings: "liga" off, "clig" off;
  font-family: "Public Sans", sans-serif;
  font-size: 15px;
  font-style: normal;
  font-weight: 600;
  line-height: 22px;
  display: block;
`;

const TrackingRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  width: 100%;
`;

const TrackingRowOne = styled.span`
  flex: 1 0 0;
  color: #4b465c;
  font-feature-settings: "liga" off, "clig" off;
  font-family: "Public Sans", sans-serif;
  font-size: 15px;
  font-style: normal;
  font-weight: 600;
  line-height: 22px;
`;

const TrackingRowTwo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex: 1 0 0;
`;

const StatusBadge = styled.span<{ status?: string }>`
  color: ${({ status }) => {
    switch (status) {
      case "completed":
        return "#059669";
      case "under-review":
        return "#f59e0b";
      case "pending":
        return "#6b7280";
      default:
        return "#f59e0b";
    }
  }};
  background-color: ${({ status }) => {
    switch (status) {
      case "completed":
        return "#d1fae5";
      case "under-review":
        return "#fff7ed";
      case "pending":
        return "#f3f4f6";
      default:
        return "#fff7ed";
    }
  }};
  font-size: 14px;
  font-weight: 600;
  font-family: "Public Sans", sans-serif;
  padding: 4px 8px;
  border-radius: 4px;
  line-height: 22px;
`;

// =================================================================
type Props = {};

interface StepData {
  number: string;
  title: string;
  completed: boolean;
  current?: boolean;
  trackingData: {
    status: string;
    statusType: "completed" | "under-review" | "pending";
    lastUpdate: string;
    slaIndicator: string;
  };
}
// =================================================================

export default function FundingApplicationSection({}: Props) {
  const stepData: StepData[] = [
    {
      number: "01",
      title: "Application Submitted",
      completed: true,
      trackingData: {
        status: "Completed",
        statusType: "completed",
        lastUpdate: "15-04-2025",
        slaIndicator: "Completed on time",
      },
    },
    {
      number: "02",
      title: "Under Review",
      current: true,
      completed: false,
      trackingData: {
        status: "Under Review",
        statusType: "under-review",
        lastUpdate: "20-04-2025",
        slaIndicator: "3 days until target close",
      },
    },
    {
      number: "03",
      title: "Funding Application Approved",
      completed: false,
      trackingData: {
        status: "Pending",
        statusType: "pending",
        lastUpdate: "Not started",
        slaIndicator: "Awaiting review completion",
      },
    },
  ];

  const [selectedStep, setSelectedStep] = useState<number>(1); // Default to step 2 (index 1)

  const handleStepClick = (stepIndex: number) => {
    setSelectedStep(stepIndex);
  };

  const currentTrackingData = stepData[selectedStep].trackingData;

  // Helper function to determine if a step should show as completed (selected or before selected)
  const isStepCompleted = (stepIndex: number) => {
    return stepIndex <= selectedStep;
  };

  // Helper function to determine if a step is currently selected
  const isStepCurrent = (stepIndex: number) => {
    return stepIndex === selectedStep;
  };

  return (
    <FundingContainer>
      <H4
        fontSize="24px"
        fontWeight="600"
        fontFamily="'Public Sans', sans-serif"
        fontStyle="normal"
        lineHeight="30px"
        fontFeatureSettings="'liga' off, 'clig' off"
        color="#4B465C"
        mb="32px"
      >
        Request for Funding Application
      </H4>

      <ProgressContainer>
        {stepData.map((step, index) => {
          const isLast = index === stepData.length - 1;
          const stepCompleted = isStepCompleted(index);
          const stepCurrent = isStepCurrent(index);
          const isStepBehindSelected = index < selectedStep;

          return (
            <React.Fragment key={step.number}>
              <StepContainer
                onClick={() => handleStepClick(index)}
                isSelected={stepCurrent}
              >
                <StepCircle
                  completed={isStepBehindSelected}
                  current={stepCurrent}
                >
                  {isStepBehindSelected ? (
                    <CheckIcon fontSize="small" style={{ color: "white" }} />
                  ) : stepCurrent ? (
                    <Icon size="22px" color="primary">
                      Base_Step_Elements
                    </Icon>
                  ) : (
                    <EmptyDot />
                  )}
                </StepCircle>
                <StepLabel>
                  <StepNumber>{step.number}</StepNumber>
                  <StepText
                    completed={isStepBehindSelected}
                    current={stepCurrent}
                  >
                    {step.title}
                  </StepText>
                </StepLabel>
              </StepContainer>
              {!isLast && (
                <ConnectorLine completed={isStepCompleted(index + 1)} />
              )}
            </React.Fragment>
          );
        })}
      </ProgressContainer>

      <TrackingContainer>
        <TrackingHeader>TRACKING DETAILS</TrackingHeader>

        <TrackingRow>
          <TrackingRowOne>
            <Span fontSize="15px" fontWeight="600" color="#4b465c">
              Status
            </Span>
          </TrackingRowOne>
          <TrackingRowTwo>
            <StatusBadge status={currentTrackingData.statusType}>
              {currentTrackingData.status}
            </StatusBadge>
          </TrackingRowTwo>
        </TrackingRow>

        <TrackingRow>
          <TrackingRowOne>
            <Span fontSize="15px" fontWeight="600" color="#4b465c">
              Last update
            </Span>
          </TrackingRowOne>
          <TrackingRowTwo>
            <Span fontSize="15px" fontWeight="400" color="#374151">
              {currentTrackingData.lastUpdate}
            </Span>
          </TrackingRowTwo>
        </TrackingRow>

        <TrackingRow>
          <TrackingRowOne>
            <Span fontSize="15px" fontWeight="600" color="#4b465c">
              SLA Indicator
            </Span>
          </TrackingRowOne>
          <TrackingRowTwo>
            <Span fontSize="15px" fontWeight="400" color="#374151">
              {currentTrackingData.slaIndicator}
            </Span>
          </TrackingRowTwo>
        </TrackingRow>
      </TrackingContainer>
    </FundingContainer>
  );
}
