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
  minHeight: "200px", // Removed fixed height
  padding: "16px",
  transition: "all 0.3s",
  borderRadius: "8px",
  background: "#FFF",
  boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.15), 0px 1px 3px 1px rgba(0, 0, 0, 0.08)",
  "&:hover": {
    ".product-img": {
      transform: "scale(1.1)",
    },
    ".eye-button": {
      display: "block",
    },
    ".favorite-button": {
      display: "block",
    },
  },
}));

const CardMedia = styled(Box)(({ theme }) => ({
  width: "100%",
  maxHeight: "300px",
  cursor: "pointer",
  position: "relative",
  marginBottom: "15px",
  ".product-img": {
    transition: "0.3s",
    width: "100%",
    height: "auto", // Changed to auto for responsive scaling
  },
}));

const EyeButton = styled(IconButton)(() => ({
  top: "-5px",
  right: "20px",
  position: "absolute",
  transition: "right 0.3s .1s",
  background: "transparent",
  display: "none",
  "&.eye-button": {
    display: "none",
  },
}));

const FavoriteButton = styled(IconButton)(() => ({
  top: "35px",
  right: "20px",
  position: "absolute",
  background: "transparent",
  transition: "right 0.3s .2s",
  display: "none",
  "&.favorite-button": {
    display: "none",
  },
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
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 8px 0;
`;

const StyledButton = styled(DefaultButton)`
  display: flex;
  text-align: left;
  padding: 4px 8px;
  justify-content: center;
  align-items: center;
  gap: 5px;
  align-self: stretch;
  border-radius: 100px;
  width: auto; // Changed to auto for responsiveness
  height: 20px;
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
  width: 73px;
  height: auto; // Changed to auto for responsive scaling
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
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  position: relative;
  &:hover::after {
    content: attr(data-fulltext);
    position: absolute;
    background: #fff;
    border: 1px solid #ccc;
    padding: 4px 8px;
    z-index: 10;
    white-space: normal;
    max-width: 250px;
    left: 0;
    top: calc(100% + 4px);
    box-sizing: border-box;
    width: fit-content;
    min-width: 100%;
  }
`;

const LearnMoreWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  // margin-top: 15px;
`;

type NonFinancialServiceCardProps = {
  img: string;
  name: string;
  slug: string;
  description: string;
  subTitle: string;
  reviews: number;
  images: string[];
  id: string | number;
  className?: string;
};

export default function NonFinancialServiceCard(props: NonFinancialServiceCardProps) {
  const { img, name, subTitle, description, reviews, id, slug, images } = props;

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
            <StyledImage src={img} width={63} height={63} alt="category" />
          </Link>

          {/* <EyeButton className="eye-button" onClick={() => setOpenDialog(true)}>
            <Icon size="18px">eye</Icon>
          </EyeButton> */}

          <FavoriteButton className="favorite-button" onClick={handleFavorite}>
            <Icon size="18px">Bookmark</Icon>
          </FavoriteButton>
        </CardMedia>

        <Box textAlign="left">
          <StyledParagraph data-fulltext={name}>{name}</StyledParagraph>
          <StyledH4 fontWeight={700}>{subTitle}</StyledH4>

          <StyledH5 fontWeight={700}>{description}</StyledH5>
          <Box display="flex" alignItems="center" justifyContent="space-between" flexWrap="wrap" mt="1rem">
            <StyledButton>
              <span>Start-Up</span>
            </StyledButton>
            <StyledButton>
              <span>All Industries</span>
            </StyledButton>

            <Link href={`/product/${slug}`} style={{ textDecoration: "none" }}>
              <LearnMoreWrapper style={{ cursor: "pointer" }}>
                <Paragraph color="#002180" mr="0.3rem" fontSize="10px">
                  View Details
                </Paragraph>
                <Icon color="#002180" size="14px">arrow_forward</Icon>
              </LearnMoreWrapper>
            </Link>
          </Box>
        </Box>
      </CardBox>

      <ProductQuickView
        open={openDialog}
        onClose={toggleDialog}
        product={{ id, images, subTitle, description, slug, title: name }}
      />
    </Fragment>
  );
}