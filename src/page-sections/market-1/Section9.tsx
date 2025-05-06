"use client";

import Box from "@component/Box";
import { Carousel } from "@component/carousel";
import { ProductCard16 } from "@component/product-cards";
import CategorySectionCreator from "@component/CategorySectionCreator";
import { H3, H5 } from "@component/Typography"; // Import H3 and H5
import Product from "@models/product.model";

// Assuming ContentColumn is a styled component or a component from your codebase
import styled from "styled-components";

// Define ContentColumn if not already defined elsewhere
const ContentColumn = styled.div`
  color: 000;
  padding: 1rem;
  margin-top: 3rem;
  display: flex;
  flex-direction: column;
  font-style: abhaya-libre;
  grid-template-columns: 1fr auto;
  align-items: left;
  margin-bottom: 1rem;
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
                    <H5>WELCOME TO THE ENTERPRISE JOURNEY PLATFORM</H5>
                    <H3 fontSize="28px" fontWeight="700" mb="1rem" mt="1rem">
                        Curated support, Trusted Partners,<br />
                        one platform.
                    </H3>
                </ContentColumn>
                <Box my="-0.25rem">
                    <Box display="flex" justifyContent="space-around" width="100%">
                        {products.slice(0, 4).map((item, ind) => (
                            <Box py="0.25rem" key={ind} width="23.5%">
                                <ProductCard16
                                    id={item.id}
                                    slug={item.slug}
                                    //unit={item.unit}
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