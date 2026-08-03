import Link from "next/link";
import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { products } from "@/src/data/products";
import { createPageMetadata } from "@/src/lib/metadata";
import {
  CapabilityStrip,
  CtaSection,
  ProductCard,
  SectionHeading,
} from "@/src/components/ui";

export const metadata: Metadata = createPageMetadata({
  title: "Iniya Fiber | Recycled Fibres & Yarn Manufacturer in Tirupur",
  description:
    "Iniya Fiber manufactures and supplies recycled textile materials, processed fibres, and yarn solutions from Tirupur for open-end spinning units, textile manufacturers, and exporters.",
  path: "/",
  absoluteTitle: true,
});

const capabilityRows = [
  ["Fibre type", "Custom"],
  ["Blend", "Custom"],
  ["Colour", "Custom"],
  ["Yarn count", "6s–40s"],
  ["Grade", "Custom"],
  ["Quantity", "Order-based"],
] as const;

const customisationRows = [
  ["Fibre type", "Select the material basis for the product discussion."],
  ["Blend", "Share the requested blend where it applies."],
  ["Colour", "Clarify the colour needed for the selected material or yarn."],
  ["Yarn count", "Specify the requested count for applicable yarn products."],
  ["Grade", "State the grade to be considered internally."],
  ["Quantity", "Include the requested quantity and unit."],
] as const;

const audiences = [
  [
    "Open-end spinning units",
    "Begin with the material category, count where applicable, grade, and quantity needed for the spinning brief.",
  ],
  [
    "Textile manufacturers",
    "Share the fibre, blend, colour, count, grade, and quantity details that apply to the selected product.",
  ],
  [
    "Exporters",
    "Use the enquiry to establish the product, specification, quantity, and business contact details needed for a clear supply discussion.",
  ],
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
              {capabilityRows.map(([label, value], index) => (
                <div key={label} style={{ "--row": index } as CSSProperties}>
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
            <p>Customised to the product and supply brief.</p>
          </aside>
        </div>
      </section>

      <CapabilityStrip />

      <section className="section company-intro">
        <div className="shell company-intro__grid reveal">
          <div>
            <h2>Dependable material supply, kept close to the process.</h2>
          </div>
          <div className="company-intro__copy">
            <p>
              From recycled material and processed fibres to yarn solutions,
              Iniya Fiber combines manufacturing, supply, trading, and export
              support from Tirupur, India.
            </p>
            <p>
              In-house processing and internal quality review support clearer
              specifications, commercially focused supply discussions, and
              dependable delivery planning.
            </p>
            <div className="role-list" aria-label="Business categories">
              {["Manufacturer", "Supplier", "Trader", "Exporter"].map((role) => (
                <span key={role}>{role}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section section--line products-section">
        <div className="shell">
          <SectionHeading
            title="Materials for textile supply discussions."
            copy="Explore the seven focused product categories available for open-end spinning units, textile manufacturers, and exporters."
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

      <section className="section section--paper-deep">
        <div className="shell">
          <SectionHeading
            title="Customisation starts with the product brief."
            copy="Applicable material parameters can be discussed across fibre type, blend, colour, yarn count, grade, and quantity."
            action={{ href: "/contact", label: "Discuss a specification" }}
          />
          <div className="specification-list reveal">
            {customisationRows.map(([label, copy]) => (
              <div className="specification-row" key={label}>
                <strong>{label}</strong>
                <p>{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--line">
        <div className="shell">
          <SectionHeading
            title="Quality is checked in-house."
            copy="Iniya Fiber operates its own testing laboratory, with yarn count, hank, and CSP checks used where they apply to yarn products."
            action={{ href: "/quality-capabilities", label: "Explore quality capabilities" }}
          />
          <div className="metric-grid metric-grid--three reveal">
            {[
              ["Yarn count", "Checked to support alignment with the agreed yarn count specification."],
              ["Hank", "Measured as part of the internal yarn quality-control process."],
              ["CSP", "Checked to support yarn strength and performance assessment."],
            ].map(([title, copy]) => (
              <article className="metric" key={title}>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
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
            title="Built for the businesses moving textile supply forward."
            copy="Iniya Fiber supports the three confirmed customer groups with a clearer product, specification, and supply conversation."
            action={{ href: "/industries", label: "Who we serve" }}
          />
          <div className="industry-grid industry-grid--three reveal">
            {audiences.map(([title, copy]) => (
              <article className="industry-item" key={title}>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
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
