"use client";

import Link from "next/link";
import { Fragment, useCallback, useState } from "react";
import styled from "styled-components";

import Box from "@component/Box";
import Card from "@component/Card";
import LazyImage from "@component/LazyImage";
import { H3 } from "@component/Typography";
import ProductQuickView from "@component/products/ProductQuickView";
import { useAppContext } from "@context/app-context";
import { fontFamily } from "styled-system";

// STYLED COMPONENTS
const StyledBazaarCard = styled(Card)(({ theme }) => ({
  margin: "auto",
  height: "300px",
  flexShrink: 0,
  display: "flex",
  overflow: "hidden",
  position: "relative",
  flexDirection: "column",
  justifyContent: "space-between",
  transition: "all 250ms ease-in-out",
  borderRadius: "12px",
  border: "1px solid #E5E5E5",
  boxShadow:
    "0px 1px 2px 0px rgba(0, 0, 0, 0.30), 0px 1px 3px 1px rgba(0, 0, 0, 0.15)",
  "&:hover": {
    boxShadow: theme.shadows[2],
    "& .controller": { right: 10 },
  },
  "@media (max-width: 1199px)": {
    height: "280px",
    borderRadius: "10px",
  },
  "@media (max-width: 899px)": {
    height: "240px",
    borderRadius: "8px",
  },
  "@media (max-width: 599px)": {
    height: "296px", // Fixed height for mobile
    width: "305px", // Fixed width for mobile
    minHeight: "296px",
    borderRadius: "8px",
    margin: "0",
  },
  "@media (max-width: 479px)": {
    height: "296px", // Maintain same size for small mobile
    width: "305px",
    minHeight: "296px",
  },
}));

const ImageWrapper = styled(Box)({
  padding: "20px",
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  position: "relative",
  minHeight: "100px",
  flex: "0 0 auto",
  "@media (max-width: 1199px)": {
    padding: "16px",
    minHeight: "80px",
  },
  "@media (max-width: 899px)": {
    padding: "12px",
    minHeight: "60px",
  },
  "@media (max-width: 599px)": {
    padding: "20px",
    minHeight: "80px",
    justifyContent: "flex-start", // Keep image at the left
  },
  "@media (max-width: 479px)": {
    padding: "20px",
    minHeight: "80px",
    justifyContent: "flex-start", // Keep image at the left
  },
});

const ImageBox = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "50%",
  height: "60px",
  width: "60px",
  "@media (max-width: 899px)": {
    height: "50px",
    width: "50px",
  },
  "@media (max-width: 599px)": {
    height: "60px", // Restore larger size for mobile
    width: "60px",
  },
  "@media (max-width: 479px)": {
    height: "60px",
    width: "60px",
  },
});

const ContentWrapper = styled(Box)({
  flex: "1 1 auto",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  paddingBottom: 8,
  minHeight: 0,
  width: "100%",
  "@media (max-width: 899px)": {
    paddingBottom: 6,
  },
  "@media (max-width: 599px)": {
    paddingBottom: 20, // Increased bottom padding for mobile
    flex: "1 1 auto",
  },
  "& .title": {
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
  },
  "& .categories": {
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
  },
});

const StyledTitle = styled(H3)({
  padding: "0 40px 2px 20px",
  color: "var(--KF-BG-Blue, #0030E3)",
  fontSize: "20px",
  fontStyle: "normal",
  fontWeight: 400,
  lineHeight: "26px",
  margin: 0,
  overflow: "hidden",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
  "@media (max-width: 1199px)": {
    fontSize: "18px",
    lineHeight: "24px",
    padding: "0 30px 2px 16px",
  },
  "@media (max-width: 899px)": {
    fontSize: "16px",
    lineHeight: "22px",
    padding: "0 24px 2px 12px",
  },
  "@media (max-width: 599px)": {
    fontSize: "20px", // Maintain original size for mobile
    lineHeight: "26px",
    padding: "0 20px 0 20px", // Remove bottom padding
  },
  "@media (max-width: 479px)": {
    fontSize: "20px",
    lineHeight: "26px",
    padding: "0 20px 0 20px",
  },
});

const StyledTitle1 = styled(H3)({
  padding: "0 40px 0 20px",
  color: "var(--KF-BG-Blue, #0030E3)",
  fontSize: "20px",
  fontStyle: "normal",
  fontWeight: 400,
  lineHeight: "26px",
  margin: 0,
  marginTop: "4px",
  overflow: "hidden",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
  "@media (max-width: 1199px)": {
    fontSize: "18px",
    lineHeight: "24px",
    padding: "0 30px 0 16px",
    marginTop: "3px",
  },
  "@media (max-width: 899px)": {
    fontSize: "16px",
    lineHeight: "22px",
    padding: "0 24px 0 12px",
    marginTop: "2px",
  },
  "@media (max-width: 599px)": {
    fontSize: "20px", // Maintain original size for mobile
    lineHeight: "26px",
    padding: "0 20px 0 20px",
    marginTop: "8px", // Increased spacing between titles
  },
  "@media (max-width: 479px)": {
    fontSize: "20px",
    lineHeight: "26px",
    padding: "0 20px 0 20px",
    marginTop: "8px",
  },
});

const StyledSubtitle = styled("p")({
  padding: "10px 20px 20px 20px",
  color: "var(--KF-BG-Black, #000)",
  fontSize: "14px",
  fontStyle: "normal",
  fontWeight: 400,
  lineHeight: "22px",
  margin: 0,
  flex: "1 1 auto",
  width: "100%",
  overflow: "visible",
  whiteSpace: "normal",
  "@media (max-width: 1199px)": {
    fontSize: "13px",
    lineHeight: "20px",
    padding: "0 16px 16px 16px",
  },
  "@media (max-width: 899px)": {
    fontSize: "12px",
    lineHeight: "18px",
    padding: "0 12px 12px 12px",
  },
  "@media (max-width: 599px)": {
    fontSize: "14px", // Set to 14px for mobile
    lineHeight: "20px", // Adjusted line height for better spacing
    padding: "12px 20px 0 20px", // Increased top padding for spacing
    marginTop: "4px",
    display: "-webkit-box",
    "-webkit-line-clamp": "4", // Limit to 4 lines
    "-webkit-box-orient": "vertical",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  "@media (max-width: 479px)": {
    fontSize: "14px",
    lineHeight: "20px",
    padding: "12px 20px 0 20px",
    marginTop: "4px",
    display: "-webkit-box",
    "-webkit-line-clamp": "4",
    "-webkit-box-orient": "vertical",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
});

// =============================================================
type ProductCardProps = {
  off: number;
  slug: string;
  title: string;
  title1: string;
  subTitle: string;
  price: number;
  imgUrl: string;
  rating?: number;
  images: string[];
  id: string | number;
  hoverEffect?: boolean;
};
// =============================================================

export default function ProductCard16(props: ProductCardProps) {
  const {
    off,
    id,
    title,
    title1,
    subTitle,
    price,
    imgUrl,
    rating,
    hoverEffect,
    slug,
    images,
  } = props;

  const { state, dispatch } = useAppContext();
  const [openModal, setOpenModal] = useState(false);

  const cartItem = state.cart.find((item) => item.id === id);

  const toggleDialog = useCallback(() => setOpenModal((open) => !open), []);

  const handleCartAmountChange = (qty: number) => () => {
    dispatch({
      type: "CHANGE_CART_AMOUNT",
      payload: { price, imgUrl, id, qty, slug, name: title },
    });
  };

  // Convert id to string to match ProductQuickViewProps
  const productId = String(id);

  return (
    <StyledBazaarCard hoverEffect={hoverEffect}>
      <ImageWrapper>
        <ImageBox>
          <LazyImage
            alt={title}
            src={imgUrl}
            width={60}
            height={60}
            style={{
              objectFit: "cover",
              width: "100%",
              height: "100%",
              borderRadius: "50%",
            }}
          />
        </ImageBox>
      </ImageWrapper>

      <ProductQuickView
        open={openModal}
        onClose={toggleDialog}
        product={{
          id: productId,
          images,
          slug,
          price,
          title,
          title1: title,
          subTitle,
          description: "",
        }}
      />

      <ContentWrapper>
        <Box
          flex="1 1 0"
          minWidth="0px"
          mr={1}
          style={{ display: "flex", flexDirection: "column", minHeight: 0 }}
        >
          <StyledTitle
            className="title"
            style={{
              fontSize: "20px",
              fontWeight: "400",
              fontFamily: "FS Kim Trial",
            }}
          >
            {title}
          </StyledTitle>
          <StyledTitle1 className="title">{title1}</StyledTitle1>
          <StyledSubtitle
            style={{
              fontSize: "14px",
              fontWeight: "400",
              fontFamily: "Helvetica Neue",
            }}
          >
            {subTitle}
          </StyledSubtitle>
        </Box>
      </ContentWrapper>
    </StyledBazaarCard>
  );
}
