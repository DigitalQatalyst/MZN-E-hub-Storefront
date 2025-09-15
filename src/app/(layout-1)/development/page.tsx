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
  padding: 100px 120px 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Open Sans', serif;
  gap: 2rem;
  flex: 1;
  @media (max-width: 1199px) {
    padding: 180px 32px 250px;
  }
  @media (max-width: 899px) {
    padding: 180px 16px 250px;
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
  margin-bottom: 80px;
`;

const Message = styled.p`
  font-size: 16px;
  color: #4B5563;
  max-width: 600px;
`;

const EmailForm = styled.form`
  position: relative;
  display: inline-block;
`;

const EmailInput = styled.input`
  padding: 0 130px 0 20px;
  border: 2px solid #E5E5E5;
  border-radius: 12px;
  font-size: 16px;
  color: #333;
  width: 375px;
  height: 56px;
  outline: none;
  background-color: #FFF;
  box-sizing: border-box;
  
  &::placeholder {
    color: #A3A3A3;
    font-size: 16px;
  }
  
  &:focus {
    border-color: #6C5CE7;
  }
`;

const NotifyButton = styled.button`
  position: absolute;
  right: 8px;
  top: 8px;
  width: 113px;
  height: 40px;
  background-color: #6C5CE7;
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background-color: #5A4FCF;
  }
  
  &:active {
    transform: translateY(1px);
  }
`;

const FooterText = styled.p`
  font-size: 12px;
  color: #6B7280;
`;

const DevelopmentPage: React.FC = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Email submitted:", email);
  };

  return (
    <PageContainer>
      <Navbar />
      <DevelopmentSection>
        <ContentColumn>
          <H3 fontSize="48px" fontWeight="400" fontFamily="Open Sans" color="#0030E3">
            Something Amazing is Coming
          </H3>
          <Message>
            We're shaping a journey that will redefine how enterprises grow, connect, and succeed. Be the first to know when it's ready.
          </Message>
          <HourglassContainer>
            <img src="/assets/images/Groceries Shop/hourglass_top.png" width={134} height={174} alt="Hourglass" />
          </HourglassContainer>
          <EmailForm onSubmit={handleSubmit}>
            <EmailInput 
              type="email" 
              placeholder="Enter your email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <NotifyButton type="submit">Notify Me</NotifyButton>
          </EmailForm>
          <FooterText>Join 10,000+ people waiting! No spam, ever.</FooterText>
        </ContentColumn>
      </DevelopmentSection>
    </PageContainer>
  );
};

export default DevelopmentPage;