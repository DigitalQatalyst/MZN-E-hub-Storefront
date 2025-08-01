"use client";
import Link from "next/link";
import { Carousel } from "@component/carousel";
import ProductCard6 from "@component/product-cards/ProductCard6";
// API FUNCTIONS
import api from "@utils/__api__/market-1";
import FlexBox from "@component/FlexBox";
import { H1, H5 } from "@component/Typography";
import { Button } from "@component/buttons";
import Box from "@component/Box";
import { colors } from "theme/colors/colors";
import { FullWrapper } from "@component/footer/footer-2/styles";
import { useState, useEffect } from "react";
import styled from "styled-components";
 
// Styled components for responsive design
const ResponsiveContainer = styled(FlexBox)`
  padding: 0px 80px 50px 80px;
 
  @media (max-width: 1200px) {
    padding: 0px 60px 40px 60px;
  }
 
  @media (max-width: 768px) {
    padding: 0px 24px 32px 24px;
  }
 
  @media (max-width: 480px) {
    padding: 0px 16px 24px 16px;
  }
`;
 
const HeaderSection = styled(FlexBox)`
  align-items: end;
  justify-content: space-between;
  flex-direction: row;
  margin-bottom: 20px;
 
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 24px;
    margin-bottom: 32px;
  }
`;
 
const ContentSection = styled(FlexBox)`
  align-items: flex-start;
  justify-content: space-between;
  flex-direction: column;
 
  @media (max-width: 768px) {
    align-items: center;
    text-align: center;
  }
`;
 
const ResponsiveH1 = styled(H1)`
  margin-bottom: 1.5rem;
  margin-top: 1.5rem;
  color: #000;
  font-family: 'Open Sans', sans-serif;
 
  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 1rem;
    margin-top: 1rem;
    line-height: 1.2;
  }
 
  @media (max-width: 480px) {
    font-size: 1.75rem;
    margin-bottom: 0.75rem;
    margin-top: 0.75rem;
  }
`;
 
const ResponsiveH5 = styled(H5)`
  color: #000000;
  font-family: 'Open Sans', sans-serif;
 
  @media (max-width: 768px) {
    font-size: 0.95rem;
    line-height: 1.4;
  }
 
  @media (max-width: 480px) {
    font-size: 0.875rem;
    line-height: 1.3;
  }
`;
 
const DescriptionText = styled(H5)`
  color: #000000;
  font-family: 'Open Sans', sans-serif;
 
  @media (max-width: 768px) {
    font-size: 0.95rem;
    line-height: 1.4;
    br {
      display: none;
    }
  }
 
  @media (max-width: 480px) {
    font-size: 0.875rem;
    line-height: 1.3;
  }
`;
 
const ButtonContainer = styled(FlexBox)`
  align-items: flex-end;
  justify-content: flex-end;
  margin-bottom: 1rem;
 
  @media (max-width: 768px) {
    align-items: center;
    justify-content: center;
    margin-bottom: 0;
    width: 100%;
  }
`;
 
const ResponsiveButton = styled(Button)`
  @media (max-width: 480px) {
    padding: 12px 24px;
    font-size: 0.875rem;
  }
`;
 
const TabContainer = styled(Box)`
  display: flex;
  width: fit-content;
 
  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
  }
 
  @media (max-width: 480px) {
    flex-direction: column;
    width: 100%;
    gap: 8px;
  }
`;
 
const TabItem = styled(Box)<{ isActive: boolean }>`
  padding: 1rem;
  cursor: pointer;
  border-bottom: ${({ isActive }) => (isActive ? "2px solid #ffffff" : "none")};
  color: #fff;
  font-weight: ${({ isActive }) => (isActive ? "bold" : "normal")};
  transition: all 0.3s ease;
 
  @media (max-width: 768px) {
    padding: 0.75rem 1rem;
    text-align: center;
  }
 
  @media (max-width: 480px) {
    padding: 0.75rem;
    font-size: 0.875rem;
    border-bottom: none;
    border-left: ${({ isActive }) => (isActive ? "3px solid #ffffff" : "none")};
    background-color: ${({ isActive }) => (isActive ? "rgba(255, 255, 255, 0.1)" : "transparent")};
    border-radius: 4px;
  }
`;
 
const TabSection = styled(FlexBox)`
  justify-content: flex-start;
  margin-bottom: 2rem;
 
  @media (max-width: 768px) {
    justify-content: center;
    margin-bottom: 1.5rem;
  }
 
  @media (max-width: 480px) {
    margin-bottom: 1rem;
  }
`;
 
export default function Section3() {
  const [categoryList, setCategoryList] = useState([]);
  const [activeTab, setActiveTab] = useState("entrepreneur");
 
  // Fetch categories based on active tab
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = activeTab === "entrepreneur"
          ? await api.getTopCategories()
          : await api.getBotCategories();
        setCategoryList(data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };
    fetchCategories();
  }, [activeTab]);
 
  // Responsive carousel settings with proper spacing
  const responsive = [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        centerPadding: "20px"
      }
    },
    {
      breakpoint: 959,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        centerPadding: "15px"
      }
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        centerMode: true,
        centerPadding: "40px"
      }
    },
    {
      breakpoint: 650,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        centerMode: true,
        centerPadding: "30px"
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        centerMode: true,
        centerPadding: "20px"
      }
    },
  ];
 
  // Carousel content with tab-specific name prefix
  const carouselContent = categoryList.map((item) => ({
    ...item,
    name: `${activeTab === "entrepreneur" ? "Entrepreneur" : "Partner"}: ${item.name}`,
  }));
 
  return (
    <div>
      <FullWrapper
        bg="linear-gradient(180deg, #FFF 0%, #FDFDFF 9.41%, #F7F8FE 17.07%, #EDF0FD 23.24%, #E0E6FC 28.21%, #D1D9FA 32.23%, #BFCBF8 35.57%, #ABBBF6 38.51%, #96AAF4 41.31%, #8098F1 44.25%, #6A86EF 47.6%, #5373EC 51.62%, #3D61EA 56.58%, #2750E7 62.76%, #133FE5 70.41%, #0030E3 79.82%)"
      >
        <ResponsiveContainer
          flexDirection={"column"}
          backgroundColor={colors.primary.gradient}
        >
          <HeaderSection>
            <ContentSection>
              <ResponsiveH5>
                HOW IT WORKS
              </ResponsiveH5>
              <ResponsiveH1>
                Getting started is easy
              </ResponsiveH1>
              <DescriptionText>
                Browse available marketplaces, find services tailored to your
                business needs, and unlock growth opportunities—all
                <br />
                through one platform.
              </DescriptionText>
            </ContentSection>
            <ButtonContainer>
              <Link href="https://dgqatalyst.b2clogin.com/dgqatalyst.onmicrosoft.com/oauth2/v2.0/authorize?p=B2C_1_KF_Signup&client_id=b94aa491-036c-4ddb-8bbf-12b510113078&nonce=defaultNonce&redirect_uri=https%3A%2F%2Fmzn-e-hub-storefront-5akxqw2kr-digitalqatalysts-projects.vercel.app%2Fdashboard&scope=openid&response_type=code&prompt=login&code_challenge_method=S256&code_challenge=uPSCPoX1IbZeEy61vNSmgjyHSSPFWhaVq5Btdo0fMHY">
                <ResponsiveButton
                  className="SignUp"  
                  variant="contained"
                  color="#FFF"
                  style={{
                    background: 'var(--Footer-Gradient, linear-gradient(94deg, #374DEF 0%, #1C3FE9 44.23%, #1C3FE9 88.46%, #374DEF 100%))'
                  }}
                  fullwidth
                >
                  Sign Up
                </ResponsiveButton>
              </Link>
            </ButtonContainer>
          </HeaderSection>
         
          <TabSection>
            <TabContainer>
              <TabItem
                isActive={activeTab === "entrepreneur"}
                onClick={() => setActiveTab("entrepreneur")}
              >
                Getting Started as an Entrepreneur
              </TabItem>
              <TabItem
                isActive={activeTab === "partner"}
                onClick={() => setActiveTab("partner")}
              >
                Getting Started as a Partner
              </TabItem>
            </TabContainer>
          </TabSection>
         
          <Box width="100%" overflow="hidden">
            <Carousel
              slidesToShow={2.5}
              responsive={responsive}
              autoplay={false}
              dots={true}
              arrows={true}
            >
              {carouselContent.map((item, ind) => (
                <Box key={ind} px="10px">
                  <Link href={`/product/search/${item.slug}`}>
                    <ProductCard6
                      title={item.name}
                      imgUrl={item.image}
                      subtitle={item.description}
                    />
                  </Link>
                </Box>
              ))}
            </Carousel>
          </Box>
        </ResponsiveContainer>
      </FullWrapper>
    </div>
  );
}