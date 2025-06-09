"use client";

import Box from "@component/Box";
import { Carousel } from "@component/carousel";
import { ProductCard16 } from "@component/product-cards";
import CategorySectionCreator from "@component/CategorySectionCreator";
import { H3, H4, H5 } from "@component/Typography"; // Import H3 and H5
import Product from "@models/product.model";

// Assuming ContentColumn is a styled component or a component from your codebase
import styled from "styled-components";

// Define ContentColumn
const ContentColumn = styled.div`
  color: 000;
  padding: 10px 10px 10px 80px;
  margin-top: 3rem;
  display: flex;
  flex-direction: column;
  font-style: abhaya-libre;
  grid-template-columns: 1fr auto;
  align-items: left;
  margin-bottom: 1rem;
`;

const StyledHeader = styled.p`
  color: #000;
  font-family: "FS Kim Trial";
  font-size: 48px;
  font-style: normal;
  font-weight: 400;
  line-height: var(--Display-Medium-Line-Height, 52px); /* 108.333% */
  letter-spacing: var(--Display-Medium-Tracking, 0px);
  margin-bottom: 1rem;
  margin-top: 1rem;
`;

// Define CardsContainer to match ContentColumn padding
const CardsContainer = styled(Box)`
  padding: 10px 80px 10px 80px;
`;

// =====================================================
type Props = { products: Product[] };
// =====================================================

export default function Section9({ products }: Props) {
    const responsive = [
        { breakpoint: 650, settings: { slidesToShow: 2 } },
        { breakpoint: 500, settings: { slidesToShow: 1 } }
    ];

    return (
        <CategorySectionCreator>
            <ContentColumn>
                <p
                    style={{
                        color: "#000",
                        fontFamily: "Helvetica Neue",
                        fontSize: "16px",
                        fontStyle: "normal",
                        fontWeight: 400,
                        lineHeight: "var(--Title-Large-Line-Height, 28px)",
                        letterSpacing: "var(--Title-Large-Tracking, 0px)",
                        textTransform: "uppercase",
                    }}
                >
                    WELCOME TO THE ENTERPRISE JOURNEY PLATFORM
                </p>
                <StyledHeader>
                    We help businesses find the right partners to<br />
                    get started, grow, and succeed
                </StyledHeader>
            </ContentColumn>
            <CardsContainer my="-0.25rem">
                <Box display="flex" justifyContent="space-around" width="100%">
                    {products.slice(0, 4).map((item, ind) => (
                        <Box py="0.25rem" key={ind} width="23.5%">
                            <ProductCard16
                                id={item.id}
                                slug={item.slug}
                                //unit={item.unit}
                                subTitle={item.subTitle}
                                title={item.title}
                                title1={item.title1}
                                price={item.price}
                                off={item.discount}
                                rating={item.rating}
                                images={item.images}
                                imgUrl={item.thumbnail}
                            />
                        </Box>
                    ))}
                </Box>
            </CardsContainer>
        </CategorySectionCreator>
    );
}