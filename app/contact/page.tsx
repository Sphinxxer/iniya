import type { Metadata } from "next";
import { PageHero } from "@/src/components/ui";
import { QuoteForm } from "@/src/components/quote-form";
import { products, type ProductSlug } from "@/src/data/products";
import { createPageMetadata } from "@/src/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Request a textile material quote",
  description:
    "Share your textile material, yarn specification, and quantity requirements with Iniya Fiber in Tirupur, India.",
  path: "/contact",
});

type ContactPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

const productSlugs = new Set<ProductSlug>(
  products.map((product) => product.slug),
);

function getSelectedProduct(
  value: string | string[] | undefined,
): ProductSlug | undefined {
  const candidate = Array.isArray(value) ? value[0] : value;
  return candidate && productSlugs.has(candidate as ProductSlug)
    ? (candidate as ProductSlug)
    : undefined;
}

export default async function ContactPage({
  searchParams,
}: ContactPageProps = {}) {
  const params = searchParams ? await searchParams : undefined;
  const initialProduct = getSelectedProduct(params?.product);
  const turnstileSiteKey =
    process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim() || undefined;

  return (
    <>
      <PageHero
        title="Start a textile supply enquiry."
        copy="Share the product, quantity, and relevant specification details. The Iniya Fiber team can review the requirement and respond using your business contact details."
      />
      <QuoteForm
        key={initialProduct ?? "general-enquiry"}
        initialProduct={initialProduct}
        turnstileSiteKey={turnstileSiteKey}
      />
    </>
  );
}
