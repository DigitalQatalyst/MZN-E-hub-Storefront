"use client";

import NextImage from "next/image";
import Link from "next/link";
import styled from "styled-components";
import { H3 } from "@component/Typography";

// STYLED COMPONENTS
const WelcomeSection = styled.section`
  background-color: #0030e3;
  color: white;
  margin-bottom: 2rem;

  /* Mobile first */
  padding: 1.5rem 1rem 2rem 1rem;

  /* Small tablet */
  @media (min-width: 480px) {
    padding: 2rem 1.5rem 2.5rem 1.5rem;
  }

  /* Tablet */
  @media (min-width: 768px) {
    padding: 2.5rem 2rem 3rem 2rem;
  }

  /* Large tablet */
  @media (min-width: 1024px) {
    padding: 3rem 4rem 4rem 4rem;
  }

  /* Desktop */
  @media (min-width: 1200px) {
    padding: 3.125rem 6.25rem 5rem 7.5rem;
  }
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  /* Tablet and up - side by side layout with adjusted ratios */
  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 3rem;
    align-items: start;
  }

  /* Desktop */
  @media (min-width: 1024px) {
    gap: 4rem;
  }

  /* Large desktop - even more space for content */
  @media (min-width: 1200px) {
    grid-template-columns: 1.6fr 0.9fr;
  }
`;

const ContentColumn = styled.div`
  display: flex;
  flex-direction: column;

  /* On tablet and up, ensure content doesn't overflow */
  @media (min-width: 768px) {
    max-width: 100%;
  }
`;

const StatsColumn = styled.div`
  display: grid;
  gap: 1rem;

  /* Mobile: 2x2 grid */
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;

  /* Small tablet: keep 2x2 but larger */
  @media (min-width: 480px) {
    gap: 1.5rem;
  }

  /* Tablet and up: maintain 2x2 grid and position at left */
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    gap: 1rem;
    justify-self: start;
  }

  /* Desktop: keep 2x2 layout */
  @media (min-width: 1200px) {
    gap: 1.2rem;
  }
`;

const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 0.25rem;
  border-left: 4px solid #fff;

  /* Mobile */
  padding: 0.75rem 0.75rem;
  min-height: 60px;

  /* Small tablet */
  @media (min-width: 480px) {
    padding: 1rem 1rem;
    min-height: 70px;
  }

  /* Tablet and up */
  @media (min-width: 768px) {
    padding: 1rem 1.25rem;
    min-height: 74px;
  }
`;

const StatValue = styled.div`
  font-weight: 400;
  font-size: 24px;

  /* Mobile */
  font-size: 18px;
  line-height: 1.2;

  /* Small tablet */
  @media (min-width: 480px) {
    font-size: 20px;
  }

  /* Tablet and up */
  @media (min-width: 768px) {
    font-size: 22px;
  }

  /* Desktop */
  @media (min-width: 1024px) {
    font-size: 24px;
  }
`;

const StatLabel = styled.div`
  font-weight: 400;
  line-height: 1.3;

  /* Mobile */
  font-size: 12px;

  /* Small tablet */
  @media (min-width: 480px) {
    font-size: 13px;
  }

  /* Tablet and up */
  @media (min-width: 768px) {
    font-size: 14px;
  }

  /* Desktop */
  @media (min-width: 1024px) {
    font-size: 16px;
  }
`;

const IconSection = styled.div`
  margin-top: 2rem;

  /* Tablet and up: spans full width */
  @media (min-width: 768px) {
    grid-column: span 2;
    margin-top: 3rem;
  }

  /* Desktop */
  @media (min-width: 1024px) {
    margin-top: 4rem;
  }
`;

const IconGrid = styled.div`
  display: grid;
  justify-items: center;

  /* Mobile: 3 columns, 3 rows with increased row gap */
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: 1.5rem 1.5rem;
  row-gap: 2.5rem;

  /* Small tablet: 3 columns, reset rows */
  @media (min-width: 480px) {
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: auto;
    gap: 2rem;
    row-gap: 2rem;
  }

  /* Tablet: 4 columns, reset rows */
  @media (min-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: auto;
    gap: 2rem;
    row-gap: 2rem;
  }

  /* Large desktop: all 8 in one row if space allows */
  @media (min-width: 1400px) {
    grid-template-columns: repeat(8, 1fr);
    grid-template-rows: auto;
    gap: 1.5rem;
    row-gap: 1.5rem;
  }
`;

const IconItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  color: #fff;
  position: relative;
  width: 100%;
  max-width: 120px;

  /* Mobile spacing */
  gap: 0.5rem;

  /* Tablet and up */
  @media (min-width: 768px) {
    gap: 0.75rem;
  }
`;

const IconImageWrapper = styled.div`
  position: relative;

  /* Mobile */
  width: 48px;
  height: 48px;

  /* Small tablet */
  @media (min-width: 480px) {
    width: 56px;
    height: 56px;
  }

  /* Tablet and up */
  @media (min-width: 768px) {
    width: 60px;
    height: 60px;
  }
`;

const LabelText = styled.div<{ muted?: boolean }>`
  color: ${(props) => (props.muted ? "#A9A9A9" : "#fff")};
  display: flex;
  flex-direction: column;
  line-height: 1.2;

  /* Mobile */
  font-size: 10px;

  /* Small tablet */
  @media (min-width: 480px) {
    font-size: 11px;
  }

  /* Tablet and up */
  @media (min-width: 768px) {
    font-size: 12px;
  }
`;

const ComingSoonLabel = styled.div`
  position: absolute;
  background-color: #fff;
  color: #000;
  font-weight: 600;
  border-radius: 10px;
  white-space: nowrap;

  /* Mobile */
  top: -8px;
  right: -20px;
  font-size: 8px;
  padding: 1px 4px;

  /* Small tablet */
  @media (min-width: 480px) {
    top: -10px;
    right: -25px;
    font-size: 9px;
    padding: 2px 5px;
  }

  /* Tablet and up */
  @media (min-width: 768px) {
    top: -10px;
    right: -35px;
    font-size: 10px;
    padding: 2px 6px;
  }
`;

const StyledSubHeader = styled.p`
  color: #fff;
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 0px;
  margin-bottom: 0;

  /* Mobile */
  font-size: 12px;
  line-height: 1.4;

  /* Small tablet */
  @media (min-width: 480px) {
    font-size: 13px;
  }

  /* Tablet and up */
  @media (min-width: 768px) {
    font-size: 14px;
    line-height: 1.5;
  }

  /* Desktop */
  @media (min-width: 1024px) {
    font-size: 16px;
    line-height: 28px;
  }
`;

const StyledPlatformHeader = styled.h1`
  color: #fff;
  font-weight: 400;
  font-size: 48px;
  letter-spacing: 0px;
  font-family: "FS Kim Trial";
  margin-top: 10px;
  margin-bottom: 1rem;
  line-height: 1.2;

  /* Mobile: 36px with optimized line breaks for 3 rows */
  font-size: 36px;
  line-height: 42px;

  /* Small tablet */
  @media (min-width: 480px) {
    font-size: clamp(24px, 5vw, 32px);
  }

  /* Tablet */
  @media (min-width: 768px) {
    font-size: clamp(28px, 4vw, 36px);
    line-height: 1.15;
  }

  /* Desktop */
  @media (min-width: 1024px) {
    font-size: clamp(36px, 3vw, 48px);
    line-height: 52px;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: inherit;
  width: 100%;
`;

// TYPES
interface Icon {
  src: string;
  label: string;
  comingSoon: boolean;
  link?: string;
}

interface Stat {
  value: string;
  label: string;
}

const Section14: React.FC = () => {
  const icons: Icon[] = [
    {
      src: "/assets/images/Groceries Shop/Icon8.png",
      label: "Non-Financial Marketplace",
      comingSoon: false,
      link: "/non-financial-marketplace",
    },
    {
      src: "/assets/images/Groceries Shop/Icon7.png",
      label: "Financial Marketplace",
      comingSoon: false,
      link: "/financial-marketplace",
    },
    {
      src: "/assets/images/Groceries Shop/Icon6.png",
      label: "Media Marketplace",
      comingSoon: false,
      link: "https://kf-ej-media-marketplace-kefsnx0h1-digitalqatalysts-projects.vercel.app/media",
    },
    {
      src: "/assets/images/Groceries Shop/Icon5.png",
      label: "Communities Marketplace",
      comingSoon: false,
      link: "/community-marketplace",
    },
    {
      src: "/assets/images/Groceries Shop/Icon4.png",
      label: "Calendar Marketplace",
      comingSoon: true,
    },
    {
      src: "/assets/images/Groceries Shop/Icon3.png",
      label: "Courses Marketplace",
      comingSoon: true,
    },
    {
      src: "/assets/images/Groceries Shop/Icon2.png",
      label: "Investment Marketplace",
      comingSoon: true,
    },
    {
      src: "/assets/images/Groceries Shop/Icon1.png",
      label: "Opportunities Marketplace",
      comingSoon: true,
    },
  ];

  const stats: Stat[] = [
    { value: "500+", label: "Services available" },
    { value: "100+", label: "Verified partners" },
    { value: "4", label: "Marketplaces" },
    { value: "6", label: "Phases of business growth" },
  ];

  return (
    <WelcomeSection>
      <MainContainer>
        <ContentColumn>
          <StyledSubHeader style={{ fontSize: "16px" }}>
            OUR MARKETPLACE PORTFOLIO
          </StyledSubHeader>
          <StyledPlatformHeader>
            A growing platform to power every stage of your business.
          </StyledPlatformHeader>
        </ContentColumn>

        <StatsColumn>
          {stats.map((stat, index) => (
            <StatItem key={index}>
              <StatValue>{stat.value}</StatValue>
              <StatLabel style={{ fontSize: "16px" }}>{stat.label}</StatLabel>
            </StatItem>
          ))}
        </StatsColumn>
      </MainContainer>

      <IconSection>
        <IconGrid>
          {icons.map((icon, index) => (
            <IconItem key={index}>
              {icon.link ? (
                <StyledLink href={icon.link}>
                  <IconImageWrapper>
                    <NextImage
                      src={icon.src}
                      alt={icon.label}
                      fill
                      style={{ objectFit: "contain" }}
                    />
                    {icon.comingSoon && (
                      <ComingSoonLabel>Coming Soon!</ComingSoonLabel>
                    )}
                  </IconImageWrapper>
                  <LabelText muted={icon.comingSoon}>
                    {icon.label.split(" ").map((word: string, i: number) => (
                      <span key={i}>{word}</span>
                    ))}
                  </LabelText>
                </StyledLink>
              ) : (
                <>
                  <IconImageWrapper>
                    <NextImage
                      src={icon.src}
                      alt={icon.label}
                      fill
                      style={{ objectFit: "contain" }}
                    />
                    {icon.comingSoon && (
                      <ComingSoonLabel>Coming Soon!</ComingSoonLabel>
                    )}
                  </IconImageWrapper>
                  <LabelText muted={icon.comingSoon}>
                    {icon.label.split(" ").map((word: string, i: number) => (
                      <span key={i}>{word}</span>
                    ))}
                  </LabelText>
                </>
              )}
            </IconItem>
          ))}
        </IconGrid>
      </IconSection>
    </WelcomeSection>
  );
};

export default Section14;
