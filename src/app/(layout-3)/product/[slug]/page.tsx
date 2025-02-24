import { Fragment } from "react";

import api from "@utils/__api__/products";
import Product from "@models/product.model";
import ProductIntro from "@component/products/ProductIntro";
import ProductView from "@component/products/ProductView";

// ==============================================================
interface Props {
  params: Promise<{ slug: string }>;
}
// ==============================================================

export default async function ProductDetails({ params }: Props) {
  const { slug } = await params;

  const shops = await api.getAvailableShop();
  const relatedProducts = await api.getRelatedProducts();
  const frequentlyBought = await api.getFrequentlyBought();
  const product = await api.getProductBySlug(slug);

  return (
    <Fragment>
      <ProductIntro
        product={product}
      />

      <ProductView
        shops={shops}
        relatedProducts={relatedProducts}
        frequentlyBought={frequentlyBought}
      />
    </Fragment>
  );
}
