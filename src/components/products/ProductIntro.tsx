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
  const safeImages = [
    "/assets/images/products/Home & Garden/vida.png",
    "/assets/images/products/Home & Garden/2indoor.png",
    "/assets/images/products/Home & Garden/3Aloe.png",
    "/assets/images/products/Home & Garden/4Satin.png",
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
            <IoMdArrowBack size={30} color="#0030E3" />
            <Span color="#002180">Back to Financial Services</Span>
          </Link>

          <H2 mb="1rem" color="#0030E3">
            {product?.title}
          </H2>
          <Span mb="1rem" fontWeight={500}>
            powered by {product?.subTitle}
          </Span>
          <Box mb="45px" width="70%">
            {product?.description ||
              "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}
          </Box>

          {/* <FlexBox
            mb="1.5rem"
            alignItems="center"
            style={{
              gap: "20px",
            }}
          >
            <FlexBox alignItems="center" style={{ gap: "8px" }}>
              <FlexBox alignItems="center">
                <SemiSpan
                  color="#002180"
                  style={{ fontSize: "16px", fontWeight: 600 }}
                >
                  Partner
                </SemiSpan>
              </FlexBox>
              <H5 color="#00665C">{product?.subTitle}</H5>
            </FlexBox>
            <span>|</span>
            <FlexBox alignItems="center">
              <FlexBox alignItems="center">
                <Rating color="warn" size="medium" value={4} outof={5} />
                <H6
                  style={{ fontSize: "16px", fontWeight: 600 }}
                  ml="8px"
                  color="#666"
                >
                  (50)
                </H6>
              </FlexBox>
            </FlexBox>
            <span>|</span>
            <FlexBox alignItems="center" style={{ gap: "5px" }}>
              <FlexBox alignItems="center">
                <SemiSpan
                  color="#00665C"
                  style={{ fontSize: "16px", fontWeight: 600 }}
                >
                  Code:
                </SemiSpan>
              </FlexBox>
              <H5 color="#002180">KF/0030</H5>
            </FlexBox>
          </FlexBox> */}
        </FlexBox>
        {/* <FlexBox
          alignItems="center"
          mb="1rem"
          mr={"1.5rem"}
          mt="1rem"
          justifyContent="space-between"
          // width="100%"
        >
          <Button
            width="85%"
            color="#002180"
            height="50px"
            border={"2px solid #002180"}
          >
            <FaRegBookmark color="#002180" size="20px" />
            &nbsp; Save
          </Button>
          <FlexBox
            justifyContent="s
            Pace-between"
            width="10%"
          >
            <Button width="100%" height="50px" border={"2px solid #002180"}>
              <Icon color="#002180">share 1</Icon>
            </Button>
          </FlexBox>
        </FlexBox> */}
      </FlexBox>
      <Grid container spacing={10}>
        <Grid
          item
          md={6}
          alignItems="center"
          // style={{ border: "1px solid red" }}
        >
          <FlexBox
            alignItems="center"
            mb="1rem"
            mr={"1.5rem"}
            justifyContent="space-between"
          >
            <Button
              bg="#0030E3"
              padding="0 80px"
              height="55px"
              variant="contained"
              color={"primary"}
              onClick={() => setShowRegistrationForm(true)}
            >
              <p color="#ffffff !important">Start Application</p>
            </Button>
            <Button color="#002180" height="50px" border={"2px solid #002180"}>
              <FaRegBookmark color="#002180" size="20px" />
              &nbsp; Save
            </Button>
            <FlexBox
              justifyContent="s
            Pace-between"
              width="10%"
            >
              <Button width="100%" height="50px" border={"2px solid #002180"}>
                <Icon color="#002180">share 1</Icon>
              </Button>
            </FlexBox>
          </FlexBox>
          <FlexBox>
            <FlexBox flexDirection="column" style={{ gap: "30px" }}>
              <FlexBox flexDirection="column">
                <FlexBox alignItems="center" style={{ gap: "5px" }}>
                  <Span> Business Stage</Span>{" "}
                  <BiSolidInfoCircle color="#747474" />
                </FlexBox>
                <Span>{product?.highlightedStage}</Span>
              </FlexBox>
              <FlexBox alignItems="center" style={{ gap: "5px" }}>
                <Span> Segment</Span> <BiSolidInfoCircle color="#747474" />
              </FlexBox>
              <FlexBox alignItems="center" style={{ gap: "5px" }}>
                <Span> Categories</Span> <BiSolidInfoCircle color="#747474" />
              </FlexBox>
            </FlexBox>
          </FlexBox>
          {/* <Button
            mt="30px"
            size="small"
            bg="#00665C"
            color="white"
            variant="text"
          >
            Available for Registration
          </Button> */}

          {/* <FlexBox alignItems="center" mt="2rem" style={{ gap: "20px" }}>
            <FlexBox
              alignItems="center"
              style={{
                gap: "10px",
                background: "rgba(0, 102, 92, 0.07)",
                color: "#00665C",
                padding: "10px 20px",
                borderRadius: "7px",
              }}
            >
              <FlexBox
                bg="rgba(0, 102, 92, 0.2)"
                padding="10px"
                borderRadius="7px"
              >
                <FaRegClock />
              </FlexBox>
              <FlexBox flexDirection="column" style={{}}>
                <SemiSpan
                  style={{
                    fontSize: "16px",
                    fontWeight: "bold",
                    color: "#00665C",
                  }}
                >
                  Processing Time
                </SemiSpan>
                <H5>{product.processingTime}</H5>
              </FlexBox>
            </FlexBox>
            <FlexBox
              alignItems="center"
              style={{
                gap: "10px",
                background: "rgba(0, 48, 227, 0.07)",
                color: "#0123A0",
                padding: "10px 20px",
                borderRadius: "7px",
              }}
            >
              <FlexBox
                bg="rgba(0, 102, 92, 0.2)"
                padding="10px"
                borderRadius="7px"
              >
                <BsClipboardMinus />
              </FlexBox>
              <FlexBox flexDirection="column" style={{}}>
                <SemiSpan
                  style={{
                    fontSize: "16px",
                    fontWeight: "bold",
                    color: "#002180",
                  }}
                >
                  Validity Period:{" "}
                </SemiSpan>
                <H5>{product.registrationValidity || "1 Year (Renewable)"}</H5>
              </FlexBox>
            </FlexBox>
          </FlexBox> */}

          <RegistrationForm
            open={showRegistrationForm}
            onClose={() => setShowRegistrationForm(false)}
            productSlug={product?.slug}
          />
        </Grid>
        <Grid item md={6} alignItems="top" justifyContent={"top"}>
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
              src="/assets/Videos/KF_Service Request.mp4"
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
                    style={{ fontWeight: 700, fontSize: 22, marginBottom: 3 }}
                  >
                    {product?.title}
                  </div>
                  <div style={{ fontWeight: 400, fontSize: 14 }}>
                    Explore Tailored Funding Solutions for Your SME’s Growth and
                    Innovation
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
          {/* <FlexBox gridGap="10px" justifyContent="center" mb="1rem">
            {(product.images.length > 0 ? product.images : safeImages).map((url, ind) => (
              <Box
                key={ind}
                width="64px"
                height="64px"
                padding="5px"
                cursor="pointer"
                borderRadius="8px"
                border={`2px solid ${selectedImage === ind ? '#0030E3' : '#E0E0E0'}`}
                onClick={handleImageClick(ind)}
              >
                <Image
                  src={url}
                  width="100%"
                  height="100%"
                  style={{ objectFit: "contain" }}
                />
              </Box>
            ))}
          </FlexBox> */}
        </Grid>
      </Grid>
    </Box>
  );
}
