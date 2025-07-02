import Shop from "./shop.model";

interface RelatedService {
  id: string;
  partner: string;
  name: string;
  slug: string;
  description: string;
  images: string[];
  subTitle: string;
  rating: number;
  tags: string[];
}
interface facets {
  id: string;
  name: string;
  code: string;
}
interface Product {
  // Base fields (used by ProductCard19)
  id: string | number;
  slug: string;
  title: string;
  title1: string;
  subTitle: string;
  description: string;
  facetValues?: facets[];
  images: string[];
  reviews?: number;
  rating?: number;

  // Optional common fields
  price?: number;
  discount?: number;
  thumbnail?: string;
  categories?: string[];
  shop?: Shop;
  brand?: string;
  size?: string[];
  status?: string;

  // Service-specific fields
  code?: string;
  businessStages?: string[];
  businessStage?: string;
  Nationality?: string;
  LegalStructure?: string;
  processingTime?: string;
  registrationValidity?: string;
  cost?: string;
  steps?: string[];
  termsOfService?: string[];
  requiredDocuments?: string[];
  relatedServices?: RelatedService[];
  customFields?: {
    BusinessStage?: string;
    Nationality?: string;
  };

  // For backward compatibility
  name?: string; // some components might still use name instead of title
}

export default Product;
