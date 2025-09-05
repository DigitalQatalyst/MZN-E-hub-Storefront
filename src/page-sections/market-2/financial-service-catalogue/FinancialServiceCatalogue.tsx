"use client";

import Card from "@component/Card";
import Grid from "@component/grid/Grid";
import NavLink from "@component/nav-link";
import { H3 } from "@component/Typography";
import Container from "@component/Container";
import { useState, useEffect, useMemo } from "react";
import client from "@lib/graphQLClient";
import TabBar from "@component/tab-bar/TabBar";
import Sidebar from "./side-bar/Sidebar";
import Section2 from "../section-2/Section2";
import { ShowingText } from "./styles";
import { FinancialServiceCard } from "@component/product-cards";
import LoadingSpinner from "@component/LoadingSpinner/LoadingSpinner"; // Import the LoadingSpinner component

// GraphQL Query for Products
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

// GraphQL Query for Facets
const GET_FACETS = `
  query GetFacets {
    facets(options: { take: 100 }) {
      items {
        id
        name
        code
        values {
          id
          name
          code
        }
      }
    }
  }
`;

interface FacetValue {
  id: string;
  code: string;
  name: string;
}

interface Facet {
  id: string;
  name: string;
  code: string;
  values: FacetValue[];
}

interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  createdAt: string;
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

interface GetFacetsData {
  facets: {
    items: Facet[];
  };
}

// Generic filter state type
interface FilterState {
  [facetCode: string]: { [valueCode: string]: boolean };
}

export default function FinancialServiceCatalogue({
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
  const [facets, setFacets] = useState<Facet[]>([]);
  const [filterStates, setFilterStates] = useState<FilterState>({});

  const productsPerPage = 15;
  const defaultImage = "/assets/images/mzn_logos/mzn_logo.png";
  const defaultImages = [defaultImage];
  const defaultReviews = 0;

  // Memoize initial filter states to prevent unnecessary re-initialization
  const initializeFilterStates = useMemo(() => (facets: Facet[]): FilterState => {
    const initial: FilterState = {};
    facets.forEach(facet => {
      initial[facet.code] = {};
      facet.values.forEach(value => {
        initial[facet.code][value.code] = false;
      });
    });
    return initial;
  }, []); // Empty dependency array since this is a pure function

  // Check if any filters are applied
  const areFiltersApplied = () => {
    return (
      Object.values(filterStates).some(facet =>
        Object.values(facet).some(value => value)
      ) ||
      searchQuery.trim() !== "" ||
      activeButton === "newAdditions"
    );
  };

  // Function to check if a product is less than 5 days old
  const isNewAddition = (createdAt: string): boolean => {
    const createdDate = new Date(createdAt);
    const currentDate = new Date();
    const fiveDaysAgo = new Date(currentDate.getTime() - 5 * 24 * 60 * 60 * 1000);
    return createdDate >= fiveDaysAgo;
  };

  // Fetch products and facets data on component mount
  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      if (!isMounted) return;
      setLoading(true);
      try {
        // Fetch facets
        const facetData = await client.request<GetFacetsData>(GET_FACETS);
        const relevantFacets = facetData.facets.items.filter(facet =>
          ["service-category", "business-stage", "provided-by", "pricing-model"].includes(facet.code)
        );

        if (isMounted) {
          setFacets(relevantFacets);
          // Only initialize filterStates if it's empty to avoid resetting
          setFilterStates(prev => Object.keys(prev).length === 0 ? initializeFilterStates(relevantFacets) : prev);
        }

        // Fetch products
        const productData = await client.request<GetProductsData, GetProductsVariables>(GET_PRODUCTS, {
          take: 31,
        });
        console.log("Fetched products:", productData.products.items.length, "Total Items:", productData.products.totalItems);

        // Filter for Financial Services (facetValue.id: "66") and exclude non-financial (facetValue.id: "67")
        let financialServicesOnly = productData.products.items.filter((product) =>
          product.facetValues.some((fv) => fv.id === "66") &&
          !product.facetValues.some((fv) => fv.id === "67")
        );
        console.log("Filtered to Financial Services only:", financialServicesOnly.length);

        // Apply "New Additions" filter if active
        if (activeButton === "newAdditions") {
          financialServicesOnly = financialServicesOnly.filter((product) =>
            isNewAddition(product.createdAt)
          );
          console.log("Filtered to New Additions (less than 5 days old):", financialServicesOnly.length);
        }

        // Apply dynamic filters
        const filtered = financialServicesOnly.filter((product) => {
          // Check if product matches all selected facets
          const matchesAllFacets = Object.keys(filterStates).every(facetCode => {
            const selectedValues = Object.keys(filterStates[facetCode]).filter(
              key => filterStates[facetCode][key]
            );
            // If no values are selected for this facet, allow all products
            if (selectedValues.length === 0) return true;
            // Check if product matches any selected value for this facet
            return product.facetValues.some(facetValue =>
              selectedValues.includes(facetValue.code)
            ) || (
              facetCode === "pricing-model" &&
              selectedValues.includes("one-time-fee") &&
              product.customFields?.Cost && product.customFields.Cost > 0
            ) || (
              facetCode === "business-stage" &&
              product.customFields?.BusinessStage &&
              selectedValues.includes(product.customFields.BusinessStage)
            );
          });

          const matchesSearch =
            searchQuery.trim() === "" ||
            product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.facetValues.some((facetValue) =>
              facetValue.name.toLowerCase().includes(searchQuery.toLowerCase())
            );

          console.log(`Filtering ${product.name} (id: ${product.id}):`, {
            matchesAllFacets,
            matchesSearch,
          });
          return matchesAllFacets && matchesSearch;
        });

        if (isMounted) {
          setTotalItems(financialServicesOnly.length);
          setAllFilteredProducts(filtered);
          setTotalFilteredItems(filtered.length);

          const startIndex = (currentPage - 1) * productsPerPage;
          const endIndex = startIndex + productsPerPage;
          setProducts(filtered.slice(startIndex, endIndex));
          setFilteredProducts(filtered.slice(startIndex, endIndex));
        }
      } catch (error) {
        console.error("Error fetching data:", error.response?.errors || error.message);
      } finally {
        if (isMounted) {
          setLoading(false);
          console.log("Fetching completed. Loading set to false.");
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [currentPage, searchQuery, activeButton, filterStates]);

  // Handle filter changes dynamically
  const handleFilterChange = (facetCode: string, valueCode: string) => {
    setFilterStates(prev => ({
      ...prev,
      [facetCode]: {
        ...prev[facetCode],
        [valueCode]: !prev[facetCode][valueCode],
      },
    }));
    setCurrentPage(1);
  };

  // Calculate the total number of pages
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
      {loading ? (
        <LoadingSpinner />
      ) : (
        <Grid container spacing={3}>
          <Grid item md={3} xs={12}>
            <Sidebar
              facets={facets}
              filterStates={filterStates}
              setFilterStates={setFilterStates}
              handleFilterChange={handleFilterChange}
              totalItems={totalItems}
              totalFilteredItems={totalFilteredItems}
              currentPage={currentPage}
              productsPerPage={productsPerPage}
              areFiltersApplied={areFiltersApplied}
              loading={loading}
            />
          </Grid>

          <Grid item md={9} xs={12}>
            {currentProducts.length === 0 ? (
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
                      <FinancialServiceCard
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
                      border: currentPage === index + 1 ? "1px solid #002180" : "none",
                      borderRadius: currentPage === index + 1 ? "50%" : "none",
                      padding: "0.5rem 1rem",
                      margin: "0 0.5rem",
                      backgroundColor: "transparent",
                      color: "#002180",
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
      )}
    </Container>
  );
}