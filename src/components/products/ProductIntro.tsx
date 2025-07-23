"use client";

import { useParams } from "next/navigation";
import { useState, useCallback, useRef } from "react";
import RegistrationForm from "@component/forms/RegistrationForm";
import Box from "@component/Box";
import Image from "@component/Image";
import Rating from "@component/rating";
import Grid from "@component/grid/Grid";
import Icon from "@component/icon/Icon";
import FlexBox from "@component/FlexBox";
import { Button } from "@component/buttons";
import { H2, H4, H5, H6, SemiSpan, Span } from "@component/Typography";
import { useAppContext } from "@context/app-context";
import Product from "@models/product.model";
import { FaRegBookmark } from "react-icons/fa";
import { IoShareSocial } from "react-icons/io5";
import { IoIosArrowBack, IoMdArrowBack } from "react-icons/io";
import Link from "next/link";
import { border } from "styled-system";
import { FaRegClock } from "react-icons/fa";
import { BsClipboardMinus } from "react-icons/bs";
import { IoPlaySharp } from "react-icons/io5";
import { BiSolidInfoCircle } from "react-icons/bi";
import "./products.css";
import { Carousel } from "@component/carousel";
import { MdLaunch, MdOutlineLaunch, MdShare } from "react-icons/md";
import { GiShare } from "react-icons/gi";

// ========================================
interface Props {
  product: Product; // Accepting full product object
}
// ========================================

export default function ProductIntro({ product }: Props) {
  const param = useParams();
  const { state, dispatch } = useAppContext();
  const [selectedImage, setSelectedImage] = useState(0);
  const [imageLoading, setImageLoading] = useState(true);
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleImageLoad = () => {
    setImageLoading(false);
  };
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
    setTimeout(() => {
      videoRef.current?.play();
    }, 0);
  };
  const businessStages = ["Start-up", "Scale-up", "Idea"];
  const segments = [
    "Sole Proprietorship",
    "Partnership",
    "Medium Enterprises",
    "Limited Liability Company (LLC)",
    "Small Enterprises",
    "UAE National ",
    "Emiratis",
  ];
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
              "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}
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
          // style={{ border: "1px solid red" }}
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
              onClick={() => setShowRegistrationForm(true)}
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
            <FlexBox
              justifyContent="s
            Pace-between"
              width="10%"
            >
              <Span className="product-intro-details-btn-3">
                <GiShare color="#0030E3" size="20px" />
              </Span>
            </FlexBox>
          </FlexBox>
          <FlexBox className="product-intro-tags">
            <FlexBox flexDirection="column" style={{ gap: "30px" }}>
              <FlexBox flexDirection="column" style={{ gap: "10px" }}>
                <FlexBox alignItems="center" style={{ gap: "5px" }}>
                  <Span> Business Stage</Span>{" "}
                  <BiSolidInfoCircle color="#747474" />
                </FlexBox>
                <FlexBox flexWrap="wrap" style={{ gap: "10px" }}>
                  <Span className="tags">{product?.businessStage}</Span>
                </FlexBox>
              </FlexBox>
              <FlexBox flexDirection="column" style={{ gap: "10px" }}>
                <FlexBox alignItems="center" style={{ gap: "5px" }}>
                  <Span> Segment</Span> <BiSolidInfoCircle color="#747474" />
                </FlexBox>
                <FlexBox flexWrap="wrap" style={{ gap: "10px" }}>
                  <Span className="tags">{product.Nationality}</Span>
                  <Span className="tags">{product.LegalStructure}</Span>
                </FlexBox>
              </FlexBox>

              <FlexBox flexDirection="column" style={{ gap: "10px" }}>
                <FlexBox alignItems="center" style={{ gap: "5px" }}>
                  <Span> Categories</Span> <BiSolidInfoCircle color="#747474" />
                </FlexBox>
                {/* <FlexBox flexWrap="wrap" style={{ gap: "20px" }}>
                  {product.facetValues.map((category, index) => (
                    <Span className="tags" key={index}>
                      {category.name || "Loan Modification & Refinancing"}
                    </Span>
                  ))}
                </FlexBox> */}
                <FlexBox className="categories">
                  {categories.map((category, index) => (
                    <Span className="tags" key={index}>
                      {category.name}
                    </Span>
                  ))}
                </FlexBox>
              </FlexBox>
            </FlexBox>
          </FlexBox>

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
                {asset.video ? (
                  <Box
                    width="100%"
                    height="300px"
                    style={{
                      position: "relative",
                      // borderRadius: "8px",
                      overflow: "hidden",
                    }}
                  >
                    {/* Always render the video */}
                    <video
                      ref={videoRef}
                      src={asset.url}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        // borderRadius: "8px",
                        display: "block",
                        filter: !showVideo ? "brightness(0.7)" : "none",
                      }}
                      playsInline
                      controls={showVideo}
                    />
                    {!showVideo && (
                      <Box
                        style={{
                          position: "absolute",
                          inset: 0,
                          background: "rgba(0,0,0,0.15)",
                          zIndex: 2,
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "flex-end",
                          alignItems: "flex-start",
                          padding: "24px",
                        }}
                      >
                        {/* Logo */}
                        <img
                          src="/images/Logo2 (3).png"
                          alt="Logo"
                          style={{
                            width: 70,
                            marginBottom: "auto",
                            marginTop: 5,
                          }}
                        />
                        {/* Title and Subtitle */}
                        <div style={{ color: "#fff", marginBottom: 10 }}>
                          <div
                            style={{
                              fontWeight: 700,
                              fontSize: 22,
                              marginBottom: 3,
                            }}
                          >
                            {product?.title}
                          </div>
                          <div style={{ fontWeight: 400, fontSize: 14 }}>
                            Explore Tailored Funding Solutions for Your SME’s
                            Growth and Innovation
                          </div>
                        </div>
                        {/* Play Button */}
                        <button
                          onClick={handlePlayClick}
                          style={{
                            position: "absolute",
                            left: "50%",
                            top: "50%",
                            transform: "translate(-50%, -50%)",
                            background: "#fff",
                            border: "none",
                            borderRadius: "50%",
                            width: 56,
                            height: 56,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                            cursor: "pointer",
                          }}
                          aria-label="Play Video"
                        >
                          <IoPlaySharp size={30} color="#0030E3" />
                        </button>
                      </Box>
                    )}
                  </Box>
                ) : (
                  <img src={asset.url} alt="Product Image" />
                )}
              </Box>
            ))}
          </Carousel>
        </Grid>
      </Grid>
    </Box>
  );
}
