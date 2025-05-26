"use client";

import { useState } from "react";
import { Button as DefaultButton } from "@component/buttons";
import Box from "@component/Box";
import CategorySectionCreator from "@component/CategorySectionCreator";
import { H3 } from "@component/Typography";
import styled from "styled-components";
import Link from "next/link";

// STYLED COMPONENTS
const ContentColumn = styled.div`
  color: #000;
  padding: 10px 10px 10px 80px;
  display: flex;
  flex-direction: column;
  font-family: 'Abhaya Libre', serif;
  align-items: flex-start;
`;

const Subheading = styled.div`
  display: flex;
  gap: 1rem;
  margin: 1rem 0;
`;

const SubheadingText = styled.span<{ active?: boolean }>`
  font-size: 16px;
  font-weight: 500;
  color: ${({ active }) => (active ? "#0030E3" : "#1A1A1A")};
  border-bottom: ${({ active }) => (active ? "2px solid #0030E3" : "none")};
  cursor: pointer;
`;

const Description = styled.p`
  color: var(--KF-BG-Black, #000);
  font-family: "Helvetica Neue";
  font-size: var(--Body-Large-Size, 16px);
  font-style: normal;
  font-weight: 400;
  line-height: var(--Body-Large-Line-Height, 24px); /* 150% */
`;

const StyledMarketplaceCard = styled.div(({ theme }) => ({
  height: "294px",
  width: "308px",
  flexShrink: 0,
  display: "flex",
  overflow: "hidden",
  position: "relative",
  flexDirection: "column",
  justifyContent: "space-between",
  transition: "all 250ms ease-in-out",
  borderRadius: "8px",
  border: "0.5px solid #E5E5E5",
  background: "#FFF",
  boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.30), 0px 1px 3px 1px rgba(0, 0, 0, 0.15)",
  "&:hover": {
    boxShadow: theme.shadows[2],
  },
}));

const ImageWrapper = styled(Box)({
  padding: "16px 0 16px 16px",
  display: "flex",
  justifyContent: "flex-start",
});

const ImageBox = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "50%",
  height: "60px",
  width: "60px",
  backgroundColor: "#E6F0FA",
});

const ContentWrapper = styled(Box)({
  padding: "0 16px 16px 16px",
  "& .title, & .description": {
    whiteSpace: "normal",
  },
});

const CardFooter = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1rem;
`;

const ExploreButton = styled(DefaultButton)`
  font-size: 10px;
  font-weight: 400;
  color: #002180;
  background-color: transparent;
  border: none;
  height: 25px;
  padding: 8px 16px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color: #002180;
    color: #FFF;
  }
`;

const StyledHeader = styled.p`
  color: #000;
  font-family: "Helvetica Neue";
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: var(--Title-Large-Line-Height, 28px); /* 175% */
  letter-spacing: var(--Title-Large-Tracking, 0px);
  text-transform: uppercase;
`;

const StyledBody = styled.p`
  color: #000;
  font-family: "FS Kim Trial";
  font-size: 48px;
  font-style: normal;
  font-weight: 400;
  line-height: var(--Display-Medium-Line-Height, 52px); /* 108.333% */
  letter-spacing: var(--Display-Medium-Tracking, 0px);
`;

const StyledButton = styled(DefaultButton)`
  display: flex;
  text-align: left;
  padding: 7px 1px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  align-self: stretch;
  border-radius: 100px;
  width: 78px;
  height: 25px;
  background-color: transparent;
  border: 1px solid #ccc;
  transition: background-color 0.3s, color 0.3s;

  span {
    color: var(--Color-Secondary-secondary-500, #808390);
    text-align: center;
    font-family: var(--Body-Small-Font, Roboto);
    font-size: 10px;
    font-style: normal;
    font-weight: 400;
    line-height: var(--Body-Small-Line-Height, 16px);
    letter-spacing: var(--Body-Small-Tracking, 0.4px);
  }
`;

const CardContainer = styled(Box)`
  padding: 10px 80px 10px 80px;
  display: flex;
  gap: 20px;
  width: 100%;
  max-width: 768px;
`;

// TYPES
interface Marketplace {
  icon: string;
  title: {
    line1: string;
    line2: string;
  };
  description: string;
}

interface Service {
  icon: string;
  title: {
    line1: string;
    line2: string;
  };
  description: string;
}

export default function Section15() {
  const [selectedOption, setSelectedOption] = useState("marketplaces");
  const handleOptionClick = (opt: string) => () => setSelectedOption(opt);

  const marketplaces: Marketplace[] = [
    {
      icon: "/assets/images/Groceries Shop/copy1.png",
      title: {
        line1: "Non-Financial",
        line2: "Marketplace",
      },
      description: "Access business registration, legal advisory, tax compliance, and SME support services—all in one place.",
    },
    {
      icon: "/assets/images/Groceries Shop/copy2.png",
      title: {
        line1: "Financial",
        line2: "Marketplace",
      },
      description: "Access loans, grants, and financial support services to help your SME manage operations and drive growth.",
    },
  ];

  const services: Service[] = [
    {
      icon: "/assets/images/Groceries Shop/copy1.png",
      title: {
        line1: "Business",
        line2: "Consulting",
      },
      description: "Get expert advice on business strategy, operations, and growth to scale your SME effectively.",
    },
    {
      icon: "/assets/images/Groceries Shop/copy2.png",
      title: {
        line1: "Financial",
        line2: "Planning",
      },
      description: "Plan your finances with tailored solutions for budgeting, investments, and cash flow management.",
    },
  ];

  return (
    <CategorySectionCreator>
      <ContentColumn>
        <StyledHeader>IN THE SPOTLIGHT</StyledHeader>
        <StyledBody>
          Discover this quarter's top-performing<br />
          marketplaces and services.
        </StyledBody>
        <Subheading>
          <SubheadingText active={selectedOption === "marketplaces"} onClick={handleOptionClick("marketplaces")}>
            Featured Marketplaces
          </SubheadingText>
          <SubheadingText active={selectedOption === "services"} onClick={handleOptionClick("services")}>
            Featured Services
          </SubheadingText>
        </Subheading>
        <Description>
          A quick look at the most active {selectedOption === "marketplaces" ? "marketplaces" : "services"} this quarter—driven by SME demand and partner momentum.
        </Description>
      </ContentColumn>
      <Box my="-0.25rem">
        <CardContainer>
          {selectedOption === "marketplaces" &&
            marketplaces.map((marketplace, index) => (
              <StyledMarketplaceCard key={index}>
                <ImageWrapper>
                  <ImageBox>
                    <img
                      src={marketplace.icon}
                      alt={marketplace.title.line1 + " " + marketplace.title.line2}
                      style={{ width: "100%", height: "100%", objectFit: "contain" }}
                    />
                  </ImageBox>
                </ImageWrapper>
                <ContentWrapper>
                  <Box flex="1 1 0" minWidth="0px" mr={1}>
                    <Link href="#">
                      <H3
                        title={marketplace.title.line1 + " " + marketplace.title.line2}
                        fontSize="20px"
                        fontWeight="400"
                        className="title"
                        color="#0030E3"
                      >
                        {marketplace.title.line1}
                        <br />
                        {marketplace.title.line2}
                      </H3>
                    </Link>
                    <p style={{ fontSize: "14px", color: "#000", fontWeight: "400" }} className="description">
                      {marketplace.description}
                    </p>
                  </Box>
                  <CardFooter>
                    <StyledButton>
                      <span>Top Pick</span>
                    </StyledButton>
                    <Link href="/Services">
                      <ExploreButton>
                        Explore Marketplace
                        <span>→</span>
                      </ExploreButton>
                    </Link>
                  </CardFooter>
                </ContentWrapper>
              </StyledMarketplaceCard>
            ))}
          {selectedOption === "services" &&
            services.map((service, index) => (
              <StyledMarketplaceCard key={index}>
                <ImageWrapper>
                  <ImageBox>
                    <img
                      src={service.icon}
                      alt={service.title.line1 + " " + service.title.line2}
                      style={{ width: "100%", height: "100%", objectFit: "contain" }}
                    />
                  </ImageBox>
                </ImageWrapper>
                <ContentWrapper>
                  <Box flex="1 1 0" minWidth="0px" mr={1}>
                    <Link href="#">
                      <H3
                        title={service.title.line1 + " " + service.title.line2}
                        fontSize="20px"
                        fontWeight="400"
                        className="title"
                        color="#0030E3"
                      >
                        {service.title.line1}
                        <br />
                        {service.title.line2}
                      </H3>
                    </Link>
                    <p style={{ fontSize: "14px", color: "#000", fontWeight: "400" }} className="description">
                      {service.description}
                    </p>
                  </Box>
                  <CardFooter>
                    <StyledButton>
                      <span>Top Pick</span>
                    </StyledButton>
                    <Link href="/services">
                      <ExploreButton>
                        Explore Service
                        <span>→</span>
                      </ExploreButton>
                    </Link>
                  </CardFooter>
                </ContentWrapper>
              </StyledMarketplaceCard>
            ))}
        </CardContainer>
      </Box>
    </CategorySectionCreator>
  );
}