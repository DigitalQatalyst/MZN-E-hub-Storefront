"use client";

import Card from "@component/Card";
import Grid from "@component/grid/Grid";
import NavLink from "@component/nav-link";
import { H3 } from "@component/Typography";
import Container from "@component/Container";
import NonFinancialServiceCard from "@component/product-cards/NonFinancialServiceCard";
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
  const [loading, setLoading] = useState(true); // Added loading state
  const productsPerPage = 15;

  // State for Categories filters
  const [categoriesFilters, setCategoriesFilters] = useState({
    legalCompliance: {
      regulatoryCompliance: false,
      legalAdvisory: false,
      businessLicensing: false,
    },
    incentivesListing: false,
    proximityIncubators: false,
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
      Object.values(categoriesFilters.legalCompliance).some((value) => value) ||
      categoriesFilters.incentivesListing ||
      categoriesFilters.proximityIncubators ||
      Object.values(businessStageFilters).some((value) => value) ||
      Object.values(providedByFilters).some((value) => value) ||
      Object.values(pricingModelFilters).some((value) => value)
    );
  };

  // Fetch products data on component mount or page change
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Set loading to true at the start
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

          // Filter for Non-Financial Services (facetValue.id: "67") only, exclude Financial Services (facetValue.id: "66")
          const nonFinancialServicesOnly = allProducts.filter((product) =>
            product.facetValues.some((fv) => fv.id === "67") &&
            !product.facetValues.some((fv) => fv.id === "66")
          );
          console.log("Filtered to Non-Financial Services only:", nonFinancialServicesOnly.length);

          setTotalItems(nonFinancialServicesOnly.length);

          // Apply filters to non-financial services
          const selectedCategories: string[] = [];
          if (categoriesFilters.legalCompliance.regulatoryCompliance) selectedCategories.push("Regulatory Compliance");
          if (categoriesFilters.legalCompliance.legalAdvisory) selectedCategories.push("Legal Advisory");
          if (categoriesFilters.legalCompliance.businessLicensing) selectedCategories.push("Business Licensing & Per...");
          if (categoriesFilters.incentivesListing) selectedCategories.push("Incentives Listing");
          if (categoriesFilters.proximityIncubators) selectedCategories.push("Proximity Incubators");
          console.log("Selected Categories:", selectedCategories);

          const selectedStages = Object.keys(businessStageFilters)
            .filter((key) => businessStageFilters[key])
            .map((key) => key.charAt(0).toUpperCase() + key.slice(1));
          console.log("Selected Stages:", selectedStages);

          const selectedProviders = Object.keys(providedByFilters)
            .filter((key) => providedByFilters[key])
            .map((key) => {
              if (key === "khalifaFund") return "Khalifa Fund";
              if (key === "hub71") return "Hub 71";
              if (key === "adSmeHub") return "AD SME Hub";
              return key.charAt(0).toUpperCase() + key.slice(1);
            });
          console.log("Selected Providers:", selectedProviders);

          const selectedPricingModels = Object.keys(pricingModelFilters)
            .filter((key) => pricingModelFilters[key])
            .map((key) => {
              if (key === "subscriptionBased") return "Subscription-Based";
              if (key === "payPerService") return "Pay Per Service";
              if (key === "oneTimeFee") return "One-Time Fee";
              if (key === "governmentSubsidised") return "Government Subsidised";
              return key.charAt(0).toUpperCase() + key.slice(1);
            });
          console.log("Selected Pricing Models:", selectedPricingModels);

          const filtered = selectedCategories.length === 0 &&
            selectedStages.length === 0 &&
            selectedProviders.length === 0 &&
            selectedPricingModels.length === 0
            ? nonFinancialServicesOnly
            : nonFinancialServicesOnly.filter((product) => {
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
          console.log("Final filtered products count:", filtered.length);

          setAllFilteredProducts(filtered);
          setTotalFilteredItems(filtered.length);

          const startIndex = (currentPage - 1) * productsPerPage;
          const endIndex = startIndex + productsPerPage;
          setProducts(filtered);
          setFilteredProducts(filtered.slice(startIndex, endIndex));
        } else {
          console.log("No filters applied, fetching all non-financial services...");
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

          // Filter for Non-Financial Services (facetValue.id: "67") only, exclude Financial Services (facetValue.id: "66")
          const nonFinancialServicesOnly = allProducts.filter((product) =>
            product.facetValues.some((fv) => fv.id === "67") &&
            !product.facetValues.some((fv) => fv.id === "66")
          );
          console.log("Filtered to Non-Financial Services only:", nonFinancialServicesOnly.length);

          setTotalItems(nonFinancialServicesOnly.length);
          setAllFilteredProducts(nonFinancialServicesOnly);
          setTotalFilteredItems(nonFinancialServicesOnly.length);

          const startIndex = (currentPage - 1) * productsPerPage;
          const endIndex = startIndex + productsPerPage;
          setProducts(nonFinancialServicesOnly);
          setFilteredProducts(nonFinancialServicesOnly.slice(startIndex, endIndex));
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false); // Set loading to false after fetch completes
        console.log("Fetching completed. Loading set to false.");
      }
    };

    fetchData();
  }, [currentPage, categoriesFilters, businessStageFilters, providedByFilters, pricingModelFilters]);

  // Apply filters whenever products, categoriesFilters, businessStageFilters, providedByFilters, or pricingModelFilters change
  useEffect(() => {
    const selectedCategories: string[] = [];
    if (categoriesFilters.legalCompliance.regulatoryCompliance) selectedCategories.push("Regulatory Compliance");
    if (categoriesFilters.legalCompliance.legalAdvisory) selectedCategories.push("Legal Advisory");
    if (categoriesFilters.legalCompliance.businessLicensing) selectedCategories.push("Business Licensing & Per...");
    if (categoriesFilters.incentivesListing) selectedCategories.push("Incentives Listing");
    if (categoriesFilters.proximityIncubators) selectedCategories.push("Proximity Incubators");

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

    let filtered: Product[] = [];
    if (
      selectedCategories.length === 0 &&
      selectedStages.length === 0 &&
      selectedProviders.length === 0 &&
      selectedPricingModels.length === 0
    ) {
      filtered = allFilteredProducts;
    } else {
      filtered = allFilteredProducts.filter((product) => {
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
    }

    setTotalFilteredItems(filtered.length);
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    setFilteredProducts(filtered.slice(startIndex, endIndex));
  }, [allFilteredProducts, categoriesFilters, businessStageFilters, providedByFilters, pricingModelFilters, currentPage]);

  // Handle checkbox changes for Categories filters
  const handleCategoriesChange = (category: string, subcategory?: string) => {
    if (subcategory) {
      setCategoriesFilters((prev) => ({
        ...prev,
        [category]: {
          ...prev[category],
          [subcategory]: !prev[category][subcategory],
        },
      }));
    } else {
      setCategoriesFilters((prev) => ({
        ...prev,
        [category]: !prev[category],
      }));
    }
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
              backgroundColor: "#FFFFFF"
            }}>
            <List>
              <ServiceTypeTitle>Categories :</ServiceTypeTitle>
              <CheckboxLabel style={{ display: 'flex', alignItems: 'center' }}>
                <input
                  type="checkbox"
                  id="legal-compliance"
                  title="Legal, Compliance & Lic..."
                  checked={
                    categoriesFilters.legalCompliance.regulatoryCompliance ||
                    categoriesFilters.legalCompliance.legalAdvisory ||
                    categoriesFilters.legalCompliance.businessLicensing
                  }
                  onChange={() => {
                    const allChecked = !(
                      categoriesFilters.legalCompliance.regulatoryCompliance ||
                      categoriesFilters.legalCompliance.legalAdvisory ||
                      categoriesFilters.legalCompliance.businessLicensing
                    );
                    setCategoriesFilters((prev) => ({
                      ...prev,
                      legalCompliance: {
                        regulatoryCompliance: allChecked,
                        legalAdvisory: allChecked,
                        businessLicensing: allChecked,
                      },
                    }));
                    setCurrentPage(1);
                  }}
                />
                <label htmlFor="legal-compliance" style={{ marginRight: '0.5rem' }}>Legal, Compliance & Lic...</label>
                <img 
                  src="/assets/images/non_financial_marketplace/chevron-down.svg" 
                  alt="dropdown" 
                  style={{ verticalAlign: 'middle' }} 
                />
              </CheckboxLabel>
              <CheckboxLabel style={{ marginLeft: '1rem' }}>
                <input
                  type="checkbox"
                  id="regulatory-compliance"
                  title="Regulatory Compliance"
                  checked={categoriesFilters.legalCompliance.regulatoryCompliance}
                  onChange={() => handleCategoriesChange("legalCompliance", "regulatoryCompliance")}
                />
                <label htmlFor="regulatory-compliance">Regulatory Compliance</label>
              </CheckboxLabel>
              <CheckboxLabel style={{ marginLeft: '1rem' }}>
                <input
                  type="checkbox"
                  id="legal-advisory"
                  title="Legal Advisory"
                  checked={categoriesFilters.legalCompliance.legalAdvisory}
                  onChange={() => handleCategoriesChange("legalCompliance", "legalAdvisory")}
                />
                <label htmlFor="legal-advisory">Legal Advisory</label>
              </CheckboxLabel>
              <CheckboxLabel style={{ marginLeft: '1rem' }}>
                <input
                  type="checkbox"
                  id="business-licensing"
                  title="Business Licensing & Per..."
                  checked={categoriesFilters.legalCompliance.businessLicensing}
                  onChange={() => handleCategoriesChange("legalCompliance", "businessLicensing")}
                />
                <label htmlFor="business-licensing">Business Licensing & Per...</label>
              </CheckboxLabel>

              <CheckboxLabel style={{ display: 'flex', alignItems: 'center' }}>
                <input
                  type="checkbox"
                  id="incentives-listing"
                  title="Incentives Listing"
                  checked={categoriesFilters.incentivesListing}
                  onChange={() => handleCategoriesChange("incentivesListing")}
                />
                <label htmlFor="incentives-listing" style={{ marginRight: '0.5rem' }}>Incentives Listing</label>
                <img 
                  src="/assets/images/non_financial_marketplace/chevron-down.svg" 
                  alt="dropdown" 
                  style={{ verticalAlign: 'middle' }} 
                />
              </CheckboxLabel>

              <CheckboxLabel style={{ display: 'flex', alignItems: 'center' }}>
                <input
                  type="checkbox"
                  id="proximity-incubators"
                  title="Proximity Incubators"
                  checked={categoriesFilters.proximityIncubators}
                  onChange={() => handleCategoriesChange("proximityIncubators")}
                />
                <label htmlFor="proximity-incubators" style={{ marginRight: '0.5rem' }}>Proximity Incubators</label>
                <img 
                  src="/assets/images/non_financial_marketplace/chevron-down.svg" 
                  alt="dropdown" 
                  style={{ verticalAlign: 'middle' }} 
                />
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
            {/* Adding padding-bottom to create space at the bottom when no service is available */}
            <div style={{ paddingBottom: '2rem' }} />
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
                    <NonFinancialServiceCard
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