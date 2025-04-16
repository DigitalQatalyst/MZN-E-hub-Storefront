import Box from "@component/Box";
import { Carousel } from "@component/carousel";
import ProductCard1 from "@component/product-cards/ProductCard1";
import CategorySectionCreator from "@component/CategorySectionCreator";
// API FUNCTIONS
import api from "@utils/__api__/market-1";
import { FullWrapper, Wrapper } from "@component/footer/footer-2/styles";
import { ProductCard19 } from "@component/product-cards";

export default async function Section2() {
  const products = await api.getFlashDeals();

  const responsive = [
    { breakpoint: 1279, settings: { slidesToShow: 4 } },
    { breakpoint: 959, settings: { slidesToShow: 3 } },
    { breakpoint: 650, settings: { slidesToShow: 2 } },
    { breakpoint: 500, settings: { slidesToShow: 1 } }
  ];
  console.log(products);
  return (
    // <Wrapper>
    <CategorySectionCreator title="Featured Services" >
      <Box mt="2rem" mb="-0.25rem">
        <Carousel slidesToShow={4} responsive={responsive}>
          {products.map((item, ind) => (
            <Box py="3rem" key={ind}>
              <ProductCard1
                key={ind}
                id={item.id}
                slug={item.slug}
                price={item.price}
                title={item.title}
                off={item.discount}
                images={item.images}
                imgUrl={item.thumbnail}
                rating={item.rating || 4}
              />
            </Box>
          ))}
        </Carousel>
      </Box>
    </CategorySectionCreator>
    // </Wrapper>

  );
}
