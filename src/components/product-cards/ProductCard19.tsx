import Link from "next/link";
import { FC, useState, Fragment } from "react";
import styled from "styled-components";

import Box from "@component/Box";
import Rating from "@component/rating";
import Icon from "@component/icon/Icon";
import FlexBox from "@component/FlexBox";
import { Button as DefaultButton } from "@component/buttons";  // Import the original Button component
import NextImage from "@component/NextImage";
import { IconButton } from "@component/buttons";
import { H4, Paragraph, Small } from "@component/Typography";
import ProductQuickView from "@component/products/ProductQuickView";
import { useAppContext } from "@context/app-context";
import { currency } from "@utils/utils";
import { theme } from "@utils/theme";

// styled components using object syntax
const CardBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",  // Ensure the content stacks vertically
  width: "100%",  // Make the card width 100% of its parent container
  height: "auto",  // Set height to auto to allow content to adjust naturally
  maxWidth: "277px",    // Set a fixed height for all cards
  // alignItems: "center",  
  gap: "16px",  // Add some space between the image and the product details
  // borderRadius: "3px",
  transition: "all 0.3s",
  // backgroundColor: "white",
  border: `1px solid ${theme.colors.gray[100]}`,
    "&:hover": {
      ".product-img": {
        transform: "scale(1.1)", 
      },
    },

}));

const CardMedia = styled(Box)(({ theme }) => ({
  width: "100%", // Take up the full width for the image
  maxHeight: "300px",  
  cursor: "pointer",
  overflow: "hidden",
  position: "relative",
  ".product-img": {
    transition: "0.3s",
    // objectFit: "cover", 
    width: "100%",
    height: "100%",
  },
}));

// const EyeButton = styled(IconButton)(() => ({
//   top: "10px",
//   right: "20px",
//   position: "absolute",
//   transition: "right 0.3s .1s",
//   background: "transparent",
// }));

// const FavoriteButton = styled(IconButton)(() => ({
//   top: "45px",
//   right: "20px",
//   position: "absolute",
//   background: "transparent",
//   transition: "right 0.3s .2s",
// }));

// Title Styling
const StyledH4 = styled(H4)`
  color: var(--KF-BG-Dark-Blue, #002180);
  text-align: left;  // Align the title to the left

  /* Text/T4/Bold */
  font-family: "Open Sans";
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 26px; /* 162.5% */
`;

// Custom Button Styling (normal and hover states)
const StyledButton = styled(DefaultButton)`
  display: flex;
  text-align: left; 
  padding: 7px 10px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  align-self: stretch;
  border-radius: 4px;
  border: 1px solid var(--KF-BG-Dark-Blue, #002180);
  background: transparent;
  transition: background-color 0.3s, color 0.3s;

  span {
    color: var(--KF-BG-Dark-Blue, #002180);
    text-align: center;
    font-family: "Open Sans";
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: 22px; /* 157.143% */
  }

  &:hover {
    background: var(--KF-BG-Dark-Blue, #002180);
    
    span {
      color: var(--KF-BG-White, #FFF);
    }
  }
`;

// const ProductBox = styled(Box)(({ theme }) => ({
//   // marginLeft: "-50px",  
//   display: "flex",
//   flexDirection: "column",
//   // gap: "8px", 
//   textAlign: "left", // Align text to the left
// }));


type ProductCard19Props = {
  img: string;
  name: string;
  slug: string;
  subTitle: string;
  reviews: number;
  images: string[];
  id: string | number;
  className?: string;  // Add className as optional prop
};

export default function ProductCard19(props: ProductCard19Props) {
  const { img, name, subTitle, reviews, id, slug, images } = props;

  const { state, dispatch } = useAppContext();
  const [openDialog, setOpenDialog] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const cartItem = state.cart.find((item) => item.slug === slug);

  const handleFavorite = () => setIsFavorite((fav) => !fav);
  const toggleDialog = () => setOpenDialog((state) => !state);

  // const handleAddToCart = () => {
  //   const payload = {
  //     id,
  //     slug,
  //     name,
  //     subTitle,
  //     imgUrl: img,
  //     qty: (cartItem?.qty || 0) + 1,
  //   };

  //   dispatch({ type: "CHANGE_CART_AMOUNT", payload });
  // };

  return (
    <Fragment>
      <CardBox>
        <CardMedia>
          <Link href={`/product/${slug}`}>
            <NextImage src={img} width={300} height={300} alt="category" className="product-img" />
          </Link>

          {/* <EyeButton onClick={() => setOpenDialog(true)}>
            <Icon size="18px">eye</Icon>
          </EyeButton>

          <FavoriteButton onClick={handleFavorite}>
            {isFavorite ? <Icon size="18px">heart-filled</Icon> : <Icon size="18px">heart</Icon>}
          </FavoriteButton> */}
        </CardMedia>

        <Box p={2} textAlign="left">  {/* Align text content to the left */}
          <Paragraph>{name}</Paragraph>
          <StyledH4 fontWeight={700} py=".5rem">
          {subTitle}
          </StyledH4>

          <FlexBox justifyContent="flex-start" alignItems="center" mb="1rem">  {/* Align rating and review to the left */}
            <Rating value={4} color="warn" size="small" />
            <Small fontWeight={600} color="gray.500" ml=".3rem">
              ({reviews})
            </Small>
          </FlexBox>

          {/* <StyledButton fullwidth onClick={handleAddToCart}> */}
          <StyledButton fullwidth >
            <span>Learn More</span>
          </StyledButton>
        </Box>
      </CardBox>

      {/* QUICK VIEW MODAL */}
      <ProductQuickView
        open={openDialog}
        onClose={toggleDialog}
        product={{ id, images, subTitle, slug, title: name }}
      />
    </Fragment>
  );
}
