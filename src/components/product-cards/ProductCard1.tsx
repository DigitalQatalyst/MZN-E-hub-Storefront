"use client";

import Link from "next/link";
import { Fragment, useCallback, useState } from "react";
import styled from "styled-components";

import { useAppContext } from "@context/app-context";

import Box from "@component/Box";
import Rating from "@component/rating";
import { Chip } from "@component/Chip";
import Icon from "@component/icon/Icon";
import FlexBox from "@component/FlexBox";
import { Button, IconButton } from "@component/buttons";
import NextImage from "@component/NextImage";
import Card, { CardProps } from "@component/Card";
import { H3, SemiSpan } from "@component/Typography";
import ProductQuickView from "@component/products/ProductQuickView";

import { calculateDiscount, currency, getTheme } from "@utils/utils";
import { deviceSize } from "@utils/constants";
import { FaArrowRight } from "react-icons/fa";

// STYLED COMPONENT
const Wrapper = styled(Card)`
  margin: auto;
  height: 100%;
  display: flex;
  overflow: hidden;
  flex-direction: column;
  justify-content: space-between;
  transition: all 250ms ease-in-out;

  &:hover {
    .details {
      .add-cart {
        display: flex;
      }
    }
    .image-holder {
      .extra-icons {
        display: flex;
      }
    }
  }

  .image-holder {
    text-align: center;
    position: relative;
    display: inline-block;
    height: 100%;

    .extra-icons {
      z-index: 2;
      top: 0.75rem;
      display: none;
      right: 0.75rem;
      cursor: pointer;
      position: absolute;
      flex-direction: column;
      gap: 0.25rem;
    }

    @media only screen and (max-width: ${deviceSize.sm}px) {
      display: block;
    }
  }

  .details {
    padding: 1rem;

    .title,
    .categories {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    .icon-holder {
      display: flex;
      align-items: flex-end;
      flex-direction: column;
      justify-content: space-between;
    }

    .favorite-icon {
      cursor: pointer;
    }
    .outlined-icon {
      svg path {
        fill: ${getTheme("colors.text.hint")};
      }
    }
    .add-cart {
      display: none;
      margin-top: auto;
      align-items: center;
      flex-direction: column;
    }
  }

  @media only screen and (max-width: 768px) {
    .details {
      .add-cart {
        display: flex;
      }
    }
  }
`;


interface ProductCard1Props extends CardProps {
  off?: number;
  slug?: string;
  title?: string;
  price?: number;
  imgUrl?: string;
  rating?: number;
  images?: string[];
  id?: string | number;
  category?: string;  // Added category to match the design
  memberCount?: string;  // Added member count
  name?: string;
  members?: string;
  imageSrc?: string;
  link?: string;
}

export default function ProductCard1({
  off,
  slug,
  title,
  price,
  imgUrl,
  rating = 4,
  images,
  id,
  category,
  memberCount,
  name,
  members,
  imageSrc,
  link,
  ...props
}: ProductCard1Props) {
  const [open, setOpen] = useState(false);
  const { state, dispatch } = useAppContext();
  const cartItem = state.cart.find((item) => item.id === id);

  const toggleDialog = useCallback(() => {
    setOpen((open) => !open);
  }, []);

  const handleCartAmountChange = (amount: number) => () => {
    dispatch({
      type: "CHANGE_CART_AMOUNT",
      payload: {
        id: id as number | string,
        slug,
        price,
        imgUrl,
        name: title,
        qty: amount
      }
    });
  };

  return (
    <>
      <Wrapper borderRadius={8} {...props}>
        <div className="image-holder">

          {/* <FlexBox className="extra-icons">
            <IconButton size="small" padding="0.5rem" onClick={toggleDialog}>
              <Icon color="secondary" variant="small">
                eye-alt
              </Icon>
            </IconButton>

            <IconButton size="small" padding="0.5rem">
              <Icon className="favorite-icon outlined-icon" variant="small">
                heart
              </Icon>
            </IconButton>
          </FlexBox> */}

          <Link href={`/market-2`}>
            <NextImage alt={title} width={277} src={imageSrc} height={270}/>
          </Link>
        </div>

        <div className="details">
          <FlexBox>
            <Box flex="1 1 0" minWidth="0px" mr="0.5rem">
              <Link href={`/market-2`}>
                <H3
                  mb="10px"
                  title={name}
                  fontSize="14px"
                  textAlign="left"
                  fontWeight="600"
                  className="title"
                  color="text.secondary">
                  {name}
                </H3>
              </Link>
                
              <FlexBox alignItems="center" mb="10px">
                  <SemiSpan color="black" fontWeight="600" mr="0.5rem">
                    {memberCount || "3.2K"}
                  </SemiSpan>
              </FlexBox>
              
              {/* <Button className="Sustainability" variant="outlined" color="primary" fullwidth marginTop={"20px"}>
                Sustainability
              </Button> */}
          <FlexBox>
            <FlexBox>
              {category}
            </FlexBox>
            <FlexBox>
              <Link href={link || `/market-2`}>View details</Link>
          <FaArrowRight />
            </FlexBox>
          </FlexBox>
            </Box>
        

            {/* <FlexBox
              width="30px"
              alignItems="center"
              flexDirection="column-reverse"
              justifyContent={!!cartItem?.qty ? "space-between" : "flex-start"}>
              {/* <Button
                size="none"
                padding="3px"
                color="primary"
                variant="outlined"
                borderColor="primary.light"
                onClick={handleCartAmountChange((cartItem?.qty || 0) + 1)}>
                <Icon variant="small">plus</Icon>
              </Button> */}

              {!!cartItem?.qty && (
                <Fragment>
                  <SemiSpan color="text.primary" fontWeight="600">
                    {cartItem.qty}
                  </SemiSpan>

                  <Button
                    size="none"
                    padding="3px"
                    color="primary"
                    variant="outlined"
                    borderColor="primary.light"
                    onClick={handleCartAmountChange(cartItem.qty - 1)}>
                    <Icon variant="small">minus</Icon>
                  </Button>
                </Fragment>
              )}
          </FlexBox>
        </div>
      </Wrapper>

      <ProductQuickView
        open={open}
        onClose={toggleDialog}
        product={{ images, title, id: id as number | string, slug, subTitle: "", description: "", title1: title || "" }}
      />
    </>
  );
}
