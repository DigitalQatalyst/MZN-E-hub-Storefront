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
  padding: "5px 240px 20px 20px",
  textAlign: "center",
  position: "relative",
  display: "flex",
  justifyContent: "center",
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
  padding: "0 16px 8px 16px",
  flex: "1 1 auto",
  display: "flex",
  flexDirection: "column",
  "& .title": {
    overflow: "hidden",
    whiteSpace: "normal",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
  },
  "& .subtitle": {
    overflow: "hidden",
    whiteSpace: "normal",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    WebkitLineClamp: 3,
    WebkitBoxOrient: "vertical",
  }
});

const FooterWrapper = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "8px 16px",
});

const TopPickChip = styled(Chip)({
  backgroundColor: "#E6E6E6",
  color: "#000",
  fontSize: "12px",
  fontWeight: "500",
  padding: "4px 8px",
  borderRadius: "12px",
});

const ExploreLink = styled(Link)({
  display: "flex",
  alignItems: "center",
  color: "#0030E3",
  fontSize: "12px",
  fontWeight: "500",
  textDecoration: "none",
  "&:hover": {
    textDecoration: "underline",
  },
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

export default function ProductCard20(props: ProductCardProps) {
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
          <H3
            title={title}
            fontSize="16px"
            fontWeight="600"
            className="title"
            color="#0030E3"
          >
            {title}
          </H3>
          <p className="subtitle" style={{ fontSize: '14px', color: '#000', fontWeight: '400' }}>
            {subTitle}
          </p>
        </Box>
      </ContentWrapper>

      <FooterWrapper>
        <TopPickChip>Top Pick</TopPickChip>
        <ExploreLink href={`/marketplace/${slug}`}>
          Explore Marketplace
          <Icon size="16px" ml="0.5rem">arrow-right</Icon>
        </ExploreLink>
      </FooterWrapper>
    </StyledBazaarCard>
  );
}