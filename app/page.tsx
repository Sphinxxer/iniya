import Link from "next/link";
import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { products } from "@/src/data/products";
import { createPageMetadata } from "@/src/lib/metadata";
import {
  CapabilityStrip,
  CtaSection,
  IconFeatureGrid,
  ProductCard,
  SectionHeading,
} from "@/src/components/ui";
import { FeatureIcon } from "@/src/components/feature-icon";

export async function generateMetadata(): Promise<Metadata> {
  return createPageMetadata({
  title: "Iniya Fiber | Recycled Fibres & Yarn Manufacturer in Tirupur",
  description:
    "Iniya Fiber manufactures and supplies recycled textile materials, processed fibres, and yarn solutions from Tirupur for open-end spinning units, textile manufacturers, and exporters.",
  path: "/",
  absoluteTitle: true,
  });
}

const capabilityRows = [
  { icon: "fibreType", label: "Fibre type", value: "Selected to requirement" },
  { icon: "blend", label: "Blend", value: "Customised" },
  { icon: "colour", label: "Colour", value: "Customised" },
  {
    icon: "yarnCount",
    label: "Yarn count",
    value: "6s–40s for applicable recycled yarn",
  },
  { icon: "grade", label: "Grade", value: "Requirement-based" },
  { icon: "quantity", label: "Quantity", value: "Order-based" },
] as const;

const coreCapabilities = [
  {
    icon: "processing",
    title: "In-house processing",
    copy: "Applicable fibre and yarn operations remain closely coordinated.",
  },
  {
    icon: "specification",
    title: "Custom specifications",
    copy: "Material parameters are agreed against the selected product brief.",
  },
  {
    icon: "laboratory",
    title: "Own testing laboratory",
    copy: "Yarn count, hank, and CSP checks support applicable yarn requirements.",
  },
  {
    icon: "dispatch",
    title: "Supply planning",
    copy: "Quantity and dispatch details are aligned to the agreed requirement.",
  },
] as const;

const audiences = [
  { icon: "spinning", title: "Open-end spinning units", copy: "Start with the material, count where applicable, grade, and quantity." },
  { icon: "textileManufacturing", title: "Textile manufacturers", copy: "Discuss the fibre, blend, colour, count, grade, and quantity that apply." },
  { icon: "exporter", title: "Exporters", copy: "Establish the product, specification, quantity, and business details clearly." },
] as const;

export default function Home() {
  return (
    <>
      <section className="home-hero">
        <div className="shell home-hero__grid">
          <div className="home-hero__copy">
            <h1>Fibres and yarns, made to your specification.</h1>
            <p>
              Iniya Fiber manufactures and supplies recycled textile materials,
              processed fibres, and yarn solutions for open-end spinning units,
              textile manufacturers, and exporters.
            </p>
            <div className="button-row">
              <Link className="button" href="/products">
                Explore products <span aria-hidden="true">→</span>
              </Link>
              <Link className="button button--ghost" href="/contact">
                Request a quote <span aria-hidden="true">→</span>
              </Link>
            </div>
            <p className="home-hero__trust">
              Manufacturer · Supplier · Trader · Exporter
            </p>
          </div>

          <aside className="capability-panel" aria-label="Product capabilities">
            <div className="capability-panel__header">
              <span>Product capabilities</span>
            </div>
            <dl>
              {capabilityRows.map((row, index) => (
                <div
                  key={row.label}
                  style={{ "--row": index } as CSSProperties}
                >
                  <dt>
                    <FeatureIcon name={row.icon} size="small" />
                    <span>{row.label}</span>
                  </dt>
                  <dd>{row.value}</dd>
                </div>
              ))}
            </dl>
            <p>Customised to the product and supply brief.</p>
          </aside>
        </div>
      </section>

      <CapabilityStrip />

      <section className="section section--line products-section">
        <div className="shell">
          <SectionHeading
            title="Recycled materials, processed fibres, and yarns."
            copy="Explore seven product categories for open-end spinning units, textile manufacturers, and exporters."
            action={{ href: "/products", label: "View all products" }}
          />
          <div className="product-grid">
            {products.map((product) => (
              <ProductCard
                key={product.slug}
                product={product}
                featured={product.priority === 1}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="section section--paper-deep why-section">
        <div className="shell">
          <SectionHeading
            title="Capabilities kept close to the product brief."
            copy="Processing, specification review, applicable testing, and supply planning are coordinated around the agreed requirement."
            action={{
              href: "/quality-capabilities",
              label: "Explore quality capabilities",
            }}
          />
          <IconFeatureGrid items={coreCapabilities} className="why-grid" />
        </div>
      </section>

      <section className="section section--dark speciality-section">
        <div className="shell speciality-section__grid">
          <div>
            <h2>Speciality fibre options for specific briefs.</h2>
            <p>
              Iniya Fiber works with speciality fibre options including Pima,
              Supima, CIS, and Giza.
            </p>
          </div>
          <div className="speciality-list reveal">
            {["Pima", "Supima", "CIS", "Giza"].map((fibre) => (
              <div key={fibre}>
                <strong>{fibre}</strong>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--line">
        <div className="shell">
          <SectionHeading
            title="Built for textile supply businesses."
            copy="Each buyer can begin with a relevant product and the material details needed for a focused supply discussion."
            action={{ href: "/industries", label: "Buyers we support" }}
          />
          <IconFeatureGrid
            items={audiences}
            className="industry-grid industry-grid--three"
            iconSize="industry"
          />
        </div>
      </section>

      <CtaSection
        title="Have a fibre or yarn specification to discuss?"
        copy="Share the product, applicable material parameters, quantity, and business details so Iniya Fiber can respond with the right supply conversation."
        secondary={{ href: "/products", label: "Explore products" }}
      />
    </>
  );
}
