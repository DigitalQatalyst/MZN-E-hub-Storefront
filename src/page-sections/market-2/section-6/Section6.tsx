"use client";

import Card from "@component/Card";
import Grid from "@component/grid/Grid";
import NavLink from "@component/nav-link";
import { H3 } from "@component/Typography";
import Container from "@component/Container";
import { ProductCard19 } from "@component/product-cards";
import { CategoryBasedProducts } from "@models/market-2.model";
import { useState } from "react";

// STYLED COMPONENTS
import { List, ListItem } from "./styles";

// ======================================================================
// Define the types more explicitly
type Props = {
  data: CategoryBasedProducts;
};

// ======================================================================

export default function Section6({ data }: Props) {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 9;

  // Calculate the total number of pages
  const totalPages = Math.ceil(data.products.length / productsPerPage);

  // Slice the products to show on the current page
  const currentProducts = data.products.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  const handlePagination = (direction: "next" | "prev") => {
    if (direction === "next" && currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    } else if (direction === "prev" && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <Container pt="4rem">
      <Grid container spacing={3}>
        {/* Sidebar */}
        <Grid item md={3} xs={12}>
          <Card
            elevation={0}
            style={{
              border: 0,
              height: "100%",
              borderRadius: "3px",
              padding: "1rem 2rem"
            }}>
            {/* MAIN CATEGORY NAME/TITLE */}
            <H3>{data.category.title}</H3>

            {/* SUB CATEGORY LIST */}
            <List>
              {data.category.children.map((item, index) => (
                <ListItem key={index}>{item}</ListItem> // Use index as a key if item itself is not unique
              ))}
            </List>

            <NavLink href="#">Browse All</NavLink>
          </Card>
        </Grid>

        {/* CATEGORY BASED PRODUCTS */}
        <Grid item md={9} xs={12}>
          <Grid container spacing={3}>
            {currentProducts.map((product) => (
              <Grid item md={4} sm={6} xs={12} key={product.id}>
                <ProductCard19
                  id={product.id}
                  slug={product.slug}
                  name={product.title}
                  price={product.price}
                  img={product.thumbnail}
                  images={product.images as string[]}
                  reviews={product.reviews?.length || 14}
                  className="product-card" 
                />
              </Grid>
            ))}
          </Grid>

          {/* Pagination */}
          <div style={{ display: "flex", justifyContent: "center", marginTop: "1rem" }}>
            <button onClick={() => handlePagination("prev")} disabled={currentPage === 1}>
              Prev
            </button>
            <span style={{ margin: "0 1rem" }}>
              {currentPage} of {totalPages}
            </span>
            <button onClick={() => handlePagination("next")} disabled={currentPage === totalPages}>
              Next
            </button>
          </div>
        </Grid>
      </Grid>
    </Container>
  );
}
