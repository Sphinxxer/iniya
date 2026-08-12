import type { Metadata } from "next";
import {
  QuoteForm,
  type CustomerType,
} from "@/src/components/quote-form";
import { products, type ProductSlug } from "@/src/data/products";
import { createPageMetadata } from "@/src/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  return createPageMetadata({
  title: "Request a textile material quote",
  description:
    "Share your textile material, yarn specification, and quantity requirements with Iniya Fiber in Tirupur, India.",
  path: "/contact",
  });
}

type ContactPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

const productSlugs = new Set<ProductSlug>(
  products.map((product) => product.slug),
);

const customerTypeByParam = {
  "spinning-unit": "Open-end spinning unit",
  "textile-manufacturer": "Textile manufacturer",
  exporter: "Exporter",
} as const satisfies Record<string, CustomerType>;

function getSelectedProduct(
  value: string | string[] | undefined,
): ProductSlug | undefined {
  const candidate = Array.isArray(value) ? value[0] : value;
  return candidate && productSlugs.has(candidate as ProductSlug)
    ? (candidate as ProductSlug)
    : undefined;
}

function getSelectedCustomerType(
  value: string | string[] | undefined,
): CustomerType | undefined {
  const candidate = Array.isArray(value) ? value[0] : value;
  if (!candidate || !(candidate in customerTypeByParam)) return undefined;

  return customerTypeByParam[
    candidate as keyof typeof customerTypeByParam
  ];
}

export default async function ContactPage({
  searchParams,
}: ContactPageProps = {}) {
  const params = searchParams ? await searchParams : undefined;
  const initialProduct = getSelectedProduct(params?.product);
  const initialCustomerType = getSelectedCustomerType(params?.customerType);
  const turnstileSiteKey =
    process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim() || undefined;

  return (
    <QuoteForm
      key={`${initialProduct ?? "general-enquiry"}:${initialCustomerType ?? "general-customer"}`}
      initialProduct={initialProduct}
      initialCustomerType={initialCustomerType}
      turnstileSiteKey={turnstileSiteKey}
    />
  );
}
