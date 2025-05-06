"use client";

import NextImage from "next/image";
import styled from "styled-components";
import { H3 } from "@component/Typography";

// STYLED COMPONENTS
const WelcomeSection = styled.section`
  background-color: #0030E3;
  color: white;
  padding: 3rem 3rem;
  display: grid;
  font-family: 'Abhaya Libre', serif;
  grid-template-columns: 1fr 1fr; /* Split into two columns */
  gap: 2rem;
  margin-bottom: 2rem;
`;

const ContentColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

const StatsColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
`;

const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 14px;
  text-align: left;
`;

const StatNumber = styled.div`
  font-size: 24px;
  font-weight: 700;
`;

const IconRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
  gap: 1rem;
  grid-column: span 2; /* Span across both columns */
`;

const IconItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  font-size: 14px;
  color: #fff;
  position: relative;
`;

const LabelText = styled.div<{ muted?: boolean }>`
  color: ${(props) => (props.muted ? "#A9A9A9" : "#fff")}; /* Grey for muted, white otherwise */
`;

const ComingSoonLabel = styled.div`
  position: absolute;
  top: -10px;
  right: -10px;
  background-color: #fff;
  color: #0030E3;
  font-size: 10px;
  font-weight: 600;
  padding: 2px 6px;
  border-radius: 10px;
`;

export default function Section14() {
  const icons = [
    { src: "/assets/images/Groceries Shop/Icon8.png", label: "Non-Financial Marketplace", comingSoon: false },
    { src: "/assets/images/Groceries Shop/Icon7.png", label: "Financial Marketplace", comingSoon: false },
    { src: "/assets/images/Groceries Shop/Icon6.png", label: "Media Marketplace", comingSoon: false },
    { src: "/assets/images/Groceries Shop/Icon5.png", label: "Communities Marketplace", comingSoon: false },
    { src: "/assets/images/Groceries Shop/Icon4.png", label: "Calendar Marketplace", comingSoon: true },
    { src: "/assets/images/Groceries Shop/Icon3.png", label: "Courses Marketplace", comingSoon: true },
    { src: "/assets/images/Groceries Shop/Icon2.png", label: "Investment Marketplace", comingSoon: true },
    { src: "/assets/images/Groceries Shop/Icon1.png", label: "Opportunities Marketplace", comingSoon: true },
  ];

  return (
    <div>
      {/* Welcome Section */}
      <WelcomeSection>
        <ContentColumn>
          <p style={{ fontSize: "16px", fontWeight: "400" }}>OUR MARKETPLACE PORTFOLIO</p>
          <H3 fontSize="28px" fontWeight="700" mb="1rem">
            A growing platform to power every <br /> stage of your business.
          </H3>
        </ContentColumn>

        <IconRow>
          {icons.map((icon, index) => (
            <IconItem key={index}>
              <NextImage
                src={icon.src}
                alt={icon.label}
                width={40}
                height={40}
                style={{ objectFit: "contain" }}
              />
              <LabelText muted={icon.comingSoon} style={{ display: "flex", flexDirection: "column" }}>
                {icon.label.split(" ").map((word, i) => (
                  <span key={i}>{word}</span>
                ))}
              </LabelText>
              {icon.comingSoon && <ComingSoonLabel>Coming Soon!</ComingSoonLabel>}
            </IconItem>
          ))}
        </IconRow>
      </WelcomeSection>
    </div>
  );
}