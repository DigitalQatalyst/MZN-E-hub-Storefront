"use client";

import { Fragment, useEffect, useState } from "react";
import styled from "styled-components";
import ProductIntro from "@component/products/ProductIntro";
import ProductDetails from "@component/products/ProductDetails";
import client from "@lib/graphQLClient";
import Product from "@models/product.model";

const MessageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
  font-size: 1.2rem;
  color: #002180;
`;

interface RelatedService {
  id: string;
  slug: string;
  name: string;
  description: string;
  customFields?: {
    Partner?: string;
    Rating?: number;
    tags?: string[];
  };
}

interface CustomFields {
  Partner: string;
  Rating: number;
  Code: string;
  Status: string;
  tags: string[];
  BusinessStage: string;
  Nationality: string;
  LegalStructure: string;
  ProcessingTime: string;
  RegistrationValidity: string;
  relatedServices: RelatedService[];
  Cost: string;
  Steps: string[];
  TermsOfService: string[];
  RequiredDocuments: string[];
}

interface ProductResponse {
  product: {
    id: string;
    name: string;
    slug: string;
    description: string;
    facetValues: {
      id: string;
      name: string;
      code: string;
    }[];
    customFields: CustomFields;
  };
}

export default function ClientProductDetailsPage({ slug }: { slug: string }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        console.log("Slug:", slug); // Log slug for debugging
        const response = await client.request<ProductResponse>(
          `
            query GetProduct($slug: String!) {
              product(slug: $slug) {
                id
                name
                slug
                description
                customFields { 
                  CustomerType
                  BusinessStage
                  Nationality                
                  LegalStructure
                  CustomerType
                  Industry
                  ProcessingTime
                  RegistrationValidity
                  Cost
                  Steps
                  TermsOfService
                  RequiredDocuments
                  RelatedServices {
                    id
                    name
                  }
                }
              }
            }
        `,
          { slug }
        );
        console.log("Raw GraphQL response:", response);

        if (response.product) {
          const { customFields } = response.product;
          console.log("Custom fields:", customFields); // Log customFields for debugging

          setProduct({
            id: response.product.id,
            slug: response.product.slug,
            name: response.product.name,
            description: response.product.description,
            customFields,
            title: response.product.name,
            title1: response.product.name,
            subTitle: response.product.name,
            images: response.product.facetValues.map((facet) => facet.name),
          });
        }
      } catch (error) {
        console.error("Error fetching product:", error);
        if (error instanceof Error) {
          console.error("Error message:", error.message);
          console.error("Error stack:", error.stack);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [slug]);

  // Log updated product state
  useEffect(() => {
    console.log("Updated product state:", product);
  }, [product]);

  if (loading) return <MessageContainer>Loading...</MessageContainer>;
  if (!product) return <MessageContainer>Product not found</MessageContainer>;

  return (
    <Fragment>
      <ProductIntro product={product} />
      <ProductDetails product={product} />
    </Fragment>
  );
}
