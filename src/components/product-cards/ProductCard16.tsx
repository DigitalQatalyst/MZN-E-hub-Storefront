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

// STYLED COMPONENTS
const StyledBazaarCard = styled(Card)(({ theme }) => ({
  margin: "auto",
  height: "290px",
  flexShrink: 0,
  display: "flex",
  overflow: "hidden",
  position: "relative",
  flexDirection: "column",
  justifyContent: "space-between",
  transition: "all 250ms ease-in-out",
  borderRadius: "12px",
  border: "1px solid #E5E5E5",
  boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.30), 0px 1px 3px 1px rgba(0, 0, 0, 0.15)",
  "&:hover": {
    boxShadow: theme.shadows[2],
    "& .controller": { right: 10 }
  },
  '@media (max-width: 1199px)': {
    height: '280px',
    borderRadius: '10px',
  },
  '@media (max-width: 899px)': {
    height: '240px',
    borderRadius: '8px',
  },
  '@media (max-width: 599px)': {
    height: '200px',
    minHeight: '200px',
    borderRadius: '6px',
    margin: '0',
  },
  '@media (max-width: 479px)': {
    height: '180px',
    minHeight: '180px',
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
  '@media (max-width: 1199px)': {
    padding: '16px',
    minHeight: '80px',
  },
  '@media (max-width: 899px)': {
    padding: '12px',
    minHeight: '60px',
  },
  '@media (max-width: 599px)': {
    padding: '8px',
    minHeight: '50px',
  },
  '@media (max-width: 479px)': {
    padding: '6px',
    minHeight: '40px',
  },
});

const ImageBox = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "50%",
  height: "60px",
  width: "60px",
  '@media (max-width: 899px)': {
    height: '50px',
    width: '50px',
  },
  '@media (max-width: 599px)': {
    height: '40px',
    width: '40px',
  },
  '@media (max-width: 479px)': {
    height: '32px',
    width: '32px',
  },
});

const ContentWrapper = styled(Box)({
  flex: "1 1 auto",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  paddingBottom: 8,
  minHeight: 0, // Important for flex overflow
  '@media (max-width: 899px)': {
    paddingBottom: 6,
  },
  '@media (max-width: 599px)': {
    paddingBottom: 4,
  },
  "& .title": {
    overflow: "hidden",
    whiteSpace: "normal",
    textOverflow: "clip",
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
  },
  "& .categories": {
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis"
  }
});

const StyledTitle = styled(H3)(({ wordCount }) => ({
  padding: "0 40px 2px 20px",
  color: "var(--KF-BG-Blue, #0030E3)",
  fontSize: "20px",
  fontStyle: "normal",
  fontWeight: 400,
  lineHeight: "26px",
  margin: 0,
  display: "-webkit-box",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
  textOverflow: "clip",
  '@media (max-width: 1199px)': {
    fontSize: '18px',
    lineHeight: '24px',
    padding: '0 30px 0 16px',
  },
  '@media (max-width: 899px)': {
    fontSize: '16px',
    lineHeight: '22px',
    padding: '0 24px 0 12px',
  },
  '@media (max-width: 599px)': {
    fontSize: '14px',
    lineHeight: '18px',
    padding: '0 16px 0 8px',
    WebkitLineClamp: 2,
  },
  '@media (max-width: 479px)': {
    fontSize: '13px',
    lineHeight: '16px',
    padding: '0 12px 0 6px',
  },
}));

const StyledTitle1 = styled(H3)(({ wordCount }) => ({
  padding: "0 40px 0 20px",
  color: "var(--KF-BG-Blue, #0030E3)",
  fontSize: "20px",
  fontStyle: "normal",
  fontWeight: 400,
  lineHeight: "26px",
  margin: 0,
  marginTop: "4px",
  display: "-webkit-box",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
  textOverflow: "clip",
  '@media (max-width: 1199px)': {
    fontSize: '18px',
    lineHeight: '24px',
    padding: '0 30px 0 16px',
    marginTop: '3px',
  },
  '@media (max-width: 899px)': {
    fontSize: '16px',
    lineHeight: '22px',
    padding: '0 24px 0 12px',
    marginTop: '2px',
  },
  '@media (max-width: 599px)': {
    fontSize: '14px',
    lineHeight: '18px',
    padding: '0 16px 0 8px',
    marginTop: '2px',
    WebkitLineClamp: 1,
  },
  '@media (max-width: 479px)': {
    fontSize: '13px',
    lineHeight: '16px',
    padding: '0 12px 0 6px',
    marginTop: '1px',
  },
}));

const StyledSubtitle = styled("p")({
  padding: "5px 0 40px 20px",
  color: "var(--KF-BG-Black, #000)",
  fontSize: "14px",
  fontStyle: "normal",
  fontWeight: 400,
  lineHeight: "22px",
  margin: 0,
  marginTop: "8px",
  flex: "1 1 auto",
  overflow: "hidden",
  display: "-webkit-box",
  textOverflow: "clip",
  '@media (max-width: 1199px)': {
    fontSize: '13px',
    lineHeight: '20px',
    padding: '0 0 30px 16px',
    marginTop: '6px',
    WebkitLineClamp: 3,
  },
  '@media (max-width: 899px)': {
    fontSize: '12px',
    lineHeight: '18px',
    padding: '0 0 20px 12px',
    marginTop: '4px',
    WebkitLineClamp: 2,
  },
  '@media (max-width: 599px)': {
    fontSize: '11px',
    lineHeight: '16px',
    padding: '0 0 12px 8px',
    marginTop: '3px',
    WebkitLineClamp: 2,
  },
  '@media (max-width: 479px)': {
    fontSize: '10px',
    lineHeight: '14px',
    padding: '0 0 8px 6px',
    marginTop: '2px',
    WebkitLineClamp: 1,
  },
});

// =============================================================
type ProductCardProps = {
  off: number;
  slug: string;
  title: string;
  // title1: string;
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
  const { off, id, title, subTitle, price, imgUrl, rating, hoverEffect, slug, images } = props;

  const { state, dispatch } = useAppContext();
  const [openModal, setOpenModal] = useState(false);

  const cartItem = state.cart.find((item) => item.id === id);

  const toggleDialog = useCallback(() => setOpenModal((open) => !open), []);

  const handleCartAmountChange = (qty: number) => () => {
    dispatch({
      type: "CHANGE_CART_AMOUNT",
      payload: { price, imgUrl, id, qty, slug, name: title }
    });
  };

  // Count words in the title
  const wordCount = title.trim().split(/\s+/).length;

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
                borderRadius: "50%"
              }}
            />
        </ImageBox>
      </ImageWrapper>

      <ProductQuickView
        open={openModal}
        onClose={toggleDialog}
        product={{ id: productId, images, slug, price, title, subTitle, description: "" }}
      />

      <ContentWrapper>
        <Box flex="1 1 0" minWidth="0px" mr={1} style={{ display: "flex", flexDirection: "column", minHeight: 0 }}>
          {/* <Link href={`/product/${slug}`}> */}
            <StyledTitle
              title={title}
              wordCount={wordCount}
              className="title"
            >
              {title}
            </StyledTitle>
          {/* </Link> */}
          <StyledSubtitle>
            {subTitle}
          </StyledSubtitle>
        </Box>
      </ContentWrapper>
    </StyledBazaarCard>
  );
}