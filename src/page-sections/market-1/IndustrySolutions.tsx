"use client";

import Box from "@component/Box";
import { Button as DefaultButton } from "@component/buttons";
import { Carousel } from "@component/carousel";
import CategorySectionCreator from "@component/CategorySectionCreator";
import styled from "styled-components";
import client from "@lib/graphQLClient";
import Link from "next/link";
import ProductCard19 from "@component/product-cards/ProductCard19";
import { Carousel2 } from "@component/carousel2";
import useSWR from 'swr';

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
  font-size: 16px;
  flex: 1;

  @media (max-width: 899px) {
    font-size: 14px;
    margin-right: 0;
  }

  @media (max-width: 600px) {
    font-size: 16px;
    br {
      display: none;
    }
  }

  @media (max-width: 480px) {
    font-size: 16px;
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
  font-family: "FS Kim Trial";
  font-weight: 400;
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
    /* Removed: br { display: none; } to allow line break on mobile */
  }

  @media (max-width: 600px) {
    font-size: 36px;
    line-height: 40px;
  }

  @media (max-width: 480px) {
    font-size: 36px;
    line-height: 40px;
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

// Desktop/Tablet Carousel Wrapper
const CarouselWrapper = styled(Box)`
  width: 100%;
  overflow: hidden;

  @media (max-width: 480px) {
    display: none;
  }

  .slick-slide {
    padding: 0 10px;

    @media (max-width: 1024px) {
      padding: 0 8px;
    }

    @media (max-width: 768px) {
      padding: 0 6px;
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
  }

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
  }

  .slick-prev {
    left: -20px;

    @media (max-width: 1024px) {
      left: -15px;
    }

    @media (max-width: 768px) {
      left: -10px;
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
  }

  .slick-dots {
    bottom: -50px;

    @media (max-width: 1024px) {
      bottom: -40px;
    }

    @media (max-width: 768px) {
      bottom: -35px;
    }

    li {
      margin: 0 3px;
    }
  }
`;

// Mobile Carousel Container
const MobileContainer = styled.div`
  display: none;
  width: 100%;
  margin: 1rem 0;
  padding: 0 0.5rem;

  @media (max-width: 480px) {
    display: block;
  }

  .slick-slide {
    padding: 0 5px;
  }

  .slick-list {
    margin: 0 -5px;
  }

  .slick-dots {
    bottom: -25px;
    
    li {
      margin: 0 2px;
      
      button:before {
        font-size: 10px;
        opacity: 0.5;
        color: #0030e3;
      }
      
      &.slick-active button:before {
        opacity: 1;
        color: #0030e3;
      }
    }
  }
`;

const MobileProductWrapper = styled.div`
  padding: 0 5px;
  
  .product-card {
    width: 100%;
    margin: 0 auto;
    max-width: 100%;
  }
`;

const LoadingErrorWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 300px;
  background-color: #f8f8f8;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
  font-size: 1.4rem;
  color: #555;
  text-align: center;
  padding: 2rem;
  margin: 2rem 0;

  @media (max-width: 1024px) {
    height: 250px;
    font-size: 1.3rem;
    padding: 1.5rem;
    margin: 1.5rem 0;
  }

  @media (max-width: 768px) {
    height: 200px;
    font-size: 1.1rem;
    padding: 1.2rem;
    margin: 1.2rem 0;
  }

  @media (max-width: 480px) {
    height: 150px;
    font-size: 1rem;
    padding: 1rem;
    margin: 1rem 0;
  }
`;

// GraphQL Query
const GET_PRODUCTS = `
  query GetProducts($take: Int!) {
    products(options: { take: $take }) {
      items {
        id
        name
        slug
        description
        title
        subTitle
        thumbnail
        images
        reviews
        facetValues {
          id
          name
          code
          facet {
            id
            name
            code
          }
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
          Partner
        }
      }
      totalItems
    }
  }
`;

interface FacetValue {
  id: string;
  name: string;
  code: string;
  facet: {
    id: string;
    name: string;
    code: string;
  };
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

// Fetcher function for SWR
const fetcher = async (query: string, variables: any): Promise<GetProductsData> => {
  return client.request<GetProductsData>(query, variables);
};

export default function Section15() {
  const defaultImage = "/assets/images/mzn_logos/mzn_logo.png";
  const defaultImages = [defaultImage];
  const defaultReviews = 0;

  // Use SWR for data fetching with caching
  const { data, error, isLoading } = useSWR<GetProductsData>(
    [GET_PRODUCTS, { take: 31 }],
    ([query, variables]) => fetcher(query, variables),
    {
      revalidateOnFocus: false,
      dedupingInterval: 60000, // 1 minute
      onSuccess: (data) => {
        // Filter for Financial Services (facetValue.id: "66") and exclude non-financial (facetValue.id: "67")
        const financialServicesOnly = data.products.items.filter(
          (product) =>
            product.facetValues.some((fv) => fv.id === "66") &&
            !product.facetValues.some((fv) => fv.id === "67")
        );
        // setProducts(financialServicesOnly);
      },
    }
  );

  const loading = isLoading;
  const products = data?.products.items.filter(
    (product) =>
      product.facetValues.some((fv) => fv.id === "66") &&
      !product.facetValues.some((fv) => fv.id === "67")
  );

  // Responsive settings for carousel (desktop/tablet only)
  const responsive = [
    { breakpoint: 1279, settings: { slidesToShow: 4, slidesToScroll: 1 } },
    { breakpoint: 1024, settings: { slidesToShow: 3, slidesToScroll: 1 } },
    { breakpoint: 959, settings: { slidesToShow: 3, slidesToScroll: 1 } },
    { breakpoint: 768, settings: { slidesToShow: 2, slidesToScroll: 1 } },
    { breakpoint: 650, settings: { slidesToShow: 2, slidesToScroll: 1 } },
    { breakpoint: 600, settings: { slidesToShow: 2, slidesToScroll: 1 } },
    { breakpoint: 481, settings: { slidesToShow: 1, slidesToScroll: 1 } },
  ];

  // Handle loading state
  if (loading) {
    return (
      <CategorySectionCreator>
        <ContentColumn>
          <LoadingErrorWrapper>Loading services...</LoadingErrorWrapper>
        </ContentColumn>
      </CategorySectionCreator>
    );
  }

  // Handle error state
  if (error) {
    return (
      <CategorySectionCreator>
        <ContentColumn>
          <LoadingErrorWrapper>{error}</LoadingErrorWrapper>
        </ContentColumn>
      </CategorySectionCreator>
    );
  }

  // Handle empty state
  if (!products || products.length === 0) {
    return (
      <CategorySectionCreator>
        <ContentColumn>
          <LoadingErrorWrapper>No services found 😢</LoadingErrorWrapper>
        </ContentColumn>
      </CategorySectionCreator>
    );
  }

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

        {/* Desktop/Tablet Carousel */}
        {!loading && !error && products.length > 0 && (
          <CarouselWrapper mb="-0.25rem">
            <Box width="100%" px="0.2rem">
              <Carousel2 slidesToShow={4} responsive={responsive}>
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
              </Carousel2>
            </Box>
          </CarouselWrapper>
        )}

        {/* Mobile Carousel Layout - Show only first 4 products */}
        {!loading && !error && products.length > 0 && (
          <MobileContainer>
            <Carousel2 slidesToShow={1}>
              {products.slice(0, 4).map((item) => (
                <MobileProductWrapper key={item.id}>
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
                </MobileProductWrapper>
              ))}
            </Carousel2>
          </MobileContainer>
        )}
      </ContentColumn>
    </CategorySectionCreator>
  );
}
