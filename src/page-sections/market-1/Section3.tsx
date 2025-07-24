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

// RESPONSIVE STYLED COMPONENTS
const ResponsiveContainer = styled(FlexBox)`
  font-family: 'Open Sans', sans-serif;
  font-style: normal;
  /* Mobile first */
  padding: 1rem;
  
  /* Small tablet */
  @media (min-width: 480px) {
    padding: 1.5rem 2rem 2rem 2rem;
  }
  
  /* Tablet */
  @media (min-width: 768px) {
    padding: 2rem 3rem 3rem 3rem;
  }
  
  /* Large tablet */
  @media (min-width: 1024px) {
    padding: 2.5rem 4rem 3.5rem 4rem;
  }
  
  /* Desktop */
  @media (min-width: 1200px) {
    padding: 3rem 5rem 3.125rem 5rem;
  }
`;

const HeaderSection = styled(FlexBox)`
  margin-bottom: 1.5rem;
  gap: 1rem;
  
  /* Mobile: stack vertically */
  flex-direction: column;
  align-items: flex-start;
  
  /* Tablet and up: side by side */
  @media (min-width: 768px) {
    flex-direction: row;
    align-items: flex-end;
    justify-content: space-between;
    margin-bottom: 1.25rem;
  }
`;

const ContentColumn = styled(FlexBox)`
  flex-direction: column;
  align-items: flex-start;
  flex: 1;
  
  /* Mobile spacing */
  gap: 0.75rem;
  
  /* Tablet and up */
  @media (min-width: 768px) {
    gap: 1rem;
  }
`;

const ButtonColumn = styled(FlexBox)`
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  
  /* Tablet and up */
  @media (min-width: 768px) {
    align-items: flex-end;
    justify-content: flex-end;
    width: auto;
  }
`;

const ResponsiveH5 = styled(H5)`
  font-family: 'Open Sans', sans-serif;
  font-style: normal;
  /* Mobile */
  font-size: 12px;
  line-height: 1.4;
  margin-bottom: 0;
  
  /* Small tablet */
  @media (min-width: 480px) {
    font-size: 13px;
  }
  
  /* Tablet */
  @media (min-width: 768px) {
    font-size: 14px;
    line-height: 1.5;
  }
  
  /* Desktop */
  @media (min-width: 1024px) {
    font-size: 16px;
  }
`;

const ResponsiveH1 = styled(H1)`
  font-family: 'Open Sans', sans-serif;
  font-style: normal;
  margin-bottom: 1rem;
  line-height: 1.2;
  
  /* Mobile */
  font-size: clamp(20px, 6vw, 28px);
  
  /* Small tablet */
  @media (min-width: 480px) {
    font-size: clamp(24px, 5vw, 32px);
  }
  
  /* Tablet */
  @media (min-width: 768px) {
    font-size: clamp(28px, 4vw, 36px);
    margin-bottom: 1.25rem;
    margin-top: 5px;
  }
  
  /* Desktop */
  @media (min-width: 1024px) {
    font-size: clamp(32px, 3vw, 40px);
    margin-bottom: 1.5rem;
    margin-top: 5px;
  }
`;

const ResponsiveDescription = styled(H5)`
  font-family: 'Open Sans', sans-serif;
  font-style: normal;
  /* Mobile */
  font-size: 14px;
  line-height: 1.4;
  
  /* Small tablet */
  @media (min-width: 480px) {
    font-size: 15px;
    line-height: 1.5;
  }
  
  /* Tablet and up */
  @media (min-width: 768px) {
    font-size: 16px;
    line-height: 1.6;
  }
  
  /* Hide line breaks on mobile, show on tablet+ */
  br {
    display: none;
    
    @media (min-width: 768px) {
      display: inline;
    }
  }
`;

const TabSwitcher = styled(FlexBox)`
  justify-content: flex-start;
  margin-bottom: 1.5rem;
  gap: 0;
  flex-wrap: nowrap;
  overflow-x: auto;
  background: transparent;
  padding-bottom: 2px;
  
  /* Hide scrollbar but keep functionality */
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
  
  /* Tablet and up */
  @media (min-width: 768px) {
    margin-bottom: 2rem;
    overflow-x: visible;
    flex-wrap: wrap;
  }
`;

const TabButton = styled(Box)<{ active: boolean }>`
  cursor: pointer;
  border-bottom: 2px solid ${props => props.active ? '#FFF' : 'transparent'};
  color: #FFF;
  font-weight: ${props => props.active ? 'bold' : 'normal'};
  background: transparent;
  white-space: nowrap;
  transition: border 0.2s, font-weight 0.2s;
  flex-shrink: 0;
  opacity: 1;
  
  /* Mobile */
  padding: 0.75rem 1rem;
  font-size: 13px;
  
  /* Small tablet */
  @media (min-width: 480px) {
    padding: 0.875rem 1rem;
    font-size: 14px;
  }
  
  /* Tablet and up */
  @media (min-width: 768px) {
    padding: 1rem;
    font-size: 15px;
  }
  
  /* Desktop */
  @media (min-width: 1024px) {
    font-size: 16px;
  }
`;

const ResponsiveButton = styled(Button)`
  font-family: 'Open Sans', sans-serif;
  font-style: normal;
  /* Mobile */
  padding: 0.75rem 1.5rem;
  font-size: 14px;
  min-width: 120px;
  
  /* Small tablet */
  @media (min-width: 480px) {
    padding: 0.875rem 2rem;
    font-size: 15px;
    min-width: 140px;
  }
  
  /* Tablet and up */
  @media (min-width: 768px) {
    padding: 1rem 2rem;
    font-size: 16px;
    min-width: auto;
  }
`;

const CarouselContainer = styled.div`
  width: 100%;
  
  /* Ensure proper spacing on mobile */
  .carousel-container {
    margin: 0 -0.5rem;
    
    @media (min-width: 768px) {
      margin: 0;
    }
  }
  
  /* Adjust card spacing */
  .carousel-item {
    padding: 0 0.5rem;
    
    @media (min-width: 768px) {
      padding: 0 0.75rem;
    }
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

  // Responsive carousel settings
  const responsive = [
    { breakpoint: 1200, settings: { slidesToShow: 2} }, // Large desktop: 3 slides
    { breakpoint: 959, settings: { slidesToShow: 2 } },  // Tablet: 2 slides
    { breakpoint: 650, settings: { slidesToShow: 1.2 } }, // Small tablet: 1.2 slides (shows peek of next)
    { breakpoint: 480, settings: { slidesToShow: 1 } },   // Mobile: 1 slide
  ];

  // Get initial slides to show based on screen size
  const getInitialSlidesToShow = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth >= 1200) return 2;
      if (window.innerWidth >= 960) return 2;
      if (window.innerWidth >= 650) return 1.2;
      return 1;
    }
    return 2; // Default fallback
  };

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
          flexDirection="column"
          backgroundColor={colors.primary.gradient}
        >
          <HeaderSection>
            <ContentColumn>
              <ResponsiveH5 color="#000000" fontFamily="Helvetica Neue">
                HOW IT WORKS
              </ResponsiveH5>
              <ResponsiveH1
                color="#000"
                fontSize="48px"
                fontFamily="FS Kim Trial"
              >
                Getting started is easy
              </ResponsiveH1>
              <ResponsiveDescription color="#000000" fontFamily="Helvetica Neue">
                Browse available marketplaces, find services tailored to your
                business needs, and unlock growth opportunities—all
                <br />
                through one platform.
              </ResponsiveDescription>
            </ContentColumn>
            <ButtonColumn>
              <Link href="/development">
                <ResponsiveButton
                  className="SignUp"
                  variant="contained"
                  color="#FFF"
                  style={{
                    background: 'var(--Footer-Gradient, linear-gradient(94deg, #374DEF 0%, #1C3FE9 44.23%, #1C3FE9 88.46%, #374DEF 100%))'
                  }}
                  fullwidth
                >
                  Sign Up as Entrepreneur

                </ResponsiveButton>
              </Link>
            </ButtonColumn>
          </HeaderSection>

          <TabSwitcher>
            <TabButton
              active={activeTab === "entrepreneur"}
              onClick={() => setActiveTab("entrepreneur")}
            >
              Getting Started as an Entrepreneur
            </TabButton>
            <TabButton
              active={activeTab === "partner"}
              onClick={() => setActiveTab("partner")}
            >
              Getting Started as a Partner
            </TabButton>
          </TabSwitcher>

          <CarouselContainer>
            <Carousel 
              slidesToShow={getInitialSlidesToShow()} 
              responsive={responsive}
              arrows={true}
              dots={false}
              infinite={carouselContent.length > 2}
            >
              {carouselContent.map((item, ind) => (
                <div key={ind} className="carousel-item">
                  <Link href={`/product/search/${item.slug}`}>
                    <ProductCard6
                      title={item.name}
                      imgUrl={item.image}
                      subtitle={item.description}
                    />
                  </Link>
                </div>
              ))}
            </Carousel>
          </CarouselContainer>
        </ResponsiveContainer>
      </FullWrapper>
    </div>
  );
}