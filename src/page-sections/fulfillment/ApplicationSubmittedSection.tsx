"use client";

import { FC, useState } from "react";
import styled from "styled-components";
import Box from "@component/Box";
import FlexBox from "@component/FlexBox";
import Icon from "@component/icon/Icon";
import { H4, Span } from "@component/Typography";

// STYLED COMPONENTS
const SubmittedContainer = styled.div`
  display: flex;
  padding: 24px 24px 35px 24px;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;
  align-self: stretch;
  border-radius: 6px;
  background-color: #ffffff;
  box-shadow: 0px 4px 18px rgba(75, 70, 92, 0.1);

   @media (max-width: 600px) {
    padding: 16px;
  }
`;

const MessageContainer = styled.div`
 display: flex;
  padding: 19px 0px 36px 0px;
  align-items: center;
  border-radius: 6px;
  background-color: rgba(40, 199, 111, 0.16);

  @media (max-width: 600px) {
    flex-direction: column;
    height: auto
`;

const MessageWrapper = styled.div`
  display: flex;
  width: 90%;
  padding: 12px 16px; 
  align-items: flex-start;
  gap: 16px; /* gap-4 */
  border-radius: 6px; /* border-radius-md */
`;

const MessageIcon = styled(FlexBox)(({ theme }) => ({
  alignItems: "center",
  gap: "8px",
}));

const CloseButton = styled(Box)`
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  position: relative;
  top: -30px;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;


const IconContainer = styled.div`
  display: flex;
  padding: 0.25rem; /* p-1 equivalent in Tailwind */
  align-items: flex-start;
  border-radius: 0.375rem; /* border-radius-md */
  background: #28C76F;
`;


const MessageHeaderText = styled.span`
  align-self: stretch;
  color: #28c76f;
  font-feature-settings: "liga" off, "clig" off;
  font-family: "Public Sans", sans-serif;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px;
  text-align: left;
  display: block;
`;

const MessageText = styled.span`
  align-self: stretch;
  color: #28c76f;
  font-feature-settings: "liga" off, "clig" off;
  font-family: "Public Sans", sans-serif;
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: 22px;
  text-align: left;
`;

const ClosedContainer = styled.div`
  display: flex;
  padding: 7px;
  align-items: center;
  color: #28C76F;
`;


// =================================================================
type Props = {
  onClose?: () => void;
};
// =================================================================

export default function ApplicationSubmittedSection({ onClose }: Props) {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
    onClose?.();
  };

  if (!isVisible) {
    return null;
  }

  return (
    <SubmittedContainer>
      <H4
        fontSize="24px"
        fontWeight="600"
        color="#4B465C"
        fontFamily="'Public Sans', sans-serif"
        fontStyle="normal"
        lineHeight="30px"
        fontFeatureSettings="'liga' off, 'clig' off"
        alignSelf="stretch"
      >
        Application Submitted Successfully
      </H4>

      <MessageContainer>
        <MessageWrapper>
          <MessageIcon>
            <IconContainer>
              <Icon size="22px" color="primary">
                circle-check
              </Icon>
            </IconContainer>
          </MessageIcon>
          <div>
            <MessageHeaderText>Message</MessageHeaderText>
            <MessageText>
              Your application has been successfully submitted and is now under
              review. You can track the progress and review your application
              details below. We will notify you via email and SMS whenever there
              is an update or change in the status of your application.
            </MessageText>
          </div>
        </MessageWrapper>
        <CloseButton onClick={handleClose}>
          <ClosedContainer>
            <Icon size="20px" color="primary">
            x
          </Icon>
          </ClosedContainer>
        </CloseButton>
      </MessageContainer>
    </SubmittedContainer>
  );
}
