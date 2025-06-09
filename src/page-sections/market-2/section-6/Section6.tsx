"use client";

import Card from "@component/Card";
import Grid from "@component/grid/Grid";
import NavLink from "@component/nav-link";
import { H3 } from "@component/Typography";
import Container from "@component/Container";
import { ProductCard19 } from "@component/product-cards";
import { useState, useEffect } from "react";
import client from "@lib/graphQLClient";
import TabBar from '@component/tab-bar/TabBar';

// STYLED COMPONENTS
import { List, ListItem, DropdownIcon, DropdownText, CheckboxLabel, ServiceTypeTitle, ShowingText } from "./styles";

import Section2 from "../section-2/Section2";

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
          Partner
          Cost
        }
      }
      totalItems
    }
  }
`;

interface FacetValue {
  id: string;
  code: string;
  name: string;
}

interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  facetValues: FacetValue[];
  customFields: {
    Partner: string;
    Cost?: number;
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

type CategoryFilterKeys = 
  | "businessOperationsFinancing"
  | "projectSpecializedFinancing"
  | "growthExpansionFinancing"
  | "loanManagementAdjustments"
  | "businessAssetFinancing"
  | "investmentEquityFinancing";

type CategoryCodes = 
  | "business-operations-financing"
  | "project-specialized-financing"
  | "growth-expansion-financing"
  | "loan-management-adjustments"
  | "business-asset-financing"
  | "investment-equity-financing"
  | "";

export default function Section6() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [allFilteredProducts, setAllFilteredProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [totalFilteredItems, setTotalFilteredItems] = useState(0);
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const productsPerPage = 15;

  // State for Categories filters with updated type
  const [categoriesFilters, setCategoriesFilters] = useState<{
    [key in CategoryFilterKeys]: boolean;
  }>({
    businessOperationsFinancing: false,
    projectSpecializedFinancing: false,
    growthExpansionFinancing: false,
    loanManagementAdjustments: false,
    businessAssetFinancing: false,
    investmentEquityFinancing: false,
  });

  // State for Business Stage filters
  const [businessStageFilters, setBusinessStageFilters] = useState({
    conception: false, // Changed from inception
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
    adSmeHub: false,
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

  // Check if any filters are applied
  const areFiltersApplied = () => {
    return (
      Object.values(categoriesFilters).some((value) => value) ||
      Object.values(businessStageFilters).some((value) => value) ||
      Object.values(providedByFilters).some((value) => value) ||
      Object.values(pricingModelFilters).some((value) => value)
    );
  };

  // Fetch products data on component mount or page change
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      console.log("Fetching data from GraphQL... Current Page:", currentPage, "Skip:", (currentPage - 1) * productsPerPage, "Take:", productsPerPage);
      try {
        if (areFiltersApplied()) {
          console.log("Filters are applied, fetching all products for filtering...");
          const allProducts: Product[] = [];
          let currentSkip = 0;
          let total = 0;

          do {
            const data = await client.request<GetProductsData, GetProductsVariables>(GET_PRODUCTS, {
              skip: currentSkip,
              take: productsPerPage,
            });
            console.log("Fetched batch of products:", data.products.items.length, "Total Items:", data.products.totalItems);
            allProducts.push(...data.products.items);
            total = data.products.totalItems;
            currentSkip += productsPerPage;
          } while (currentSkip < total);

          console.log("All products fetched:", allProducts.length);

          // Filter for Financial Services (facetValue.id: "66") and exclude non-financial (facetValue.id: "67")
          const financialServicesOnly = allProducts.filter((product) =>
            product.facetValues.some((fv) => fv.id === "66") &&
            !product.facetValues.some((fv) => fv.id === "67")
          );
          console.log("Filtered to Financial Services only:", financialServicesOnly.length);

          // Set totalItems to the count of financial services only
          setTotalItems(financialServicesOnly.length);

          // Apply other filters to financial services only
          const selectedCategories = Object.keys(categoriesFilters)
            .filter((key) => categoriesFilters[key as CategoryFilterKeys])
            .map((key) => {
              switch (key) {
                case "businessOperationsFinancing": return "business-operations-financing";
                case "projectSpecializedFinancing": return "project-specialized-financing";
                case "growthExpansionFinancing": return "growth-expansion-financing";
                case "loanManagementAdjustments": return "loan-management-adjustments";
                case "businessAssetFinancing": return "business-asset-financing";
                case "investmentEquityFinancing": return "investment-equity-financing";
                default: return "";
              }
            }) as CategoryCodes[];
          console.log("Selected Categories:", selectedCategories);

          const selectedStages = Object.keys(businessStageFilters)
            .filter((key) => businessStageFilters[key])
            .map((key) => key);
          console.log("Selected Stages:", selectedStages);

          const selectedProviders = Object.keys(providedByFilters)
            .filter((key) => providedByFilters[key])
            .map((key) => {
              switch (key) {
                case "khalifaFund": return "khalifa-fund";
                case "adSmeHub": return "ad-sme-hub";
                case "hub71": return "hub71";
                case "adgm": return "adgm";
                case "other": return "other";
                default: return key;
              }
            });
          console.log("Selected Providers:", selectedProviders);

          const selectedPricingModels = Object.keys(pricingModelFilters)
            .filter((key) => pricingModelFilters[key])
            .map((key) => {
              switch (key) {
                case "subscriptionBased": return "subscription-based";
                case "payPerService": return "pay-per-service";
                case "oneTimeFee": return "one-time-fee";
                case "governmentSubsidised": return "government-subsidized";
                case "free": return "free";
                default: return key;
              }
            });
          console.log("Selected Pricing Models:", selectedPricingModels);

          const filtered = selectedCategories.length === 0 &&
            selectedStages.length === 0 &&
            selectedProviders.length === 0 &&
            selectedPricingModels.length === 0
            ? financialServicesOnly
            : financialServicesOnly.filter((product) => {
                const matchesCategory =
                  selectedCategories.length === 0 ||
                  product.facetValues.some((facetValue) =>
                    selectedCategories.includes(facetValue.code as CategoryCodes)
                  );
                const matchesStage =
                  selectedStages.length === 0 ||
                  product.facetValues.some((facetValue) =>
                    facetValue.code && selectedStages.includes(facetValue.code)
                  );
                const matchesProvider =
                  selectedProviders.length === 0 ||
                  product.facetValues.some((facetValue) =>
                    facetValue.code && selectedProviders.includes(facetValue.code)
                  );
                const matchesPricingModel =
                  selectedPricingModels.length === 0 ||
                  product.facetValues.some((facetValue) =>
                    facetValue.code && selectedPricingModels.includes(facetValue.code)
                  ) ||
                  (selectedPricingModels.includes("one-time-fee") &&
                    product.customFields?.Cost && product.customFields.Cost > 0);
                console.log(`Filtering ${product.name} (id: ${product.id}):`, {
                  matchesCategory,
                  matchesStage,
                  matchesProvider,
                  matchesPricingModel
                });
                return matchesCategory && matchesStage && matchesProvider && matchesPricingModel;
              });
          console.log("Final filtered products count:", filtered.length);

          setAllFilteredProducts(filtered);
          setTotalFilteredItems(filtered.length);

          const startIndex = (currentPage - 1) * productsPerPage;
          const endIndex = startIndex + productsPerPage;
          setProducts(filtered.slice(startIndex, endIndex));
          setFilteredProducts(filtered.slice(startIndex, endIndex));
        } else {
          console.log("No filters applied, fetching all financial services...");
          const allProducts: Product[] = [];
          let currentSkip = 0;
          let total = 0;

          do {
            const data = await client.request<GetProductsData, GetProductsVariables>(GET_PRODUCTS, {
              skip: currentSkip,
              take: productsPerPage,
            });
            console.log("Fetched batch of products:", data.products.items.length, "Total Items:", data.products.totalItems);
            allProducts.push(...data.products.items);
            total = data.products.totalItems;
            currentSkip += productsPerPage;
          } while (currentSkip < total);

          console.log("All products fetched:", allProducts.length);

          // Filter for Financial Services (facetValue.id: "66") and exclude non-financial (facetValue.id: "67")
          const financialServicesOnly = allProducts.filter((product) =>
            product.facetValues.some((fv) => fv.id === "66") &&
            !product.facetValues.some((fv) => fv.id === "67")
          );
          console.log("Filtered to Financial Services only:", financialServicesOnly.length);

          setTotalItems(financialServicesOnly.length);
          setAllFilteredProducts(financialServicesOnly);
          setTotalFilteredItems(financialServicesOnly.length);

          const startIndex = (currentPage - 1) * productsPerPage;
          const endIndex = startIndex + productsPerPage;
          setProducts(financialServicesOnly.slice(startIndex, endIndex));
          setFilteredProducts(financialServicesOnly.slice(startIndex, endIndex));
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
        console.log("Fetching completed. Loading set to false.");
      }
    };

    fetchData();
  }, [currentPage, categoriesFilters, businessStageFilters, providedByFilters, pricingModelFilters]);

  // Apply filters whenever products, categoriesFilters, businessStageFilters, providedByFilters, or pricingModelFilters change
  useEffect(() => {
    const selectedCategories = Object.keys(categoriesFilters)
      .filter((key) => categoriesFilters[key as CategoryFilterKeys])
      .map((key) => {
        switch (key) {
          case "businessOperationsFinancing": return "business-operations-financing";
          case "projectSpecializedFinancing": return "project-specialized-financing";
          case "growthExpansionFinancing": return "growth-expansion-financing";
          case "loanManagementAdjustments": return "loan-management-adjustments";
          case "businessAssetFinancing": return "business-asset-financing";
          case "investmentEquityFinancing": return "investment-equity-financing";
          default: return "";
        }
      }) as CategoryCodes[];
    const selectedStages = Object.keys(businessStageFilters)
      .filter((key) => businessStageFilters[key])
      .map((key) => key);
    const selectedProviders = Object.keys(providedByFilters)
      .filter((key) => providedByFilters[key])
      .map((key) => {
        switch (key) {
          case "khalifaFund": return "khalifa-fund";
          case "adSmeHub": return "ad-sme-hub";
          case "hub71": return "hub71";
          case "adgm": return "adgm";
          case "other": return "other";
          default: return key;
        }
      });
    const selectedPricingModels = Object.keys(pricingModelFilters)
      .filter((key) => pricingModelFilters[key])
      .map((key) => {
        switch (key) {
          case "subscriptionBased": return "subscription-based";
          case "payPerService": return "pay-per-service";
          case "oneTimeFee": return "one-time-fee";
          case "governmentSubsidised": return "government-subsidized";
          case "free": return "free";
          default: return key;
        }
      });

    if (
      selectedCategories.length === 0 &&
      selectedStages.length === 0 &&
      selectedProviders.length === 0 &&
      selectedPricingModels.length === 0
    ) {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter((product) => {
        const matchesCategory =
          selectedCategories.length === 0 ||
          product.facetValues.some((facetValue) =>
            selectedCategories.includes(facetValue.code as CategoryCodes)
          );
        const matchesStage =
          selectedStages.length === 0 ||
          product.facetValues.some((facetValue) =>
            facetValue.code && selectedStages.includes(facetValue.code)
          );
        const matchesProvider =
          selectedProviders.length === 0 ||
          product.facetValues.some((facetValue) =>
            facetValue.code && selectedProviders.includes(facetValue.code)
          );
        const matchesPricingModel =
          selectedPricingModels.length === 0 ||
          product.facetValues.some((facetValue) =>
            facetValue.code && selectedPricingModels.includes(facetValue.code)
          ) ||
          (selectedPricingModels.includes("one-time-fee") &&
            product.customFields?.Cost && product.customFields.Cost > 0);
        console.log(`Filtering ${product.name} (id: ${product.id}):`, {
          matchesCategory,
          matchesStage,
          matchesProvider,
          matchesPricingModel
        });
        return matchesCategory && matchesStage && matchesProvider && matchesPricingModel;
      });
      setFilteredProducts(filtered);
    }
  }, [products, categoriesFilters, businessStageFilters, providedByFilters, pricingModelFilters]);

  // Handle checkbox changes for Categories
  const handleCategoriesChange = (category: CategoryFilterKeys) => {
    setCategoriesFilters((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
    setCurrentPage(1);
  };

  // Handle checkbox changes for Business Stage filters
  const handleBusinessStageChange = (stage: keyof typeof businessStageFilters) => {
    setBusinessStageFilters((prev) => ({
      ...prev,
      [stage]: !prev[stage],
    }));
    setCurrentPage(1);
  };

  // Handle checkbox changes for Provided By filters
  const handleProvidedByChange = (provider: keyof typeof providedByFilters) => {
    setProvidedByFilters((prev) => ({
      ...prev,
      [provider]: !prev[provider],
    }));
    setCurrentPage(1);
  };

  // Handle checkbox changes for Pricing Model filters
  const handlePricingModelChange = (model: keyof typeof pricingModelFilters) => {
    setPricingModelFilters((prev) => ({
      ...prev,
      [model]: !prev[model],
    }));
    setCurrentPage(1);
  };

  // Calculate the total number of pages based on filtered or total items
  const totalPages = areFiltersApplied()
    ? Math.ceil(totalFilteredItems / productsPerPage)
    : Math.ceil(totalItems / productsPerPage);

  // Slice the filtered products to show on the current page
  const currentProducts = filteredProducts;

  const handlePagination = (direction: "next" | "prev") => {
    if (direction === "next" && currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    } else if (direction === "prev" && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <Container pt="4rem" style={{ marginTop: '-45px' }}>
      <TabBar />
      <Section2 
        resultsCount={areFiltersApplied() ? totalFilteredItems : totalItems} 
        style={{ marginBottom: "2rem" }}
      />
      <Grid container spacing={3}>
        <Grid item md={3} xs={12}>
          <Card
            elevation={0}
            style={{
              border: 0,
              height: "95%",
              borderRadius: "3px",
              padding: "1rem 2rem",
              backgroundColor: "#FFFFFF",
            }}>
            <List>
              <ServiceTypeTitle>Categories :</ServiceTypeTitle>
              <CheckboxLabel>
                <input
                  type="checkbox"
                  id="business-operations-financing"
                  title="Business Operations Financing"
                  checked={categoriesFilters.businessOperationsFinancing}
                  onChange={() => handleCategoriesChange("businessOperationsFinancing")}
                />
                <label htmlFor="business-operations-financing">Business Operations Financing</label>
              </CheckboxLabel>
              <CheckboxLabel>
                <input
                  type="checkbox"
                  id="project-specialized-financing"
                  title="Project & Specialized Financing"
                  checked={categoriesFilters.projectSpecializedFinancing}
                  onChange={() => handleCategoriesChange("projectSpecializedFinancing")}
                />
                <label htmlFor="project-specialized-financing">Project & Specialized Financing</label>
              </CheckboxLabel>
              <CheckboxLabel>
                <input
                  type="checkbox"
                  id="growth-expansion-financing"
                  title="Growth & Expansion Financing"
                  checked={categoriesFilters.growthExpansionFinancing}
                  onChange={() => handleCategoriesChange("growthExpansionFinancing")}
                />
                <label htmlFor="growth-expansion-financing">Growth & Expansion Financing</label>
              </CheckboxLabel>
              <CheckboxLabel>
                <input
                  type="checkbox"
                  id="loan-management-adjustments"
                  title="Loan Management & Adjustments"
                  checked={categoriesFilters.loanManagementAdjustments}
                  onChange={() => handleCategoriesChange("loanManagementAdjustments")}
                />
                <label htmlFor="loan-management-adjustments">Loan Management & Adjustments</label>
              </CheckboxLabel>
              <CheckboxLabel>
                <input
                  type="checkbox"
                  id="business-asset-financing"
                  title="Business Asset Financing"
                  checked={categoriesFilters.businessAssetFinancing}
                  onChange={() => handleCategoriesChange("businessAssetFinancing")}
                />
                <label htmlFor="business-asset-financing">Business Asset Financing</label>
              </CheckboxLabel>
              <CheckboxLabel>
                <input
                  type="checkbox"
                  id="investment-equity-financing"
                  title="Investment & Equity Financing"
                  checked={categoriesFilters.investmentEquityFinancing}
                  onChange={() => handleCategoriesChange("investmentEquityFinancing")}
                />
                <label htmlFor="investment-equity-financing">Investment & Equity Financing</label>
              </CheckboxLabel>
            </List>

            <List>
              <ServiceTypeTitle>Business Stage:</ServiceTypeTitle>
              <CheckboxLabel>
                <input
                  type="checkbox"
                  id="conception"
                  checked={businessStageFilters.conception}
                  onChange={() => handleBusinessStageChange("conception")}
                />
                <label htmlFor="conception">Conception</label>
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
              <ServiceTypeTitle>Provided By:</ServiceTypeTitle>
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
                  id="ad-sme-hub"
                  title="AD SME Hub"
                  checked={providedByFilters.adSmeHub}
                  onChange={() => handleProvidedByChange("adSmeHub")}
                />
                <label htmlFor="ad-sme-hub">AD SME Hub</label>
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
              <ServiceTypeTitle>Pricing Model:</ServiceTypeTitle>
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
          {(areFiltersApplied() ? totalFilteredItems : totalItems) > 0 && (
            <ShowingText>
              Showing {(currentPage - 1) * productsPerPage + 1}-
              {Math.min(currentPage * productsPerPage, areFiltersApplied() ? totalFilteredItems : totalItems)} of {areFiltersApplied() ? totalFilteredItems : totalItems} Services
            </ShowingText>
          )}
        </Grid>

        <Grid item md={9} xs={12}>
          {loading ? (
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
              Loading services...
            </div>
          ) : currentProducts.length === 0 ? (
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
                  <div
                    onMouseEnter={() => setHoveredCardId(product.id)}
                    onMouseLeave={() => setHoveredCardId(null)}
                    style={{
                      transition: "all 0.3s ease",
                      transform: hoveredCardId === product.id ? "scale(1.02)" : "scale(1)",
                      boxShadow: hoveredCardId === product.id ? "0 4px 8px rgba(0, 0, 0, 0.1)" : "none",
                    }}
                  >
                    <ProductCard19
                      id={product.id}
                      slug={product.slug}
                      name={product.name}
                      subTitle={product.customFields.Partner}
                      description={product.description}
                      img={defaultImage}
                      images={defaultImages}
                      reviews={defaultReviews}
                      className="product-card"
                    />
                  </div>
                </Grid>
              ))}
            </Grid>
          )}

          {(areFiltersApplied() ? totalFilteredItems : totalItems) > 0 && (
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
                  cursor: currentPage === 1 ? "not-allowed" : "pointer",
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
                    display: "inline-block",
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
                  cursor: currentPage === totalPages ? "not-allowed" : "pointer",
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