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
        customFields {
          partner
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
  customFields: {
    partner: string;
  };
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

  // State for Provided By filters
  const [providedByFilters, setProvidedByFilters] = useState({
    adgm: false,
    khalifaFund: false,
    hub71: false,
    unspecified: false,
    other: false,
  });

  // State for Pricing Model filters
  const [pricingModelFilters, setPricingModelFilters] = useState({
    free: false,
    subscriptionBased: false,
    payPerService: false,
    oneTimeFee: false,
    governmentSubsidised: false,
  });

  const defaultImage = "/assets/images/mzn_logos/mzn_logo.png";
  const defaultImages = [defaultImage];
  const defaultReviews = 0;

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

  // Apply filters whenever products, businessStageFilters, providedByFilters, or pricingModelFilters change
  useEffect(() => {
    // Get selected Business Stages
    const selectedStages = Object.keys(businessStageFilters)
      .filter((key) => businessStageFilters[key])
      .map((key) => key.charAt(0).toUpperCase() + key.slice(1)); // Capitalize first letter

    // Get selected Provided By providers
    const selectedProviders = Object.keys(providedByFilters)
      .filter((key) => providedByFilters[key])
      .map((key) => {
        if (key === "khalifaFund") return "Khalifa Fund";
        if (key === "hub71") return "Hub 71";
        return key.charAt(0).toUpperCase() + key.slice(1); // Capitalize first letter
      });

    // Get selected Pricing Models
    const selectedPricingModels = Object.keys(pricingModelFilters)
      .filter((key) => pricingModelFilters[key])
      .map((key) => {
        if (key === "subscriptionBased") return "Subscription-Based";
        if (key === "payPerService") return "Pay Per Service";
        if (key === "oneTimeFee") return "One-Time Fee";
        if (key === "governmentSubsidised") return "Government Subsidised";
        return key.charAt(0).toUpperCase() + key.slice(1); // Capitalize first letter
      });

    // If no filters are selected, show all products
    if (selectedStages.length === 0 && selectedProviders.length === 0 && selectedPricingModels.length === 0) {
      setFilteredProducts(products);
    } else {
      // Filter products based on selected Business Stages, Provided By, and Pricing Model
      const filtered = products.filter((product) => {
        // Check if product matches selected Business Stages (or no stages selected)
        const matchesStage =
          selectedStages.length === 0 ||
          product.facetValues.some(
            (facetValue) =>
              facetValue.facet.code === "business-stage" &&
              selectedStages.includes(facetValue.name)
          );

        // Check if product matches selected Provided By (or no providers selected)
        const matchesProvider =
          selectedProviders.length === 0 ||
          product.facetValues.some(
            (facetValue) =>
              facetValue.facet.code === "provided-by" &&
              selectedProviders.includes(facetValue.name)
          );

        // Check if product matches selected Pricing Model (or no pricing models selected)
        const matchesPricingModel =
          selectedPricingModels.length === 0 ||
          product.facetValues.some(
            (facetValue) =>
              facetValue.facet.code === "pricing-model" &&
              selectedPricingModels.includes(facetValue.name)
          );

        // Product must match all filter categories
        return matchesStage && matchesProvider && matchesPricingModel;
      });
      setFilteredProducts(filtered);
    }
  }, [products, businessStageFilters, providedByFilters, pricingModelFilters]);

  // Handle checkbox changes for Business Stage filters
  const handleBusinessStageChange = (stage: keyof typeof businessStageFilters) => {
    setBusinessStageFilters((prev) => ({
      ...prev,
      [stage]: !prev[stage],
    }));
    setCurrentPage(1); // Reset to first page when filters change
  };

  // Handle checkbox changes for Provided By filters
  const handleProvidedByChange = (provider: keyof typeof providedByFilters) => {
    setProvidedByFilters((prev) => ({
      ...prev,
      [provider]: !prev[provider],
    }));
    setCurrentPage(1); // Reset to first page when filters change
  };

  // Handle checkbox changes for Pricing Model filters
  const handlePricingModelChange = (model: keyof typeof pricingModelFilters) => {
    setPricingModelFilters((prev) => ({
      ...prev,
      [model]: !prev[model],
    }));
    setCurrentPage(1); // Reset to first page when filters change
  };

  // Calculate the total number of pages based on filtered products
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

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
                <input
                  type="checkbox"
                  id="adgm"
                  title="ADGM"
                  checked={providedByFilters.adgm}
                  onChange={() => handleProvidedByChange("adgm")}
                />
                <label htmlFor="adgm">ADGM</label>
              </CheckboxLabel>
              <CheckboxLabel>
                <input
                  type="checkbox"
                  id="khalifa-fund"
                  title="Khalifa Fund"
                  checked={providedByFilters.khalifaFund}
                  onChange={() => handleProvidedByChange("khalifaFund")}
                />
                <label htmlFor="khalifa-fund">Khalifa Fund</label>
              </CheckboxLabel>
              <CheckboxLabel>
                <input
                  type="checkbox"
                  id="hub71"
                  checked={providedByFilters.hub71}
                  onChange={() => handleProvidedByChange("hub71")}
                />
                <label htmlFor="hub71">Hub 71</label>
              </CheckboxLabel>
              <CheckboxLabel>
                <input
                  type="checkbox"
                  id="unspecified"
                  title="Unspecified"
                  checked={providedByFilters.unspecified}
                  onChange={() => handleProvidedByChange("unspecified")}
                />
                <label htmlFor="unspecified">Unspecified</label>
              </CheckboxLabel>
              <CheckboxLabel>
                <input
                  type="checkbox"
                  id="other-checkbox"
                  title="Other"
                  checked={providedByFilters.other}
                  onChange={() => handleProvidedByChange("other")}
                />
                <label htmlFor="other-checkbox">Other</label>
              </CheckboxLabel>
            </List>

            <List>
              <ServiceTypeTitle>Pricing Model :</ServiceTypeTitle>
              <CheckboxLabel>
                <input
                  type="checkbox"
                  id="free"
                  title="Free"
                  checked={pricingModelFilters.free}
                  onChange={() => handlePricingModelChange("free")}
                />
                <label htmlFor="free">Free</label>
              </CheckboxLabel>
              <CheckboxLabel>
                <input
                  type="checkbox"
                  id="subscription-based"
                  title="Subscription-Based"
                  checked={pricingModelFilters.subscriptionBased}
                  onChange={() => handlePricingModelChange("subscriptionBased")}
                />
                <label htmlFor="subscription-based">Subscription-Based</label>
              </CheckboxLabel>
              <CheckboxLabel>
                <input
                  type="checkbox"
                  id="pay-per-service"
                  title="Pay Per Service"
                  checked={pricingModelFilters.payPerService}
                  onChange={() => handlePricingModelChange("payPerService")}
                />
                <label htmlFor="pay-per-service">Pay Per Service</label>
              </CheckboxLabel>
              <CheckboxLabel>
                <input
                  type="checkbox"
                  id="one-time-fee"
                  title="One-Time Fee"
                  checked={pricingModelFilters.oneTimeFee}
                  onChange={() => handlePricingModelChange("oneTimeFee")}
                />
                <label htmlFor="one-time-fee">One-Time Fee</label>
              </CheckboxLabel>
              <CheckboxLabel>
                <input
                  type="checkbox"
                  id="government-subsidised"
                  title="Government Subsidised"
                  checked={pricingModelFilters.governmentSubsidised}
                  onChange={() => handlePricingModelChange("governmentSubsidised")}
                />
                <label htmlFor="government-subsidised">Government Subsidised</label>
              </CheckboxLabel>
            </List>
          </Card>
          <ShowingText>
            Showing {(currentPage - 1) * productsPerPage + 1}-
            {Math.min(currentPage * productsPerPage, filteredProducts.length)} of {filteredProducts.length} Services
          </ShowingText>
        </Grid>

        {/* CATEGORY BASED PRODUCTS */}
        <Grid item md={9} xs={12}>
          {filteredProducts.length === 0 ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "300px",
                backgroundColor: "#f8f8f8",
                borderRadius: "8px",
                border: "1px solid #e0e0e0",
                marginTop: "1rem",
                fontSize: "1.5rem",
                color: "#555",
                textAlign: "center",
                padding: "2rem",
              }}
            >
              No service Found 😢
            </div>
          ) : (
            <Grid container spacing={3}>
              {currentProducts.map((product) => (
                <Grid item md={4} sm={6} xs={12} key={product.id}>
                  <ProductCard19
                    id={product.id}
                    slug={product.slug}
                    name={product.name}
                    subTitle={product.customFields.partner}
                    description={product.description}
                    img={defaultImage}
                    images={defaultImages}
                    reviews={defaultReviews}
                    className="product-card"
                  />
                </Grid>
              ))}
            </Grid>
          )}

          {/* Pagination */}
          {filteredProducts.length > 0 && (
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                marginTop: "1rem",
                marginBottom: "2rem",
              }}
            >
              <button
                onClick={() => handlePagination("prev")}
                disabled={currentPage === 1}
                style={{
                  border: "1px solid #002180",
                  borderRadius: "50%",
                  padding: "0.5rem",
                  margin: "0 0.5rem",
                  backgroundColor: "transparent",
                  cursor: "pointer",
                }}
              >
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
                    cursor: "pointer",
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
                  cursor: "pointer",
                }}
              >
                <img src="assets/images/avatars/chevron-left.svg" alt="Next" />
              </button>
            </div>
          )}
        </Grid>
      </Grid>
    </Container>
  );
}