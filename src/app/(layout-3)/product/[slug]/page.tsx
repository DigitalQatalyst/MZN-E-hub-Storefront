"use client";

import { Fragment } from "react";
import { useEffect, useState } from "react";
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

interface Props {
  params: { slug: string };
}

interface CustomFields {
  partner: string;
  rating: number;
  code: string;
  status: string;
  tags: string[];
  highlightedBusinessStage: string;
  processingTime: string;
  registrationValidity: string;
  sectionsCost: string;
  sectionsSteps: string;
  sectionsTermsOfService: string;
  sectionsRequiredDocuments: string;
}

interface ProductResponse {
  product: {
    id: string;
    name: string;
    slug: string;
    description: string;
    customFields: CustomFields;
  };
}

export default function ProductDetailsPage({ params }: Props) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await client.request<ProductResponse>(`
          query GetProduct($slug: String!) {
            product(slug: $slug) {
              id
              name
              slug
              description
              customFields {
                partner
                rating
                code
                status
                tags
                highlightedBusinessStage
                processingTime
                registrationValidity
                sectionsCost
                sectionsSteps
                sectionsTermsOfService
                sectionsRequiredDocuments
              }
            }
          }
        `, { slug: params.slug });
        
        if (response.product) {
          const { customFields } = response.product;
          
          setProduct({
            id: response.product.id,
            slug: response.product.slug,
            title: response.product.name,
            name: response.product.name,
            subTitle: customFields.partner,
            description: response.product.description,
            images: ["/assets/images/products/Home & Garden/vida.png"],
            rating: customFields.rating,
            reviews: 50,
            status: customFields.status,
            code: customFields.code,
            businessStages: customFields.tags || [],
            highlightedStage: customFields.highlightedBusinessStage,
            processingTime: customFields.processingTime,
            registrationValidity: customFields.registrationValidity,
            cost: customFields.sectionsCost,
            steps: customFields.sectionsSteps?.split('\n') || [],
            termsOfService: customFields.sectionsTermsOfService?.split('\n') || [],
            requiredDocuments: customFields.sectionsRequiredDocuments?.split('\n') || []
          });
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params.slug]);

  if (loading) return <MessageContainer>Loading...</MessageContainer>;
  if (!product) return <MessageContainer>Product not found</MessageContainer>;

  return (
    <Fragment>
      <ProductIntro product={product} />
      <ProductDetails product={product} />
    </Fragment>
  );
}