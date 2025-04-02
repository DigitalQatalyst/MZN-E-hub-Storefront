"use client";

import Card from "@component/Card";
import Grid from "@component/grid/Grid";
import NavLink from "@component/nav-link";
import { H3 } from "@component/Typography";
import Container from "@component/Container";
import { ProductCard19 } from "@component/product-cards";
import { CategoryBasedProducts } from "@models/market-2.model";
import { useState, useEffect } from "react";
// Import the reusable GraphQL client
import client from "@lib/graphQLClient" // Path to the GraphQLClient.ts file


// STYLED COMPONENTS
import { List,ListItem, DropdownIcon, DropdownText, CheckboxLabel, ServiceTypeTitle, ShowingText } from "./styles";

// ======================================================================
// Define the GraphQL query
const GET_PRODUCTS = `
  query GetProducts($skip: Int!, $take: Int!) {
    products(options: { skip: $skip, take: $take }) {
      items {
        id
        name
        slug
        description
      }
    }
  }
`;

interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
}

interface GetProductsData {
  products: {
    items: Product[];
  };
}

interface GetProductsVariables {
  skip: number;
  take: number;
}

// ======================================================================

export default function Section6() {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 9;

  // Constants for fallback data
  const defaultImage = "/assets/images/mzn_logos/mzn_logo.png";
  const defaultImages = [defaultImage]; 
  const defaultReviews = 0; // Default review count if not provided
  const defaultSubtitle = "Khalifa Funds"; // Default subtitle if not provided

  // Fetch products data on component mount
  useEffect(() => {
    const fetchData = async () => {
      console.log("Fetching data from GraphQL...");  // Log message for debugging
      try {
        const data = await client.request<GetProductsData, GetProductsVariables>(GET_PRODUCTS, {
          skip: (currentPage - 1) * productsPerPage, // calculate which items to skip
          take: productsPerPage, // define how many items to take
        });
        console.log("Data fetched successfully:", data);  // Log the fetched data
        setProducts(data.products.items);  // Update state with fetched products
      } catch (error) {
        console.error("Error fetching products:", error);  // Log errors
      }
    };

    fetchData();  // Call the function to fetch data
  }, [currentPage]);  // Re-run when `currentPage` changes


  // Calculate the total number of pages
  const totalPages = Math.ceil(products.length / productsPerPage);

  // Slice the products to show on the current page
  const currentProducts = products.slice(
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

  // Declare 'setOpen' here inside the component
  // const [open, setOpen] = useState({
  //   advisory: false,
  //   funding: false,
  //   procurement: false,
  //   businessOperation: false,
  //   training: false
  // });

  // Mock data for dropdown sections
  // const mockData = {
  //   advisory: ["Legal", "Compliance", "Financial"],
  //   funding: ["Government Funding", "Private Funding", "Crowdfunding"],
  //   procurement: ["Vendor Selection", "Contract Negotiation", "Purchase Orders"],
  //   businessOperation: ["Process Optimization", "Cost Control", "Performance Metrics"],
  //   training: ["Leadership Training", "Technical Training", "Compliance Training"]
  // };

  // const toggleDropdown = (service: string) => {
  //   setOpen((prev) => ({ ...prev, [service]: !prev[service] }));
  // };

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
            {/* MAIN CATEGORY NAME/TITLE */}
            {/* <H3>Service Type</H3> */}

            {/* SUB CATEGORY LIST */}
            <List>
             <ServiceTypeTitle>Service Type</ServiceTypeTitle>
              {/* {Object.keys(mockData).map((service) => (
                <div key={service}>
                  <ListItem onClick={() => toggleDropdown(service)}>
                    <span>{service.charAt(0).toUpperCase() + service.slice(1)}</span>
                    <DropdownIcon src="assets/images/avatars/dropdown.svg" alt="dropdown" />
                  </ListItem>
                  {open[service] && (
                    <div>
                    {mockData[service].map((item, index) => (
                      <DropdownText key={index}>{item}</DropdownText>
                    ))}
                  </div>
                  )}
                </div>
              ))} */}
            </List>
            <List>
              <ServiceTypeTitle>Business Stage :</ServiceTypeTitle>
              <CheckboxLabel>
                <input type="checkbox" />
                <span>Inception</span>
              </CheckboxLabel>
              <CheckboxLabel>
                <input type="checkbox" />
                <span>Growth</span>
              </CheckboxLabel>
              <CheckboxLabel>
                <input type="checkbox" />
                <span>Maturity</span>
              </CheckboxLabel>
              <CheckboxLabel>
                <input type="checkbox" />
                <span>Restructuring</span>
              </CheckboxLabel>
              <CheckboxLabel>
                <input type="checkbox" />
                <span>Other</span>
              </CheckboxLabel>
            </List>

            <List>
              <ServiceTypeTitle>Provided By :</ServiceTypeTitle>
              <CheckboxLabel>
                <input type="checkbox" />
                <span>ADGM</span>
              </CheckboxLabel>
              <CheckboxLabel>
                <input type="checkbox" />
                <span>Khalifa Fund</span>
              </CheckboxLabel>
              <CheckboxLabel>
                <input type="checkbox" />
                <span>Hub 71</span>
              </CheckboxLabel>
              <CheckboxLabel>
                <input type="checkbox" />
                <span>AD SME Hub</span>
              </CheckboxLabel>
              <CheckboxLabel>
                <input type="checkbox" />
                <span>Other</span>
              </CheckboxLabel>
            </List>

            <List>
            <ServiceTypeTitle>Pricing Model :</ServiceTypeTitle>
              <CheckboxLabel>
                <input type="checkbox" />
                <span>Free</span>
              </CheckboxLabel>
              <CheckboxLabel>
                <input type="checkbox" />
                <span>Subscription-Based</span>
              </CheckboxLabel>
              <CheckboxLabel>
                <input type="checkbox" />
                <span>Pay Per Service</span>
              </CheckboxLabel>
              <CheckboxLabel>
                <input type="checkbox" />
                <span>One-Time Fee</span>
              </CheckboxLabel>
              <CheckboxLabel>
                <input type="checkbox" />
                <span>Government Subsidised</span>
              </CheckboxLabel>
            </List>


            {/* <NavLink href="#">Browse All</NavLink> */}
          </Card>
          <ShowingText>Showing 1-9 of 90 Services</ShowingText>
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
                  img={defaultImage}  // Using default image logic
                  images={defaultImages}  // Using default images array
                  reviews={defaultReviews}  // Default reviews value
                  className="product-card"
                />
              </Grid>
            ))}
          </Grid>

          {/* Pagination */}
          <div style={{
            display: "flex",
            justifyContent: "flex-end", // Align pagination to the far right
            alignItems: "center",
            marginTop: "1rem",
            marginBottom: "2rem"
          }}>
            {/* Prev Button */}
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

            {/* Page Numbers */}
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

            {/* Next Button */}
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
