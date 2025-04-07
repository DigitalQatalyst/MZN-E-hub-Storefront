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
  height: "300px",
  padding: "16px",
  // height:"auto",
  // maxWidth: "277px",    // Set a fixed height for all cards
  // alignItems: "center",  
  // gap: "16px",  // Add some space between the image and the product details
  // borderRadius: "3px",
  transition: "all 0.3s",
  // backgroundColor: "white",
  borderRadius: "8px",
  background: "var(--Secondary-Gradient, linear-gradient(225deg, #7693F3 0.02%, #7693F3 11.72%, #7693F1 21.24%, #7594EF 28.92%, #7594EC 35.08%, #7495E9 40.08%, #7496E5 44.24%, #7397E0 47.89%, #7298DC 51.38%, #7299D7 55.03%, #719AD2 59.19%, #709BCD 64.18%, #6F9CC8 70.35%, #6E9DC3 78.03%, #6E9EBE 87.54%, #6D9FBA 99.24%))",
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

// Title Styling
const StyledH4 = styled(H4)`
  color: #FFF;
  font-family: "Open Sans";
  font-size: 10px;
  font-style: normal;
  font-weight: 300;
  line-height: 16px; /* 160% */
  letter-spacing: 0.5px;
`;


// Custom Button Styling (normal and hover states)
const StyledButton = styled(DefaultButton)`
  display: flex;
  text-align: left; 
  padding: 7px 1px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  align-self: stretch;
  border-radius: 100px;
  width: 92px;  /* Fixed width */
  height: 20px;  /* Fixed height */
  background-color: transparent;
  border: 1px solid #ccc;  /* Light border color */
  transition: background-color 0.3s, color 0.3s;

  span {
    color: #fff;  /* White text */
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
  color: var(--M3-white, #FFF);

  /* M3/title/medium */
  font-family:  "Open Sans";
  font-size: var(--Title-Medium-Size, 16px);
  font-style: normal;
  font-weight: 500;
  line-height: var(--Title-Medium-Line-Height, 24px); /* 150% */
  letter-spacing: var(--Title-Medium-Tracking, 0.15px);
`;

const LearnMoreWrapper = styled.div`
  display: flex;
  justify-content: center;  /* Center horizontally */
  align-items: center;  /* Center vertically */
  gap: 5px;  /* Adds space between the text and the icon */
  margin-top: 10px;
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
  description: string
  subTitle: string;
  reviews: number;
  images: string[];
  id: string | number;
  className?: string;  // Add className as optional prop
};

export default function ProductCard19(props: ProductCard19Props) {
  const { img, name, subTitle, description, reviews, id, slug, images } = props;

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
            <StyledImage src={img} width={63} height={63} alt="category" />
          </Link>

          <EyeButton onClick={() => setOpenDialog(true)}>
            <Icon size="18px">eye</Icon>
          </EyeButton>

          <FavoriteButton onClick={handleFavorite}>
            {isFavorite ? <Icon size="18px">heart-filled</Icon> : <Icon size="18px">heart</Icon>}
          </FavoriteButton>
        </CardMedia>

        <Box textAlign="left">  {/* Align text content to the left */}
          <StyledParagraph>{name}</StyledParagraph>
          <StyledH4 fontWeight={700}>
            {subTitle}
          </StyledH4>

          <FlexBox justifyContent="flex-start" alignItems="center" mb="1rem">  {/* Align rating and review to the left */}
            <Rating value={4} color="warn" size="small" />
            <Small fontWeight={600} color="gray.500" ml=".3rem">
              ({reviews})
            </Small>
          </FlexBox>
          <StyledH4 fontWeight={700}>
            {description}
          </StyledH4>
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <StyledButton mt={3}>
              <span>Funding Scheme</span>
            </StyledButton>

            <LearnMoreWrapper>
              <Paragraph color="white" mr="0.5rem">Learn More</Paragraph>
              <img src="/assets/images/avatars/arrow_forward.svg" alt="Arrow Icon" style={{ width: '16px', height: '16px' }} />
            </LearnMoreWrapper>
          </Box>

        </Box>
      </CardBox>

      {/* QUICK VIEW MODAL */}
      <ProductQuickView
        open={openDialog}
        onClose={toggleDialog}
        product={{ id, images, subTitle, description, slug, title: name }}
      />
    </Fragment>
  );
}
