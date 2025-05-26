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
import {
  List,
  ListItem,
  DropdownIcon,
  DropdownText,
  CheckboxLabel,
  ServiceTypeTitle,
  ShowingText,
} from "./styles";

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
  const [loading, setLoading] = useState(true);
  const productsPerPage = 15;

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

  const [businessStageFilters, setBusinessStageFilters] = useState({
    inception: false,
    growth: false,
    maturity: false,
    restructuring: false,
    other: false,
  });

  const [providedByFilters, setProvidedByFilters] = useState({
    adgm: false,
    khalifaFund: false,
    hub71: false,
    adSmeHub: false,
    other: false,
  });

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

  return (
    <Container pt="4rem" style={{ marginTop: "-45px" }}>
      <TabBar />
      <Section2 
        resultsCount={areFiltersApplied() ? totalFilteredItems : totalItems} 
        style={{ marginBottom: "2rem" }}
      />
      <Grid container spacing={3}>
        <Grid item md={3} xs={12}>
          {/* SIDEBAR FILTERS OMITTED FOR BREVITY */}
        </Grid>

        <Grid item md={9} xs={12}>
          {loading ? (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "300px" }}>
              Loading services...
            </div>
          ) : filteredProducts.length === 0 ? (
            <div style={{ textAlign: "center", padding: "2rem" }}>No service Found 😢</div>
          ) : (
            <Grid container spacing={3}>
              {filteredProducts.map((product) => (
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
        </Grid>
      </Grid>
    </Container>
  );
}
