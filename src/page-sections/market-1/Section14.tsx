"use client";

import NextImage from "next/image";
import styled from "styled-components";
import { H3 } from "@component/Typography";

// STYLED COMPONENTS
const WelcomeSection = styled.section`
  background-color: #0030E3;
  color: white;
  padding: 6rem;
  display: grid;
  font-family: 'Abhaya Libre', serif;
  grid-template-columns: 5fr 4fr; /* 5:4 ratio for content and stats */
  gap: 2rem;
  margin-bottom: 2rem;
`;

const ContentColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

const StatsColumn = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 1rem;
  position: relative;
`;

const StatItem = styled.div`
  display: inline-flex;
  height: 74px;
  padding: 0px 20px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 4px;
  flex-shrink: 0;
  border-left: 4px solid #FFF;
`;

const StatValue = styled.div`
  font-size: 24px;
`;

const StatLabel = styled.div`
  font-size: 16px;
  font-weight: 400;
  text-align: center;
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
  font-size: 12px;
  color: #fff;
  position: relative;
`;

const LabelText = styled.div<{ muted?: boolean }>`
  color: ${(props) => (props.muted ? "#A9A9A9" : "#fff")};
`;

const ComingSoonLabel = styled.div`
  position: absolute;
  top: -10px;
  right: -35px;
  background-color: #fff;
  color: #0030E3;
  font-size: 10px;
  font-weight: 600;
  padding: 2px 6px;
  border-radius: 10px;
`;

// TYPES
interface Icon {
  src: string;
  label: string;
  comingSoon: boolean;
}

interface Stat {
  value: string;
  label: string;
}

const Section14: React.FC = () => {
  const icons: Icon[] = [
    { src: "/assets/images/Groceries Shop/Icon8.png", label: "Non-Financial Marketplace", comingSoon: false },
    { src: "/assets/images/Groceries Shop/Icon7.png", label: "Financial Marketplace", comingSoon: false },
    { src: "/assets/images/Groceries Shop/Icon6.png", label: "Media Marketplace", comingSoon: false },
    { src: "/assets/images/Groceries Shop/Icon5.png", label: "Communities Marketplace", comingSoon: false },
    { src: "/assets/images/Groceries Shop/Icon4.png", label: "Calendar Marketplace", comingSoon: true },
    { src: "/assets/images/Groceries Shop/Icon3.png", label: "Courses Marketplace", comingSoon: true },
    { src: "/assets/images/Groceries Shop/Icon2.png", label: "Investment Marketplace", comingSoon: true },
    { src: "/assets/images/Groceries Shop/Icon1.png", label: "Opportunities Marketplace", comingSoon: true },
  ];

  const stats: Stat[] = [
    { value: "500+", label: "Services available" },
    { value: "100+", label: "Verified partners" },
    { value: "4", label: "Marketplaces" },
    { value: "6", label: "Phases of business growth" },
  ];

  return (
    <div>
      {/* Welcome Section */}
      <WelcomeSection>
        <ContentColumn>
          <p style={{ fontSize: "16px", fontWeight: "400" }}>OUR MARKETPLACE PORTFOLIO</p>
          <H3 fontSize="48px" fontWeight="400" mb="1rem">
            A growing platform to power every <br /> stage of your business.
          </H3>
        </ContentColumn>
        <StatsColumn>
          {stats.map((stat, index) => (
            <StatItem key={index}>
              <StatValue>{stat.value}</StatValue>
              <StatLabel>{stat.label}</StatLabel>
            </StatItem>
          ))}
        </StatsColumn>
        <IconRow>
          {icons.map((icon, index) => (
            <IconItem key={index}>
              <NextImage
                src={icon.src}
                alt={icon.label}
                width={60}
                height={60}
                style={{ objectFit: "contain" }}
              />
              <LabelText muted={icon.comingSoon} style={{ display: "flex", flexDirection: "column" }}>
                {icon.label.split(" ").map((word: string, i: number) => (
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
};

export default Section14;