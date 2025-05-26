"use client";

import Box from "@component/Box";
import { Button } from "@component/buttons";
import FlexBox from "@component/FlexBox";
import Grid from "@component/grid/Grid";
import { ProductCard19, ProductCard20 } from "@component/product-cards";
import { H3, H4, H6, Paragraph, SemiSpan } from "@component/Typography";
import Product from "@models/product.model";
import { useEffect, useState } from "react";
import styled from "styled-components";
import client from "@lib/graphQLClient";
import { relatedProducts } from "__server__/__db__/related-products/data";
import { Carousel } from "@component/carousel";
import { border } from "styled-system";

const TabButton = styled(Button)<{ active?: boolean }>`
  padding: 0.75rem 1.5rem;
  border: none;
  box-shadow: none;
  color: ${({ active }) => (active ? "#0030E3" : "#002180")};
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  background: none;
  position: relative;
  &:hover {
    background-color: #fff;
    color: #0030e3;
  }
  ${({ active }) =>
    active &&
    `
    &::after {
      content: "";
      display: block;
      position: absolute;
      left: 0;
      right: 0;
      bottom: -2px;
      height: 3px;
      background: #0030E3;
      border-radius: 2px 2px 0 0;
    }
  `}
`;

const TabContainer = styled(Box)`
  display: flex;
  background-color: #ffffff;
  padding: 0 0.5rem;
  border-radius: 8px 8px 0 0;
`;

const ContentBox = styled(Box)`
  padding: 1.5rem 2rem;
  background: #ffffff;
  border-radius: 8px;
  margin-top: 1rem;
  // max-height: 180px;
  // overflow-y: auto;
`;

const DocumentItem = styled(Paragraph)`
  font-size: 14px;
  color: #333333;
  margin-bottom: 0.75rem;
`;

type TabType = "documents" | "cost" | "steps" | "terms";

interface Props {
  product: Product;
}
interface CustomFields {
  partner: string;
  rating: number;
  code: string;
  status: string;
  tags: string[];
  highlightedBusinessStage: string;
  processingTime: string;
  registrationValidity: string;
  sectionsCost: string;
  sectionsSteps: string;
  sectionsTermsOfService: string;
  sectionsRequiredDocuments: string;
  relatedServices: {
    id: string;
    name: string;
    partner: string;
    slug: string;
    description: string;
    images: string[];
    subTitle: string;
  }[];
}

interface ProductResponse {
  product: {
    id: string;
    name: string;
    slug: string;
    description: string;
    customFields: CustomFields;
  };
}

export default function ProductDetails({ product }: Props) {
  const [activeTab, setActiveTab] = useState<TabType>("documents");
  console.log(product);
  const responsive = [
    { breakpoint: 959, settings: { slidesToShow: 2 } },
    { breakpoint: 650, settings: { slidesToShow: 1 } },
  ];

  const renderDocuments = () => (
    <ContentBox>
      <DocumentItem mb="1rem">
        The following documents must be submitted during the application
      </DocumentItem>
      {product.requiredDocuments && product.requiredDocuments.length > 0 ? (
        product.requiredDocuments.map((doc, index) => (
          <DocumentItem key={index}>{doc}</DocumentItem>
        ))
      ) : (
        <DocumentItem>No documents listed.</DocumentItem>
      )}
    </ContentBox>
  );

  const renderCost = () => (
    <ContentBox>
      <DocumentItem mb="1rem">Service Cost Details</DocumentItem>
      <DocumentItem>
        {product.cost || "No cost information available."}
      </DocumentItem>
    </ContentBox>
  );

  const renderSteps = () => (
    <ContentBox>
      <DocumentItem mb="1rem">Application Process</DocumentItem>
      {product.steps && product.steps.length > 0 ? (
        product.steps.map((step, index) => (
          <DocumentItem key={index}>{step}</DocumentItem>
        ))
      ) : (
        <DocumentItem>No steps listed.</DocumentItem>
      )}
    </ContentBox>
  );

  const renderTerms = () => (
    <ContentBox>
      <DocumentItem mb="1rem">Terms of Service</DocumentItem>
      {product.termsOfService && product.termsOfService.length > 0 ? (
        product.termsOfService.map((term, index) => (
          <DocumentItem key={index}>{term}</DocumentItem>
        ))
      ) : (
        <DocumentItem>No terms listed.</DocumentItem>
      )}
    </ContentBox>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case "documents":
        return renderDocuments();
      case "cost":
        return renderCost();
      case "steps":
        return renderSteps();
      case "terms":
        return renderTerms();
    }
  };

  return (
    <Box mt="2rem">
      <Box
        style={{
          borderRadius: "8px",
          boxShadow:
            "0px 1px 2px 0px rgba(0, 33, 128, 0.30), 0px 1px 3px 1px rgba(0, 33, 128, 0.15)",
          padding: "3rem",
        }}
      >
        <TabContainer>
          <TabButton
            active={activeTab === "documents"}
            onClick={() => setActiveTab("documents")}
          >
            Required Documents
          </TabButton>
          <TabButton
            active={activeTab === "cost"}
            onClick={() => setActiveTab("cost")}
          >
            Cost
          </TabButton>
          <TabButton
            active={activeTab === "steps"}
            onClick={() => setActiveTab("steps")}
          >
            Steps
          </TabButton>
          <TabButton
            active={activeTab === "terms"}
            onClick={() => setActiveTab("terms")}
          >
            Terms Of Service
          </TabButton>
        </TabContainer>

        {renderTabContent()}
      </Box>

      {product.relatedServices && product.relatedServices.length > 0 && (
        <Box mt="3rem">
          <H3 color="#002180" mb="1.5rem">
            Related Services
          </H3>
          <Carousel slidesToShow={3} responsive={responsive}>
            {product.relatedServices &&
              product.relatedServices.map((service) => (
                <Grid item xs={12} sm={6} md={4} key={service.id}>
                  <ProductCard20
                    id={service.id}
                    partner={service.partner}
                    slug={service.slug}
                    name={service.name}
                    rating={service.rating}
                    description={service.description}
                    images={service.images}
                    subTitle={service.subTitle}
                  />
                </Grid>
              ))}
          </Carousel>
        </Box>
      )}
    </Box>
  );
}
