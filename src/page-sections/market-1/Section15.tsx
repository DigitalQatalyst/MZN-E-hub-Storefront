"use client";

import Box from "@component/Box";
import { Button as DefaultButton } from "@component/buttons";
import { Carousel } from "@component/carousel";
import { ProductCard19 } from "@component/product-cards";
import CategorySectionCreator from "@component/CategorySectionCreator";
import styled from "styled-components";
// API FUNCTIONS
import api from "@utils/__api__/market-1";

// STYLED COMPONENTS
const ContentColumn = styled.div`
  color: #000;
  padding: 10px 80px 10px 80px;
  display: flex;
  flex-direction: column;
  font-family: "Abhaya Libre", serif;
  align-items: flex-start;
  width: 100%;
`;

const Subheading = styled.div`
  display: flex;
`;

const SubheadingText = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: #1a1a1a;
  cursor: default;
`;

const MarketplaceSubheadingText = styled(SubheadingText)`
  border-bottom: 2px solid #0030e3;
  color: var(--KF-BG-Blue, #0030e3);
  text-align: center;
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 22px; /* 137.5% */
  padding-top: 2rem;
`;

const Description = styled.p`
  color: var(--KF-BG-Black, #000);
  font-family: "Helvetica Neue";
  font-size: var(--Body-Large-Size, 16px);
  font-style: normal;
  font-weight: 400;
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
  margin: 0;
`;

const StyledBody = styled.p`
  color: #000;
  font-family: "FS Kim Trial";
  font-size: 48px;
  font-style: normal;
  font-weight: 400;
  line-height: var(--Display-Medium-Line-Height, 52px); /* 108.333% */
  letter-spacing: var(--Display-Medium-Tracking, 0px);
  margin: 0;
`;

const ExploreAllButton = styled(DefaultButton)`
  background-color: transparent;
  color: #0030e3;
  border: none;
  font-size: 16px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0;

  &:hover {
    color: #a9c9ff;
  }
`;

const CarouselWrapper = styled(Box)`
  width: 100%;
  overflow: hidden;
`;

export default async function Section15() {
  const products = await api.getFlashDeals();

  const responsive = [
    { breakpoint: 1279, settings: { slidesToShow: 4 } },
    { breakpoint: 959, settings: { slidesToShow: 3 } },
    { breakpoint: 650, settings: { slidesToShow: 2 } },
    { breakpoint: 500, settings: { slidesToShow: 1 } },
  ];

  return (
    <CategorySectionCreator>
      <ContentColumn>
        <StyledHeader>IN THE SPOTLIGHT</StyledHeader>
        <StyledBody>
          Discover this quarter's top-performing
          <br />
          marketplaces and services.
        </StyledBody>
        <Subheading>
          <MarketplaceSubheadingText>
            Featured Services
          </MarketplaceSubheadingText>
        </Subheading>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Description>
            A quick look at the most active this quarter—driven by SME demand
            <br /> and partner momentum.
          </Description>
          <ExploreAllButton>
            Explore more <span>→</span>
          </ExploreAllButton>
        </div>
        <CarouselWrapper mb="-0.25rem">
          <Carousel slidesToShow={4} responsive={responsive}>
            {products.map((item) => (
              <Box py="3rem" key={item.id}>
                <ProductCard19
                  id={item.id}
                  slug={item.slug}
                  name={item.title}
                  subTitle={item.subTitle}
                  description={item.description}
                  img={item.thumbnail}
                  images={item.images as string[]}
                  reviews={item.reviews || 12}
                  className="product-card"
                />
              </Box>
            ))}
          </Carousel>
        </CarouselWrapper>
      </ContentColumn>
    </CategorySectionCreator>
  );
}
