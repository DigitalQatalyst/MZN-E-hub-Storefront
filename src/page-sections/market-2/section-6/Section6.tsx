"use client";
import Grid from "@component/grid/Grid";
import Container from "@component/Container";
import { ProductCard19 } from "@component/product-cards";
import { useState, useEffect } from "react";
import axios from "axios";
import Section2 from "../section-2/Section2";

// GraphQL Query
const GET_PRODUCTS = `
  query GetProducts($take: Int!) {
    products(options: { take: $take }) {
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

export default function Section6() {
  const [products, setProducts] = useState<Product[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const defaultImage = "/assets/images/mzn_logos/mzn_logo.png";
  const defaultImages = [defaultImage];
  const defaultReviews = 0;

  // Fetch products data on component mount
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get("/api/market-1/get-service-list");
        const items = response.data || [];
        // Filter for Financial Services (facetValue.id: "66") and exclude non-financial (facetValue.id: "67")
        const financialServicesOnly = items.filter(
          (product: any) =>
            product.facetValues?.some((fv: any) => fv.id === "66") &&
            !product.facetValues?.some((fv: any) => fv.id === "67")
        );
        setTotalItems(financialServicesOnly.length);
        setProducts(financialServicesOnly);
      } catch (error: any) {
        console.error(
          "Error fetching products:",
          error.response?.data || error.message
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Container pt="4rem" style={{ marginTop: "-45px" }}>
      <Section2 resultsCount={totalItems} style={{ marginBottom: "2rem" }} />

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
      ) : products.length === 0 ? (
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
          {products.map((product) => (
            <Grid item md={4} sm={6} xs={12} key={product.id}>
              <div
                onMouseEnter={() => setHoveredCardId(product.id)}
                onMouseLeave={() => setHoveredCardId(null)}
                style={{
                  transition: "all 0.3s ease",
                  transform:
                    hoveredCardId === product.id ? "scale(1.02)" : "scale(1)",
                  boxShadow:
                    hoveredCardId === product.id
                      ? "0 4px 8px rgba(0, 0, 0, 0.1)"
                      : "none",
                }}
              >
                <ProductCard19
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
    </Container>
  );
}
