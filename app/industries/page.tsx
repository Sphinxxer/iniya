import type { Metadata } from "next";
import { CtaSection, PageHero } from "@/src/components/ui";
import { createPageMetadata } from "@/src/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Textile businesses we support",
  description:
    "Iniya Fiber supports open-end spinning units, textile manufacturers, and exporters with recycled materials, processed fibres, and yarn supply discussions.",
  path: "/industries",
});

const audiences = [
  {
    title: "Open-end spinning units",
    products: "Recycled textile materials, processed fibres, and applicable yarn options.",
    customisation:
      "Share the material type, yarn count where applicable, grade, and quantity needed for the brief.",
    enquiry:
      "Include the selected product, material parameters, quantity with unit, and a business contact.",
    consistency:
      "In-house processing and internal quality review help keep the product discussion and supply planning coordinated.",
  },
  {
    title: "Textile manufacturers",
    products: "Processed fibres and yarn solutions, alongside the recycled material range.",
    customisation:
      "Discuss applicable fibre type, blend, colour, yarn count, grade, and quantity details.",
    enquiry:
      "Start with the product and include the parameters that apply to the intended material or yarn supply.",
    consistency:
      "The company’s in-house operations and own laboratory support a more controlled quality review process.",
  },
  {
    title: "Exporters",
    products: "The complete seven-product range of recycled materials, processed fibres, and yarns.",
    customisation:
      "Use the enquiry to establish the product, requested material details, and planned quantity clearly.",
    enquiry:
      "Include business name, country, business email, phone with country code, and the supply details needed for review.",
    consistency:
      "Clear specifications, in-house processing, and internal quality review support a dependable supply conversation.",
  },
] as const;

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        title="Supporting the businesses behind textile supply."
        copy="Iniya Fiber serves the three confirmed customer groups with product-focused, specification-led supply discussions."
      />

      <section className="section">
        <div className="shell audience-detail-list">
          {audiences.map((audience) => (
            <article className="audience-detail reveal" key={audience.title}>
              <div>
                <h2>{audience.title}</h2>
              </div>
              <dl>
                <div>
                  <dt>Relevant product categories</dt>
                  <dd>{audience.products}</dd>
                </div>
                <div>
                  <dt>How customisation helps</dt>
                  <dd>{audience.customisation}</dd>
                </div>
                <div>
                  <dt>What to include in an enquiry</dt>
                  <dd>{audience.enquiry}</dd>
                </div>
                <div>
                  <dt>Supporting supply consistency</dt>
                  <dd>{audience.consistency}</dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      </section>

      <CtaSection
        title="Start with a clear supply brief."
        copy="Choose the product, include the material details that apply, and share your quantity and business contact information."
        primary={{ href: "/contact", label: "Request a quote" }}
      />
    </>
  );
}
