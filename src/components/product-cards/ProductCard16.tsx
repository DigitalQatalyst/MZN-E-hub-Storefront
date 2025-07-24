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
  height: "310px",
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
    height: '270px',
    borderRadius: '10px',
  },
  '@media (max-width: 899px)': {
    height: '220px',
    borderRadius: '8px',
  },
  '@media (max-width: 599px)': {
    height: 'auto',
    minHeight: '160px',
    borderRadius: '6px',
    margin: '0',
  },
}));

const ImageWrapper = styled(Box)({
  padding: "20px",
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  position: "relative",
  minHeight: "100px",
  '@media (max-width: 899px)': {
    padding: '12px',
    minHeight: '60px',
  },
  '@media (max-width: 599px)': {
    padding: '8px',
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
});

const ContentWrapper = styled(Box)({
  paddingBottom: 8,
  '@media (max-width: 899px)': {
    paddingBottom: 4,
  },
  '@media (max-width: 599px)': {
    paddingBottom: 2,
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
  padding: "0 40px 0 20px",
  color: "var(--KF-BG-Blue, #0030E3)",
  fontFamily: '"FS Kim Trial"',
  fontSize: "20px",
  fontStyle: "normal",
  fontWeight: 400,
  lineHeight: "26px",
  ...(wordCount > 19 && {
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    textOverflow: "clip",
  })
}));

const StyledTitle1 = styled(H3)(({ wordCount }) => ({
  padding: "0 40px 0 20px",
  color: "var(--KF-BG-Blue, #0030E3)",
  fontFamily: '"FS Kim Trial"',
  fontSize: "20px",
  fontStyle: "normal",
  fontWeight: 400,
  lineHeight: "26px",
  ...(wordCount > 19 && {
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    textOverflow: "clip",
  })
}));

const StyledSubtitle = styled("p")({
  padding: "0 0 40px 20px",
  color: "var(--KF-BG-Black, #000)",
  fontFamily: '"Helvetica Neue"',
  fontSize: "14px",
  fontStyle: "normal",
  fontWeight: 400,
  lineHeight: "22px",
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
  const { off, id, title, title1, subTitle, price, imgUrl, rating, hoverEffect, slug, images } = props;

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
              style={{ objectFit: "cover" }}
            />
        </ImageBox>
      </ImageWrapper>

      <ProductQuickView
        open={openModal}
        onClose={toggleDialog}
        product={{ id: productId, images, slug, price, title, title1, subTitle, description: "" }}
      />

      <ContentWrapper>
        <Box flex="1 1 0" minWidth="0px" mr={1}>
          {/* <Link href={`/product/${slug}`}> */}
            <StyledTitle
              title={title}
              wordCount={wordCount}
              className="title"
            >
              {title}
            </StyledTitle>
          {/* </Link> */}
          <StyledTitle1
              title={title1}
              wordCount={wordCount}
              className="title"
            >
              {title1}
            </StyledTitle1>
          <StyledSubtitle>
            {subTitle}
          </StyledSubtitle>
        </Box>
      </ContentWrapper>
    </StyledBazaarCard>
  );
}