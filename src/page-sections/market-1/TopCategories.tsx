"use client";
import Link from "next/link";
import { Carousel2 } from "@component/carousel2";
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
import { fontFamily } from "styled-system";

// Styled components for responsive design
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
const ResponsiveContainer = styled(FlexBox)`
  padding: 0px 120px 50px 120px;

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
    // align-items: center;
    // text-align: center;
  }
`;

const ResponsiveH1 = styled(H1)`
  margin-bottom: 1.5rem;
  margin-top: 1.5rem;
  color: #000;
  font-family: "FS Kim Trial", sans-serif;
  font-weight: 400;
  line-height: 52px;
  font-size: 48px;
  
  @media (max-width: 768px) {
    font-size: 36px;
  }
`;

const ResponsiveH5 = styled(H5)`
  color: #000000;
  font-family: "Open Sans", sans-serif;
  font-weight: 400;
  font-size: 16px;

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
  font-family: "Open Sans", sans-serif;
  font-size: 16px;
  font-weight: 400;
  flex: 1;
  white-space: nowrap;
  margin-right: 3rem;

  @media (max-width: 1400px) {
    white-space: normal;
  }

  @media (max-width: 768px) {
    font-size: 16px;
    line-height: 1.4;
    margin-right: 0;
    br {
      display: none;
    }
  }

  @media (max-width: 480px) {
    font-size: 16px;
    line-height: 1.3;
    display: none;
  }
`;

const ButtonContainer = styled(FlexBox)`
  align-items: center;
  justify-content: flex-end;
  flex-shrink: 0;
  min-width: fit-content;

  @media (max-width: 768px) {
    justify-content: flex-start;
    margin-bottom: 0;
    width: 100%;
  }
  @media (max-width: 480px) {
    display: none;
  }
`;

const ButtonContainer2 = styled(FlexBox)`
  align-items: flex-end;
  justify-content: flex-end;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    align-items: center;
    justify-content: center;
    margin-bottom: 0;
    width: 100%;
  }
  @media (max-width: 480px) {
    margin-top: 4rem;
  }
`;

const ResponsiveButton = styled(Button)`
  white-space: nowrap;

  @media (max-width: 480px) {
    padding: 12px 24px;
    font-size: 1.1rem;
    font-weight: 500;
  }
`;

const TabContainer = styled(Box)`
  display: flex;
  width: fit-content;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: flex-start;
  }

  @media (max-width: 480px) {
    //flex-direction: column;
    justify-content: flex-start;
    width: 100%;
    gap: 8px;
  }
`;

const TabItem = styled(Box)<{ isActive: boolean }>`
  padding: 1rem;
  cursor: pointer;
  border-bottom: ${({ isActive }) => (isActive ? "2px solid #ffffff" : "none")};
  color: #fff;
  font-weight: 500;
  transition: all 0.3s ease;
  font-size: 14px;

  @media (max-width: 768px) {
    padding: 0.75rem 1rem;
    text-align: center;
  }

  @media (max-width: 480px) {
    padding: 0.75rem 1.5rem;
    font-size: 1.1rem;
    border-bottom: none;
    font-weight: bold;
    color: #2a2b2d;
    position: relative;

    &::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 80%;
      height: 2px;
      background-color: ${({ isActive }) =>
        isActive ? "#2a2b2d" : "transparent"};
      transition: all 0.5s ease;
    }
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

const ContentCTA = styled(FlexBox)`
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: 3rem;

  @media (max-width: 1400px) {
    align-items: flex-start;
  }

  @media (max-width: 768px) {
    align-items: flex-start;
    flex-direction: column;
    gap: 1.5rem;
  }
`;

export default function Section3() {
  const [categoryList, setCategoryList] = useState([]);
  const [activeTab, setActiveTab] = useState("entrepreneur");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 500;
      setIsMobile(mobile);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fetch categories based on active tab
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data =
          activeTab === "entrepreneur"
            ? await api.getTopCategories()
            : await api.getBotCategories();
        setCategoryList(data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };
    fetchCategories();
  }, [activeTab]);

  // Dynamic button configuration based on active tab
  const getButtonConfig = () => {
    if (activeTab === "entrepreneur") {
      return {
        text: "Sign Up as Entrepreneur",
        link: "https://dgqatalyst.b2clogin.com/dgqatalyst.onmicrosoft.com/oauth2/v2.0/authorize?p=B2C_1_KF_Signup&client_id=b94aa491-036c-4ddb-8bbf-12b510113078&nonce=defaultNonce&redirect_uri=https%3A%2F%2Fmzn-e-hub-storefront-git-landingpage-digitalqatalysts-projects.vercel.app%2F&scope=openid&response_type=code&prompt=login&code_challenge_method=S256&code_challenge=0vZQNWZJq-_sIiTADK-M4hyf44ACCodxa3_4L0MYxVo%22",
      };
    } else {
      return {
        text: "Sign Up as Partner",
        link: "https://dgqatalyst.b2clogin.com/dgqatalyst.onmicrosoft.com/oauth2/v2.0/authorize?p=B2C_1_KF_Partner_Signup&client_id=b94aa491-036c-4ddb-8bbf-12b510113078&nonce=defaultNonce&redirect_uri=https%3A%2F%2Fmzn-e-hub-storefront-git-landingpage-digitalqatalysts-projects.vercel.app%2F&scope=openid&response_type=code&prompt=login&code_challenge_method=S256&code_challenge=0vZQNWZJq-_sIiTADK-M4hyf44ACCodxa3_4L0MYxVo%22",
      };
    }
  };

  const buttonConfig = getButtonConfig();

  // Responsive carousel settings with proper spacing
  const responsive = [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        centerPadding: "20px",
      },
    },
    {
      breakpoint: 959,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        centerPadding: "15px",
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        centerMode: true,
        centerPadding: "40px",
      },
    },
    {
      breakpoint: 650,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        centerMode: true,
        centerPadding: "30px",
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        centerMode: true,
        centerPadding: "20px",
      },
    },
  ];

  // Carousel content with tab-specific name prefix
  const carouselContent = categoryList.map((item) => ({
    ...item,
    name: item.name,
  }));

  return (
    <div>
      <FullWrapper bg="linear-gradient(180deg, #FFF 0%, #FDFDFF 9.41%, #F7F8FE 17.07%, #EDF0FD 23.24%, #E0E6FC 28.21%, #D1D9FA 32.23%, #BFCBF8 35.57%, #ABBBF6 38.51%, #96AAF4 41.31%, #8098F1 44.25%, #6A86EF 47.6%, #5373EC 51.62%, #3D61EA 56.58%, #2750E7 62.76%, #133FE5 70.41%, #0030E3 79.82%)">
        <ResponsiveContainer
          flexDirection={"column"}
          backgroundColor={colors.primary.gradient}
        >
          <HeaderSection>
            <ContentSection>
              <ResponsiveH5>HOW IT WORKS</ResponsiveH5>
              <ResponsiveH1
              >
                Getting started is easy
              </ResponsiveH1>
              <ContentCTA>
                <DescriptionText>
                  Browse available marketplaces, find services tailored to your
                  business needs, and unlock growth opportunities—all                  through
                  one platform.
                </DescriptionText>
                <ButtonContainer>
                  <Link href={buttonConfig.link}>
                    <ResponsiveButton
                      className="SignUp"
                      variant="contained"
                      color="#FFF"
                      style={{
                        background:
                          "var(--Footer-Gradient, linear-gradient(94deg, #374DEF 0%, #1C3FE9 44.23%, #1C3FE9 88.46%, #374DEF 100%))",
                      }}
                      fullwidth
                      borderRadius={8}
                    >
                      {buttonConfig.text}
                    </ResponsiveButton>
                  </Link>
                </ButtonContainer>
              </ContentCTA>
            </ContentSection>
          </HeaderSection>

          {isMobile ? (
            <TabSection>
              <TabContainer>
                <TabItem
                  isActive={activeTab === "entrepreneur"}
                  onClick={() => setActiveTab("entrepreneur")}
                >
                  Entrepreneur
                </TabItem>
                <TabItem
                  isActive={activeTab === "partner"}
                  onClick={() => setActiveTab("partner")}
                >
                  Partner
                </TabItem>
              </TabContainer>
            </TabSection>
          ) : (
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
          )}

          {isMobile ? (
            <>
              <FlexBox
                flexDirection="column"
                width="100%"
                overflow="hidden"
                style={{ gap: "2rem" }}
              >
                {carouselContent.map((item, ind) => (
                  <Box key={ind}>
                    <Link href="#" legacyBehavior>
                      <a
                        tabIndex={-1}
                        aria-disabled="true"
                        onClick={(e) => e.preventDefault()}
                        style={{ pointerEvents: "none", cursor: "default" }}
                      >
                        <ProductCard6
                          title={item.name}
                          imgUrl={item.image}
                          subtitle={item.description}
                        />
                      </a>
                    </Link>
                  </Box>
                ))}
              </FlexBox>
              <ButtonContainer2>
                <Link href={buttonConfig.link}>
                  <ResponsiveButton
                    className="SignUp"
                    variant="contained"
                    color="#0030E3"
                    style={{
                      background: "#fff",
                    }}
                    fullwidth
                  >
                    {buttonConfig.text}
                  </ResponsiveButton>
                </Link>
              </ButtonContainer2>
            </>
          ) : (
            <Box width="100%" overflow="hidden">
              <Carousel2
                slidesToShow={2}
                responsive={responsive}
                autoplay={false}
                spaceBetween={40}
                arrows={true}
              >
                {carouselContent.map((item, ind) => (
                  <Box key={ind}>
                    <Link href="#" legacyBehavior>
                      <a
                        tabIndex={-1}
                        aria-disabled="true"
                        onClick={(e) => e.preventDefault()}
                        style={{ pointerEvents: "none", cursor: "default" }}
                      >
                        <ProductCard6
                          title={item.name}
                          imgUrl={item.image}
                          subtitle={item.description}
                        />
                      </a>
                    </Link>
                  </Box>
                ))}
              </Carousel2>
            </Box>
          )}
        </ResponsiveContainer>
      </FullWrapper>
    </div>
  );
}
