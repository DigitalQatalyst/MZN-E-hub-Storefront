"use client";

import { Fragment, useEffect, useState } from "react";
import styled from "styled-components";
import client from "@lib/graphQLClient";
import Product from "@models/product.model";
import ServiceDetailsSection1 from "@component/products/ServiceDetailsSection1";
import ServiceDetailsSection2 from "@component/products/ServiceDetailsSection2";
import Loading from "app/(layout-3)/shops/[slug]/loading";

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
  Steps: string;
  TermsOfService: string;
  RequiredDocuments: string;
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

export default function ServiceDetails({ slug }: { slug: string }) {
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
            title: response.product.name || "",
            name: response.product.name || "",
            subTitle: customFields.Partner || "",
            description: response.product.description || "",
            images: ["/assets/images/products/Home & Garden/vida.png"],
            rating: customFields.Rating || 0,
            reviews: 50,
            status: customFields.Status || "",
            code: customFields.Code || "",
            // businessStages: customFields.tags || [],
            businessStage: customFields.BusinessStage || "",
            Nationality: customFields.Nationality || "",
            LegalStructure: customFields.LegalStructure || "",
            processingTime: customFields.ProcessingTime || "",
            registrationValidity: customFields.RegistrationValidity || "",
            relatedServices: (customFields.relatedServices || []).map(
              (service) => ({
                id: service.id,
                partner: "", // Not queried
                name: service.name || "",
                slug: "", // Not queried
                description: "", // Not queried
                images: [],
                subTitle: "",
                rating: 0, // Not queried
                tags: [], // Not queried
              })
            ),
            cost: customFields.Cost || "",
            steps: customFields.Steps,
            termsOfService: customFields.TermsOfService,
            requiredDocuments: customFields.RequiredDocuments,
            facetValues: (response.product.facetValues || []).map((facet) => ({
              id: facet.id,
              name: facet.name,
              code: facet.code,
            })),
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

  if (loading) return <Loading />;
  if (!product) return <MessageContainer>Product not found</MessageContainer>;

  return (
    <Fragment>
      <ServiceDetailsSection1 product={product} />
      <ServiceDetailsSection2 product={product} />
    </Fragment>
  );
}
