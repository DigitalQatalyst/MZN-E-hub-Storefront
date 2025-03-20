import Shop from "./shop.model";
import Review from "./Review.model";

// interface Product {
//   unit?: any;
//   slug: string;
//   price: number;
//   title: string;
//   rating: number;
//   discount: number;
//   thumbnail: string;
//   id: string;
//   shop?: Shop;
//   brand?: string;
//   size?: string[];
//   status?: string;
//   colors?: string[];
//   images?: string[];
//   categories: any[];
//   reviews?: Review[];
//   published?: boolean;
// }

interface Product {
  id: string | number;
  slug: string;
  title: string;
  subTitle:string ;
  // price: number;
  brand?: string | null;
  size?: string | null;
  colors?: string[];
  discount?: number;
  thumbnail?: string;
  images: string[];
  categories?: string[];
  status?: string | null;
  reviews?: any[];
  rating?: number;
  shop?: {
    id: string;
    slug: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    profilePicture: string;
    coverPicture: string;
    socialLinks: {
      facebook?: string | null;
      twitter?: string | null;
      youtube?: string | null;
      instagram?: string | null;
    };
  };
  // for: {
  //   demo: string;
  //   type: string;
  // };
}


export default Product;
