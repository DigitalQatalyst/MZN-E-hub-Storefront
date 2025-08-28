"use client";

import Box from "@component/Box";
import { Button as DefaultButton } from "@component/buttons";
import { Carousel } from "@component/carousel";
import { ProductCard19 } from "@component/product-cards";
import CategorySectionCreator from "@component/CategorySectionCreator";
import styled from "styled-components";
import client from "@lib/graphQLClient";
import Link from "next/link";
import { useEffect, useState } from "react";

// STYLED COMPONENTS
const ContentColumn = styled.div`
  color: #000;
  padding: 10px 80px 10px 80px;
  display: flex;
  flex-direction: column;
  font-family: "Abhaya Libre", serif;
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
`;

const CarouselWrapper = styled(Box)`
  width: 100%;
  overflow: hidden;
  .slick-slide {
    padding: 0 10px;
  }
  .slick-list {
    margin: 0 -10px;
  }
`;

// GraphQL Query
const GET_PRODUCTS = `
  query GetProducts($skip: Int!, $take: Int!) {
    products(options: { skip: $skip, take: $take }) {
      items {
        id
        name
        slug
        description
        facetValues {
          facet {
            id
            name
            code
          }
          id
          name
          code
        }
        customFields {
          Partner
        }
      }
      totalItems
    }
  }
`;

interface FacetValue {
  facet: {
    id: string;
    name: string;
    code: string;
  };
  id: string;
  name: string;
  code: string;
}

interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  facetValues: FacetValue[];
  customFields: {
    Partner: string;
  };
}

interface GetProductsData {
  products: {
    items: Product[];
    totalItems: number;
  };
}

interface GetProductsVariables {
  skip: number;
  take: number;
}

export default function Section15() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const defaultImage = "/assets/images/mzn_logos/mzn_logo.png";
  const defaultImages = [defaultImage];
  const defaultReviews = 0;

  // Fetch products on component mount
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const productsPerPage = 50; // Fetch a reasonable number of products
        let allProducts: Product[] = [];
        let currentSkip = 0;
        let total = 0;

        // Fetch all products in batches
        do {
          const data = await client.request<GetProductsData, GetProductsVariables>(GET_PRODUCTS, {
            skip: currentSkip,
            take: productsPerPage,
          });
          allProducts.push(...data.products.items);
          total = data.products.totalItems;
          currentSkip += productsPerPage;
        } while (currentSkip < total);

        // Filter for Financial Services (facetValue.id: "66") and exclude non-financial (facetValue.id: "67")
        const financialServicesOnly = allProducts.filter(
          (product) =>
            product.facetValues.some((fv) => fv.id === "66") &&
            !product.facetValues.some((fv) => fv.id === "67")
        );

        setProducts(financialServicesOnly);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load services. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const responsive = [
    { breakpoint: 1279, settings: { slidesToShow: 4, slidesToScroll: 1 } },
    { breakpoint: 959, settings: { slidesToShow: 3, slidesToScroll: 1 } },
    { breakpoint: 650, settings: { slidesToShow: 2, slidesToScroll: 1 } },
    { breakpoint: 500, settings: { slidesToShow: 1, slidesToScroll: 1 } },
  ];

  return (
    <CategorySectionCreator>
      <ContentColumn>
        <StyledHeader>IN THE SPOTLIGHT</StyledHeader>
        <StyledBody>
          Discover this quarter's top-performing<br />
          services.
        </StyledBody>
        <Subheading>
          <MarketplaceSubheadingText>
            Featured Services
          </MarketplaceSubheadingText>
        </Subheading>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
          <Description>
            A quick look at the most active services this quarter—driven by SME demand<br /> and partner momentum.
          </Description>
          <Link href={`/services`}>
            <ExploreAllButton>
              Explore more <span>→</span>
            </ExploreAllButton>
          </Link>
        </div>
        <CarouselWrapper mb="-0.25rem">
          {loading ? (
            <Box py="3rem">
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "200px",
                  backgroundColor: "#f8f8f8",
                  borderRadius: "8px",
                  border: "1px solid #e0e0e0",
                  fontSize: "1.2rem",
                  color: "#555",
                  textAlign: "center",
                  padding: "1rem",
                }}
              >
                Loading services...
              </div>
            </Box>
          ) : error ? (
            <Box py="3rem">
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "200px",
                  backgroundColor: "#f8f8f8",
                  borderRadius: "8px",
                  border: "1px solid #e0e0e0",
                  fontSize: "1.2rem",
                  color: "#555",
                  textAlign: "center",
                  padding: "1rem",
                }}
              >
                {error}
              </div>
            </Box>
          ) : products.length === 0 ? (
            <Box py="3rem">
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "200px",
                  backgroundColor: "#f8f8f8",
                  borderRadius: "8px",
                  border: "1px solid #e0e0e0",
                  fontSize: "1.2rem",
                  color: "#555",
                  textAlign: "center",
                  padding: "1rem",
                }}
              >
                No services found 😢
              </div>
            </Box>
          ) : (
            <Carousel
              slidesToShow={4}
              slidesToScroll={1}
              arrows
              dots
              infinite={products.length > 4}
              autoplay={false}
              responsive={responsive}
            >
              {products.map((item) => (
                <Box py="3rem" key={item.id}>
                  <ProductCard19
                    id={item.id}
                    slug={item.slug}
                    name={item.name}
                    subTitle={item.customFields.Partner}
                    description={item.description}
                    img={defaultImage}
                    images={defaultImages}
                    reviews={defaultReviews}
                    className="product-card"
                  />
                </Box>
              ))}
            </Carousel>
          )}
        </CarouselWrapper>
      </ContentColumn>
    </CategorySectionCreator>
  );
}
