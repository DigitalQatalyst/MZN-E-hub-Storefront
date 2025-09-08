"use client";

import { useState } from "react";
import Link from "next/link";
import { useMsal } from "@azure/msal-react";

import { loginRequest } from "@lib/authConfig"; // uses your central config

import RegistrationForm from "@component/forms/RegistrationForm";
import Box from "@component/Box";
import Grid from "@component/grid/Grid";
import Icon from "@component/icon/Icon";
import FlexBox from "@component/FlexBox";
import { Button } from "@component/buttons";
import { H2, Span } from "@component/Typography";
import { IoMdArrowBack, IoMdArrowForward } from "react-icons/io";
import { GiShare } from "react-icons/gi";
import { FaRegBookmark } from "react-icons/fa";
import { Carousel } from "@component/carousel";

import "./products.css";
import type Product from "@models/product.model";

interface Props {
  product: Product;
}

export default function ServiceDetailsSection1({ product }: Props) {
  const { instance } = useMsal();

  const [showRegistrationForm, setShowRegistrationForm] = useState(false);

  // Carousel breakpoints
  const responsive = [
    { breakpoint: 959, settings: { slidesToShow: 1 } },
    { breakpoint: 650, settings: { slidesToShow: 1 } },
  ];

  // TEMP: simple media list (replace with product assets if available)
  const assets = [
    { video: true as const, url: "/assets/Videos/KF_Service Request.mp4" },
    { video: true as const, url: "/assets/Videos/KF_Service Request.mp4" },
    { video: true as const, url: "/assets/Videos/KF_Service Request.mp4" },
  ];

  // Start flow: popup → open RegistrationForm
  const handleStartApplication = async () => {
    try {
      const res = await instance.loginPopup(loginRequest);
      if (res?.account) instance.setActiveAccount(res.account);
      setShowRegistrationForm(true);
    } catch (e) {
      // user closed popup or error
      // eslint-disable-next-line no-console
      console.error("Start Application failed:", e);
    }
  };

  const categories =
    product?.categories?.length
      ? product.categories.map((name: string) => ({ name }))
      : [
          { name: "Loan Modification & Refinancing" },
          { name: "Loan Management & Adjustments" },
        ];

  return (
    <Box overflow="hidden" borderRadius="12px" padding="12px">
      <FlexBox justifyContent="space-between">
        <FlexBox flexDirection="column">
          <Link
            href="/services"
            style={{
              display: "flex",
              gap: 10,
              alignItems: "center",
              fontSize: 16,
              marginBottom: "1.5rem",
            }}
          >
            <IoMdArrowBack size={12} color="#0030E3" />
            <Span color="#0030E3" fontSize={12} fontWeight={500}>
              Back to Financial Services
            </Span>
          </Link>

          <H2 mb="1rem" color="#0030E3" fontFamily="FS Kim Trial">
            {product?.title ?? "Service title"}
          </H2>

          <Span mb="1rem" fontWeight={500}>
            powered by {product?.subTitle || "Khalifa Fund"}
          </Span>

          <Box mb="45px" width="70%">
            {product?.description ??
              "Explore tailored funding solutions for your SME’s growth and innovation."}
          </Box>
        </FlexBox>
      </FlexBox>

      <Grid container spacing={10} className="product-intro-details-wrapper">
        {/* Left column */}
        <Grid
          item
          md={6}
          className="product-intro-details-left"
          style={{ width: "40%" }}
        >
          {/* Primary actions */}
          <FlexBox
            alignItems="center"
            mb="1rem"
            mr="1.5rem"
            justifyContent="space-between"
            className="product-intro-details-btn-container"
          >
            <Button
              bg="#0030E3"
              padding="0 10px"
              height="55px"
              variant="contained"
              color="primary"
              onClick={handleStartApplication}
              className="product-intro-details-btn-1"
              aria-label="Start Application"
            >
              <p className="product-intro-details-btn-1-paragraph" style={{ color: "#fff", width: "max-content" }}>
                Start Application
              </p>
              <Icon marginLeft="10px">launch</Icon>
            </Button>

            <Button
              color="#002180"
              height="50px"
              border="2px solid #0030E3"
              className="product-intro-details-btn-2"
              aria-label="Save service"
            >
              <FaRegBookmark color="#0030E3" size={20} />
              <span style={{ color: "#0030E3", marginLeft: 8 }}>Save</span>
            </Button>

            <FlexBox justifyContent="space-between" width="10%">
              <Span className="product-intro-details-btn-3" title="Share">
                <GiShare color="#0030E3" size={20} />
              </Span>
            </FlexBox>
          </FlexBox>

          {/* Tags */}
          <FlexBox className="product-intro-tags">
            <FlexBox flexDirection="column" style={{ gap: 30 }}>
              <FlexBox flexDirection="column" style={{ gap: 10 }}>
                <FlexBox alignItems="center" style={{ gap: 5 }}>
                  <Span>Business Stage</Span>
                </FlexBox>
                <FlexBox flexWrap="wrap" style={{ gap: 10 }}>
                  <Span className="tags">{product?.businessStage ?? "All"}</Span>
                </FlexBox>
              </FlexBox>

              <FlexBox flexDirection="column" style={{ gap: 10 }}>
                <FlexBox alignItems="center" style={{ gap: 5 }}>
                  <Span>Segment</Span>
                </FlexBox>
                <FlexBox flexWrap="wrap" style={{ gap: 10 }}>
                  {!!product?.Nationality && (
                    <Span className="tags">{product.Nationality}</Span>
                  )}
                  {!!product?.LegalStructure && (
                    <Span className="tags">{product.LegalStructure}</Span>
                  )}
                </FlexBox>
              </FlexBox>

              <FlexBox flexDirection="column" style={{ gap: 10 }}>
                <FlexBox alignItems="center" style={{ gap: 5 }}>
                  <Span>Categories</Span>
                </FlexBox>
                <FlexBox
                  flexDirection="column"
                  className="categories"
                  style={{ gap: 10 }}
                >
                  {categories.map((c, i) => (
                    <Span className="tags" key={`${c.name}-${i}`}>
                      {c.name}
                    </Span>
                  ))}
                </FlexBox>
              </FlexBox>
            </FlexBox>
          </FlexBox>

          {/* Registration form (opens post-login) */}
          <RegistrationForm
            open={showRegistrationForm}
            onClose={() => setShowRegistrationForm(false)}
            productSlug={product?.slug}
          />
        </Grid>

        {/* Right column */}
        <Grid
          item
          md={6}
          className="product-intro-details-right"
          style={{ width: "55%" }}
        >
          <Carousel
            dots
            arrows
            slidesToShow={1}
            responsive={responsive}
            dotColor="gray"
            dotStyles={{ bottom: "-40px" }}
          >
            {assets.map((asset, index) => (
              <Box key={index} width="100%">
                <Box
                  width="100%"
                  height="300px"
                  style={{
                    position: "relative",
                    overflow: "hidden",
                    boxShadow: "0 4px 4px 0 rgba(0, 0, 0, 0.25)",
                    borderRadius: 6,
                    background: "#fff",
                  }}
                >
                  {/* Overlay content */}
                  <Box
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "white",
                      zIndex: 2,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-end",
                      alignItems: "flex-start",
                      padding: 24,
                    }}
                  >
                    <img
                      src="/images/khalifa-fund-logo.svg"
                      alt="Khalifa Fund"
                      style={{ width: 32, height: 21, marginBottom: "auto" }}
                    />

                    <FlexBox alignItems="flex-end" justifyContent="space-between">
                      <div style={{ width: "70%" }}>
                        <div
                          style={{
                            fontWeight: 700,
                            fontSize: 45,
                            marginBottom: 3,
                            color: "#0030E3",
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                            minHeight: "1.2em",
                            lineHeight: 1.2,
                          }}
                        >
                          {product?.title ?? "Funding Solutions"}
                        </div>
                        <div style={{ color: "black", fontWeight: 400, fontSize: 16 }}>
                          Explore Tailored Funding Solutions for Your SME’s Growth and Innovation
                        </div>
                      </div>
                      <IoMdArrowForward size={20} />
                    </FlexBox>
                  </Box>

                  {/* If you want to actually render the video, add a <video> behind the overlay */}
                  {/* <video src={asset.url} style={{ width: "100%", height: "100%", objectFit: "cover" }} muted loop /> */}
                </Box>
              </Box>
            ))}
          </Carousel>
        </Grid>
      </Grid>
    </Box>
  );
}
