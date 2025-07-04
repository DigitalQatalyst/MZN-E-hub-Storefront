"use client";

import Box from "@component/Box";
import { Button } from "@component/buttons";
import FlexBox from "@component/FlexBox";
import Grid from "@component/grid/Grid";
import { ProductCard19, ProductCard20 } from "@component/product-cards";
import { H3, H4, H6, Paragraph, SemiSpan, Span } from "@component/Typography";
import Product from "@models/product.model";
import { useState } from "react";
import styled from "styled-components";
import client from "@lib/graphQLClient";
import { relatedProducts } from "__server__/__db__/related-products/data";
import { Carousel } from "@component/carousel";
import { border, fontWeight } from "styled-system";
import Image from "next/image";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";

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
    box-shadow: none;
  }
  &:focus {
    outline: none;
    box-shadow: none;
  }
  &:active {
    box-shadow: none;
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
      bottom: -10px;
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

type TabType = "description" | "documents" | "cost" | "steps" | "terms";

interface Props {
  product: Product;
}

export default function ProductDetails({ product }: Props) {
  const [activeTab, setActiveTab] = useState<TabType>("description");
  const [showAllDocs, setShowAllDocs] = useState(false);
  const [showAllSteps, setShowAllSteps] = useState(false); // Add this state

  console.log(product);
  const responsive = [
    { breakpoint: 959, settings: { slidesToShow: 2 } },
    { breakpoint: 650, settings: { slidesToShow: 1 } },
  ];
  const renderDescription = () => (
    <ContentBox display="flex" style={{ gap: "1rem" }}>
      <DocumentItem mb="1rem" flex="1">
        <Span fontWeight="bold">Overview</Span>
        <p>{product?.description}</p>
      </DocumentItem>
      <DocumentItem flex="1">
        <Span fontWeight="bold">Key Benefits</Span>
        <ol style={{ paddingLeft: "4%" }}>
          <li>
            Cut financing costs by up to 25% with streamlined, tailored funding
            solutions for SMEs.
          </li>
        </ol>
      </DocumentItem>
      {/* <DocumentItem>No documents listed.</DocumentItem> */}
    </ContentBox>
  );

  const renderDocuments = () => {
    const docs = product?.requiredDocuments || [];
    const showButton = docs.length > 4;
    const visibleDocs = showAllDocs ? docs : docs.slice(0, 4);

    return (
      <ContentBox display="flex" style={{ gap: "1rem" }}>
        <DocumentItem mb="1rem" flex="1">
          <Span fontWeight="bold">Overview</Span>
          <p>{product.description}</p>
        </DocumentItem>
        <DocumentItem flex="1">
          <Span fontWeight="bold">Required Documents</Span>
          {docs.length > 0 ? (
            <>
              <ol style={{ paddingLeft: "4%" }}>
                {visibleDocs.map((doc, index) => (
                  <li key={index}>
                    <DocumentItem as="span" mb="0">
                      {doc}
                    </DocumentItem>
                  </li>
                ))}
              </ol>
              {showButton && (
                <Span
                  style={{
                    marginTop: "0.5rem",
                    padding: 0,
                    fontSize: 14,
                    fontWeight: 600,
                  }}
                  onClick={() => setShowAllDocs((prev) => !prev)}
                >
                  {showAllDocs ? (
                    <FlexBox
                      alignItems="center"
                      color="#0030E3"
                      cursor="pointer"
                    >
                      <Span mr="1rem">Show Less</Span>
                      <FaAngleUp />
                    </FlexBox>
                  ) : (
                    <FlexBox
                      alignItems="center"
                      color="#0030E3"
                      cursor="pointer"
                    >
                      <Span mr="1rem">Show More</Span>
                      <FaAngleDown />
                    </FlexBox>
                  )}
                </Span>
              )}
            </>
          ) : (
            <DocumentItem>No documents listed.</DocumentItem>
          )}
        </DocumentItem>
      </ContentBox>
    );
  };

  const renderCost = () => (
    <ContentBox>
      {/* <DocumentItem mb="1rem">Service Cost Details</DocumentItem> */}
      <DocumentItem>
        {product?.cost || "No cost information available."}
      </DocumentItem>
    </ContentBox>
  );

  const renderSteps = () => {
    const steps = product?.steps || [];
    const showButton = steps.length > 4;
    const visibleSteps = showAllSteps ? steps : steps.slice(0, 4);

    return (
      <ContentBox>
        <DocumentItem mb="1rem" style={{ fontWeight: "bold" }}>
          Steps:
        </DocumentItem>
        {steps.length > 0 ? (
          <>
            <ol style={{ paddingLeft: "2%" }}>
              {visibleSteps.map((step, index) => (
                <li key={index}>
                  <DocumentItem as="span">{step}</DocumentItem>
                </li>
              ))}
            </ol>
            {showButton && (
              <Span
                style={{
                  marginTop: "0.5rem",
                  padding: 0,
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: "pointer",
                  display: "inline-block",
                }}
                onClick={() => setShowAllSteps((prev) => !prev)}
              >
                {showAllSteps ? (
                  <FlexBox alignItems="center" color="#0030E3" cursor="pointer">
                    <Span mr="1rem">Show Less</Span>
                    <FaAngleUp />
                  </FlexBox>
                ) : (
                  <FlexBox alignItems="center" color="#0030E3" cursor="pointer">
                    <Span mr="1rem">Show More</Span>
                    <FaAngleDown />
                  </FlexBox>
                )}
              </Span>
            )}
          </>
        ) : (
          <DocumentItem>No steps listed.</DocumentItem>
        )}
      </ContentBox>
    );
  };

  const renderTerms = () => (
    <ContentBox>
      {/* <DocumentItem mb="1rem">Terms of Service</DocumentItem> */}
      {product?.termsOfService && product?.termsOfService.length > 0 ? (
        product?.termsOfService.map((term, index) => (
          <DocumentItem key={index}>{term}</DocumentItem>
        ))
      ) : (
        <DocumentItem>No terms listed.</DocumentItem>
      )}
    </ContentBox>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case "description":
        return renderDescription();
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
          position: "relative",
          borderRadius: "8px",
          boxShadow:
            "0px 1px 2px 0px rgba(0, 33, 128, 0.30), 0px 1px 3px 1px rgba(0, 33, 128, 0.15)",
          padding: "3rem",
        }}
      >
        {/* <Image
          src="/images/chat.png"
          alt="chat"
          width={50}
          height={50}
          style={{
            borderRadius: "50%",
            position: "absolute",
            right: "-20px",
            top: 5,
          }}
        />
        <span
          style={{
            position: "absolute",
            top: 0,
            right: "-20px",
            background:
              "linear-gradient(90deg, #01E5D1 0%, #02E4D1 8.12%, #04E2D2 14.47%, #07DFD3 19.42%, #0CDAD5 23.32%, #12D5D7 26.54%, #18CEDA 29.42%, #20C7DD 32.34%, #29BEE0 35.66%, #33B5E4 39.72%, #3DABE8 44.89%, #48A0EC 51.54%, #5395F1 60.01%, #6089F5 70.67%, #6C7DFA 83.88%, #7970FF 100%)",
            color: "#fff",
            width: "15px",
            height: "15px",
            borderRadius: "50%",
            padding: "auto",
            display: "flex",
            fontSize: "10px",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 700,
            boxShadow: "0 1px 4px rgba(0,0,0,0.15)",
            zIndex: 2,
          }}
        >
          {1}
        </span> */}
        <TabContainer>
          <TabButton
            active={activeTab === "description"}
            onClick={() => setActiveTab("description")}
          >
            Description
          </TabButton>
          <TabButton
            active={activeTab === "steps"}
            onClick={() => setActiveTab("steps")}
          >
            Steps
          </TabButton>

          <TabButton
            active={activeTab === "cost"}
            onClick={() => setActiveTab("cost")}
          >
            Cost
          </TabButton>
          <TabButton
            active={activeTab === "documents"}
            onClick={() => setActiveTab("documents")}
          >
            Required Documents
          </TabButton>

          <TabButton
            active={activeTab === "terms"}
            onClick={() => setActiveTab("terms")}
          >
            Terms Of Service
          </TabButton>
        </TabContainer>
        <hr
          style={{
            height: "3px",
            background: "#D8E0E9",
            border: "none",
            marginLeft: "1.95rem",
            marginRight: "1.95rem",
          }}
        />

        {renderTabContent()}
      </Box>

      {product?.relatedServices && product?.relatedServices.length > 0 && (
        <Box mt="3rem">
          <H3 color="#002180" mb="1.5rem">
            Related Services
          </H3>
          <Carousel slidesToShow={3} responsive={responsive}>
            {product?.relatedServices &&
              product?.relatedServices.map((service) => (
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
