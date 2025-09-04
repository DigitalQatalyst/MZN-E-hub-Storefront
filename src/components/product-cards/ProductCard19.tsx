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
  minHeight: "200px",
  height: "auto",
  padding: "16px",
  transition: "all 0.3s",
  borderRadius: "8px",
  background: "#FFF",
  border: `1px solid ${theme.colors.gray[400]}`,

  // Responsive height adjustments
  "@media (max-width: 1024px)": {
    minHeight: "280px",
    padding: "14px",
  },
  "@media (max-width: 768px)": {
    minHeight: "260px",
    padding: "12px",
  },
  "@media (max-width: 500px)": {
    minHeight: "240px",
    padding: "10px",
  },

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
  position: "relative",
  marginBottom: "15px",
  display: "flex",
  justifyContent: "flex-start", // Align image to the left
  alignItems: "center",

  ".product-img": {
    transition: "0.3s",
    width: "80px", // Fixed width for the image
    height: "80px", // Fixed height for the image
    objectFit: "contain",
  },

  // Responsive adjustments
  "@media (max-width: 1024px)": {
    marginBottom: "12px",
    ".product-img": {
      width: "70px",
      height: "70px",
    },
  },
  "@media (max-width: 768px)": {
    marginBottom: "10px",
    ".product-img": {
      width: "60px",
      height: "60px",
    },
  },
}));

const EyeButton = styled(IconButton)(() => ({
  top: "-5px",
  right: "20px",
  position: "absolute",
  transition: "right 0.3s .1s",
  background: "transparent",

  "@media (max-width: 768px)": {
    right: "15px",
    top: "0px",
  },
}));

const FavoriteButton = styled(IconButton)(() => ({
  top: "35px",
  right: "20px",
  position: "absolute",
  background: "transparent",
  transition: "right 0.3s .2s",

  "@media (max-width: 768px)": {
    right: "15px",
    top: "30px",
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

  @media (max-width: 1024px) {
    font-size: 11px;
    line-height: 17px;
    -webkit-line-clamp: 2;
  }

  @media (max-width: 768px) {
    font-size: 10px;
    line-height: 16px;
    margin: 6px 0;
  }

  @media (max-width: 500px) {
    font-size: 9px;
    line-height: 15px;
    margin: 4px 0;
  }
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
  flex: 1; // This helps with vertical spacing

  @media (max-width: 1024px) {
    font-size: 11px;
    line-height: 17px;
    -webkit-line-clamp: 3;
  }

  @media (max-width: 768px) {
    font-size: 10px;
    line-height: 16px;
    margin: 6px 0;
    -webkit-line-clamp: 2;
  }

  @media (max-width: 500px) {
    font-size: 9px;
    line-height: 15px;
    margin: 4px 0;
  }
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
  flex-shrink: 0; // Prevent button from shrinking

  span {
    color: #000;
    text-align: center;
    font-family: "Open Sans";
    font-size: 10px;
    font-style: normal;
    font-weight: 300;
  }

  @media (max-width: 1024px) {
    width: 90px;
    height: 28px;
    padding: 8px 2px;

    span {
      font-size: 9px;
    }
  }

  @media (max-width: 768px) {
    width: 85px;
    height: 26px;
    padding: 6px 1px;
    gap: 8px;

    span {
      font-size: 8px;
    }
  }

  @media (max-width: 500px) {
    width: 80px;
    height: 24px;
    gap: 6px;

    span {
      font-size: 8px;
    }
  }
`;

const StyledImage = styled(NextImage)`
  width: 80px;
  height: 80px;
  flex-shrink: 0;
  aspect-ratio: 1/1;

  @media (max-width: 1024px) {
    width: 70px;
    height: 70px;
  }

  @media (max-width: 768px) {
    width: 60px;
    height: 60px;
  }

  @media (max-width: 500px) {
    width: 80px;
    height: 80px;
  }
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
  margin-bottom: 4px;

  @media (max-width: 1024px) {
    font-size: 15px;
    line-height: 22px;
    -webkit-line-clamp: 2;
  }

  @media (max-width: 768px) {
    font-size: 14px;
    line-height: 20px;
  }

  @media (max-width: 500px) {
    font-size: 13px;
    line-height: 19px;
  }
`;

const LearnMoreWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  margin-top: 10px;
  flex-shrink: 0; // Prevent shrinking

  @media (max-width: 1024px) {
    gap: 4px;
    margin-top: 8px;
  }

  @media (max-width: 768px) {
    gap: 3px;
    margin-top: 6px;
  }

  @media (max-width: 500px) {
    gap: 2px;
    margin-top: 4px;
  }
`;

const ContentBox = styled(Box)`
  display: flex;
  flex-direction: column;
  height: 100%;
  text-align: left;
`;

const BottomSection = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: auto; // This pushes the bottom section to the bottom
  gap: 8px;

  @media (max-width: 1024px) {
    gap: 6px;
    flex-wrap: wrap;
  }

  @media (max-width: 768px) {
    gap: 4px;
  }

  @media (max-width: 500px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
`;

const ViewDetailsText = styled(Paragraph)`
  color: #002180;
  margin-right: 0.5rem;
  font-size: 12px;

  @media (max-width: 1024px) {
    font-size: 11px;
    margin-right: 0.3rem;
  }

  @media (max-width: 768px) {
    font-size: 10px;
    margin-right: 0.2rem;
  }

  @media (max-width: 500px) {
    font-size: 9px;
    margin-right: 0.1rem;
  }
`;

const ResponsiveIcon = styled(Icon)`
  @media (max-width: 768px) {
    font-size: 14px;
  }

  @media (max-width: 500px) {
    font-size: 12px;
  }
`;

type ProductCard19Props = {
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

export default function ProductCard19(props: ProductCard19Props) {
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
            <StyledImage src={img} width={80} height={80} alt="category" />
          </Link>

          {/* <EyeButton onClick={() => setOpenDialog(true)}>
            <Icon size="18px">eye</Icon>
          </EyeButton> */}

          {/* <FavoriteButton onClick={handleFavorite}>
          <Icon size="18px">Bookmark</Icon> */}
          {/* {isFavorite ? <Icon size="18px">eye</Icon> : <Icon size="18px">Bookmark</Icon>} */}
          {/* </FavoriteButton> */}
        </CardMedia>

        <ContentBox>
          <StyledParagraph>{name}</StyledParagraph>
          <StyledH4 fontWeight={700}>{subTitle}</StyledH4>

          {/* <FlexBox justifyContent="flex-start" alignItems="center" mb="1rem">
            <Rating value={4} color="warn" size="small" />
            <Small fontWeight={600} color="gray.500" ml=".3rem">
              ({reviews})
            </Small>
          </FlexBox> */}

          <StyledH5 fontWeight={700}>{description}</StyledH5>

          <BottomSection>
            <StyledButton mt={3}>
              <span>Funding & Loans</span>
            </StyledButton>

            <Link href={`/product/${slug}`} style={{ textDecoration: "none" }}>
              <LearnMoreWrapper style={{ cursor: "pointer" }}>
                <ViewDetailsText>View Details</ViewDetailsText>
                <ResponsiveIcon color="#002180">arrow_forward</ResponsiveIcon>
              </LearnMoreWrapper>
            </Link>
          </BottomSection>
        </ContentBox>
      </CardBox>

      <ProductQuickView
        open={openDialog}
        onClose={toggleDialog}
        product={{
          id,
          images,
          subTitle,
          description,
          slug,
          title: name,
          title1: name,
        }}
      />
    </Fragment>
  );
}
