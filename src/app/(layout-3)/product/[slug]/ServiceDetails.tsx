"use client";

import { useParams } from "next/navigation";
import { useState, useRef } from "react";
import { useMsal } from "@azure/msal-react";
import { authScopes } from "../../../../authConfig"; // <-- adjust path if needed

import RegistrationForm from "@component/forms/RegistrationForm";
import Box from "@component/Box";
import Rating from "@component/rating";
import Grid from "@component/grid/Grid";
import Icon from "@component/icon/Icon";
import FlexBox from "@component/FlexBox";
import { Button } from "@component/buttons";
import { H2, Span } from "@component/Typography";
import { FaRegBookmark } from "react-icons/fa";
import { IoMdArrowBack, IoMdArrowForward } from "react-icons/io";
import Link from "next/link";
import { FaRegClock } from "react-icons/fa";
import { BsClipboardMinus } from "react-icons/bs";
import { IoPlaySharp } from "react-icons/io5";
import { BiSolidInfoCircle } from "react-icons/bi";
import "./products.css";
import { Carousel } from "@component/carousel";
import { GiShare } from "react-icons/gi";

import Product from "@models/product.model";

// ========================================
interface Props {
  product: Product;
}
// ========================================

export default function ServiceDetailsSection1({ product }: Props) {
  const param = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [imageLoading, setImageLoading] = useState(true);
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // ⭐ MSAL instance
  const { instance } = useMsal();

  const handleImageLoad = () => setImageLoading(false);

  const assets = [
    { video: true, url: "/assets/Videos/KF_Service Request.mp4" },
    { video: true, url: "/assets/Videos/KF_Service Request.mp4" },
    { video: true, url: "/assets/Videos/KF_Service Request.mp4" },
    { video: true, url: "/assets/Videos/KF_Service Request.mp4" },
  ];

  const routerId = param.slug as string;

  const handleImageClick = (ind: number) => () => {
    setImageLoading(true);
    setSelectedImage(ind);
  };

  const handlePlayClick = () => {
    setShowVideo(true);
    setTimeout(() => videoRef.current?.play(), 0);
  };

  // ⭐ Trigger Azure B2C sign-in (uses redirectUri from msalConfig)
  const handleStartApplication = () => {
    instance
      .loginRedirect({
        scopes: authScopes.scopes, // ["openid","offline_access", ...]
        extraQueryParameters: { prompt: "login" },
        // DO NOT set redirectUri here; use global one from msalConfig
      })
      .catch(console.error);
  };

  const categories = [
    { name: "Loan Modification & Refinancing" },
    { name: "Loan Management & Adjustments" },
  ];

  const responsive = [
    { breakpoint: 959, settings: { slidesToShow: 1 } },
    { breakpoint: 650, settings: { slidesToShow: 1 } },
  ];

  return (
    <Box overflow="hidden" borderRadius="12px" padding={"12px"}>
      <FlexBox justifyContent="space-between">
        <FlexBox flexDirection={"column"}>
          <Link
            href="/services"
            style={{
              display: "flex",
              gap: "10px",
              alignItems: "center",
              fontSize: "16px",
              marginBottom: "1.5rem",
            }}
            color="#002180"
          >
            <IoMdArrowBack size={12} color="#0030E3" />
            <Span color="#0030E3" fontSize={12} fontWeight={500}>
              Back to Financial Services
            </Span>
          </Link>

          <H2 mb="1rem" color="#0030E3" fontFamily="FS Kim Trial">
            {product?.title}
          </H2>
          <Span mb="1rem" fontWeight={500}>
            powered by {product?.subTitle || "Khalifa Fund"}
          </Span>
          <Box mb="45px" width="70%">
            {product?.description ||
              "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua..."}
          </Box>
        </FlexBox>
      </FlexBox>

      <Grid container spacing={10} className="product-intro-details-wrapper">
        <Grid
          item
          md={6}
          alignItems="center"
          style={{ width: "40%" }}
          className="product-intro-details-left"
        >
          <FlexBox
            alignItems="center"
            mb="1rem"
            mr={"1.5rem"}
            justifyContent="space-between"
            className="product-intro-details-btn-container"
          >
            <Button
              bg="#0030E3"
              padding="0 10px"
              height="55px"
              variant="contained"
              color={"primary"}
              onClick={handleStartApplication} /* ⭐ Kick off Azure B2C */
              className="product-intro-details-btn-1"
            >
              <p
                color="#ffffff !important"
                className="product-intro-details-btn-1-paragraph"
                style={{ width: "max-content" }}
              >
                Start Application
              </p>
              <Icon marginLeft={"10px"}>launch</Icon>
            </Button>

            <Button
              color="#002180"
              height="50px"
              border={"2px solid #0030E3"}
              className="product-intro-details-btn-2"
            >
              <FaRegBookmark color="#0030E3" size="20px" />
              <span style={{ color: "#0030E3" }}>Save</span>
            </Button>

            <FlexBox justifyContent="space-between" width="10%">
              <Span className="product-intro-details-btn-3">
                <GiShare color="#0030E3" size="20px" />
              </Span>
            </FlexBox>
          </FlexBox>

          <FlexBox className="product-intro-tags">
            <FlexBox flexDirection="column" style={{ gap: "30px" }}>
              <FlexBox flexDirection="column" style={{ gap: "10px" }}>
                <FlexBox alignItems="center" style={{ gap: "5px" }}>
                  <Span> Business Stage</Span>
                </FlexBox>
                <FlexBox flexWrap="wrap" style={{ gap: "10px" }}>
                  <Span className="tags">{product?.businessStage}</Span>
                </FlexBox>
              </FlexBox>

              <FlexBox flexDirection="column" style={{ gap: "10px" }}>
                <FlexBox alignItems="center" style={{ gap: "5px" }}>
                  <Span> Segment</Span>
                </FlexBox>
                <FlexBox flexWrap="wrap" style={{ gap: "10px" }}>
                  <Span className="tags">{product.Nationality}</Span>
                  <Span className="tags">{product.LegalStructure}</Span>
                </FlexBox>
              </FlexBox>

              <FlexBox flexDirection="column" style={{ gap: "10px" }}>
                <FlexBox alignItems="center" style={{ gap: "5px" }}>
                  <Span> Categories</Span>
                </FlexBox>
                <FlexBox
                  flexDirection="column"
                  className="categories"
                  style={{ gap: "10px" }}
                >
                  {categories.map((category, index) => (
                    <Span className="tags" key={index}>
                      {category.name}
                    </Span>
                  ))}
                </FlexBox>
              </FlexBox>
            </FlexBox>
          </FlexBox>

          {/* You can keep the RegistrationForm if you still open it elsewhere */}
          <RegistrationForm
            open={showRegistrationForm}
            onClose={() => setShowRegistrationForm(false)}
            productSlug={product?.slug}
          />
        </Grid>

        <Grid
          style={{ width: "55%" }}
          item
          md={6}
          alignItems="top"
          justifyContent={"top"}
          className="product-intro-details-right"
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
                    borderRadius: "6px",
                  }}
                >
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
                      padding: "24px",
                    }}
                  >
                    <img
                      src="/images/khalifa-fund-logo.svg"
                      alt="Logo"
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
                            lineHeight: "1.2",
                          }}
                        >
                          {product?.title}
                        </div>
                        <div style={{ color: "black", fontWeight: 400, fontSize: 16 }}>
                          Explore Tailored Funding Solutions for Your SME’s Growth and
                          Innovation
                        </div>
                      </div>
                      <IoMdArrowForward size={20} width={"50%"} />
                    </FlexBox>
                  </Box>
                </Box>
              </Box>
            ))}
          </Carousel>
        </Grid>
      </Grid>
    </Box>
  );
}
