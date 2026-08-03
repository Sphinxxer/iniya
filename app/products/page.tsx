import type { Metadata } from "next";
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

export const metadata: Metadata = createPageMetadata({
  title: "Recycled materials, fibres and yarns",
  description:
    "Explore Iniya Fiber’s recycled textile materials, processed fibres, and yarn solutions for specification-led supply discussions.",
  path: "/products",
});

export default function ProductsPage() {
  return (
    <>
      <PageHero
        title="Recycled materials, processed fibres, and yarn solutions."
        copy="Browse the seven product categories, then start an enquiry with the product, applicable specification, and quantity you need."
      />

      <section className="section">
        <div className="shell">
          <div className="product-groups product-groups--index">
            {productGroups.map((group) => {
              const groupedProducts = getProductsInGroup(group.id);
              return (
                <section className="product-group" key={group.id} aria-labelledby={`${group.id}-products-heading`}>
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
                      />
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section section--paper-deep">
        <div className="shell product-index-note reveal">
          <div>
            <h2>Start with the product. Add the details that apply.</h2>
            <p>
              Each product page shows the relevant material parameters and the
              information that helps Iniya Fiber review an enquiry clearly.
            </p>
          </div>
        </div>
      </section>

      <CtaSection
        title="Need help selecting the right product?"
        copy="Tell us what you need to source, the material details that apply, and the quantity you are planning for."
      />
    </>
  );
}
