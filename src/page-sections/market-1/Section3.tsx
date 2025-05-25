"use client;"
import Link from "next/link";
import { Carousel } from "@component/carousel";
import ProductCard6 from "@component/product-cards/ProductCard6";
// API FUNCTIONS
import api from "@utils/__api__/market-1";
import FlexBox from "@component/FlexBox";
import { H1, H5 } from "@component/Typography";
import { Button } from "@component/buttons";
import Box from "@component/Box";
import { colors } from "theme/colors/colors";
import { FullWrapper, Wrapper } from "@component/footer/footer-2/styles";


export default async function Section3() {
  const categoryList = await api.getTopCategories();

  const responsive = [
    { breakpoint: 959, settings: { slidesToShow: 2 } },
    { breakpoint: 650, settings: { slidesToShow: 1 } }
  ];

  return (
    // <CategorySectionCreator >
    <div>
      <FullWrapper  bg="linear-gradient(180deg, #FFF 0%, #FDFDFF 9.41%, #F7F8FE 17.07%, #EDF0FD 23.24%, #E0E6FC 28.21%, #D1D9FA 32.23%, #BFCBF8 35.57%, #ABBBF6 38.51%, #96AAF4 41.31%, #8098F1 44.25%, #6A86EF 47.6%, #5373EC 51.62%, #3D61EA 56.58%, #2750E7 62.76%, #133FE5 70.41%, #0030E3 79.82%)">
        <FlexBox flexDirection={"column"} padding="0px 80px 50px 80px" backgroundColor={colors.primary.gradient}>
          <FlexBox alignItems={"end"} justifyContent={"space-between"} flexDirection={"row"} marginBottom={"20px"} >
            <FlexBox alignItems={"flex-start"} justifyContent={"space-between"} flexDirection={"column"}>
              <H5 color={"#000000"} fontFamily="Helvetica Neue">HOW IT WORKS</H5>
              <H1 marginBottom={"1.5rem"} marginTop={"1.5rem"} color={"#0030e3"} fontFamily="FS Kim Trial">Getting started is easy</H1>
              <H5 color={"#000000"} fontFamily="Helvetica Neue" >Browse available marketplaces, find services tailored to your business needs, and unlock growth opportunities—all<br>
              </br> through one platform.</H5>
            </FlexBox>
            <FlexBox alignItems={"flex-end"} justifyContent={"flex-end"} mb={"1rem"}>
              <Link href="/signup">
                <Button className="SignUp" variant="contained" color="primary" fullwidth>Sign Up</Button>
              </Link>
            </FlexBox>
          </FlexBox>
          <FlexBox>
            <Box mr={"2rem"} mb={"2rem"} borderBottom={"1px solid #ffffff"} padding={"1rem"}>Getting Started as an Entrepreneur</Box>
            <Box padding={"1rem"}>Getting Started as a Partner</Box>
          </FlexBox>
          <Carousel slidesToShow={2} responsive={responsive}>
            {categoryList.map((item, ind) => (
              <Link href={`/product/search/${item.slug}`} key={ind}>
                <ProductCard6 title={item.name} imgUrl={item.image} subtitle={item.description} />
              </Link>
            ))}
          </Carousel>
        </FlexBox>
      </FullWrapper>
    </div>
    //   </CategorySectionCreator>
  );
}
