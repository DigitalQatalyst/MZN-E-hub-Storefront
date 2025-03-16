import Link from "next/link";
import { Carousel } from "@component/carousel";
import ProductCard6 from "@component/product-cards/ProductCard6";
import CategorySectionCreator from "@component/CategorySectionCreator";
// API FUNCTIONS
import api from "@utils/__api__/market-1";
import FlexBox from "@component/FlexBox";
import { H1, H5 } from "@component/Typography";
import { Button } from "@component/buttons";
import { justifyContent } from "styled-system";
import Box from "@component/Box";
import { colors } from "theme/colors/colors";
import NextImage from "@component/NextImage";

export default async function Section3() {
  const categoryList = await api.getTopCategories();

  const responsive = [
    { breakpoint: 959, settings: { slidesToShow: 2 } },
    { breakpoint: 650, settings: { slidesToShow: 1 } }
  ];

  return (
    <CategorySectionCreator >
      {/* <NextImage src={"/images/image_50.png"} width={345} height={120} alt="bonik" /> */}
      <FlexBox flexDirection={"column"} padding={"2rem"} backgroundColor={colors.primary.gradient}>
        <FlexBox alignItems={"end"} justifyContent={"space-between"} flexDirection={"row"} marginBottom={"20px"} >
          <FlexBox alignItems={"flex-start"} justifyContent={"space-between"} flexDirection={"column"}>
            <H5>HOW IT WORKS</H5>
            <H1 marginBottom={"1.5rem"} marginTop={"1.5rem"}>Getting started is easy</H1>
            <H5>Upon gaining access to MZN’s WebApp, your initial task involves selecting a service <br />
            that is suitable for your business</H5>
          </FlexBox>

          <FlexBox alignItems={"flex-end"} justifyContent={"flex-end"} mb={"1rem"}>
            <Link href="/signup">
            <Button className="SignUp" variant="contained" color="primary" fullwidth>Sign Up</Button>
            </Link>
          </FlexBox>
        </FlexBox>
        <FlexBox>
          <Box mr={"2rem"} mb={"2rem"} borderBottom={"1px solid black"} padding={"1rem"}>Getting Started as an Entrepreneur</Box>
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
    </CategorySectionCreator>
  );
}
