import type { Metadata } from "next";
import Link from "next/link";
import {
  getProductsInGroup,
  productGroups,
} from "@/src/data/products";
import { createPageMetadata } from "@/src/lib/metadata";
import {
  CtaSection,
  PageHero,
  ProductCard,
} from "@/src/components/ui";

export async function generateMetadata(): Promise<Metadata> {
  return createPageMetadata({
  title: "Recycled materials, fibres and yarns",
  description:
    "Explore Iniya Fiber’s recycled textile materials, processed fibres, and yarn solutions for specification-led supply discussions.",
  path: "/products",
  });
}

export default function ProductsPage() {
  return (
    <>
      <PageHero
        title="Recycled materials, processed fibres, and yarns."
        copy="Explore seven focused products, then share the specification and quantity that apply to your requirement."
        compact
        aside={
          <nav className="product-group-links" aria-label="Product categories">
            {productGroups.map((group) => (
              <Link className="text-link" href={`#${group.id}`} key={group.id}>
                {group.label} <span aria-hidden="true">↓</span>
              </Link>
            ))}
          </nav>
        }
      />

      <section className="section section--line product-catalogue-section">
        <div className="shell">
          <div className="product-groups product-groups--index">
            {productGroups.map((group) => {
              const groupedProducts = getProductsInGroup(group.id);
              return (
                <section
                  className="product-group"
                  id={group.id}
                  key={group.id}
                  aria-labelledby={`${group.id}-products-heading`}
                >
                  <div className="product-group__heading">
                    <h2 id={`${group.id}-products-heading`}>{group.label}</h2>
                    <p>{group.copy}</p>
                  </div>
                  <div
                    className={`product-grid${groupedProducts.length === 1 ? " product-grid--single" : ""}`}
                  >
                    {groupedProducts.map((product) => (
                      <ProductCard
                        key={product.slug}
                        product={product}
                        featured={product.priority === 1}
                        catalogue
                      />
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
          <p className="product-image-disclosure reveal" role="note">
            Product imagery is illustrative; supply is confirmed against the
            agreed specification.
          </p>
        </div>
      </section>

      <CtaSection
        title="Need help selecting the right product?"
        copy="Tell us the material you need, the relevant specifications, and your planned quantity."
      />
    </>
  );
}
