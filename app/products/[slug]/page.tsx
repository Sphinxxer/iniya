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
  products,
  productSlugs,
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

  const currentIndex = products.findIndex((item) => item.slug === product.slug);
  const relatedProducts = [1, 2, 3].map(
    (offset) => products[(currentIndex + offset) % products.length],
  );
  const siteUrl = getConfiguredSiteUrl();
  const productUrl = siteUrl
    ? new URL(`/products/${product.slug}`, siteUrl).toString()
    : undefined;

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.longDescription,
    category: product.category,
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
              { label: product.name },
            ]}
          />
          <div className="product-detail-hero__grid">
            <div className="product-detail-hero__copy">
              <h1>{product.name}</h1>
              <p>{product.longDescription}</p>
              {product.countRange ? (
                <div className="confirmed-range">
                  <span>Confirmed count range</span>
                  <strong>{product.countRange}</strong>
                </div>
              ) : null}
              <Link
                className="button"
                href={`/contact?product=${encodeURIComponent(product.slug)}`}
              >
                Request details <span aria-hidden="true">↗</span>
              </Link>
            </div>
            <ProductVisual
              name={product.name}
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
            <h2>Discuss the applicable specification.</h2>
          </div>
          <div className="specification-list">
            {product.availableCustomisation.map((option) => (
              <div className="specification-row" key={option}>
                <strong>{option}</strong>
                <p>Configured around the confirmed product requirement.</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--paper-deep">
        <div className="shell product-info-grid">
          <article>
            <h3>Specification backed by internal review.</h3>
            <p>{product.qualityNote}</p>
          </article>
          <article>
            <h3>Supplied for textile businesses.</h3>
            <ul>
              {product.customerGroups.map((group) => (
                <li key={group}>{group}</li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      <section className="section related-products">
        <div className="shell">
          <div className="related-products__heading">
            <div>
              <h2>Continue exploring the range.</h2>
            </div>
            <Link className="text-link" href="/products">
              View all products <span aria-hidden="true">↗</span>
            </Link>
          </div>
          <div className="product-grid">
            {relatedProducts.map((item) => (
              <ProductCard key={item.slug} product={item} />
            ))}
          </div>
        </div>
      </section>

      <CtaSection
        title={`Discuss ${product.name.toLowerCase()} requirements.`}
        copy="Share the applicable specification and quantity so the Iniya Fiber team can respond around the requirement."
        primary={{
          href: `/contact?product=${encodeURIComponent(product.slug)}`,
          label: `Request details for ${product.name}`,
        }}
      />

      <StructuredData data={[productSchema, breadcrumbSchema]} />
    </>
  );
}
