import Link from "next/link";
import type { Metadata } from "next";
import { CtaSection, PageHero } from "@/src/components/ui";
import { FeatureIcon } from "@/src/components/feature-icon";
import { createPageMetadata } from "@/src/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  return createPageMetadata({
  title: "Textile businesses we support",
  description:
    "Iniya Fiber supports open-end spinning units, textile manufacturers, and exporters with recycled materials, processed fibres, and yarn supply discussions.",
  path: "/industries",
  });
}

const audiences = [
  {
    icon: "spinning",
    title: "Open-end spinning units",
    products: [
      { label: "Recycled Cotton Hard Waste", slug: "recycled-cotton-hard-waste" },
      { label: "Recycled Clipping Waste", slug: "recycled-clipping-waste" },
      { label: "Processed Fibres", slug: "processed-fibres" },
      { label: "Recycled Yarn", slug: "recycled-yarn" },
    ],
    startingPoint:
      "Define the input material, grade, quantity, and yarn count where applicable.",
    support:
      "Review recycled inputs, processed fibres, or applicable yarn options around the intended spinning requirement.",
    contactHref: "/contact?customerType=spinning-unit",
    contactLabel: "Discuss a spinning requirement",
  },
  {
    icon: "textileManufacturing",
    title: "Textile manufacturers",
    products: [
      { label: "Processed Fibres", slug: "processed-fibres" },
      { label: "Cotton Yarn", slug: "cotton-yarn" },
      { label: "Coloured Yarn", slug: "coloured-yarn" },
      { label: "Poly-Cotton Yarn", slug: "poly-cotton-yarn" },
    ],
    startingPoint:
      "Share the fibre, blend, colour, yarn count, grade, and quantity that apply to the selected product.",
    support:
      "Compare processed fibre and yarn options against the material requirement before the supply brief is agreed.",
    contactHref: "/contact?customerType=textile-manufacturer",
    contactLabel: "Discuss a manufacturing requirement",
  },
  {
    icon: "exporter",
    title: "Exporters",
    products: [
      { label: "Recycled Cotton Hard Waste", slug: "recycled-cotton-hard-waste" },
      { label: "Processed Fibres", slug: "processed-fibres" },
      { label: "Recycled Yarn", slug: "recycled-yarn" },
      { label: "Poly-Cotton Yarn", slug: "poly-cotton-yarn" },
    ],
    startingPoint:
      "Establish the product specification, planned quantity, and business details for review.",
    support:
      "Build a clear product and supply brief before the applicable commercial details are agreed.",
    contactHref: "/contact?customerType=exporter",
    contactLabel: "Discuss an export requirement",
  },
] as const;

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        title="Buyers we support."
        copy="Open-end spinning units, textile manufacturers, and exporters can begin with the products and material details relevant to their work."
      />

      <section className="section">
        <div className="shell audience-detail-list">
          {audiences.map((audience) => (
            <article className="audience-detail reveal" key={audience.title}>
              <div className="audience-detail__heading">
                <FeatureIcon name={audience.icon} size="industry" />
                <h2>{audience.title}</h2>
              </div>
              <dl>
                <div>
                  <dt>Relevant products</dt>
                  <dd>
                    {audience.products.map((product, index) => (
                      <span key={product.slug}>
                        {index > 0 ? ", " : null}
                        {product.label}
                      </span>
                    ))}
                  </dd>
                </div>
                <div>
                  <dt>Where to begin</dt>
                  <dd>{audience.startingPoint}</dd>
                </div>
                <div>
                  <dt>How Iniya Fiber supports the brief</dt>
                  <dd>{audience.support}</dd>
                </div>
                <div>
                  <dt>Next step</dt>
                  <dd>
                    <Link className="text-link" href={audience.contactHref}>
                      {audience.contactLabel}{" "}
                      <span aria-hidden="true">→</span>
                    </Link>
                  </dd>
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
