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
  const [allFilteredProducts, setAllFilteredProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [totalFilteredItems, setTotalFilteredItems] = useState(0);
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);
  const productsPerPage = 15;

  // State for Categories filters
  const [categoriesFilters, setCategoriesFilters] = useState({
    businessFunding: {
      termLoans: false,
      businessDevelopment: false,
      projectFinancingLoans: false,
    },
    loanManagement: {
      loanTermExtension: false,
    },
    specializedFinancing: {
      internationalTradeLoan: false,
    },
  });

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
      Object.values(categoriesFilters).some((category) =>
        Object.values(category).some((value) => value)
      ) ||
      Object.values(businessStageFilters).some((value) => value) ||
      Object.values(providedByFilters).some((value) => value) ||
      Object.values(pricingModelFilters).some((value) => value)
    );
  };

  // Fetch products data on component mount or page change
  useEffect(() => {
    const fetchData = async () => {
      console.log("Fetching data from GraphQL...");
      try {
        if (areFiltersApplied()) {
          // Fetch all products for filtering
          const allProducts: Product[] = [];
          let currentSkip = 0;
          let total = 0;

          do {
            const data = await client.request<GetProductsData, GetProductsVariables>(GET_PRODUCTS, {
              skip: currentSkip,
              take: productsPerPage,
            });
            allProducts.push(...data.products.items);
            total = data.products.totalItems;
            currentSkip += productsPerPage;
          } while (currentSkip < total);

          setTotalItems(total);

          // Apply filters to all products
          const selectedCategories: string[] = [];
          if (categoriesFilters.businessFunding.termLoans) selectedCategories.push("Term Loans");
          if (categoriesFilters.businessFunding.businessDevelopment) selectedCategories.push("Business Development");
          if (categoriesFilters.businessFunding.projectFinancingLoans) selectedCategories.push("Project Financing Loans");
          if (categoriesFilters.loanManagement.loanTermExtension) selectedCategories.push("Loan Term Extension");
          if (categoriesFilters.specializedFinancing.internationalTradeLoan) selectedCategories.push("International Trade Loan");

          const selectedStages = Object.keys(businessStageFilters)
            .filter((key) => businessStageFilters[key])
            .map((key) => key.charAt(0).toUpperCase() + key.slice(1));

          const selectedProviders = Object.keys(providedByFilters)
            .filter((key) => providedByFilters[key])
            .map((key) => {
              if (key === "khalifaFund") return "Khalifa Fund";
              if (key === "hub71") return "Hub 71";
              if (key === "adSmeHub") return "AD SME Hub";
              return key.charAt(0).toUpperCase() + key.slice(1);
            });

          const selectedPricingModels = Object.keys(pricingModelFilters)
            .filter((key) => pricingModelFilters[key])
            .map((key) => {
              if (key === "subscriptionBased") return "Subscription-Based";
              if (key === "payPerService") return "Pay Per Service";
              if (key === "oneTimeFee") return "One-Time Fee";
              if (key === "governmentSubsidised") return "Government Subsidised";
              return key.charAt(0).toUpperCase() + key.slice(1);
            });

          const filtered = selectedCategories.length === 0 &&
            selectedStages.length === 0 &&
            selectedProviders.length === 0 &&
            selectedPricingModels.length === 0
            ? allProducts
            : allProducts.filter((product) => {
                const matchesCategory =
                  selectedCategories.length === 0 ||
                  product.facetValues.some(
                    (facetValue) =>
                      facetValue.facet.code === "category" &&
                      selectedCategories.includes(facetValue.name)
                  );
                const matchesStage =
                  selectedStages.length === 0 ||
                  product.facetValues.some(
                    (facetValue) =>
                      facetValue.facet.code === "business-stage" &&
                      selectedStages.includes(facetValue.name)
                  );
                const matchesProvider =
                  selectedProviders.length === 0 ||
                  product.facetValues.some(
                    (facetValue) =>
                      facetValue.facet.code === "provided-by" &&
                      selectedProviders.includes(facetValue.name)
                  );
                const matchesPricingModel =
                  selectedPricingModels.length === 0 ||
                  product.facetValues.some(
                    (facetValue) =>
                      facetValue.facet.code === "pricing-model" &&
                      selectedPricingModels.includes(facetValue.name)
                  );
                return matchesCategory && matchesStage && matchesProvider && matchesPricingModel;
              });

          setAllFilteredProducts(filtered);
          setTotalFilteredItems(filtered.length);

          // Update products for the current page
          const startIndex = (currentPage - 1) * productsPerPage;
          const endIndex = startIndex + productsPerPage;
          setProducts(filtered.slice(startIndex, endIndex));
          setFilteredProducts(filtered.slice(startIndex, endIndex));
        } else {
          // Fetch only the current page when no filters are applied
          const data = await client.request<GetProductsData, GetProductsVariables>(GET_PRODUCTS, {
            skip: (currentPage - 1) * productsPerPage,
            take: productsPerPage,
          });
          console.log("Data fetched successfully:", data);
          setProducts(data.products.items);
          setFilteredProducts(data.products.items);
          setAllFilteredProducts(data.products.items);
          setTotalItems(data.products.totalItems);
          setTotalFilteredItems(data.products.totalItems);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  }, [currentPage, categoriesFilters, businessStageFilters, providedByFilters, pricingModelFilters]);

  // Apply filters whenever products, categoriesFilters, businessStageFilters, providedByFilters, or pricingModelFilters change
  useEffect(() => {
    const selectedCategories: string[] = [];
    if (categoriesFilters.businessFunding.termLoans) selectedCategories.push("Term Loans");
    if (categoriesFilters.businessFunding.businessDevelopment) selectedCategories.push("Business Development");
    if (categoriesFilters.businessFunding.projectFinancingLoans) selectedCategories.push("Project Financing Loans");
    if (categoriesFilters.loanManagement.loanTermExtension) selectedCategories.push("Loan Term Extension");
    if (categoriesFilters.specializedFinancing.internationalTradeLoan) selectedCategories.push("International Trade Loan");

    const selectedStages = Object.keys(businessStageFilters)
      .filter((key) => businessStageFilters[key])
      .map((key) => key.charAt(0).toUpperCase() + key.slice(1));

    const selectedProviders = Object.keys(providedByFilters)
      .filter((key) => providedByFilters[key])
      .map((key) => {
        if (key === "khalifaFund") return "Khalifa Fund";
        if (key === "hub71") return "Hub 71";
        if (key === "adSmeHub") return "AD SME Hub";
        return key.charAt(0).toUpperCase() + key.slice(1);
      });

    const selectedPricingModels = Object.keys(pricingModelFilters)
      .filter((key) => pricingModelFilters[key])
      .map((key) => {
        if (key === "subscriptionBased") return "Subscription-Based";
        if (key === "payPerService") return "Pay Per Service";
        if (key === "oneTimeFee") return "One-Time Fee";
        if (key === "governmentSubsidised") return "Government Subsidised";
        return key.charAt(0).toUpperCase() + key.slice(1);
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
          product.facetValues.some(
            (facetValue) =>
              facetValue.facet.code === "category" &&
              selectedCategories.includes(facetValue.name)
          );
        const matchesStage =
          selectedStages.length === 0 ||
          product.facetValues.some(
            (facetValue) =>
              facetValue.facet.code === "business-stage" &&
              selectedStages.includes(facetValue.name)
          );
        const matchesProvider =
          selectedProviders.length === 0 ||
          product.facetValues.some(
            (facetValue) =>
              facetValue.facet.code === "provided-by" &&
              selectedProviders.includes(facetValue.name)
          );
        const matchesPricingModel =
          selectedPricingModels.length === 0 ||
          product.facetValues.some(
            (facetValue) =>
              facetValue.facet.code === "pricing-model" &&
              selectedPricingModels.includes(facetValue.name)
          );
        return matchesCategory && matchesStage && matchesProvider && matchesPricingModel;
      });
      setFilteredProducts(filtered);
    }
  }, [products, categoriesFilters, businessStageFilters, providedByFilters, pricingModelFilters]);

  // Handle checkbox changes for Categories filters
  const handleCategoriesChange = (category: string, subcategory: string) => {
    setCategoriesFilters((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [subcategory]: !prev[category][subcategory],
      },
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
              backgroundColor: "#FFFFFF"
            }}>
            <List>
              <ServiceTypeTitle>Categories :</ServiceTypeTitle>
              <CheckboxLabel>
                <input
                  type="checkbox"
                  id="business-funding"
                  title="Business Funding & ..."
                  checked={
                    categoriesFilters.businessFunding.termLoans ||
                    categoriesFilters.businessFunding.businessDevelopment ||
                    categoriesFilters.businessFunding.projectFinancingLoans
                  }
                  onChange={() => {
                    const allChecked = !(
                      categoriesFilters.businessFunding.termLoans ||
                      categoriesFilters.businessFunding.businessDevelopment ||
                      categoriesFilters.businessFunding.projectFinancingLoans
                    );
                    setCategoriesFilters((prev) => ({
                      ...prev,
                      businessFunding: {
                        termLoans: allChecked,
                        businessDevelopment: allChecked,
                        projectFinancingLoans: allChecked,
                      },
                    }));
                    setCurrentPage(1);
                  }}
                />
                <label htmlFor="business-funding">Business Funding & ...</label>
              </CheckboxLabel>
              <CheckboxLabel style={{ marginLeft: '1rem' }}>
                <input
                  type="checkbox"
                  id="term-loans"
                  title="Term Loans"
                  checked={categoriesFilters.businessFunding.termLoans}
                  onChange={() => handleCategoriesChange("businessFunding", "termLoans")}
                />
                <label htmlFor="term-loans">Term Loans</label>
              </CheckboxLabel>
              <CheckboxLabel style={{ marginLeft: '1rem' }}>
                <input
                  type="checkbox"
                  id="business-development"
                  title="Business Development"
                  checked={categoriesFilters.businessFunding.businessDevelopment}
                  onChange={() => handleCategoriesChange("businessFunding", "businessDevelopment")}
                />
                <label htmlFor="business-development">Business Development</label>
              </CheckboxLabel>
              <CheckboxLabel style={{ marginLeft: '1rem' }}>
                <input
                  type="checkbox"
                  id="project-financing-loans"
                  title="Project Financing Loans"
                  checked={categoriesFilters.businessFunding.projectFinancingLoans}
                  onChange={() => handleCategoriesChange("businessFunding", "projectFinancingLoans")}
                />
                <label htmlFor="project-financing-loans">Project Financing Loans</label>
              </CheckboxLabel>

              <CheckboxLabel>
                <input
                  type="checkbox"
                  id="loan-management"
                  title="Loan Management & ..."
                  checked={categoriesFilters.loanManagement.loanTermExtension}
                  onChange={() => {
                    const allChecked = !categoriesFilters.loanManagement.loanTermExtension;
                    setCategoriesFilters((prev) => ({
                      ...prev,
                      loanManagement: {
                        loanTermExtension: allChecked,
                      },
                    }));
                    setCurrentPage(1);
                  }}
                />
                <label htmlFor="loan-management">Loan Management & ...</label>
              </CheckboxLabel>
              <CheckboxLabel style={{ marginLeft: '1rem' }}>
                <input
                  type="checkbox"
                  id="loan-term-extension"
                  title="Loan Term Extension"
                  checked={categoriesFilters.loanManagement.loanTermExtension}
                  onChange={() => handleCategoriesChange("loanManagement", "loanTermExtension")}
                />
                <label htmlFor="loan-term-extension">Loan Term Extension</label>
              </CheckboxLabel>

              <CheckboxLabel>
                <input
                  type="checkbox"
                  id="specialized-financing"
                  title="Specialized Financing"
                  checked={categoriesFilters.specializedFinancing.internationalTradeLoan}
                  onChange={() => {
                    const allChecked = !categoriesFilters.specializedFinancing.internationalTradeLoan;
                    setCategoriesFilters((prev) => ({
                      ...prev,
                      specializedFinancing: {
                        internationalTradeLoan: allChecked,
                      },
                    }));
                    setCurrentPage(1);
                  }}
                />
                <label htmlFor="specialized-financing">Specialized Financing</label>
              </CheckboxLabel>
              <CheckboxLabel style={{ marginLeft: '1rem' }}>
                <input
                  type="checkbox"
                  id="international-trade-loan"
                  title="International Trade Loan"
                  checked={categoriesFilters.specializedFinancing.internationalTradeLoan}
                  onChange={() => handleCategoriesChange("specializedFinancing", "internationalTradeLoan")}
                />
                <label htmlFor="international-trade-loan">International Trade Loan</label>
              </CheckboxLabel>
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
          {(areFiltersApplied() ? totalFilteredItems : totalItems) > 0 && (
            <ShowingText>
              Showing {(currentPage - 1) * productsPerPage + 1}-
              {Math.min(currentPage * productsPerPage, areFiltersApplied() ? totalFilteredItems : totalItems)} of {areFiltersApplied() ? totalFilteredItems : totalItems} Services
            </ShowingText>
          )}
        </Grid>

        <Grid item md={9} xs={12}>
          {currentProducts.length === 0 ? (
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
                      subTitle={product.customFields.partner}
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