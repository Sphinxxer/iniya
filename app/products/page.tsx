import type { Metadata } from "next";
import { products } from "@/src/data/products";
import { createPageMetadata } from "@/src/lib/metadata";
import {
  CtaSection,
  PageHero,
  ProductCard,
  SectionHeading,
} from "@/src/components/ui";

export const metadata: Metadata = createPageMetadata({
  title: "Textile materials and yarn products",
  description:
    "Explore recycled cotton waste, processed fibres, recycled yarn, cotton yarn, coloured yarn, and poly-cotton yarn from Iniya Fiber.",
  path: "/products",
});

export default function ProductsPage() {
  return (
    <>
      <PageHero
        title="Recycled materials, processed fibres, and yarn solutions."
        copy="Explore the Iniya Fiber product range and enquire based on fibre type, blend, colour, count, grade, and quantity."
      />

      <section className="section">
        <div className="shell">
          <SectionHeading
            title="Seven focused material categories."
            copy="Each enquiry starts with the product and specifications your production requires. Product details below are limited to confirmed capabilities."
          />
          <div className="product-grid">
            {products.map((product, index) => (
              <ProductCard
                key={product.slug}
                product={product}
                featured={index === 0}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="section section--paper-deep">
        <div className="shell product-index-note reveal">
          <div>
            <h2>Start with the material. Define the specification.</h2>
            <p>
              Discuss applicable requirements across fibre type, blend, colour,
              yarn count, grade, and quantity. The Iniya Fiber team will respond
              around the selected product and confirmed production need.
            </p>
          </div>
        </div>
      </section>

      <CtaSection
        title="Need help selecting the right product?"
        copy="Share the material and production requirement, and begin a product-specific supply discussion."
      />
    </>
  );
}
