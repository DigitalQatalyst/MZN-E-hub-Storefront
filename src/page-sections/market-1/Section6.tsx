"use client";

import { useState } from "react";

import Box from "@component/Box";
import Hidden from "@component/hidden";
import Grid from "@component/grid/Grid";
import FlexBox from "@component/FlexBox";
import Container from "@component/Container";
import NextImage from "@component/NextImage";
import { ProductCard1 } from "@component/product-cards";
import CategorySectionHeader from "@component/CategorySectionHeader";
import StyledProductCategory from "./styled";
import Brand from "@models/Brand.model";
import Product from "@models/product.model";

// ==============================================================
type Props = { carList: Product[]; carBrands: Brand[] };
// ==============================================================

export default function Section6({ carList, carBrands }: Props) {
  const [selected, setSelected] = useState("");

  const MZNCommunities = [{
    id: "green-sme-network", // <-- added id
    name: "Green SME Network",
    members: "3.2K Members",
    category: "Sustainability",
    imageSrc: "/images/image 1.jpg",
    link: "/community/green-sme-network",
  },
  {
    id: "fintech-growth-circle", // <-- added id
    name: "FinTech Growth Circle",
    members: "3.2K Members",
    category: "Finance",
    imageSrc: "/images/image 2.png",
    link: "/community/fintech-growth-circle",
  },
  {
    id: "women-led-enterprises", // <-- added id
    name: "Women-Led Enterprises",
    members: "3.2K Members",
    category: "Leadership",
    imageSrc: "/images/image 3.png",
    link: "/community/women-led-enterprises",
  },
  {
    id: "digital-transformation-for-smes", // <-- added id
    name: "Digital Transformation for SMEs",
    members: "3.2K Members",
    category: "E-commerce",
    imageSrc: "/images/image 4.png",
    link: "/community/digital-transformation-for-smes",
  },
  {
    id: "youth-innovation-network", // <-- added id
    name: "Youth Innovation Network",
    members: "3.2K Members",
    category: "Innovation",
    imageSrc: "/images/image 5.png",
    link: "/community/youth-innovation-network",
  },
  {
    id: "export-ready-smes-hub", // <-- added id
    name: "Export-Ready SMEs Hub",
    members: "3.2K Members",
    category: "Supply Chain",
    imageSrc: "/images/image 6.png",
    link: "/community/export-ready-smes-hub",
  },
  {
    id: "sme-policy-regulation-hub", // <-- added id
    name: "SME Policy & Regulation Hub",
    members: "3.2K Members",
    category: "Policy",
    imageSrc: "/images/image 7.png",
    link: "/community/sme-policy-regulation-hub",
  },
  {
    id: "sell-beyond-uae", // <-- added id
    name: "Sell Beyond UAE",
    members: "3.2K Members",
    category: "Global Markets",
    imageSrc: "/images/image 8.png",
    link: "/community/sell-beyond-uae",
  },
  {
    id: "logistics-exporters-network", // <-- added id
    name: "Logistics & Exporters Network",
    members: "3.2K Members",
    category: "Supply Chain",
    imageSrc: "/images/image 9.png",
    link: "/community/logistics-exporters-network",
  }]
  const handleCategoryClick = (brand: Brand) => () => {
    if (selected === brand.slug) setSelected("");
    else setSelected(brand.slug);
  };

  return (
    <Container mb="4.5rem">
      <FlexBox>
        <Hidden down={768} mr="1.75rem">
          <Box shadow={6} borderRadius={10} padding="1.25rem" bg="white">
            {/* {carBrands.map((brand) => (
              <StyledProductCategory
                mb="0.75rem"
                id={brand.id}
                key={brand.id}
                title={brand.name}
                onClick={handleCategoryClick(brand)}
                shadow={selected === brand.slug ? 4 : null}
                bg={selected === brand.slug ? "white" : "gray.100"}>
                <Box width={20} height={20}>
                  <NextImage width={20} height={20} alt="apple" src={brand.image} />
                </Box>

                <span className="product-category-title">{brand.name}</span>
              </StyledProductCategory>
            ))} */}

<StyledProductCategory>
  <Box display="flex" flexDirection="column" alignItems="flex-start" marginBottom={3}>
    <span style={{
      fontSize: '14px',
      fontWeight: 600,
      marginBottom: '8px',
      color: '#000000'  // dark text for headings
    }}>
      Explore
    </span>
    <Box 
      display="flex" 
      alignItems="center" 
      marginTop={1} 
      padding="8px"
      borderRadius="8px"
      width="100%"
      maxWidth="280px"
    >
      <Box width={24} height={24} marginRight={2} display="flex" justifyContent="center" alignItems="center">
        <NextImage width={24} height={24} alt="explore-icon" src="/images/Avatar (2).png" />
      </Box>
      <span style={{ fontSize: '12px', color: '#212121', fontWeight: 600 }}>
        Communities
      </span>
    </Box>
  </Box>
</StyledProductCategory>

<StyledProductCategory>
  <Box display="flex" flexDirection="column" alignItems="flex-start" marginBottom={4}>
    <span style={{ fontSize: '14px', fontWeight: 600, marginBottom: '8px', color: '#000' }}>
      Favourites
    </span>
    <Box 
      display="flex" 
      alignItems="center" 
      marginTop={1} 
      padding="12px"
      borderRadius="8px"
      width="100%"
      maxWidth="280px"
    >
      <Box width={24} height={24} marginRight={2} display="flex" justifyContent="center" alignItems="center">
        <NextImage width={24} height={24} alt="favourites-icon" src="/images/Avatar (3).png" />
      </Box>
      <span style={{ fontSize: '12px', color: '#6C757D', fontWeight: 400 }}>
        Keep your favorites at your fingertips. Favorites will appear here.
      </span>
    </Box>
  </Box>
</StyledProductCategory>

<StyledProductCategory>
  <Box display="flex" flexDirection="column" alignItems="flex-start" marginBottom={4}>
    <span style={{ fontSize: '14px', fontWeight: 600, marginBottom: '8px', color: '#000' }}>
      Communities
    </span>
    <Box 
      display="flex" 
      alignItems="center" 
      marginTop={1} 
      padding="12px"
      borderRadius="8px"
      width="100%"
      maxWidth="280px"
    >
      <Box width={24} height={24} marginRight={2} display="flex" justifyContent="center" alignItems="center">
        <NextImage width={24} height={24} alt="communities-icon" src="/images/Avatar (2).png" />
      </Box>
      <span style={{ fontSize: '12px', color: '#6C757D', fontWeight: 400 }}>
        No communities yet
      </span>
    </Box>
  </Box>
</StyledProductCategory>

<StyledProductCategory
  id="all"
  mt="2rem"
  shadow={selected.match("all") ? 4 : null}
  bg="transparent"
  p="0"
>
  <span 
    id="all" 
    className="product-category-title" 
    style={{ 
      fontSize: '14px', 
      fontWeight: 600, 
      color: '#0061F2',  // Blue color for text
      textDecoration: 'underline',
      marginTop: '20px',
      cursor: 'pointer'
    }}
  >
    Discover communities
  </span>
</StyledProductCategory>





          </Box>
        </Hidden>

        <Box flex="1 1 0" minWidth="0px">
          <CategorySectionHeader title="" seeMoreLink="#" />
          <CategorySectionHeader title="" seeMoreLink="#" />

          <Grid container spacing={6}>
            {MZNCommunities.map((item, ind) => (
            {MZNCommunities.map((item, ind) => (
              <Grid item lg={4} sm={6} xs={12} key={ind}>
                <ProductCard1
                  hoverEffect
                  id={item.id}
                  name={item.name}
                  memberCount={item.members}
                  imageSrc={item.imageSrc}
                  link={item.link}
                  category={item.category}
                  name={item.name}
                  memberCount={item.members}
                  imageSrc={item.imageSrc}
                  link={item.link}
                  category={item.category}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      </FlexBox>
    </Container>
  );
}
