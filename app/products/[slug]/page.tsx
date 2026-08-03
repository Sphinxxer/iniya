import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { StructuredData } from "@/src/components/structured-data";
import {
  Breadcrumbs,
  CtaSection,
  ProductCard,
  ProductVisual,
} from "@/src/components/ui";
import {
  getProductBySlug,
  productGroups,
  productSlugs,
  type Product,
} from "@/src/data/products";
import { createPageMetadata, getConfiguredSiteUrl } from "@/src/lib/metadata";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return productSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) {
    return createPageMetadata({
      title: "Product not found",
      description: "The requested Iniya Fiber product could not be found.",
      path: `/products/${slug}`,
    });
  }

  return createPageMetadata({
    title: product.seo.title.replace(" | Iniya Fiber", ""),
    description: product.seo.description,
    path: `/products/${product.slug}`,
  });
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const relatedProducts = product.relatedSlugs
    .map((relatedSlug) => getProductBySlug(relatedSlug))
    .filter((item): item is Product => Boolean(item));
  const group = productGroups.find((item) => item.id === product.group);
  const siteUrl = getConfiguredSiteUrl();
  const productUrl = siteUrl
    ? new URL(`/products/${product.slug}`, siteUrl).toString()
    : undefined;
  const relatedHeading = `Related ${(group?.label ?? "products").toLowerCase()} to explore.`;

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.longDescription,
    category: group?.label ?? product.category,
    image: siteUrl ? new URL(product.image, siteUrl).toString() : undefined,
    brand: {
      "@type": "Brand",
      name: "Iniya Fiber",
    },
    url: productUrl,
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl?.toString() },
      {
        "@type": "ListItem",
        position: 2,
        name: "Products",
        item: siteUrl ? new URL("/products", siteUrl).toString() : undefined,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: group?.label ?? product.category,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: product.name,
        item: productUrl,
      },
    ],
  };

  return (
    <>
      <section className="product-detail-hero">
        <div className="shell">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Products", href: "/products" },
              { label: group?.label ?? product.category },
              { label: product.name },
            ]}
          />
          <div className="product-detail-hero__grid">
            <div className="product-detail-hero__copy">
              <p className="eyebrow">{group?.label ?? product.category}</p>
              <h1>{product.name}</h1>
              <p>{product.longDescription}</p>
              {product.countRange ? (
                <div className="confirmed-range">
                  <span>Available yarn count</span>
                  <strong>{product.countRange}</strong>
                </div>
              ) : null}
              <Link
                className="button"
                href={`/contact?product=${encodeURIComponent(product.slug)}`}
              >
                Request a quote <span aria-hidden="true">→</span>
              </Link>
            </div>
            <ProductVisual
              image={product.image}
              alt={product.imageAlt}
              large
            />
          </div>
        </div>
      </section>

      <section className="section section--line">
        <div className="shell product-spec-grid">
          <div>
            <h2>Applicable product details.</h2>
          </div>
          <div className="specification-list">
            {product.specifications.map((specification) => (
              <div className="specification-row" key={specification.label}>
                <strong>{specification.label}</strong>
                <p>{specification.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--paper-deep">
        <div className="shell product-info-grid">
          <article>
            <h3>Internal quality review</h3>
            <p>{product.qualityNote}</p>
          </article>
          <article>
            <h3>Relevant customer groups</h3>
            <ul>
              {product.customerGroups.map((customerGroup) => (
                <li key={customerGroup}>{customerGroup}</li>
              ))}
            </ul>
          </article>
          <article>
            <h3>Include these details in your enquiry</h3>
            <ul>
              {product.enquiryFields.map((field) => (
                <li key={field}>{field}</li>
              ))}
              <li>Quantity and unit</li>
            </ul>
          </article>
        </div>
      </section>

      <section className="section related-products">
        <div className="shell">
          <div className="related-products__heading">
            <div>
              <h2>{relatedHeading}</h2>
            </div>
            <Link className="text-link" href="/products">
              View all products <span aria-hidden="true">→</span>
            </Link>
          </div>
          <div className="product-grid">
            {relatedProducts.map((relatedProduct) => (
              <ProductCard key={relatedProduct.slug} product={relatedProduct} />
            ))}
          </div>
        </div>
      </section>

      <CtaSection
        title={`Discuss ${product.name.toLowerCase()}.`}
        copy="Share the product, applicable specification, quantity, and business details so the team can review your supply enquiry clearly."
        primary={{
          href: `/contact?product=${encodeURIComponent(product.slug)}`,
          label: `Request a quote for ${product.name}`,
        }}
      />

      <StructuredData data={[productSchema, breadcrumbSchema]} />
    </>
  );
}
