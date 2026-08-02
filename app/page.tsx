import Link from "next/link";
import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { products } from "@/src/data/products";
import { createPageMetadata } from "@/src/lib/metadata";
import {
  CapabilityStrip,
  CtaSection,
  ProcessFlow,
  ProductCard,
  SectionHeading,
} from "@/src/components/ui";

export const metadata: Metadata = createPageMetadata({
  title: "Textile material supplier in Tirupur",
  description:
    "Iniya Fiber supplies recycled textile materials, processed fibres, and customised yarn solutions from Tirupur, India.",
  path: "/",
});

const capabilityRows = [
  ["Fibre type", "Custom"],
  ["Blend", "Custom"],
  ["Colour", "Custom"],
  ["Yarn count", "6s to 40s"],
  ["Grade", "Custom"],
  ["Quantity", "Requirement-based"],
] as const;

const customisationRows = [
  ["Fibre type", "Select material options around the production requirement."],
  ["Blend", "Discuss blend requirements for applicable fibre and yarn products."],
  ["Colour", "Align colour requirements with the selected material or yarn."],
  ["Yarn count", "Specify the required count for applicable yarn products."],
  ["Grade", "Define the grade needed for the intended production requirement."],
  ["Quantity", "Share the quantity needed for a tailored supply discussion."],
] as const;

const values = [
  ["Consistent quality", "In-house processing and testing support dependable material standards."],
  ["Customised supply", "Specifications can be adapted by fibre, blend, colour, count, grade, and quantity."],
  ["Competitive pricing", "Integrated operations support commercially suitable supply options."],
  ["On-time delivery", "Orders are planned around agreed customer and delivery requirements."],
] as const;

const industries = [
  ["Open-end spinning units", "Material and yarn supply developed around spinning requirements."],
  ["Textile manufacturers", "Processed fibres and yarn options customised according to production needs."],
  ["Exporters", "Clear product communication and dependable supply for export-focused requirements."],
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
              processed fibres, and customised yarn solutions for open-end
              spinning units, textile manufacturers, and exporters.
            </p>
            <div className="button-row">
              <Link className="button" href="/products">
                Explore products <span aria-hidden="true">↗</span>
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
            <p>Configured around customer requirements.</p>
          </aside>
        </div>
      </section>

      <CapabilityStrip />

      <section className="section company-intro">
        <div className="shell company-intro__grid reveal">
          <div>
            <h2>Reliable materials for consistent textile production.</h2>
          </div>
          <div className="company-intro__copy">
            <p>
              From recycled cotton waste and processed fibres to recycled,
              cotton, coloured, and poly-cotton yarns, Iniya Fiber provides
              textile materials developed around each customer&apos;s requirements.
            </p>
            <p>
              With the main processes handled in-house, the company maintains
              closer control over product specifications, quality, pricing, and
              delivery.
            </p>
            <div className="role-list" aria-label="Business categories">
              {['Manufacturer', 'Supplier', 'Trader', 'Exporter'].map((role) => (
                <span key={role}>{role}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section section--line products-section">
        <div className="shell">
          <SectionHeading
            title="Materials for different textile requirements."
            copy="Explore recycled textile waste, processed fibres, and customised yarn options supplied for open-end spinning units, textile manufacturers, and export requirements."
            action={{ href: "/products", label: "View all products" }}
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
        <div className="shell">
          <SectionHeading
            title="Built around the requirement."
            copy="Different production requirements call for different material specifications. Iniya Fiber supports customisation across fibre type, blend, colour, yarn count, grade, and quantity."
            action={{ href: "/contact", label: "Discuss your requirement" }}
          />
          <div className="specification-list reveal">
            {customisationRows.map(([label, copy]) => (
              <div className="specification-row" key={label} tabIndex={0}>
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
            title="Quality is not an assumption. It is tested."
            copy="Iniya Fiber operates its own testing laboratory to support quality consistency across fibre and yarn requirements."
            action={{ href: "/quality-capabilities", label: "Explore capabilities" }}
          />
          <div className="metric-grid metric-grid--three reveal">
            {[
              ["Yarn count", "Checked as part of the internal yarn quality process."],
              ["Hank", "Measured as part of the company’s quality-control process."],
              ["CSP", "Checked to support yarn strength and performance assessment."],
            ].map(([title, copy]) => (
              <article className="metric" key={title}>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
          <div className="home-process">
            <div className="home-process__heading reveal">
              <h3>From requirement to supply.</h3>
              <p>
                A clear five-stage path keeps specifications, quality checks,
                and delivery aligned.
              </p>
            </div>
            <ProcessFlow />
          </div>
        </div>
      </section>

      <section className="section section--dark speciality-section">
        <div className="shell speciality-section__grid">
          <div>
            <h2>Speciality fibre options for specific material requirements.</h2>
            <p>
              Iniya Fiber works with speciality fibre options including Pima,
              Supima, CIS, and Giza.
            </p>
          </div>
          <div className="speciality-list reveal">
            {['Pima', 'Supima', 'CIS', 'Giza'].map((fibre) => (
              <div key={fibre}>
                <strong>{fibre}</strong>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <SectionHeading
            title="Focused on the details that keep production moving."
          />
          <div className="value-grid reveal">
            {values.map(([title, copy]) => (
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
            title="Supporting the textile supply chain."
            copy="From recycled raw materials to customised yarn supply, Iniya Fiber supports businesses across different stages of textile production."
            action={{ href: "/industries", label: "View industries" }}
          />
          <div className="industry-grid industry-grid--three reveal">
            {industries.map(([title, copy]) => (
              <article className="industry-item" key={title}>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CtaSection
        title="Looking for a specific fibre or yarn requirement?"
        copy="Share your material, blend, colour, count, grade, and quantity requirements with the Iniya Fiber team."
        secondary={{ href: "/products", label: "Explore products" }}
      />
    </>
  );
}
