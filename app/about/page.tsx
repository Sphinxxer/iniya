import type { Metadata } from "next";
import { CtaSection, PageHero, SectionHeading } from "@/src/components/ui";
import { createPageMetadata } from "@/src/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "About Iniya Fiber",
  description:
    "Iniya Fiber is a Tirupur-based manufacturer, supplier, trader, and exporter of recycled textile materials, processed fibres, and yarn products.",
  path: "/about",
});

const businessCapabilities = [
  [
    "Manufacturer",
    "Handling the core production and processing requirements in-house.",
  ],
  [
    "Supplier",
    "Providing textile materials according to agreed customer requirements.",
  ],
  ["Trader", "Supporting flexible material and product sourcing needs."],
  [
    "Exporter",
    "Serving export-focused textile requirements from Tirupur, India.",
  ],
] as const;

const operatingPrinciples = [
  "Quality consistency",
  "Clear specifications",
  "Competitive pricing",
  "Dependable delivery",
  "Responsive communication",
] as const;

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="Textile capability built around customer requirements."
        copy="Iniya Fiber is a Tirupur-based manufacturer, supplier, trader, and exporter of recycled textile materials, processed fibres, and yarn products."
      />

      <section className="section">
        <div className="shell">
          <SectionHeading
            title="Company overview"
            copy="Serving open-end spinning units, textile manufacturers, and exporters, Iniya Fiber combines in-house operations with customisable product supply."
          />
        </div>
      </section>

      <section className="section section--line section--paper-deep">
        <div className="shell">
          <SectionHeading
            title="One company, multiple capabilities."
          />
          <div className="value-grid reveal">
            {businessCapabilities.map(([title, copy]) => (
              <article className="value-item" key={title}>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--line">
        <div className="shell">
          <SectionHeading
            title="Closer control from processing to supply."
            copy="With the main processes handled internally, Iniya Fiber can respond to requirements across fibre type, blend, colour, yarn count, grade, and quantity."
          />
        </div>
      </section>

      <section className="section section--line section--paper-deep">
        <div className="shell">
          <SectionHeading
            title="Operating principles"
          />
          <div className="capability-grid reveal">
            {operatingPrinciples.map((principle) => (
              <article className="capability-item" key={principle}>
                <h3>{principle}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--line">
        <div className="shell">
          <SectionHeading
            title="Based in Tirupur, connected to textile production."
            copy="Iniya Fiber operates from Tirupur, one of India’s established textile and garment-production centres."
          />
        </div>
      </section>

      <CtaSection
        title="Fibres and yarns, made to your specification."
        copy="Consistent textile materials, customised to customer requirements and supplied with a focus on quality, competitive pricing, and dependable delivery."
        primary={{ href: "/contact", label: "Discuss a Requirement" }}
      />
    </>
  );
}
