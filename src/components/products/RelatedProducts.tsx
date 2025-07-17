import Box from "@component/Box";
import Grid from "@component/grid/Grid";
import { H3 } from "@component/Typography";
// import { ProductCard19 } from "@component/product-cards";
import Product from "@models/product.model";

// ============================================================
type Props = { products: Product[] };
// ============================================================

export default function RelatedProducts({ products }: Props) {
  return (
    <Box mb="3.75rem">
      <H3 mb="1.5rem">Related Services</H3>

      <Grid container spacing={8}>
        {products.slice(0, 3).map((item) => (  // Display only the first 3 items
          <Grid item lg={4} md={4} sm={6} xs={12} key={item.id}>  {/* Adjusted for 3 items */}
            {/* <ProductCard19
              id={item.id}
              slug={item.slug}
              name={item.title}
              subTitle={item.subTitle}
              description={item.description}
              img={item.thumbnail}
              images={item.images as string[]}
              reviews={item.reviews?.length || 12}
              className="product-card"
            /> */}
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
