"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import Box from "@component/Box";
import Image from "@component/Image";
import Rating from "@component/rating";
import Avatar from "@component/avatar";
import Grid from "@component/grid/Grid";
import Icon from "@component/icon/Icon";
import Card from "@component/Card";
import FlexBox from "@component/FlexBox";
import { Button } from "@component/buttons";
import { H1, H2, H3, H4, H5, H6, SemiSpan } from "@component/Typography";
import { useAppContext } from "@context/app-context";

import { currency } from "@utils/utils";
import Product from "@models/product.model";
import { colors } from "theme/colors/colors";
// import { Carousel } from "@component/carousel";

// ========================================
interface Props {
  product: Product; // Accepting full product object
}
// ========================================

export default function ProductIntro() {
  // { product }: Props
  const param = useParams();
  const { state, dispatch } = useAppContext();
  const [selectedImage, setSelectedImage] = useState(0);
  const safeImages = [
    "/assets/images/products/Home & Garden/ServiceImage.jpg",
    "/assets/images/products/Home & Garden/2indoor.png",
    "/assets/images/products/Home & Garden/3Aloe.png",
    "/assets/images/products/Home & Garden/4Satin.png",
  ];

  const routerId = param.slug as string;
  // const cartItem = state.cart.find(
  //   (item) => item.id === product.id || item.id === routerId
  // );

  const handleImageClick = (ind: number) => () => setSelectedImage(ind);

  // const handleCartAmountChange = (amount: number) => () => {
  //   dispatch({
  //     type: "CHANGE_CART_AMOUNT",
  //     payload: {
  //       price: product.price,
  //       qty: amount,
  //       name: product.title,
  //       imgUrl: safeImages[0],
  //       id: product.id || routerId,
  //     },
  //   });
  // };

  return (
    <Box overflow="hidden" borderRadius="12px" padding={'12px'}>
      <Grid container spacing={16} >
        <Grid item md={6} alignItems="top" justifyContent={"top"}>
          <FlexBox justifyContent={"top"}>
            <Box
              border={"2px #E0000 solid"}
              borderRadius={"12px"}
              padding={"5px"}
              ml={"10px"}
              mr={"10px"}
            >
              <Button mb="10px" size={"small"} bg="#0030E3" borderRadius="4px" height="27px" color="#FFF" variant="outlined">
                Govt. sponsored
              </Button>
              <Image
                src={safeImages[selectedImage]}
                width="395px;"
                height="395px"
              />

            </Box>
          </FlexBox>
        </Grid>
        <Grid item md={6} alignItems="center">
          <H2 mb="1rem" color="#002180">Issue Economic Licence - Commercial</H2>
          <FlexBox alignItems="center" mb="1rem">
          <SemiSpan color="#002180" style={{ fontSize: '16px' }}>Partner: </SemiSpan>
            <H5 ml="12px" color="#00665C">DED</H5>
            <Icon>vector</Icon>
            <Box>
              <Rating color="warn" size="12px" value={4} outof={5} />
            </Box>
            <H6 mr="2px">(50)</H6>
            <Icon>vector</Icon>
            <SemiSpan color="#00665C" style={{ fontSize: '16px' }}> Code:</SemiSpan>
            <H5 ml="8px" color="#002180">BZY1</H5>
          </FlexBox>
          <Button mt="45px" size="small" bg="#00665C" color="white" variant="text">
            Available for Registration
          </Button>
          <Box mb="45px" mt="45px">
            Through this service, you can obtain an economic licence that <br>
            </br>includes commercial, tourist, agricultural, artisanal, professional <br>
            </br>activities, and your preferred legal form.
          </Box>
          <Box mb="24px" mt="18px" color="#002180" fontWeight="bold">            
            <h3>Type: Sole Proprietorship</h3>
          </Box>
          <Box mb="24px" mt="18px" color="#002180" fontWeight="bold">
            <h3>Business Stage</h3>
          </Box>
          <FlexBox mt="10px" justifyContent="between" gridGap="10px" flexWrap="wrap">
            <Button color="#FFF" bg="#99B2FF" width="135px" variant="outlined">
              Conception
            </Button>
            <Button variant="outlined" width="135px" > {/*color={colors.primary.main}*/}
              Startup
            </Button>
            <Button variant="outlined" width="135px" > {/*color="blue"*/}
              Growth
            </Button>
            <Button variant="outlined" width="135px" > {/*color="blue"*/}
              Maturity
            </Button>
          </FlexBox>

          <Button fullwidth bg="#0030E3" height="55px"  variant="contained" mt="15px" color={"primary"}>
            <p color="#ffffff !important">Apply for Registration</p>
          </Button>
          <FlexBox alignItems="center" mb="1rem" mt="1rem" justifyContent="space-between" width="100%">
            <Button width="58%" color={colors.primary.main} height="50px" bg={"success"}>
              <Icon>heart</Icon>
              &nbsp; Add Wishlist
            </Button>
            <FlexBox justifyContent="flex-end">
              <Button ml="10px" mr="10px" width="50px" height="50px" borderRadius="none" bg={"success"}>
                <Icon>compare</Icon>
              </Button>
              <Button ml="10px" mr="10px" width="50px" height="50px" borderRadius="none" bg={"success"}>
                <Icon>share 1</Icon>
              </Button>
            </FlexBox>
          </FlexBox>

          <FlexBox mb="1em">
            <Icon ml={"10px"} color="#0030E3">truck</Icon>
            <H4 ml="8px" mr="8px" color="#002180" >
              Processing time:
            </H4>
            <SemiSpan color='#002180' fontWeight="w500"><H4 ml="2px" color="#002180" >
              5 Working days
            </H4></SemiSpan>
          </FlexBox>
          <FlexBox>
            <Icon ml={"10px"} color="#002180">gift</Icon>

            <SemiSpan color="#002180"><H4 ml="8px" mr="8px" color="#002180">
            Registration Validity: 1 Year (Renewable):
            </H4></SemiSpan>
          </FlexBox>
        </Grid>
      </Grid>
    </Box>
  );
}
