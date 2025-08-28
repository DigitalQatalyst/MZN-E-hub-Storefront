"use client";
import Box from "@component/Box";
import { Carousel } from "@component/carousel";
import { ProductCard16 } from "@component/product-cards";
import CategorySectionCreator from "@component/CategorySectionCreator";
import { H3, H4, H5 } from "@component/Typography";
import Product from "@models/product.model";
import styled from "styled-components";

// Responsive ContentColumn with mobile-first approach
const ContentColumn = styled.div`
  color: #000;
  padding: 1rem;
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  font-family: 'Open Sans', sans-serif;
  font-style: normal;
  align-items: flex-start;

  /* Tablet styles */
  @media (min-width: 768px) {
    padding: 2rem 3rem;
    margin-top: 2.5rem;
  }

  /* Desktop styles */
  @media (min-width: 1024px) {
    padding: 2rem 5rem;
    margin-top: 3rem;
  }
`;

// Responsive header with fluid typography
const StyledHeader = styled.h1`
  color: #000;
  
  font-family: 'Open Sans', sans-serif;
  font-style: normal;
  font-weight: 550;
  line-height: 1.2;
  letter-spacing: 0px;
  margin-top: 1rem;

  /* Mobile first - smaller text */
  font-size: clamp(24px, 5vw, 32px);

  /* Tablet */
  @media (min-width: 768px) {
    font-size: clamp(32px, 4vw, 40px);
    line-height: 1.15;
  }

  /* Desktop */
  @media (min-width: 1024px) {
    font-size: clamp(40px, 3vw, 48px);
    line-height: 52px;
  }
`;

// Responsive subtitle
const SubTitle = styled.p`
  color: #000;
  font-size: 16px;
  font-family: 'Open Sans', sans-serif;
  font-style: normal;
  font-weight: 500;
  line-height: 1.5;
  letter-spacing: 0px;
  text-transform: uppercase;
  margin-bottom: 0.5rem;

  /* Tablet */
  @media (min-width: 768px) {
    font-size: 15px;
  }

  /* Desktop */
  @media (min-width: 1024px) {
    font-size: 16px;
    line-height: 28px;
  }
`;

// Responsive CardsContainer
const CardsContainer = styled(Box)`
  padding: 1rem;

  /* Tablet */
  @media (min-width: 768px) {
    padding: 1.5rem 3rem;
  }

  /* Desktop */
  @media (min-width: 1024px) {
    padding: 2rem 5rem;
  }
`;

// Responsive ProductGrid
const ProductGrid = styled.div`
  display: grid;
  gap: 1rem;
  width: 100%;

  /* Mobile: 1 column */
  grid-template-columns: 1fr;

  /* Small tablet: 2 columns */
  @media (min-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }

  /* Large tablet: 3 columns */
  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
  }

  /* Desktop: 4 columns */
  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
    gap: 2rem;
  }
`;

// Product card wrapper for consistent spacing
const ProductCardWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

// =====================================================
type Props = { products: Product[] };
// =====================================================

export default function Section9({ products }: Props) {
  // Show different number of products based on screen size
  const getProductsToShow = () => {
    if (typeof window !== 'undefined') {
      const width = window.innerWidth;
      if (width < 480) return 2; // Mobile: show 2 products
      if (width < 768) return 4; // Small tablet: show 4 products
      if (width < 1024) return 6; // Large tablet: show 6 products
      return 4; // Desktop: show 4 products as originally intended
    }
    return 4; // Default fallback
  };

  return (
    <CategorySectionCreator>
      <ContentColumn>
        <SubTitle>
          WELCOME TO THE ENTERPRISE JOURNEY PLATFORM
        </SubTitle>
        <StyledHeader>
          We help businesses find the right partners to
          <br />
          get started, grow, and succeed
        </StyledHeader>
      </ContentColumn>
      
      <CardsContainer>
        <ProductGrid>
          {products.slice(0, 4).map((item, ind) => (
            <ProductCardWrapper key={ind}>
              <ProductCard16
                id={item.id}
                slug={item.slug}
                subTitle={item.subTitle}
                title={item.title}
                price={item.price}
                off={item.discount}
                rating={item.rating}
                images={item.images}
                imgUrl={item.thumbnail}
              />
            </ProductCardWrapper>
          ))}
        </ProductGrid>
      </CardsContainer>
    </CategorySectionCreator>
  );
}