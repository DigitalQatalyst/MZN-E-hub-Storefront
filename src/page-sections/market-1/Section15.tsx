"use client";

import { Button as DefaultButton } from "@component/buttons";
import Box from "@component/Box";
import CategorySectionCreator from "@component/CategorySectionCreator";
import { H3 } from "@component/Typography";
import styled from "styled-components";
import Link from "next/link";

// STYLED COMPONENTS
const ContentColumn = styled.div`
  color: #000;
  padding: 2rem;
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

const SubheadingText = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: #0030E3;
  border-bottom: 2px solid #0030E3;
`;

const Description = styled.p`
  font-size: 20px;
  font-weight: 900;
  color: #000;
  margin-bottom: 2rem;
`;

const CardContainer = styled.div`
  display: flex;
  gap: 20px; /* Reduced gap to bring cards closer */
  width: 100%;
  max-width: 768px; /* Constrain the total width of the cards */
  padding-left: 2rem; /* Match the padding of ContentColumn */
`;

const StyledMarketplaceCard = styled.div(({ theme }) => ({
    height: "294px", /* Updated to Figma spec */
    width: "308px", /* Updated to Figma spec */
    flexShrink: 0, /* Updated to Figma spec */
    display: "flex",
    overflow: "hidden",
    position: "relative",
    flexDirection: "column",
    justifyContent: "space-between",
    transition: "all 250ms ease-in-out",
    borderRadius: "8px", /* Updated to Figma spec */
    border: "0.5px solid #E5E5E5", /* Updated to Figma spec using #E5E5E5 as divider */
    background: "#FFF", /* Updated to Figma spec */
    boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.30), 0px 1px 3px 1px rgba(0, 0, 0, 0.15)", /* Matches Figma spec */
    "&:hover": {
        boxShadow: theme.shadows[2],
    },
}));

const ImageWrapper = styled(Box)({
    padding: "16px 0 16px 16px", /* Adjusted padding to match image layout */
    display: "flex",
    justifyContent: "flex-start", /* Align icon to the left */
});

const ImageBox = styled(Box)({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "50%",
    height: "60px",
    width: "60px",
    backgroundColor: "#E6F0FA", /* Light blue background to match image */
});

const ContentWrapper = styled(Box)({
    padding: "0 16px 16px 16px", /* Adjusted padding to match image layout */
    "& .title, & .description": {
        whiteSpace: "normal", /* Allow text to wrap */
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

// TYPES
interface Marketplace {
    icon: string;
    title: {
        line1: string;
        line2: string;
    };
    description: string;
}

export default function Section15() {
    const marketplaces: Marketplace[] = [
        {
            icon: "/assets/images/Groceries Shop/copy1.png", // Replaced with first image link
            title: {
                line1: "Non-Financial",
                line2: "Marketplace",
            },
            description: "Access business registration, legal advisory, tax compliance, and SME support services—all in one place.",
        },
        {
            icon: "/assets/images/Groceries Shop/copy2.png", // Replaced with second image link
            title: {
                line1: "Financial",
                line2: "Marketplace",
            },
            description: "Access loans, grants, and financial support services to help your SME manage operations and drive growth.",
        },
    ];

    return (
        <CategorySectionCreator>
            <ContentColumn>
                <p style={{ fontSize: "18px", fontWeight: "400" }}>IN THE SPOTLIGHT</p>
                <H3 fontSize="48px" fontWeight="550" mb="1rem">
                    Discover this quarter's top-performing<br />
                    marketplaces and services.
                </H3>
                <Subheading>
                    <SubheadingText>Featured Marketplaces</SubheadingText>
                    <span style={{ fontSize: "16px", fontWeight: "500", color: "#1A1A1A" }}>Featured Services</span>
                </Subheading>
                <Description>
                    A quick look at the most active marketplaces this quarter—driven by SME demand <br />
                    and partner momentum.
                </Description>
            </ContentColumn>
            <Box my="-0.25rem">
                <CardContainer>
                    {marketplaces.map((marketplace, index) => (
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
                                            {marketplace.title.line1}<br />{marketplace.title.line2}
                                        </H3>
                                    </Link>
                                    <p
                                        style={{ fontSize: "14px", color: "#000", fontWeight: "400" }}
                                        className="description"
                                    >
                                        {marketplace.description}
                                    </p>
                                </Box>
                                <CardFooter>
                                    <StyledButton>
                                        <span>Top Pick</span>
                                    </StyledButton>
                                    <ExploreButton>
                                        Explore Marketplace
                                        <span>→</span>
                                    </ExploreButton>
                                </CardFooter>
                            </ContentWrapper>
                        </StyledMarketplaceCard>
                    ))}
                </CardContainer>
            </Box>
        </CategorySectionCreator>
    );
}