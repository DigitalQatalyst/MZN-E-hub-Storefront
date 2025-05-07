"use client";

import Box from "@component/Box";
import { Carousel } from "@component/carousel";
import { ProductCard19 } from "@component/product-cards";
import CategorySectionCreator from "@component/CategorySectionCreator";
// API FUNCTIONS
import api from "@utils/__api__/market-1";
import { FullWrapper, Wrapper } from "@component/footer/footer-2/styles";

export default async function Section2() {
  const products = await api.getFlashDeals();

  const responsive = [
    { breakpoint: 1279, settings: { slidesToShow: 4 } },
    { breakpoint: 959, settings: { slidesToShow: 3 } },
    { breakpoint: 650, settings: { slidesToShow: 2 } },
    { breakpoint: 500, settings: { slidesToShow: 1 } }
  ];

  return (
    <CategorySectionCreator title="Featured Services">
      <Box mt="2rem" mb="-0.25rem">
        <Carousel slidesToShow={4} responsive={responsive}>
          {products.map((item) => (
            <Box py="3rem" key={item.id}>
              <ProductCard19
                id={item.id}
                slug={item.slug}
                name={item.title}
                subTitle={item.subTitle}
                description={item.description}
                img={item.thumbnail}
                images={item.images as string[]}
                reviews={item.reviews || 12}
                className="product-card"
              />
            </Box>
          ))}
        </Carousel>
      </Box>
    </CategorySectionCreator>
  );
}