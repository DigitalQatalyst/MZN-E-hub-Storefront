// src/app/(layout-3)/product/[slug]/page.tsx
import ClientProductDetailsPage from "./ClientProductDetailsPage";

export default async function ProductDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return <ClientProductDetailsPage slug={slug} />;
}
