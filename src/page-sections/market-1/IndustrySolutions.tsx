"use client";

import Box from "@component/Box";
import { Button as DefaultButton } from "@component/buttons";
import { Carousel } from "@component/carousel";
import CategorySectionCreator from "@component/CategorySectionCreator";
import styled from "styled-components";
import client from "@lib/graphQLClient";
import Link from "next/link";
import { useEffect, useState } from "react";
import ProductCard19 from "@component/product-cards/ProductCard19";

// STYLED COMPONENTS
const ContentColumn = styled.div`
  color: #000;
  padding: 10px 80px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;

  @media (max-width: 1199px) {
    padding: 30px 32px 10px 32px;
  }
  @media (max-width: 899px) {
    padding: 20px 16px 10px 16px;
  }
  @media (max-width: 600px) {
    padding: 15px 12px 10px 12px;
  }
`;

const Subheading = styled.div`
  display: flex;
  width: 100%;
`;

const SubheadingText = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: #1a1a1a;
  cursor: default;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const MarketplaceSubheadingText = styled(SubheadingText)`
  border-bottom: 2px solid #0030e3;
  color: var(--KF-BG-Blue, #0030e3);
  text-align: center;
  font-size: 16px;
  font-weight: 500;
  line-height: 22px;
  padding-top: 2rem;

  @media (max-width: 768px) {
    font-size: 14px;
    line-height: 20px;
    padding-top: 1.5rem;
  }

  @media (max-width: 480px) {
    font-size: 13px;
    line-height: 18px;
    padding-top: 1rem;
  }
`;

const Description = styled.p`
  color: var(--KF-BG-Black, #000);
  font-size: var(--Body-Large-Size, 16px);
  font-weight: 400;
  margin-right: 1rem;
  flex: 1;

  @media (max-width: 899px) {
    font-size: 14px;
    margin-right: 0;
  }

  @media (max-width: 600px) {
    font-size: 13px;
    br {
      display: none;
    }
  }
`;

const StyledHeader = styled.p`
  color: #000;
  font-size: 16px;
  font-weight: 400;
  line-height: var(--Title-Large-Line-Height, 28px);
  letter-spacing: var(--Title-Large-Tracking, 0px);
  text-transform: uppercase;
  padding-bottom: 8px;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 14px;
    line-height: 24px;
    padding-bottom: 6px;
  }

  @media (max-width: 480px) {
    font-size: 12px;
    line-height: 20px;
    padding-bottom: 4px;
  }
`;

const DescriptionButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  @media (max-width: 899px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
    margin-bottom: 0.75rem;
  }

  @media (max-width: 600px) {
    margin-bottom: 0.5rem;
  }
`;

const StyledBody = styled.p`
  color: #000;
  font-size: 48px;
  font-weight: 500;
  line-height: var(--Display-Medium-Line-Height, 52px);
  letter-spacing: var(--Display-Medium-Tracking, 0px);
  margin: 0;

  @media (max-width: 1024px) {
    font-size: 42px;
    line-height: 46px;
  }

  @media (max-width: 768px) {
    font-size: 36px;
    line-height: 40px;
    br {
      display: none;
    }
  }

  @media (max-width: 600px) {
    font-size: 28px;
    line-height: 32px;
  }

  @media (max-width: 480px) {
    font-size: 24px;
    line-height: 28px;
  }
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

  .slick-slide {
    padding: 0 10px;

    @media (max-width: 1024px) {
      padding: 0 8px;
    }

    @media (max-width: 768px) {
      padding: 0 6px;
    }

    @media (max-width: 480px) {
      padding: 0 4px;
    }
  }

  .slick-list {
    margin: 0 -10px;

    @media (max-width: 1024px) {
      margin: 0 -8px;
    }

    @media (max-width: 768px) {
      margin: 0 -6px;
    }

    @media (max-width: 480px) {
      margin: 0 -4px;
    }
  }

  // Enhanced arrow positioning
  .slick-prev,
  .slick-next {
    z-index: 2;
    width: 40px;
    height: 40px;

    @media (max-width: 1024px) {
      width: 35px;
      height: 35px;
    }

    @media (max-width: 768px) {
      width: 30px;
      height: 30px;
    }

    @media (max-width: 480px) {
      width: 25px;
      height: 25px;
    }
  }

  .slick-prev {
    left: -20px;

    @media (max-width: 1024px) {
      left: -15px;
    }

    @media (max-width: 768px) {
      left: -10px;
    }

    @media (max-width: 480px) {
      left: -5px;
    }
  }

  .slick-next {
    right: -20px;

    @media (max-width: 1024px) {
      right: -15px;
    }

    @media (max-width: 768px) {
      right: -10px;
    }

    @media (max-width: 480px) {
      right: -5px;
    }
  }

  // Dots positioning
  .slick-dots {
    bottom: -50px;

    @media (max-width: 1024px) {
      bottom: -40px;
    }

    @media (max-width: 768px) {
      bottom: -35px;
    }

    @media (max-width: 480px) {
      bottom: -30px;
    }

    li {
      margin: 0 3px;

      @media (max-width: 480px) {
        margin: 0 2px;
      }
    }

    li button {
      @media (max-width: 480px) {
        width: 8px;
        height: 8px;
      }
    }
  }
`;

// Enhanced ProductCard wrapper for better responsiveness
const ProductCardWrapper = styled(Box)`
  padding: 3rem 0;
  height: 100%;

  @media (max-width: 1024px) {
    padding: 2.5rem 0;
  }

  @media (max-width: 768px) {
    padding: 2rem 0;
  }

  @media (max-width: 600px) {
    padding: 1.5rem 0;
  }

  @media (max-width: 480px) {
    padding: 1rem 0;
  }

  // Ensure the product card takes full height
  .product-card {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
`;

const LoadingErrorWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  background-color: #f8f8f8;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
  font-size: 1.2rem;
  color: #555;
  text-align: center;
  padding: 1rem;

  @media (max-width: 768px) {
    height: 150px;
    font-size: 1rem;
    padding: 0.8rem;
  }

  @media (max-width: 480px) {
    height: 120px;
    font-size: 0.9rem;
    padding: 0.6rem;
  }
`;

// GraphQL Query
const GET_PRODUCTS = `
  query {
    products(options: { take: 100 }) {
      totalItems
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
          Industry
          BusinessStage
          ProcessingTime
          RegistrationValidity
          Cost
          Steps
          TermsOfService
          RequiredDocuments
          RelatedServices {
            id
            name
            slug
          }
        }
      }
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

interface RelatedService {
  id: string;
  name: string;
  slug: string;
}

interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  title: string;
  subTitle: string;
  thumbnail: string;
  images: string[];
  reviews: number;
  facetValues: FacetValue[];
  customFields: {
    Industry?: string;
    BusinessStage?: string;
    ProcessingTime?: string;
    RegistrationValidity?: string;
    Cost?: string;
    Steps?: string;
    TermsOfService?: string;
    RequiredDocuments?: string;
    RelatedServices?: RelatedService[];
    Partner?: string;
  };
}

interface GetProductsData {
  products: {
    items: Product[];
    totalItems: number;
  };
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
        const data = await client.request<GetProductsData>(GET_PRODUCTS);
        // Filter for Financial Services (facetValue.id: "66") and exclude non-financial (facetValue.id: "67")
        const financialServicesOnly = data.products.items.filter(
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

  // Comprehensive responsive settings
  const responsive = [
    { breakpoint: 1279, settings: { slidesToShow: 4, slidesToScroll: 1 } }, // Large desktop
    { breakpoint: 1024, settings: { slidesToShow: 3, slidesToScroll: 1 } }, // Desktop/Tablet landscape
    { breakpoint: 959, settings: { slidesToShow: 3, slidesToScroll: 1 } }, // Tablet landscape
    { breakpoint: 768, settings: { slidesToShow: 2, slidesToScroll: 1 } }, // Tablet portrait
    { breakpoint: 650, settings: { slidesToShow: 2, slidesToScroll: 1 } }, // Small tablets
    { breakpoint: 600, settings: { slidesToShow: 2, slidesToScroll: 1 } }, // Large phones landscape
    { breakpoint: 500, settings: { slidesToShow: 1, slidesToScroll: 1 } }, // Mobile portrait
    { breakpoint: 400, settings: { slidesToShow: 1, slidesToScroll: 1 } }, // Small mobile
  ];

  return (
    <CategorySectionCreator>
      <ContentColumn>
        <StyledHeader>IN THE SPOTLIGHT</StyledHeader>
        <StyledBody>
          Discover this quarter's top-performing
          <br />
          services.
        </StyledBody>
        <Subheading>
          <MarketplaceSubheadingText>
            Featured Services
          </MarketplaceSubheadingText>
        </Subheading>
        <DescriptionButtonWrapper>
          <Description>
            A quick look at the most active services this quarter—driven by SME
            demand
            <br /> and partner momentum.
          </Description>
          <Link href={`/financial-marketplace`}>
            <ExploreAllButton>
              Explore more <span>→</span>
            </ExploreAllButton>
          </Link>
        </DescriptionButtonWrapper>
        <CarouselWrapper mb="-0.25rem">
          {loading ? (
            <Box py="3rem">
              <LoadingErrorWrapper>Loading services...</LoadingErrorWrapper>
            </Box>
          ) : error ? (
            <Box py="3rem">
              <LoadingErrorWrapper>{error}</LoadingErrorWrapper>
            </Box>
          ) : products.length === 0 ? (
            <Box py="3rem">
              <LoadingErrorWrapper>No services found 😢</LoadingErrorWrapper>
            </Box>
          ) : (
            <Carousel slidesToShow={4} responsive={responsive}>
              {products.map((item) => (
                <Box py="3rem" key={item.id}>
                  <ProductCard19
                    id={item.id}
                    slug={item.slug}
                    name={item.name}
                    subTitle={item.customFields.Industry}
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
