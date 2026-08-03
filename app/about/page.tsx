import type { Metadata } from "next";
import { CtaSection, PageHero, SectionHeading } from "@/src/components/ui";
import { createPageMetadata } from "@/src/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "About Iniya Fiber",
  description:
    "Iniya Fiber is a Tirupur-based manufacturer, supplier, trader, and exporter of recycled textile materials, processed fibres, and yarn solutions.",
  path: "/about",
});

const businessRoles = [
  [
    "Manufacturer",
    "Handles the confirmed processing and production activities in-house.",
  ],
  [
    "Supplier",
    "Discusses recycled materials, processed fibres, and yarn solutions against the customer brief.",
  ],
  [
    "Trader",
    "Supports product and material sourcing conversations within the confirmed range.",
  ],
  [
    "Exporter",
    "Provides clear product and specification communication for export-focused buyers.",
  ],
] as const;

const customerGroups = [
  [
    "Open-end spinning units",
    "Material, yarn count where applicable, grade, and quantity can be clarified at the enquiry stage.",
  ],
  [
    "Textile manufacturers",
    "Product selection can be discussed alongside fibre type, blend, colour, grade, and quantity where relevant.",
  ],
  [
    "Exporters",
    "The team focuses on a clear supply brief covering product, material parameters, quantity, and contact details.",
  ],
] as const;

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="A Tirupur textile-material partner for focused B2B supply."
        copy="Iniya Fiber is a manufacturer, supplier, trader, and exporter of recycled textile materials, processed fibres, and yarn solutions."
      />

      <section className="section">
        <div className="shell company-intro__grid reveal">
          <div>
            <h2>Clear material conversations, from product selection to supply.</h2>
          </div>
          <div className="company-intro__copy">
            <p>
              Iniya Fiber serves open-end spinning units, textile manufacturers,
              and exporters with a focused range of recycled materials,
              processed fibres, and yarns.
            </p>
            <p>
              The company keeps core operations in-house so product details,
              quality review, and supply planning can be coordinated through one
              team.
            </p>
          </div>
        </div>
      </section>

      <section className="section section--line section--paper-deep">
        <div className="shell">
          <SectionHeading title="Manufacturer, supplier, trader, and exporter." />
          <div className="value-grid reveal">
            {businessRoles.map(([title, copy]) => (
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
            title="Who Iniya Fiber serves."
            copy="Each customer group can begin with the product category and add the specifications that apply to the intended supply."
          />
          <div className="industry-grid industry-grid--three reveal">
            {customerGroups.map(([title, copy]) => (
              <article className="industry-item" key={title}>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--paper-deep">
        <div className="shell product-spec-grid">
          <div>
            <h2>In-house control and quality review.</h2>
          </div>
          <div className="specification-list">
            <div className="specification-row">
              <strong>Processing</strong>
              <p>All confirmed fibre and yarn processes are handled in-house.</p>
            </div>
            <div className="specification-row">
              <strong>Customisation</strong>
              <p>Applicable fibre type, blend, colour, yarn count, grade, and quantity details guide the supply brief.</p>
            </div>
            <div className="specification-row">
              <strong>Quality</strong>
              <p>The company operates its own testing laboratory, including yarn count, hank, and CSP checks for yarn products.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--line">
        <div className="shell company-intro__grid reveal">
          <div>
            <h2>Based in Tirupur, India.</h2>
          </div>
          <div className="company-intro__copy">
            <p>
              Tirupur is an established centre for textile and garment
              production. Iniya Fiber’s location keeps the business close to
              the supply conversations it serves.
            </p>
          </div>
        </div>
      </section>

      <CtaSection
        title="Discuss a fibre or yarn brief."
        copy="Start with the product, applicable material details, quantity, and the business contact information needed for a clear response."
      />
    </>
  );
}
