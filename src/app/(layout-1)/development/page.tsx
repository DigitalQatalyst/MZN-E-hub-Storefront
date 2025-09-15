"use client";

import { useState } from "react";
import styled from "styled-components";
import { H3 } from "@component/Typography";
import dynamic from "next/dynamic";

// Dynamically import the marketplace Navbar component with SSR disabled
const Navbar = dynamic(
  () => import("@component/navbar/marketplace_nav/Navbar"),
  { ssr: false }
);

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const DevelopmentSection = styled.section`
  background-color: #fff;
  color: #333;
  padding: 20px 120px 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Open Sans', serif;
  gap: 2rem;
  flex: 1;
  @media (max-width: 1199px) {
    padding: 20px 32px 32px;
  }
  @media (max-width: 899px) {
    padding: 20px 16px 16px;
  }
`;

const ContentColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  text-align: center;
`;

const HourglassContainer = styled.div`
  width: 200px;
  height: 200px;
  background-color: #E6E6E6;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Message = styled.p`
  font-size: 1.2em;
  color: #666;
  max-width: 600px;
`;

const EmailForm = styled.form`
  display: flex;
  align-items: center;
  gap: 0;
  position: relative;
`;

const EmailInput = styled.input`
  padding: 10px 15px;
  border: 1px solid #ccc;
  border-radius: 12px;
  font-size: 14px;
  color: #A3A3A3;
  width: 250px;
  outline: none;
  &::placeholder {
    color: #A3A3A3;
  }
`;

const NotifyButton = styled.button`
  background-color: #6C5CE7;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 0 12px 12px 0;
  font-size: 16px;
  cursor: pointer;
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  &:hover {
    background-color: #5A4FCF;
  }
`;

const FooterText = styled.p`
  font-size: 0.9em;
  color: #999;
`;

const DevelopmentPage: React.FC = () => {
  return (
    <PageContainer>
      <Navbar />
      <DevelopmentSection>
        <ContentColumn>
          <H3 fontSize="48px" fontWeight="400" fontFamily="Open Sans" color="#6C5CE7">
            Something Amazing is Coming
          </H3>
          <Message>
            We're shaping a journey that will redefine how enterprises grow, connect, and succeed. Be the first to know when it's ready.
          </Message>
          <HourglassContainer>
            <img src="/assets/images/Groceries Shop/hourglass_top.png" width={134} height={174} alt="Hourglass" />
          </HourglassContainer>
          <EmailForm>
            <EmailInput type="email" placeholder="Enter your email" />
            <NotifyButton>Notify Me</NotifyButton>
          </EmailForm>
          <FooterText>Join 10,000+ people waiting! No spam, ever.</FooterText>
        </ContentColumn>
      </DevelopmentSection>
    </PageContainer>
  );
};

export default DevelopmentPage;