"use client";

import Card from "@component/Card";
import Grid from "@component/grid/Grid";
import NavLink from "@component/nav-link";
import { H3 } from "@component/Typography";
import Container from "@component/Container";
import { ProductCard19 } from "@component/product-cards";
import { useState, useEffect } from "react";
import client from "@lib/graphQLClient";

// STYLED COMPONENTS
import { List, ListItem, DropdownIcon, DropdownText, CheckboxLabel, ServiceTypeTitle, ShowingText } from "./styles";

// GraphQL Query
const GET_PRODUCTS = `
  query GetProducts($skip: Int!, $take: Int!) {
    products(options: { skip: $skip, take: $take }) {
      items {
        id
        name
        slug
        description
        facetValues {
          facet {
            id
            name
            code
          }
          id
          name
          code
        }
      }
      totalItems
    }
  }
`;

interface FacetValue {
  facet: {
    id: string;
    name: string;
    code: string;
  };
  id: string;
  name: string;
  code: string;
}

interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  facetValues: FacetValue[];
}

interface GetProductsData {
  products: {
    items: Product[];
    totalItems: number;
  };
}

interface GetProductsVariables {
  skip: number;
  take: number;
}

export default function Section6() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const productsPerPage = 9;

  // State for Business Stage filters
  const [businessStageFilters, setBusinessStageFilters] = useState({
    inception: false,
    growth: false,
    maturity: false,
    restructuring: false,
    other: false,
  });

  const defaultImage = "/assets/images/mzn_logos/mzn_logo.png";
  const defaultImages = [defaultImage];
  const defaultReviews = 0;
  const defaultSubtitle = "Khalifa Funds";

  // Fetch products data on component mount or page change
  useEffect(() => {
    const fetchData = async () => {
      console.log("Fetching data from GraphQL...");
      try {
        const data = await client.request<GetProductsData, GetProductsVariables>(GET_PRODUCTS, {
          skip: (currentPage - 1) * productsPerPage,
          take: productsPerPage,
        });
        console.log("Data fetched successfully:", data);
        setProducts(data.products.items);
        setTotalItems(data.products.totalItems);
        // Initially, show all products
        setFilteredProducts(data.products.items);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  }, [currentPage]);

  // Apply filters whenever products or businessStageFilters change
  useEffect(() => {
    const selectedStages = Object.keys(businessStageFilters)
      .filter((key) => businessStageFilters[key])
      .map((key) => key.charAt(0).toUpperCase() + key.slice(1)); // Capitalize first letter

    if (selectedStages.length === 0) {
      // If no filters are selected, show all products
      setFilteredProducts(products);
    } else {
      // Filter products based on selected Business Stages
      const filtered = products.filter((product) =>
        product.facetValues.some(
          (facetValue) =>
            facetValue.facet.code === "business-stage" &&
            selectedStages.includes(facetValue.name)
        )
      );
      setFilteredProducts(filtered);
    }
  }, [products, businessStageFilters]);

  // Handle checkbox changes for Business Stage filters
  const handleBusinessStageChange = (stage: keyof typeof businessStageFilters) => {
    setBusinessStageFilters((prev) => ({
      ...prev,
      [stage]: !prev[stage],
    }));
    setCurrentPage(1); // Reset to first page when filters change
  };

  // Calculate the total number of pages based on filtered products
  const totalPages = Math.ceil(totalItems / productsPerPage);

  // Slice the filtered products to show on the current page
  const currentProducts = filteredProducts.slice(
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
    <Container pt="4rem" style={{ marginTop: '-45px' }}>
      <Grid container spacing={3}>
        {/* Sidebar */}
        <Grid item md={3} xs={12}>
          <Card
            elevation={0}
            style={{
              border: 0,
              height: "92%",
              borderRadius: "3px",
              padding: "1rem 2rem",
              backgroundColor: "#F4F7FE"
            }}>
            <List>
              <ServiceTypeTitle>Service Type</ServiceTypeTitle>
            </List>
            <List>
              <ServiceTypeTitle>Business Stage :</ServiceTypeTitle>
              <CheckboxLabel>
                <input
                  type="checkbox"
                  id="inception"
                  checked={businessStageFilters.inception}
                  onChange={() => handleBusinessStageChange("inception")}
                />
                <label htmlFor="inception">Inception</label>
              </CheckboxLabel>
              <CheckboxLabel>
                <input
                  type="checkbox"
                  id="growth"
                  title="Growth"
                  checked={businessStageFilters.growth}
                  onChange={() => handleBusinessStageChange("growth")}
                />
                <label htmlFor="growth">Growth</label>
              </CheckboxLabel>
              <CheckboxLabel>
                <input
                  type="checkbox"
                  id="maturity"
                  checked={businessStageFilters.maturity}
                  onChange={() => handleBusinessStageChange("maturity")}
                />
                <label htmlFor="maturity">Maturity</label>
              </CheckboxLabel>
              <CheckboxLabel>
                <input
                  type="checkbox"
                  id="restructuring"
                  title="Restructuring"
                  checked={businessStageFilters.restructuring}
                  onChange={() => handleBusinessStageChange("restructuring")}
                />
                <label htmlFor="restructuring">Restructuring</label>
              </CheckboxLabel>
              <CheckboxLabel>
                <input
                  type="checkbox"
                  id="other"
                  checked={businessStageFilters.other}
                  onChange={() => handleBusinessStageChange("other")}
                />
                <label htmlFor="other">Other</label>
              </CheckboxLabel>
            </List>

            <List>
              <ServiceTypeTitle>Provided By :</ServiceTypeTitle>
              <CheckboxLabel>
                <input type="checkbox" id="adgm" title="ADGM" />
                <label htmlFor="adgm">ADGM</label>
              </CheckboxLabel>
              <CheckboxLabel>
                <input type="checkbox" id="khalifa-fund" title="Khalifa Fund" />
                <label htmlFor="khalifa-fund">Khalifa Fund</label>
              </CheckboxLabel>
              <CheckboxLabel>
                <input type="checkbox" id="hub71" />
                <label htmlFor="hub71">Hub 71</label>
              </CheckboxLabel>
              <CheckboxLabel>
                <input type="checkbox" id="unspecified" title="Unspecified" />
                <label htmlFor="unspecified">Unspecified</label>
              </CheckboxLabel>
              <CheckboxLabel>
                <input type="checkbox" id="other-checkbox" title="Other" />
                <label htmlFor="other-checkbox">Other</label>
              </CheckboxLabel>
            </List>

            <List>
              <ServiceTypeTitle>Pricing Model :</ServiceTypeTitle>
              <CheckboxLabel>
                <input type="checkbox" id="free" title="Free" />
                <label htmlFor="free">Free</label>
              </CheckboxLabel>
              <CheckboxLabel>
                <input type="checkbox" title="Subscription-Based" />
                <label htmlFor="subscription-based">Subscription-Based</label>
              </CheckboxLabel>
              <CheckboxLabel>
                <input type="checkbox" id="pay-per-service" />
                <label htmlFor="pay-per-service">Pay Per Service</label>
              </CheckboxLabel>
              <CheckboxLabel>
                <input type="checkbox" id="one-time-fee" title="One-Time Fee" />
                <label htmlFor="one-time-fee">One-Time Fee</label>
              </CheckboxLabel>
              <CheckboxLabel>
                <input type="checkbox" id="government-subsidised" title="Government Subsidised" />
                <label htmlFor="government-subsidised">Government Subsidised</label>
              </CheckboxLabel>
            </List>
          </Card>
          <ShowingText>Showing {(currentPage - 1) * productsPerPage + 1}-{Math.min(currentPage * productsPerPage, totalItems)} of {totalItems} Services</ShowingText>
        </Grid>

        {/* CATEGORY BASED PRODUCTS */}
        <Grid item md={9} xs={12}>
          <Grid container spacing={3}>
            {currentProducts.map((product) => (
              <Grid item md={4} sm={6} xs={12} key={product.id}>
                <ProductCard19
                  id={product.id}
                  slug={product.slug}
                  name={product.name}
                  subTitle={defaultSubtitle}
                  description={product.description}
                  img={defaultImage}
                  images={defaultImages}
                  reviews={defaultReviews}
                  className="product-card"
                />
              </Grid>
            ))}
          </Grid>

          {/* Pagination */}
          <div style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            marginTop: "1rem",
            marginBottom: "2rem"
          }}>
            <button
              onClick={() => handlePagination("prev")}
              disabled={currentPage === 1}
              style={{
                border: "1px solid #002180",
                borderRadius: "50%",
                padding: "0.5rem",
                margin: "0 0.5rem",
                backgroundColor: "transparent",
                cursor: "pointer"
              }}>
              <img src="assets/images/avatars/chevron-right.svg" alt="Previous" />
            </button>

            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                style={{
                  border: "1px solid #002180",
                  borderRadius: "50%",
                  padding: "0.5rem 1rem",
                  margin: "0 0.5rem",
                  backgroundColor: currentPage === index + 1 ? "#002180" : "transparent",
                  color: currentPage === index + 1 ? "#fff" : "#002180",
                  cursor: "pointer"
                }}
              >
                {index + 1}
              </button>
            ))}

            <button
              onClick={() => handlePagination("next")}
              disabled={currentPage === totalPages}
              style={{
                border: "1px solid #002180",
                borderRadius: "50%",
                padding: "0.5rem",
                margin: "0 0.5rem",
                backgroundColor: "transparent",
                cursor: "pointer"
              }}>
              <img src="assets/images/avatars/chevron-left.svg" alt="Next" />
            </button>
          </div>
        </Grid>
      </Grid>
    </Container>
  );
}