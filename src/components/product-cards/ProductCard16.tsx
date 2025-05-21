"use client";

import Link from "next/link";
import { Fragment, useCallback, useState } from "react";
import styled from "styled-components";

import Box from "@component/Box";
import Card from "@component/Card";
import { Chip } from "@component/Chip";
import Rating from "@component/rating";
import Icon from "@component/icon/Icon";
import Divider from "@component/Divider";
import FlexBox from "@component/FlexBox";
import { Button } from "@component/buttons";
import LazyImage from "@component/LazyImage";
import { H3, Paragraph, Span } from "@component/Typography";
import ProductQuickView from "@component/products/ProductQuickView";
import { useAppContext } from "@context/app-context";
import { calculateDiscount, currency } from "@utils/utils";

// STYLED COMPONENTS
const StyledBazaarCard = styled(Card)(({ theme }) => ({
  margin: "auto",
  height: "248px",
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
  }
}));

const ImageWrapper = styled(Box)({
  padding: "20px 240px 20px 20px", // Retained to position the circle in the top-left
  textAlign: "center",
  position: "relative",
  display: "flex",
  justifyContent: "center",
});

const ImageBox = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "50%", // 50% ensures a perfect circle with equal height and width
  height: "60px", // Equal height and width for a circle
  width: "60px",
});

const ContentWrapper = styled(Box)({
  padding: "0 40px 40px 20px", // 0 top, 40px right, 40px bottom, 40px left
  "& .title, & .categories": {
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis"
  }
});

// =============================================================
type ProductCardProps = {
  off: number;
  slug: string;
  title: string;
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

  // Convert id to string to match ProductQuickViewProps
  const productId = String(id);

  return (
    <StyledBazaarCard hoverEffect={hoverEffect}>
      <ImageWrapper>
        <ImageBox>
          <Link href={`/product/${slug}`}>
            <LazyImage
              alt={title}
              src={imgUrl}
              width={60}
              height={60}
              style={{ objectFit: "cover" }}
            />
          </Link>
        </ImageBox>
      </ImageWrapper>

      <ProductQuickView
        open={openModal}
        onClose={toggleDialog}
        product={{ id: productId, images, slug, price, title, subTitle, description: "" }}
      />

      <ContentWrapper>
        <Box flex="1 1 0" minWidth="0px" mr={1}>
          {/* <Link href={`/product/${slug}`}> */}
            <H3
              title={title}
              fontSize="16px"
              fontWeight="600"
              className="title"
              color="#0030E3"
            >
              {title}
            </H3>
          {/* </Link> */}
          <p style={{ fontSize: '14px', color: '#000', fontWeight: '400' }}>
            {subTitle}
          </p>
        </Box>
      </ContentWrapper>
    </StyledBazaarCard>
  );
}