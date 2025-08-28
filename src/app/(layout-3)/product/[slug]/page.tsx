// src/app/(layout-3)/product/[slug]/page.tsx
import ServiceDetails from "./ServiceDetails";

export default async function ServiceDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return <ServiceDetails slug={slug} />;
}
