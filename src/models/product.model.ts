import Shop from "./shop.model";

// Define the RelatedService interface for related services
interface RelatedService {
  id: string;
  name: string;
  partner: string;
  slug: string;
  description: string;
  images: string[];
  subTitle: string;
  rating?: number; // Optional, since customFields?.rating might be undefined
  tags: string[];
}

interface Product {
  // Base fields (used by ProductCard19)
  id: string | number;
  slug: string;
  title: string;
  subTitle: string;
  description: string;
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
  highlightedStage?: string;
  processingTime?: string;
  registrationValidity?: string;
  cost?: string;
  steps?: string[];
  termsOfService?: string[];
  requiredDocuments?: string[];

  // For backward compatibility
  name?: string; // some components might still use name instead of title

  // Add relatedServices field
  relatedServices?: RelatedService[]; // Optional array of RelatedService
}

export default Product;