"use client";

import Box from "@component/Box";
import CategorySectionCreator from "@component/CategorySectionCreator";
import ProductCard20 from "@component/product-cards/ProductCard20";
import { H3 } from "@component/Typography";
import Product from "@models/product.model";
import styled from "styled-components";

// Define ContentColumn
const ContentColumn = styled.div`
  color: #000;
  padding: 1rem;
  margin-top: 3rem;
  display: flex;
  flex-direction: column;
  font-family: 'Abhaya Libre', serif;
  grid-template-columns: 1fr auto;
  align-items: left;
  margin-bottom: 1rem;
`;

const Subheading = styled.div`
  display: flex;
  gap: 1rem;
  margin: 1rem 0;
`;

const SubheadingText = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: #0030E3;
  border-bottom: 2px solid #0030E3;
`;

const Description = styled.p`
  font-size: 20px;
  font-weight: 400;
  color: #000;
  margin-bottom: 2rem;
`;

// =====================================================
type Props = { products: Product[] };
// =====================================================

export default function Section15({ products }: Props) {
    return (
        <CategorySectionCreator>
            <ContentColumn>
                <p style={{ fontSize: "18px", fontWeight: "400" }}>IN THE SPOTLIGHT</p>
                <H3 fontSize="48px" fontWeight="550" mb="1rem">
                    Discover this quarter's top-performing<br />
                    marketplaces and services.
                </H3>
                <Subheading>
                    <SubheadingText>Featured Marketplaces</SubheadingText>
                    <span style={{ fontSize: "16px", fontWeight: "500", color: "#1A1A1A" }}>Featured Services</span>
                </Subheading>
                <Description>
                    A quick look at the most active marketplaces this quarter—driven by SME demand <br></br> and partner momentum.
                </Description>
            </ContentColumn>
            <Box my="-0.25rem">
                <Box display="flex" justifyContent="flex-start" width="100%" style={{ gap: "1rem" }}>
                    {products.slice(0, 2).map((item, ind) => (
                        <Box py="0.25rem" px="0.5rem" key={ind} width="23.5%">
                            <ProductCard20
                                id={item.id}
                                slug={item.slug}
                                subTitle={item.subTitle}
                                title={item.title}
                                price={item.price}
                                off={item.discount}
                                rating={item.rating}
                                images={item.images}
                                imgUrl={item.thumbnail}
                            />
                        </Box>
                    ))}
                </Box>
            </Box>
        </CategorySectionCreator>
    );
}