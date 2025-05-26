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

export default function Section3() {
  const [categoryList, setCategoryList] = useState([]);
  const [activeTab, setActiveTab] = useState("entrepreneur");

  // Fetch categories on mount
  useEffect(() => {
    api.getTopCategories()
      .then((data) => setCategoryList(data))
      .catch((error) => console.error("Failed to fetch categories:", error));
  }, []);

  const responsive = [
    { breakpoint: 959, settings: { slidesToShow: 2 } },
    { breakpoint: 650, settings: { slidesToShow: 1 } },
  ];

  // Content for each tab
  const tabContent = {
    entrepreneur: {
      title: "Getting Started as an Entrepreneur",
      description: "Discover opportunities to grow your business by browsing marketplaces and finding tailored services.",
    },
    partner: {
      title: "Getting Started as a Partner",
      description: "Join our platform as a partner and offer your services to businesses seeking growth solutions.",
    },
  };

  // Same carousel content for both tabs, with tab-specific name prefix
  const carouselContent = categoryList.map((item) => ({
    ...item,
    name: `${activeTab === "entrepreneur" ? "Entrepreneur" : "Partner"}: ${item.name}`,
  }));

  return (
    <div>
      <FullWrapper
        bg="linear-gradient(180deg, #FFF 0%, #FDFDFF 9.41%, #F7F8FE 17.07%, #EDF0FD 23.24%, #E0E6FC 28.21%, #D1D9FA 32.23%, #BFCBF8 35.57%, #ABBBF6 38.51%, #96AAF4 41.31%, #8098F1 44.25%, #6A86EF 47.6%, #5373EC 51.62%, #3D61EA 56.58%, #2750E7 62.76%, #133FE5 70.41%, #0030E3 79.82%)"
      >
        <FlexBox
          flexDirection={"column"}
          padding="0px 80px 50px 80px"
          backgroundColor={colors.primary.gradient}
        >
          <FlexBox
            alignItems={"end"}
            justifyContent={"space-between"}
            flexDirection={"row"}
            marginBottom={"20px"}
          >
            <FlexBox
              alignItems={"flex-start"}
              justifyContent={"space-between"}
              flexDirection={"column"}
            >
              <H5 color={"#000000"} fontFamily="Helvetica Neue">
                HOW IT WORKS
              </H5>
              <H1
                marginBottom={"1.5rem"}
                marginTop={"1.5rem"}
                color={"#0030e3"}
                fontFamily="FS Kim Trial"
              >
                Getting started is easy
              </H1>
              <H5 color={"#000000"} fontFamily="Helvetica Neue">
                Browse available marketplaces, find services tailored to your
                business needs, and unlock growth opportunities—all
                <br />
                through one platform.
              </H5>
            </FlexBox>
            <FlexBox alignItems={"flex-end"} justifyContent={"flex-end"} mb={"1rem"}>
              <Link href="/signup">
                <Button
                  className="SignUp"
                  variant="contained"
                  color="primary"
                  fullwidth
                >
                  Sign Up
                </Button>
              </Link>
            </FlexBox>
          </FlexBox>
          <FlexBox justifyContent="flex-start" mb="2rem">
            <Box
              style={{
                display: "flex",
                width: "fit-content",
              }}
            >
              <Box
                padding="1rem"
                style={{
                  cursor: "pointer",
                  borderBottom:
                    activeTab === "entrepreneur" ? "2px solid #ffffff" : "none",
                  color: activeTab === "entrepreneur" ? "#0030e3" : "#000000",
                  fontWeight: activeTab === "entrepreneur" ? "bold" : "normal",
                }}
                onClick={() => setActiveTab("entrepreneur")}
              >
                Getting Started as an Entrepreneur
              </Box>
              <Box
                padding="1rem"
                style={{
                  cursor: "pointer",
                  borderBottom:
                    activeTab === "partner" ? "2px solid #ffffff" : "none",
                  color: activeTab === "partner" ? "#0030e3" : "#000000",
                  fontWeight: activeTab === "partner" ? "bold" : "normal",
                }}
                onClick={() => setActiveTab("partner")}
              >
                Getting Started as a Partner
              </Box>
            </Box>
          </FlexBox>
          <FlexBox justifyContent="flex-start" mb="2rem">
            <Box>
              <H5 color={"#000000"} fontFamily="Helvetica Neue">
                {tabContent[activeTab].title}
              </H5>
              <H5 color={"#000000"} fontFamily="Helvetica Neue" mt="1rem">
                {tabContent[activeTab].description}
              </H5>
            </Box>
          </FlexBox>
          <Carousel slidesToShow={2} responsive={responsive}>
            {carouselContent.map((item, ind) => (
              <Link href={`/product/search/${item.slug}`} key={ind}>
                <ProductCard6
                  title={item.name}
                  imgUrl={item.image}
                  subtitle={item.description}
                />
              </Link>
            ))}
          </Carousel>
        </FlexBox>
      </FullWrapper>
    </div>
  );
}