"use client";

import Link from "next/link";
import { useState, Fragment, useCallback } from "react";
import styled from "styled-components";

import Box from "@component/Box";
import FlexBox from "@component/FlexBox";
import Rating from "@component/rating";
import Icon from "@component/icon/Icon";
import { H4, Paragraph, Small } from "@component/Typography";
import { Button as DefaultButton } from "@component/buttons";
import { IconButton } from "@component/buttons";
import NextImage from "@component/NextImage";
import ProductQuickView from "@component/products/ProductQuickView";
import { useAppContext } from "@context/app-context";

const CardBox = styled(Box)`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 300px;
  height: auto;
  padding: 16px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.3), 0px 1px 3px 1px rgba(0, 0, 0, 0.15);
  transition: all 0.3s;
`;

const CardMedia = styled(Box)`
  width: 100%;
  max-height: 300px;
  overflow: hidden;
  position: relative;
  margin-bottom: 16px;

  .product-img {
    transition: 0.3s;
    width: 100%;
    height: 100%;
  }
`;

const StyledButton = styled(DefaultButton)`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100px;
  width: 98px;
  height: 25px;
  background-color: transparent;
  border: 1px solid #e1def5;

  span {
    color: #808390;
    font-size: 10px;
    font-weight: 300;
  }
`;

const StyledImage = styled(NextImage)`
  width: 63px;
  height: 63px;
  aspect-ratio: 1/1;
  flex-shrink: 0;
`;

const StyledParagraph = styled(Paragraph)`
  color: #002180;
  font-size: 16px;
  font-weight: 500;
`;

const StyledH4 = styled(H4)`
  color: #808390;
  font-size: 10px;
  font-weight: 400;
  line-height: 16px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`;

const StyledH5 = styled(H4)`
  color: #000;
  font-size: 10px;
  font-weight: 400;
  line-height: 16px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`;

const LearnMoreWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  margin-top: 10px;
  cursor: pointer;
`;

type ProductCardProps = {
  img?: string;
  name?: string;
  partner?: string;
  slug: string;
  rating?: number;
  description?: string;
  subTitle?: string;
  reviews?: number;
  images?: string[];
  id: string | number;
};

export default function ProductCard20(props: ProductCardProps) {
  const {
    img,
    name,
    partner,
    subTitle,
    description,
    reviews,
    id,
    slug,
    images,
    rating,
  } = props;

  const { state, dispatch } = useAppContext();
  const [openDialog, setOpenDialog] = useState(false);

  const toggleDialog = useCallback(() => setOpenDialog((open) => !open), []);

  return (
    <Fragment>
      <CardBox>
        <CardMedia>
          <Link href={`/product/${slug}`}>
            <StyledImage src={img || "/assets/images/MZN.png"} alt="product" />
          </Link>
        </CardMedia>

        <Box textAlign="left">
          <StyledParagraph>{name}</StyledParagraph>
          <StyledH4>
            <span style={{ marginRight: "3px" }}>by</span>
            {partner}
          </StyledH4>

          <FlexBox justifyContent="flex-start" alignItems="center" mb="1rem">
            <Rating value={rating} color="warn" size="small" />
            <Small fontWeight={600} color="gray.500" ml=".3rem">
              ({reviews || 0})
            </Small>
          </FlexBox>

          <StyledH5>{description}</StyledH5>

          <Box display="flex" alignItems="center" justifyContent="space-between">
            <StyledButton>
              <span>Funding & Loans</span>
            </StyledButton>

            <Link href={`/product/${slug}`} style={{ textDecoration: "none" }}>
              <LearnMoreWrapper>
                <Paragraph color="#002180" fontSize={13}>
                  View Details
                </Paragraph>
                <Icon color="#002180" size="15px">arrow_forward</Icon>
              </LearnMoreWrapper>
            </Link>
          </Box>
        </Box>
      </CardBox>

      <ProductQuickView
        open={openDialog}
        onClose={toggleDialog}
        product={{
          id: String(id),
          images: images || [],
          subTitle: subTitle || "",
          description: description || "",
          slug,
          title: name || "",
        }}
      />
    </Fragment>
  );
}
