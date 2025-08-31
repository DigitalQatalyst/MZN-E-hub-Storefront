"use client";
import Link from "next/link";
import { useState, Fragment } from "react";
import styled from "styled-components";
import Box from "@component/Box";
import Rating from "@component/rating";
import Icon from "@component/icon/Icon";
import FlexBox from "@component/FlexBox";
import { Button as DefaultButton } from "@component/buttons";
import NextImage from "@component/NextImage";
import { IconButton } from "@component/buttons";
import { H4, Paragraph, Small } from "@component/Typography";
import ProductQuickView from "@component/products/ProductQuickView";
import { useAppContext } from "@context/app-context";

const CardBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  minHeight: "300px",
  height: "auto",
  padding: "16px",
  marginBottom: "20px",
  marginTop: "20px",
  transition: "all 0.3s",
  borderRadius: "8px",
  background: "#FFF",
  boxShadow:
    "0px 1px 2px 0px rgba(0, 0, 0, 0.30), 0px 1px 3px 1px rgba(0, 0, 0, 0.15)",
  "&:hover": {
    ".product-img": {
      transform: "scale(1.1)",
    },
  },
}));

const CardMedia = styled(Box)(({ theme }) => ({
  width: "100%",
  maxHeight: "300px",
  cursor: "pointer",
  overflow: "hidden",
  position: "relative",
  marginBottom: "16px", // Added to increase gap between CardMedia and Box below
  ".product-img": {
    transition: "0.3s",
    width: "100%",
    height: "100%",
  },
}));

const EyeButton = styled(IconButton)(() => ({
  top: "-5px",
  right: "20px",
  position: "absolute",
  transition: "right 0.3s .1s",
  background: "transparent",
}));

const FavoriteButton = styled(IconButton)(() => ({
  top: "35px",
  right: "20px",
  position: "absolute",
  background: "transparent",
  transition: "right 0.3s .2s",
}));

const StyledH4 = styled(H4)`
  color: #808390;
  font-family: "Open Sans";
  font-size: 10px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px;
  letter-spacing: 0.5px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 8px 0;
`;

const StyledH5 = styled(H4)`
  color: #000;
  font-family: "Open Sans";
  font-size: 10px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px;
  letter-spacing: 0.5px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 8px 0;
`;

const StyledButton = styled(DefaultButton)`
  display: flex;
  text-align: left;
  padding: 7px 1px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  align-self: stretch;
  border-radius: 100px;
  width: 98px;
  height: 25px;
  background-color: transparent;
  border: 1px solid #ccc;
  transition: background-color 0.3s, color 0.3s;

  span {
    color: #000;
    text-align: center;
    font-family: "Open Sans";
    font-size: 10px;
    font-style: normal;
    font-weight: 300;
  }
`;

const StyledImage = styled(NextImage)`
  width: 63px;
  height: 63px;
  flex-shrink: 0;
  aspect-ratio: 1/1;
`;

const StyledParagraph = styled(Paragraph)`
  color: #002180;
  font-family: "Open Sans";
  font-size: var(--Title-Medium-Size, 16px);
  font-style: normal;
  font-weight: 500;
  line-height: var(--Title-Medium-Line-Height, 24px);
  letter-spacing: var(--Title-Medium-Tracking, 0.15px);
`;

const LearnMoreWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  margin-top: 10px;
`;

type ProductCard19Props = {
  img?: string;
  name?: string;
  slug?: string;
  description?: string;
  subTitle?: string;
  partner?: string;
  reviews?: number;
  images?: string[];
  id?: string | number;
  className?: string;
  rating?: number;
};

export default function ProductCard20(props: ProductCard19Props) {
  const {
    img,
    partner,
    rating,
    name,
    subTitle,
    description,
    reviews,
    id,
    slug,
    images,
  } = props;

  const { state, dispatch } = useAppContext();
  const [openDialog, setOpenDialog] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const cartItem = state.cart.find((item) => item.slug === slug);

  const handleFavorite = () => setIsFavorite((fav) => !fav);
  const toggleDialog = () => setOpenDialog((state) => !state);

  return (
    <Fragment>
      <CardBox>
        <CardMedia>
          <Link href={`/product/${slug}`}>
            <StyledImage
              src="/assets/images/MZN.png"
              width={63}
              height={63}
              alt="category"
            />
          </Link>

          {/* <EyeButton onClick={() => setOpenDialog(true)}>
            <Icon size="18px">eye</Icon>
          </EyeButton>

          <FavoriteButton onClick={handleFavorite}>
            {isFavorite ? <Icon size="18px">heart-filled</Icon> : <Icon size="18px">heart</Icon>}
          </FavoriteButton> */}
        </CardMedia>

        <Box textAlign="left">
          <StyledParagraph>{name}</StyledParagraph>
          <StyledH4 fontWeight={700}>{subTitle}</StyledH4>

          {/* <FlexBox justifyContent="flex-start" alignItems="center" mb="1rem">
            <Rating value={4} color="warn" size="small" />
            <Small fontWeight={600} color="gray.500" ml=".3rem">
              ({reviews})
            </Small>
          </FlexBox> */}
          <StyledH5 fontWeight={700}>{description}</StyledH5>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <StyledButton mt={3}>
              <span style={{ fontSize: "10px" }}>Funding & Loans</span>
            </StyledButton>

            <Link href={`/product/${slug}`} style={{ textDecoration: "none" }}>
              <LearnMoreWrapper style={{ cursor: "pointer" }}>
                <Paragraph color="#002180" mr="0.5rem" fontSize={"10px"}>
                  View Details
                </Paragraph>
                <Icon color="#002180" size="16px">
                  arrow_forward
                </Icon>
              </LearnMoreWrapper>
            </Link>
          </Box>
        </Box>
      </CardBox>

      <ProductQuickView
        open={openDialog}
        onClose={toggleDialog}
        product={{ id, images, subTitle, description, slug, title: name, title1: name}}
      />
    </Fragment>
  );
}
