"use client";

import { useParams } from "next/navigation";
import { useState, useCallback } from "react";
import RegistrationForm from "@component/forms/RegistrationForm";
import Box from "@component/Box";
import Image from "@component/Image";
import Rating from "@component/rating";
import Grid from "@component/grid/Grid";
import Icon from "@component/icon/Icon";
import FlexBox from "@component/FlexBox";
import { Button } from "@component/buttons";
import { H2, H4, H5, H6, SemiSpan } from "@component/Typography";
import { useAppContext } from "@context/app-context";
import Product from "@models/product.model";
import { FaRegBookmark } from "react-icons/fa";
import { IoShareSocial } from "react-icons/io5";

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

  return (
    <Box overflow="hidden" borderRadius="12px" padding={"12px"}>
      <Grid container spacing={10}>
        <Grid item md={6} alignItems="top" justifyContent={"top"}>
          <Box
            width="100%"
            // border={"1px solid red"}
          >
            <Image
              src={product.images[selectedImage] || safeImages[selectedImage]}
              width="100%"
              height="auto"
              style={{
                objectFit: "contain",
                maxHeight: "400px",
                opacity: imageLoading ? 0 : 1,
                transition: "opacity 0.3s",
              }}
              onLoad={handleImageLoad}
            />
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
        <Grid item md={6} alignItems="center">
          <H2 mb="1rem" color="#002180">
            {product.title}
          </H2>
          <FlexBox
            mb="1.5rem"
            alignItems="center"
            justifyContent={"space-between"}
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
              <H5 color="#00665C">{product.subTitle}</H5>
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
          </FlexBox>
          <Button
            mt="30px"
            size="small"
            bg="#00665C"
            color="white"
            variant="text"
          >
            Available for Registration
          </Button>
          <Box mb="45px" mt="30px">
            {product.description}
          </Box>

          <FlexBox
            mt="10px"
            justifyContent="between"
            gridGap="10px"
            flexWrap="wrap"
          >
            <Button
              style={{
                color: "gray",
                backgroundColor: "#DDDDDD",
                border: "none",
                borderRadius: "15px",
                padding: "3px 25px",
              }}
            >
              Conception
            </Button>
            <Button
              style={{
                color: "gray",
                backgroundColor: "#DDDDDD",
                border: "none",
                borderRadius: "15px",
                padding: "3px 25px",
              }}
            >
              Startup
            </Button>
            <Button
              style={{
                color: "gray",
                border: "1px solid #DDDDDD",

                borderRadius: "15px",
                padding: "3px 25px",
              }}
            >
              Growth
            </Button>
            <Button
              style={{
                color: "gray",
                backgroundColor: "#DDDDDD",
                border: "none",
                borderRadius: "15px",
                padding: "3px 25px",
              }}
            >
              Maturity
            </Button>
          </FlexBox>

          <Button
            fullwidth
            bg="#0030E3"
            height="55px"
            variant="contained"
            mt="15px"
            color={"primary"}
            onClick={() => setShowRegistrationForm(true)}
          >
            <p color="#ffffff !important">Start Application</p>
          </Button>

          <RegistrationForm
            open={showRegistrationForm}
            onClose={() => setShowRegistrationForm(false)}
            productSlug={product.slug}
          />
          <FlexBox
            alignItems="center"
            mb="1rem"
            mt="1rem"
            justifyContent="space-between"
            width="100%"
          >
            <Button
              width="85%"
              color="#002180"
              height="50px"
              border={"2px solid #002180"}
            >
              <FaRegBookmark color="#002180" size="20px" />
              &nbsp; Add to bookmarks
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

          <Box mt="2rem">
            <FlexBox alignItems="center" mb="0.75rem" style={{ gap: "10px" }}>
              <FlexBox alignItems="center" style={{ minWidth: "120px" }}>
                <Icon color="#002180" mr="4px">
                  truck
                </Icon>
                <SemiSpan
                  color="#002180"
                  style={{ fontSize: "16px", fontWeight: 600 }}
                >
                  Processing Time:
                </SemiSpan>
              </FlexBox>
              <H5 color="#002180">2 Weeks</H5>
            </FlexBox>

            <FlexBox alignItems="center" style={{ gap: "10px" }}>
              <FlexBox alignItems="center" style={{ minWidth: "120px" }}>
                <Icon color="#002180" mr="4px">
                  gift
                </Icon>
                <SemiSpan
                  color="#002180"
                  style={{ fontSize: "16px", fontWeight: 600 }}
                >
                  Registration Validity:
                </SemiSpan>
              </FlexBox>
              <H5 color="#002180">1 Year (Renewable)</H5>
            </FlexBox>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
