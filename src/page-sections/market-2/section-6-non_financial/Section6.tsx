"use client";

import Card from "@component/Card";
import Grid from "@component/grid/Grid";
import NavLink from "@component/nav-link";
import { H3 } from "@component/Typography";
import Container from "@component/Container";
import { useState, useEffect } from "react";
import client from "@lib/graphQLClient";
import TabBar from "@component/tab-bar/TabBar";
import Sidebar from "./side-bar/Sidebar";
import { ShowingText } from "./styles";
import Section2 from "../section-2/Section2";
import NonFinancialServiceCard from "@component/product-cards/NonFinancialServiceCard";

// GraphQL Query (unchanged)
const GET_PRODUCTS = `
  query GetProducts($take: Int!) {
    products(options: { take: $take }) {
      items {
        id
        createdAt
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
          Industry
          BusinessStage
          ProcessingTime
          RegistrationValidity
          Cost
          Steps
          TermsOfService
          RequiredDocuments
          RelatedServices {
            id
            name
            slug
          }
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
  createdAt: string; // Ensure createdAt is included
  facetValues: FacetValue[];
  customFields: {
    Industry?: string;
    BusinessStage?: string;
    ProcessingTime?: string;
    RegistrationValidity?: string;
    Cost?: number;
    Steps?: string;
    TermsOfService?: string;
    RequiredDocuments?: string;
    RelatedServices?: {
      id: string;
      name: string;
      slug: string;
    }[];
  };
}

interface GetProductsData {
  products: {
    items: Product[];
    totalItems: number;
  };
}

interface GetProductsVariables {
  take: number;
}

type CategoryFilterKeys =
  | "eventsAndNetworking"
  | "partnershipsAndOpportunities"
  | "academyAndTraining"
  | "operationalAdvisory"
  | "proximityIncubators"
  | "incentivesListing"
  | "digitalSolutions"
  | "exportAndTradeFacilitation"
  | "legalComplianceAndLicensing";

type CategoryCodes =
  | "events-&-networking"
  | "partnerships-&-opportunities"
  | "academy-&-training"
  | "operational-advisory"
  | "proximity-incubators"
  | "incentives-listing"
  | "digital-solutions"
  | "export-&-trade-facilitation"
  | "legal-compliance-&-licensing";

export default function Section6({
  activeButton,
  setActiveButton,
}: {
  activeButton: string;
  setActiveButton: (button: string) => void;
}) {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [allFilteredProducts, setAllFilteredProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [totalFilteredItems, setTotalFilteredItems] = useState(0);
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const productsPerPage = 15;

  // State for Categories filters
  const [categoriesFilters, setCategoriesFilters] = useState<{
    [key in CategoryFilterKeys]: boolean;
  }>({
    eventsAndNetworking: false,
    partnershipsAndOpportunities: false,
    academyAndTraining: false,
    operationalAdvisory: false,
    proximityIncubators: false,
    incentivesListing: false,
    digitalSolutions: false,
    exportAndTradeFacilitation: false,
    legalComplianceAndLicensing: false,
  });

  // State for Business Stage filters
  const [businessStageFilters, setBusinessStageFilters] = useState({
    conception: false,
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
      Object.values(pricingModelFilters).some((value) => value) ||
      searchQuery.trim() !== "" ||
      activeButton === "newAdditions" // Include activeButton in filter check
    );
  };

  // Function to check if a product is less than 5 days old
  const isNewAddition = (createdAt: string): boolean => {
    const createdDate = new Date(createdAt);
    const currentDate = new Date();
    const fiveDaysAgo = new Date(currentDate.getTime() - 5 * 24 * 60 * 60 * 1000); // 5 days in milliseconds
    return createdDate >= fiveDaysAgo;
  };

  // Fetch products data on component mount or page change
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      console.log("Fetching data from GraphQL... Take:", productsPerPage);
      try {
        const data = await client.request<GetProductsData, GetProductsVariables>(GET_PRODUCTS, {
          take: 31,
        });
        console.log("Fetched products:", data.products.items.length, "Total Items:", data.products.totalItems);

        // Filter for Non-Financial Services (facetValue.id: "67") and exclude financial (facetValue.id: "66")
        let nonFinancialServicesOnly = data.products.items.filter((product) =>
          product.facetValues.some((fv) => fv.id === "67") &&
          !product.facetValues.some((fv) => fv.id === "66")
        );
        console.log("Filtered to Non-Financial Services only:", nonFinancialServicesOnly.length);

        // Apply "New Additions" filter if active
        if (activeButton === "newAdditions") {
          nonFinancialServicesOnly = nonFinancialServicesOnly.filter((product) =>
            isNewAddition(product.createdAt)
          );
          console.log("Filtered to New Additions (less than 5 days old):", nonFinancialServicesOnly.length);
        }

        // Apply other filters
        const selectedCategories = Object.keys(categoriesFilters)
          .filter((key) => categoriesFilters[key as CategoryFilterKeys])
          .map((key) => {
            switch (key) {
              case "eventsAndNetworking": return "events-&-networking";
              case "partnershipsAndOpportunities": return "partnerships-&-opportunities";
              case "academyAndTraining": return "academy-&-training";
              case "operationalAdvisory": return "operational-advisory";
              case "proximityIncubators": return "proximity-incubators";
              case "incentivesListing": return "incentives-listing";
              case "digitalSolutions": return "digital-solutions";
              case "exportAndTradeFacilitation": return "export-&-trade-facilitation";
              case "legalComplianceAndLicensing": return "legal-compliance-&-licensing";
              default: return "" as CategoryCodes;
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

        const filtered = nonFinancialServicesOnly.filter((product) => {
          const matchesCategory =
            selectedCategories.length === 0 ||
            product.facetValues.some((facetValue) =>
              selectedCategories.includes(facetValue.code as CategoryCodes)
            );
          const matchesStage =
            selectedStages.length === 0 ||
            product.facetValues.some((facetValue) =>
              facetValue.code && selectedStages.includes(facetValue.code)
            ) ||
            (product.customFields?.BusinessStage && selectedStages.includes(product.customFields.BusinessStage));
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
          const matchesSearch =
            searchQuery.trim() === "" ||
            product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.facetValues.some((facetValue) =>
              facetValue.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
          console.log(`Filtering ${product.name} (id: ${product.id}):`, {
            matchesCategory,
            matchesStage,
            matchesProvider,
            matchesPricingModel,
            matchesSearch,
          });
          return matchesCategory && matchesStage && matchesProvider && matchesPricingModel && matchesSearch;
        });

        setTotalItems(nonFinancialServicesOnly.length);
        setAllFilteredProducts(filtered);
        setTotalFilteredItems(filtered.length);

        const startIndex = (currentPage - 1) * productsPerPage;
        const endIndex = startIndex + productsPerPage;
        setProducts(filtered.slice(startIndex, endIndex));
        setFilteredProducts(filtered.slice(startIndex, endIndex));
      } catch (error) {
        console.error("Error fetching products:", error.response?.errors || error.message);
      } finally {
        setLoading(false);
        console.log("Fetching completed. Loading set to false.");
      }
    };

    fetchData();
  }, [currentPage, categoriesFilters, businessStageFilters, providedByFilters, pricingModelFilters, searchQuery, activeButton]);

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
    <Container pt="4rem" style={{ marginTop: "-45px" }}>
      <TabBar />
      <Section2
        resultsCount={areFiltersApplied() ? totalFilteredItems : totalItems}
        style={{ marginBottom: "2rem" }}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        activeButton={activeButton}
        setActiveButton={setActiveButton}
      />
      <Grid container spacing={3}>
        <Grid item md={3} xs={12}>
          <Sidebar
            categoriesFilters={categoriesFilters}
            setCategoriesFilters={setCategoriesFilters}
            businessStageFilters={businessStageFilters}
            setBusinessStageFilters={setBusinessStageFilters}
            providedByFilters={providedByFilters}
            setProvidedByFilters={setProvidedByFilters}
            pricingModelFilters={pricingModelFilters}
            setPricingModelFilters={setPricingModelFilters}
            handleCategoriesChange={handleCategoriesChange}
            handleBusinessStageChange={handleBusinessStageChange}
            handleProvidedByChange={handleProvidedByChange}
            handlePricingModelChange={handlePricingModelChange}
            totalItems={totalItems}
            totalFilteredItems={totalFilteredItems}
            currentPage={currentPage}
            productsPerPage={productsPerPage}
            areFiltersApplied={areFiltersApplied}
          />
        </Grid>

        <Grid item md={9} xs={12}>
          {loading ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "300px",
                marginTop: "1rem",
                fontSize: "1.5rem",
                color: "#555",
                textAlign: "center",
                padding: "2rem",
              }}
            >
              <div
                style={{
                  border: "4px solid #f3f3f3",
                  borderTop: "4px solid #002180",
                  borderRadius: "50%",
                  width: "40px",
                  height: "40px",
                  animation: "spin 1s linear infinite",
                }}
              ></div>
              <style>
                {`
                  @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                  }
                `}
              </style>
            </div>
          ) : currentProducts.length === 0 ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "300px",
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
                    <NonFinancialServiceCard
                      id={product.id}
                      slug={product.slug}
                      name={product.name}
                      subTitle={product.customFields.Industry}
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

          {totalPages > 1 && (
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